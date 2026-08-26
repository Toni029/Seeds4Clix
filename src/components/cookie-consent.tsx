"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("seeds4clix-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const respond = (value: "accepted" | "declined") => {
    window.localStorage.setItem("seeds4clix-cookie-consent", value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p>
        We use cookies to understand how visitors use Seeds4Clix and to improve the site. Read our{" "}
        <Link href="/about">privacy approach</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={() => respond("declined")} className="cookie-decline">
          Decline
        </button>
        <button type="button" onClick={() => respond("accepted")} className="cookie-accept">
          Accept all
        </button>
      </div>
    </div>
  );
}
