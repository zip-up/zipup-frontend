import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import CancelIcon from '@assets/icons/cancel.svg';
import { Radio_active, Radio_disabled } from '@assets/icons/radio';
import UploadIcon from '@assets/icons/upload.svg';
import Button from '@components/common/Button';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import PaymentCard from '@components/PaymentCard';
import { useGetPaymentList } from '@hooks/queries/usePayment';
import { useForm } from 'react-hook-form';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import * as style from './styles';

const CANCEL_REASON = [
  '단순 변심',
  '금액을 잘못 입력했어요',
  '결제 취소 후 다시 참여할 예정이에요',
];

const REFUND_BANKS = [
  '경남은행',
  '광주은행',
  '단위농협(지역농축협)',
  '부산은행',
  '새마을금고',
  '산림조합',
  '신한은행',
  '신협',
  '씨티은행',
  '우리은행',
  '우체국예금보험',
  '저축은행중앙회',
  '전북은행',
  '제주은행',
  '카카오뱅크',
  '케이뱅크',
  '토스뱅크',
  '하나은행',
  'IBK기업은행',
  'KB국민은행',
  'DGB대구은행',
  'KDB산업은행',
  'NH농협은행',
  'SC제일은행',
  'Sh수협은행',
];
interface FormInputs {
  cancelReason: string;
  bank: string;
  accountNumber: string;
  holderName: string;
}

export default function PayInfo() {
  const { data: paymentList } = useGetPaymentList();
  const [step, setStep] = useState(0);

  const {
    register,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: { cancelReason: CANCEL_REASON[0] },
  });

  console.log(watch('bank'), watch('cancelReason'), watch('accountNumber'));

  // useEffect(() => {
  //   InstanceWithToken.post('/v1/payment/cancel', {
  //     paymentKey: 'tviva20240415142211SFdY0',
  //     cancelReason: '단순 변심',
  //     cancelAmount: 2000,
  //   });
  // }, []);

  return (
    <>
      <Header hasTitle title="내 정보 관리" />
      {/** tab component */}
      <div className={style.listWrapper}>
        {paymentList?.map(info => (
          <PaymentCard
            paymentInfo={info}
            key={info.paymentNumber}
            handleClick={() => {}}
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
              <Button
                color="secondary"
                className={css({ width: '16.8rem' })}
                onClick={() => setStep(step => step + 1)}
              >
                예, 취소할게요
              </Button>
            </div>
          }
        />
      )}

      {step === 1 && (
        <ModalWithIcon
          icon={<CancelIcon />}
          title="결제 취소 이유를 알려주세요."
          buttonComponent={<CommonButtons setStep={setStep} isValid={isValid} />}
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
          buttonComponent={<CommonButtons setStep={setStep} isValid={isValid} />}
        >
          <DropDown
            menuButtonTitle="은행을 선택해주세요."
            menuList={REFUND_BANKS}
            register={register('bank', { required: true })}
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
          />
          <input
            type="text"
            placeholder="예금주명을 입력해주세요."
            {...register('holderName', { required: true })}
          />
        </ModalWithIcon>
      )}
    </>
  );
}

function CommonButtons({
  setStep,
  isValid,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  isValid: boolean;
}) {
  return (
    <div className={flex({ gap: '0.8rem' })}>
      <Button color="primary" className={css({ width: '10.9rem' })}>
        닫기
      </Button>
      <Button
        color="secondary"
        className={css({ width: '16.8rem' })}
        // 마지막 step에서는 api call
        onClick={() => setStep(step => step + 1)}
        disabled={!isValid}
      >
        결제 취소하기
      </Button>
    </div>
  );
}
