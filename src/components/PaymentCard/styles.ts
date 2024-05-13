import { statusTag } from '@components/common/StatusTag/styles';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const cardWrapper = css({
  border: '0.1rem solid',
  borderColor: 'bg.300',
  rounded: '1.2rem',
  bg: 'gray.0',
});

const topInfo = flex({
  padding: '1rem 1.6rem',
  borderBottom: '0.1rem solid',
  borderBottomColor: 'bg.300',
  textStyle: 'body2',
  alignItems: 'center',
  justifyContent: 'space-between',
  h: '5rem',
});

const divider = css({ color: 'bg.300', m: '0 0.8rem' });

const status = css(statusTag.raw({ size: 'static', bg: 'blue' }), {
  fontWeight: '500',
  padding: '0.8rem',
});

const contentWrapper = css({ padding: '1.6rem' });

const contentLayout = flex({ gap: '1.6rem', mb: '1.6rem' });

const subInfoWrapper = flex({ direction: 'column', gap: '0.2rem' });

const title = css({
  textStyle: 'body2',
  color: 'text.200',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '20rem',
});

export {
  cardWrapper,
  topInfo,
  divider,
  status,
  contentWrapper,
  contentLayout,
  subInfoWrapper,
  title,
};
