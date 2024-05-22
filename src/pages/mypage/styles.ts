import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const content = css({
  backgroundColor: 'bg.200',
  paddingTop: '2.4rem',
  height: 'calc(100% - 4.8rem)',
});

const profileBox = css({
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
  gap: '0.8rem',
});

const avatar = css({
  width: '4.2rem',
  height: '4.2rem',
  borderRadius: '100%',
  overflow: 'hidden',
  marginRight: '2.4rem',
});

const infoBox = css({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

const nameBox = css({
  textStyle: 'title2',
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

const cardSection = flex.raw({
  marginTop: '3.2rem',
  padding: '2.4rem 1.6rem',
  bgColor: 'blue.10',
  direction: 'column',
  gap: '1.6rem',
});

const serviceTitle = css({
  textStyle: 'body1',
  color: 'text.200',
  fontWeight: '600',
});

const supportCardSection = css(cardSection, { bgColor: 'bg.200', mt: 0 });

const logoutBtn = css({
  width: '8.2rem',
  height: '3rem',
  borderRadius: '0.6rem',
  borderWidth: '0.1rem',
  borderColor: 'text.300',
  textStyle: 'caption1',
  color: 'text.200',
  backgroundColor: '#fff',
  position: 'absolute',
  right: 0,
  cursor: 'pointer',
});

export {
  content,
  profileBox,
  button,
  avatar,
  infoBox,
  nameBox,
  name,
  logout,
  cardSection,
  serviceTitle,
  supportCardSection,
  logoutBtn,
};
