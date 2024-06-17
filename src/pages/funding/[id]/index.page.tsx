import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DeleteIcon from '@assets/icons/delete.svg';
import DeleteMenuIcon from '@assets/icons/delete-menu.svg';
import EditIcon from '@assets/icons/edit-note.svg';
import InfoIcon from '@assets/icons/info.svg';
import MoreBtnIcon from '@assets/icons/more-btn.svg';
import ActiveMoreBtnIcon from '@assets/icons/more-btn-clicked.svg';
import DefaultPresentImg from '@assets/images/default_present.svg';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import Menu from '@components/common/Menu';
import Modal from '@components/common/Modal';
import { RadioSelector } from '@components/common/RadioSelector';
import FundingStatusBox from '@components/FundingStatusBox';
import MessageList from '@components/MessageList';
import LoginModal from '@components/modals/LoginModal';
import ModalActionButtons from '@components/modals/ModalActionButtons';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import { DELETE_REASON } from '@constants/notice';
import { useUser } from '@hooks/queries/useAuth';
import { useDeleteFunding, useGetFundingDetail } from '@hooks/queries/useFunding';
import { FundingStatus } from '@typings/funding';
import { getFundingStatus } from '@utils/getStatus';
import { shareKakao } from '@utils/share';
import { useForm } from 'react-hook-form';

import * as style from './styles';

const ORGANIZER_ACTION: {
  [key in FundingStatus]: {
    [key in 'first' | 'second']: { path: (id: string) => string; label: string };
  };
} = {
  IN_PROGRESS: {
    first: { path: () => '', label: '친구에게 공유하기' },
    second: { path: (id: string) => `/funding/${id}/participate`, label: '내 펀딩 참여하기' },
  },
  EXPIRED: {
    first: { path: () => '', label: '친구에게 공유하기' },
    second: { path: (id: string) => `/funding/${id}/participate`, label: '남은 금액 결제하기' },
  },
  COMPLETED: {
    first: { path: (id: string) => `/funding/${id}`, label: '감사 편지 보내기' },
    second: { path: (id: string) => `/funding/${id}`, label: '배송 현황 확인하기' },
  },
};

const PUBLIC_ACTION = {
  IN_PROGRESS: { path: (id: string) => `/funding/${id}/participate`, label: '이 펀딩 참여하기' },
  EXPIRED: { path: (id: string) => `/funding/${id}/participate`, label: '이 펀딩 참여하기' },
  COMPLETED: { path: (id: string) => `/funding/${id}`, label: '감사 편지 보러가기' },
};

export default function Funding() {
  const router = useRouter();

  const { id: fundingId, from } = router.query as { id: string; from?: string };
  const { data: user } = useUser();

  const { data: fundingInfo } = useGetFundingDetail(fundingId);
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [step, setStep] = useState(1);

  const [status, setStatus] = useState<FundingStatus>('IN_PROGRESS');

  interface FormInputs {
    reason: string;
  }

  const { register, watch, handleSubmit } = useForm<FormInputs>({
    defaultValues: { reason: DELETE_REASON[0] },
  });

  const { mutate: deleteFunding, isPending } = useDeleteFunding(() => setStep(3));

  useEffect(() => {
    if (!fundingInfo) return;

    const { percent, expirationDate } = fundingInfo;
    setStatus(getFundingStatus(percent, expirationDate));
  }, [fundingInfo]);

  if (!fundingInfo) return null;

  const {
    title,
    imageUrl,
    expirationDate,
    percent,
    goalPrice,
    description,
    isOrganizer,
    presentList: messageList,
  } = fundingInfo;

  const hasParticipants = messageList.length > 0;

  const onSubmit = () => {
    deleteFunding({
      fundingId,
      cancelReason: watch('reason'),
    });
  };

  function RoleBasedButton({ status }: { status: FundingStatus }) {
    if (!fundingInfo) return null;

    if (!isOrganizer) {
      const { first: firstButton, second: secondButton } = ORGANIZER_ACTION[status];

      return (
        <>
          <Button
            color="primary"
            onClick={() => {
              status !== 'COMPLETED'
                ? shareKakao({
                    userName: user?.name || '',
                    imageUrl: fundingInfo.imageUrl,
                    fundingId,
                  })
                : router.push(firstButton.path(fundingId));
            }}
          >
            {firstButton.label}
          </Button>
          <Button onClick={() => router.push(secondButton.path(fundingId))}>
            {secondButton.label}
          </Button>
        </>
      );
    }

    return (
      <Button
        disabled={status === 'EXPIRED'}
        onClick={() => {
          if (user) return router.push(PUBLIC_ACTION[status].path(fundingId));

          setIsLoginModalOn(true);
        }}
      >
        {PUBLIC_ACTION[status].label}
      </Button>
    );
  }

  return (
    <>
      <div className={style.pageLayout}>
        <Header fromCreate={!!from} />
        {!imageUrl ? (
          <DefaultPresentImg />
        ) : (
          <div className={style.imageWrapper}>
            <Image src={imageUrl} alt="상품 이미지" fill style={{ objectFit: 'contain' }} />
          </div>
        )}
        <article className={style.wrapper}>
          <div className={style.titleBar}>
            <h2 className={style.title}>{title}</h2>

            {isOrganizer && (
              <Menu activeMenuButtonTitle={<ActiveMoreBtnIcon />} menuButtonTitle={<MoreBtnIcon />}>
                <Menu.Item onClick={() => setSelectedMenu('EDIT')}>
                  <EditIcon />
                  수정하기
                </Menu.Item>
                <Menu.Item onClick={() => setSelectedMenu('DELETE')}>
                  <DeleteMenuIcon />
                  삭제하기
                </Menu.Item>
              </Menu>
            )}
          </div>
          <FundingStatusBox status={status} info={{ percent, expirationDate, goalPrice }} />

          <RoleBasedButton status={status} />
          {isOrganizer && status === 'EXPIRED' && (
            <div className={style.paymentNotice}>
              <InfoIcon />
              <span>
                펀딩 기간이 종료되었어요.
                <br />
                남은 금액을 결제하거나, 펀딩 기간을 수정해보세요.
              </span>
            </div>
          )}
          <div className={style.desc}>{description}</div>
        </article>
        <MessageList messages={messageList} />
      </div>

      <>
        {isLoginModalOn && <LoginModal onClose={() => setIsLoginModalOn(false)} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedMenu === 'DELETE' && step === 1 && (
            <ModalWithIcon
              icon={<DeleteIcon />}
              title="정말 펀딩을 삭제하시겠어요?"
              subtitle={
                hasParticipants
                  ? '펀딩 참여자에게 취소 내역이 전달됩니다.\n삭제된 이후에는 복구되지 않아요.'
                  : '삭제된 이후에는 복구되지 않아요.'
              }
              buttonComponent={
                <ModalActionButtons
                  actionBtnText="펀딩 삭제할게요"
                  handleCloseModal={() => setSelectedMenu('')}
                  handleAction={() => setStep(step => step + 1)}
                />
              }
            />
          )}

          {selectedMenu === 'DELETE' && step === 2 && (
            <ModalWithIcon
              icon={<DeleteIcon />}
              title="펀딩 삭제 이유를 알려주세요."
              buttonComponent={
                <ModalActionButtons
                  action="submit"
                  actionBtnText="펀딩 삭제할게요"
                  handleCloseModal={() => setSelectedMenu('')}
                  isLoading={isPending}
                />
              }
            >
              <RadioSelector
                reasonList={DELETE_REASON}
                register={register}
                label={'reason'}
                selected={watch('reason')}
              />
            </ModalWithIcon>
          )}
        </form>
        {selectedMenu === 'DELETE' && step === 3 && (
          <Modal>
            {hasParticipants
              ? '결제 취소 신청이 완료되었습니다.\n결제하신 수단으로 영업일 2-3일 내에\n환불이 진행됩니다.'
              : '펀딩이 정상적으로 삭제되었습니다.'}
            <div className={style.buttonWrapper}>
              <Button color="primary" className={style.buttonWidth} onClick={() => router.back()}>
                닫기
              </Button>
              <Link href="/funding/create/1" className={style.ButtonStyleLink}>
                새 펀딩 등록하기
              </Link>
            </div>
          </Modal>
        )}
      </>
    </>
  );
}
