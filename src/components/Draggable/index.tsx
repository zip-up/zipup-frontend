import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';

interface DraggableProps {
  className: string;
}

function useDraggable(ref: React.MutableRefObject<HTMLElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const preventUnexpectedEffects = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      preventUnexpectedEffects(e);
      if (ref.current) {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
      }
    },
    [ref],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      preventUnexpectedEffects(e);
      if (!isDragging || !ref.current) return;
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 0.8; // scroll-fast
      ref.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft, ref],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove as unknown as EventListener);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return {
    events: {
      onMouseDown,
    },
  };
}

function Draggable({ className, children }: PropsWithChildren<DraggableProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(ref);

  return (
    <div className={className} ref={ref} {...events}>
      {children}
    </div>
  );
}

export default Draggable;
