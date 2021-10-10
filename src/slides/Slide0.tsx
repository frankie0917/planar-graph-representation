import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';

export const Slide0 = () => {
  const [curStage, setCurStage] = useState(0);
  const container = useRef(null);

  useEffect(() => {
    document.body.onkeydown = (e) => {
      if (e.code === 'Space') {
        setCurStage((prev) => prev + 1);
      }
    };
  }, []);

  useEffect(() => {
    console.log('curStage', curStage);
  }, [curStage]);

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
        xOff: -500,
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
        xOff: 0,
        opacity: 1,
      },
    },
    // log: true,
  });
  const { content: v3Point, ...v3 } = useVertex({
    ...vertexProps,
    key: 'v3',
    bg: '#05967C',
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
        xOff: 0,
        opacity: 1,
      },
    },
    // log: true,
  });

  const edgeProps = {
    animate: String(curStage),
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

  return (
    <div style={{ position: 'relative' }} ref={container}>
      <AnimatePresence>
        {v1Point}
        {v2Point}
        {v3Point}
        {e1}
        {e2}
        {e3}
        {curStage === 0 && (
          <Div
            key="bar"
            w={5}
            h={200}
            bg="#fff"
            yOff={-100}
            style={{
              borderRadius: 50,
            }}
          ></Div>
        )}
        {curStage === 0 && (
          <Div
            key="text"
            style={{
              fontSize: 70,
            }}
            w="unset"
            xOff={50}
            yOff={-40}
          >
            Planar Graph
          </Div>
        )}
      </AnimatePresence>
    </div>
  );
};
