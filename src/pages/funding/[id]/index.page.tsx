import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DeleteIcon from '@assets/icons/delete.svg';
import DeleteMenuIcon from '@assets/icons/delete-menu.svg';
import EditIcon from '@assets/icons/edit-note.svg';
import InfoIcon from '@assets/icons/info.svg';
import InviteIcon from '@assets/icons/modal-invite.svg';
import MoreBtnIcon from '@assets/icons/more-btn.svg';
import ActiveMoreBtnIcon from '@assets/icons/more-btn-clicked.svg';
import { Radio_Bg_White_active, Radio_Bg_White_disabled } from '@assets/icons/radio';
import DefaultPresentImg from '@assets/images/default_present.svg';
import Invitation from '@assets/images/invite.svg';
import Congratulation from '@assets/images/invite-congratulation.svg';
import Gradient from '@assets/images/invite-gradient.svg';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import Menu from '@components/common/Menu';
import Modal from '@components/common/Modal';
import { RadioSelector } from '@components/common/RadioSelector';
import DimOverlay from '@components/DimOverlay';
import FundingStatusBox from '@components/FundingStatusBox';
import MessageList from '@components/MessageList';
import LoginModal from '@components/modals/LoginModal';
import ModalActionButtons from '@components/modals/ModalActionButtons';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import { DELETE_REASON } from '@constants/notice';
import { useUser } from '@hooks/queries/useAuth';
import { useDeleteFunding, useGetFundingDetail } from '@hooks/queries/useFunding';
import { useGetShipping } from '@hooks/queries/useShipping';
import { batchPaymentState, createFundState } from '@store/store';
import { FundingStatus } from '@typings/funding';
import { getFundingStatus } from '@utils/getStatus';
import { shareKakao } from '@utils/share';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { css } from 'styled-system/css';

import * as style from './styles';

const ORGANIZER_ACTION: {
  [key in FundingStatus]: {
    [key in 'first' | 'second']: {
      path: (id: string, isOranizer?: boolean) => string;
      label: string;
    };
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
    first: {
      path: (id: string, isOrganizer?: boolean) =>
        `/funding/${id}/thanks-letter?isOrganizer=${isOrganizer}`,
      label: '감사 편지 보내기',
    },
    second: { path: (id: string) => `/funding/${id}`, label: '배송 현황 확인하기' },
  },
};

const PUBLIC_ACTION = {
  IN_PROGRESS: { path: (id: string) => `/funding/${id}/participate`, label: '이 펀딩 참여하기' },
  EXPIRED: { path: (id: string) => `/funding/${id}/participate`, label: '이 펀딩 참여하기' },
  COMPLETED: {
    path: (id: string, isOrganizer: boolean) =>
      `/funding/${id}/thanks-letter?isOranizer=${isOrganizer}`,
    label: '감사 편지 보러가기',
  },
};

const invitationOptions = [
  { value: 'invite', image: <Invitation />, content: '님의\n집들이에 초대할게요' },
  { value: 'congratulate', image: <Congratulation />, content: '님을 위해\n마음을 모아주세요' },
] as const;

export type InvitationOptions = 'invite' | 'congratulate';

export default function Funding() {
  const router = useRouter();

  const { id: fundingId, from } = router.query as { id: string; from?: string };
  const { data: user } = useUser();

  const { data: fundingInfo } = useGetFundingDetail(fundingId);
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [step, setStep] = useState(1);

  const [status, setStatus] = useState<FundingStatus>('IN_PROGRESS');
  const setDifferenceAmount = useSetRecoilState(batchPaymentState);
  const setCreateFund = useSetRecoilState(createFundState);

  const [isShareModalOn, setIsShareModalOn] = useState(false);
  const [selectedInvitation, setSelectedInvitaion] = useState<InvitationOptions>(
    invitationOptions[0].value,
  );
  interface FormInputs {
    reason: string;
  }

  const { register, watch, handleSubmit } = useForm<FormInputs>({
    defaultValues: { reason: DELETE_REASON[0] },
  });

  const { data: shippingData } = useGetShipping();
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
    organizerName,
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

    if (isOrganizer) {
      const { first: firstButton, second: secondButton } = ORGANIZER_ACTION[status];

      return (
        <>
          <Button
            color="primary"
            onClick={() => {
              status !== 'COMPLETED'
                ? setIsShareModalOn(true)
                : router.push(firstButton.path(fundingId, isOrganizer));
            }}
          >
            {firstButton.label}
          </Button>
          <Button
            onClick={() => {
              status === 'EXPIRED' && setDifferenceAmount(goalPrice - goalPrice * (percent / 100));

              router.push(secondButton.path(fundingId));
            }}
          >
            {secondButton.label}
          </Button>
        </>
      );
    }

    return (
      <Button
        disabled={status === 'EXPIRED'}
        onClick={() => {
          if (user) return router.push(PUBLIC_ACTION[status].path(fundingId, isOrganizer));

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
        <DimOverlay isActive={status !== 'IN_PROGRESS'}>
          {!imageUrl ? (
            <DefaultPresentImg />
          ) : (
            <div className={style.imageWrapper}>
              <Image src={imageUrl} alt="상품 이미지" fill style={{ objectFit: 'contain' }} />
            </div>
          )}
        </DimOverlay>
        <article className={style.wrapper}>
          <div className={style.titleBar}>
            <h2 className={style.title}>{title}</h2>

            {isOrganizer && !(expirationDate < 0 && percent >= 100) && (
              <Menu activeMenuButtonTitle={<ActiveMoreBtnIcon />} menuButtonTitle={<MoreBtnIcon />}>
                <Menu.Item
                  onClick={() => {
                    // setSelectedMenu('EDIT')
                    // TODO: productURL 찾아보기

                    setCreateFund({
                      roadAddress: shippingData?.roadAddress || '',
                      detailAddress: shippingData?.detailAddress || '',
                      phoneNumber: shippingData?.phoneNumber || '',
                      title: fundingInfo.title,
                      description: fundingInfo.description,
                      goalPrice: fundingInfo.goalPrice,
                      productUrl: '',
                      imageUrl: fundingInfo.imageUrl,
                      fundingStart: '',
                      fundingFinish: String(fundingInfo.expirationDate),
                      target: 'update',
                    });
                    router.push('/funding/create/2');
                  }}
                >
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

      {isShareModalOn && (
        <ModalWithIcon
          icon={<InviteIcon />}
          title="펀딩을 친구에게 공유해보세요"
          subtitle={
            '카카오톡으로 펀딩을 공유할 수 있어요.\n친구에게 보낼 집들이 초대장을 골라보세요.'
          }
          buttonComponent={
            <ModalActionButtons
              actionBtnText="카카오톡으로 공유"
              handleAction={() =>
                shareKakao({
                  userName: organizerName,
                  imageUrl: fundingInfo.imageUrl,
                  fundingId,
                  invitationType: selectedInvitation,
                })
              }
              handleCloseModal={() => setIsShareModalOn(false)}
            />
          }
        >
          <div className={css({ display: 'flex', justifyContent: 'space-between', mt: '1.6rem' })}>
            {invitationOptions.map(({ value, image, content }, idx) => (
              <label
                key={idx}
                htmlFor={value}
                className={css({
                  width: '14.2rem',
                  height: '14.2rem',
                  backgroundColor: 'blue.20',
                  borderRadius: '1.2rem',
                  boxSizing: 'border-box',
                  pos: 'relative',
                  opacity: selectedInvitation === value ? 1 : '0.5',
                  boxShadow: selectedInvitation === value ? '0 0 0 2px #0098E8' : 'none',
                })}
              >
                <input
                  type="radio"
                  value={value}
                  id={value}
                  checked={value === selectedInvitation}
                  onChange={e => setSelectedInvitaion(e.target.value as InvitationOptions)}
                  className={css({ display: 'none' })}
                />
                <div className={css({ pos: 'relative' })}>{image}</div>
                <div className={css({ pos: 'absolute', right: '1.2rem', top: '1rem' })}>
                  {selectedInvitation === value ? (
                    <Radio_Bg_White_active />
                  ) : (
                    <Radio_Bg_White_disabled />
                  )}
                </div>
                <span className={css({ pos: 'absolute', left: 0, bottom: '4rem', w: '100%' })}>
                  <Gradient />
                </span>
                <div className={style.InvitationContents}>
                  <span className={css({ color: 'success' })}>{organizerName}</span>
                  {content}
                </div>
              </label>
            ))}
          </div>
        </ModalWithIcon>
      )}
    </>
  );
}
