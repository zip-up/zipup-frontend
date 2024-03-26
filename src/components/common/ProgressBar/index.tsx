import classNames from 'classnames';
import * as style from './styles';

interface ProgressBarProps {
  width: string;
}

const ProgressBar = ({ width }: ProgressBarProps) => {
  return (
    <div className={style.progressbar}>
      <div className={style.background_bar} />
      <div className={classNames(style.current_progress, width)} />
    </div>
  );
};

export default ProgressBar;
