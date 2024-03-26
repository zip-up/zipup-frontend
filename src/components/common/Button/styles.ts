import { css } from '../../../../styled-system/css';

const button = css({
  borderRadius: '0.8rem',
  color: '#FFF',
  fontFamily: 'pretendard-semibold',
  fontSize: 'body1',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

const styles = {
  primary: css({
    backgroundColor: 'main.blue',
    '&:hover': { backgroundColor: 'blue.40' },
  }),

  secondary: css({
    backgroundColor: 'text.100',
    '&:hover': { backgroundColor: 'text.200' },
  }),

  disabled: css({
    backgroundColor: 'text.300',
    cursor: 'default',
  }),
};

export { button, styles };
