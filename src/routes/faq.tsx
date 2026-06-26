import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Kowala" },
      { name: "description", content: "Answers about the Kowala sling carrier, shipping, returns, comfort and use." },
      { property: "og:title", content: "Kowala FAQ" },
      { property: "og:description", content: "Everything you need to know about Kowala." },
    ],
  }),
  component: FAQ,
});

const GROUPS = [
  { title: "Product", items: [
    { q: "From what age can I use the Kowala?", a: "Suitable from the newborn stage through to toddlerhood." },
    { q: "Is it adjustable?", a: "Yes — one smooth buckle adjusts to fit every parent." },
    { q: "Can both parents wear it?", a: "Absolutely. Kowala is designed to fit all body shapes comfortably." },
    { q: "What materials is it made from?", a: "Soft, breathable premium fabrics with padded shoulder support." },
  ]},
  { title: "Care", items: [
    { q: "Can I machine wash it?", a: "Yes. Wash on a gentle cycle in cold water and air dry." },
    { q: "How do I store it?", a: "Fold and store anywhere — it fits inside most nappy bags." },
  ]},
  { title: "Shipping", items: [
    { q: "How long does processing take?", a: "1–3 business days from when you place your order." },
    { q: "How long is delivery?", a: "8–14 business days after processing, anywhere in South Africa." },
    { q: "Do you offer tracking?", a: "Yes. You'll receive a tracking link via email once your order ships." },
  ]},
  { title: "Returns", items: [
    { q: "What's your return policy?", a: "14 days from when you receive your order. Item must be unused and in original condition." },
    { q: "How do I start a return?", a: "Email hello@kowala.co.za and our team will guide you through every step." },
  ]},
];

function FAQ() {
  return (
    <section className="section-pad">
      <div className="container-kw max-w-3xl">
        <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4 text-center">Help Centre</p>
        <h1 className="text-4xl md:text-5xl font-medium text-center">Frequently asked questions</h1>
        <div className="mt-14 space-y-10">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="text-xl font-medium mb-4">{g.title}</h2>
              <div className="space-y-3">
                {g.items.map((f) => (
                  <details key={f.q} className="group bg-surface rounded-2xl p-5 md:p-6">
                    <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
                      {f.q}
                      <span className="ml-4 text-primary group-open:rotate-45 transition">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
