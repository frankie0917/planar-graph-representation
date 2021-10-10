import React, { useState } from 'react';
import { Slide0 } from './slides/Slide0';
interface Slide {
  content: () => JSX.Element;
  bg?: string;
}

const slides: Record<number, Slide> = [
  {
    content: Slide0,
  },
];

export const SlideContainer = () => {
  const [curIndex, setCurIndex] = useState(0);
  const { content, bg } = slides[curIndex];
  return (
    <div className="SlideContainer" style={{ background: bg ?? '#FD886F' }}>
      {content()}
    </div>
  );
};
