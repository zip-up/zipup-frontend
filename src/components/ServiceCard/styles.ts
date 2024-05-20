import { css, cva } from 'styled-system/css';

const cardLink = cva({
  base: {
    p: '1.8rem 2.4rem',
    border: '1px solid',
    position: 'relative',
    rounded: '0.8rem',
    bg: 'main.white',
    cursor: 'pointer',
  },
  variants: {
    type: {
      service: {
        borderColor: 'blue.200',
        '& p': {
          transition: 'transform 0.3s ease-in-out',
          transformOrigin: 'bottom',
        },
        '&:hover p': {
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
          transformOrigin: 'bottom',
        },
      },
      support: {
        borderColor: 'gray.300',
      },
    },
  },
});

const title = css({
  color: 'text.100',
  textStyle: 'subtitle2',
  mb: '0.1rem',
});

const subTitle = css({
  color: 'text.300',
  textStyle: 'body2',
});

const img = css({ position: 'absolute', right: '-1.3rem', bottom: '-0.11rem' });

export { cardLink, img, title, subTitle };
