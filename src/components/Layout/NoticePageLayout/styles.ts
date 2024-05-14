import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

const layout = vstack({
  height: 'calc(100% - 21rem)',
  marginTop: '12rem',
});

const title = css({
  textStyle: 'title2',
  marginTop: '2rem',
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

const subTitle = css({
  textStyle: 'body1',
  color: 'text.200',
  marginTop: '0.8rem',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

export { layout, title, subTitle };
