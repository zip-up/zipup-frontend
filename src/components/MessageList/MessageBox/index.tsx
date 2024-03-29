import * as style from './styles';
import Image from 'next/image';
import { MessageInfo } from '@typings/funding';

interface MessageBoxProps {
  msg: MessageInfo;
}

export default function MessageBox({
  msg: { profileImage, senderName, contributionPercent, congratsMessage },
}: MessageBoxProps) {
  return (
    <div className={style.msgBox}>
      <Image src="" alt="프로필 이미지" width="20" height="20" />
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
