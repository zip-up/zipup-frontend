import Button from '@components/common/Button';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

interface ModalActionButtonsProps {
  action?: 'proceed' | 'submit';
  closeBtnText?: string;
  actionBtnText: string;
  disabled?: boolean;
  handleCloseModal: () => void;
  handleAction?: () => void;
}

export default function ModalActionButtons({
  action = 'proceed',
  closeBtnText = '닫기',
  actionBtnText,
  disabled = false,
  handleCloseModal,
  handleAction,
}: ModalActionButtonsProps) {
  return (
    <div className={flex({ justifyContent: 'space-between' })}>
      <Button color="primary" className={css({ width: '11rem' })} onClick={handleCloseModal}>
        {closeBtnText}
      </Button>
      {action === 'proceed' ? (
        <Button onClick={handleAction} className={css({ width: '16.8rem' })}>
          {actionBtnText}
        </Button>
      ) : (
        <Button type="submit" className={css({ width: '16.8rem' })} disabled={disabled}>
          {actionBtnText}
        </Button>
      )}
    </div>
  );
}
