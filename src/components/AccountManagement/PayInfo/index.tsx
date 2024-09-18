import React, { useState } from 'react';
import CancelIcon from '@assets/icons/delete.svg';
import UploadIcon from '@assets/icons/upload.svg';
import Button from '@components/common/Button';
import DropDown from '@components/common/DropDown';
import Modal from '@components/common/Modal';
import { RadioSelector } from '@components/common/RadioSelector';
import Spinner from '@components/common/Spinner';
import ModalActionButtons from '@components/modals/ModalActionButtons';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import PaymentCard from '@components/PaymentCard';
import { REFUND_BANK_CODE } from '@constants/bank';
import { CANCEL_REASON } from '@constants/notice';
import { useCancelPayment } from '@hooks/queries/usePayment';
import { PaymentInfo } from '@typings/funding';
import { useForm } from 'react-hook-form';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface FormInputs {
  cancelReason: string;
  bank: string;
  accountNumber: string;
  holderName: string;
}

interface PayInfoProps {
  isLoading: boolean;
  paymentList: PaymentInfo[];
}

export default function PayInfo({ paymentList, isLoading }: PayInfoProps) {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedPayInfo, setClickedPayInfo] = useState({
    id: '',
    amount: 0,
    isVirtualAccountAndDeposited: false,
  });

  const { mutate: cancelPayment, isPending } = useCancelPayment(() => setStep(3));

  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: { cancelReason: CANCEL_REASON[0], bank: '' },
  });

  const goNextStep = () => setStep(step => step + 1);

  const handleCancelPayment = () => {
    const { id, amount, isVirtualAccountAndDeposited } = clickedPayInfo;

    const commonForm = {
      id,
      cancelReason: watch('cancelReason'),
      amount,
    };

    const refundReceiveAccount = {
      bank: REFUND_BANK_CODE[watch('bank')],
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
  const handleClickPaymentCard = (payInfo: PaymentInfo) => {
    const { id, amount, isVirtualAccount, isDepositCompleted } = payInfo;

    setIsOpen(true);
    setClickedPayInfo({
      id,
      amount,
      isVirtualAccountAndDeposited: isVirtualAccount && isDepositCompleted,
    });
  };

  return (
    <div>
      <div
        className={cx(
          style.listWrapper,
          paymentList.length === 0 && css({ justifyContent: 'center' }),
        )}
      >
        {isLoading && <Spinner />}

        {paymentList?.map(info => (
          <PaymentCard
            paymentInfo={info}
            key={info.paymentNumber}
            handleClick={() => handleClickPaymentCard(info)}
          />
        ))}
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit(handleCancelPayment)}>
          {step === 0 && (
            <ModalWithIcon
              icon={<CancelIcon />}
              title="정말 결제를 취소하시겠어요?"
              subtitle={
                '선물 받는 분께 취소 내역이 전달됩니다.\n삭제된 축하 메시지는 복구되지 않아요.'
              }
              buttonComponent={
                <ModalActionButtons
                  closeBtnText="아니요"
                  actionBtnText="예, 취소할게요"
                  handleCloseModal={() => setIsOpen(status => !status)}
                  handleAction={goNextStep}
                />
              }
            />
          )}

          {step === 1 && (
            <ModalWithIcon
              icon={<CancelIcon />}
              title="결제 취소 이유를 알려주세요."
              buttonComponent={
                <ModalActionButtons
                  action={clickedPayInfo.isVirtualAccountAndDeposited ? 'proceed' : 'submit'}
                  closeBtnText="아니요"
                  actionBtnText="결제 취소하기"
                  handleCloseModal={() => setIsOpen(status => !status)}
                  handleAction={goNextStep}
                  isLoading={isPending}
                />
              }
            >
              <RadioSelector
                reasonList={CANCEL_REASON}
                register={register}
                label={'cancelReason'}
                selected={watch('cancelReason')}
              />
            </ModalWithIcon>
          )}

          {step === 2 && (
            <ModalWithIcon
              icon={<UploadIcon />}
              title="환불 계좌를 입력해주세요."
              buttonComponent={
                <ModalActionButtons
                  action="submit"
                  closeBtnText="아니요"
                  actionBtnText="결제 취소하기"
                  disabled={!isValid}
                  handleCloseModal={() => setIsOpen(status => !status)}
                  isLoading={isPending}
                />
              }
            >
              <div className={style.labelsWrapper}>
                <DropDown
                  menuButtonTitle="은행을 선택해주세요."
                  menuList={Object.keys(REFUND_BANK_CODE)}
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
              {
                '결제 취소 신청이 완료되었습니다.\n결제하신 수단으로 영업일 2-3일 내에\n환불이 진행됩니다.'
              }
              <div className={style.buttonWrapper}>
                <Button color="primary" className={style.button} onClick={() => setIsOpen(false)}>
                  닫기
                </Button>
              </div>
            </Modal>
          )}
        </form>
      )}
    </div>
  );
}
