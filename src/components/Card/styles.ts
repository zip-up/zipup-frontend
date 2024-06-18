import { css } from 'styled-system/css';

const container = css({
  borderRadius: '1rem',
  borderWidth: '0.1rem',
  borderColor: 'bg.300',
  cursor: 'pointer',
  overflow: 'hidden',
});

const imageBox = css({
  width: '100%',
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
  backgroundColor: 'white',
  padding: '0.6rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const status = css({
  position: 'absolute',
  zIndex: 2,
  top: '0.8rem',
  right: '0.8rem',
});

const title = css({
  textStyle: 'body2',
  fontWeight: '600',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  marginBottom: '0.1rem',
});

const percent = css({
  color: 'main.blue',
  marginTop: '0.2rem',
  textStyle: 'caption1',
});

const fundProductBtn = css({
  '&:hover': {
    backgroundColor: 'text.300',
    color: 'white',
  },
});

const imageWrapper = css({ width: '15.6rem', pos: 'relative', height: '100%' });

export { container, imageBox, status, title, blur, infoBox, percent, imageWrapper, fundProductBtn };
