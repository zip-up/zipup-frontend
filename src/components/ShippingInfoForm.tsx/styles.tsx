import { css } from 'styled-system/css';

const subTitle = css({
  lineHeight: 'normal',
  textStyle: 'subtitle2',
  color: 'text.100',
  marginRight: '0.4rem',
});

const box = css({
  width: '32.7rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  borderWidth: '0.1rem',
  padding: '0 2.044rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textStyle: 'body2',
  color: 'text.200',
  cursor: 'pointer',
  marginTop: '1.6rem',
  marginBottom: '-0.2rem',
});

const inputShape = css({
  outline: 'none',
  backgroundColor: 'white',
  cursor: 'pointer',
  flex: 1,
});

const pointer = css({
  cursor: 'pointer',
});

const input = css({
  width: '32.7rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  padding: '0 2rem',
  outline: 'none',
  marginTop: '1.6rem',
  textStyle: 'body2',
  color: 'text.100',
  resize: 'none',
  overflow: 'hidden',
  '&::placeholder': {
    color: 'text.200',
  },
});

const required = css({
  color: 'main.blue',
  textAlign: 'center',
  lineHeight: 'normal',
  textStyle: 'subtitle2',
});

const errorText = css({
  marginTop: '0.8rem',
  textStyle: 'caption1',
  color: 'error',
  marginLeft: '2rem',
});

const initialize = css({
  textStyle: 'caption1',
  color: 'text.200',
  cursor: 'pointer',
  lineHeight: 'normal',
  position: 'absolute',
  bottom: 0,
  right: 0,
});

const mypageCategoryBox = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'relative',
  marginBottom: '1.6rem',
});

export {
  subTitle,
  pointer,
  input,
  required,
  errorText,
  box,
  inputShape,
  initialize,
  mypageCategoryBox,
};
