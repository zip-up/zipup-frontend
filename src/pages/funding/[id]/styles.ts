import { css } from 'styled-system/css';
import { vstack, wrap } from 'styled-system/patterns';

const pageLayout = vstack({ gap: '0' });

const wrapper = wrap({ w: '32.8rem', gap: '1.6rem', mt: '1.5rem', mb: '1.5rem' });

const title = css({
  color: 'text.100',
  fontSize: 'subtitle1',
  fontWeight: 600,
  letterSpacing: '-0.02rem',
});

const borderWithPadding = {
  p: '1.4rem 2rem',
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'gray.30',
};

const desc = css(borderWithPadding, {
  fontSize: 'body2',
  lineHeight: '2.2rem',
  letterSpacing: '-0.014rem',
  w: '100%',
});

const imageWrapper = css({
  position: 'relative',
  width: '360px',
  height: 'fit-content',
  minHeight: '225px',
  maxHeight: '230px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export { pageLayout, wrapper, title, desc, imageWrapper };
