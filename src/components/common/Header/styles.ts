import { css } from '@styled-system/css';

const header = css({
  width: '100%',
  height: '4.8rem',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2rem',
});

const wrapper = css({
  width: '2.4rem',
  height: '2.4rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const title = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  color: 'text.100',
  fontSize: 'subtitle2',
});

export { header, wrapper, title };
