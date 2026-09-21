import { useEffect } from "react";

export function useModal(ref, onClose, isActive) {
  useEffect(() => {
    if (!isActive) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    function handleMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref, onClose, isActive]);
}
