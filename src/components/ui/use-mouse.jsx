'use client';
import { useLayoutEffect, useRef, useState } from 'react';
export function useMouse() {
  const [state, setState] = useState({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null,
  });
  const ref = useRef(null);
  useLayoutEffect(() => {
    const handleMouseMove = (event) => {
      const newState = {
        x: event.pageX,
        y: event.pageY,
      };
      if (ref.current instanceof Element) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;
        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }
      setState((s) => ({
        ...s,
        ...newState,
      }));
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return [state, ref];
}
