import styles from "./Hero.module.css";

type ThemeId = "ai" | "rural" | "youth" | "wireless" | "innovation";

type ThemeChip = {
  id: ThemeId;
  label: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
};

const THEMES: ThemeChip[] = [
  { id: "ai", label: "AI & ML", top: "14%", left: "72%", delay: "0s", duration: "9s" },
  { id: "wireless", label: "Wireless", top: "9%", left: "48%", delay: "1.2s", duration: "8s" },
  { id: "youth", label: "Youth empowerment", top: "40%", left: "68%", delay: "0.6s", duration: "10s" },
  { id: "rural", label: "Rural communities", top: "70%", left: "70%", delay: "1.8s", duration: "11s" },
  { id: "innovation", label: "Innovation", top: "86%", left: "40%", delay: "2.4s", duration: "9.5s" },
];

const ICONS: Record<ThemeId, React.ReactNode> = {
  ai: (
    <>
      <path d="M9 4h6a3 3 0 0 1 3 3v2a3 3 0 0 1 3 3 3 3 0 0 1-3 3v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-2a3 3 0 0 1-3-3 3 3 0 0 1 3-3V7a3 3 0 0 1 3-3z" />
      <circle cx="9.5" cy="10" r="1" />
      <circle cx="14.5" cy="10" r="1" />
      <path d="M9 14h6" />
    </>
  ),
  wireless: (
    <>
      <path d="M4 11a10 10 0 0 1 16 0" />
      <path d="M7 14.5a6 6 0 0 1 10 0" />
      <path d="M10 18a2.5 2.5 0 0 1 4 0" />
      <circle cx="12" cy="20" r="1" />
    </>
  ),
  youth: (
    <>
      <path d="M3 9l9-4 9 4-9 4-9-4z" />
      <path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" />
      <path d="M21 9v4" />
    </>
  ),
  rural: (
    <>
      <path d="M3 20V11l6-5 6 5v9" />
      <path d="M15 20V13l5-4v11" />
      <path d="M3 20h18" />
      <path d="M9 20v-4h3v4" />
    </>
  ),
  innovation: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.9.9 1.3 1.5 1.5 2.5h5c.2-1 .6-1.6 1.5-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
};

export function HeroThemes() {
  return (
    <div className={styles.themes} aria-hidden="true">
      {THEMES.map((theme) => (
        <span
          key={theme.id}
          className={styles.themeChip}
          style={{
            top: theme.top,
            left: theme.left,
            animationDelay: theme.delay,
            animationDuration: theme.duration,
          }}
        >
          <span className={styles.themeIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[theme.id]}
            </svg>
          </span>
          <span className={styles.themeLabel}>{theme.label}</span>
          <span className={styles.themePulse} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}
