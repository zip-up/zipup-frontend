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
  term: { title, subTitle, link },
  register,
  isChecked,
}: TermProps<T>) {
  return (
    <div className={style.termWrapper}>
      <label htmlFor={label} className={style.label}>
        {isChecked ? <CheckedIcon /> : <UnCheckedIcon />}
        <span className={style.title}>{title}</span>
      </label>
      <input
        id={label}
        className={style.checkbox}
        type="checkbox"
        {...register(label, { required: '약관 동의가 필요합니다.' })}
      />

      <Link href={link} className={style.terms_conditions}>
        {subTitle}
      </Link>
    </div>
  );
}
