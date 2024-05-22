import { CSSProperties } from 'react';
import Image from 'next/image';
import GiftIcon from '@assets/images/gift-images.svg';
import Button from '@components/common/Button';
import ProgressBar from '@components/common/ProgressBar';
import StatusTag from '@components/common/StatusTag';
import { FundingInfo, ProductInfo } from '@typings/funding';
import { css, cx } from 'styled-system/css';

import * as style from './styles';

interface CardProps {
  data?: FundingInfo;
  onClick: () => void;
  width?: string;
  height?: string;
  styles?: CSSProperties;
  isProduct?: boolean;
  product?: ProductInfo;
  hasShadow?: boolean;
}

export default function Card({
  data,
  onClick,
  width,
  height,
  styles,
  isProduct,
  product,
  hasShadow,
}: CardProps) {
  const PROGRESS_BAR_BASE_WIDTH = 140;

  return (
    <div
      style={styles}
      className={cx(
        style.container,
        width || css({ width: '15.6rem' }),
        height || css({ height: '19.3rem' }),
        css({
          boxShadow: hasShadow ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none',
          marginBottom: hasShadow ? '2.5rem' : '0',
        }),
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          style.imageBox,
          css({ backgroundColor: data?.imageUrl.length ?? 0 > 6 ? 'blue.10' : 'white' }),
          css({ height: height ? ' 13rem' : '12rem' }),
        )}
      >
        {!isProduct && (
          <div className={style.status}>
            <StatusTag
              daysLeft={Number(data?.status)}
              isCompleted={data?.status === '완료'}
              isFloating
            />
          </div>
        )}
        {data?.status === '완료' && <div className={style.blur} />}
        <div style={{ width: '100%', height: '100%' }}>
          {!data?.imageUrl && !product?.imageUrl ? (
            <GiftIcon />
          ) : (
            <div className={style.imageWrapper}>
              <Image
                src={isProduct ? product!.imageUrl : data!.imageUrl}
                alt="펀딩 이미지"
                fill
                objectFit="cover"
              />
            </div>
          )}
        </div>
      </div>
      {isProduct ? (
        <div className={cx(style.infoBox, css({ padding: '1.2rem 0.8rem', marginTop: 0 }))}>
          <div className={cx(style.title, css({ marginTop: 0 }))}>{product?.title as string}</div>
          <div className={cx(style.percent, css({ marginBottom: '0.6rem' }))}>
            {product?.price?.toLocaleString()}원
          </div>
          <Button color="white" className={style.fundProductBtn} textStyle="CTAButton">
            이 상품 등록하기
          </Button>
        </div>
      ) : (
        <div className={cx(style.infoBox, css({ height: height ? '8rem' : '7.1rem' }))}>
          <ProgressBar
            noMargin
            progressBarWidth={css({ width: PROGRESS_BAR_BASE_WIDTH * 0.1 + 'rem' })}
            width={
              data!.percent >= 100
                ? '14.1rem'
                : (PROGRESS_BAR_BASE_WIDTH * data!.percent!) / 1000 + 'rem'
            }
          />
          <div className={style.title}>{data?.title}</div>
          <div className={style.percent}>{data?.percent}% 달성</div>
        </div>
      )}
    </div>
  );
}
