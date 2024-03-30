import { css } from '@styled-system/css';

const header = css({
  height: '3.5rem',
  backgroundColor: 'blue.10',
  width: '32.58rem',
  display: 'flex',
  alignItems: 'center',
  marginTop: '-0.8rem',
});

const header_content = css({
  width: '15.9rem',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
});

const month_text = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  color: 'text.100',
  fontSize: 'body1',
});

export { header, header_content, month_text };
