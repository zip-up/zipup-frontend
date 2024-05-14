import { Fragment, useState } from 'react';
import DropDownIcon from '@assets/icons/dropdown_btn.svg';
import { UseFormRegisterReturn } from 'react-hook-form';
import { flex } from 'styled-system/patterns';

interface DropDownProps {
  menuButtonTitle: string;
  menuList: string[];
  register: UseFormRegisterReturn;
}

export default function DropDown({
  menuList,
  menuButtonTitle,
  register: { onChange, ...restRegister },
  ...props
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(status => !status)} className={flex()}>
        {menuButtonTitle}
        <DropDownIcon />
      </button>

      {isOpen &&
        menuList.map((menu, idx) => (
          <Fragment key={idx}>
            <label htmlFor={menu}>{menu}</label>
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
          </Fragment>
        ))}
    </>
  );
}
