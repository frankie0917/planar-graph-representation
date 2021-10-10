import {
  HTMLMotionProps,
  motion,
  useMotionValue,
  Variant,
} from 'framer-motion';
import { isUndefined } from 'lodash';
import { PropsWithChildren, useEffect, useRef } from 'react';
export const useVertex = ({
  children,
  x: defaultX = window.bodyWidth / 2,
  y: defaultY = window.bodyHeight / 2,
  bg,
  style,
  variants,
  log,
  ...rest
}: PropsWithChildren<
  {
    key: string;
    x?: number;
    y?: number;

    h?: number | string;
    bg?: string;
    log?: boolean;
  } & HTMLMotionProps<'div'> & {
      variants: {
        initial: Variant & {
          radius: number;
          xOff?: number;
          yOff?: number;
        };
        [key: string]: Variant & {
          xOff?: number;
          yOff?: number;
        };
      };
    }
>) => {
  const initVar = variants.initial;
  const hw = window.bodyWidth / 2;
  const hh = window.bodyHeight / 2;

  const x = useMotionValue(
    isUndefined(initVar.xOff) ? defaultX : hw + initVar.xOff,
  );

  const y = useMotionValue(
    isUndefined(initVar.yOff) ? defaultY : hh + initVar.yOff,
  );
  const w = useMotionValue(variants.initial.radius * 2);
  const vertex = useRef<HTMLDivElement>(null);

  let vars = variants;
  Object.entries(variants).forEach(([key, val]: any) => {
    if (!isUndefined(val.radius)) {
      (vars[key] as any).width = val.radius * 2;
      (vars[key] as any).height = val.radius * 2;
    }

    if (!isUndefined(val.xOff)) {
      (vars[key] as any).x = hw + (val.xOff ?? 0);
    }

    if (!isUndefined(val.yOff)) {
      (vars[key] as any).y = hh + (val.yOff ?? 0);
    }
  });

  useEffect(() => {
    const onChange = () => {
      log &&
        console.log(
          rest.key + ': x: ',
          x.get(),
          ', y: ',
          y.get(),
          ', xOff: ',
          x.get() - hw,
          ', yOff: ',
          y.get() - hh,
        );
    };

    const unsubX = x.onChange(onChange);
    const unsubY = y.onChange(onChange);
    return () => {
      unsubX();
      unsubY();
    };
  }, []);

  return {
    content: (
      <motion.div
        ref={vertex}
        style={{
          width: w,
          height: w,
          background: bg,
          position: 'absolute',
          borderRadius: '50%',
          x,
          y,
          boxShadow: '0px 1px 2px 2px rgb(0 0 0 / 20%)',
          zIndex: 10,
          ...style,
        }}
        exit={{
          opacity: 0,
        }}
        drag
        variants={variants}
        {...rest}
      >
        {children}
      </motion.div>
    ),
    point: { x, y },
    width: w,
  };
};
