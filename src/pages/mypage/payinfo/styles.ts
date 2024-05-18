import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const listWrapper = flex({
  direction: 'column',
  bg: 'bg.200',
  padding: '1.6rem',
  h: '100%',
});

const labelsWrapper = flex({
  gap: '0.8rem',
  direction: 'column',
  margin: '2.4rem 0',
});

const reasonLabel = flex({
  alignItems: 'center',
  gap: '0.8rem',
  textStyle: 'body2',
  border: '0.1rem solid',
  borderColor: 'gray.300',
  rounded: '0.8rem',
  padding: '1.2rem 1.2rem 1.2rem 1.6rem',
});

const refundLabel = css({
  border: '1px solid',
  borderColor: 'gray.300',
  rounded: '0.8rem',
  textStyle: 'body2',
  color: 'text.200',
  width: '100%',
  height: '5.2rem',
  padding: '1.2rem 1.6rem',
  outline: 'none',
  _placeholder: {
    color: 'text.200',
  },
});

export { listWrapper, reasonLabel, labelsWrapper, refundLabel };
