import Header from '@components/common/Header';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { style } from './styles';
import { useForm } from 'react-hook-form';
import SearchIcon from '../../assets/icons/search.svg';
import { css, cx } from 'styled-system/css';
import Accordion from '@components/Accordion';
import { FaqQuestions, FaqQuestionsType } from '@constants/faqs';
import Footer from '@components/Footer';

type FormInputs = {
  text: string;
};

const Faq = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('이용문의');
  const [keyword, setKeyword] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const { register, getValues, handleSubmit } = useForm<FormInputs>();

  const submitHandler = () => {
    setKeyword(getValues('text'));
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
        {!keyword && (
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
          {keyword &&
            Object.values(FaqQuestions)
              .flat()
              .filter(el => el.answer.includes(keyword) || el.question.includes(keyword))
              .map(item => (
                <Accordion
                  key={item.question}
                  {...item}
                  isOpen={openQuestion === item.question}
                  onToggle={() => handleAccordionToggle(item.question)}
                />
              ))}
          {!keyword &&
            FaqQuestions[activeTab as keyof FaqQuestionsType].map(item => (
              <Accordion
                key={item.question}
                {...item}
                isOpen={openQuestion === item.question}
                onToggle={() => handleAccordionToggle(item.question)}
              />
            ))}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Faq;
