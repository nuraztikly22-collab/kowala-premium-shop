import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { COLORS, type ColorKey } from "@/lib/brand";
import { formatZAR, useCart } from "@/lib/cart";
import { Star, ShieldCheck, Truck, Award, MessageCircle, ChevronLeft, ChevronRight, Check, Minus, Plus, Heart, Hand, Droplet, Settings2, Baby, Smile, Plane, Lock, Feather, Activity } from "lucide-react";
import { ReviewWall } from "@/components/ReviewWall";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Kowala Sling Carrier — Premium Baby Carrier" },
      { name: "description", content: "Soft, supportive, hands-free carrier. Available in four beautiful colours. Designed for South African parents." },
      { property: "og:title", content: "Kowala Sling Carrier" },
      { property: "og:description", content: "Soft, supportive, hands-free baby carrier." },
      { property: "og:image", content: COLORS[0].images[0] },
    ],
  }),
  component: Product,
});

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-primary">
      {[0,1,2,3,4].map((i) => <Star key={i} style={{ width: size, height: size }} className="fill-primary" />)}
    </div>
  );
}

function Product() {
  const [colorKey, setColorKey] = useState<ColorKey>("botanical");
  const [color2Key, setColor2Key] = useState<ColorKey>("houndstooth");
  const [bundle, setBundle] = useState<1 | 2>(2);
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();

  const color = COLORS.find((c) => c.key === colorKey)!;
  const color2 = COLORS.find((c) => c.key === color2Key)!;
  const price = bundle === 2 ? 899 : 499;

  useEffect(() => { setSlide(0); }, [colorKey]);

  useEffect(() => {
    const onScroll = () => {
      if (!buyRef.current) return;
      const rect = buyRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = () => {
    add({
      id: bundle === 2 ? `bundle-${colorKey}-${color2Key}` : `single-${colorKey}`,
      color: colorKey,
      colorName: color.name,
      color2: bundle === 2 ? color2Key : undefined,
      color2Name: bundle === 2 ? color2.name : undefined,
      bundle,
      qty,
      price,
      image: color.images[0],
      image2: bundle === 2 ? color2.images[0] : undefined,
    });
  };

  return (
    <>
      <section className="pt-6 md:pt-10">
        <div className="container-kw grid md:grid-cols-2 gap-8 md:gap-14">
          {/* Gallery */}
          <Gallery images={color.images} slide={slide} setSlide={setSlide} />

          {/* Buy box */}
          <div ref={buyRef} className="md:sticky md:top-24 md:self-start">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">Kowala</p>
            <h1 className="text-3xl md:text-4xl font-medium mt-2">Kowala Sling Carrier</h1>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Premium baby sling carrier · Proudly South African</span>
            </div>
            <p className="mt-5 text-muted-foreground leading-relaxed text-sm md:text-base">
              The soft, structured sling that lets you carry your baby close — and carry on with your day.
            </p>

            {/* Bundle */}
            <div className="mt-7">
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3">Choose your bundle</p>
              <div className="grid grid-cols-2 gap-3">
                <BundleCard active={bundle === 1} onClick={() => setBundle(1)} label="1 Sling" sub="Single" price={499} />
                <BundleCard active={bundle === 2} onClick={() => setBundle(2)} label="2 Slings" sub="Most Popular" price={899} compareAt={998} highlight />
              </div>
              <p className="text-xs text-muted-foreground mt-3">Tip: add any 2 singles to your cart and the bundle price applies automatically.</p>
            </div>

            {/* Colour */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">{bundle === 2 ? "First colour" : "Colour"}</p>
                <p className="text-sm">{color.name}</p>
              </div>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setColorKey(c.key)}
                    aria-label={c.name}
                    className={`relative w-12 h-12 rounded-full transition ring-offset-2 ${colorKey === c.key ? "ring-2 ring-primary" : "ring-1 ring-border"}`}
                    style={{ backgroundColor: c.swatch }}
                  >
                    {colorKey === c.key && <Check className="absolute inset-0 m-auto w-4 h-4 text-white mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </div>

            {bundle === 2 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Second colour</p>
                  <p className="text-sm">{color2.name}</p>
                </div>
                <div className="flex gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setColor2Key(c.key)}
                      aria-label={c.name}
                      className={`relative w-12 h-12 rounded-full transition ring-offset-2 ${color2Key === c.key ? "ring-2 ring-primary" : "ring-1 ring-border"}`}
                      style={{ backgroundColor: c.swatch }}
                    >
                      {color2Key === c.key && <Check className="absolute inset-0 m-auto w-4 h-4 text-white mix-blend-difference" />}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Mix &amp; match — pick two different colours or the same one twice.</p>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-7">
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <button onClick={handleAdd} className="btn-primary w-full">Add to Cart — {formatZAR(price * qty)}</button>
              <button onClick={() => { handleAdd(); }} className="btn-outline w-full">Buy Now</button>
            </div>

            {/* Shipping note */}
            <div className="mt-5 bg-beige rounded-2xl p-5 text-sm">
              <p className="font-medium mb-1">Shipping across South Africa</p>
              <p className="text-muted-foreground">Processing: 1–3 business days · Delivery: 8–14 business days after processing.</p>
            </div>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-4 gap-2 text-center">
              {[
                { Icon: ShieldCheck, t: "Secure" },
                { Icon: Truck, t: "SA Delivery" },
                { Icon: Award, t: "Premium" },
                { Icon: MessageCircle, t: "Support" },
              ].map(({ Icon, t }) => (
                <div key={t} className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-surface">
                  <Icon className="w-5 h-5 text-primary" />
                  <p className="text-[11px] font-medium">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="section-pad">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium">Designed around real motherhood.</h2>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              { Icon: Heart, t: "Healthy hip positioning" },
              { Icon: Activity, t: "Distributes weight evenly" },
              { Icon: Baby, t: "Comfortable for baby" },
              { Icon: Smile, t: "Comfortable for parent" },
              { Icon: Settings2, t: "Adjustable sizing" },
              { Icon: Droplet, t: "Machine washable" },
              { Icon: Feather, t: "Lightweight" },
              { Icon: Plane, t: "Travel friendly" },
              { Icon: Hand, t: "Hands free" },
              { Icon: Lock, t: "Secure fit" },
            ].map(({ Icon, t }) => (
              <div key={t} className="bg-surface rounded-3xl p-5 flex flex-col items-start">
                <Icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-sm font-medium leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="section-pad bg-beige">
        <div className="container-kw grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img src={COLORS[3].images[0]} alt="Kowala in use" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">More than a carrier</p>
            <h2 className="text-3xl md:text-4xl font-medium leading-tight">A little more freedom. A little more closeness.</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>The Kowala Sling is built to make everyday motherhood lighter. Soft, structured fabric supports your baby's body while padded straps protect your shoulders and back.</p>
              <p>Slip it on and on you go — to the school run, the shops, the kitchen. Your baby stays close, calm and connected, while you stay in motion.</p>
              <p>Suitable from the newborn stage and easy enough to put on with one hand, it's the carrier that fits into your life — not the other way around.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why parents love it */}
      <section className="section-pad">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium">Why parents love it</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { t: "Comfortable all day", d: "Padded shoulder support that disappears into your routine." },
              { t: "Keeps baby close", d: "Soft fabric cradles your little one against your chest." },
              { t: "Easy to travel with", d: "Folds small. Fits in any nappy bag." },
              { t: "Easy to wash", d: "Machine washable, gentle cycle. Ready for tomorrow." },
              { t: "Premium materials", d: "Soft to the touch, built to last." },
              { t: "Minimal effort", d: "One smooth buckle. No complicated wrapping." },
            ].map((c) => (
              <div key={c.t} className="bg-beige rounded-3xl p-7">
                <p className="font-medium text-lg">{c.t}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="section-pad bg-surface">
        <div className="container-kw">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-12">How to wear your Kowala</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Slip it on", d: "Wear the sling diagonally across your body, padded side on your shoulder." },
              { n: "02", t: "Adjust the buckle", d: "Find the height that holds baby close to your chest, head supported." },
              { n: "03", t: "Place baby in", d: "Settle baby gently into the pouch. Check legs, hips and head position." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-8">
                <p className="text-sm tracking-[0.2em] text-primary font-medium">{s.n}</p>
                <p className="mt-3 text-xl font-medium">{s.t}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewWall title="From Kowala families" subtitle="Real photos and stories from parents using the Kowala Sling Carrier." />


      {/* FAQ */}
      <section className="section-pad bg-beige">
        <div className="container-kw max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-10">Frequently asked</h2>
          <div className="space-y-3">
            {[
              { q: "Can I machine wash it?", a: "Yes. Wash on a gentle cycle in cold water and air dry." },
              { q: "Is it adjustable?", a: "One easy buckle adjusts the carrier to fit every parent comfortably." },
              { q: "Can both parents wear it?", a: "Absolutely. The Kowala is designed to fit all body shapes." },
              { q: "How long does shipping take?", a: "Processing takes 1–3 business days. Delivery 8–14 business days after that, anywhere in South Africa." },
              { q: "What's your return policy?", a: "14-day returns from when you receive your order. See our Returns page for details." },
            ].map((f) => (
              <details key={f.q} className="group bg-white rounded-2xl p-5 md:p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium">
                  {f.q}
                  <span className="ml-4 text-primary group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky bar */}
      <div className={`fixed bottom-0 inset-x-0 z-30 md:hidden transition-transform duration-300 ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-white border-t border-border p-3 flex items-center gap-3 shadow-2xl">
          <img src={color.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{bundle === 2 ? "2-Pack" : "Single"}</p>
            <p className="font-medium text-sm">{formatZAR(price * qty)}</p>
          </div>
          <button onClick={handleAdd} className="btn-primary py-3 px-5 text-sm">Add to Cart</button>
        </div>
      </div>
    </>
  );
}

function Gallery({ images, slide, setSlide }: { images: string[]; slide: number; setSlide: (n: number) => void }) {
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-beige">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === slide ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <button
          aria-label="Previous image"
          onClick={() => setSlide((slide - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => setSlide((slide + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center hover:bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Image ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-4 gap-3 mt-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setSlide(i)}
            className={`aspect-square overflow-hidden rounded-2xl ${i === slide ? "ring-2 ring-primary" : ""}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

function BundleCard({ active, onClick, label, sub, price, compareAt, highlight }: { active: boolean; onClick: () => void; label: string; sub: string; price: number; compareAt?: number; highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left p-5 rounded-2xl border-2 transition ${active ? "border-primary bg-beige" : "border-border hover:border-foreground/30"}`}
    >
      {highlight && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">Most Popular</span>
      )}
      <p className="font-medium">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-medium">{formatZAR(price)}</span>
        {compareAt && <span className="text-xs text-muted-foreground line-through">{formatZAR(compareAt)}</span>}
      </div>
      {compareAt && <p className="text-[11px] text-primary mt-1 font-medium">Save {formatZAR(compareAt - price)}</p>}
    </button>
  );
}
