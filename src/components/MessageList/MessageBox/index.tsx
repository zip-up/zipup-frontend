import * as style from './styles';
import { MessageInfo } from '@typings/funding';
import UserIcon from '@assets/icons/user.svg';
import Image from 'next/image';
interface MessageBoxProps {
  msg: MessageInfo;
}

export default function MessageBox({
  msg: { profileImage, senderName, contributionPercent, congratsMessage },
}: MessageBoxProps) {
  return (
    <div className={style.msgBox}>
      <span className={style.image}>
        {profileImage ? (
          <Image src={profileImage} alt="프로필 이미지" width="20" height="20" />
        ) : (
          <UserIcon />
        )}
      </span>
      <div className={style.infoWrapper}>
        <div className={style.info}>
          {senderName}
          <span className={style.blueText}>{contributionPercent}% 기여</span>
        </div>
        <div className={style.comment}>{congratsMessage}</div>
      </div>
    </div>
  );
}
