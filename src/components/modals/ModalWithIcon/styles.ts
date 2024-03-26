import { css } from '@styled-system/css';

const top_box = css({
  width: '100%',
  height: '10.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

const image_box = css({
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
});

const subtitle = css({
  fontFamily: 'pretendard-regular',
  fontSize: 'body1',
  color: 'text.200',
  fontWeight: '400',
  marginTop: '1.6rem',
});

const button_box = css({
  width: '100%',
});

export { top_box, image_box, image, title, subtitle, button_box };
