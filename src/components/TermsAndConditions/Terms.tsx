import * as style from './styles';
import CheckedIcon from '@assets/icons/checked.svg';
import UnCheckedIcon from '@assets/icons/unchecked.svg';
import { TermsType } from '.';

interface TermsProps {
  data: TermsType;
  onCheck: (title: string, isChecked: boolean) => void;
  isChecked: boolean;
}

export default function Terms({ data, onCheck, isChecked }: TermsProps) {
  return (
    <div className={style.flexbox}>
      <div className={style.message_icon} onClick={() => onCheck(data.title, !isChecked)}>
        {isChecked ? <CheckedIcon /> : <UnCheckedIcon />}
      </div>
      <div className={style.add_margin}>
        <p className={style.message_text}>{data.title}</p>
        <a href={data.link} className={style.terms_conditions}>
          {data.subtitle}
        </a>
      </div>
    </div>
  );
}
