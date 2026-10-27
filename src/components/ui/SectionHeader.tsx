import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
}

/** Eyebrow, display heading and optional lede, shared by every section. */
export function SectionHeader({ id, eyebrow, title, lede, align = "start" }: SectionHeaderProps) {
  return (
    <header className={styles.header} data-align={align} data-reveal>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
