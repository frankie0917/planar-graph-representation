import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
export const Div = ({
  children,
  x = window.bodyWidth / 2,
  y = window.bodyHeight / 2,
  bg,
  h = 50,
  w = 50,
  xOff,
  yOff,
  style,
  ...rest
}: PropsWithChildren<
  {
    key: string;
    x?: number | string;
    y?: number | string;
    xOff?: number;
    yOff?: number;
    w?: number | string;
    h?: number | string;
    bg?: string;
  } & HTMLMotionProps<'div'>
>) => {
  return (
    <motion.div
      style={{
        width: w,
        height: h,
        background: bg,
        position: 'absolute',
        left: xOff ? window.bodyWidth / 2 + xOff : x,
        top: yOff ? window.bodyHeight / 2 + yOff : y,
        ...style,
      }}
      exit={{
        opacity: 0,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
