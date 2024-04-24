import * as style from './styles';
import { MessageInfo } from '@typings/funding';
import UserIcon from '@assets/icons/user_m.svg';
import Profile from '@components/common/Profile';
interface MessageProps {
  isMessageExist?: boolean;
  msg?: MessageInfo;
}

export default function MessageBox({ isMessageExist = false, msg }: MessageProps) {
  return (
    <div className={style.msgBox}>
      {msg?.profileImage ? (
        <Profile src={msg.profileImage} size="sm" />
      ) : (
        <div>
          <UserIcon />
        </div>
      )}
      <div className={style.infoWrapper}>
        {isMessageExist && (
          <div className={style.info}>
            {msg?.senderName}
            <span className={style.blueText}>{msg?.contributionPercent}% 기여</span>
          </div>
        )}
        <div className={style.comment}>
          {isMessageExist
            ? msg?.congratsMessage
            : '아직 메시지가 없어요. 펀딩을 공유하고 친구들에게 메시지를 받아보세요!'}
        </div>
      </div>
    </div>
  );
}
