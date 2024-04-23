import { MODAL_PADDING_VALUE_ONLY, MODAL_PADDING_WITH_UNIT } from '@components/common/Modal/styles';
import { css } from 'styled-system/css';

const top_box = css({
  width: '100%',
  height: '10.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

const image_box = css({
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
  fontFamily: 'pretendard-semibold',
  fontWeight: '700',
  fontSize: 'subtitle1',
});

const subtitle = css({
  fontFamily: 'pretendard-regular',
  fontSize: 'body1',
  color: 'text.200',
  fontWeight: '400',
  marginTop: '1.6rem',
});

const button_box = css({
  w: `calc(100% - ${MODAL_PADDING_VALUE_ONLY * 2}rem)`,
  mt: '2.5rem',
});

export { top_box, image_box, image, title, subtitle, button_box };
