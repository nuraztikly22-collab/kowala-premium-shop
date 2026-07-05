import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  ShieldCheck,
  Truck,
  Award,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Heart,
  Hand,
  Droplet,
  Settings2,
  Baby,
  Smile,
  Plane,
  Lock,
  Feather,
  Activity,
  Loader2,
  Package,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { ReviewWall } from "@/components/ReviewWall";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PRODUCTS_QUERY,
  formatMoney,
  storefrontApiRequest,
  type ShopifyProduct,
  type ShopifyVariant,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { COLORS, type ColorKey, type ColorOption } from "@/lib/brand";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Kowala Sling Carrier — Premium Baby Carrier" },
      {
        name: "description",
        content:
          "Soft, supportive, hands-free baby carrier. Four premium colourways. Designed for South African parents.",
      },
      { property: "og:title", content: "Kowala Sling Carrier" },
      {
        property: "og:description",
        content: "Soft, supportive, hands-free baby carrier.",
      },
      { property: "og:image", content: COLORS[0].images[0] },
    ],
  }),
  component: ProductPage,
});

// ---- Bundle pricing ----
const BUNDLES = [
  {
    key: "single" as const,
    slings: 1,
    price: 499,
    label: "1 Sling",
    sub: "Single carrier",
  },
  {
    key: "double" as const,
    slings: 2,
    price: 899,
    label: "2 Slings",
    sub: "Best for gifting",
    popular: true,
    save: 99,
  },
];
type BundleKey = (typeof BUNDLES)[number]["key"];

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-primary">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} style={{ width: size, height: size }} className="fill-primary" />
      ))}
    </div>
  );
}

async function fetchFirstProduct(): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
    PRODUCTS_QUERY,
    { first: 1 },
  );
  return data?.data?.products?.edges?.[0] ?? null;
}

function ProductPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopify", "first-product"],
    queryFn: fetchFirstProduct,
  });

  if (isLoading) {
    return (
      <div className="container-kw py-32 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data) return <EmptyStore />;
  return <ProductView product={data} />;
}

function EmptyStore() {
  return (
    <div className="container-kw py-24 md:py-32">
      <div className="max-w-xl mx-auto text-center bg-beige rounded-3xl p-10 md:p-14">
        <Package className="w-10 h-10 text-primary mx-auto mb-5" />
        <h1 className="text-2xl md:text-3xl font-medium">No products yet</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Your Shopify store is connected but doesn't have any products yet.
        </p>
      </div>
    </div>
  );
}

function matchVariantForColor(variants: ShopifyVariant[], colorName: string) {
  const lower = colorName.toLowerCase();
  return (
    variants.find((v) =>
      v.selectedOptions.some(
        (o) =>
          o.name.toLowerCase().includes("colour") || o.name.toLowerCase().includes("color"),
      ) &&
      v.selectedOptions.some((o) => o.value.toLowerCase().includes(lower.split(" ")[0])),
    ) ??
    variants.find((v) => v.availableForSale) ??
    variants[0]
  );
}

function ProductView({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variants = node.variants.edges.map((e) => e.node);

  const [color, setColor] = useState<ColorKey>(COLORS[0].key);
  const [bundle, setBundle] = useState<BundleKey>("double");
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const checkoutUrl = useCartStore((s) => s.checkoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);

  const activeColor = COLORS.find((c) => c.key === color) ?? COLORS[0];
  const gallery = activeColor.images;

  const matchedVariant = useMemo(
    () => matchVariantForColor(variants, activeColor.name),
    [variants, activeColor.name],
  );

  const activeBundle = BUNDLES.find((b) => b.key === bundle)!;
  const unitPrice = activeBundle.price;
  const totalPrice = unitPrice * qty;

  useEffect(() => {
    setSlide(0);
  }, [color]);

  useEffect(() => {
    const onScroll = () => {
      if (!buyRef.current) return;
      const rect = buyRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = async () => {
    if (!matchedVariant) return;
    await addItem({
      variantId: matchedVariant.id,
      productTitle: node.title,
      variantTitle: `${activeColor.name} · ${activeBundle.label}`,
      price: { amount: String(unitPrice), currencyCode: "ZAR" },
      quantity: qty * activeBundle.slings,
      image: gallery[0],
      selectedOptions: [
        { name: "Colour", value: activeColor.name },
        { name: "Bundle", value: activeBundle.label },
      ],
    });
  };

  const handleBuyNow = async () => {
    await handleAdd();
    // After add, checkout URL is available in store
    const url = useCartStore.getState().checkoutUrl;
    if (url) window.location.href = url;
  };

  return (
    <>
      {/* ============ BUY SECTION ============ */}
      <section className="pt-6 md:pt-10">
        <div className="container-kw grid md:grid-cols-2 gap-8 md:gap-14">
          <Gallery
            key={color}
            images={gallery}
            slide={slide}
            setSlide={setSlide}
            altBase={`${node.title} — ${activeColor.name}`}
          />

          <div ref={buyRef} className="md:sticky md:top-24 md:self-start">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">Kowala</p>
            <h1 className="text-3xl md:text-4xl font-medium mt-2">{node.title}</h1>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Stars />
                <span className="text-sm">4.9</span>
              </div>
              <span className="text-sm text-muted-foreground">Based on 2,300+ happy parents</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <p className="text-3xl font-medium">{formatMoney(totalPrice, "ZAR")}</p>
              {activeBundle.save && (
                <p className="text-sm text-primary font-medium">
                  Save R{activeBundle.save * qty}
                </p>
              )}
            </div>

            {/* Colour selector */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  Colour
                </p>
                <p className="text-sm">{activeColor.name}</p>
              </div>
              <div className="flex gap-3">
                {COLORS.map((c) => {
                  const active = c.key === color;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setColor(c.key)}
                      aria-label={c.name}
                      className={`relative w-12 h-12 rounded-full transition-transform duration-300 hover:scale-105 ${
                        active ? "scale-105" : ""
                      }`}
                    >
                      <span
                        className="absolute inset-0 rounded-full border border-black/10"
                        style={{ background: c.swatch }}
                      />
                      <span
                        className={`absolute -inset-1.5 rounded-full border-2 transition-opacity ${
                          active ? "border-foreground opacity-100" : "border-transparent opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bundle selector */}
            <div className="mt-7">
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3">
                Bundle
              </p>
              <div className="grid grid-cols-2 gap-3">
                {BUNDLES.map((b) => {
                  const active = b.key === bundle;
                  return (
                    <button
                      key={b.key}
                      onClick={() => setBundle(b.key)}
                      className={`relative text-left rounded-2xl border p-4 transition-all ${
                        active
                          ? "border-foreground bg-foreground/[0.03]"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      {b.popular && (
                        <span className="absolute -top-2.5 left-4 text-[10px] tracking-wider uppercase bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{b.label}</p>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            active ? "border-foreground bg-foreground" : "border-border"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-white" />}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{b.sub}</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <p className="font-medium">R{b.price}</p>
                        {b.save && (
                          <p className="text-xs text-primary">Save R{b.save}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <button
                onClick={handleAdd}
                disabled={!matchedVariant || isLoading}
                className="btn-primary w-full disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Add to Cart — {formatMoney(totalPrice, "ZAR")}</>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!matchedVariant || isLoading}
                className="w-full h-12 rounded-full border border-foreground text-foreground font-medium hover:bg-foreground hover:text-white transition-colors disabled:opacity-60"
              >
                Buy Now
              </button>
            </div>

            {/* Urgent shipping */}
            <div className="mt-5 bg-beige rounded-2xl p-5 text-sm space-y-1.5">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <p className="font-medium">Shipping across South Africa</p>
              </div>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Processing:</span> 1–3 business days
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Delivery:</span> 8–11 business days
                after processing
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-4 gap-2 text-center">
              {[
                { Icon: ShieldCheck, t: "Secure" },
                { Icon: Truck, t: "SA Delivery" },
                { Icon: Award, t: "Premium" },
                { Icon: MessageCircle, t: "Support" },
              ].map(({ Icon, t }) => (
                <div
                  key={t}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-surface"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <p className="text-[11px] font-medium">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="section-pad">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              Why Kowala
            </p>
            <h2 className="text-3xl md:text-4xl font-medium mt-3">
              Designed around real motherhood.
            </h2>
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
              <div
                key={t}
                className="bg-surface rounded-3xl p-5 flex flex-col items-start"
              >
                <Icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-sm font-medium leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LONG DESCRIPTION ============ */}
      <section className="section-pad bg-beige">
        <div className="container-kw grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <img
              src={COLORS[0].images[0]}
              alt="Parent wearing the Kowala Sling Carrier"
              className="w-full aspect-[4/5] object-cover rounded-3xl"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              The Sling
            </p>
            <h2 className="text-3xl md:text-4xl font-medium mt-3 leading-tight">
              Everyday freedom. Closer bonding. Real comfort.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Kowala Sling Carrier is built for the moments motherhood is really made of —
                dishes in one hand, coffee in the other, a settled little one against your chest.
                Slip it on, clip in, and get your hands back without putting baby down.
              </p>
              <p>
                A wide, structured seat cradles your baby in an ergonomic M-position while the
                padded shoulder strap distributes weight evenly across your back — so long walks,
                grocery runs and grandparent visits stay comfortable for both of you.
              </p>
              <p>
                Suitable from the newborn stage with proper head support, the sling grows with
                your family. Fully adjustable from 55 cm to 88 cm, it fits every parent — and
                takes seconds to hand off between you.
              </p>
              <p>
                Soft-touch fabric, machine-washable, and light enough to fold into a nappy bag.
                One carrier. Every day. Everywhere you go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY PARENTS LOVE IT ============ */}
      <section className="section-pad">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              Loved by families
            </p>
            <h2 className="text-3xl md:text-4xl font-medium mt-3">Why parents love it</h2>
          </div>
          <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Smile,
                t: "Comfortable all day",
                d: "Padded strap and even weight distribution mean no shoulder ache after school runs and errands.",
              },
              {
                Icon: Heart,
                t: "Keeps baby close",
                d: "Chest-to-chest closeness supports bonding, calm and easier settling.",
              },
              {
                Icon: Plane,
                t: "Easy to travel",
                d: "Folds small into a nappy bag. Perfect for airports, markets and holidays.",
              },
              {
                Icon: Droplet,
                t: "Easy to wash",
                d: "Machine washable on cold. Fresh and ready for the next day.",
              },
              {
                Icon: Award,
                t: "Premium materials",
                d: "Soft-touch, breathable fabric with a reinforced buckle and D-ring safety loops.",
              },
              {
                Icon: Sparkles,
                t: "Minimal effort",
                d: "One clip, one adjustment, hands free. No wrapping, no learning curve.",
              },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-surface rounded-3xl p-6">
                <Icon className="w-5 h-5 text-primary mb-4" />
                <p className="font-medium">{t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW TO USE ============ */}
      <section className="section-pad bg-beige">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              Getting started
            </p>
            <h2 className="text-3xl md:text-4xl font-medium mt-3">How to use your Kowala</h2>
            <p className="text-muted-foreground mt-4">
              Four simple steps. No wrapping, no fuss.
            </p>
          </div>
          <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Slip it on",
                d: "Slide the sling over one shoulder like a cross-body bag, padded side down.",
              },
              {
                n: "02",
                t: "Adjust the strap",
                d: "Pull the buckle to your preferred length — from 55 cm to 88 cm.",
              },
              {
                n: "03",
                t: "Position baby",
                d: "Place baby into the pouch in the hip-healthy M-position, legs supported.",
              },
              {
                n: "04",
                t: "Enjoy hands-free",
                d: "Support baby's back with one hand for newborns, or go fully hands-free.",
              },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-6">
                <div className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-medium">
                  {s.n}
                </div>
                <p className="font-medium mt-5">{s.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPECIFICATIONS ============ */}
      <section className="section-pad">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              The details
            </p>
            <h2 className="text-3xl md:text-4xl font-medium mt-3">Specifications</h2>
          </div>
          <div className="max-w-3xl mx-auto bg-surface rounded-3xl p-6 md:p-10">
            <dl className="divide-y divide-border">
              {[
                ["Fabric", "Soft-touch woven cotton blend, breathable"],
                ["Weight capacity", "3.5 kg – 15 kg"],
                ["Adjustable range", "55 cm – 88 cm strap"],
                ["Recommended age", "From newborn (with proper head support)"],
                ["Care", "Machine washable on cold, air dry"],
                ["Includes", "1 × Kowala Sling Carrier"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-3 gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="col-span-2 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <ReviewWall
        title="From Kowala families"
        subtitle="Real photos and stories from parents using the Kowala Sling Carrier."
      />

      {/* ============ FAQ ============ */}
      <section className="section-pad bg-beige">
        <div className="container-kw">
          <div className="max-w-xl mx-auto text-center mb-10">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              Answers
            </p>
            <h2 className="text-3xl md:text-4xl font-medium mt-3">Frequently asked</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-10">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "Can I machine wash it?",
                  a: "Yes. Machine wash cold on a gentle cycle and air dry. Avoid tumble drying and bleach to keep the fabric soft.",
                },
                {
                  q: "Is it adjustable?",
                  a: "Fully. The strap adjusts from 55 cm to 88 cm, so it fits parents from petite to plus size comfortably.",
                },
                {
                  q: "Can both parents wear it?",
                  a: "Absolutely. The single buckle and D-rings make it easy to hand off between parents in seconds — no rewrapping.",
                },
                {
                  q: "What age is it suitable for?",
                  a: "Suitable from the newborn stage (with proper head support) up to a weight of 15 kg.",
                },
                {
                  q: "How long does shipping take?",
                  a: "Processing is 1–3 business days. Delivery is 8–11 business days after processing, anywhere in South Africa.",
                },
                {
                  q: "What is your returns policy?",
                  a: "We offer a 30-day returns window on unused items in original packaging. See our returns page for full details.",
                },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============ DELIVERY & RETURNS ============ */}
      <section className="section-pad">
        <div className="container-kw grid md:grid-cols-2 gap-5">
          <Link
            to="/shipping"
            className="group bg-surface rounded-3xl p-8 hover:bg-beige transition-colors"
          >
            <Truck className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-xl font-medium">Delivery</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Shipping across South Africa. Processing 1–3 business days, delivery 8–11 business
              days after processing.
            </p>
            <span className="inline-block mt-4 text-sm font-medium group-hover:underline">
              Read delivery info →
            </span>
          </Link>
          <Link
            to="/returns"
            className="group bg-surface rounded-3xl p-8 hover:bg-beige transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-xl font-medium">Returns</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              30-day returns on unused items in original packaging. Simple, no-fuss process.
            </p>
            <span className="inline-block mt-4 text-sm font-medium group-hover:underline">
              Read returns policy →
            </span>
          </Link>
        </div>
      </section>

      {/* ============ Mobile sticky bar ============ */}
      <div
        className={`fixed bottom-0 inset-x-0 z-30 md:hidden transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white border-t border-border p-3 flex items-center gap-3 shadow-2xl">
          {gallery[0] && (
            <img src={gallery[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {node.title} · {activeColor.name}
            </p>
            <p className="font-medium text-sm">{formatMoney(totalPrice, "ZAR")}</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!matchedVariant || isLoading}
            className="btn-primary py-3 px-5 text-sm disabled:opacity-60"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

function Gallery({
  images,
  slide,
  setSlide,
  altBase,
}: {
  images: string[];
  slide: number;
  setSlide: (n: number) => void;
  altBase: string;
}) {
  const safeImages = images.filter(Boolean);
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-beige">
        {safeImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${altBase} — view ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {safeImages.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => setSlide((slide - 1 + safeImages.length) % safeImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next image"
              onClick={() => setSlide((slide + 1) % safeImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur flex items-center justify-center hover:bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Image ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {safeImages.length > 1 && (
        <div className="hidden md:grid grid-cols-4 gap-3 mt-3">
          {safeImages.slice(0, 4).map((src, i) => (
            <button
              key={src}
              onClick={() => setSlide(i)}
              className={`aspect-square overflow-hidden rounded-2xl ${
                i === slide ? "ring-2 ring-primary" : ""
              }`}
            >
              <img
                src={src}
                alt={`${altBase} — thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
