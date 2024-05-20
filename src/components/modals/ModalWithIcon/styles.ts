import { MODAL_PADDING_VALUE_ONLY } from '@components/common/Modal/styles';
import { css } from 'styled-system/css';

const topBox = css({
  width: '100%',
  height: '10.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

const imageBox = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const image = css({
  width: '5.6rem',
  height: '5.6rem',
  marginBottom: '2.4rem',
  backgroundColor: 'bg.300',
});

const title = css({
  textStyle: 'subtitle1',
});

const subtitle = css({
  color: 'text.200',
  marginTop: '1.6rem',
  textStyle: 'body1',
});

const buttonBox = css({
  w: `calc(100% - ${MODAL_PADDING_VALUE_ONLY * 2}rem)`,
  mt: '2.5rem',
});

export { topBox, imageBox, image, title, subtitle, buttonBox };
