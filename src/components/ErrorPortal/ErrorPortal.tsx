import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import './ErrorPortal.scss';

type PortalProps = {
  children: ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const portalRoot = document.getElementById("portal") as HTMLElement;
  return createPortal(children, portalRoot);
};

type Props = {
  message: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorPortal: React.FC<Props> = ({ message, setError }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setError('');
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  const onButtonClick = () => {
    setIsOpen(false);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="portal">
        <div className="portal_block">
          <h3 className="portal_block-header">Error!</h3>
          <button className="portal_block-button" onClick={onButtonClick}>
            <FaWindowClose />
          </button>
        </div>

        <p className="portal_message">{message}</p>

        <div className="portal_timeline"></div>
      </div>
    </Portal>
  );
};
