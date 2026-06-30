import { createFileRoute, Link } from "@tanstack/react-router";
import { COLORS, HERO_IMAGE } from "@/lib/brand";
import { Star, Heart, Hand, Droplet, Settings2, Baby, Smile, ShieldCheck, Truck, Award, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kowala — Carry Your Baby. Free Your Hands." },
      { name: "description", content: "Premium baby sling carrier designed for South African mothers. Comfort, support and freedom — every day." },
      { property: "og:title", content: "Kowala — Premium Baby Sling Carrier" },
      { property: "og:description", content: "Carry your baby comfortably and keep your hands free." },
      { property: "og:image", content: HERO_IMAGE },
    ],
  }),
  component: Home,
});

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-primary">
      {[0,1,2,3,4].map((i) => <Star key={i} style={{ width: size, height: size }} className="fill-primary" />)}
    </div>
  );
}

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-beige">
        <div className="container-kw grid gap-10 md:grid-cols-2 items-center pt-10 pb-16 md:py-24">
          <div className="order-2 md:order-1">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-5">Proudly South African</p>
            <h1 className="text-4xl md:text-6xl leading-[1.05] font-medium">
              Carry your baby<br/>comfortably.<br/>
              <span className="text-primary">Keep your hands free.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              The Kowala Sling Carrier is designed to support you and your baby through every quiet, busy, beautiful moment of the day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/product" className="btn-primary">Shop Now</Link>
              <Link to="/how-to-use" className="btn-outline">How it works</Link>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <Stars />
              <span className="text-sm text-muted-foreground">Trusted by South African parents</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-3xl bg-white">
              <img src={HERO_IMAGE} alt="Mother carrying baby in Kowala sling" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section-pad">
        <div className="container-kw">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-medium">Motherhood is heavy enough.</h2>
            <p className="mt-4 text-muted-foreground">Holding your baby shouldn't add to the load.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { t: "Sore arms", d: "Hours of carrying without support." },
              { t: "Back pain", d: "Uneven weight on one hip." },
              { t: "No free hands", d: "Impossible to make tea, work, or pack a bag." },
              { t: "Fussy baby", d: "Constantly needing to be close to you." },
              { t: "Constant lifting", d: "Up, down, up, down — every few minutes." },
              { t: "Hip discomfort", d: "Carrying baby on one side strains everything." },
            ].map((it) => (
              <div key={it.t} className="bg-surface rounded-3xl p-6 md:p-7">
                <p className="font-medium">{it.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-pad bg-beige">
        <div className="container-kw">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">Designed with love</p>
            <h2 className="text-3xl md:text-4xl font-medium">Built for real, everyday motherhood.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { Icon: Hand, t: "Hands-free comfort", d: "Cook, shop, work — without ever putting baby down." },
              { Icon: Heart, t: "Even weight distribution", d: "Designed to take the load off your shoulders and back." },
              { Icon: Droplet, t: "Machine washable", d: "Made for everyday life, and the little messes that come with it." },
              { Icon: Settings2, t: "Adjustable fit", d: "One smooth buckle to fit every parent perfectly." },
              { Icon: Baby, t: "Comfort for baby", d: "Soft, breathable fabric that holds baby close." },
              { Icon: Smile, t: "Comfort for parents", d: "Padded straps that disappear into your day." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-white rounded-3xl p-7">
                <div className="w-12 h-12 rounded-2xl bg-beige flex items-center justify-center mb-5 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-medium text-lg">{t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="section-pad">
        <div className="container-kw grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-beige">
            <img src={COLORS[2].images[0]} alt="Mother and baby together" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">Closer, every day</p>
            <h2 className="text-3xl md:text-4xl font-medium leading-tight">The quiet moments matter most.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              There's nothing like the soft weight of your baby resting against your chest. Kowala was designed to protect that closeness — without the strain.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From morning walks to grocery runs, our sling lets you move through your day with your hands free and your baby close.
            </p>
            <Link to="/product" className="btn-primary mt-8 inline-flex">Shop the Carrier</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad bg-surface">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-medium">How it works</h2>
            <p className="mt-4 text-muted-foreground">Three simple steps. Then your hands are free.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Wear", d: "Slip the sling over your shoulder." },
              { n: "02", t: "Adjust", d: "Use the smooth buckle to find your perfect fit." },
              { n: "03", t: "Enjoy", d: "Carry your baby close, hands-free." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-8 text-center">
                <p className="text-sm tracking-[0.2em] text-primary font-medium">{s.n}</p>
                <p className="mt-4 text-xl font-medium">{s.t}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewWall
        title="Loved by mothers across South Africa."
        subtitle="Real photos and stories from Kowala families. Yours could be next."
      />


      {/* TRUST */}
      <section className="py-10 md:py-14 bg-beige">
        <div className="container-kw grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { Icon: ShieldCheck, t: "Secure Checkout" },
            { Icon: Truck, t: "Fast SA Delivery" },
            { Icon: Award, t: "Premium Quality" },
            { Icon: MessageCircle, t: "Real SA Support" },
          ].map(({ Icon, t }) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <Icon className="w-6 h-6 text-primary" />
              <p className="text-xs md:text-sm font-medium">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section-pad">
        <div className="container-kw max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-10">Questions, answered.</h2>
          <div className="space-y-3">
            {[
              { q: "Can I machine wash it?", a: "Yes — Kowala is fully machine washable on a gentle cycle." },
              { q: "Is it adjustable?", a: "One smooth buckle adjusts the carrier to fit every parent." },
              { q: "From what age can I use it?", a: "Suitable from the newborn stage through to toddlerhood." },
            ].map((f) => (
              <details key={f.q} className="group bg-surface rounded-2xl p-5 md:p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
                  {f.q}
                  <span className="ml-4 text-primary group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="btn-outline">See all FAQs</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCta />
    </>
  );
}

function FinalCta() {
  const [i] = useState(0);
  return (
    <section className="px-5 md:px-8 pb-20">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
        <img src={COLORS[i].images[0]} alt="Kowala carrier" className="w-full h-[480px] md:h-[560px] object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-8 md:p-14">
          <h2 className="text-3xl md:text-5xl font-medium max-w-2xl leading-tight">The carrier that gives your hands back.</h2>
          <Link to="/product" className="mt-7 inline-flex btn-primary bg-white text-foreground hover:bg-white/90">Shop Kowala</Link>
        </div>
      </div>
    </section>
  );
}
