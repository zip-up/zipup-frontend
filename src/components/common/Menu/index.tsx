import React, { PropsWithChildren, useState } from 'react';
import { css } from 'styled-system/css';

import * as style from './styles';

interface MenuProps {
  activeMenuButtonTitle: React.ReactNode;
  menuButtonTitle: React.ReactNode;
}

export default function Menu({
  activeMenuButtonTitle,
  menuButtonTitle,
  children,
}: PropsWithChildren<MenuProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={css({ pos: 'relative', color: 'text.100', textStyle: 'body1', h: 'fit-content' })}
    >
      <button type="button" onClick={() => setIsOpen(status => !status)}>
        {isOpen ? activeMenuButtonTitle : menuButtonTitle}
      </button>

      {isOpen && (
        <div className={style.menuList}>
          {React.Children.map(children, child => React.cloneElement(child, { setIsOpen }))}
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  onClick: () => void;
  setIsOpen?: () => void;
}

function MenuItem({ children, onClick, setIsOpen = () => {} }: PropsWithChildren<MenuItemProps>) {
  return (
    <div
      onClick={() => {
        onClick();
        setIsOpen();
      }}
      className={style.item}
    >
      {children}
    </div>
  );
}

Menu.Item = MenuItem;
