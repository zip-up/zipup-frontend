import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/common/Button';
import Header from '@components/common/Header';
import { statusBox } from '@components/FundingStatusBox/styles';
import CommonGreetingPage from '@components/Layout/GreetingPageLayout';
import { css, cx } from 'styled-system/css';

export default function ThanksLetter() {
  const router = useRouter();
  const { isOrganizer: _isOrganizer } = router.query;

  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);
  const [message, setMessage] = useState('');

  const isOrganizer = _isOrganizer === 'true';

  return (
    <>
      <Header onGoBack={() => router.back()} />
      <CommonGreetingPage
        type="gratitude"
        headTitle={
          isOrganizer ? (
            <p>
              펀딩이 <span>성공</span>했어요!
            </p>
          ) : (
            <>
              <p>
                <span>김집업</span>님의
              </p>
              감사 편지가 도착했어요
            </>
          )
        }
        subTitle={
          isOrganizer ? (
            <span>
              선물을 완성시켜준 친구들에게
              <br />
              고마운 마음을 편지로 전해봐요.
            </span>
          ) : (
            '소중한 마음을 보태주셔서 감사해요!'
          )
        }
        letter={
          <Textarea
            message={message}
            setMessage={setMessage}
            isOrganizer={isOrganizer}
            setIsTextareaExpanded={setIsTextareaExpanded}
          />
        }
        button={
          isOrganizer ? (
            <Button type="submit" isBottomFixed disabled={isOrganizer && !message}>
              작성 완료
            </Button>
          ) : (
            <Button type="button" isBottomFixed onClick={() => router.back()}>
              닫기
            </Button>
          )
        }
        isTextareaExpanded={isTextareaExpanded}
      />
    </>
  );
}

interface TextareaProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isOrganizer?: boolean;
  setIsTextareaExpanded: Dispatch<SetStateAction<boolean>>;
}

function Textarea({ message, setMessage, isOrganizer, setIsTextareaExpanded }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MIN_HEIGHT = 60;
  const EXPANSION_THRESHOLD_HEIGHT = 80;
  const MAX_HEIGHT = 100;

  return (
    <div
      className={cx(
        statusBox({ type: 'floating' }),
        css({ height: 'auto', minHeight: '9.3rem', padding: '1.2rem 1.5rem' }),
      )}
    >
      <textarea
        className={css({
          fontSize: '1.4rem',
          lineHeight: '2rem',
          letterSpacing: '-0.014rem',
          width: '100%',
          overflow: 'hidden',
          outline: 'none',
          resize: 'none',
        })}
        rows={3}
        maxLength={100}
        ref={textareaRef}
        readOnly={!isOrganizer}
        value={message}
        placeholder={
          isOrganizer ? '친구들에게 보낼 편지를 작성해주세요.' : '아직 편지를 작성중이에요.'
        }
        onChange={e => {
          const textarea = textareaRef.current;
          if (!textarea || textarea.scrollHeight > MAX_HEIGHT) return;

          textarea.style.height = 'auto';
          textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;

          if (textarea.scrollHeight === EXPANSION_THRESHOLD_HEIGHT) setIsTextareaExpanded(true);
          else if (textarea.style.height === `${MIN_HEIGHT}px`) setIsTextareaExpanded(false);
          setMessage(e.target.value);
        }}
      />
    </div>
  );
}
