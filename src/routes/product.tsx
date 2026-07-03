import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";
import { ReviewWall } from "@/components/ReviewWall";
import {
  PRODUCTS_QUERY,
  formatMoney,
  storefrontApiRequest,
  type ShopifyProduct,
  type ShopifyVariant,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { COLORS } from "@/lib/brand";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Kowala Sling Carrier — Premium Baby Carrier" },
      { name: "description", content: "Soft, supportive, hands-free baby carrier. Designed for South African parents." },
      { property: "og:title", content: "Kowala Sling Carrier" },
      { property: "og:description", content: "Soft, supportive, hands-free baby carrier." },
      { property: "og:image", content: COLORS[0].images[0] },
    ],
  }),
  component: ProductPage,
});

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

  if (isError || !data) {
    return <EmptyStore />;
  }

  return <ProductView product={data} />;
}

function EmptyStore() {
  return (
    <div className="container-kw py-24 md:py-32">
      <div className="max-w-xl mx-auto text-center bg-beige rounded-3xl p-10 md:p-14">
        <Package className="w-10 h-10 text-primary mx-auto mb-5" />
        <h1 className="text-2xl md:text-3xl font-medium">No products yet</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Your Shopify store is connected but doesn't have any products yet. Tell the chat what
          you want to sell (e.g. <em>"Add the Kowala Sling Carrier at R499 with colours Botanical, Houndstooth, Cocoa and Onyx"</em>) and it will appear here automatically.
        </p>
      </div>
    </div>
  );
}

function ProductView({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variants = node.variants.edges.map((e) => e.node);
  const images = node.images.edges.map((e) => e.node);

  // Selected options state — one value per option name
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    const firstAvailable = variants.find((v) => v.availableForSale) ?? variants[0];
    firstAvailable?.selectedOptions.forEach((o) => {
      initial[o.name] = o.value;
    });
    return initial;
  });
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const matchedVariant: ShopifyVariant | undefined = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions.every((o) => selected[o.name] === o.value),
    );
  }, [variants, selected]);

  const gallery = useMemo(() => {
    if (matchedVariant?.image?.url) {
      const rest = images.filter((i) => i.url !== matchedVariant.image!.url);
      return [matchedVariant.image, ...rest];
    }
    return images.length ? images : [{ url: "", altText: node.title }];
  }, [images, matchedVariant, node.title]);

  useEffect(() => {
    setSlide(0);
  }, [matchedVariant?.id]);

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
      variantTitle: matchedVariant.title,
      price: matchedVariant.price,
      quantity: qty,
      image: matchedVariant.image?.url ?? images[0]?.url,
      selectedOptions: matchedVariant.selectedOptions,
    });
  };

  const price = matchedVariant?.price ?? node.priceRange.minVariantPrice;
  const priceLabel = formatMoney(parseFloat(price.amount) * qty, price.currencyCode);

  return (
    <>
      <section className="pt-6 md:pt-10">
        <div className="container-kw grid md:grid-cols-2 gap-8 md:gap-14">
          <Gallery images={gallery.map((i) => i.url)} slide={slide} setSlide={setSlide} />

          <div ref={buyRef} className="md:sticky md:top-24 md:self-start">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">Kowala</p>
            <h1 className="text-3xl md:text-4xl font-medium mt-2">{node.title}</h1>
            <div className="flex items-center gap-2 mt-3">
              <Stars />
              <span className="text-sm text-muted-foreground">Premium baby carrier · Proudly South African</span>
            </div>

            {node.description && (
              <p className="mt-5 text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                {node.description}
              </p>
            )}

            <p className="mt-6 text-2xl font-medium">{formatMoney(price.amount, price.currencyCode)}</p>

            {/* Options */}
            {node.options
              .filter((o) => !(o.values.length === 1 && o.values[0] === "Default Title"))
              .map((opt) => (
                <div key={opt.name} className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                      {opt.name}
                    </p>
                    <p className="text-sm">{selected[opt.name]}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {opt.values.map((val) => {
                      const active = selected[opt.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setSelected((s) => ({ ...s, [opt.name]: val }))}
                          className={`min-w-[3rem] px-4 h-11 rounded-full text-sm border transition ${
                            active
                              ? "bg-foreground text-white border-foreground"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Quantity */}
            <div className="mt-7">
              <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <button
                onClick={handleAdd}
                disabled={!matchedVariant || !matchedVariant.availableForSale || isLoading}
                className="btn-primary w-full disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : matchedVariant?.availableForSale === false ? (
                  "Sold out"
                ) : (
                  <>Add to Cart — {priceLabel}</>
                )}
              </button>
            </div>

            {/* Shipping */}
            <div className="mt-5 bg-beige rounded-2xl p-5 text-sm">
              <p className="font-medium mb-1">Shipping across South Africa</p>
              <p className="text-muted-foreground">
                Processing: 1–3 business days · Delivery: 8–14 business days after processing.
              </p>
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

      {/* Reviews */}
      <ReviewWall
        title="From Kowala families"
        subtitle="Real photos and stories from parents using the Kowala Sling Carrier."
      />

      {/* Mobile sticky bar */}
      <div
        className={`fixed bottom-0 inset-x-0 z-30 md:hidden transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white border-t border-border p-3 flex items-center gap-3 shadow-2xl">
          {gallery[0]?.url && (
            <img src={gallery[0].url} alt="" className="w-12 h-12 rounded-xl object-cover" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{node.title}</p>
            <p className="font-medium text-sm">{priceLabel}</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!matchedVariant?.availableForSale || isLoading}
            className="btn-primary py-3 px-5 text-sm disabled:opacity-60"
          >
            Add to Cart
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
}: {
  images: string[];
  slide: number;
  setSlide: (n: number) => void;
}) {
  const safeImages = images.filter(Boolean);
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-beige">
        {safeImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
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
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
