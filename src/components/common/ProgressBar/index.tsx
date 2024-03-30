import classNames from 'classnames';
import * as style from './styles';
import { css } from '@styled-system/css';

interface ProgressBarProps {
  isNotFull?: boolean;
  progressBarWidth?: string;
  width: string;
  noMargin?: boolean;
}

const ProgressBar = ({
  isNotFull,
  progressBarWidth = css({ width: isNotFull ? '100%' : '32.8rem' }),
  width,
  noMargin = false,
}: ProgressBarProps) => {
  return (
    <div
      className={classNames(style.progressbar, progressBarWidth)}
      style={{ margin: noMargin ? 0 : '0.8rem auto' }}
    >
      <div className={style.background_bar} />
      <div className={style.current_progress} style={{ width, maxWidth: '100%' }} />
    </div>
  );
};

export default ProgressBar;
