import React, { PropsWithChildren, useRef } from 'react';
import { css, cx } from 'styled-system/css';

interface DraggableProps {
  className?: string;
  isDragging: boolean;
}

function Draggable({ className, children, isDragging }: PropsWithChildren<DraggableProps>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  let startPos = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging = true;
    if (scrollContainerRef.current) {
      startPos = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startPos) * 1;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const onMouseUp = () => {
    if (isDragging) {
      isDragging = false;
    }
  };

  return (
    <div
      className={cx(className, css({ cursor: isDragging ? 'grab' : 'pointer' }))}
      ref={scrollContainerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {children}
    </div>
  );
}

export default Draggable;
