import { useEffect, useRef, useState } from 'react';
import { css, cx } from 'styled-system/css';

import style from './styles';

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle?: () => void;
}

function Accordion({ question, answer, isOpen, onToggle }: AccordionProps) {
  const contentsRef = useRef<HTMLDivElement>(null);
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  const updateHeight = () => {
    const contentsElement = contentsRef.current;
    if (contentsElement) {
      contentsElement.style.height = isOpen ? `${contentsElement.scrollHeight}px` : '0px';
    }
  };

  useEffect(() => {
    updateHeight();

    const contentsElement = contentsRef.current;
    const transitionEndHandler = () => {
      setIsFullyClosed(!isOpen);
    };

    contentsElement?.addEventListener('transitionend', transitionEndHandler);

    return () => {
      contentsElement?.removeEventListener('transitionend', transitionEndHandler);
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className={style.accordion}>
      <div
        className={cx(
          style.accordionQuestion,
          css({
            backgroundColor: isOpen || !isFullyClosed ? 'bg.200' : 'white',
            transition: 'background-color 0.2s ease',
          }),
        )}
        onClick={onToggle}
      >
        <span className={style.highlight}>Q.</span>
        <span>{question}</span>
      </div>
      <div
        className={cx(
          style.accordionContent,
          css({
            backgroundColor: isOpen ? 'bg.200' : 'white',
          }),
        )}
        ref={contentsRef}
      >
        <div className={style.innerContent}>
          <span className={style.highlight}>A.</span>
          <span className={style.content}>{answer}</span>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
