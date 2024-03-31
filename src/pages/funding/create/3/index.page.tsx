import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useRouter } from 'next/router';
import * as style from '../styles';
import { useForm } from 'react-hook-form';
import DatePicker from '@components/Calendar';
import { useEffect, useState } from 'react';
import ProgressBar from '@components/common/ProgressBar';
import { useRecoilState } from 'recoil';
import { createFundState } from '@store/store';

interface FormInput {
  due: string;
  target: string;
}

export default function CreatFundStep3() {
  const router = useRouter();
  const [isTargetOpen, setisTargetOpen] = useState(false);
  const [isDueOpen, setisDueOpen] = useState(false);
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    register('target', { required: '필수 항목을 입력하지 않았습니다.' });
    register('due', { required: '필수 항목을 입력하지 않았습니다.' });
  }, [register]);

  const handleCreateFundSubmit = (data: FormInput) => {
    setNewFund({
      ...newFund,
      fundingStart: new Date(data.target).toISOString().slice(0, -2),
      fundingFinish: new Date(data.due).toISOString().slice(0, -2),
    });
    router.push('/funding/create/4');
  };

  return (
    <>
      <Header onGoBack={() => router.back()} />
      <ProgressBar width={'24.6rem'} />
      <h4 className={style.step_name}>Step 3</h4>
      <h2 className={style.title}>목표 금액과 기간을 입력해주세요.</h2>
      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subtitle}>집들이 날짜가 언제인가요?</span>
          <span className={style.required}>*</span>
        </label>

        <DatePicker
          date={watch('target')}
          onSetDate={date => setValue('target', date)}
          onSetIsOpen={setisTargetOpen}
          checkIsOpen={isDueOpen}
        />

        {errors.target && !watch('target') && (
          <p className={style.error_text}>{errors.target.message}</p>
        )}

        <div style={{ marginTop: isTargetOpen ? '31.7rem' : '1.6rem' }}>
          <label>
            <span className={style.subtitle}>펀딩 마감일을 설정해주세요.</span>
            <span className={style.required}>*</span>
          </label>
          <DatePicker
            date={watch('due')}
            onSetDate={date => setValue('due', date)}
            onSetIsOpen={setisDueOpen}
            checkIsOpen={isTargetOpen}
          />
          {errors.due && !watch('due') && <p className={style.error_text}>{errors.due.message}</p>}
        </div>

        <Button type="submit" className={style.button} color="secondary">
          다음
        </Button>
      </form>
    </>
  );
}
