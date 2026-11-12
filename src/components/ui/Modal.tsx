"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useFocusTrap } from "./useFocusTrap";

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(boxRef, open, onClose);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(59,24,32,.45)] p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative max-h-[86vh] w-full max-w-[680px] overflow-auto rounded-modal bg-white p-7"
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 h-[38px] w-[38px] rounded-full border-0 bg-blush-soft text-xl font-extrabold text-ruby"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
