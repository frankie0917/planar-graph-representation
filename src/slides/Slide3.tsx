import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide3 = () => {
  const [curStage, setCurStage] = useSlideControl();
  const container = useRef(null);
  const [isK3Open, setIsK3Open] = useState(false);

  const vertexProps = {
    initial: 'initial',
    animate: String(curStage),
    dragConstraints: container,
  };

  const { content: v1Point, ...v1 } = useVertex({
    ...vertexProps,
    key: 'v1',
    bg: '#05967C',
    variants: {
      initial: {
        xOff: -130,
        yOff: -308,
        radius: 50,
      },
      '1': {
        xOff: -300,
        yOff: -500,
        opacity: 1,
      },
    },
    // log: true,
  });

  const { content: v2Point, ...v2 } = useVertex({
    ...vertexProps,
    key: 'v2',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: -550,
        yOff: 250,
        radius: 50,
      },
      '1': {
        xOff: -650,
        opacity: 1,
      },
    },
    // log: true,
  });
  const { content: v3Point, ...v3 } = useVertex({
    ...vertexProps,
    key: 'v3',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        yOff: 250,
        xOff: -150,
        radius: 50,
      },
      '1': {
        xOff: 0,
        opacity: 1,
      },
    },
    // log: true,
  });
  const { content: v4Point, ...v4 } = useVertex({
    ...vertexProps,
    animate: isK3Open ? 'k3' : String(curStage),
    key: 'v4',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: -500,
        yOff: -330,
        radius: 50,
      },
      '1': {
        xOff: -300,
        yOff: -50,
        opacity: 1,
      },
      k3: {
        xOff: -300,
        yOff: -50,
        opacity: 0,
      },
    },
    onMouseEnter: () => {
      if (curStage > 0) setIsK3Open(true);
    },
    onMouseLeave: () => setIsK3Open(false),
    // log: true,
  });

  const e1 = useEdge({
    key: 'e1',
    a: v1,
    b: v2,
  });

  const e2 = useEdge({
    key: 'e2',
    a: v2,
    b: v3,
  });

  const e3 = useEdge({
    key: 'e3',
    a: v3,
    b: v4,
    animate: isK3Open ? 'k3' : 'initial',
    variants: {
      initial: {
        opacity: 1,
      },
      k3: {
        opacity: 0,
      },
    },
  });

  const e4 = useEdge({
    key: 'e4',
    a: v4,
    b: v1,
    animate: isK3Open ? 'k3' : 'initial',
    variants: {
      initial: {
        opacity: 1,
      },
      k3: {
        opacity: 0,
      },
    },
  });

  const e5 = useEdge({
    key: 'e5',
    a: v1,
    b: v3,
  });

  const e6 = useEdge({
    key: 'e6',
    a: v2,
    b: v4,
    animate: isK3Open ? 'k3' : 'initial',
    variants: {
      initial: {
        opacity: 1,
      },
      k3: {
        opacity: 0,
      },
    },
  });

  const stages = {
    0: (
      <>
        <Text key="text-k4" hide xOff={50} yOff={-40}>
          this is K4, is K4 planar?
        </Text>
        <Text key="text-note" style={{ fontSize: 40 }} hide xOff={50} yOff={70}>
          K stands for "complete", which means all vertices connnect to one
          another
        </Text>
      </>
    ),
    1: (
      <>
        <Text key="text-k4" hide xOff={50} yOff={-40}>
          Yes, so is K3
        </Text>
      </>
    ),
  };

  return (
    <div style={{ position: 'relative' }} ref={container}>
      {v1Point}
      {v2Point}
      {v3Point}
      {v4Point}
      {e1}
      {e2}
      {e3}
      {e4}
      {e5}
      {e6}
      <AnimatePresence exitBeforeEnter>
        {(stages as any)[curStage]}
      </AnimatePresence>
    </div>
  );
};
