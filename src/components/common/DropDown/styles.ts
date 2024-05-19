import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const commonMemuStyle = {
  border: '1px solid',
  borderColor: 'gray.300',
  rounded: '0.8rem',
  textStyle: 'body2',
  color: 'text.200',
};

const menuButton = css(
  commonMemuStyle,
  flex.raw({
    width: '100%',
    height: '5.2rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 1.6rem',
  }),
);

const listWrapper = css(
  commonMemuStyle,
  flex.raw({
    direction: 'column',
    mt: '0.8rem',
    overflow: 'scroll',
    position: 'absolute',
    top: '100%',
    backgroundColor: 'gray.0',
    width: '100%',
    maxHeight: '15.7rem',
    textAlign: 'start',
    shadow: 'default',
  }),
);

const menu = css({
  borderBottom: '1px solid',
  borderBottomColor: 'gray.300',
  padding: '1.2rem 1.6rem',
  height: '5.2rem',
  lineHeight: '2.6rem',
  '&:last-child': {
    borderBottom: 'none',
  },
  '& input': {
    display: 'none',
  },
  '&:hover': {
    bg: 'blue.10',
  },
});

export { menuButton, listWrapper, menu };
