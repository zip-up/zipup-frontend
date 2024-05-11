import { button } from '@components/common/Button/styles';
import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

const layout = vstack({
  height: 'calc(100% - 21rem)',
  marginTop: '12rem',
});

const title = css({
  textStyle: 'subtitle1',
  marginTop: '2rem',
});

const subTitle = css({
  textStyle: 'body1',
  color: 'text.200',
  marginTop: '0.8rem',
  textAlign: 'center',
});

const linkButton = button({
  isBottomFixed: true,
  color: 'secondary',
  position: 'last',
  size: 'full',
  textStyle: 'CTAButton',
});

export { layout, title, subTitle, linkButton };
