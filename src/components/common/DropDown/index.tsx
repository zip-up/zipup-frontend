import { useState } from 'react';
import DropDownIcon from '@assets/icons/dropdown_btn.svg';
import { UseFormRegisterReturn } from 'react-hook-form';
import { css } from 'styled-system/css';

import * as style from './styles';

interface DropDownProps {
  menuButtonTitle: string;
  menuList: string[];
  register: UseFormRegisterReturn;
  selectedData: string;
}

export default function DropDown({
  menuList,
  menuButtonTitle,
  register: { onChange, ...restRegister },
  selectedData,
  ...props
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css({ pos: 'relative', width: '100%' })}>
      <button
        type="button"
        onClick={() => setIsOpen(status => !status)}
        className={style.menuButton}
      >
        {selectedData ? selectedData : menuButtonTitle}
        <DropDownIcon />
      </button>

      {isOpen && (
        <div className={style.listWrapper}>
          {menuList.map((menu, idx) => (
            <div key={idx} className={style.menu}>
              <label htmlFor={menu} className={css({ display: 'block' })}>
                {menu}
              </label>
              <input
                type="radio"
                value={menu}
                id={menu}
                key={idx}
                {...props}
                {...restRegister}
                onChange={e => {
                  onChange(e);
                  setIsOpen(false);
                }}
              ></input>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
