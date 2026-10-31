import styles from "./Hero.module.css";

/**
 * Network links drawn over the hero photograph, in the photo's own pixel
 * space (1920 × 1098). `preserveAspectRatio="xMidYMid slice"` crops exactly
 * like the photo's `object-fit: cover`, so the links stay anchored to the
 * tower antenna at every viewport size.
 */

const TOWER = { x: 1240, y: 365 };

const LINKS = [
  {
    id: "hero-link-a",
    to: { x: 560, y: 540 },
    via: { x: 960, y: 320 },
    dur: "3.4s",
    begin: "2.2s",
  },
  { id: "hero-link-b", to: { x: 300, y: 240 }, via: { x: 780, y: 230 }, dur: "3s", begin: "2.8s" },
  {
    id: "hero-link-c",
    to: { x: 1760, y: 820 },
    via: { x: 1620, y: 600 },
    dur: "4.2s",
    begin: "3.5s",
  },
] as const;

export function HeroNetwork() {
  return (
    <svg
      className={styles.network}
      viewBox="0 0 1920 1098"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {LINKS.map((link) => {
        const d = `M${TOWER.x} ${TOWER.y}Q${link.via.x} ${link.via.y} ${link.to.x} ${link.to.y}`;
        return (
          <g key={link.id}>
            <path d={d} className={styles.linkGlow} pathLength={1} />
            <path id={link.id} d={d} className={styles.link} pathLength={1} />
            <circle cx={link.to.x} cy={link.to.y} r="16" className={styles.nodeHalo} />
            <circle cx={link.to.x} cy={link.to.y} r="5.5" className={styles.nodeCore} />
            {/* A data packet travelling the link; hidden for reduced motion. */}
            <circle r="4" className={styles.packet}>
              <animateMotion
                dur={link.dur}
                begin={link.begin}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#${link.id}`} />
              </animateMotion>
            </circle>
          </g>
        );
      })}
      {/* Radio waves pulsing out from the antenna; hidden for reduced motion. */}
      <g className={styles.waves}>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={TOWER.x} cy={TOWER.y} r="28" className={styles.wave} />
        ))}
      </g>
      <circle cx={TOWER.x} cy={TOWER.y} r="26" className={styles.towerHalo} />
      <circle cx={TOWER.x} cy={TOWER.y} r="7" className={styles.nodeCore} />
    </svg>
  );
}
