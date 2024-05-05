import { useRef, useState, useEffect } from 'react';
import style from './styles';
import { css, cx } from 'styled-system/css';

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
  const contentsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  const updateHeight = () => {
    const contentsElement = contentsRef.current;
    if (contentsElement) {
      contentsElement.style.height = isOpen ? `${contentsElement.scrollHeight}px` : '0px';
    }
  };

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
    setIsFullyClosed(false);
  };

  useEffect(() => {
    updateHeight();

    const contentsElement = contentsRef.current;
    const transitionEndHandler = () => {
      if (!isOpen) {
        setIsFullyClosed(true);
      } else {
        setIsFullyClosed(false);
      }
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
            backgroundColor: isFullyClosed ? 'white' : 'bg.200',
          }),
        )}
        onClick={handleOpenClick}
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
};

export default Accordion;
