/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as style from '../styles';
import classNames from 'classnames';
import { css } from 'styled-system/css';
import TextareaAutosize from 'react-textarea-autosize';
import ProgressBar from '@components/common/ProgressBar';
import { useRecoilState } from 'recoil';
import { createFundState } from '@store/store';
import { useEffect } from 'react';

interface FormInput {
  name: string;
  textMessage: string;
}

export default function CreatFundStep2() {
  const router = useRouter();
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (newFund) {
      setValue('name', newFund.title);
      setValue('textMessage', newFund.description);
    }
  }, []);

  const handleCreateFundSubmit = (data: FormInput) => {
    setNewFund({ ...newFund, title: data.name, description: data.textMessage });
    router.push('/funding/create/3');
  };

  return (
    <>
      <Header onGoBack={() => router.back()} />
      <ProgressBar width={'16.4rem'} />
      <h4 className={style.step_name}>Step 2</h4>
      <h2 className={style.title}>내 펀딩에 대해 설명해주세요.</h2>
      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subtitle}>펀딩의 제목을 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={classNames(
            style.input,
            css({ borderWidth: '1px', borderColor: errors.name ? 'error' : 'bg.300' }),
          )}
          placeholder="나만의 펀딩 이름을 입력해주세요."
          {...register('name', {
            required: '필수 항목을 입력하지 않았습니다.',
          })}
        />
        {errors.name && <p className={style.error_text}>{errors.name.message}</p>}

        <div className={style.divider} />

        <label>
          <span className={style.subtitle}>친구들에게 하고 싶은 말을 작성해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <div style={{ position: 'relative' }}>
          {!watch('textMessage') && (
            <p className={style.text_placeholder} onClick={() => setFocus('textMessage')}>
              펀딩에 대한 설명을 입력해주세요.
              <br />
              집들이 선물을 받고 싶은 이유나 원하는 선물 설명,
              <br />
              친구들을 초대하며 하고 싶은 이야기 모두 좋아요.
            </p>
          )}
          <TextareaAutosize
            className={classNames(
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
        {errors.textMessage && <p className={style.error_text}>{errors.textMessage.message}</p>}

        <Button type="submit" className={style.button} color="secondary">
          다음
        </Button>
      </form>
    </>
  );
}
