import { css, cva, cx } from 'styled-system/css';
import { wrap } from 'styled-system/patterns';

const statusBox = cva({
  base: {
    rounded: '0.8rem',
    p: '0.8rem 1.6rem 1.6rem 1.6rem',
    width: '100%',
  },
  variants: {
    type: {
      floating: {
        bg: 'bg.100',
        border: '1px solid',
        borderColor: 'main.blue',
        w: '25.7rem',
      },
      static: {
        bg: 'blue.10',
        w: '100%',
      },
    },
  },
});

const subInfoWrapper = wrap({ justifyContent: 'space-between', alignItems: 'center' });

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
  textStyle: 'caption1',
  letterSpacing: '-0.012rem',
  color: 'text.200',
});

const blueText = css({
  color: 'main.blue',
});

const captionWrapper = cx(subInfoWrapper, caption);

export { statusBox, statusMsg, percentageText, subInfoWrapper, captionWrapper, blueText };
