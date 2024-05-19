import { css } from 'styled-system/css';

const container = css({
  width: '15.6rem',
  height: '19.1rem',
  borderRadius: '1rem',
  borderWidth: '0.1rem',
  borderColor: 'gray.20',
  cursor: 'pointer',
});

const imageBox = css({
  width: '100%',
  height: '12rem',
  borderRadius: '1rem 1rem 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '& p': {
    transition: 'transform 0.3s ease-in-out',
    borderRadius: '1rem 1rem 0 0',
  },
  '&:hover p': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
    borderRadius: '1rem 1rem 0 0',
  },
});

const blur = css({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'text.300',
  opacity: 0.8,
  mixBlendMode: 'multiply',
  zIndex: 1,
});

const infoBox = css({
  height: '7.1rem',
  backgroundColor: 'white',
  padding: '0.6rem',
  borderRadius: '0 0 1rem 1rem',
});

const status = css({
  position: 'absolute',
  zIndex: 1,
  top: '0.8rem',
  right: '0.8rem',
});

const title = css({
  marginTop: '0.8rem',
  textStyle: 'body2',
});

const percent = css({
  color: 'main.blue',
  marginTop: '0.2rem',
  textStyle: 'caption1',
});

const imageWrapper = css({ width: '15.6rem', height: '12rem', pos: 'relative' });

export { container, imageBox, status, title, blur, infoBox, percent, imageWrapper };
