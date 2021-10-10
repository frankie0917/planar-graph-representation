import React, { PropsWithChildren } from 'react';
import { Div } from './Div';

export const Text = ({
  children,
  style,
  hide,
  ...rest
}: Parameters<typeof Div>[0] & {
  hide?: boolean;
}) => {
  return (
    <Div
      style={{
        fontSize: 70,
        zIndex: 20,
        pointerEvents: 'none',
        ...style,
      }}
      w="unset"
      initial={hide ? { opacity: 0 } : undefined}
      animate={{ opacity: 1 }}
      {...rest}
    >
      {children}
    </Div>
  );
};
