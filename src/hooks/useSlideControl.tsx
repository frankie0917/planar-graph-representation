import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useSlideControl = () => {
  const [curStage, setCurStage] = useState(0);
  const history = useHistory();
  useEffect(() => {
    document.body.onkeydown = (e) => {
      if (e.code === 'Space') {
        setCurStage((prev) => prev + 1);
      }
      const cur = Number(history.location.pathname.slice(1));
      if (e.code === 'ArrowRight') {
        history.push('/' + String(cur + 1));
      } else if (e.code === 'ArrowLeft' && cur >= 1) {
        history.push('/' + String(cur - 1));
      }
    };
  }, []);
  return [curStage, setCurStage] as const;
};
