"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { A11Y_OPTIONS, type A11ySettings, DEFAULT_SETTINGS, applySettings, parseSettings, readSettingsRaw, saveSettings, subscribeSettings } from "@/lib/a11y";

function useA11ySettings() {
  const raw = useSyncExternalStore(subscribeSettings, readSettingsRaw, () => "{}");
  const settings = useMemo(() => parseSettings(raw), [raw]);

  // Applies the saved choice on page load
  useEffect(() => applySettings(settings), [settings]);

  // Merges onto the latest saved value, so quick consecutive toggles never undo each other
  return [settings, (change: Partial<A11ySettings>) => saveSettings({ ...parseSettings(readSettingsRaw()), ...change })] as const;
}

/** First stops for keyboard users; visible only on focus. */
export function SkipLinks() {
  const [settings, update] = useA11ySettings();

  return (
    <div className="skip-links">
      <a href="#top" className="skip-link">דילוג לתוכן</a>
      <button type="button" className="skip-link" onClick={() => update({ still: !settings.still })}>
        {settings.still ? "הפעלת אנימציות" : "עצירת אנימציות"}
      </button>
    </div>
  );
}

/** Footer button that opens the accessibility adjustments panel. */
export function A11yMenu() {
  const [settings, update] = useA11ySettings();
  const ref = useRef<HTMLDialogElement>(null);
  const anyOn = A11Y_OPTIONS.some(({ key }) => settings[key]);

  return (
    <>
      <button type="button" className="footer-link" onClick={() => ref.current?.showModal()}>התאמות נגישות</button>
      <dialog
        ref={ref}
        className="legal-dialog"
        aria-label="התאמות נגישות"
        onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
      >
        <div className="legal-dialog-head">
          <h2>התאמות נגישות</h2>
          <button type="button" className="legal-close" onClick={() => ref.current?.close()} aria-label="סגירה">
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <div className="a11y-options">
          {A11Y_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className="a11y-option"
              aria-pressed={settings[key]}
              onClick={() => update({ [key]: !settings[key] })}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="a11y-reset"
            disabled={!anyOn}
            onClick={() => update(DEFAULT_SETTINGS)}
          >
            איפוס הגדרות
          </button>
        </div>
      </dialog>
    </>
  );
}
