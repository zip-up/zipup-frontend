import { highlight } from '@pages/style';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle?: () => void;
}

export default function Accordion({ question, answer, isOpen, onToggle }: AccordionProps) {
  return (
    <div className={style.accordion}>
      <div
        className={cx(
          style.accordionQuestion,
          css({
            backgroundColor: isOpen ? 'bg.200' : 'white',
            transition: 'background-color 0.2s ease',
          }),
        )}
        onClick={onToggle}
      >
        <span className={highlight}>Q.</span>
        <span className={css({ fontWeight: isOpen ? '500' : '400' })}>{question}</span>
      </div>
      <div
        className={cx(
          style.accordionContent,
          css({
            backgroundColor: isOpen ? 'bg.200' : 'white',
            height: isOpen ? 'fit-content' : 0,
            maxHeight: '30rem',
          }),
        )}
      >
        <div className={style.innerContent}>
          <span className={highlight}>A.</span>
          <span className={style.content}>{answer}</span>
        </div>
      </div>
    </div>
  );
}
