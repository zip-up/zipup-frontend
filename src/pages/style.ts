import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const textBox = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '19.9rem',
  position: 'absolute',
  top: '2.4rem',
  left: '2.9rem',
});

const title = css({
  textStyle: 'title2',
  margin: '0 auto',
  lineHeight: '1.2',
});

const highlight = css({
  color: 'main.blue',
});

const subTitle = css({
  color: 'gray.60',
  textStyle: 'body2',
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
  height: '14.3rem',
  padding: '2.4rem 1.6rem 0',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
});

const loginText = css({
  color: 'text.200',
  textStyle: 'body1',
  textAlign: 'center',
});

const divider = css({
  width: '100%',
  height: '0.8rem',
  flexShrink: 0,
  backgroundColor: 'bg.300',
});

const sideWrapper = css({
  overflowX: 'scroll',
  flexWrap: 'nowrap',
  display: 'flex',
  gap: '0.7rem',
  paddingLeft: '1.6rem',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const subtitleBox = flex({
  justify: 'space-between',
  align: 'center',
  marginBottom: '1.6rem',
  padding: '0 1.6rem',
});

const moveText = css({
  color: 'main.blue',
  textStyle: 'caption1',
});

const iconBox = css({
  height: '5.6rem',
  width: '5.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const banner = css({ height: '45.3rem' });

const bannerWrapper = css({
  height: '31rem',
  width: '100%',
  background: 'linear-gradient(0deg, #E0F5FF 0%, #FFF 100%)',
  position: 'relative',
  overflowY: 'hidden',
});

const seeMore = flex({ align: 'center', cursor: 'pointer' });

const category = css({ textStyle: 'subtitle1' });

const homeImage1 = css({ position: 'absolute', right: '-3.393rem', top: '7rem' });

const homeImage2 = css({ position: 'absolute', right: '1.6rem', bottom: 0 });

const homeImage3 = css({ position: 'absolute', left: '5.3rem', bottom: 0 });

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
  loginText,
  divider,
  sideWrapper,
  subtitleBox,
  moveText,
  iconBox,
  bannerWrapper,
  seeMore,
  category,
  homeImage1,
  homeImage2,
  homeImage3,
  banner,
};
