import Link from 'next/link';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

const TERMS_AND_CONDITIONS_LIST = [
  {
    text: '이용약관',
    link: 'https://danisong.notion.site/508a845508794eab98435cecea30d561',
  },
  {
    text: '개인정보처리방침',
    link: 'https://danisong.notion.site/bdf9880b3f91458fbe1a4118de2b5eb1',
  },
  {
    text: '회원탈퇴',
    link: '/mypage/withdrawal',
  },
  {
    text: '자주 묻는 질문',
    link: '',
  },
];

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cx(
        style.footer,
        className ||
          css({
            '@media (min-height: 650px)': {
              position: 'absolute',
              bottom: 0,
            },
            marginTop: '3rem',
          }),
      )}
    >
      <div className={style.footerInfoBox}>
        <p>상호명 : 집업</p>
        <p>고객센터 : 0504-0815-5379</p>
        <div className={style.termsAndConditions}>
          {TERMS_AND_CONDITIONS_LIST.map(item => (
            <Link key={item.text} href={item.link} className={style.pointer}>
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
