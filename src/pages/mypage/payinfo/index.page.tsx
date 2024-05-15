import { Fragment, useState } from 'react';
import CancelIcon from '@assets/icons/cancel.svg';
import { Radio_active, Radio_disabled } from '@assets/icons/radio';
import UploadIcon from '@assets/icons/upload.svg';
import Button from '@components/common/Button';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import Modal from '@components/common/Modal';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import PaymentCard from '@components/PaymentCard';
import { REFUND_BANKS } from '@constants/bank';
import { CANCEL_REASON } from '@constants/notice';
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
  const { data: paymentList } = useGetPaymentList();
  const [step, setStep] = useState(0);
  const { mutate: _cancelPayment } = useCancelPayment();
  const [_clickedPayInfo, _setClickedPayInfo] = useState({ paymentKey: '', amount: 0 });

  const {
    register,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: { cancelReason: CANCEL_REASON[0], bank: '' },
  });

  const goNextStep = () => setStep(step => step + 1);

  const handleCancelPayment = () => {
    // cancelPayment({
    //   paymentKey: clickedPayInfo.paymentKey,
    //   cancelReason: watch('cancelReason'),
    //   amount: clickedPayInfo.amount,
    // });
  };

  return (
    <>
      <Header hasTitle title="내 정보 관리" />
      {/** tab component */}
      <div className={style.listWrapper}>
        {paymentList?.map(info => (
          <PaymentCard
            paymentInfo={info}
            key={info.paymentNumber}
            // handleClick={() =>
            //   setClickedPayInfo({ paymentKey: info.paymentKey, amount: info.amount })
            // }
          ></PaymentCard>
        ))}
      </div>

      {step === 0 && (
        <ModalWithIcon
          icon={<CancelIcon />}
          title="정말 결제를 취소하시겠어요?"
          subtitle={'선물 받는 분께 취소 내역이 전달됩니다.\n삭제된 축하 메시지는 복구되지 않아요.'}
          buttonComponent={
            <div className={flex({ gap: '0.8rem' })}>
              <Button color="primary" className={css({ width: '10.9rem' })}>
                아니요
              </Button>
              <NextStepButton text="예, 취소할게요" goNextStep={goNextStep} />
            </div>
          }
        />
      )}

      {step === 1 && (
        <ModalWithIcon
          icon={<CancelIcon />}
          title="결제 취소 이유를 알려주세요."
          buttonComponent={<ButtonGroup step={step} goNextStep={goNextStep} />}
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
            <ButtonGroup
              step={step}
              goNextStep={goNextStep}
              isValid={isValid}
              handleCancelPayment={handleCancelPayment}
            />
          }
        >
          <div className={style.labelsWrapper}>
            <DropDown
              menuButtonTitle="은행을 선택해주세요."
              menuList={REFUND_BANKS}
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

function ButtonGroup({
  step,
  goNextStep,
  isValid = true,
  handleCancelPayment,
}: {
  step: number;
  goNextStep: () => void;
  isValid?: boolean;
  handleCancelPayment?: () => void;
}) {
  return (
    <div className={flex({ justifyContent: 'space-between' })}>
      <Button color="primary" className={css({ width: '11rem' })}>
        닫기
      </Button>
      {step !== 2 ? (
        <NextStepButton text="결제 취소하기" goNextStep={goNextStep} />
      ) : (
        <Button
          className={css({ width: '17.3rem' })}
          type="submit"
          onClick={handleCancelPayment}
          disabled={!isValid}
        >
          결제 취소하기
        </Button>
      )}
    </div>
  );
}
