import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/brand";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Shop" },
  { to: "/how-to-use", label: "How To Use" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/shipping", label: "Shipping" },
  { to: "/returns", label: "Returns" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-border/60">
        <div className="container-kw flex items-center justify-between h-16 md:h-20">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex items-center justify-center w-11 h-11 -ml-2 rounded-full hover:bg-beige transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center">
            <img src={ASSETS.logo} alt="Kowala" className="h-14 md:h-16 w-auto" />
          </Link>

          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-11 h-11 -mr-2 rounded-full hover:bg-beige transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] rounded-full bg-primary text-white text-[10px] font-medium flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Slide-in nav */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-foreground/30" />
        <aside
          className={`absolute top-0 left-0 h-full w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between h-16 md:h-20 px-5 border-b border-border">
            <img src={ASSETS.logo} alt="Kowala" className="h-9 w-auto" />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="w-11 h-11 -mr-2 rounded-full hover:bg-beige flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="px-2 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block px-5 py-4 text-lg font-medium rounded-2xl hover:bg-beige transition"
                activeProps={{ className: "block px-5 py-4 text-lg font-medium rounded-2xl bg-beige text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="px-7 pb-8 mt-4 text-sm text-muted-foreground">
            Proudly South African · Designed for mothers
          </div>
        </aside>
      </div>
    </>
  );
}
