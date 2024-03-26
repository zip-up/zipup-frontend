import * as style from './styles';
import Image from 'next/image';

export default function MessageBox() {
  return (
    <div className={style.msgBox}>
      <Image src="" alt="프로필 이미지" width="20" height="20" />
      <div className={style.infoWrapper}>
        <div className={style.info}>
          김고은
          <span className={style.blueText}>40%기여</span>
        </div>
        <div className={style.comment}>내집마련 축하해🥳</div>
      </div>
    </div>
  );
}
