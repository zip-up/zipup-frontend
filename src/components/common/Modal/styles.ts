import { css } from 'styled-system/css';

const modalContainer = css({
  zIndex: 2,
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'rgba(53, 65, 75, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '10rem',
  whiteSpace: 'pre-wrap',
});

export const MODAL_PADDING_VALUE_ONLY = 1.8;
export const MODAL_PADDING_WITH_UNIT = `${MODAL_PADDING_VALUE_ONLY}rem`;

const modalContent = css({
  width: '32.7rem',
  backgroundColor: 'white',
  borderRadius: '2rem',
  padding: MODAL_PADDING_WITH_UNIT,
  textAlign: 'center',
  zIndex: 2,
  position: 'relative',
});

export { modalContainer, modalContent };
