import { css } from 'styled-system/css';

const textBox = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const title = css({
  textStyle: 'title1',
  margin: '0 auto',
  lineHeight: '1.2',
  marginTop: '4rem',
  marginBottom: '3.2rem',
});

const highlight = css({
  color: 'main.blue',
  marginRight: '1rem',
});

const subTitle = css({
  color: 'gray.60',
  textAlign: 'center',
  marginBottom: '2.4rem',
  textStyle: 'body1',
});

const wrapper = css({
  width: '32.7rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
});

const image = css({
  width: '24.5rem',
  height: '23.6rem',
  pos: 'relative',
});

const serviceBox = css({
  width: '100%',
  height: '49.6rem',
  padding: '0.8rem 0 1.6rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  backgroundColor: 'bg.200',
  marginTop: '2rem',
});

const serviceTitleBox = css({
  height: '4.8rem',
  paddingTop: '1.6rem',
  margin: '0 auto',
});

const serviceTitle = css({
  color: 'text.100',
  textStyle: 'subtitle1',
});

const serviceDescBox = css({
  height: '41.6rem',
  padding: '0.8rem 1.6rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1.6rem',
});

const serviceDescCard = css({
  width: '32.8rem',
  height: '8.8rem',
  display: 'flex',
  gap: '1.6rem',
  alignItems: 'center',
  borderRadius: '0.8rem',
  borderColor: 'bg.300',
  borderWidth: '0.1rem',
  background: 'white',
  padding: '0 2.4rem',
});

const serviceTextBox = css({
  display: 'flex',
  flexDirection: 'column',
});

const textTitle = css({
  textStyle: 'body1',
  color: 'text.100',
});

const textDesc = css({
  textStyle: 'caption1',
  color: 'text.300',
  whiteSpace: 'pre-wrap',
});

const loginBox = css({
  height: '19rem',
  padding: '0 1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.6rem',
  backgroundColor: 'white',
  marginTop: '4.3rem',
});

const loginText = css({
  color: 'text.200',
  textStyle: 'body1',
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

const loginButton = css({
  marginBottom: '3.2rem',
});

export {
  textBox,
  title,
  highlight,
  subTitle,
  wrapper,
  image,
  serviceBox,
  serviceDescBox,
  serviceDescCard,
  serviceTextBox,
  serviceTitle,
  serviceTitleBox,
  textDesc,
  textTitle,
  loginBox,
  loginButton,
  loginText,
};
