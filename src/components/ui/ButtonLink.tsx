import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";
type Size = "small" | "medium" | "large";

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with safe rel attributes and an announced hint. */
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "medium",
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], size !== "medium" && styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <ExternalIcon />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}

function ExternalIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 3h8v8M13 3 3.5 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
