import { css } from 'styled-system/css';

const stepName = css({
  color: 'main.blue',
  textStyle: 'body1',
  lineHeight: 'normal',
  marginTop: '1.6rem',
  paddingLeft: '2.2rem',
});

const title = css({
  marginTop: '1.7rem',
  textStyle: 'title2',
  color: 'text.100',
  paddingLeft: '2.2rem',
  lineHeight: '2.2rem',
  marginBottom: '4.8rem',
});

const subTitle = css({
  lineHeight: 'normal',
  textStyle: 'subtitle2',
  color: 'text.100',
  marginRight: '0.4rem',
  paddingLeft: '2rem',
});

const subTitleWithoutPadding = css({
  lineHeight: 'normal',
  textStyle: 'subtitle2',
  color: 'text.100',
  marginRight: '0.4rem',
});

const required = css({
  color: 'main.blue',
  textAlign: 'center',
  lineHeight: 'normal',
  textStyle: 'subtitle2',
});

const input = css({
  width: '32.7rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  backgroundColor: 'bg.200',
  marginLeft: '1.7rem',
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

const inputWithoutMarginLeft = css({
  width: '32.7rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  backgroundColor: 'bg.200',
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

const divider = css({
  width: '32.8rem',
  height: '0.1rem',
  margin: '1.6rem auto',
  backgroundColor: 'gray.20',
});

const form = css({
  position: 'relative',
  height: '50rem',
  width: '100%',
});

const pointer = css({
  cursor: 'pointer',
});

const textPlaceholder = css({
  position: 'absolute',
  left: '3.7rem',
  top: '3.08rem',
  textStyle: 'body2',
  color: 'text.200',
});

const dateBox = css({
  width: '32.7rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  borderWidth: '0.1rem',
  borderColor: 'main.blue',
  padding: '0 2.044rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textStyle: 'body2',
  color: 'text.200',
  cursor: 'pointer',
  marginLeft: '2rem',
  marginTop: '1.6rem',
  marginBottom: '-0.2rem',
});

const errorText = css({
  marginTop: '0.8rem',
  textStyle: 'caption1',
  color: 'error',
  marginLeft: '2rem',
});

const inputShape = css({
  outline: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

const modalButtonWrapper = css({
  display: 'flex',
  gap: '0.8rem',
  width: '100%',
  marginTop: '3.1rem',
  justifyContent: 'center',
});

const updateWarningBox = css({
  width: '32.8rem',
  margin: '1.6rem auto',
  backgroundColor: 'blue.10',
  borderRadius: '0.8rem',
  padding: '1.2rem',
  display: 'flex',
  gap: '0.8rem',
});

const updateWarningText = css({
  textStyle: 'caption1',
  color: 'main.blue',
  fontWeight: '500',
});

export {
  stepName,
  title,
  subTitle,
  subTitleWithoutPadding,
  required,
  input,
  inputWithoutMarginLeft,
  divider,
  form,
  pointer,
  textPlaceholder,
  dateBox,
  errorText,
  inputShape,
  modalButtonWrapper,
  updateWarningBox,
  updateWarningText,
};
