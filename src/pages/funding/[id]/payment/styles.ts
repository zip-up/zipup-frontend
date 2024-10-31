import { button } from '@components/common/Button/styles';
import { css, cva } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';

const orderInfoWrapper = css({
  bg: 'bg.200',
  rounded: '1.2rem',
  padding: '1.2rem 2.4rem',
  textStyle: 'caption1',
  color: 'text.200',

  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  maxWidth: '284px',
  minWidth: '284px',
  mb: '3rem',
});

const headTitle = css({
  textStyle: 'title1',
  marginTop: 'calc(100vh * 0.1)',
});

const subInfoWrapper = hstack({ gap: 0, alignItems: 'baseline' });

const colorText = cva({
  base: {},
  variants: {
    color: {
      blue: {
        color: 'main.blue',
      },
      red: {
        color: 'error',
      },
    },
    objective: {
      title: {
        textStyle: 'title1',
      },
      subInfo: { minWidth: '5rem' },
    },
  },
});

const backBtn = css(button.raw({ color: 'primary', textStyle: 'CTAButton' }), {
  mt: 0,
  width: '12.3rem',
  h: '5.2rem',
});

const actionBtn = css(button.raw({ color: 'secondary', textStyle: 'CTAButton' }), {
  mt: 0,
  width: '19.7rem',
  h: '5.2rem',
});

export { orderInfoWrapper, headTitle, colorText, subInfoWrapper, backBtn, actionBtn };
