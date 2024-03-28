import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as style from '../styles';
import { css } from '@styled-system/css';
import classNames from 'classnames';
import SearchIcon from '@assets/icons/search.svg';
import CheckedIcon from '@assets/icons/checked.svg';
import UnCheckedIcon from '@assets/icons/unchecked.svg';
import AddressModal from '@components/modals/AddressModal';
import { useRouter } from 'next/router';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import GiftIcon from '@assets/icons/gift-icon.svg';
import ProgressBar from '@components/common/ProgressBar';
import { useRecoilState } from 'recoil';
import { createFundState } from '@store/store';
import { useCreateFunding } from '@hooks/queries/useCreateFunding';
import PageLayout from '@components/Layout/pageLayout';

interface FormInput {
  address: string;
  detailAddress: string;
  phone: number;
}

export default function CreatFundStep4() {
  const router = useRouter();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [isPrivacyShared, setIsPrivacyShared] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFund, setNewFund] = useRecoilState(createFundState);
  const id = 1;
  const { mutate: handleCreateFund } = useCreateFunding();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  const handleCreateFundSubmit = () => {
    if (isTermsAgreed && isPrivacyShared) {
      setNewFund({
        ...newFund,
        roadAddress: getValues('address'),
        detailAddress: getValues('detailAddress'),
        phoneNumber: String(getValues('phone')),
      });
      handleNext();
    }
  };

  const handleNext = () => {
    handleCreateFund(newFund, {
      onSuccess: data => {
        console.log(data);
      },
    });
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
                닫기
              </Button>
              <Button color="secondary" style={{ width: '16.8rem' }} onClick={() => null}>
                친구에게 공유하기
              </Button>
            </div>
          }
          icon={<GiftIcon />}
        />
      )}
      <Header onGoBack={() => router.back()} />
      <ProgressBar width={css({ width: '100%' })} />
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
            defaultValue={'주소 검색하기'}
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
        </label>
        <input
          className={style.input}
          placeholder="목표 달성 시 입력한 번호로 배송을 안내해드려요."
          {...register('phone', {
            valueAsNumber: true,
          })}
        />
        <p className={style.error_text}>{errors.phone ? errors.phone.message : ''}</p>

        <div
          className={classNames(style.message, message_height, css({ flexDirection: 'column' }))}
        >
          <div className={flexbox}>
            <div
              className={style.message_icon}
              onClick={() => setIsPrivacyShared(!isPrivacyShared)}
            >
              {isPrivacyShared ? <CheckedIcon /> : <UnCheckedIcon />}
            </div>
            <div className={add_margin}>
              <p className={style.message_text}>구매조건 확인 및 결제대행 서비스 약관 동의</p>
              <a
                href="https://danisong.notion.site/fbf04b6c117f44e1a224394b89d3e6dc"
                className={style.terms_conditions}
              >
                구매조건 확인 및 결제대행 서비스 약관 보기
              </a>
            </div>
          </div>
          <div className={flexbox}>
            <div className={style.message_icon} onClick={() => setIsTermsAgreed(!isTermsAgreed)}>
              {isTermsAgreed ? <CheckedIcon /> : <UnCheckedIcon />}
            </div>
            <div className={add_margin}>
              <p className={style.message_text}>개인정보 제3자 제공 동의</p>
              <a
                href="https://danisong.notion.site/3-6b01ebda16e348488b1bb566c3451e41"
                className={style.terms_conditions}
              >
                개인정보처리방침 전체내용 보기
              </a>
            </div>
          </div>
        </div>
        <div className={classNames(flexbox, button)}>
          <Button
            type="submit"
            className={css({ width: '12.4rem' })}
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            나중에 입력
          </Button>
          <Button type="submit" className={css({ width: '19.1rem' })} color="secondary">
            등록 완료
          </Button>
        </div>
      </form>
      {isOpen && (
        <AddressModal
          onSetAddress={text => setValue('address', text)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </PageLayout>
  );
}

const message_height = css({
  height: '10.2rem',
});

const flexbox = css({
  display: 'flex',
  gap: '0.8rem',
});

const add_margin = css({
  marginTop: '-0.1rem',
});

const button = css({
  position: 'absolute',
  bottom: '2.5rem',
  left: '2rem',
  width: '32.3rem',
});
