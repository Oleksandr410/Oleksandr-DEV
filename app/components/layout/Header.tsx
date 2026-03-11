"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/libs/utils";

const navLinks = [
  { href: "/#intro", label: "About", id: "intro" },
  { href: "/#what-i-do", label: "What I Do", id: "what-i-do" },
  { href: "/case-studies", label: "Case Studies", id: "case-studies" },
];

export default function Header() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>("intro");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/case-studies") {
      setActiveId("case-studies");
      return;
    }
    const ids = navLinks.map((l) => l.id);
    const checkActive = () => {
      const triggerY = window.innerHeight * 0.35;
      let active = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY) active = id;
      }
      setActiveId(active);
    };
    checkActive();
    window.addEventListener("scroll", checkActive, { passive: true });
    return () => window.removeEventListener("scroll", checkActive);
  }, [pathname]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const NavLink = ({ link }: { link: (typeof navLinks)[0] }) => {
    const isActive = activeId === link.id;
    const isEmphasized = link.id === "case-studies";
    return (
      <Link
        href={link.href}
        onClick={closeMobileMenu}
        className={cn(
          "relative block px-3 py-2 text-xs sm:text-sm font-medium tracking-wide transition-colors",
          isScrolled
            ? isActive
              ? "text-sky-600"
              : "text-slate-600 hover:text-sky-600"
            : isActive
              ? "text-sky-400"
              : "text-slate-300 hover:text-sky-300",
          isEmphasized && "font-bold",
        )}
        role="menuitem"
        aria-label={link.label}
        aria-current={isActive ? "true" : undefined}
      >
        {link.label}
        {isActive && (
          <span
            className={cn(
              "absolute bottom-1 left-3 right-3 h-px rounded-full transition-colors",
              isScrolled ? "bg-sky-600" : "bg-sky-500",
            )}
          />
        )}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300",
        isScrolled ? "py-8" : "pt-8",
      )}
    >
      <div className="flex justify-center px-4 sm:px-6">
        <nav
          className={cn(
            "relative mx-auto flex w-full max-w-full items-center justify-center rounded-full transition-all duration-300 pr-12 md:justify-between",
            isScrolled
              ? "border border-slate-200 bg-white/90 px-4 py-2.5 backdrop-blur-md sm:px-6 sm:py-3 md:max-w-[720px] lg:max-w-[880px] xl:max-w-[1080px]"
              : "border border-transparent bg-transparent px-4 py-2.5 sm:px-6 sm:py-3 md:max-w-[800px] lg:max-w-[960px] xl:max-w-[1161px]",
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3"
            aria-label="Randy - Home"
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-9 sm:w-9",
                isScrolled ? "bg-sky-100" : "bg-white/10",
              )}
            >
              <Image
                src="/logo.png"
                alt=""
                width={20}
                height={20}
                className="h-4 w-4 object-contain sm:h-5 sm:w-5"
                priority
              />
            </span>
            <span
              className={cn(
                "hidden font-medium text-xs sm:text-sm transition-colors sm:inline md:text-base",
              )}
            >
              <span className={isScrolled ? "text-sky-600" : "text-sky-400"}>
                &lt;
              </span>
              <span className={isScrolled ? "text-slate-800" : "text-slate-100"}>
                Randy
              </span>
              <span
                className={cn("font-light", isScrolled ? "text-sky-600" : "text-sky-400")}
              >
                {" "}
                - r@andi
              </span>
              <span className={isScrolled ? "text-sky-600" : "text-sky-400"}>
                /&gt;
              </span>
            </span>
            <span className="font-medium text-sm sm:hidden">
              <span className={isScrolled ? "text-sky-600" : "text-sky-400"}>
                &lt;
              </span>
              <span className={isScrolled ? "text-slate-800" : "text-slate-100"}>
                Randy
              </span>
              <span className={isScrolled ? "text-sky-600" : "text-sky-400"}>
                /&gt;
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden items-center gap-2 sm:gap-4 md:flex"
            role="menubar"
          >
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className={cn(
              "absolute right-3 top-1/2 flex h-8 w-8 shrink-0 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 md:static md:translate-y-0 md:hidden",
              isScrolled
                ? "bg-sky-100 text-slate-600 hover:bg-sky-200 hover:text-sky-600"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-sky-300",
            )}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl border border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-md md:hidden">
          <nav
            className="flex flex-col"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
