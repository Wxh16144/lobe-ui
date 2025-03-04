import { memo } from 'react';

import CopyButton, { type CopyButtonProps } from '@/CopyButton';
import Spotlight from '@/Spotlight';
import Tag from '@/Tag';
import { DivProps } from '@/types';

import SyntaxHighlighter from './SyntaxHighlighter';
import { useStyles } from './style';

export interface HighlighterProps extends DivProps {
  /**
   * @description The code content to be highlighted
   */
  children: string;
  copyButtonSize?: CopyButtonProps['size'];
  /**
   * @description Whether to show the copy button
   * @default true
   */
  copyable?: boolean;
  /**
   * @description The language of the code content
   */
  language: string;
  /**
   * @description Whether to show language tag
   * @default true
   */
  showLanguage?: boolean;
  /**
   * @description Whether add spotlight background
   * @default false
   */
  spotlight?: boolean;
  /**
   * @description The type of the code block
   * @default 'block'
   */
  type?: 'ghost' | 'block' | 'pure';
}

export const Highlighter = memo<HighlighterProps>(
  ({
    copyButtonSize = 'site',
    children,
    language,
    className,
    style,
    copyable = true,
    showLanguage = true,
    type = 'block',
    spotlight,
    ...props
  }) => {
    const { styles, cx } = useStyles(type);
    const container = cx(styles.container, className);

    return (
      <div className={container} data-code-type="highlighter" style={style} {...props}>
        {spotlight && <Spotlight size={240} />}
        {copyable && (
          <CopyButton
            className={styles.button}
            content={children}
            placement="left"
            size={copyButtonSize}
          />
        )}
        {showLanguage && language && <Tag className={styles.lang}>{language.toLowerCase()}</Tag>}
        <SyntaxHighlighter language={language?.toLowerCase()}>{children.trim()}</SyntaxHighlighter>
      </div>
    );
  },
);

export default Highlighter;

export { default as SyntaxHighlighter, type SyntaxHighlighterProps } from './SyntaxHighlighter';
