import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { fundingFormState } from '@store/store';
import { css } from '@styled-system/css';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as style from './styles';
import { A, B } from '@assets/icons/priceLabel';

interface FormInputs {
  price: number;
  enteredCustomPrice: boolean;
  customPrice: number;
  senderName: string;
  msg: string;
}

export default function Participate() {
  const [fundingForm, setFundingForm] = useRecoilState(fundingFormState);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      price: 5000,
      enteredCustomPrice: false,
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = ({
    price,
    enteredCustomPrice,
    customPrice,
    ...rest
  }) => setFundingForm({ price: enteredCustomPrice ? customPrice : price, ...rest });

  const enteredCustomPrice = watch('enteredCustomPrice');

  const selected = watch('price');
  const [step, setStep] = useState(1);

  const priceLabel = [
    { label: '행복의 오천원', price: 5000, icon_active: <A />, icon_disabled: <B /> },
    { label: '기쁨의 만원', price: 10000 },
    { label: '건강의 삼만원', price: 30000 },
    { label: '사랑의 오만원 ', price: 50000 },
  ];

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={style.title}>
              <p>김집업님을 위한</p>마음을 보내주세요
            </div>

            {priceLabel.map(({ label, price, icon_active, icon_disabled }, idx) => {
              return (
                <>
                  <label htmlFor={`price-${idx}`} key={idx} className={style.label}>
                    {icon_active}
                    <span>{label}</span>
                  </label>
                  <input
                    {...register('price', {
                      onChange: () => resetField('enteredCustomPrice'),
                    })}
                    type="radio"
                    value={price}
                    id={`price-${idx}`}
                  />
                </>
              );
            })}

            <label
              htmlFor="custmPrice"
              style={{ background: enteredCustomPrice ? 'blue' : 'gray' }}
            >
              사랑하는 만큼 직접 기입하기
            </label>
            <input
              id="custmPrice"
              type="checkbox"
              {...register('enteredCustomPrice', {
                onChange: () => {
                  resetField('price', { defaultValue: 0 });
                  resetField('customPrice');
                  clearErrors('customPrice');
                },
              })}
            />

            <button type="button" onClick={() => reset()}>
              리셋
            </button>

            {enteredCustomPrice && (
              <>
                <label>금액을 직접 입력해주세요. *</label>
                <input
                  type="number"
                  {...register('customPrice', {
                    required: '필수 항목을 입력하지 않았습니다.',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: '숫자로만 입력해주세요.',
                    },
                  })}
                  placeholder="보낼 금액의 숫자만 입력해주세요."
                />
                {errors.customPrice && <span>{errors.customPrice.message}</span>}
              </>
            )}

            <button
              type="button"
              onClick={async () => {
                enteredCustomPrice && (await trigger('customPrice'));

                !errors.customPrice && setStep(2);
              }}
            >
              다음
            </button>
          </>
        );

      case 2:
        return (
          <>
            <div className={style.title}>
              <p>김집업님에게</p>하고 싶은 말을 적어주세요
            </div>

            <label>From. *</label>
            <input
              {...register('senderName', { required: '필수 항목을 입력해주세요.', maxLength: 10 })}
            />
            {errors.senderName && <span>{errors.senderName.message}</span>}

            <label>마음을 축하 메세지로 전해주세요. *</label>
            <input {...register('msg', { required: '필수 항목을 입력해주세요.', maxLength: 30 })} />
            {errors.msg && <span>{errors.msg.message}</span>}

            <button>결제하기</button>
          </>
        );
    }
  };

  return (
    <div className={style.pageLayout}>
      <Header />
      <div className={style.container}>
        <ProgressBar width={css({ width: '16.2rem' })} />
        <form onSubmit={handleSubmit(onSubmit)}>{renderFormStep(step)}</form>
      </div>
    </div>
  );
}
