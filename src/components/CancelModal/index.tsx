import CancelIcon from '@assets/icons/delete.svg';
import Button from '@components/common/Button';
import ModalWithIcon from '@components/modals/ModalWithIcon';
import { css } from 'styled-system/css';

interface CancelModalProps {
  onClose: () => void;
  onBack: () => void;
  condition?: 'create' | 'update';
}

export default function CancelModal({ onClose, onBack, condition }: CancelModalProps) {
  return (
    <ModalWithIcon
      onClose={onClose}
      title={condition === 'create' ? '펀딩 등록 취소할까요?' : '펀딩 수정 취소할까요?'}
      subtitle="작성한 내용은 저장되지 않아요."
      icon={<CancelIcon />}
      buttonComponent={
        <div className={style.contents}>
          <Button color="primary" style={{ width: '10.9rem' }} onClick={onBack}>
            취소하기
          </Button>
          <Button style={{ width: '16.8rem' }} onClick={onClose}>
            계속 작성하기
          </Button>
        </div>
      }
    />
  );
}

const style = {
  contents: css({
    display: 'flex',
    gap: '0.8rem',
    width: '100%',
    marginTop: '3.1rem',
    justifyContent: 'center',
  }),
};
