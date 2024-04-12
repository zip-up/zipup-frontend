/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as style from '../styles';
import { css } from 'styled-system/css';
import classNames from 'classnames';
import SearchIcon from '@assets/icons/search.svg';
import AddressModal from '@components/modals/AddressModal';
import { useRouter } from 'next/router';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import GiftIcon from '@assets/icons/gift-icon.svg';
import ProgressBar from '@components/common/ProgressBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createFundState, userState } from '@store/store';
import { useCreateFunding } from '@hooks/queries/useCreateFunding';
import PageLayout from '@components/Layout/pageLayout';
import TermsAndConditions from '@components/TermsAndConditions';
import { createTerms } from '@constants/terms';
import Spinner from '@components/common/Spinner';
import { flex } from 'styled-system/patterns';

interface FormInput {
  address: string;
  detailAddress: string;
  phone: string;
}

export default function CreatFundStep4() {
  const router = useRouter();
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const user = useRecoilValue(userState);
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { mutate: handleCreateFund } = useCreateFunding();
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (newFund) {
      setValue('address', newFund.roadAddress);
      setValue('detailAddress', newFund.detailAddress);
      setValue('phone', newFund.phoneNumber);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCurrentHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateFundSubmit = () => {
    if (isValid) {
      handleNext();
    }
  };

  const handleNext = () => {
    setIsButtonClicked(true);

    setNewFund({
      ...newFund,
      roadAddress: getValues('address'),
      detailAddress: getValues('detailAddress'),
      phoneNumber: !getValues('phone') ? '' : String(getValues('phone')),
    });

    handleCreateFund(
      { data: newFund },
      {
        onSuccess: data => {
          if (data) {
            console.log(data);
            setId(data.id);
            setNewFund({ ...newFund, imageUrl: data.imageUrl });
            setIsModalOpen(true);
          }
        },
      },
    );
  };

  const handleShareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${user.name}님의 집들이에 당신을 초대합니다.`,
        description: '집업에서 선물 펀딩에 함께해주세요!',
        imageUrl: newFund.imageUrl,
        link: {
          mobileWebUrl: `https://zip-up.vercel.app/funding/${id}`,
          webUrl: `https://zip-up.vercel.app/funding/${id}`,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: `https://zip-up.vercel.app/funding/${id}`,
            webUrl: `https://zip-up.vercel.app/funding/${id}`,
          },
        },
      ],
    });
    setIsButtonClicked(false);
  };

  const Buttons = () => {
    return (
      <>
        <Button
          type="submit"
          className={css({ width: '12.4rem' })}
          color={isButtonClicked ? 'disabled' : 'primary'}
          disabled={isButtonClicked}
        >
          나중에 입력
        </Button>
        <Button
          type="submit"
          className={css({ width: '19.1rem' })}
          color={isButtonClicked ? 'disabled' : 'secondary'}
          disabled={isButtonClicked}
        >
          {isButtonClicked ? <Spinner size="sm" /> : '등록 완료'}
        </Button>
      </>
    );
  };

  return (
    <PageLayout>
      {isModalOpen && (
        <ModalWithIcon
          width="31.7rem"
          onClose={() => setIsModalOpen(false)}
          title="펀딩 등록을 완료되었어요."
          subtitle="내 펀딩을 친구들에게 공유해볼까요?"
          buttonComponent={
            <div className={style.modal_button_wrapper}>
              <Button
                color="primary"
                style={{ width: '10.9rem' }}
                onClick={() => {
                  setIsModalOpen(false);
                  router.push('/funding/' + id);
                }}
              >
                내 펀딩 보기
              </Button>
              <Button color="secondary" style={{ width: '16.8rem' }} onClick={handleShareKakao}>
                친구에게 공유하기
              </Button>
            </div>
          }
          icon={<GiftIcon />}
        />
      )}
      <Header onGoBack={() => router.back()} />
      <ProgressBar width={'100%'} />
      <h4 className={style.step_name}>Step 4</h4>
      <h2 className={style.title}>배송 정보를 입력해주세요.</h2>

      <form className={style.form} onSubmit={handleSubmit(handleCreateFundSubmit)}>
        <label>
          <span className={style.subtitle}>선물을 배송받을 주소를 입력해주세요.</span>
        </label>
        <div className={style.date_box} onClick={() => setIsOpen(true)}>
          <input
            className={classNames(
              style.input_shape,
              css({ color: !getValues('address') ? 'text.200' : 'text.100' }),
            )}
            readOnly
            placeholder="주소 검색하기"
            {...register('address')}
          />
          <button type="button" className={style.pointer}>
            <SearchIcon />
          </button>
        </div>
        <input
          className={classNames(style.input, css({ marginTop: '-0.8rem', marginBottom: '1.6rem' }))}
          placeholder="상세 주소를 입력해주세요."
          {...register('detailAddress')}
        />

        <label>
          <span className={style.subtitle}>전화번호를 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={classNames(
            style.input,
            css({ borderWidth: '0.1rem', borderColor: errors.phone ? 'error' : 'bg.300' }),
          )}
          placeholder="목표 달성 시 입력한 번호로 배송을 안내해드려요."
          {...register('phone', {
            valueAsNumber: true,
            required: '필수 항목을 입력하지 않았습니다.',
          })}
        />
        <p className={style.error_text}>{errors.phone ? errors.phone.message : ''}</p>

        <TermsAndConditions data={createTerms} onSetIsValid={setIsValid} />
        {currentHeight <= 680 && (
          <div className={classNames(flex({ justifyContent: 'center', gap: '0.8rem' }), wrapper)}>
            <Buttons />
          </div>
        )}
      </form>
      {currentHeight > 680 && (
        <div className={classNames(flex({ justifyContent: 'center', gap: '0.8rem' }), buttons)}>
          <Buttons />
        </div>
      )}
      {isOpen && (
        <AddressModal
          onSetAddress={text => setValue('address', text)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </PageLayout>
  );
}

const wrapper = css({
  width: '100%',
  margin: '2.4rem 0',
});

const buttons = css({
  position: 'absolute',
  bottom: '2.5rem',
  left: '2rem',
  width: '32.3rem',
});
