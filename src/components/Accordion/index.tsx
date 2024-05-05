import { useRef, useState, useEffect } from 'react';
import { css, cx } from 'styled-system/css';
import style from './styles';

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
  const contentsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsFullyClosed(false);
    }
  };

  useEffect(() => {
    const contentsElement = contentsRef.current;
    if (!contentsElement) return;

    const transitionEndHandler = () => {
      if (!isOpen) {
        setIsFullyClosed(true);
      }
    };

    contentsElement.addEventListener('transitionend', transitionEndHandler);

    return () => {
      contentsElement.removeEventListener('transitionend', transitionEndHandler);
    };
  }, [isOpen]);

  return (
    <div className={style.accordion}>
      <div
        className={cx(
          style.accordionQuestion,
          css({ backgroundColor: !isFullyClosed ? 'bg.200' : 'white' }),
        )}
        onClick={handleOpenClick}
      >
        <span className={style.highlight}>Q.</span>
        <span>{question}</span>
      </div>
      <div
        className={cx(css({ maxHeight: isOpen ? '10.6rem' : '0px' }), style.accordionContent)}
        ref={contentsRef}
      >
        <div className={style.innerContent}>
          <span className={style.highlight}>A.</span>
          <span className={style.content}>{answer}</span>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
