import Link from "next/link";
import { Logo } from "./Logo";

const FOOTER_LINKS = {
  Company: [
    { href: "/vision", label: "Vision" },
    { href: "/mission", label: "Mission" },
    { href: "/values", label: "Company Values" },
    { href: "/team", label: "Team" },
  ],
  Product: [
    { href: "/products", label: "Products" },
    { href: "/login", label: "Log in" },
    { href: "/signup", label: "Get started" },
  ],
  Contact: [
    { href: "/contact", label: "Contact us" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              The operating system for founders, managers, and teams building
              something real.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-display text-sm font-semibold text-white">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} DRYNN. All rights reserved.
          </p>
          <p className="text-xs text-ink-500">
            Built on the DRYNN Founder OS.
          </p>
        </div>
      </div>
    </footer>
  );
}
