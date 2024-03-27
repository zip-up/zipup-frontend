import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as style from '../styles';
import { css } from '@styled-system/css';
import classNames from 'classnames';
import { useState } from 'react';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import CancelIcon from '@assets/cancel-icon.svg';
import ProgressBar from '@components/common/ProgressBar';
import { useRecoilState } from 'recoil';
import { createFundState } from '@store/store';

interface FormInput {
  link: string;
  targetMoney: number;
}

export default function CreatFundStep1() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const handleCreateFundSubmit = (data: FormInput) => {
    setNewFund({ ...newFund, productUrl: data.link, goalPrice: data.targetMoney });
    router.push('/funding/create/2');
  };

  const validateUrl = (url: string) =>
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url,
    );

  return (
    <>
      {isOpen && (
        <ModalWithIcon
          onClose={() => setIsOpen(false)}
          title="펀딩 등록을 취소할까요?"
          subtitle="작성한 내용은 저장되지 않아요."
          icon={<CancelIcon />}
          buttonComponent={
            <div className={style.modal_button_wrapper}>
              <Button color="primary" style={{ width: '10.9rem' }} onClick={() => router.push('/')}>
                취소하기
              </Button>
              <Button
                color="secondary"
                style={{ width: '16.8rem' }}
                onClick={() => setIsOpen(false)}
              >
                계속 작성하기
              </Button>
            </div>
          }
        />
      )}
      <Header onGoBack={() => setIsOpen(true)} />
      <ProgressBar width={css({ width: '8.2rem' })} />
      <h4 className={style.step_name}>Step 1</h4>
      <h2 className={style.title}>어떤 집들이 선물을 원하시나요?</h2>
      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subtitle}>받고 싶은 선물을 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={classNames(
            style.input,
            css({ borderWidth: '1px', borderColor: errors.link ? 'error' : 'bg.300' }),
          )}
          placeholder="원하는 상품을 판매하는 링크를 입력해주세요."
          {...register('link', {
            required: '필수 항목을 입력하지 않았습니다.',
            validate: value => validateUrl(value) || '유효한 상품 링크를 입력해주세요.',
          })}
        />
        {errors.link && <p className={style.error_text}>{errors.link.message}</p>}

        <div className={style.divider} />

        <label>
          <span className={style.subtitle}>펀딩의 목표 금액을 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={classNames(
            style.input,
            css({ borderWidth: '1px', borderColor: errors.link ? 'error' : 'bg.300' }),
          )}
          placeholder="받고 싶은 선물의 가격을 입력해주세요."
          {...register('targetMoney', {
            required: '필수 항목을 입력하지 않았습니다.',
            valueAsNumber: true,
            validate: value => !isNaN(value) || '숫자로만 입력해주세요.',
          })}
        />
        {errors.targetMoney && <p className={style.error_text}>{errors.targetMoney.message}</p>}

        <div className={style.message}>
          <div className={style.message_icon} />
          <span className={style.message_text}>
            설정하신 목표 금액을 확인하고 최종 금액을 안내드릴게요 .
          </span>
        </div>
        <Button type="submit" className={style.button} color="secondary">
          다음
        </Button>
      </form>
    </>
  );
}
