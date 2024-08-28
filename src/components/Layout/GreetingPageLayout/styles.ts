import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

const container = vstack({
  m: '0 auto',
  h: '100%',
  alignItems: 'center',
  p: '1.6rem',
  height: 'calc(100vh - 6rem)',
});

const headTitle = css({
  textStyle: 'title1',
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

const positionedWrapper = css({
  position: 'absolute',
  top: '22.7rem',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '85%',
});

export { container, headTitle, subTitle, positionedParent, positionedWrapper };
