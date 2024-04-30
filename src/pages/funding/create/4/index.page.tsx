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
import { useRecoilState } from 'recoil';
import { createFundState } from '@store/store';
import { useCreateFunding } from '@hooks/queries/useCreateFunding';
import Spinner from '@components/common/Spinner';
import Term from '@components/Term';
import { TermsCheckFlags } from '@typings/term';
import { PrivacyTerm, PurchaseTerm } from '@constants/terms';
import { infoContainer } from '@components/Term/styles';
import { shareKakao } from '@utils/share';
import { useUser } from '@hooks/queries/useAuth';
import { flex } from 'styled-system/patterns';

interface FormInputs extends TermsCheckFlags {
  roadAddress: string;
  detailAddress: string;
  phoneNumber: string;
}

export default function CreatFundStep4() {
  const router = useRouter();
  const [newFunding, setNewFunding] = useRecoilState(createFundState);
  const { data: user } = useUser();
  const [fundId, setFundId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const { mutate: createFunding, isPending } = useCreateFunding(createdFundingData => {
    setFundId(createdFundingData.id);
    setNewFunding(prevFundingData => ({
      ...prevFundingData,
      imageUrl: createdFundingData.imageUrl,
    }));
    setIsModalOpen(true);
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight);
    }
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
    shareKakao({ userName: user?.name || '', imageUrl: newFunding.imageUrl, fundingId: fundId });
  };

  const Buttons = () => {
    return (
      <div
        className={flex({
          width: '32.9rem',
          gap: '1.2rem',
          margin: height <= 670 ? '0 auto' : 0,
          position: height > 670 ? 'absolute' : 'inherit',
          bottom: '2rem',
          left: '1.5rem',
        })}
      >
        <Button type="submit" style={{ width: '12.6rem' }} color="primary" disabled={isPending}>
          나중에 입력
        </Button>
        <Button type="submit" style={{ width: '19.1rem' }} disabled={isPending}>
          {isPending ? <Spinner size="sm" /> : '등록 완료'}
        </Button>
      </div>
    );
  };

  return (
    <>
      {isModalOpen && (
        <ModalWithIcon
          width="31.7rem"
          onClose={() => setIsModalOpen(false)}
          title="펀딩 등록이 완료되었어요."
          subtitle="내 펀딩을 친구들에게 공유해볼까요?"
          buttonComponent={
            <div className={style.modal_button_wrapper}>
              <Button
                color="primary"
                size="regular"
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
              <Button size="regular" style={{ width: '16rem' }} onClick={handleShareKakao}>
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

        <div className={css({ marginBottom: '2rem' })}>
          <Buttons />
        </div>
      </form>

      {isOpen && (
        <AddressModal
          onSetAddress={text => setValue('roadAddress', text)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
