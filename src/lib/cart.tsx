// Legacy re-exports kept for backward compatibility.
// The cart is now driven by Shopify — see src/stores/cartStore.ts.
export { formatMoney as formatZAR } from "@/lib/shopify";
export { useCartStore as useCart } from "@/stores/cartStore";
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
