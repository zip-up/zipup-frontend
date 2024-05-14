import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Accordion from '@components/Accordion';
import Header from '@components/common/Header';
import Tabs from '@components/common/Tabs';
import Footer from '@components/Footer';
import { FaqQuestions, FaqQuestionsType } from '@constants/faqs';
import { useForm } from 'react-hook-form';
import { css } from 'styled-system/css';

import SearchIcon from '../../assets/icons/search.svg';
import * as style from './styles';

type FormInputs = {
  text: string;
};

export default function Faq() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('이용문의');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const { register, getValues, handleSubmit } = useForm<FormInputs>();

  const submitHandler = () => {
    // submit
  };

  const handleAccordionToggle = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <>
      <Header title="자주 묻는 질문" onGoBack={() => router.back()} />
      <form className={style.searchBox} onSubmit={handleSubmit(submitHandler)}>
        <input
          className={style.input}
          {...register('text')}
          placeholder="궁금한 내용을 검색해보세요."
        />
        <button type="submit" className={style.searchBtn}>
          <SearchIcon />
        </button>
      </form>
      <div style={{ width: '100%' }}>
        {!getValues('text') && (
          <Tabs
            data={['이용문의', '배송', '취소/환불', '회원']}
            activeTab={activeTab}
            onSetActiveTab={setActiveTab}
          />
        )}
        <div className={style.content}>
          {getValues('text') &&
            Object.values(FaqQuestions)
              .flat()
              .filter(
                el =>
                  el.answer.includes(getValues('text')) || el.question.includes(getValues('text')),
              )
              .map(item => (
                <Accordion
                  key={item.question}
                  {...item}
                  isOpen={openQuestion === item.question}
                  onToggle={() => handleAccordionToggle(item.question)}
                />
              ))}
          {!getValues('text') &&
            FaqQuestions[activeTab as keyof FaqQuestionsType].map(item => (
              <Accordion
                key={item.question}
                {...item}
                isOpen={openQuestion === item.question}
                onToggle={() => handleAccordionToggle(item.question)}
              />
            ))}
          <Footer className={footerQuery} />
        </div>
      </div>
    </>
  );
}

const footerQuery = css({
  '@media (min-height: 706px)': {
    position: 'absolute',
    bottom: 0,
  },
});