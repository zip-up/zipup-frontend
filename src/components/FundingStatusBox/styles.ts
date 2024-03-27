import { css, cx } from '@styled-system/css';
import { vstack, wrap } from '@styled-system/patterns';

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

export { statusBox, statusMsg, percentageText, subInfoWrapper, captionWrapper, blueText };
