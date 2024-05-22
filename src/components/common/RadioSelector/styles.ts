import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

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

const input = css({ display: 'none' });

export { labelsWrapper, reasonLabel, input };
