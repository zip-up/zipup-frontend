import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Checkbox_active, Checkbox_disabled } from '@assets/icons/checkbox';
import { Radio_active, Radio_disabled } from '@assets/icons/radio';
import Button from '@components/common/Button';
import GradientBackground from '@components/common/Button/GradientBackground';
import Header from '@components/common/Header';
import { WITHDRAWAL_NOTICE, WITHDRAWAL_REASON } from '@constants/notice';
import { useWithdrawal } from '@hooks/queries/useAuth';
import { useForm } from 'react-hook-form';
import { css, cx } from 'styled-system/css';

import * as styles from './styles';

interface FormInputs {
  isNoticeChecked: boolean;
  reason: string;
  otherReason: string;
}

export default function Withdraw() {
  const { register, watch, resetField } = useForm<FormInputs>({
    defaultValues: { reason: '사용법이 복잡해요' },
  });
  const { mutate: handleWithdrawal } = useWithdrawal();

  const isOtherReasonSelected = watch('reason') === '기타';

  const router = useRouter();

  useEffect(() => {
    if (isOtherReasonSelected) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isOtherReasonSelected]);

  return (
    <>
      <Header />
      <div className={styles.layout}>
        <h1 className={cx(styles.commonStyle.headTitle, css({ textStyle: 'title2', mb: 0 }))}>
          정말
          <span
            className={cx(
              styles.commonStyle.colorText({ color: 'blue', objective: 'title' }),
              css({ textStyle: 'title2' }),
            )}
          >
            {''} 탈퇴
          </span>
          하시겠어요?
        </h1>
        <div className={styles.subTitle}>
          잠깐! 집업을 탈퇴하기 전에<p>아래 정보를 확인해주세요.</p>
        </div>
        <div className={styles.noticeWrapper}>
          {WITHDRAWAL_NOTICE.map((notice, idx) => (
            <span key={idx} className={styles.withdrawalNotice}>
              {notice}
            </span>
          ))}
        </div>
        <div className={styles.noticeCheckboxWrapper}>
          <label htmlFor="notice" className={styles.checkboxLabel}>
            {watch('isNoticeChecked') ? <Checkbox_active /> : <Checkbox_disabled />}
            <span>안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
          </label>
          <input
            id="notice"
            type="checkbox"
            {...register('isNoticeChecked', { required: '약관 동의가 필요합니다.' })}
          />
        </div>

        <section className={cx(styles.reasonFormWrapper, css({ minH: 'fit-content' }))}>
          <h3 className={styles.reasonFormSubTitle}>
            집업을 떠나시는 이유가 궁금해요. <span>더욱 노력하는 집업이 되겠습니다.</span>
          </h3>
          <div className={styles.reasonMsgWrapper}>
            {WITHDRAWAL_REASON.map((reason, idx) => (
              <Fragment key={idx}>
                <label htmlFor={`reason-${idx}`} key={idx} className={styles.reasonMsgLabel}>
                  {watch('reason') === reason ? <Radio_active /> : <Radio_disabled />}
                  <span>{reason}</span>
                </label>
                <input
                  type="radio"
                  value={reason}
                  id={`reason-${idx}`}
                  {...register('reason', {
                    onChange: () => isOtherReasonSelected && resetField('otherReason'),
                  })}
                />
              </Fragment>
            ))}
            {isOtherReasonSelected && (
              <input
                type="text"
                placeholder="탈퇴 사유를 입력해주세요."
                className={styles.otherReasonInput}
                {...register('otherReason', { required: '탈퇴 사유를 입력해주세요.' })}
                autoFocus
              />
            )}
          </div>
        </section>
        <GradientBackground color="lightgray">
          <Button onClick={() => router.back()} color="primary" style={{ width: '12.3rem' }}>
            돌아가기
          </Button>
          <Button
            type="submit"
            style={{ width: '19.7rem' }}
            disabled={
              !watch('isNoticeChecked') ||
              !watch(isOtherReasonSelected ? 'otherReason' : 'reason').trim()
            }
            onClick={() =>
              handleWithdrawal({
                withdrawalReason: isOtherReasonSelected ? watch('otherReason') : watch('reason'),
              })
            }
          >
            탈퇴할게요
          </Button>
        </GradientBackground>
      </div>
    </>
  );
}
