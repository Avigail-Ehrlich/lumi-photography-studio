"use client";

import { useRef } from "react";
import { X } from "lucide-react";

// Footer link that opens its text in a modal on the same page (no separate route)
export function LegalDialog({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className="footer-link" onClick={() => ref.current?.showModal()}>{label}</button>
      <dialog
        ref={ref}
        className="legal-dialog"
        aria-label={title}
        onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
      >
        <div className="legal-dialog-head">
          <h2>{title}</h2>
          <button type="button" className="legal-close" onClick={() => ref.current?.close()} aria-label="סגירה">
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <div className="legal">{children}</div>
      </dialog>
    </>
  );
}
