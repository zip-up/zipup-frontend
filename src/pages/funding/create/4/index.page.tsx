import { useState } from 'react';
import { useRouter } from 'next/router';
import GiftIcon from '@assets/icons/gift-icon.svg';
import Button from '@components/common/Button';
import GradientBackground from '@components/common/Button/GradientBackground';
import Header from '@components/common/Header';
import ProgressBar from '@components/common/ProgressBar';
import Spinner from '@components/common/Spinner';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import ShippingInfoForm from '@components/ShippingInfoForm.tsx';
import Term from '@components/Term';
import { infoContainer } from '@components/Term/styles';
import { PRIVACY_TERM, PURCHASE_TERM } from '@constants/terms';
import { useUser } from '@hooks/queries/useAuth';
import { useCreateFunding } from '@hooks/queries/useFunding';
import { createFundState } from '@store/store';
import { TermsCheckFlags } from '@typings/term';
import { shareKakao } from '@utils/share';
import { FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import * as style from '../styles';

interface FormInputs extends TermsCheckFlags {
  roadAddress: string;
  detailAddress: string;
  phoneNumber: string;
}

export default function CreatFundStep4() {
  const router = useRouter();
  const [newFunding, setNewFunding] = useRecoilState(createFundState);
  const [fundId, setFundId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<FormInputs>();

  const { data: user } = useUser();

  const { mutate: createFunding, isPending } = useCreateFunding(createdFundingData => {
    setFundId(createdFundingData.id);
    setNewFunding(prevFundingData => ({
      ...prevFundingData,
      imageUrl: createdFundingData.imageUrl,
    }));
    setIsModalOpen(true);
  });

  const handleCreateFundSubmit = async (step4FormData: FormInputs) => {
    const totalFormInputData = { ...newFunding, ...step4FormData };

    setNewFunding(totalFormInputData);

    if (newFunding.target === 'create') {
      createFunding({
        data: totalFormInputData,
      });
    } else {
      // TODO: 펀딩 수정 API 필요함
      alert(`추후 수정될 예정입니다.`);
      router.push('/funding/' + newFunding.id);
    }
  };

  const handleSubmitError: SubmitErrorHandler<FormInputs> = errors => {
    if (errors.isPurchaseChecked || errors.isPrivacyChecked) {
      const errorMessage = errors.isPurchaseChecked?.message || errors.isPrivacyChecked?.message;

      console.error(errorMessage);
    }
  };

  const handleShareKakao = () => {
    shareKakao({ userName: user?.name || '', imageUrl: newFunding.imageUrl, fundingId: fundId });
  };

  function getCompletedText() {
    if (newFunding.target === 'update') {
      return '수정 완료';
    }

    return '등록 완료';
  }

  function Buttons() {
    return (
      <GradientBackground>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner size="sm" /> : getCompletedText()}
        </Button>
      </GradientBackground>
    );
  }

  return (
    <>
      {isModalOpen && (
        <ModalWithIcon
          width="31.7rem"
          onClose={() => setIsModalOpen(false)}
          title={
            newFunding.target === 'create'
              ? '펀딩 등록이 완료되었어요.'
              : '펀딩 수정이 완료되었어요.'
          }
          subtitle="내 펀딩을 친구들에게 공유해볼까요?"
          buttonComponent={
            <div className={style.modalButtonWrapper}>
              <Button
                color="primary"
                size="regular"
                onClick={() => {
                  setIsModalOpen(false);
                  if (fundId) {
                    router.push('/funding/' + fundId + '?from=myPage');
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
      <h4 className={style.stepName}>Step 4</h4>
      <h2 className={style.title}>배송 정보를 입력해주세요.</h2>

      <form
        className={style.form}
        onSubmit={methods.handleSubmit(handleCreateFundSubmit, handleSubmitError)}
      >
        <FormProvider {...methods}>
          <ShippingInfoForm
            phoneOptions={{
              required: '필수 항목을 입력하지 않았습니다.',
            }}
          />
        </FormProvider>

        <div className={infoContainer}>
          <Term
            label="isPurchaseChecked"
            term={PURCHASE_TERM}
            register={methods.register}
            isChecked={methods.watch('isPurchaseChecked')}
          />
          <Term
            label="isPrivacyChecked"
            term={PRIVACY_TERM}
            register={methods.register}
            isChecked={methods.watch('isPrivacyChecked')}
          />
        </div>

        <Buttons />
      </form>
    </>
  );
}
