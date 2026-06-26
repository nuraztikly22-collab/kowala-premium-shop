import { createFileRoute, Link } from "@tanstack/react-router";
import { COLORS } from "@/lib/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kowala — Proudly South African" },
      { name: "description", content: "Kowala is a South African baby brand built to make life lighter for parents." },
      { property: "og:title", content: "About Kowala" },
      { property: "og:description", content: "A South African brand built to support parents." },
      { property: "og:image", content: COLORS[0].images[0] },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-beige">
        <div className="container-kw py-20 md:py-28 text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight">Built for the mothers we love.</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Kowala started with a simple wish — to make everyday motherhood a little lighter.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-kw grid md:grid-cols-2 gap-12 items-center max-w-5xl">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden">
            <img src={COLORS[0].images[0]} alt="Mother and baby" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>We're a proudly South African brand, designed for the parents who do so much and rarely get to put their baby down. The Kowala Sling Carrier was built around the way real motherhood actually feels — busy, beautiful, and constant.</p>
            <p>Every detail is considered: soft fabric, padded support, a smooth one-handed buckle. Premium materials, calm design, made to last.</p>
            <p className="text-foreground font-medium">Locally rooted. Built for families across South Africa.</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-kw max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-medium">What we believe</h2>
          <div className="grid gap-5 md:grid-cols-3 mt-12 text-left">
            {[
              { t: "Calm design", d: "Less noise. More breathing space." },
              { t: "Premium quality", d: "Materials that hold up to real motherhood." },
              { t: "Support for families", d: "Designed to make every day easier." },
            ].map((v) => (
              <div key={v.t} className="bg-white rounded-3xl p-7">
                <p className="font-medium text-lg">{v.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
          <Link to="/product" className="btn-primary mt-12 inline-flex">Shop Kowala</Link>
        </div>
      </section>
    </>
  );
}
