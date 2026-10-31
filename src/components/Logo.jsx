/**
 * Filter Coffee Co. — Official Trademark Logo Component
 *
 * Exact match to trademark visual identity (media_1793475891575_fc22d402.png):
 * - One continuous horizontal line
 * - Rounded geometric sans-serif typography (Nunito 900 / rounded monolinear terminals)
 * - "FILTER COFFEE" in bold rounded uppercase
 * - "co." in proportional rounded lowercase with circular period at baseline
 */
export default function Logo({
  className = '',
  textColor = 'currentColor',
  size = 'text-xl',
  inline = true,
}) {
  return (
    <span
      className={`${inline ? 'inline-flex' : 'flex'} items-baseline whitespace-nowrap select-none tracking-[-0.015em] ${size} ${className}`}
      style={{
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 900,
        color: textColor,
        lineHeight: 1,
      }}
      aria-label="Filter Coffee co."
    >
      <span className="uppercase font-[900]">
        FILTER COFFEE
      </span>
      <span
        className="font-[900] lowercase ml-[0.2em] relative"
        style={{
          fontSize: '0.62em',
          letterSpacing: '0.02em',
        }}
      >
        co.
      </span>
    </span>
  );
}

