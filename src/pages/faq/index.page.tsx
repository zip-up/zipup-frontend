import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Accordion from '@components/Accordion';
import Header from '@components/common/Header';
import Footer from '@components/Footer';
import { FaqQuestions, FaqQuestionsType } from '@constants/faqs';
import { useForm } from 'react-hook-form';
import { css, cx } from 'styled-system/css';

import SearchIcon from '../../assets/icons/search.svg';
import { style } from './styles';

type FormInputs = {
  text: string;
};

function Faq() {
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
      <div>
        {!getValues('text') && (
          <div className={style.tabs}>
            {['이용문의', '배송', '취소/환불', '회원'].map(item => (
              <div
                key={item}
                className={cx(
                  style.tabItem,
                  css({
                    fontWeight: activeTab === item ? '600' : '400',
                    color: activeTab === item ? 'main.blue' : 'text.200',
                    borderBottomColor: activeTab === item ? 'main.blue' : 'gray.30',
                  }),
                )}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </div>
            ))}
          </div>
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

export default Faq;

const footerQuery = css({
  '@media (min-height: 706px)': {
    position: 'absolute',
    bottom: 0,
  },
});
