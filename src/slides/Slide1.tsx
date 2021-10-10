import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide1 = () => {
  const [curStage, setCurStage] = useSlideControl();
  const container = useRef(null);

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
        xOff: -130,
        yOff: -308,
        opacity: 1,
      },
      '2': {
        xOff: -600,
        yOff: -350,
        opacity: 1,
      },
      '3': {
        xOff: -300,
        yOff: -350,
        opacity: 1,
        radius: 20,
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
        xOff: -550,
        yOff: 250,
        opacity: 1,
      },
      '3': {
        xOff: -600,
        yOff: -100,
        opacity: 1,
        radius: 20,
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
        yOff: 250,
        xOff: -150,
        opacity: 1,
      },
      '3': {
        xOff: -300,
        yOff: -100,
        opacity: 1,
        radius: 20,
      },
    },
    // log: true,
  });
  const { content: v4Point, ...v4 } = useVertex({
    ...vertexProps,
    key: 'v4',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: -500,
        yOff: -330,
        radius: 50,
      },
      '1': {
        xOff: -500,
        yOff: -330,
        opacity: 1,
      },
      '2': {
        xOff: -150,
        yOff: -320,
        opacity: 1,
      },
      '3': {
        xOff: -600,
        yOff: -350,
        opacity: 1,
        radius: 20,
      },
    },
    // log: true,
  });

  const commonProps = {
    animate: String(curStage >= 1 ? 1 : 0),
    variants: {
      '0': {
        opacity: 0,
      },
      '1': {
        opacity: 1,
      },
    },
  };

  const { content: v5Point, ...v5 } = useVertex({
    ...vertexProps,
    ...commonProps,
    key: 'v5',
    bg: '#05967C',
    variants: {
      initial: {
        xOff: 530,
        yOff: -330,
        radius: 50,
        opacity: 0,
      },
      '1': {
        opacity: 1,
      },
    },
    // log: true,
  });

  const { content: v6Point, ...v6 } = useVertex({
    ...vertexProps,
    ...commonProps,

    key: 'v6',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: 550,
        yOff: 250,
        radius: 50,
        opacity: 0,
      },
      '1': {
        opacity: 1,
      },
    },

    // log: true,
  });
  const { content: v7Point, ...v7 } = useVertex({
    ...vertexProps,
    ...commonProps,

    key: 'v7',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: 150,
        yOff: 250,
        radius: 50,
        opacity: 0,
      },
      '1': {
        opacity: 1,
      },
    },
    // log: true,
  });
  const { content: v8Point, ...v8 } = useVertex({
    ...vertexProps,
    ...commonProps,

    key: 'v8',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: 150,
        yOff: -320,
        radius: 50,
        opacity: 0,
      },
      '1': {
        opacity: 1,
      },
    },
    // log: true,
  });

  const { content: v9Point } = useVertex({
    ...vertexProps,

    key: 'v9',
    bg: 'rgb(177 225 172)',
    variants: {
      initial: {
        xOff: -100,
        yOff: -500,
        radius: 500,
        opacity: 0,
      },
      '3': {
        opacity: 1,
      },
    },
    style: {
      zIndex: 0,
    },
    log: true,
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
  });

  const e4 = useEdge({
    ...commonProps,

    key: 'e4',
    a: v5,
    b: v6,
  });

  const e5 = useEdge({
    ...commonProps,

    key: 'e5',
    a: v6,
    b: v7,
  });

  const e6 = useEdge({
    ...commonProps,

    key: 'e6',
    a: v7,
    b: v8,
  });

  const stages = {
    0: (
      <Text key="text-faces" hide xOff={50} yOff={-40}>
        How many faces?
      </Text>
    ),
    1: (
      <Text key="text-same" hide xOff={-400} y={70}>
        Is these graphs the same?
      </Text>
    ),
    2: (
      <Text key="text-same" hide xOff={-40} y={70}>
        Yes
      </Text>
    ),
    3: (
      <Text key="text-same" hide xOff={-40} y={70}>
        This a planar embedding
      </Text>
    ),
  };

  return (
    <div style={{ position: 'relative' }} ref={container}>
      {v1Point}
      {v2Point}
      {v3Point}
      {v4Point}
      {v5Point}
      {v6Point}
      {v7Point}
      {v8Point}
      {v9Point}
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
