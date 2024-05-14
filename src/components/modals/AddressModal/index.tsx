import Modal from '@components/common/Modal';
import DaumPostcode from 'react-daum-postcode';

interface AddressModalProps {
  onSetAddress: (address: string) => void;
  onClose: () => void;
}

export default function AddressModal({ onSetAddress, onClose }: AddressModalProps) {
  const handleComplete = data => {
    onSetAddress(data.address);
    onClose();
  };
  const height = 577;

  return (
    <Modal height={577} onClose={onClose}>
      <DaumPostcode style={{ height: height - 30 }} onComplete={handleComplete} />
    </Modal>
  );
}
