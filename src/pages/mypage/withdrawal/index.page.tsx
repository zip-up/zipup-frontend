import { Fragment } from 'react';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { css, cx } from 'styled-system/css';

import * as styles from './styles';

export default function Withdraw() {
  // useEffect(() => {
  //   InstanceWithToken.put('/v1/user/withdrawal', {
  //     withdrawalReason: '단순 변심',
  //   });
  // }, []);

  const WITHDRAWAL_NOTICE = [
    '∙ 진행 중인 펀딩이 모두 완료되어야 탈퇴가 가능해요.',
    '∙ 지금 탈퇴하면 기존에 등록한 펀딩 수정/삭제는 불가능해요.',
    '∙ 지금 탈퇴하면 기존에 참여한 펀딩 결제 취소 및 환불은 고객 센터를 통해서만 가능해요.',
    '∙ 탈퇴 후 개인 회원정보와 주소 등은 모두 삭제되고, 삭제된 데이터는 복구되지 않아요.',
  ];

  const WITHDRAWAL_REASON = [
    '사용법이 복잡해요',
    '펀딩 링크를 공유하기 불편해요',
    '서비스에 신뢰가 가지 않아요',
  ];

  return (
    <>
      <Header />
      <div className={cx(styles.commonStyle.container, css({ mt: 0 }))}>
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
        <div>안내사항을 모두 확인하였으며, 이에 동의합니다.</div>

        <section className={styles.reasonFormWrapper}>
          <h3 className={styles.reasonFormSubTitle}>
            집업을 떠나시는 이유가 궁금해요. <span>더욱 노력하는 집업이 되겠습니다.</span>
          </h3>
          <div className={styles.reasonMsgWrapper}>
            {WITHDRAWAL_REASON.map((reason, idx) => (
              <Fragment key={idx}>
                <label htmlFor={`reason-${idx}`} key={idx} className={styles.reasonMsg}>
                  <span>{reason}</span>
                </label>
                <input type="radio" value={reason} id={`reason-${idx}`} />
              </Fragment>
            ))}
          </div>
        </section>

        <div className={styles.bottomFixedWrapper}>
          <div className={css({ display: 'flex', gap: '1rem' })}>
            <Button color="primary" style={{ width: '12.3rem' }}>
              돌아가기
            </Button>
            <Button style={{ width: '19.7rem' }}>탈퇴할게요</Button>
          </div>
        </div>
      </div>
    </>
  );
}
