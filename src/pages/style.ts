import { css } from 'styled-system/css';

const text_box = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  mt: '3rem',
});

const title = css({
  fontFamily: 'bold',
  fontSize: 'title1',
  fontWeight: '700',
  width: '23.3rem',
  margin: '0 auto',
  lineHeight: '1.2',
  marginTop: '4rem',
  marginBottom: '3.2rem',
});

const highlight = css({
  color: 'main.blue',
});

const subtitle = css({
  fontFamily: 'pretendard-regular',
  fontSize: 'body1',
  color: 'gray.60',
  textAlign: 'center',
  marginBottom: '2.4rem',
});

const wrapper = css({
  width: '32.7rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

const image = css({
  width: '32.7rem',
  height: '23.4rem',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '-0.9rem',
  marginBottom: '0.9rem',
});

const service_box = css({
  width: '100%',
  height: '49.6rem',
  padding: '0.8rem 0 1.6rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  backgroundColor: 'bg.200',
  marginTop: '2rem',
});

const service_title_box = css({
  height: '4.8rem',
  paddingTop: '1.6rem',
  margin: '0 auto',
});

const service_title = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  color: 'text.100',
  fontSize: 'subtitle1',
});

const service_desc_box = css({
  height: '41.6rem',
  padding: '0.8rem 1.6rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1.6rem',
});

const service_desc_card = css({
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

const service_text_box = css({
  display: 'flex',
  flexDirection: 'column',
});

const text_title = css({
  fontSize: 'body1',
  color: 'text.100',
  fontWeight: '500',
  fontFamily: 'pretendard-regular',
});

const text_desc = css({
  fontSize: 'caption1',
  color: 'text.300',
  fontFamily: 'pretendard-regular',
  whiteSpace: 'pre-wrap',
});

const login_box = css({
  height: '19rem',
  padding: '0 1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.6rem',
  backgroundColor: 'white',
  marginTop: '4.3rem',
});

const login_text = css({
  fontFamily: 'pretendard-regular',
  color: 'text.200',
  fontSize: 'body1',
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

const login_button = css({
  height: '5.2rem',
  width: '100%',
  fontWeight: '600',
  fontFamily: 'pretendard-semibold',
  marginBottom: '3.2rem',
});

export {
  text_box,
  title,
  highlight,
  subtitle,
  wrapper,
  image,
  service_box,
  service_desc_box,
  service_desc_card,
  service_text_box,
  service_title,
  service_title_box,
  text_desc,
  text_title,
  login_box,
  login_button,
  login_text,
};
