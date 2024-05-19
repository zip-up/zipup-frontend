import Modal from '@components/common/Modal';
import DaumPostcode from 'react-daum-postcode';

interface AddressModalProps {
  onSetAddress: (address: string) => void;
  onClose: () => void;
}

export default function AddressModal({ onSetAddress, onClose }: AddressModalProps) {
  const handleComplete = (data: { address: string }) => {
    onSetAddress(data.address);
    onClose();
  };
  const DEFAULT_HEIGHT = 577;

  return (
    <Modal height={DEFAULT_HEIGHT} onClose={onClose}>
      <DaumPostcode style={{ height: DEFAULT_HEIGHT - 30 }} onComplete={handleComplete} />
    </Modal>
  );
}
