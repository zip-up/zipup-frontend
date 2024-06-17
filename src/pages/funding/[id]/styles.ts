import { button } from '@components/common/Button/styles';
import { css } from 'styled-system/css';
import { flex, vstack, wrap } from 'styled-system/patterns';

const pageLayout = vstack({ gap: '0' });

const wrapper = wrap({ w: '32.8rem', gap: '1.6rem', mt: '1.5rem', mb: '1.5rem' });

const titleBar = flex({ justifyContent: 'space-between', w: '100%' });

const title = css({
  color: 'text.100',
  textStyle: 'subtitle1',
  letterSpacing: '-0.02rem',
});

const borderWithPadding = {
  p: '1.4rem 2rem',
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'gray.30',
};

const paymentNotice = flex({
  rounded: '0.8rem',
  bg: 'blue.10',
  p: '0.8rem 1.2rem',
  color: 'main.blue',
  textStyle: 'caption1',
  fontWeight: 500,
  width: '100%',
  alignItems: 'center',
  gap: '0.8rem',
});

const desc = css(borderWithPadding, {
  textStyle: 'body2',
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

const buttonWrapper = flex({ gap: '0.8rem', mt: '2.4rem' });

const buttonWidth = css({ width: '10.9rem' });

const ButtonStyleLink = css(button.raw({ color: 'secondary', textStyle: 'CTAButton' }), {
  width: '16.8rem',
  h: '5.2rem',
});

export {
  pageLayout,
  wrapper,
  titleBar,
  title,
  paymentNotice,
  desc,
  imageWrapper,
  buttonWrapper,
  buttonWidth,
  ButtonStyleLink,
};
