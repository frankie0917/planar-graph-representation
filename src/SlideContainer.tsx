import React, { useEffect, useState } from 'react';
import { Slide0 } from './slides/Slide0';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import { Slide1 } from './slides/Slide1';
import { Slide2 } from './slides/Slide2';

const slides: (() => JSX.Element)[] = [Slide0, Slide1, Slide2];

export const SlideContainer = () => {
  return (
    <div className="SlideContainer" style={{ background: '#FD886F' }}>
      <Switch>
        {slides.map((content, i) => (
          <Route key={i} component={content} exact path={'/' + String(i)} />
        ))}
        <Route component={slides[0]} path="/" />
      </Switch>
    </div>
  );
};
