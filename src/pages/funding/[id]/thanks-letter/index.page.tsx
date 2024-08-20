import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Button from '@components/common/Button';
import { statusBox } from '@components/FundingStatusBox/styles';
import CommonGreetingPage from '@components/Layout/GreetingPageLayout';
import { css, cx } from 'styled-system/css';

interface ThanksLetterProps {
  isOrganizer: boolean;
}

export default function ThanksLetter({ isOrganizer }: ThanksLetterProps) {
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);

  return (
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
        isOrganizer
          ? `선물을 완성시켜준 친구들에게\s
		고마운 마음을 편지로 전해봐요.`
          : '소중한 마음을 보태주셔서 감사해요!'
      }
      letter={
        <Textarea
          isTextareaExpanded={isTextareaExpanded}
          setIsTextareaExpanded={setIsTextareaExpanded}
        />
      }
      button={
        <Button type="submit" isBottomFixed>
          작성 완료
        </Button>
      }
      isTextareaExpanded={isTextareaExpanded}
    />
  );
}

interface TextareaProps {
  isTextareaExpanded: boolean;
  setIsTextareaExpanded: Dispatch<SetStateAction<boolean>>;
}

function Textarea({ isTextareaExpanded, setIsTextareaExpanded }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MIN_HEIGHT = 66;
  const MAX_HEIGHT = 88;

  return (
    <div
      className={cx(
        statusBox({ type: 'floating' }),
        css({ height: !isTextareaExpanded ? '9.3rem' : '12rem', padding: '1.2rem 1.5rem' }),
      )}
    >
      <textarea
        className="ta"
        rows={3}
        maxLength={100}
        style={{
          fontSize: '1.4rem',
          lineHeight: '2.2rem',
          letterSpacing: '-0.014rem',
          width: '100%',
          overflow: 'hidden',
          outline: 'none',
        }}
        ref={textareaRef}
        onChange={() => {
          const textarea = textareaRef.current;
          if (!textarea) return;

          if (textarea.scrollHeight > MAX_HEIGHT) {
            return (textarea.value = textarea.value.slice(0, -1));
          }

          textarea.style.height = 'auto';
          textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;

          if (textarea.scrollHeight === MAX_HEIGHT) setIsTextareaExpanded(true);
          else if (textarea.style.height === `${MIN_HEIGHT}px`) setIsTextareaExpanded(false);
        }}
      />
    </div>
  );
}
