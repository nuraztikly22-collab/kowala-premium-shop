import { Minus, Plus, X, Loader2, ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";

export function CartDrawer() {
  const {
    items,
    open,
    setOpen,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "ZAR";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

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
          <h3 className="text-lg font-medium">Your Cart {totalItems > 0 && <span className="text-muted-foreground">({totalItems})</span>}</h3>
          <button
            onClick={() => setOpen(false)}
            className="w-11 h-11 -mr-2 rounded-full hover:bg-beige flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingBag className="w-10 h-10 mx-auto mb-4 opacity-40" />
              <p>Your cart is empty.</p>
              <Link
                to="/product"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 inline-flex"
              >
                Shop the Carrier
              </Link>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.variantId} className="flex gap-4 py-4 border-b border-border last:border-0">
                <div className="w-20 h-24 shrink-0">
                  {it.image ? (
                    <img src={it.image} alt={it.productTitle} className="w-full h-full object-cover rounded-xl bg-beige" />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-beige" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{it.productTitle}</p>
                  {it.variantTitle && it.variantTitle !== "Default Title" && (
                    <p className="text-xs text-muted-foreground mt-0.5">{it.variantTitle}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-full">
                      <button
                        onClick={() => updateQuantity(it.variantId, it.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center"
                        disabled={isLoading}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{it.quantity}</span>
                      <button
                        onClick={() => updateQuantity(it.variantId, it.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center"
                        disabled={isLoading}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-medium">
                      {formatMoney(parseFloat(it.price.amount) * it.quantity, it.price.currencyCode)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(it.variantId)}
                  aria-label="Remove"
                  className="text-muted-foreground hover:text-foreground self-start"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3 bg-surface">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-medium">{formatMoney(totalPrice, currency)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping calculated at checkout.</p>
            <button
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              disabled={isLoading || isSyncing}
              onClick={handleCheckout}
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Checkout <ExternalLink className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
