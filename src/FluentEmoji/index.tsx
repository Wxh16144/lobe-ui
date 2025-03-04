import { kebabCase } from 'lodash-es';
import { memo, useMemo, useState } from 'react';

import { DivProps } from '@/types';
import { genCdnUrl } from '@/utils/genCdnUrl';
import { getEmojiNameByCharacter } from '@/utils/getEmojiByCharacter';

import { useStyles } from './style';

export interface FluentEmojiProps extends DivProps {
  /**
   * @description The emoji character to be rendered
   */
  emoji: string;
  /**
   * @description Size of the emoji
   * @default 40
   */
  size?: number;
  /**
   * @description The type of the FluentUI emoji set to be used
   * @default '3d'
   */
  type?: 'modern' | 'flat' | 'high-contrast' | 'anim' | '3d' | 'pure';
}

const FluentEmoji = memo<FluentEmojiProps>(
  ({ emoji, className, style, type = '3d', size = 40 }) => {
    const [loadingFail, setLoadingFail] = useState(false);

    const { cx, styles } = useStyles();

    const emojiUrl = useMemo(() => {
      if (type === 'pure') return;
      const emojiName = getEmojiNameByCharacter(emoji);
      if (!emojiName) return;
      switch (type) {
        case 'modern':
        case 'flat':
        case 'high-contrast': {
          return genCdnUrl({
            path: `icons/${type}/${kebabCase(emojiName)}.svg`,
            pkg: 'fluentui-emoji',
            version: '0.0.8',
          });
        }
        case 'anim': {
          return genCdnUrl({
            path: `assets/${emojiName}.webp`,
            pkg: '@lobehub/assets-emoji-anim',
            version: '1.0.0',
          });
        }
        case '3d': {
          return genCdnUrl({
            path: `assets/${emojiName}.webp`,
            pkg: '@lobehub/assets-emoji',
            version: '1.3.0',
          });
        }
      }
    }, [type, emoji]);

    const isFallback = useMemo(() => type === 'pure' || !emojiUrl || loadingFail, []);

    if (isFallback)
      return (
        <div
          className={cx(styles.container, className)}
          style={{ fontSize: size * 0.9, height: size, width: size, ...style }}
        >
          {emoji}
        </div>
      );

    return (
      <div
        className={cx(styles.container, className)}
        style={{ height: size, width: size, ...style }}
      >
        <img
          alt={emoji}
          height="100%"
          loading="lazy"
          onError={() => setLoadingFail(true)}
          src={emojiUrl}
          width="100%"
        />
      </div>
    );
  },
);

export default FluentEmoji;
