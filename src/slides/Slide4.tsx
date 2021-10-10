import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { Edge, useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide4 = () => {
  const [curStage, setCurStage] = useSlideControl();
  const container = useRef(null);

  const vertexProps = {
    initial: 'initial',
    animate: String(curStage),
    dragConstraints: container,
  };

  const v1Ref = useRef<any>(null);

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
        yOff: -530,
        radius: 50,
      },
    },
    // log: true,
  });
  const { content: v5Point, ...v5 } = useVertex({
    ...vertexProps,
    key: 'v5',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: -700,
        yOff: -330,
        radius: 50,
      },
    },
    // log: true,
  });
  const { content: v6Point, ...v6 } = useVertex({
    ...vertexProps,
    key: 'v6',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: -700,
        yOff: -530,
        radius: 50,
        opacity: 0,
      },
      '2': {
        opacity: 1,
      },
    },
    // log: true,
  });
  const { content: v7Point, ...v7 } = useVertex({
    ...vertexProps,
    key: 'v7',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: -700,
        yOff: -530,
        radius: 50,
        opacity: 0,
      },
      '3': {
        opacity: 1,
      },
    },
    // log: true,
  });

  const stages = {
    0: (
      <Text key="text-k5" hide xOff={50} yOff={-40}>
        this is K5, is K5 planar?
      </Text>
    ),
    1: (
      <Text key="text-no" hide xOff={50} yOff={-40}>
        No
      </Text>
    ),
    2: (
      <Text key="text-no-planar" hide xOff={50} yOff={-40}>
        K5 is not planar, also the subdivision of is not K5 is not planar
      </Text>
    ),
    3: (
      <Text key="text-above" hide xOff={50} yOff={-40}>
        {'Kn, n > 4 are all not planar'}
      </Text>
    ),
  };
  const vertices = [v1, v2, v3, v4, v5, ...(curStage >= 3 ? [v7] : [])];
  return (
    <div style={{ position: 'relative' }} onClick={() => {}} ref={container}>
      {v1Point}
      {v2Point}
      {v3Point}
      {v4Point}
      {v5Point}
      {v6Point}
      {v7Point}
      {vertices.map((a, i) => {
        return vertices.map((b, j) => {
          if (j <= i) return null;
          return <Edge key={'e' + i + '-' + j} a={a} b={b} />;
        });
      })}

      <AnimatePresence exitBeforeEnter>
        {curStage === 2 && <Edge key={'e6-1'} a={v1} b={v6} />}
        {(stages as any)[curStage]}
      </AnimatePresence>
    </div>
  );
};
