import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { Edge, useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide5 = () => {
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
    key: 'h1',
    bg: '#05967C',
    variants: {
      initial: {
        xOff: -500,
        yOff: -300,
        radius: 50,
      },
    },
    children: 'h1',
    // log: true,
  });

  const { content: v2Point, ...v2 } = useVertex({
    ...vertexProps,
    key: 'h2',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: -500,
        yOff: 0,
        radius: 50,
      },
    },
    children: 'h2',

    // log: true,
  });
  const { content: v3Point, ...v3 } = useVertex({
    ...vertexProps,
    key: 'h3',
    bg: '#ab84d5',
    variants: {
      initial: {
        xOff: -500,
        yOff: 300,
        radius: 50,
      },
    },
    children: 'h3',

    // log: true,
  });
  const { content: v4Point, ...v4 } = useVertex({
    ...vertexProps,
    key: 'water',
    bg: '#4295fd',
    variants: {
      initial: {
        xOff: -100,
        yOff: -300,
        radius: 50,
      },
    },
    children: 'water',

    // log: true,
  });
  const { content: v5Point, ...v5 } = useVertex({
    ...vertexProps,
    key: 'gas',
    bg: '#4fd7a5',
    variants: {
      initial: {
        xOff: -100,
        yOff: 0,
        radius: 50,
      },
    },
    children: 'gas',

    // log: true,
  });
  const { content: v6Point, ...v6 } = useVertex({
    ...vertexProps,
    key: 'eletricity',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: -100,
        yOff: 300,
        radius: 50,
      },
    },
    style: {
      fontSize: 20,
    },
    children: 'eletricity',
    // log: true,
  });

  const stages = {
    0: (
      <>
        <Text key="text-k5" hide xOff={100} yOff={-40}>
          This is K3,3, also known as the utilities problem
        </Text>
        <Text key="text-2" hide xOff={100} style={{ fontSize: 40 }} yOff={150}>
          We are trying to connect every houses with every utilities
        </Text>
      </>
    ),
    1: (
      <>
        <Text key="text-no" hide xOff={100} yOff={-40}>
          and there is no way to do that, so K3,3 is also not planar
        </Text>
      </>
    ),
  };
  const houses = [v1, v2, v3];
  const utils = [v4, v5, v6];
  return (
    <div style={{ position: 'relative' }} onClick={() => {}} ref={container}>
      {v1Point}
      {v2Point}
      {v3Point}
      {v4Point}
      {v5Point}
      {v6Point}
      <AnimatePresence exitBeforeEnter>
        {curStage >= 1 &&
          houses.map((a, i) => {
            return utils.map((b, j) => {
              return <Edge key={'e' + i + '-' + j} a={a} b={b} />;
            });
          })}
        {(stages as any)[curStage]}
      </AnimatePresence>
    </div>
  );
};
