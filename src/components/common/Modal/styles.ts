import { css } from 'styled-system/css';

const modal_container = css({
  zIndex: 1,
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

export const MODAL_PADDING_VALUE_ONLY = 1.8;
export const MODAL_PADDING_WITH_UNIT = `${MODAL_PADDING_VALUE_ONLY}rem`;

const modal_content = css({
  width: '32.7rem',
  backgroundColor: 'white',
  borderRadius: '2rem',
  padding: MODAL_PADDING_WITH_UNIT,
  textAlign: 'center',
  zIndex: 2,
  position: 'relative',
});

export { modal_container, modal_content };
