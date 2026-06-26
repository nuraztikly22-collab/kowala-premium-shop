import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { ASSETS } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="bg-beige mt-20">
      <div className="container-kw py-16 grid gap-12 md:grid-cols-4">
        <div>
          <img src={ASSETS.logo} alt="Kowala" className="h-10 w-auto mb-4" />
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Premium baby carriers, designed for modern mothers. Proudly South African.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase">Shop</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/product" className="hover:text-primary">Carrier</Link></li>
            <li><Link to="/how-to-use" className="hover:text-primary">How To Use</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shipping" className="hover:text-primary">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-primary">Returns</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 tracking-wide uppercase">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
          </ul>
          <div className="flex gap-3 mt-6">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-kw py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kowala. All rights reserved.</p>
          <p>Proudly South African 🇿🇦</p>
        </div>
      </div>
    </footer>
  );
}
