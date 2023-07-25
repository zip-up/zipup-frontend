import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  targetElement: Element | DocumentFragment;
}

const Portal = ({ children, targetElement }: PortalProps) => {
  return createPortal(children, targetElement);
};

export default Portal;
