import { CSSProperties } from 'react';
import Image from 'next/image';
import GiftIcon from '@assets/images/gift-images.svg';
import Button from '@components/common/Button';
import ProgressBar from '@components/common/ProgressBar';
import StatusTag from '@components/common/StatusTag';
import DimOverlay from '@components/DimOverlay';
import { StaticItems } from '@hooks/queries/useFundingList';
import { FundingInfo } from '@typings/funding';
import { getFundingStatus } from '@utils/getStatus';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

import * as style from './styles';

interface CardProps {
  data?: FundingInfo;
  onClick: () => void;
  width?: string;
  height?: string;
  styles?: CSSProperties;
  isProduct?: boolean;
  product?: StaticItems;
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
      onClick={() => !isProduct && onClick()}
    >
      <div
        className={cx(
          style.imageBox,
          css({ backgroundColor: data?.imageUrl?.length ?? 0 > 6 ? 'blue.10' : 'white' }),
          css({ height: height ? '13rem' : '12rem' }),
        )}
      >
        {data && (
          <StatusTag
            daysLeft={data.dday}
            status={getFundingStatus(data.percent, data.dday)}
            isFloating
          />
        )}
        <div
          className={flex({
            width: '100%',
            height: '100%',
          })}
        >
          {data ? (
            <DimOverlay isActive={getFundingStatus(data.percent, data.dday) !== 'IN_PROGRESS'}>
              {!data.imageUrl && !product?.imageUrl ? (
                <div className={css({ marginLeft: '-0.8rem' })}>
                  <GiftIcon />
                </div>
              ) : (
                <div className={style.imageWrapper}>
                  <Image
                    src={data.imageUrl}
                    style={{ width: '100%', height: '100%' }}
                    alt="펀딩 이미지"
                    fill
                    objectFit="cover"
                  />
                </div>
              )}
            </DimOverlay>
          ) : (
            <div className={style.imageWrapper}>
              <Image
                src={product!.imageUrl}
                style={{ width: '100%', height: '100%' }}
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
          <div className={style.title}>{product?.title as string}</div>
          <div className={cx(style.percent, css({ marginBottom: '0.6rem' }))}>
            {product?.goalPrice?.toLocaleString()}원
          </div>
          <Button
            color="white"
            className={style.fundProductBtn}
            style={{
              height: '3rem',
              fontSize: '1.2rem',
              fontWeight: '400',
              borderRadius: '0.6rem',
            }}
            onClick={onClick}
          >
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
          <div className={cx(style.title, css({ marginTop: '0.8rem' }))}>{data?.title}</div>
          <div className={style.percent}>{data?.percent}% 달성</div>
        </div>
      )}
    </div>
  );
}
