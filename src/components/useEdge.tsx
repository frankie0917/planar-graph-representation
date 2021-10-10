import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  MotionValue,
  SVGMotionProps,
  Variant,
  Variants,
} from 'framer-motion';
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
interface Point {
  point: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  width: MotionValue<number>;
}
export const useEdge = ({
  a,
  b,
  fill = '#fff',
  w = 5,
  ...rest
}: {
  key: string;
  a: Point;
  b: Point;
  fill?: string;
  w?: number;
} & SVGMotionProps<SVGSVGElement>) => {
  const [degree, setDegree] = useState(0);
  const [point, setPoint] = useState({
    x: a.point.x.get() + a.width.get() / 2,
    y: a.point.y.get() + a.width.get() / 2,
  });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function onChange() {
      const ax = a.point.x.get();
      const ay = a.point.y.get();
      const aWidth = a.width.get();
      const bx = b.point.x.get();
      const by = b.point.y.get();

      setPoint({ x: ax + aWidth / 2, y: ay + aWidth / 2 });

      setDistance(Math.floor(Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2)));
      const ratio = (by - ay) / (bx - ax);

      const radian = Math.atan(ratio);
      const d = (radian * 180) / Math.PI;

      // Quadrant 2 & 3
      if (bx - ax < 0) {
        setDegree(d + 180);
        return;
      }

      // Quadrant 4
      if (by - ay > 0) {
        setDegree(d + 360);
        return;
      }

      setDegree(d);
      return;
    }
    onChange();

    const unsubscribeAX = a.point.x.onChange(onChange);
    const unsubscribeAY = a.point.y.onChange(onChange);
    const unsubscribeBX = b.point.x.onChange(onChange);
    const unsubscribeBY = b.point.y.onChange(onChange);
    const unsubscribeAWidth = a.width.onChange(onChange);

    return () => {
      unsubscribeAX();
      unsubscribeAY();
      unsubscribeBX();
      unsubscribeBY();
      unsubscribeAWidth();
    };
  }, []);

  return (
    <motion.svg
      style={{
        position: 'absolute',
        rotate: degree,
        ...point,
      }}
      height={w}
      viewBox={`0 0 ${distance} ${w}`}
      {...rest}
    >
      <rect fill={fill} height={w} x="0" y="0" width={distance} />
    </motion.svg>
  );
};

export const Edge = useEdge;
