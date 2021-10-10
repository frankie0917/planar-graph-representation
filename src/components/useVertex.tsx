import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useMotionValue,
  Variant,
} from 'framer-motion';
import { isUndefined } from 'lodash';
import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

type DivWithVariant = HTMLMotionProps<'div'> & {
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
};

const VertexComponent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<
    {
      key: string;
      bg?: string;
      w: MotionValue<number>;
      x: MotionValue<number>;
      y: MotionValue<number>;
    } & DivWithVariant
  >
>(({ children, variants, w, bg, style, x, y, ...rest }, ref) => {
  return (
    <motion.div
      ref={ref}
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
        display: 'flex',
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
  );
});

type VertexProps = PropsWithChildren<
  {
    key: string;
    x?: number;
    y?: number;

    h?: number | string;
    bg?: string;
    log?: boolean;
  } & DivWithVariant
>;

export const useVertex = ({
  children,
  x: defaultX = window.bodyWidth / 2,
  y: defaultY = window.bodyHeight / 2,
  bg,
  style,
  variants,
  log,
  ...rest
}: VertexProps) => {
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
      <VertexComponent
        ref={vertex}
        w={w}
        x={x}
        y={y}
        bg={bg}
        style={style}
        variants={variants}
        {...rest}
      >
        {children}
      </VertexComponent>
    ),
    point: { x, y },
    width: w,
  };
};

export const Vertex = forwardRef<
  {
    point: {
      x: MotionValue<number>;
      y: MotionValue<number>;
    };
    width: MotionValue<number>;
  },
  VertexProps
>((props, ref) => {
  const { content, point, width } = useVertex(props);
  useImperativeHandle(ref, () => ({
    point,
    width,
  }));
  return content;
});
