import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

const termsContainer = vstack({
  width: '32.8rem',
  rounded: '0.8rem',
  backgroundColor: 'blue.10',
  m: '1.6rem auto',
  p: '1.2rem',
  gap: '0.8rem',
  fontSize: 'caption1',
  alignItems: 'flex-start',
});

const termWrapper = vstack({ gap: 0, alignItems: 'start' });

const label = css({ display: 'inline-flex', alignItems: 'flex-start', gap: '0.8rem' });

const checkbox = css({
  position: 'absolute',
});

const title = css({
  color: 'success',
  fontWeight: '500',
});

const terms_conditions = css({
  color: 'text.200',
  fontSize: 'caption1',
  textDecoration: 'underline',
  textUnderlineOffset: '0.2rem',
  cursor: 'pointer',
  marginLeft: '2.4rem',
});

export { termsContainer, termWrapper, label, checkbox, title, terms_conditions };
