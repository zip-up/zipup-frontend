import { css } from '../../../../styled-system/css';

const imageBox = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const image = css({
  width: '5.6rem',
  height: '5.6rem',
  marginBottom: '2.4rem',
  backgroundColor: 'bg.300',
});

const title = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '700',
  fontSize: 'subtitle1',
  marginBottom: '1.5rem',
});

const subtitle = css({
  fontFamily: 'pretendard-regular',
  fontSize: 'body1',
  color: 'text.200',
  fontWeight: '400',
});

const button_box = css({
  width: '100%',
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

export { imageBox, image, title, subtitle, button_box, button };
