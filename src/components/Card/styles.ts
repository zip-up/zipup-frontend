import { css } from 'styled-system/css';

const container = css({
  borderRadius: '1rem',
  borderWidth: '0.1rem',
  borderColor: 'bg.300',
  cursor: 'pointer',
  minWidth: '14.6rem',
  maxWidth: '14.6rem',
  height: '21rem',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

const imageBox = css({
  width: '100%',
  height: '13rem',
  borderRadius: '1rem 1rem 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  flex: '4',
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

const infoBox = css({
  flex: '2',
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

const imageWrapper = css({ width: '100%', pos: 'relative', height: '100%' });

export { container, imageBox, status, title, infoBox, percent, imageWrapper, fundProductBtn };
