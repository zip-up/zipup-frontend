import { statusTag } from '@components/common/StatusTag/styles';
import * as createFormStyle from '@pages/funding/create/styles';
import { css, cx } from 'styled-system/css';
import { flex, vstack } from 'styled-system/patterns';

const container = vstack({
  p: '0 1.6rem',
  height: '60rem',
  gap: 0,
});

const title = css({
  color: 'text.100',
  textStyle: 'title2',
  lineHeight: '3rem',
  w: '100%',
  mt: '1rem',
  whiteSpace: 'pre-wrap',
});

const buttonWrapper = css({ gap: '1rem 0.3rem', flexWrap: 'wrap', display: 'flex', mt: '3.2rem' });

const label = {
  display: 'inline-flex',
  alignItems: 'center',
  p: '0.7rem 1.2rem 0.7rem 1.1rem',
  gap: '0.8rem',
  textStyle: 'body1',
  fontWeight: 400,
};

const resetButton = css({ ...statusTag.raw({ bg: 'black' }), ...label });

const inputFormField = cx(createFormStyle.input, css({ mt: '1.6rem', ml: 0, borderWidth: '1px' }));

const labelWithoutPadding = cx(createFormStyle.subTitle, css({ pl: 0, mt: '3.2rem' }));

const blueColorText = css({ color: 'main.blue' });

const dropInput = css({ display: 'flex', flexDir: 'column', mt: '2.5rem' });

const inputWithLabelWrapper = css({
  display: 'flex',
  flexDirection: 'column',
});

const messageInput = cx(
  inputFormField,
  css({
    height: '9.5rem',
    pt: '1.6rem',
    pl: '2.1rem',
    borderWidth: '1px',
  }),
);

const errorText = cx(createFormStyle.errorText, css({ mt: 0, ml: 0 }));

const methodInputs = flex({ flexWrap: 'wrap', textStyle: 'body2', gap: '0.8rem' });

const methodLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  rounded: '0.8rem',
  border: '1px solid',
  borderColor: 'bg.300',
  bg: 'bg.200',
  w: '16rem',
  h: '5.2rem',
  pl: '1.6rem',
  justifyContent: 'flex-start',
  color: 'text.200',
  mt: '0.8rem',
});

const dropdownWrapper = flex({
  w: '16rem',
  alignItems: 'center',
  mt: '0.8rem',
});

export {
  container,
  title,
  buttonWrapper,
  label,
  resetButton,
  dropInput,
  inputFormField,
  labelWithoutPadding,
  blueColorText,
  inputWithLabelWrapper,
  messageInput,
  errorText,
  methodInputs,
  methodLabel,
  dropdownWrapper,
};
