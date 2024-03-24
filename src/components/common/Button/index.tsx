import classnames from 'classnames';
import { button, styles } from './styles';
import { css } from '../../../../styled-system/css';

interface ButtonProps {
  onClick: () => void;
  text: string;
  height?: string;
  color: 'primary' | 'secondary' | 'disabled';
}

export default function Button({ height = '5.2rem', onClick, text, color }: ButtonProps) {
  return (
    <button className={classnames(button, styles[color], css({ height }))} onClick={onClick}>
      {text}
    </button>
  );
}
