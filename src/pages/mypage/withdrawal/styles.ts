import { button } from '@components/common/Button/styles';
import * as paymentPageStyle from '@pages/funding/[id]/payment/styles';
import * as invitePageStyle from '@pages/invite/[id]/styles';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const bottomFixedWrapper = button({ isBottomFixed: true, position: 'last' });

const commonStyle = { ...paymentPageStyle, ...invitePageStyle };

const subTitle = css({ textStyle: 'body1', color: 'text.200', textAlign: 'center' });

const noticeWrapper = flex({
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'bg.300',
  p: '1rem',
  gap: '0.8rem',
  direction: 'column',
});

const withdrawalNotice = css({
  color: 'text.200',
  textStyle: 'caption1',
  fontWeight: 500,
  paddingLeft: '11px',
  textIndent: '-11px',
});

const reasonFormWrapper = css({ bg: 'bg.200', w: '36rem', h: '100%' });

const reasonFormSubTitle = flex({
  textStyle: 'body1',
  direction: 'column',
  color: 'text.200',
  textAlign: 'center',
  margin: '1.6rem 0 2.4rem 0',
});

const reasonMsgWrapper = flex({ direction: 'column', gap: '0.8rem', marginLeft: '1.6rem' });

const reasonMsg = css({
  color: 'text.200',
  margin: '0.8rem 0',
});

export {
  bottomFixedWrapper,
  commonStyle,
  subTitle,
  noticeWrapper,
  withdrawalNotice,
  reasonFormWrapper,
  reasonFormSubTitle,
  reasonMsgWrapper,
  reasonMsg,
};
