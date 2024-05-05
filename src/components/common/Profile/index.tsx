import Image from 'next/image';
import { css } from 'styled-system/css';

interface ProfileProps {
  src: string;
  size: 'sm' | 'full';
  isFull?: boolean;
}

export default function Profile({ src, size, isFull = false }: ProfileProps) {
  const ProfileSize = {
    sm: {
      w: '5.6rem',
      h: '5.6rem',
    },
    full: {
      w: '100%',
      h: '100%',
    },
  } as const;

  return (
    <div className={css({ ...ProfileSize[size], overflow: 'hidden' })}>
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
