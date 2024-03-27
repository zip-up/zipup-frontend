import { float, vstack } from '@styled-system/patterns';
import { css, cx } from '@styled-system/css';
import { button, styles } from '@components/common/Button/styles';

const container = vstack({
  m: '0 auto',
  h: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  p: '1.6rem',
});

const headTitle = css({
  fontSize: 'title1',
  fontWeight: '700',
  color: 'text.100',
  textAlign: 'center',
  mb: '1rem',
  '& span': {
    color: 'main.blue',
  },
});

const subTitle = css({
  color: 'text.200',
  textAlign: 'center',
  mb: '1.5rem',
});

const positionedParent = css({ pos: 'relative' });

const positionedWrapper = float({
  offsetX: '50%',
  offsetY: '80%',
  fontSize: '85%',
});

const buttonLink = cx(button, styles['secondary'], css({ w: '100%', h: '5.2rem', mt: '3rem' }));

export { container, headTitle, subTitle, buttonLink, positionedParent, positionedWrapper };
