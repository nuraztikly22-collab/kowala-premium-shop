import { createFileRoute } from "@tanstack/react-router";
import { Mail, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kowala — We're Here to Help" },
      { name: "description", content: "Get in touch with the Kowala team. Real South African support, replies within 24 hours." },
      { property: "og:title", content: "Contact Kowala" },
      { property: "og:description", content: "We reply within 24 hours, every day of the week." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="section-pad">
      <div className="container-kw grid md:grid-cols-2 gap-12 max-w-5xl">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight">Talk to a real human.</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">We're a small South African team and we read every message. Send us a note and we'll be back to you within 24 hours.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /><span>hello@kowala.co.za</span></div>
            <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary" /><span>Reply within 24 hours</span></div>
          </div>
        </div>
        <div className="bg-beige rounded-3xl p-7 md:p-9">
          {sent ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-medium">Thank you.</h3>
              <p className="mt-3 text-muted-foreground">We've received your message and will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <Field label="Name"><input required className="w-full bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" /></Field>
              <Field label="Email"><input required type="email" className="w-full bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" /></Field>
              <Field label="Message"><textarea required rows={5} className="w-full bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none" /></Field>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
