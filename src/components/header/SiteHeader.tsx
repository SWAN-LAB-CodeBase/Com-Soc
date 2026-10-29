"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { NavItem } from "@/content/types";
import styles from "./SiteHeader.module.css";

interface SiteHeaderProps {
  nav: readonly NavItem[];
  applyHref: string;
  applyExternal?: boolean;
}

export function SiteHeader({
  nav,
  applyHref,
  applyExternal = false,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Material thickens once content scrolls beneath the bar.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Escape, outside pointer and focus leaving the header all dismiss the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close(false);
    };
    const onFocus = (e: FocusEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open, close]);

  // Close if the viewport grows into the desktop layout while open.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64em)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={styles.header}
        data-scrolled={scrolled || undefined}
        data-open={open || undefined}
      >
        <div className={styles.bar}>
          <a
            href="#top"
            className={styles.brand}
            aria-label="RuralConnect — home"
            onClick={() => setOpen(false)}
          >
            <BrandMark size={41} />
          </a>

          <nav aria-label="Primary" className={styles.desktopNav}>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} data-label={item.label}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ButtonLink
              href={applyHref}
              external={applyExternal}
              size="small"
              className={styles.apply}
            >
              <span>
                Apply<span className={styles.wideOnly}> for the ideathon</span>
              </span>
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
              <span className={styles.toggleIcon} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div id={panelId} className={styles.panel} inert={!open} aria-hidden={!open}>
          <nav aria-label="Mobile">
            <ul className={styles.panelList}>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} data-label={item.label} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.panelActions}>
            <ButtonLink
              href={applyHref}
              external={applyExternal}
              onClick={() => setOpen(false)}
            >
              Apply for the ideathon
            </ButtonLink>
          </div>
        </div>
      </header>
      {/* Outside the header, so a tap here counts as an outside pointer and dismisses. */}
      <div className={styles.scrim} data-open={open || undefined} aria-hidden="true" />
    </>
  );
}
