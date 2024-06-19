import React, { useState } from 'react';
import SearchIcon from '@assets/icons/search.svg';
import AddressModal from '@components/modals/AddressModal';
import { useFormContext } from 'react-hook-form';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface FormData {
  roadAddress: string;
  detailAddress: string;
  phone: string;
}

interface ShippingInfoFormProps {
  isFromMyPage?: boolean;
}

export default function ShippingInfoForm({ isFromMyPage }: ShippingInfoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  const handleInitialize = () => {
    setValue('detailAddress', '');
    setValue('roadAddress', '');
    setValue('phone', '');
  };

  return (
    <>
      <label>
        {isFromMyPage ? (
          <div className={style.mypageCategoryBox}>
            <span className={cx(style.subTitle, css({ paddingLeft: isFromMyPage ? 0 : '2rem' }))}>
              기본 배송지
            </span>
            <button onClick={handleInitialize}>
              <span className={style.initialize}>입력 내용 지우기</span>
            </button>
          </div>
        ) : (
          <span className={cx(style.subTitle, css({ paddingLeft: isFromMyPage ? 0 : '2rem' }))}>
            선물을 배송받을 주소를 입력해주세요.
          </span>
        )}
      </label>
      <div
        className={cx(
          style.box,
          css({
            marginLeft: isFromMyPage ? 0 : '2rem',
            borderColor: isFromMyPage ? 'bg.300' : 'main.blue',
            backgroundColor: 'white',
          }),
        )}
        onClick={() => setIsOpen(true)}
      >
        <input
          className={cx(
            style.inputShape,
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
            marginBottom: isFromMyPage ? '2.4rem' : '1.6rem',
            borderWidth: '0.1rem',
            borderColor: 'bg.300',
            marginLeft: isFromMyPage ? 0 : '1.7rem',
            backgroundColor: isFromMyPage ? 'white' : 'bg.200',
          }),
        )}
        placeholder="상세 주소를 입력해주세요."
        {...register('detailAddress')}
      />

      <label>
        <span className={cx(style.subTitle, css({ paddingLeft: isFromMyPage ? 0 : '2rem' }))}>
          {isFromMyPage ? '전화번호' : '전화번호를 입력해주세요.'}
        </span>
        {!isFromMyPage && <span className={style.required}>*</span>}
      </label>
      <input
        className={cx(
          style.input,
          css({
            borderWidth: '0.1rem',
            borderColor: errors.phone ? 'error' : 'bg.300',
            marginLeft: isFromMyPage ? 0 : '1.7rem',
            backgroundColor: isFromMyPage ? 'white' : 'bg.200',
          }),
        )}
        placeholder="목표 달성 시 입력한 번호로 배송을 안내해드려요."
        {...register('phone', {
          pattern: {
            value: /^[0-9]*$/,
            message: '전화번호는 숫자만 입력해주세요.',
          },
          required: '필수 항목을 입력하지 않았습니다.',
        })}
      />
      <p className={style.errorText}>{errors.phone ? errors.phone.message : ''}</p>
      {isOpen && (
        <AddressModal
          onSetAddress={text => setValue('roadAddress', text)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
