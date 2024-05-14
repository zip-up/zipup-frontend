import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface ProgressBarProps {
  isNotFull?: boolean;
  progressBarWidth?: string;
  width: string;
  noMargin?: boolean;
}

export default function ProgressBar({
  isNotFull,
  progressBarWidth = css({ width: isNotFull ? '100%' : '32.8rem' }),
  width,
  noMargin = false,
}: ProgressBarProps) {
  return (
    <div
      className={cx(style.progressBar, progressBarWidth)}
      style={{ margin: noMargin ? 0 : '0.8rem auto' }}
    >
      <div className={style.backgroundBar} />
      <div className={style.currentProgress} style={{ width, maxWidth: '100%' }} />
    </div>
  );
}
