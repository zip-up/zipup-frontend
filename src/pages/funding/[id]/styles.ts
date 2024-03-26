import { css, cx } from '@styled-system/css';
import { vstack, wrap } from '@styled-system/patterns';

const pageLayout = vstack({ gap: '0' });

const imageWrapper = wrap({ w: 'auto', height: '22.5rem', pt: '4rem' });

const wrapper = wrap({ w: '32.8rem', gap: '1.6rem', mt: '1.5rem', mb: '1.5rem' });

const topbar = wrap({
  justifyContent: 'space-between',
  w: '100%',
});

const title = css({
  color: 'text.100',
  fontSize: 'subtitle1',
  fontWeight: 600,
  letterSpacing: '-0.02rem',
});

const statusBox = vstack({
  w: '32.8rem',
  p: '0.8rem 1.6rem 1.6rem 1.6rem',
  gap: '0.8rem',
  rounded: '0.8rem',
  bg: 'blue.10',
  alignItems: 'stretch',
});

const subInfoWrapper = wrap({ justifyContent: 'space-between' });

const statusMsg = css({
  letterSpacing: '-0.016rem',
  color: 'text.100',
});

const percentageText = css({
  color: 'main.blue',
  fontWeight: 600,
  letterSpacing: '-0.016rem',
});

const caption = css({
  fontSize: 'caption1',
  letterSpacing: '-0.012rem',
  color: 'text.200',
});

const blueText = css({
  color: 'main.blue',
});

const captionWrapper = cx(subInfoWrapper, caption);

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
});

export {
  pageLayout,
  imageWrapper,
  wrapper,
  topbar,
  title,
  statusBox,
  statusMsg,
  percentageText,
  subInfoWrapper,
  captionWrapper,
  blueText,
  desc,
};