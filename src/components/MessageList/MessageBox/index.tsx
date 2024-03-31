import * as style from './styles';
import { MessageInfo } from '@typings/funding';
import UserIcon from '@assets/icons/user_m.svg';
import Profile from '@components/common/Profile';
interface MessageBoxProps {
  msg: MessageInfo;
}

export default function MessageBox({
  msg: { profileImage, senderName, contributionPercent, congratsMessage },
}: MessageBoxProps) {
  return (
    <div className={style.msgBox}>
      {profileImage ? <Profile src={profileImage} width="5rem" height="5rem" /> : <UserIcon />}
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
