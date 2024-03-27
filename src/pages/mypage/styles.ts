import { css } from '@styled-system/css';

const content = css({
  height: 'calc(100% - 4.8rem)',
  backgroundColor: 'bg.200',
  paddingTop: '2.4rem',
});

const profile_box = css({
  width: '32.9rem',
  height: '14.1rem',
  margin: '0 auto',
  borderRadius: '2rem',
  borderWidth: '0.1rem',
  borderColor: 'gray.30',
  backgroundColor: 'white',
  padding: '1.8rem 2.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

const button = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

const avatar = css({
  width: '4.2rem',
  height: '4.2rem',
  borderRadius: '100%',
  overflow: 'hidden',
  marginRight: '2.4rem',
});

const info_box = css({
  display: 'flex',
  alignItems: 'center',
});

const name_box = css({
  fontFamily: 'pretendard-semibold',
  fontSize: 'title2',
  fontWeight: '600',
  color: 'text.200',
  marginRight: '0.8rem',
});

const name = css({
  color: 'text.100',
  marginRight: '0.5rem',
});

const logout = css({
  cursor: 'pointer',
});

const service_box = css({
  marginTop: '3.2rem',
  width: '36rem',
  height: '25.9rem',
  padding: '2.4rem 1.6rem',
  backgroundColor: 'blue.10',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

const service_title = css({
  fontFamily: 'pretendard-semibold',
  fontWeight: '600',
  fontSize: 'body1',
  color: 'text.200',
});

const go_funding_btn = css({
  width: '32.8rem',
  height: '8rem',
  borderRadius: '0.8rem',
  paddingLeft: '2.4rem',
  backgroundColor: 'white',
  borderWidth: '0.1rem',
  borderColor: 'blue.20',
  display: 'flex',
  position: 'relative',
  cursor: 'pointer',
});

const go_funding_info_box = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.4rem',
  paddingTop: '1.1rem',
});

const go_funding_title = css({
  fontFamily: 'pretendard-semibold',
  color: 'text.100',
  fontWeight: '600',
  fontSize: 'subtitle2',
  textAlign: 'left',
});

const go_funding_subtitle = css({
  fontFamily: 'pretendard-regular',
  color: 'text.300',
  fontSize: 'body2',
  textAlign: 'left',
});

const funding_image = css({
  position: 'absolute',
  right: 0,
  bottom: '-0.08rem',
});

const footer = css({
  height: '14.8rem',
  width: '100%',
  position: 'absolute',
  bottom: 0,
});

const footer_info_box = css({
  marginLeft: '0.8rem',
  width: '16.9rem',
  height: '10.6rem',
  padding: '2.4rem 0.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
  color: 'text.100',
});

const terms_and_conditions = css({
  display: 'flex',
  gap: '0.8rem',
  fontFamily: 'pretendard-regular',
  fontSize: 'caption1',
  color: 'text.200',
  textDecoration: 'underline',
  textDecorationColor: 'text.200',
  textUnderlineOffset: '0.2rem',
});

const pointer = css({
  cursor: 'pointer',
});

const card_content = css({
  height: 'calc(100% - 4.8rem)',
  backgroundColor: 'bg.200',
  padding: '1.6rem',
});

const flex_container = css({
  width: '32.6rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  rowGap: '1.6rem',
  overflow: 'hidden',
});

export {
  content,
  profile_box,
  button,
  avatar,
  info_box,
  name_box,
  name,
  logout,
  service_box,
  service_title,
  go_funding_btn,
  go_funding_info_box,
  go_funding_subtitle,
  go_funding_title,
  funding_image,
  footer,
  footer_info_box,
  terms_and_conditions,
  pointer,
  card_content,
  flex_container,
};
