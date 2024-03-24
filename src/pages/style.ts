import { css } from '../../styled-system/css';

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4.8rem',
  padding: '0 1.7rem',
  borderBottomWidth: '0.1rem',
  borderBottomColor: 'gray.20',
});

const logo = css({
  cursor: 'pointer',
});

const box = css({
  width: '2.4rem',
  height: '2.4rem',
  '&:nth-of-type(2)': {
    background: 'bg.300',
  },
});

const text_box = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
  height: '37rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

const image = css({
  width: '32.7rem',
  height: '23.4rem',
  background: 'bg.300',
});

export { header, logo, box, text_box, title, highlight, subtitle, wrapper, image };
