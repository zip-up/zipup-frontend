import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { fundingFormState } from '@store/store';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as style from './styles';

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
    setError,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      price: '행복의 오천원',
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

  const priceLabel = ['행복의 오천원', '기쁨의 만원', '건강의 삼만원', '사랑의 오만원'];

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={style.title}>
              <p>김집업님을 위한</p>마음을 보내주세요
            </div>
            {priceLabel.map((label, idx) => (
              <>
                <label
                  htmlFor={`price-${label}`}
                  key={idx}
                  style={{ background: selected === label ? 'blue' : 'gray' }}
                >
                  {label}
                </label>
                <input
                  {...register('price', {
                    onChange: () => resetField('enteredCustomPrice'),
                  })}
                  type="radio"
                  value={label}
                  id={`price-${label}`}
                />
              </>
            ))}

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
                  resetField('customPrice', { defaultValue: 0 });
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
    <>
      <Header />
      <div className={style.container}>
        <ProgressBar />
        <form onSubmit={handleSubmit(onSubmit)}>{renderFormStep(step)}</form>
      </div>
    </>
  );
}
