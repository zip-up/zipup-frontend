import { flex } from 'styled-system/patterns';

const listWrapper = flex({
  direction: 'column',
  bg: 'bg.200',
  padding: '1.6rem',
  h: '100%',
});

const labelsWrapper = flex({
  gap: '0.4rem',
  direction: 'column',
  margin: '2.4rem 0',
  '& input': {
    display: 'none',
  },
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

export { listWrapper, reasonLabel, labelsWrapper };
