import { BadgeCheck, Star } from "lucide-react";
import { REVIEWS, type Review } from "@/lib/reviews";
import { ASSETS } from "@/lib/brand";

function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-primary" aria-label={`${n} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < n ? "fill-primary" : "opacity-25"}
        />
      ))}
    </div>
  );
}

function ProductTag({ product }: { product?: string }) {
  if (!product) return null;
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-border/70 p-2.5">
      <img src={ASSETS.logo} alt="" className="w-10 h-10 rounded-md object-contain bg-beige p-1" />
      <span className="text-xs md:text-sm text-foreground/80 font-medium">{product}</span>
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="break-inside-avoid mb-4 md:mb-5 bg-white border border-border/60 rounded-2xl overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      {r.image && (
        <img
          src={r.image}
          alt={`Photo from ${r.name}`}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      )}
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm md:text-base">{r.name}</p>
          {r.verified && (
            <span className="inline-flex items-center gap-1 text-xs text-foreground/70">
              <BadgeCheck className="w-4 h-4 text-primary" />
              Verified
            </span>
          )}
        </div>
        <div className="mt-2">
          <Stars n={r.stars} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{r.text}</p>
        {r.city && <p className="mt-3 text-xs text-muted-foreground">{r.city}</p>}
        <ProductTag product={r.product ?? "Kowala Sling Carrier"} />
      </div>
    </article>
  );
}

export function ReviewWall({
  title = "From Kowala families",
  subtitle = "Real moments, shared by parents across South Africa.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const has = REVIEWS.length > 0;

  return (
    <section className="section-pad">
      <div className="container-kw">
        <div className="max-w-xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-medium">{title}</h2>
          <p className="mt-4 text-muted-foreground">{subtitle}</p>
        </div>

        {has ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center bg-beige rounded-3xl p-8 md:p-10">
            <img src={ASSETS.logo} alt="Kowala" className="h-12 mx-auto mb-5 opacity-90" />
            <p className="font-medium">No reviews yet</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Be one of the first South African parents to share your Kowala story.
              Tag us on Instagram or email reviews@kowala.co.za with your photo and we'll feature it here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
