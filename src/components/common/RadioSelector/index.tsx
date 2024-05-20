import { Fragment } from 'react';
import { Radio_active, Radio_disabled } from '@assets/icons/radio';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import * as style from './styles';

interface RadioSelector<T extends FieldValues> {
  reasonList: string[];
  selected: string;
  label: Path<T>;
  register: UseFormRegister<T>;
}

export function RadioSelector<T extends FieldValues>({
  reasonList,
  selected,
  label,
  register,
}: RadioSelector<T>) {
  return (
    <div className={style.labelsWrapper}>
      {reasonList.map((reason, idx) => (
        <Fragment key={idx}>
          <label htmlFor={`reason-${idx}`} key={idx} className={style.reasonLabel}>
            {selected === reason ? <Radio_active /> : <Radio_disabled />}
            <span>{reason}</span>
          </label>
          <input
            type="radio"
            value={reason}
            id={`reason-${idx}`}
            {...register(label)}
            className={style.input}
          />
        </Fragment>
      ))}
    </div>
  );
}
