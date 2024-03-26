import { css } from '@styled-system/css';

const pageLayout = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const wrapper = css({
  display: 'flex',
  width: '32.8rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
});

const topbar = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const title = css({
  color: 'text.100',
  textAlign: 'center',
  fontSize: 'subtitle1',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '-0.02rem',
});

const statusContainer = css({
  display: 'flex',
  width: '32.8rem',
  padding: '0.8rem 1.6rem 1.6rem 1.6rem',
  flexDirection: 'column',
  gap: '0.8rem',
  borderRadius: '0.8rem',
  background: 'blue.10',
});

const statusWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const statusMessage = css({
  color: 'text.100',
  fontSize: 'body1',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  letterSpacing: '-0.016rem',
});

const percentageText = css({
  color: 'main.blue',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '-0.016rem',
});

const text = css({
  fontSize: '1.2rem',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  letterSpacing: '-0.012rem',
});

const blueText = css({
  color: 'main.blue',
});

export {
  pageLayout,
  wrapper,
  topbar,
  title,
  statusContainer,
  statusWrapper,
  statusMessage,
  percentageText,
  text,
  blueText,
};
