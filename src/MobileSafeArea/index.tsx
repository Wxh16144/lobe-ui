import React, { memo } from 'react';

import { DivProps } from '@/types';

import { useStyles } from './style';

export interface MobileSafeAreaProps extends DivProps {
  position: 'top' | 'bottom';
}

const MobileSafeArea = memo<MobileSafeAreaProps>(({ position, className, ...props }) => {
  const { styles, cx } = useStyles();
  return <div className={cx(styles.container, styles[position], className)} {...props} />;
});

export default MobileSafeArea;
