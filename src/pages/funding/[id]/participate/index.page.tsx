import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { fundingFormState } from '@store/store';
import { css, cx } from 'styled-system/css';
import { Fragment, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as style from './styles';
import { A, B, C, D, E, A_d, B_d, C_d, D_d, E_d } from '@assets/icons/priceLabel/index';
import Button, { BottomFixedStyle } from '@components/common/Button';
import { statusTag } from '@components/common/StatusTag/styles';
import { button, styles } from '@components/common/Button/styles';
import { useRouter } from 'next/router';
import { getLoacalStorage, setLocalStorage } from '@store/localStorage';
import { useGetFundingDeatil } from '@hooks/queries/useFunding';
import { TermsCheckFlags } from '@typings/term';
import { PrivacyTerm, PurchaseTerm } from '@constants/terms';
import Term from '@components/Term';
import { infoContainer } from '@components/Term/styles';

export interface FormInputs extends TermsCheckFlags {
  price: number;
  enteredCustomPrice: boolean;
  customPrice: number;
  senderName: string;
  msg: string;
}

export default function Participate() {
  const [fundingForm, setFundingForm] = useRecoilState(fundingFormState);
  const userInfo = getLoacalStorage('@user');

  const router = useRouter();
  const { id: fundingId } = router.query;

  const { data: fundingInfo } = useGetFundingDeatil(fundingId);

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
    mode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<FormInputs> = ({
    price,
    enteredCustomPrice,
    customPrice,
    senderName,
    msg,
  }) => {
    setLocalStorage('@participateInfo', {
      participateId: userInfo.id,
      senderName,
      congratsMessage: msg,
    });

    setFundingForm({
      participateId: userInfo?.id,
      price: enteredCustomPrice ? customPrice : price,
    });

    router.push(`/funding/${fundingId}/payment`);
  };

  const onSubmitError: SubmitErrorHandler<FormInputs> = errors => {
    if (errors.isPurchaseChecked || errors.isPrivacyChecked) {
      const errorMessage = errors.isPurchaseChecked?.message || errors.isPrivacyChecked?.message;

      console.log(errorMessage);
    }
  };

  const enteredCustomPrice = watch('enteredCustomPrice');
  const selected = watch('price');
  const [step, setStep] = useState(1);

  const priceLabel = [
    { label: '행복의 오천원', price: 5000, icon_active: <A />, icon_disabled: <A_d /> },
    { label: '기쁨의 만원', price: 10000, icon_active: <B />, icon_disabled: <B_d /> },
    { label: '건강의 삼만원', price: 30000, icon_active: <C />, icon_disabled: <C_d /> },
    { label: '사랑의 오만원 ', price: 50000, icon_active: <D />, icon_disabled: <D_d /> },
  ];

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className={css({ pl: '1.6rem', pr: '1.6rem' })}>
            <div className={style.title}>
              <p>{fundingInfo?.organizerName}님을 위한</p>마음을 보내주세요
            </div>

            <div className={style.buttonWrapper}>
              {priceLabel.map(({ label, price, icon_active, icon_disabled }, idx) => {
                return (
                  <Fragment key={idx}>
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
                  </Fragment>
                );
              })}

              <label
                htmlFor="customPrice"
                className={cx(
                  statusTag({ bg: watch('enteredCustomPrice') ? 'blue' : 'disabled' }),
                  style.label,
                )}
              >
                {enteredCustomPrice ? <E /> : <E_d />}
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

              <Button
                type="button"
                color="secondary"
                onClick={() => reset({ price: 5000 })}
                className={style.resetButton}
              >
                리셋
              </Button>
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
                  className={cx(
                    style.inputFormField,
                    css({ borderColor: errors.customPrice ? 'error' : 'bg.300' }),
                  )}
                />
                {errors.customPrice && (
                  <span className={style.errorText}>{errors.customPrice.message}</span>
                )}
              </div>
            )}

            <button
              type="submit"
              color="secondary"
              onClick={async () => {
                enteredCustomPrice && (await trigger('customPrice'));
                !errors.customPrice && setStep(2);
              }}
              className={cx(button, styles['secondary'], BottomFixedStyle, css({ h: '5.2rem' }))}
            >
              다음
            </button>
          </div>
        );

      case 2:
        return (
          <div className={style.container}>
            <div className={style.title}>
              <p>{fundingInfo?.organizerName}님에게</p>하고 싶은 말을 적어주세요
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
                className={cx(
                  style.inputFormField,
                  css({ borderColor: errors.senderName ? 'error' : 'bg.300' }),
                )}
                placeholder="보내는 사람의 이름을 입력해주세요."
              />
              {errors.senderName && (
                <span className={style.errorText}>{errors.senderName.message}</span>
              )}
            </div>

            <div className={cx(style.inputWithLabelWrapper, css({ marginBottom: 0 }))}>
              <label className={style.labelWithoutPadding}>
                마음을 축하 메세지로 전해주세요. <span className={style.blueColorText}>*</span>
              </label>
              <textarea
                {...register('msg', { required: '필수 항목을 입력해주세요.', maxLength: 70 })}
                className={cx(
                  style.messageInput,
                  css({ borderColor: errors.msg ? 'error' : 'bg.300' }),
                )}
                placeholder="친구에게 하고 싶은 말을 자유롭게 적어주세요."
              />
              {errors.msg && <span className={style.errorText}>{errors.msg.message}</span>}
            </div>

            <div className={cx(infoContainer, css({ m: 0 }))}>
              <Term
                label="isPurchaseChecked"
                term={PurchaseTerm}
                register={register}
                isChecked={watch('isPurchaseChecked')}
              />
              <Term
                label="isPrivacyChecked"
                term={PrivacyTerm}
                register={register}
                isChecked={watch('isPrivacyChecked')}
              />
            </div>

            <Button
              type="submit"
              color="secondary"
              isBottomFixed
              wFull
              className={style.fixedPostionButton}
            >
              결제하러 가기
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={style.pageLayout}>
      <Header onGoBack={step == 1 ? () => router.back() : () => setStep(1)} />
      <div className={style.container}>
        <ProgressBar width={step == 1 ? '16.2rem' : '32.8rem'} />
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>{renderFormStep(step)}</form>
      </div>
    </div>
  );
}
