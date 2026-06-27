import { Minus, Plus, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatZAR, useCart } from "@/lib/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, subtotal, total, bundleSavings } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-foreground/30" />
      <aside
        className={`absolute top-0 right-0 h-full w-[92%] max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-5 border-b border-border">
          <h3 className="text-lg font-medium">Your Cart</h3>
          <button onClick={() => setOpen(false)} className="w-11 h-11 -mr-2 rounded-full hover:bg-beige flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Your cart is empty.</p>
              <Link to="/product" onClick={() => setOpen(false)} className="btn-primary mt-6 inline-flex">Shop the Carrier</Link>
            </div>
          ) : items.map((it) => (
            <div key={it.id} className="flex gap-4 py-4 border-b border-border last:border-0">
              <img src={it.image} alt={it.colorName} className="w-20 h-24 object-cover rounded-xl bg-beige" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Kowala Sling Carrier</p>
                <p className="text-xs text-muted-foreground mt-0.5">{it.colorName} · {it.bundle === 2 ? "2-Pack Bundle" : "Single"}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-full">
                    <button onClick={() => setQty(it.id, it.qty - 1)} className="w-8 h-8 flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} className="w-8 h-8 flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <p className="text-sm font-medium">{formatZAR(it.price * it.qty)}</p>
                </div>
              </div>
              <button onClick={() => remove(it.id)} aria-label="Remove" className="text-muted-foreground hover:text-foreground self-start"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3 bg-surface">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-medium">{formatZAR(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping calculated at checkout.</p>
            <button className="btn-primary w-full">Checkout</button>
          </div>
        )}
      </aside>
    </div>
  );
}
