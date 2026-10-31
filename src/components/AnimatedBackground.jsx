/**
 * AnimatedBackground — Pure Solid Vermilion Canvas
 * 
 * Clean, bold #F94500 background. Purple (#29004B) is reserved for text only.
 */
export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        background: '#F94500',
        contain: 'strict',
      }}
    />
  );
}
