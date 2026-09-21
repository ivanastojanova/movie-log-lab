import { useRef } from "react";
import { useModal } from "../../hooks/useModal";

export default function Modal({ children, onClose, isActive = true }) {
  const contentRef = useRef(null);

  useModal(contentRef, onClose, isActive);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
