import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CancelIcon from '@assets/icons/cancel-icon.svg';
import InfoIcon from '@assets/icons/info.svg';
import Button from '@components/common/Button';
import GradientBackground from '@components/common/Button/GradientBackground';
import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import { infoContainer, title } from '@components/Term/styles';
import { createFundState, productForFundState } from '@store/store';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';

import * as style from '../styles';

interface FormInput {
  link: string;
  targetMoney: string;
}

export default function CreatFundStep1() {
  const router = useRouter();
  const [productForFund, setProductForFund] = useRecoilState(productForFundState);
  const [isOpen, setIsOpen] = useState(false);
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (newFund.productUrl && newFund.goalPrice) {
      setValue('link', newFund.productUrl);
      setValue('targetMoney', String(newFund.goalPrice));
    } else if (productForFund.url && productForFund.price) {
      setValue('link', productForFund.url);
      setValue('targetMoney', String(productForFund.price));
      setProductForFund({
        ...productForFund,
        url: '',
        price: 0,
      });
    }

    setFocus('link');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateFundSubmit = (data: FormInput) => {
    setNewFund({ ...newFund, productUrl: data.link, goalPrice: Number(data.targetMoney) });
    router.push('/funding/create/2');
  };

  const validateUrl = (url: string) =>
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url,
    );

  const resetNewFund = () => {
    setNewFund({
      title: '',
      roadAddress: '',
      detailAddress: '',
      phoneNumber: '',
      description: '',
      goalPrice: 0,
      productUrl: '',
      imageUrl: '',
      fundingStart: '',
      fundingFinish: '',
    });
  };

  return (
    <>
      {isOpen && (
        <ModalWithIcon
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="펀딩 등록을 취소할까요?"
          subtitle="작성한 내용은 저장되지 않아요."
          icon={<CancelIcon />}
          buttonComponent={
            <div className={style.modalButtonWrapper}>
              <Button
                color="primary"
                style={{ width: '10.9rem' }}
                onClick={() => {
                  router.back();
                  resetNewFund();
                }}
              >
                취소하기
              </Button>
              <Button style={{ width: '16.8rem' }} onClick={() => setIsOpen(false)}>
                계속 작성하기
              </Button>
            </div>
          }
        />
      )}
      <Header onGoBack={() => setIsOpen(true)} />
      <ProgressBar width={'8.2rem'} />
      <h4 className={style.stepName}>Step 1</h4>
      <h2 className={style.title}>어떤 집들이 선물을 원하시나요?</h2>
      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subTitle}>받고 싶은 선물을 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={cx(
            style.input,
            css({ borderWidth: '1px', borderColor: errors.link ? 'error' : 'bg.300' }),
          )}
          placeholder="원하는 상품을 판매하는 링크를 입력해주세요."
          {...register('link', {
            required: '필수 항목을 입력하지 않았습니다.',
            validate: value => validateUrl(value) || '유효한 상품 링크를 입력해주세요.',
          })}
        />
        {errors.link && <p className={style.errorText}>{errors.link.message}</p>}

        <div className={style.divider} />

        <label>
          <span className={style.subTitle}>펀딩의 목표 금액을 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={cx(
            style.input,
            css({ borderWidth: '0.1rem', borderColor: errors.targetMoney ? 'error' : 'bg.300' }),
          )}
          placeholder="받고 싶은 선물의 가격을 입력해주세요."
          {...register('targetMoney', {
            required: '필수 항목을 입력하지 않았습니다.',
            valueAsNumber: true,
            validate: value => !isNaN(Number(value)) || '숫자로만 입력해주세요.',
            min: { value: 10, message: '10원 이상 입력해주세요.' },
          })}
        />
        {errors.targetMoney && <p className={style.errorText}>{errors.targetMoney.message}</p>}

        <div className={cx(infoContainer, css({ flexDir: 'row', alignItems: 'center' }))}>
          <InfoIcon />
          <span className={title}>설정하신 목표 금액을 확인하고 최종 금액을 안내드릴게요.</span>
        </div>

        <GradientBackground>
          <Button type="submit">다음</Button>
        </GradientBackground>
      </form>
    </>
  );
}
