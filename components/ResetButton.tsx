"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";

interface ResetButtonProps {
  onConfirm: () => void;
}

export function ResetButton({ onConfirm }: ResetButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={() => setOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M4 4v6h6M20 20v-6h-6M5.5 15a7.5 7.5 0 0 0 13.1 2.4M18.5 9A7.5 7.5 0 0 0 5.4 6.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Reset
      </button>

      <Dialog
        open={open}
        tone="danger"
        title="Test ma'lumotlarini tozalashni xohlaysizmi?"
        onCancel={() => setOpen(false)}
        actions={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)} autoFocus>
              Bekor qilish
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Reset
            </button>
          </>
        }
      >
        <p>Natija o‘chiriladi va yangi o‘quvchi uchun boshlang‘ich sahifa ochiladi.</p>
      </Dialog>
    </>
  );
}
