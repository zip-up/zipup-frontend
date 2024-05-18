import { Fragment, ReactNode, useState } from 'react';
import CancelIcon from '@assets/icons/cancel.svg';
import { Radio_active, Radio_disabled } from '@assets/icons/radio';
import UploadIcon from '@assets/icons/upload.svg';
import Button from '@components/common/Button';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import Modal from '@components/common/Modal';
import Tabs from '@components/common/Tabs';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import NoResut from '@components/NoResult';
import PaymentCard from '@components/PaymentCard';
import { BANK_CODE } from '@constants/bank';
import { CANCEL_REASON } from '@constants/notice';
import { MYPAGE_TABS } from '@constants/tabs';
import { useCancelPayment, useGetPaymentList } from '@hooks/queries/usePayment';
import { useForm } from 'react-hook-form';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import * as style from './styles';

interface FormInputs {
  cancelReason: string;
  bank: string;
  accountNumber: string;
  holderName: string;
}

export default function PayInfo() {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedPayInfo, setClickedPayInfo] = useState({
    id: '',
    amount: 0,
    isVirtualAccountAndDeposited: false,
  });

  const { data: paymentList } = useGetPaymentList();
  const { mutate: cancelPayment } = useCancelPayment();

  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: { cancelReason: CANCEL_REASON[0], bank: '' },
  });

  const goNextStep = () => setStep(step => step + 1);

  const onCancelPayment = () => {
    const { id, amount, isVirtualAccountAndDeposited } = clickedPayInfo;

    const commonForm = {
      id,
      cancelReason: watch('cancelReason'),
      amount,
    };

    const refundReceiveAccount = {
      bank: BANK_CODE[watch('bank')],
      accountNumber: watch('accountNumber'),
      holderName: watch('holderName'),
    };

    const cancelPayInfo = isVirtualAccountAndDeposited
      ? {
          ...commonForm,
          refundReceiveAccount,
        }
      : commonForm;

    cancelPayment(cancelPayInfo);
  };

  function ButtonGroup({
    closeBtnText = '닫기',
    children,
  }: {
    closeBtnText?: string;
    children: ReactNode;
  }) {
    return (
      <div className={flex({ justifyContent: 'space-between' })}>
        <Button
          color="primary"
          className={css({ width: '11rem' })}
          onClick={() => setIsOpen(status => !status)}
        >
          {closeBtnText}
        </Button>
        {children}
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState(MYPAGE_TABS[0]);

  return (
    <>
      <Header title="내 정보 관리" />

      <Tabs data={MYPAGE_TABS} activeTab={activeTab} onSetActiveTab={setActiveTab} />

      {paymentList?.length === 0 && (
        <NoResut
          title="아직 참여한 펀딩이 없어요"
          desc="집들이를 준비하는 친구에게 집업을 알려보세요."
        />
      )}
      <div className={style.listWrapper}>
        {paymentList?.map(info => (
          <PaymentCard
            paymentInfo={info}
            key={info.paymentNumber}
            handleClick={() => {
              setIsOpen(true);
              setClickedPayInfo({
                id: info.id,
                amount: info.amount,
                isVirtualAccountAndDeposited: info.isVirtualAccount && info.isDepositCompleted,
              });
            }}
          ></PaymentCard>
        ))}
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit(onCancelPayment)}>
          {step === 0 && (
            <ModalWithIcon
              icon={<CancelIcon />}
              title="정말 결제를 취소하시겠어요?"
              subtitle={
                '선물 받는 분께 취소 내역이 전달됩니다.\n삭제된 축하 메시지는 복구되지 않아요.'
              }
              buttonComponent={
                <ButtonGroup closeBtnText="아니요">
                  <NextStepButton text="예, 취소할게요" goNextStep={goNextStep} />
                </ButtonGroup>
              }
            />
          )}

          {step === 1 && (
            <ModalWithIcon
              icon={<CancelIcon />}
              title="결제 취소 이유를 알려주세요."
              buttonComponent={
                <ButtonGroup>
                  {clickedPayInfo.isVirtualAccountAndDeposited ? (
                    <NextStepButton text="결제 취소하기" goNextStep={goNextStep} />
                  ) : (
                    <Button type="submit" className={css({ width: '17.3rem' })}>
                      결제 취소하기
                    </Button>
                  )}
                </ButtonGroup>
              }
            >
              <div className={style.labelsWrapper}>
                {CANCEL_REASON.map((reason, idx) => (
                  <Fragment key={idx}>
                    <label htmlFor={`reason-${idx}`} key={idx} className={style.reasonLabel}>
                      {watch('cancelReason') === reason ? <Radio_active /> : <Radio_disabled />}
                      <span>{reason}</span>
                    </label>
                    <input
                      type="radio"
                      value={reason}
                      id={`reason-${idx}`}
                      {...register('cancelReason')}
                      className={css({ display: 'none' })}
                    />
                  </Fragment>
                ))}
              </div>
            </ModalWithIcon>
          )}

          {step === 2 && (
            <ModalWithIcon
              icon={<UploadIcon />}
              title="환불 계좌를 입력해주세요."
              buttonComponent={
                <ButtonGroup>
                  <Button type="submit" className={css({ width: '17.3rem' })} disabled={!isValid}>
                    결제 취소하기
                  </Button>
                </ButtonGroup>
              }
            >
              <div className={style.labelsWrapper}>
                <DropDown
                  menuButtonTitle="은행을 선택해주세요."
                  menuList={Object.keys(BANK_CODE)}
                  register={register('bank', { required: true })}
                  selectedData={watch('bank')}
                />
                <input
                  type="number"
                  placeholder="계좌번호의 숫자만 입력해주세요."
                  {...register('accountNumber', {
                    required: true,
                    minLength: 10,
                    maxLength: 14,
                    pattern: /^[0-9]+$/,
                  })}
                  className={style.refundLabel}
                />
                <input
                  type="text"
                  placeholder="예금주명을 입력해주세요."
                  {...register('holderName', { required: true })}
                  className={style.refundLabel}
                />
              </div>
            </ModalWithIcon>
          )}

          {step === 3 && (
            <Modal>
              <p>
                {
                  '결제 취소 신청이 완료되었습니다.\n결제하신 수단으로 영업일 2-3일 내에\n환불이 진행됩니다.'
                }
              </p>
              <Button color="primary">닫기</Button>
            </Modal>
          )}
        </form>
      )}
    </>
  );
}

function NextStepButton({ text, goNextStep }: { text: string; goNextStep: () => void }) {
  return (
    <Button className={css({ width: '16.8rem' })} onClick={goNextStep}>
      {text}
    </Button>
  );
}
