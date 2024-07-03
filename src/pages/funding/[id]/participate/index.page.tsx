import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { A, A_d, B, B_d, C, C_d, D, D_d, E, E_d } from '@assets/icons/priceLabel/index';
import { Radio_active, Radio_disabled } from '@assets/icons/radio';
import Button from '@components/common/Button';
import GradientBackground from '@components/common/Button/GradientBackground';
import DropDown from '@components/common/DropDown';
import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { statusTag } from '@components/common/StatusTag/styles';
import Term from '@components/Term';
import { infoContainer } from '@components/Term/styles';
import { PRIVACY_TERM, PURCHASE_TERM } from '@constants/terms';
import { useUser } from '@hooks/queries/useAuth';
import { useGetFundingDetail } from '@hooks/queries/useFunding';
import useFundingParticipationGuard from '@hooks/useFundingParticipationGuard';
import { setLocalStorage } from '@store/localStorage';
import { batchPaymentState, fundingFormState } from '@store/store';
import { TermsCheckFlags } from '@typings/term';
import { getFundingStatus } from '@utils/getStatus';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

export interface FormInputs extends TermsCheckFlags {
  price: number;
  enteredCustomPrice: boolean;
  customPrice: number;
  senderName: string;
  msg: string;
  method: string;
  giftCard: string;
}

export default function Participate() {
  const [_, setFundingForm] = useRecoilState(fundingFormState);
  const { data: user } = useUser();

  const router = useRouter();
  const { id: fundingId } = router.query as { id: string };

  const { data: fundingInfo } = useGetFundingDetail(fundingId);
  const PAYMENT_METHOD = ['신용・체크카드', '가상계좌', '계좌이체', '휴대폰', '상품권'];

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    trigger,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      price: 5000,
      enteredCustomPrice: false,
      method: PAYMENT_METHOD[0],
    },
    mode: 'onSubmit',
  });

  const status = fundingInfo && getFundingStatus(fundingInfo.percent, fundingInfo.expirationDate);

  useFundingParticipationGuard(status, fundingInfo?.isOrganizer, fundingInfo?.id);

  const onSubmit: SubmitHandler<FormInputs> = ({
    price,
    enteredCustomPrice,
    customPrice,
    senderName,
    msg,
  }) => {
    setLocalStorage('@participateInfo', {
      participateId: user?.id,
      senderName,
      congratsMessage: msg,
    });

    setFundingForm({
      participateId: user?.id || '',
      price: enteredCustomPrice ? customPrice : price,
    });

    router.push(
      `/funding/${fundingId}/payment/?method=${watch('method') === PAYMENT_METHOD[4] ? watch('giftCard') : watch('method') === PAYMENT_METHOD[0] ? '카드' : watch('method')}`,
    );
  };

  const onSubmitError: SubmitErrorHandler<FormInputs> = errors => {
    if (errors.isPurchaseChecked || errors.isPrivacyChecked) {
      const errorMessage = errors.isPurchaseChecked?.message || errors.isPrivacyChecked?.message;

      console.error(errorMessage);
    }
  };

  const enteredCustomPrice = watch('enteredCustomPrice');
  const selected = watch('price');
  const [step, setStep] = useState(1);
  const [differenceAmount] = useRecoilState(batchPaymentState);

  const PRICE_LABEL = [
    { label: '행복의 오천원', price: 5000, icon_active: <A />, icon_disabled: <A_d /> },
    { label: '기쁨의 만원', price: 10000, icon_active: <B />, icon_disabled: <B_d /> },
    { label: '건강의 삼만원', price: 30000, icon_active: <C />, icon_disabled: <C_d /> },
    { label: '사랑의 오만원 ', price: 50000, icon_active: <D />, icon_disabled: <D_d /> },
  ];

  useEffect(() => {
    if (status === 'EXPIRED') {
      setStep(2);
      setValue('price', differenceAmount);
    }
  }, [fundingInfo]);

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className={style.title}>
              <p>{fundingInfo?.organizerName}님을 위한</p>마음을 보내주세요
            </div>

            <div className={style.buttonWrapper}>
              {PRICE_LABEL.map(({ label, price, icon_active, icon_disabled }, idx) => {
                return (
                  <Fragment key={idx}>
                    <label
                      htmlFor={`price-${idx}`}
                      key={idx}
                      className={css(
                        statusTag.raw({ bg: selected == price ? 'blue' : 'disabled' }),
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
                className={css(
                  statusTag.raw({ bg: watch('enteredCustomPrice') ? 'blue' : 'disabled' }),
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
                size="none"
                onClick={() => reset({ price: 5000 })}
                textStyle="resetButton"
                className={style.resetButton}
              >
                리셋
              </Button>
            </div>

            {enteredCustomPrice && (
              <div className={style.dropInput}>
                <label className={cx(style.labelWithoutPadding, css({ mt: 0 }))}>
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
                    min: {
                      value: 1000,
                      message: '최소금액은 1000원입니다.',
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

            <Button
              isBottomFixed
              onClick={async () => {
                enteredCustomPrice && (await trigger('customPrice'));
                !errors.customPrice && setStep(step => step + 1);
              }}
            >
              다음
            </Button>
          </>
        );

      case 2:
        return (
          <>
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
            <Button
              isBottomFixed
              onClick={async () => {
                await trigger('senderName');
                await trigger('msg');

                if (errors.senderName?.message || errors.msg?.message) return;

                setStep(step => step + 1);
              }}
            >
              다음
            </Button>
          </>
        );

      case 3:
        const GIFT_CARD_LIST = ['문화상품권', '도서문화상품권', '게임문화상품권'];

        return (
          <>
            <p className={style.title}>{'결제 방법을 선택 후\n참여를 완료해주세요'}</p>
            <div className={style.inputWithLabelWrapper}>
              <label className={style.labelWithoutPadding}>
                결제 방법을 선택해주세요. <span className={style.blueColorText}>*</span>
              </label>
              <div className={style.methodInputs}>
                {PAYMENT_METHOD.map((method, idx) => (
                  <Fragment key={idx}>
                    <label htmlFor={method} key={idx} className={style.methodLabel}>
                      {watch('method') === method ? <Radio_active /> : <Radio_disabled />}
                      <span>{method}</span>
                    </label>
                    <input
                      type="radio"
                      value={method}
                      id={method}
                      {...register('method', {
                        required: true,
                        onChange: () => resetField('giftCard'),
                      })}
                      className={css({ display: 'none' })}
                    />
                  </Fragment>
                ))}
                {watch('method') === '상품권' && (
                  <div className={style.dropdownWrapper}>
                    <DropDown
                      menuButtonTitle="상품권 선택"
                      menuList={GIFT_CARD_LIST}
                      register={register('giftCard', { required: true })}
                      selectedData={watch('giftCard')}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={cx(infoContainer, css({ mt: '1.6rem' }))}>
              <Term
                label="isPurchaseChecked"
                term={PURCHASE_TERM}
                register={register}
                isChecked={watch('isPurchaseChecked')}
              />
              <Term
                label="isPrivacyChecked"
                term={PRIVACY_TERM}
                register={register}
                isChecked={watch('isPrivacyChecked')}
              />
            </div>
            <GradientBackground>
              <Button type="submit">결제하러 가기</Button>
            </GradientBackground>
          </>
        );
    }
  };
  const isFirstStep = step == 1 || (step == 2 && status === 'EXPIRED');

  return (
    <>
      <Header onGoBack={isFirstStep ? () => router.back() : () => setStep(step => step - 1)} />
      <div className={style.container}>
        <ProgressBar width={`${10.9 * step}rem`} />
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>{renderFormStep(step)}</form>
      </div>
    </>
  );
}
