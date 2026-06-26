import { createFileRoute } from "@tanstack/react-router";
import { Package, Truck, MapPin } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Kowala" },
      { name: "description", content: "Processing 1–3 business days. Delivery 8–14 business days. Shipping across South Africa with tracking." },
      { property: "og:title", content: "Kowala Shipping" },
      { property: "og:description", content: "Fast, tracked delivery across South Africa." },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <section className="section-pad">
      <div className="container-kw max-w-3xl">
        <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">Shipping</p>
        <h1 className="text-4xl md:text-5xl font-medium">Shipping policy</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">We ship Kowala carriers across South Africa with full tracking from the moment your order leaves us.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { Icon: Package, t: "Processing", d: "1–3 business days" },
            { Icon: Truck, t: "Delivery", d: "8–14 business days" },
            { Icon: MapPin, t: "Coverage", d: "All of South Africa" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="bg-beige rounded-3xl p-6">
              <Icon className="w-6 h-6 text-primary" />
              <p className="mt-4 font-medium">{t}</p>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>

        <div className="prose mt-12 space-y-5 text-muted-foreground leading-relaxed">
          <p>Every order is carefully prepared and dispatched from our local team. Once it leaves us you'll receive an email with your tracking link so you can follow your parcel until it lands at your door.</p>
          <p>Delivery timeframes are estimates based on courier performance. Remote or outlying areas may take slightly longer.</p>
          <p>If anything looks off with your order, please reach us at <a href="mailto:hello@kowala.co.za" className="text-primary underline">hello@kowala.co.za</a> and we'll sort it out within 24 hours.</p>
        </div>
      </div>
    </section>
  );
}
