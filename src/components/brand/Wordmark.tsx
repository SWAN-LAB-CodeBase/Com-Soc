import { event } from "@/content/event";
import styles from "./Wordmark.module.css";

/**
 * "Rural" in ink, "Connect" in deep teal, and the year as a small blue tag.
 * Split from the configured short name, so it follows any rename.
 */
export function Wordmark({
  size = "small",
  showYear = true,
}: {
  size?: "small" | "medium" | "large";
  showYear?: boolean;
}) {
  const { shortName, name } = event.identity;
  const [, first = shortName, second = ""] = shortName.match(/^(.+?)([A-Z].*)$/) ?? [];
  const year = name.replace(shortName, "").trim();

  return (
    <span className={styles.wordmark} data-size={size}>
      <span className={styles.first}>{first}</span>
      <span className={styles.second}>{second}</span>
      {showYear && year && (
        <>
          <span className="visually-hidden"> </span>
          <span className={styles.year}>{year}</span>
        </>
      )}
    </span>
  );
}
