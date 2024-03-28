import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { fundingFormState } from '@store/store';
import { css, cx } from '@styled-system/css';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as style from './styles';
import { A, a } from '@assets/icons/priceLabel';
import Button from '@components/common/Button';
import { statusTag } from '@components/common/StatusTag/styles';
import B from '@assets/icons/priceLabel/disabled/A.svg';
import * as _s from '@pages/funding/create/styles';

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

            <div className={style.buttonWrapper}>
              {priceLabel.map(({ label, price, icon_active, icon_disabled }, idx) => {
                return (
                  <>
                    <label
                      htmlFor={`price-${idx}`}
                      key={idx}
                      className={cx(
                        statusTag({ bg: selected == price ? 'blue' : 'disabled' }),
                        style.label,
                      )}
                    >
                      {selected == price ? icon_active : icon_disabled}
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
                htmlFor="customPrice"
                className={cx(
                  statusTag({ bg: watch('enteredCustomPrice') ? 'blue' : 'disabled' }),
                  style.label,
                )}
              >
                사랑하는 만큼 직접 기입하기
              </label>
              <input
                id="customPrice"
                type="checkbox"
                {...register('enteredCustomPrice', {
                  onChange: () => {
                    resetField('price', { defaultValue: 0 });
                    resetField('customPrice');
                    clearErrors('customPrice');
                  },
                })}
              />

              <button
                type="button"
                onClick={() => reset({ price: 5000 })}
                className={style.resetButton}
              >
                리셋
              </button>
            </div>

            {enteredCustomPrice && (
              <div className={style.dropInput}>
                <label className={style.labelWithoutPadding}>
                  금액을 직접 입력해주세요. <span className={style.blueColorText}>*</span>
                </label>
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
                  className={style.inputWithoutMargin}
                />
                {errors.customPrice && <span>{errors.customPrice.message}</span>}
              </div>
            )}

            <Button
              type="button"
              color="secondary"
              wFull
              onClick={async () => {
                enteredCustomPrice && (await trigger('customPrice'));

                !errors.customPrice && setStep(2);
              }}
              style={{ position: 'relative', bottom: '-250px' }}
            >
              다음
            </Button>
          </>
        );

      case 2:
        return (
          <div className={style.container}>
            <div className={style.title}>
              <p>김집업님에게</p>하고 싶은 말을 적어주세요
            </div>

            <div className={style.inputWithLabelWrapper}>
              <label className={style.labelWithoutPadding}>
                From. <span className={style.blueColorText}>*</span>
              </label>
              <input
                {...register('senderName', {
                  required: '필수 항목을 입력해주세요.',
                  maxLength: 10,
                })}
                className={style.inputWithoutMargin}
                placeholder="보내는 사람의 이름을 입력해주세요."
              />
              {errors.senderName && <span>{errors.senderName.message}</span>}
            </div>

            <div className={style.inputWithLabelWrapper}>
              <label className={style.labelWithoutPadding}>
                마음을 축하 메세지로 전해주세요. <span className={style.blueColorText}>*</span>
              </label>
              <textarea
                {...register('msg', { required: '필수 항목을 입력해주세요.', maxLength: 70 })}
                className={style.messageInput}
                placeholder="친구에게 하고 싶은 말을 자유롭게 적어주세요."
              />
              {errors.msg && <span>{errors.msg.message}</span>}
            </div>

            <Button color="secondary" wFull>
              결제하기
            </Button>
          </div>
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
