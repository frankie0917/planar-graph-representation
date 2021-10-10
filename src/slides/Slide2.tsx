import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Div } from '../components/Div';
import { useEdge } from '../components/useEdge';
import { useVertex } from '../components/useVertex';
import { Text } from '../components/Text';
import { useHistory } from 'react-router-dom';
import { useSlideControl } from '../hooks/useSlideControl';

export const Slide2 = () => {
  const container = useRef(null);
  const [curStage, setCurStage] = useSlideControl();

  return (
    <div style={{ position: 'relative' }} ref={container}>
      <AnimatePresence exitBeforeEnter>
        <Text key="text-faces" hide xOff={-700} y={200}>
          A graph is planar, if it has a planar embedding
        </Text>
      </AnimatePresence>
    </div>
  );
};
