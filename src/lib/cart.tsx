import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ColorKey } from "./brand";

export interface CartItem {
  id: string;
  color: ColorKey;
  colorName: string;
  bundle: 1 | 2;
  qty: number;
  price: number;
  image: string;
}

interface CartCtx {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kowala-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("kowala-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    open,
    setOpen,
    add: (item) => {
      setItems((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + item.qty } : p);
        }
        return [...prev, item];
      });
      setOpen(true);
    },
    remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    setQty: (id, qty) => setItems((prev) => prev.map((p) => p.id === id ? { ...p, qty: Math.max(1, qty) } : p)),
    clear: () => setItems([]),
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    count: items.reduce((s, i) => s + i.qty, 0),
  }), [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
}

export const formatZAR = (n: number) => `R${n.toLocaleString("en-ZA")}`;
