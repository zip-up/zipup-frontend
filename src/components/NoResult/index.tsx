import React, { ReactNode } from 'react';
import GiftIcon from '@assets/icons/big-gift-image.svg';
import { cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import * as style from './styles';

interface NoResultProps {
  title: string;
  desc: string;
  renderButton: ReactNode;
}

export default function NoResut({ title, desc, renderButton }: NoResultProps) {
  return (
    <div
      className={cx(
        style.cardContent,
        flex({
          justifyContent: 'center',
        }),
      )}
    >
      <div className={style.noResult}>
        <div className={style.iconBox}>
          <GiftIcon />
        </div>
        <div className={style.textBox}>
          <p className={style.title}>{title}</p>
          <p className={style.desc}>{desc}</p>
        </div>
        {renderButton}
      </div>
    </div>
  );
}
