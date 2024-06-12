import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const accordion = css({
  overflow: 'hidden',
});

const accordionQuestion = flex({
  cursor: 'pointer',
  width: '100%',
  padding: '2.4rem 1.6rem',
  textStyle: 'body2',
  whiteSpace: 'pre-wrap',
  gap: '1.4rem',
});

const highlight = css({
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
  textStyle: 'caption1',
  color: 'text.200',
  whiteSpace: 'pre-wrap',
  marginTop: '0.2rem',
  marginLeft: '0.6rem',
});

export { accordion, accordionContent, accordionQuestion, highlight, innerContent, content };
