import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DeleteIcon from '@assets/icons/delete.svg';
import DeleteMenuIcon from '@assets/icons/delete-menu.svg';
import EditIcon from '@assets/icons/edit_note.svg';
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
import { shareKakao } from '@utils/share';
import { useForm } from 'react-hook-form';

import * as style from './styles';

export default function Funding() {
  const router = useRouter();

  const { id: fundingId, from } = router.query as { id: string; from?: string };
  const { data: user } = useUser();

  const { data: fundingInfo } = useGetFundingDetail(fundingId);
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [step, setStep] = useState(1);

  interface FormInputs {
    reason: string;
  }

  const { register, watch, handleSubmit } = useForm<FormInputs>({
    defaultValues: { reason: DELETE_REASON[0] },
  });

  const { mutate: deleteFunding } = useDeleteFunding(() => setStep(3));

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

  function RoleBasedButton() {
    if (!fundingInfo) return null;

    if (isOrganizer) {
      return (
        <Button
          onClick={() =>
            shareKakao({ userName: user?.name || '', imageUrl: fundingInfo.imageUrl, fundingId })
          }
        >
          친구에게 공유하기
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          if (user) return router.push(`/funding/${fundingId}/participate`);

          setIsLoginModalOn(true);
        }}
      >
        이 펀딩 참여하기
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
          <FundingStatusBox info={{ percent, expirationDate, goalPrice }} />

          <RoleBasedButton />

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
              <Button
                color="primary"
                className={style.buttonWidth}
                onClick={() => setSelectedMenu('')}
              >
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
