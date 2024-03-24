import { css } from '../../../../styled-system/css';

const modal_container = css({
  zIndex: 0,
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'rgba(53, 65, 75, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const modal_content = css({
  width: '31.7rem',
  backgroundColor: 'white',
  borderRadius: '2rem',
  padding: '1.8rem 1rem',
  textAlign: 'center',
  zIndex: 2,
  position: 'relative',
});

export { modal_container, modal_content };
