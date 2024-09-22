import {
  Children,
  cloneElement,
  Dispatch,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { css } from 'styled-system/css';

import * as style from './styles';

interface MenuProps {
  activeMenuButtonTitle: ReactNode;
  menuButtonTitle: ReactNode;
}
export default function Menu({
  activeMenuButtonTitle,
  menuButtonTitle,
  children,
}: PropsWithChildren<MenuProps>) {
  const [isMenuOn, setIsMenuOn] = useState(false);

  return (
    <div
      className={css({
        pos: 'relative',
        color: 'text.100',
        textStyle: 'body1',
        h: 'fit-content',
      })}
    >
      <button
        type="button"
        className={css({ cursor: 'pointer' })}
        onClick={() => setIsMenuOn(status => !status)}
      >
        {isMenuOn ? activeMenuButtonTitle : menuButtonTitle}
      </button>

      {isMenuOn && (
        <div className={style.menuList}>
          {Children.map(children, child => {
            if (isValidElement<MenuItemProps>(child)) return cloneElement(child, { setIsMenuOn });

            return child;
          })}
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  onClick: () => void;
  setIsMenuOn?: Dispatch<SetStateAction<boolean>>;
}

function MenuItem({ children, onClick, setIsMenuOn = () => {} }: PropsWithChildren<MenuItemProps>) {
  return (
    <div
      onClick={() => {
        onClick();
        setIsMenuOn(false);
      }}
      className={style.item}
    >
      {children}
    </div>
  );
}

Menu.Item = MenuItem;
