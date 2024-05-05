import React from 'react';
import style from './styles';

const termsAndConditionsList = [
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
    link: '',
  },
  {
    text: '자주 묻는 질문',
    link: '',
  },
];

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerInfoBox}>
        <p>상호명 : 집업</p>
        <p>고객센터 : 0504-0815-5379</p>
        <div className={style.termsAndConditions}>
          {termsAndConditionsList.map(item => (
            <a key={item.text} href={item.link} className={style.pointer}>
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
