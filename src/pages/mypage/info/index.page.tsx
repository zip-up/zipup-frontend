/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PayInfo from '@components/AccountManagement/PayInfo';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import Tabs from '@components/common/Tabs';
import NoResut from '@components/NoResult';
import ShippingInfoForm from '@components/ShippingInfoForm.tsx';
import { MYPAGE_TABS } from '@constants/tabs';
import { useGetPaymentList } from '@hooks/queries/usePayment';
import { useGetShipping, usePatchShipping } from '@hooks/queries/useShipping';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-system/css';

interface FormData {
  roadAddress: string;
  detailAddress: string;
  phone: string;
}

export default function Info() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(MYPAGE_TABS[0]);
  const methods = useForm<FormData>({
    mode: 'onChange',
  });

  const { data: paymentList, isLoading } = useGetPaymentList();
  const { data: shippingData } = useGetShipping();
  const { mutate } = usePatchShipping({ successHandler: () => {} });

  useEffect(() => {
    methods.setValue('detailAddress', shippingData?.detailAddress || '');
    methods.setValue('phone', shippingData?.phoneNumber || '');
    methods.setValue('roadAddress', shippingData?.roadAddress || '');
  }, [shippingData]);

  const submitHandler = (data: FormData) =>
    mutate({
      detailAddress: data.detailAddress,
      roadAddress: data.roadAddress,
      phoneNumber: data.phone,
    });

  return (
    <>
      <Header title="내 정보 관리" onGoBack={() => router.push('/mypage')} />
      <Tabs data={MYPAGE_TABS} activeTab={activeTab} onSetActiveTab={setActiveTab} />
      {activeTab === '결제 내역' &&
        (paymentList?.length ? (
          <PayInfo paymentList={paymentList!} isLoading={isLoading} />
        ) : (
          <NoResut
            title="아직 참여한 펀딩이 없어요"
            desc="집들이를 준비하는 친구에게 집업을 알려보세요."
          />
        ))}
      {activeTab === '배송지 관리' && (
        <form className={container} onSubmit={methods.handleSubmit(submitHandler)}>
          <div>
            <FormProvider {...methods}>
              <ShippingInfoForm
                isFromMyPage
                phoneOptions={{
                  pattern: {
                    value: /^[0-9]*$/,
                    message: '숫자로만 입력해주세요.',
                  },
                }}
              />
            </FormProvider>
          </div>
          <Button
            type="submit"
            isBottomFixed
            disabled={
              !methods.watch('detailAddress') ||
              !methods.watch('phone') ||
              !methods.watch('roadAddress')
            }
          >
            {/* {isPending ? <Spinner size="sm" /> : '배송지 저장하기'} */}
            배송지 저장하기
          </Button>
        </form>
      )}
    </>
  );
}

const container = css({
  height: 'calc(100% - 9.8rem)',
  backgroundColor: 'bg.200',
  padding: '1.6rem',
});
