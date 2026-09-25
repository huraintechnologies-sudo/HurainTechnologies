// Claims we cannot back with real, verifiable data. Self-declared ratings,
// reviews, awards, certifications and memberships violate Google's
// structured-data guidelines (and can trigger a manual action), so they are
// stripped from every schema object before it is published — even if an
// older generator still emits them. Add a real value here only once it is
// verifiable (e.g. reviews collected on a third-party platform).
const UNVERIFIED_KEYS = new Set(["aggregateRating", "review", "award", "certification", "memberOf", "subOrganization"]);
const UNVERIFIED_TYPES = new Set(["AggregateRating", "Review"]);

function sanitize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitize).filter((v) => v !== undefined);
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj["@type"] === "string" && UNVERIFIED_TYPES.has(obj["@type"])) return undefined;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (UNVERIFIED_KEYS.has(k)) continue;
      const clean = sanitize(v);
      if (clean !== undefined) out[k] = clean;
    }
    return out;
  }
  return value;
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(sanitize(data)) }}
    />
  );
}
