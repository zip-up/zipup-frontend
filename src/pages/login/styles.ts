import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

const layout = vstack({
  height: 'calc(100% - 21rem)',
  marginTop: '12rem',
});

const title = css({
  fontWeight: '700',
  fontSize: 'subtitle1',
  marginTop: '2rem',
});

const subTitle = css({
  fontSize: 'body1',
  color: 'text.200',
  marginTop: '0.8rem',
  textAlign: 'center',
});

export { layout, title, subTitle };
