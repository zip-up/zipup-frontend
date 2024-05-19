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

const serviceBox = css({
  marginTop: '3.2rem',
  width: '36rem',
  height: '25.9rem',
  padding: '2.4rem 1.6rem',
  backgroundColor: 'blue.10',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

const serviceTitle = css({
  textStyle: 'body1',
  color: 'text.200',
});

const goFundingBtn = css({
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
  '& p': {
    transition: 'transform 0.3s ease-in-out',
    transformOrigin: 'bottom',
  },
  '&:hover p': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease-in-out',
    transformOrigin: 'bottom',
  },
});

const faqBtn = flex({
  direction: 'column',
  marginTop: '1.6rem',
  borderWidth: '0.1rem',
  borderColor: 'gray.300',
  justify: 'center',
  gap: '0.4rem',
});

const goFundingInfoBox = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.4rem',
  paddingTop: '1.1rem',
});

const goFundingTitle = css({
  color: 'text.100',
  textStyle: 'subtitle2',
  textAlign: 'left',
});

const goFundingSubTitle = css({
  color: 'text.300',
  textStyle: 'body2',
  textAlign: 'left',
});

const fundingImage = css({
  position: 'absolute',
  right: 0,
  bottom: '-0.08rem',
});

const supportBox = css({
  width: '100%',
  height: '16.3rem',
  padding: '2.4rem 1.6rem',
});

const logoutBtn = css({
  width: '8.2rem',
  height: '3rem',
  borderRadius: '0.6rem',
  borderWidth: '0.1rem',
  borderColor: 'text.300',
  fontSize: '1.2rem',
  fontWeight: '400',
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
  serviceBox,
  serviceTitle,
  goFundingBtn,
  goFundingInfoBox,
  goFundingSubTitle,
  goFundingTitle,
  fundingImage,
  supportBox,
  logoutBtn,
  faqBtn,
};
