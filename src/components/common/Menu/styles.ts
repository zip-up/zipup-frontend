import { flex } from 'styled-system/patterns';

const menuList = flex({
  pos: 'absolute',
  top: '100%',
  direction: 'column',
  bg: 'gray.0',
  border: '1px solid',
  borderColor: 'bg.300',
  rounded: '1rem',
  zIndex: 5,
  right: 0,
  shadow: 'default',
});

const item = flex({
  w: '11.5rem',
  h: '5.2rem',
  gap: '0.8rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderBottomColor: 'bg.300',
  '&:last-child': {
    borderBottom: 'none',
  },
});

export { menuList, item };
