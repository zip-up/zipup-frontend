import { css } from 'styled-system/css';

const step_name = css({
  color: 'main.blue',
  fontFamily: 'pretendard-regular',
  fontSize: 'body1',
  lineHeight: 'normal',
  marginTop: '1.6rem',
  paddingLeft: '2.2rem',
});

const title = css({
  marginTop: '1.7rem',
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  fontSize: 'title2',
  color: 'text.100',
  paddingLeft: '2.2rem',
  lineHeight: '2.2rem',
  marginBottom: '4.8rem',
});

const subtitle = css({
  lineHeight: 'normal',
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  fontSize: 'subtitle2',
  color: 'text.100',
  marginRight: '0.4rem',
  paddingLeft: '2rem',
});

const required = css({
  color: 'main.blue',
  textAlign: 'center',
  lineHeight: 'normal',
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  fontSize: 'subtitle2',
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
  fontFamily: 'pretendard-regular',
  fontSize: 'body2',
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
  height: 'calc(100% - 19.1rem)',
});

const button = css({
  position: 'absolute',
  bottom: '2.5rem',
  width: '32.7rem',
  marginLeft: '1.6rem',
});

const pointer = css({
  cursor: 'pointer',
});

const text_placeholder = css({
  position: 'absolute',
  left: '3.7rem',
  top: '3.08rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'body2',
  color: 'text.200',
});

const date_box = css({
  width: '32.7rem',
  height: '5.2rem',
  borderRadius: '0.8rem',
  borderWidth: '0.1rem',
  borderColor: 'main.blue',
  padding: '0 2.044rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'pretendard-regular',
  fontSize: 'body2',
  color: 'text.200',
  cursor: 'pointer',
  marginLeft: '2rem',
  marginTop: '1.6rem',
  marginBottom: '-0.2rem',
});

const error_text = css({
  marginTop: '0.8rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
  color: 'error',
  marginLeft: '2rem',
});

const input_shape = css({
  outline: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

const modal_button_wrapper = css({
  display: 'flex',
  gap: '0.8rem',
  width: '100%',
  marginTop: '3.1rem',
  justifyContent: 'center',
});

export {
  step_name,
  title,
  subtitle,
  required,
  input,
  divider,
  form,
  button,
  pointer,
  text_placeholder,
  date_box,
  error_text,
  input_shape,
  modal_button_wrapper,
};
