import { css } from 'styled-system/css';
import Image from 'next/image';
interface ProfileProps {
  src: string;
  width?: string;
  height?: string;
  isFull?: boolean;
}

export default function Profile({ src, width, height, isFull = false }: ProfileProps) {
  const size = isFull || !width ? { width: '100%', height: '100%' } : { width, height };

  return (
    <div className={css(size, { overflow: 'hidden' })}>
      <Image
        src={src}
        alt="프로필 이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          borderRadius: isFull ? '100%' : '5rem',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
