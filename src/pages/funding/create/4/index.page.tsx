/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useEffect, useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import * as style from '../styles';
import { css, cx } from 'styled-system/css';

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
import Spinner from '@components/common/Spinner';
import { flex } from 'styled-system/patterns';
import { shareKakao } from '@utils/share';
import Term from '@components/Term';
import { TermsCheckFlags } from '@typings/term';
import { PrivacyTerm, PurchaseTerm } from '@constants/terms';
import { infoContainer } from '@components/Term/styles';

interface FormInputs extends TermsCheckFlags {
  roadAddress: string;
  detailAddress: string;
  phoneNumber: string;
}

export default function CreatFundStep4() {
  const router = useRouter();
  const [newFunding, setNewFunding] = useRecoilState(createFundState);
  const user = useRecoilValue(userState);
  const [fundId, setFundId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createFunding } = useCreateFunding(createdFundingData => {
    setFundId(Number(createdFundingData.id));
    setNewFunding(prevFundingData => ({
      ...prevFundingData,
      imageUrl: createdFundingData.imageUrl,
    }));
    setIsModalOpen(true);
  });
  //const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  useEffect(() => {
    const handleResize = () => {
      //   setCurrentHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateFundSubmit = async (step4FormData: FormInputs) => {
    const totalFormInputData = { ...newFunding, ...step4FormData };

    setNewFunding(totalFormInputData);

    createFunding({
      data: totalFormInputData,
    });
  };

  const handleSubmitError: SubmitErrorHandler<FormInputs> = errors => {
    if (errors.isPurchaseChecked || errors.isPrivacyChecked) {
      const errorMessage = errors.isPurchaseChecked?.message || errors.isPrivacyChecked?.message;

      console.log(errorMessage);
    }
  };

  const handleShareKakao = () => {
    shareKakao({ username: user.name, imageUrl: newFunding.imageUrl, fundId: fundId });
  };

  const Buttons = () => {
    return (
      <>
        <Button
          type="submit"
          className={css({ width: '12.4rem' })}
          color={isSubmitting ? 'disabled' : 'primary'}
          disabled={isSubmitting}
        >
          나중에 입력
        </Button>
        <Button
          type="submit"
          className={css({ width: '19.1rem' })}
          color={isSubmitting ? 'disabled' : 'secondary'}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner size="sm" /> : '등록 완료'}
        </Button>
      </>
    );
  };
  console.log(isSubmitting);
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
                  if (fundId) {
                    router.push('/funding/' + fundId);
                  } else {
                    alert('잘못된 접근입니다.');
                  }
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

      <form
        className={style.form}
        onSubmit={handleSubmit(handleCreateFundSubmit, handleSubmitError)}
      >
        <label>
          <span className={style.subtitle}>선물을 배송받을 주소를 입력해주세요.</span>
        </label>
        <div className={style.date_box} onClick={() => setIsOpen(true)}>
          <input
            className={cx(
              style.input_shape,
              css({ color: !watch('roadAddress') ? 'text.200' : 'text.100' }),
            )}
            readOnly
            placeholder="주소 검색하기"
            {...register('roadAddress')}
          />
          <button type="button" className={style.pointer}>
            <SearchIcon />
          </button>
        </div>
        <input
          className={cx(
            style.input,
            css({
              marginTop: '-0.8rem',
              marginBottom: '1.6rem',
              borderWidth: '0.1rem',
              borderColor: 'bg.300',
            }),
          )}
          placeholder="상세 주소를 입력해주세요."
          {...register('detailAddress')}
        />

        <label>
          <span className={style.subtitle}>전화번호를 입력해주세요.</span>
          <span className={style.required}>*</span>
        </label>
        <input
          className={cx(
            style.input,
            css({
              borderWidth: '0.1rem',
              borderColor: errors.phoneNumber ? 'error' : 'bg.300',
            }),
          )}
          placeholder="목표 달성 시 입력한 번호로 배송을 안내해드려요."
          {...register('phoneNumber', {
            valueAsNumber: true,
            required: '필수 항목을 입력하지 않았습니다.',
          })}
        />
        <p className={style.error_text}>{errors.phoneNumber ? errors.phoneNumber.message : ''}</p>

        <div className={infoContainer}>
          <Term
            label="isPurchaseChecked"
            term={PurchaseTerm}
            register={register}
            isChecked={watch('isPurchaseChecked')}
          />
          <Term
            label="isPrivacyChecked"
            term={PrivacyTerm}
            register={register}
            isChecked={watch('isPrivacyChecked')}
          />
        </div>

        <div
          className={cx(
            flex({ justifyContent: 'center', gap: '0.8rem' }),
            //      currentHeight <= 680 ? wrapper : buttons,
          )}
        >
          <Buttons />
        </div>
      </form>

      {isOpen && (
        <AddressModal
          onSetAddress={text => setValue('roadAddress', text)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </PageLayout>
  );
}

// const wrapper = css({
//   width: '100%',
//   margin: '2.4rem 0',
// });

// const buttons = css({
//   position: 'absolute',
//   bottom: '2.5rem',
//   left: '2rem',
//   width: '32.3rem',
// });
