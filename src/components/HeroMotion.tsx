const nodes = [
  { x: 80, y: 90, delay: "0s" },
  { x: 260, y: 40, delay: "0.4s" },
  { x: 420, y: 130, delay: "0.8s" },
  { x: 560, y: 60, delay: "1.2s" },
  { x: 720, y: 160, delay: "0.2s" },
  { x: 180, y: 220, delay: "1.6s" },
  { x: 480, y: 260, delay: "0.6s" },
  { x: 660, y: 300, delay: "1s" },
  { x: 340, y: 320, delay: "1.4s" },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 8], [8, 6], [6, 7], [2, 6], [4, 7],
];

export function HeroMotion({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-grid animate-grid-pan opacity-60" />

      <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-drift-slow" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-drift" />
      <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-primary-2/15 blur-3xl animate-drift-slow" />

      <svg
        viewBox="0 0 800 360"
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="var(--primary)" strokeWidth="1" fill="none">
          {edges.map(([a, b], i) => {
            const from = nodes[a];
            const to = nodes[b];
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="network-line"
                style={{ animationDelay: from.delay }}
              />
            );
          })}
        </g>
        <g fill="var(--primary)">
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="2.6"
              className="network-node"
              style={{ animationDelay: node.delay }}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
