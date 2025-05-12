/* eslint-disable no-param-reassign */
import { RefObject } from 'react';

export default function useDraggableScroll(
  ref: RefObject<HTMLElement>,
  options: {
    direction?: 'vertical' | 'horizontal' | 'both';
  } = { direction: 'both' }
) {
  const { direction } = options;

  let initialPosition = { scrollTop: 0, scrollLeft: 0, mouseX: 0, mouseY: 0 };

  const mouseMoveHandler = (event: { clientX: number; clientY: number }) => {
    if (ref.current) {
      if (direction !== 'horizontal') {
        const dy = event.clientY - initialPosition.mouseY;
        ref.current.scrollTop = initialPosition.scrollTop - dy;
      }
      if (direction !== 'vertical') {
        const dx = event.clientX - initialPosition.mouseX;
        ref.current.scrollLeft = initialPosition.scrollLeft - dx;
      }
    }
  };

  const mouseUpHandler = () => {
    if (ref.current) ref.current.style.cursor = 'grab';

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const onMouseDown = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    if (ref.current) {
      initialPosition = {
        scrollLeft: ref.current.scrollLeft,
        scrollTop: ref.current.scrollTop,
        mouseX: clientX,
        mouseY: clientY,
      };

      ref.current.style.cursor = 'grabbing';
      ref.current.style.userSelect = 'none';

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  };

  return { onMouseDown };
}
