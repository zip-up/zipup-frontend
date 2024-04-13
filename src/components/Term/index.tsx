import CheckedIcon from '@assets/icons/checked.svg';
import UnCheckedIcon from '@assets/icons/unchecked.svg';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Term } from '@typings/term';
import Link from 'next/link';
import * as style from './styles';

interface TermProps<T extends FieldValues> {
  label: Path<T>;
  term: Term;
  register: UseFormRegister<T>;
  isChecked: boolean;
}

export default function Term<T extends FieldValues>({
  label,
  term,
  register,
  isChecked,
}: TermProps<T>) {
  return (
    <div className={style.flexbox}>
      <span>
        <label htmlFor={label}>
          {isChecked ? <CheckedIcon /> : <UnCheckedIcon />}
          <span className={style.message_text}>{term.title}</span>
        </label>
        <input
          id={label}
          className={style.message_icon}
          type="checkbox"
          {...register(label, { required: '약관 동의가 필요합니다.' })}
        />
      </span>

      <Link href={term.link} className={style.terms_conditions}>
        {term.subTitle}
      </Link>
    </div>
  );
}
