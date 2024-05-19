import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DeleteIcon from '@assets/icons/delete.svg';
import EditIcon from '@assets/icons/edit_note.svg';
import MoreBtnIcon from '@assets/icons/more-btn.svg';
import ActiveMoreBtnIcon from '@assets/icons/more-btn-clicked.svg';
import DefaultPresentImg from '@assets/images/default_present.svg';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import Menu from '@components/common/Menu';
import FundingStatusBox from '@components/FundingStatusBox';
import MessageList from '@components/MessageList';
import LoginModal from '@components/modals/LoginModal';
import { useUser } from '@hooks/queries/useAuth';
import { useGetFundingDetail } from '@hooks/queries/useFunding';
import { shareKakao } from '@utils/share';

import * as style from './styles';

export default function Funding() {
  const router = useRouter();

  const { id: fundingId, from } = router.query as { id: string; from?: string };
  const { data: user } = useUser();

  const { data: fundingInfo } = useGetFundingDetail(fundingId);
  const [isModalOn, setIsModalOn] = useState(false);
  const [_selectedMenu, setSelectedMenu] = useState('');

  if (!fundingInfo) return null;

  const {
    title,
    imageUrl,
    expirationDate,
    percent,
    goalPrice,
    description,
    isOrganizer,
    isParticipant,
    presentList: messageList,
  } = fundingInfo;

  function RoleBasedButton() {
    if (!fundingInfo) return null;

    if (isOrganizer) {
      return (
        <Button
          onClick={() =>
            shareKakao({ userName: user?.name || '', imageUrl: fundingInfo.imageUrl, fundingId })
          }
        >
          친구에게 공유하기
        </Button>
      );
    }
    if (isParticipant) {
      return <Button onClick={() => {}}>결제 취소하기</Button>;
    }

    return (
      <Button
        onClick={() => {
          if (user) return router.push(`/funding/${fundingId}/participate`);

          setIsModalOn(true);
        }}
      >
        이 펀딩 참여하기
      </Button>
    );
  }

  return (
    <div className={style.pageLayout}>
      <Header fromCreate={!!from} />
      {!imageUrl ? (
        <DefaultPresentImg />
      ) : (
        <div className={style.imageWrapper}>
          <Image src={imageUrl} alt="상품 이미지" fill style={{ objectFit: 'contain' }} />
        </div>
      )}
      <article className={style.wrapper}>
        <div className={style.titleBar}>
          <h2 className={style.title}>{title}</h2>
          <Menu activeMenuButtonTitle={<ActiveMoreBtnIcon />} menuButtonTitle={<MoreBtnIcon />}>
            <Menu.Item onClick={() => setSelectedMenu('EDIT')}>
              <EditIcon />
              수정하기
            </Menu.Item>
            <Menu.Item onClick={() => setSelectedMenu('DELETE')}>
              <DeleteIcon />
              삭제하기
            </Menu.Item>
          </Menu>
        </div>
        <FundingStatusBox info={{ percent, expirationDate, goalPrice }} />

        <RoleBasedButton />

        <div className={style.desc}>{description}</div>
      </article>
      <MessageList messages={messageList} />

      {isModalOn && <LoginModal onClose={() => setIsModalOn(false)} />}
    </div>
  );
}
