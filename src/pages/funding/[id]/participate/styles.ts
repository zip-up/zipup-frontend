import { vstack } from 'styled-system/patterns';
import { css, cx } from 'styled-system/css';
import { statusTag } from '@components/common/StatusTag/styles';
import * as createFormStyle from '@pages/funding/create/styles';

const pageLayout = vstack({});

const container = vstack({
  alignItems: 'flex-start',
});

const title = css({
  fontWeight: 600,
  color: 'text.100',
  fontSize: 'title2',
  lineHeight: '3rem',
  mb: '3rem',
});

const buttonWrapper = css({ gap: '1rem 0.3rem', flexWrap: 'wrap', display: 'flex' });

const label = cx(
  css({
    display: 'inline-flex',
    alignItems: 'center',
    p: '0.7rem 1.2rem 0.7rem 1.1rem',
    gap: '0.8rem',
    fontWeight: '400',
    fontSize: '1.6rem',
  }),
);

const resetButton = cx(statusTag({ bg: 'black' }), label);

const inputFormField = cx(
  createFormStyle.input,
  css({ mt: '1.6rem', ml: 0, mb: '0.5rem', borderWidth: '1px' }),
);

const labelWithoutPadding = cx(createFormStyle.subtitle, css({ pl: 0 }));

const blueColorText = css({ color: 'main.blue' });

const dropInput = css({ display: 'flex', flexDir: 'column', mt: '2.5rem' });

const inputWithLabelWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2.2rem',
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

const errorText = cx(createFormStyle.error_text, css({ mt: 0, ml: 0 }));

const fixedPostionButton = css({ position: 'fixed', bottom: '30px', w: '32.7rem' });

export {
  pageLayout,
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
  fixedPostionButton,
};
