import {
  MouseEvent,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface UseDragProps {
  ref: MutableRefObject<HTMLElement | null>;
}

const useDrag = ({ ref }: UseDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const preventUnexpectedEffects = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLElement>) => {
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
    (e: MouseEvent<HTMLElement>) => {
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

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove as unknown as EventListener);
      document.addEventListener('mouseup', onMouseUp);
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
};

export default function Draggable({
  className,
  children,
}: PropsWithChildren<{ className: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDrag({ ref });

  return (
    <div className={className} ref={ref} {...events}>
      {children}
    </div>
  );
}
