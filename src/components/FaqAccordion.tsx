"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { FaqItem } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={`faq-${index}-${faq.question}`}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-foreground">{faq.question}</span>
              <Icon
                name="chevron"
                className={`w-4 h-4 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-muted">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
