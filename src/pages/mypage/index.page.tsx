import Image from 'next/image';
import { useRouter } from 'next/router';
import UserIcon from '@assets/icons/big-user.svg';
import ExitIcon from '@assets/icons/exit.svg';
import GoIcon from '@assets/icons/go.svg';
import MyFundingIcon from '@assets/images/my-funding.svg';
import ParticipatedFundingIcon from '@assets/images/participated_funding.svg';
import Button from '@components/common/Button';
import HeaderWithLogo from '@components/HeaderWithLogo';
import { useLogout, useUser } from '@hooks/queries/useAuth';
import { getLoacalStorage } from '@store/localStorage';
import * as style from './styles';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

const termsAndConditions = [
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

function MyPage() {
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
            내 펀딩 만들러 가기 <GoIcon />
          </Button>
        </div>
        <div className={style.serviceBox}>
          <span className={style.boxTitle}>서비스</span>
          <button className={style.goFundingBtn} onClick={() => router.push('/mypage/fundings/my')}>
            <div className={style.goFundingInfoBox}>
              <h2 className={style.goFundingTitle}>내가 만든 펀딩</h2>
              <span className={style.goFundingSubTitle}>작성한 펀딩을 확인할 수 있어요</span>
            </div>
            <p className={style.fundingImage}>
              <MyFundingIcon />
            </p>
          </button>
          <button
            className={style.goFundingBtn}
            onClick={() => router.push('/mypage/fundings/participated')}
          >
            <div className={style.goFundingInfoBox}>
              <h2 className={style.goFundingTitle}>참여한 펀딩</h2>
              <span className={style.goFundingSubTitle}>결제한 펀딩을 확인할 수 있어요</span>
            </div>
            <p className={style.fundingImage}>
              <ParticipatedFundingIcon />
            </p>
          </button>
        </div>
        <div className={style.supportBox}>
          <span className={style.boxTitle}>고객지원</span>
          <button
            className={cx(
              style.goFundingBtn,
              flex({
                direction: 'column',
                marginTop: '1.6rem',
                borderColor: 'gray.300',
                justify: 'center',
                gap: '0.4rem',
              }),
            )}
            onClick={() => router.push('/faq')}
          >
            <h2 className={style.goFundingTitle}>자주 묻는 질문 / 문의하기</h2>
            <span className={style.goFundingSubTitle}>서비스에 궁금한 점이 있나요?</span>
          </button>
        </div>
        <footer className={style.footer}>
          <div className={style.footerInfoBox}>
            <p>상호명 : 집업</p>
            <p>고객센터 : 0504-0815-5379</p>
            <div className={style.termsAndConditions}>
              {termsAndConditions.map(item => (
                <a key={item.text} href={item.link} className={style.pointer}>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyPage;
