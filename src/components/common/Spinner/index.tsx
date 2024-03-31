import * as style from './styles';

interface SpinnerProps {
  size?: 'sm' | 'md';
}

export default function Spinner({ size = 'md' }: SpinnerProps) {
  return <div className={style.spinner({ size })} />;
}
