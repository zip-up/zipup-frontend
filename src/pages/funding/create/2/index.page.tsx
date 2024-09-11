import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WarningIcon from '@assets/icons/warning.svg';
import CancelModal from '@components/CancelModal';
import Button from '@components/common/Button';
import GradientBackground from '@components/common/Button/GradientBackground';
import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { createFundState } from '@store/store';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';

import * as style from '../styles';

interface FormInput {
  name: string;
  textMessage: string;
}

export default function CreatFundStep2() {
  const router = useRouter();
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (newFund.title && newFund.description) {
      setValue('name', newFund.title);
      setValue('textMessage', newFund.description);
    }

    setFocus('name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateFundSubmit = (data: FormInput) => {
    setNewFund({ ...newFund, title: data.name, description: data.textMessage });
    router.push('/funding/create/3');
  };

  const resetNewFund = () => {
    setNewFund({
      id: '',
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
      {isOpen && newFund.target === 'update' && (
        <CancelModal
          onClose={() => setIsOpen(false)}
          onBack={() => {
            router.back();
            resetNewFund();
          }}
          condition={'update'}
        />
      )}
      <Header onGoBack={() => setIsOpen(true)} />
      <ProgressBar width={'16.4rem'} />
      <h4 className={style.stepName}>Step 2</h4>
      <h2 className={style.title}>내 펀딩에 대해 설명해주세요.</h2>
      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subTitle}>펀딩의 제목을 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={cx(
            style.input,
            css({ borderWidth: '1px', borderColor: errors.name ? 'error' : 'bg.300' }),
          )}
          placeholder="나만의 펀딩 이름을 입력해주세요."
          {...register('name', {
            required: '필수 항목을 입력하지 않았습니다.',
          })}
        />
        {errors.name && <p className={style.errorText}>{errors.name.message}</p>}

        <div className={style.divider} />

        <label>
          <span className={style.subTitle}>친구들에게 하고 싶은 말을 작성해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <div style={{ position: 'relative' }}>
          {!watch('textMessage') && (
            <p className={style.textPlaceholder} onClick={() => setFocus('textMessage')}>
              펀딩에 대한 설명을 입력해주세요.
              <br />
              집들이 선물을 받고 싶은 이유나 원하는 선물 설명,
              <br />
              친구들을 초대하며 하고 싶은 이야기 모두 좋아요.
            </p>
          )}
          <TextareaAutosize
            className={cx(
              style.input,
              css({ height: '9.5rem', padding: '1.5rem 2rem' }),
              css({ borderWidth: '1px', borderColor: errors.textMessage ? 'error' : 'bg.300' }),
            )}
            minRows={3}
            {...register('textMessage', {
              required: '필수 항목을 입력하지 않았습니다.',
            })}
          />
        </div>
        {errors.textMessage && <p className={style.errorText}>{errors.textMessage.message}</p>}
        {newFund.target === 'update' && (
          <div className={style.updateWarningBox}>
            <WarningIcon />
            <span className={style.updateWarningText}>
              펀딩 상품과 목표 금액은 수정할 수 없어요.
            </span>
          </div>
        )}

        <GradientBackground>
          <Button type="submit">다음</Button>
        </GradientBackground>
      </form>
    </>
  );
}
