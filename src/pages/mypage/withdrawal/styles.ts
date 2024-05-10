import { button } from '@components/common/Button/styles';
import * as paymentPageStyle from '@pages/funding/[id]/payment/styles';
import * as invitePageStyle from '@pages/invite/[id]/styles';
import { css } from 'styled-system/css';
import { flex, vstack } from 'styled-system/patterns';

const bottomFixedWrapper = button({ isBottomFixed: true, position: 'last' });

const commonStyle = { ...paymentPageStyle, ...invitePageStyle };

const layout = vstack({
  margin: '0 auto',
  padding: '1.6rem',
  h: '100%',
  pb: 0,
  gap: '1.6rem',
});

const subTitle = css({ textStyle: 'body1', color: 'text.200', textAlign: 'center' });

const noticeWrapper = flex({
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'bg.300',
  p: '1.2rem',
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

const noticeCheckboxWrapper = flex({
  w: '100%',
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'bg.300',
  bg: 'bg.200',
  textStyle: 'caption1',
  color: 'text.200',
  p: '1.2rem',
});

const checkboxLabel = flex({
  gap: '0.8rem',
  align: 'center',
});

const reasonFormWrapper = css({ bg: 'bg.200', w: '36rem', height: '100%', pb: '5rem' });

const reasonFormSubTitle = flex({
  textStyle: 'body1',
  direction: 'column',
  color: 'text.200',
  textAlign: 'center',
  margin: '1.6rem 0 2rem',
});

const reasonMsgWrapper = flex({ direction: 'column', gap: '0.2rem', margin: '0 1.6rem' });

const reasonMsgLabel = flex({
  color: 'text.200',
  margin: '0.8rem 0',
  align: 'center',
  gap: '1.6rem',
  textStyle: 'body2',
});

const otherReasonInput = css({
  p: '1.3rem 2.05rem',
  border: '1px solid',
  borderColor: 'bg.300',
  rounded: '0.8rem',
  textStyle: 'body2',
  outline: 'none',
});

export {
  bottomFixedWrapper,
  layout,
  commonStyle,
  subTitle,
  noticeWrapper,
  noticeCheckboxWrapper,
  checkboxLabel,
  withdrawalNotice,
  reasonFormWrapper,
  reasonFormSubTitle,
  reasonMsgWrapper,
  reasonMsgLabel,
  otherReasonInput,
};
