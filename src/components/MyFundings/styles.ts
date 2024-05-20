import { css } from 'styled-system/css';

const flexContainer = css({
  width: '32.6rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  rowGap: '1.6rem',
  overflow: 'hidden',
});

const noResultButton = css({
  width: '12.2rem',
  height: '4.9rem',
  marginTop: '2.6rem',
  margin: '0 auto',
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

const cardContent = css({
  height: 'calc(100% - 4.8rem)',
  backgroundColor: 'bg.200',
  padding: '1.6rem',
});

export { flexContainer, noResultButton, supportBox, logoutBtn, cardContent };
