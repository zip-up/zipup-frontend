import { css } from 'styled-system/css';

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
  cursor: 'pointer',
});

const styledTitle = css({
  color: 'text.100',
  textStyle: 'subtitle2',
});

export { header, wrapper, styledTitle };
