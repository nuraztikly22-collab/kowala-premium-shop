import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns Policy — Kowala" },
      { name: "description", content: "14-day return policy from receipt of your Kowala order. Simple, fair, premium." },
      { property: "og:title", content: "Kowala Returns" },
      { property: "og:description", content: "14 days to return, no fuss." },
    ],
  }),
  component: Returns,
});

function Returns() {
  return (
    <section className="section-pad">
      <div className="container-kw max-w-3xl">
        <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">Returns</p>
        <h1 className="text-4xl md:text-5xl font-medium">A simple, 14-day return policy.</h1>
        <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
          <p>If your Kowala isn't quite right, you have 14 days from when you receive your order to return it for a refund or exchange.</p>

          <div className="bg-beige rounded-3xl p-7 text-foreground">
            <h2 className="font-medium text-lg mb-3">Conditions</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>Item must be unused and in original condition.</li>
              <li>Original tags and packaging must be intact.</li>
              <li>Return window begins the day you receive your parcel.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-lg text-foreground mb-3">How to return</h2>
            <p>Email our team at <a href="mailto:hello@kowala.co.za" className="text-primary underline">hello@kowala.co.za</a> with your order number and we'll guide you through every step. Refunds are processed within 5–10 business days of receiving your returned item.</p>
          </div>

          <p className="text-sm">For any questions, please don't hesitate to reach out — we're real people on the other side.</p>
        </div>
      </div>
    </section>
  );
}
