import { Icon } from "@/components/Icon";
import { FaqItem } from "@/lib/types";

// Native <details>/<summary>: every answer is in the server-rendered HTML
// (crawlers and answer engines read closed answers too), it works without
// JavaScript, and it stays keyboard-accessible. The first item starts open.
export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {faqs.map((faq, index) => (
        <details key={`faq-${index}-${faq.question}`} className="group" open={index === 0}>
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-sm font-medium text-foreground">{faq.question}</h3>
            <Icon name="chevron" className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-4 text-sm leading-relaxed text-muted">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
