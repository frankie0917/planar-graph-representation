import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { Edge, useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide6 = () => {
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
        xOff: 300,
        yOff: -300,
        radius: 50,
      },
    },
    // log: true,
  });

  const { content: v2Point, ...v2 } = useVertex({
    ...vertexProps,
    key: 'h2',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: 300,
        yOff: 0,
        radius: 50,
      },
    },

    // log: true,
  });
  const { content: v3Point, ...v3 } = useVertex({
    ...vertexProps,
    key: 'h3',
    bg: '#ab84d5',
    variants: {
      initial: {
        xOff: 300,
        yOff: 300,
        radius: 50,
      },
    },

    // log: true,
  });
  const { content: v4Point, ...v4 } = useVertex({
    ...vertexProps,
    key: 'water',
    bg: '#4295fd',
    variants: {
      initial: {
        xOff: 700,
        yOff: -300,
        radius: 50,
      },
    },

    // log: true,
  });
  const { content: v5Point, ...v5 } = useVertex({
    ...vertexProps,
    key: 'gas',
    bg: '#4fd7a5',
    variants: {
      initial: {
        xOff: 700,
        yOff: 0,
        radius: 50,
      },
    },

    // log: true,
  });
  const { content: v6Point, ...v6 } = useVertex({
    ...vertexProps,
    key: 'eletricity',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: 700,
        yOff: 300,
        radius: 50,
      },
    },
    style: {
      fontSize: 20,
    },
    // log: true,
  });

  const { content: k1Point, ...k1 } = useVertex({
    ...vertexProps,
    key: 'k1',
    bg: '#05967C',
    variants: {
      initial: {
        xOff: -130,
        yOff: -50,
        radius: 50,
      },
    },
    // log: true,
  });

  const { content: k2Point, ...k2 } = useVertex({
    ...vertexProps,
    key: 'k2',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: -550,
        yOff: 350,
        radius: 50,
      },
    },
    // log: true,
  });
  const { content: k3Point, ...k3 } = useVertex({
    ...vertexProps,
    key: 'k3',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: -150,
        yOff: 350,
        radius: 50,
      },
    },
    // log: true,
  });
  const { content: k4Point, ...k4 } = useVertex({
    ...vertexProps,
    key: 'k4',
    bg: '#FD5D42',
    variants: {
      initial: {
        xOff: -500,
        yOff: -300,
        radius: 50,
      },
    },
    // log: true,
  });
  const { content: k5Point, ...k5 } = useVertex({
    ...vertexProps,
    key: 'k5',
    bg: 'rgb(196 207 36)',
    variants: {
      initial: {
        xOff: -700,
        yOff: -50,
        radius: 50,
      },
    },
    // log: true,
  });

  const stages = {
    0: (
      <>
        <Text key="text-k5" hide xOff={-500} y={100}>
          Fun fact, all non-planar graph contains K5 or K3,3 or both
        </Text>
      </>
    ),
  };
  const houses = [v1, v2, v3];
  const utils = [v4, v5, v6];
  const vertices = [k1, k2, k3, k4, k5];
  return (
    <div style={{ position: 'relative' }} onClick={() => {}} ref={container}>
      {v1Point}
      {v2Point}
      {v3Point}
      {v4Point}
      {v5Point}
      {v6Point}
      {k1Point}
      {k2Point}
      {k3Point}
      {k4Point}
      {k5Point}
      {houses.map((a, i) => {
        return utils.map((b, j) => {
          return <Edge key={'e' + i + '-' + j} a={a} b={b} />;
        });
      })}
      {vertices.map((a, i) => {
        return vertices.map((b, j) => {
          if (j <= i) return null;
          return <Edge key={'e' + i + '-' + j} a={a} b={b} />;
        });
      })}
      <AnimatePresence exitBeforeEnter>
        {(stages as any)[curStage]}
      </AnimatePresence>
    </div>
  );
};
