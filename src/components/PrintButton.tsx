"use client";

import { Printer } from "lucide-react";
import { buttonStyles } from "./ui";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={buttonStyles.secondary}>
      <Printer size={16} aria-hidden="true" />
      Print
    </button>
  );
}
