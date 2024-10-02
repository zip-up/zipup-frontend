import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from '@components/Calendar';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import { createFundState } from '@store/store';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import * as style from '../styles';

interface FormInput {
  due: string;
  target: string;
}

export default function CreateFundStep3() {
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
    if (newFund) {
      if (newFund.fundingStart) {
        setValue('target', new Date(newFund.fundingStart).toISOString().split('T')[0]);
      } else {
        setValue('target', new Date().toISOString().split('T')[0]);
      }

      if (newFund.fundingFinish && typeof newFund.fundingFinish === 'string') {
        setValue('due', new Date(newFund.fundingFinish).toISOString().split('T')[0]);
      } else {
        const today = new Date();
        const dueDate = new Date(today.setDate(today.getDate() + Number(newFund.fundingFinish)));
        setValue('due', dueDate.toISOString().split('T')[0]);
      }
    }
  }, [newFund, setValue]);

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
    <div>
      <Header onGoBack={() => router.back()} />
      <ProgressBar width={'24.6rem'} />
      <h4 className={style.stepName}>Step 3</h4>
      <h2 className={style.title}>펀딩 기간을 입력해주세요</h2>
      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subTitle}>집들이 날짜가 언제인가요?</span>
          <span className={style.required}>*</span>
        </label>
        <DatePicker
          date={watch('target')}
          onSetDate={date => setValue('target', date)}
          onSetIsOpen={setisTargetOpen}
          checkIsOpen={isDueOpen}
        />
        {errors.target && !watch('target') && (
          <p className={style.errorText}>{errors.target.message}</p>
        )}

        <div style={{ marginTop: isTargetOpen ? '31.7rem' : '1.6rem' }}>
          <label>
            <span className={style.subTitle}>펀딩 마감일을 설정해주세요.</span>
            <span className={style.required}>*</span>
          </label>
          <DatePicker
            date={watch('due')}
            onSetDate={date => setValue('due', date)}
            onSetIsOpen={setisDueOpen}
            checkIsOpen={isTargetOpen}
          />
          {errors.due && !watch('due') && <p className={style.errorText}>{errors.due.message}</p>}
        </div>

        <Button type="submit" isBottomFixed>
          다음
        </Button>
      </form>
    </div>
  );
}
