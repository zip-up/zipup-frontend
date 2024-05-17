import { highlight } from '@pages/style';
import { css, cx } from 'styled-system/css';

import { accordion, accordionContent, accordionQuestion, content, innerContent } from './styles';

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle?: () => void;
}

export default function Accordion({ question, answer, isOpen, onToggle }: AccordionProps) {
  return (
    <div className={accordion}>
      <div
        className={cx(
          accordionQuestion,
          css({
            backgroundColor: isOpen ? 'bg.200' : 'white',
            transition: 'background-color 0.2s ease',
          }),
        )}
        onClick={onToggle}
      >
        <span className={highlight}>Q.</span>
        <span>{question}</span>
      </div>
      <div
        className={cx(
          accordionContent,
          css({
            backgroundColor: isOpen ? 'bg.200' : 'white',
            height: isOpen ? 'fit-content' : 0,
            maxHeight: '30rem',
          }),
        )}
      >
        <div className={innerContent}>
          <span className={highlight}>A.</span>
          <span className={content}>{answer}</span>
        </div>
      </div>
    </div>
  );
}
