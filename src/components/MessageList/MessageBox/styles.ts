import { css } from 'styled-system/css';
import { hstack, vstack, wrap } from 'styled-system/patterns';

const msgBox = hstack({
  p: '1.4rem 2rem',
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'gray.30',
  justifyContent: 'flex-start',
  fontSize: 'body2',
  color: 'text.100',
  gap: '2rem',
  bg: 'bg.100',
  w: '100%',
});

const image = css({ w: '5rem' });

const infoWrapper = vstack({ gap: '1.3rem', alignItems: 'flex-start' });

const info = wrap({
  gap: '1rem',
  lineHeight: '1.2rem',
  '& span': {
    fontSize: 'caption1',
  },
});

const comment = css({
  color: 'text.200',
});

const blueText = css({
  color: 'main.blue',
});

export { msgBox, image, info, comment, infoWrapper, blueText };
