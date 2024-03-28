import { css } from '../../styled-system/css';

const text_box = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const title = css({
  fontFamily: 'bold',
  fontSize: 'title1',
  fontWeight: '700',
  width: '23.3rem',
  margin: '0 auto',
  lineHeight: '1.2',
  marginTop: '4rem',
  marginBottom: '3.2rem',
});

const highlight = css({
  color: 'main.blue',
});

const subtitle = css({
  fontFamily: 'pretendard-regular',
  fontSize: 'body1',
  color: 'gray.60',
  textAlign: 'center',
  marginBottom: '2.4rem',
});

const wrapper = css({
  width: '32.7rem',
  height: '37rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

const image = css({
  width: '32.7rem',
  height: '23.4rem',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '-0.9rem',
  marginBottom: '0.9rem',
});

const button = css({
  position: 'absolute',
  bottom: '1.8rem',
  left: 0,
  height: '4.9rem',
  width: '29.7rem',
  margin: '0 1rem',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
});

export { text_box, title, highlight, subtitle, wrapper, image, button };
