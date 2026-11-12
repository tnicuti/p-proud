"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/content/site";
import { logoImage } from "@/lib/mascot";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Đóng menu xổ xuống khi chuyển trang.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const logoW = Math.round((logoImage.width / logoImage.height) * 44);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(255,246,247,.94)] backdrop-blur-[8px]">
      <div className="relative mx-auto flex h-[72px] w-full max-w-[1160px] items-center gap-4 px-5">
        <Link href="/" aria-label="P-Proud trang chủ" className="shrink-0">
          <Image
            src={logoImage}
            alt="P-Proud"
            width={logoW}
            height={44}
            priority
            style={{ height: 44, width: "auto" }}
          />
        </Link>
        <button
          type="button"
          className="ml-auto hidden h-11 w-11 border-0 bg-transparent text-[28px] text-ruby max-nav:block"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav aria-label="Điều hướng chính" className="ml-auto max-nav:contents">
          <ul
            id="main-menu"
            className={`m-0 flex list-none gap-1 p-0 max-nav:absolute max-nav:top-[72px] max-nav:right-0 max-nav:left-0 max-nav:flex-col max-nav:border-b max-nav:border-line max-nav:bg-mist max-nav:px-5 max-nav:pt-3 max-nav:pb-5 ${
              open ? "" : "max-nav:hidden"
            }`}
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-3.5 py-2 text-[15px] font-bold no-underline ${
                      active ? "bg-ruby text-white" : "text-ink hover:bg-blush-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
