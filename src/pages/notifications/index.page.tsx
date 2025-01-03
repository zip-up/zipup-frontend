import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cancel from '@assets/icons/noti/cancel.svg';
import Delete from '@assets/icons/noti/delete.svg';
import Delivery from '@assets/icons/noti/delivery.svg';
import Expire from '@assets/icons/noti/expire.svg';
import Letter from '@assets/icons/noti/letter.svg';
import Participate from '@assets/icons/noti/participate.svg';
import Suceess from '@assets/icons/noti/success.svg';
import Header from '@components/common/Header';
import { css } from 'styled-system/css';

import * as style from './styles';

const NotiIcon = {
  participate: <Participate />,
  cancel: <Cancel />,
  expire: <Expire />,
  success: <Suceess />,
  delivery: <Delivery />,
  delete: <Delete />,
  letter: <Letter />,
};

const formateDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export default function Notifications() {
  const router = useRouter();

  useEffect(() => {
    alert('현재 알림 기능이 준비 중입니다. 조금만 기다려 주세요.');
  }, []);

  return (
    <>
      <Header title="알림" onGoBack={() => router.push('/')} />
      <div>
        {noticiations.map(({ type, title, message, date, link, isRead }, idx) => (
          <Link
            href={link}
            key={idx}
            className={css({
              display: 'flex',
              gap: '1rem',
              padding: '1.2rem 2rem',
              bgColor: isRead ? 'bg.200' : undefined,
            })}
          >
            <div>{NotiIcon[type]}</div>
            <div>
              <div className={style.title}>{title}</div>
              <div className={style.message}>{message}</div>
              <div className={style.date}>{formateDate(date)}</div>
            </div>
          </Link>
        ))}
        <div className={style.info}>알림은 30일 이후 순차적으로 지워집니다</div>
      </div>
    </>
  );
}

const noticiations: {
  type: keyof typeof NotiIcon;
  title: string;
  message: string;
  date: Date;
  link: string;
  isRead: boolean;
}[] = [
  {
    type: 'participate',
    title: '5,000원을 보냈어요',
    message: '펀딩 제목',
    date: new Date(),
    link: '',
    isRead: false,
  },
  {
    type: 'cancel',
    title: '참여를 취소했어요',
    message: '펀딩에 참여한 분에게 5,000원이 환불될 예정이에요.',
    date: new Date(),
    link: '',
    isRead: true,
  },
  {
    type: 'expire',
    title: '펀딩 기간이 만료되었어요',
    message: '펀딩의 기간을 늘리거나 차액을 결제하여 달성할 수 있어요.',
    date: new Date(),
    link: '',
    isRead: false,
  },
  {
    type: 'success',
    title: '목표 금액을 달성했어요',
    message: '펀딩의 상품이 배송될 예정이에요. 참여자들에게 감사를 전해보세요.',
    date: new Date(),
    link: '',
    isRead: false,
  },
  {
    type: 'delivery',
    title: '배송이 완료되었어요',
    message: '펀딩의 상품 배송이 완료되었어요. 즐거운 집들이 시간 되세요!',
    date: new Date(),
    link: '',
    isRead: false,
  },
  {
    type: 'delete',
    title: '참여한 펀딩이 삭제되었어요',
    message: '내가 참여한 펀딩이 삭제되었어요. 금액은 영업일 2-3일내 환불 예정이에요.',
    date: new Date(),
    link: '',
    isRead: true,
  },
  {
    type: 'letter',
    title: '감사 편지가 도착했어요',
    message: '내가 참여한 펀딩이 달성되어 감사 편지를 받았어요.',
    date: new Date(),
    link: '',
    isRead: false,
  },
];
