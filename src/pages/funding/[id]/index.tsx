import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@components/common/Header';
import Image from 'next/image';
import MoreIcon from '@assets/icons/more_vert.svg';
import * as style from './styles';
import Button from '@components/common/Button';

export default function Funding() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div className={style.pageLayout}>
      <Header />
      <Image src="" alt="상품 이미지" style={{ width: '100%', height: '216px' }} />

      <article className={style.wrapper}>
        <div className={style.topbar}>
          <h2 className={style.title}>펀딩 제목입니다.</h2>
          <MoreIcon />
        </div>

        <div className={style.statusBox}>
          <div className={style.subInfoWrapper}>
            <div className={style.statusMsg}>
              <span className={style.percentageText}>75%</span>의 마음이 UP 되었어요
            </div>
            <span>진행중 태그</span>
          </div>
          <div>progress bar</div>

          <div className={style.captionWrapper}>
            <span>
              펀딩 종료까지 <span className={style.blueText}>0일</span>
            </span>
            <span>
              <span className={style.blueText}>목표금액</span> 1,000,000원
            </span>
          </div>
        </div>

        <Button color="secondary" onClick={() => {}}>
          친구에게 공유하기
        </Button>

        <div>
          이 곳에는 펀딩 소개가 들어갈거예요. 펀딩 등록시 입력한 소개를 여기에 노출시킬 거예요.
          글자수 제한이 없어요.....
        </div>
      </article>

      {/* <Link href={{ pathname: `/funding/${id}/payment`, query: { amount: 20000 } }}>결제하기</Link> */}
    </div>
  );
}
