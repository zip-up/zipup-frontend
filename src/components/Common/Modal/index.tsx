import Dimmer from "@/components/Common/Dimmer";
import Portal from "@/components/Common/Portal";
import Button from "@/components/Common/Button";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Dialog = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const ModalWrapper = ({ children, isOpen, onCloseModal }: ModalProps) => {
  if (!isOpen || typeof window == "undefined") return null;

  const modalRootElement = document.getElementById("modal-root") as Element;

  return (
    <Portal targetElement={modalRootElement}>
      <Dimmer onCloseModal={onCloseModal} />
      <section className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button onClick={onCloseModal}>X</Button>
        {children}
      </section>
    </Portal>
  );
};

export const Modal = Object.assign(ModalWrapper, {
  Header,
  Dialog,
});
