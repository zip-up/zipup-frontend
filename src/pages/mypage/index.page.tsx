import Image from 'next/image';
import { useRouter } from 'next/router';
import UserIcon from '@assets/icons/big-user.svg';
import GoIcon from '@assets/icons/go.svg';
import MyFundingIcon from '@assets/images/my-funding.svg';
import ParticipatedFundingIcon from '@assets/images/participated_funding.svg';
import Button from '@components/common/Button';
import Footer from '@components/Footer';
import HeaderWithLogo from '@components/HeaderWithLogo';
import ServiceCard from '@components/ServiceCard';
import { useLogout, useUser } from '@hooks/queries/useAuth';
import { getLoacalStorage } from '@store/localStorage';
import { css } from 'styled-system/css';

import * as style from './styles';

export default function MyPage() {
  const router = useRouter();

  const { data: user } = useUser();
  const { mutate: _mutate } = useLogout();

  const handleLogout = () => {
    //mutate({ });
    // setToken('');
    // localStorage.removeItem('@token');
    // localStorage.removeItem('@user');
    // router.push('/');
  };

  return (
    <>
      <HeaderWithLogo onOpen={() => router.push('/mypage')} />
      <div className={style.content}>
        <div className={style.profileBox}>
          <div className={style.infoBox}>
            <div className={style.avatar}>
              {user?.profileImage ? (
                <Image src={user.profileImage} alt="profile image" width={42} height={42} />
              ) : (
                <UserIcon />
              )}
            </div>
            <div className={style.nameBox}>
              <span className={style.name}>{user?.name}</span>
              <span>님</span>
            </div>
            <button className={style.logoutBtn} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
          <Button
            color="primary"
            className={style.button}
            onClick={() =>
              getLoacalStorage('@token') ? router.push('/funding/create/1') : router.push('/')
            }
          >
            내 펀딩 만들러 가기 <GoIcon style={{ color: '#D9D9D9' }} />
          </Button>
        </div>

        <div className={css(style.cardSection)}>
          <h3 className={style.serviceTitle}>서비스</h3>
          <ServiceCard
            href="/mypage/fundings/my"
            title="내가 만든 펀딩"
            subTitle="작성한 펀딩을 확인할 수 있어요"
            img={<MyFundingIcon />}
          />
          <ServiceCard
            href="/mypage/fundings/participated"
            title="참여한 펀딩"
            subTitle="결제한 펀딩을 확인할 수 있어요"
            img={<ParticipatedFundingIcon />}
          />
        </div>

        <div className={style.supportCardSection}>
          <h3 className={style.serviceTitle}>고객지원</h3>
          <ServiceCard
            type="support"
            href="/faq"
            title="자주 묻는 질문 / 문의하기"
            subTitle="서비스에 궁금한 점이 있나요?"
          />
          <ServiceCard
            type="support"
            href="/mypage/payinfo"
            title="내 정보 관리"
            subTitle="결제 내역 및 배송지 정보 관리"
          />
        </div>

        <Footer
          className={css({
            '@media (min-height: 800px)': {
              position: 'absolute',
              bottom: 0,
            },
          })}
        />
      </div>
    </>
  );
}
