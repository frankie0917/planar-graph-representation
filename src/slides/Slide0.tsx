import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide0 = () => {
  const container = useRef(null);
  const [curStage, setCurStage] = useSlideControl();

  const vertexProps = {
    initial: 'initial',
    animate: String(curStage >= 1 ? 1 : 0),
    dragConstraints: container,
  };

  const { content: v1Point, ...v1 } = useVertex({
    ...vertexProps,
    key: 'v1',
    bg: '#05967C',
    variants: {
      initial: {
        xOff: -280,
        yOff: -100,
        radius: 100,
      },
      '0': {
        scale: 1.1,
        transition: {
          repeat: Infinity,
          duration: 1,
          repeatType: 'reverse',
        },
      },
      '1': {
        xOff: -700,
        yOff: -50,
        radius: 50,
        scale: 1,
      },
    },
  });

  const { content: v2Point, ...v2 } = useVertex({
    ...vertexProps,
    key: 'v2',
    bg: '#FD5D42',
    variants: {
      initial: {
        yOff: -400,
        xOff: 100,
        radius: 50,
        opacity: 0,
      },
      '0': {
        opacity: 0,
      },
      '1': {
        yOff: -250,
        xOff: -100,
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
        yOff: 200,
        xOff: 100,
        radius: 50,
        opacity: 0,
      },
      '0': {
        opacity: 0,
      },
      '1': {
        yOff: 250,
        xOff: -100,
        opacity: 1,
      },
    },
    // log: true,
  });

  const edgeProps = {
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

  const e1 = useEdge({
    key: 'e1',
    ...edgeProps,
    a: v1,
    b: v2,
  });

  const e2 = useEdge({
    key: 'e2',
    ...edgeProps,
    a: v2,
    b: v3,
  });

  const e3 = useEdge({
    key: 'e3',
    ...edgeProps,
    a: v3,
    b: v1,
  });

  const stages = {
    0: (
      <>
        <Div
          key="bar"
          w={5}
          h={200}
          bg="#fff"
          yOff={-100}
          style={{
            borderRadius: 50,
          }}
        />
        <Text key="text-intro" xOff={50} yOff={-40}>
          Planar Graph
        </Text>
      </>
    ),
    1: (
      <Text key="text-simple" xOff={100} yOff={-40}>
        This is a simple graph
      </Text>
    ),
  };

  const renderFaces = () => {
    const midx = (v2.point.x.get() - v1.point.x.get()) / 2 + v1.point.x.get();
    const midy = (v2.point.y.get() - v1.point.y.get()) / 2 + v1.point.y.get();
    return (
      <>
        <Text
          key={`text-f1`}
          variants={{
            '4': {
              opacity: 1,
            },
          }}
          style={{
            fontSize: 50,
          }}
          animate={String(curStage >= 4 ? 4 : 0)}
          x={(v3.point.x.get() - midx) / 2 + midx - 50}
          y={(v3.point.y.get() - midy) / 2 + midy - 50}
          hide
        >
          f1
        </Text>
        <Text
          key={`text-f2`}
          variants={{
            '4': {
              opacity: 1,
            },
          }}
          style={{
            fontSize: 50,
          }}
          animate={String(curStage >= 4 ? 4 : 0)}
          x={midx - 200}
          y={midy - 200}
          hide
        >
          f2
        </Text>
      </>
    );
  };

  return (
    <div style={{ position: 'relative' }} ref={container}>
      {v1Point}
      {v2Point}
      {v3Point}
      {e1}
      {e2}
      {e3}
      <AnimatePresence exitBeforeEnter>
        {(stages as any)[curStage]}
      </AnimatePresence>
      {[v1, v2, v3].map((v, i) => (
        <Text
          key={`text-v${i + 1}`}
          variants={{
            '2': {
              opacity: 1,
            },
          }}
          style={{
            fontSize: 50,
          }}
          animate={String(curStage >= 2 ? 2 : 0)}
          x={v.point.x.get() + 20}
          y={v.point.y.get() + 20}
          hide
        >
          v{i + 1}
        </Text>
      ))}
      <Text
        key="text-3v"
        variants={{
          '2': {
            opacity: 1,
          },
        }}
        animate={String(curStage >= 2 ? 2 : 0)}
        xOff={150}
        yOff={-170}
        hide
      >
        3 Vertices
      </Text>
      {[
        [v1, v2],
        [v2, v3],
        [v3, v1],
      ].map(([a, b], i) => (
        <Text
          key={`text-e${i + 1}`}
          variants={{
            '3': {
              opacity: 1,
            },
          }}
          style={{
            fontSize: 50,
          }}
          animate={String(curStage >= 3 ? 3 : 0)}
          x={(b.point.x.get() - a.point.x.get()) / 2 + a.point.x.get()}
          y={(b.point.y.get() - a.point.y.get()) / 2 + a.point.y.get()}
          hide
        >
          e{i + 1}
        </Text>
      ))}
      <Text
        key="text-3e"
        variants={{
          '3': {
            opacity: 1,
          },
        }}
        animate={String(curStage >= 3 ? 3 : 0)}
        xOff={150}
        yOff={0}
        hide
      >
        3 Edges
      </Text>
      {renderFaces()}
      <Text
        key="text-2f"
        variants={{
          '4': {
            opacity: 1,
          },
        }}
        animate={String(curStage >= 4 ? 4 : 0)}
        xOff={150}
        yOff={170}
        hide
      >
        2 Faces
      </Text>
    </div>
  );
};
