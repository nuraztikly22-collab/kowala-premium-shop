import { createFileRoute, Link } from "@tanstack/react-router";
import { COLORS } from "@/lib/brand";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/how-to-use")({
  head: () => ({
    meta: [
      { title: "How To Use Your Kowala — A Simple Guide" },
      { name: "description", content: "A step-by-step guide to wearing your Kowala sling carrier comfortably and safely." },
      { property: "og:title", content: "How To Use Kowala" },
      { property: "og:description", content: "Step-by-step. Simple. Premium." },
      { property: "og:image", content: COLORS[2].images[0] },
    ],
  }),
  component: HowToUse,
});

const STEPS = [
  { n: "01", t: "Slip the sling over your shoulder", d: "Wear the sling diagonally across your body with the padded section sitting comfortably on your shoulder.", img: COLORS[3].images[1] },
  { n: "02", t: "Adjust the buckle", d: "Use the smooth buckle to set the height. Your baby should sit high enough that you can kiss the top of their head.", img: COLORS[0].images[1] },
  { n: "03", t: "Place baby into the pouch", d: "Gently lower baby into the pouch, supporting head and neck. Check legs are in a natural seated position.", img: COLORS[1].images[1] },
  { n: "04", t: "Settle and enjoy", d: "Hold baby against your chest, run a hand over their back and breathe out. You're set.", img: COLORS[2].images[0] },
];

function HowToUse() {
  return (
    <>
      <section className="bg-beige">
        <div className="container-kw py-20 md:py-28 text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">How To Use</p>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight">A few simple steps. Then your day continues.</h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-kw max-w-5xl space-y-16 md:space-y-24">
          {STEPS.map((s, i) => (
            <div key={s.n} className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-beige">
                <img src={s.img} alt={s.t} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-sm tracking-[0.2em] text-primary font-medium">STEP {s.n}</p>
                <h2 className="text-3xl md:text-4xl font-medium mt-3 leading-tight">{s.t}</h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-kw max-w-3xl">
          <div className="bg-white rounded-3xl p-7 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-medium">Safety reminders</h2>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Always support baby's head and neck when placing them in.</li>
              <li>• Make sure baby's face is visible and unobstructed at all times.</li>
              <li>• Check the buckle is securely fastened before lifting your hands.</li>
              <li>• Keep baby's chin off their chest, with a clear airway.</li>
              <li>• Inspect the carrier before each use for wear or damage.</li>
            </ul>
          </div>
          <div className="text-center mt-10">
            <Link to="/product" className="btn-primary inline-flex">Shop the Carrier</Link>
          </div>
        </div>
      </section>
    </>
  );
}
