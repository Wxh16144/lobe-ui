import { createStyles } from 'antd-style';
import { memo } from 'react';

import Highlighter from '@/Highlighter';

const useStyles = createStyles(
  ({ css }) => css`
    :not(:last-child) {
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }
  `,
);

const Code = memo((properties: any) => {
  const { styles } = useStyles();

  if (!properties.children[0]) return;

  const { children, className } = properties.children[0].props;

  if (!children) return;

  return (
    <Highlighter
      className={styles}
      copyButtonSize={{ blockSize: 28, fontSize: 16 }}
      language={className?.replace('language-', '') || 'markdown'}
      type="block"
    >
      {Array.isArray(children) ? (children[0] as string) : children}
    </Highlighter>
  );
});

export default Code;
