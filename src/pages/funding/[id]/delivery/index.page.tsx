import DeliveryIcon from '@assets/icons/delivery.svg';
import NoticeIcon from '@assets/icons/notice.svg';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { css } from 'styled-system/css';

import * as style from './styles';

export default function Delivery() {
  const IS_DELIVERING = {
    status: '배송중',
    text1: '친구들이 모아준 마음이 김집업님께 가고 있어요.',
    text2: '조금만 기다려주세요!',
  };

  const COMPLETED_DELIVERING = {
    status: '배송완료',
    text1: '친구들이 모아준 마음이 김집업님께 도착했어요.',
    text2: '즐거운 집들이 시간 도세요!',
  };

  const deliverData = true ? IS_DELIVERING : COMPLETED_DELIVERING;
  const INVOICE_NUMBER = 1234567890123;

  return (
    <div>
      <Header title="배송 조회" />
      <div style={{ marginTop: '4rem' }}>
        <div className={style.inner}>
          <DeliveryIcon />
          <div className={style.textBox}>
            <span className={style.textWrapper}>
              선물이&nbsp;
              <span className={css({ color: 'success' })}>{deliverData.status}</span>
              {deliverData.status === '배송중' ? '이에요' : ' 되었어요'}
            </span>
          </div>
          <div className={style.infoBox}>
            <div className={style.titleBox}>
              <p className={css({ textAlign: 'center' })}>{deliverData.text1}</p>
              <p className={css({ textAlign: 'center' })}>{deliverData.text2}</p>
            </div>
            <div className={style.deliveryBox}>
              <div className={style.deliveryTextBox}>
                <span className={css({ color: 'success' })}>송장 번호</span>
                <span>{INVOICE_NUMBER}</span>
              </div>
              <div className={style.deliveryTextBox}>
                <span className={css({ color: 'success' })}>배송 업체</span>
                <span>우체국</span>
              </div>
            </div>
            <div style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
              <CopyToClipboard text={String(INVOICE_NUMBER)}>
                <Button
                  size="regular"
                  color="white"
                  style={{ padding: '1.2rem 1.6rem', height: '4.9rem' }}
                >
                  송장번호 복사하기
                </Button>
              </CopyToClipboard>
            </div>
          </div>
          <div className={style.notification}>
            <NoticeIcon />
            <span>배송 관련 문의 사항이 있다면 1:1 채널톡으로 보내주세요.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
