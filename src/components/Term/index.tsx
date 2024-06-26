import Link from 'next/link';
import { Checkbox_active, Checkbox_disabled } from '@assets/icons/checkbox';
import { Term as TermType } from '@typings/term';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import * as style from './styles';

interface TermProps<T extends FieldValues> {
  label: Path<T>;
  term: TermType;
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
        {isChecked ? <Checkbox_active /> : <Checkbox_disabled />}
        <span className={style.title}>{title}</span>
      </label>
      <input
        id={label}
        className={style.checkbox}
        type="checkbox"
        {...register(label, { required: '약관 동의가 필요합니다.' })}
      />

      <Link href={link} className={style.link}>
        {subTitle}
      </Link>
    </div>
  );
}
