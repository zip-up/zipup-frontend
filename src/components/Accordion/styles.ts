import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const accordion = css({
  overflow: 'hidden',
});

const accordionQuestion = flex({
  cursor: 'pointer',
  width: '100%',
  padding: '2.4rem 1.6rem',
  fontSize: '1.4rem',
  whiteSpace: 'pre-wrap',
});

const highlight = css({
  marginRight: '1.6rem',
  color: 'success',
  fontWeight: '600',
});

const accordionContent = css({
  overflow: 'hidden',
  backgroundColor: 'bg.200',
  borderBottomColor: 'gray.300',
  borderBottomWidth: '0.1rem',
});

const innerContent = flex({
  padding: '0 1.6rem 1.6rem',
});

const content = css({
  fontSize: '1.2rem',
  color: 'text.200',
  fontWeight: '400',
  whiteSpace: 'pre-wrap',
});

const style = {
  accordion,
  accordionContent,
  accordionQuestion,
  highlight,
  innerContent,
  content,
};

export default style;
