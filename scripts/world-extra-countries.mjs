// Countries that are not in the site-wide country list (src/lib/geo.ts) but
// are covered by world-coverage solutions such as Remote DBA Services.
// Kept out of geo.ts on purpose: adding them there would create /en-xx hubs
// and geo-redirects for markets the rest of the site does not serve.
export const WORLD_EXTRA_COUNTRIES = {
  CN: { slug: "china", name: "China" },
  JP: { slug: "japan", name: "Japan" },
  PK: { slug: "pakistan", name: "Pakistan" },
  IL: { slug: "israel", name: "Israel" },
  TW: { slug: "taiwan", name: "Taiwan" },
  CD: { slug: "democratic-republic-of-the-congo", name: "DR Congo" },
  AO: { slug: "angola", name: "Angola" },
  ET: { slug: "ethiopia", name: "Ethiopia" },
  SD: { slug: "sudan", name: "Sudan" },
  SY: { slug: "syria", name: "Syria" },
  AF: { slug: "afghanistan", name: "Afghanistan" },
  ML: { slug: "mali", name: "Mali" },
  TN: { slug: "tunisia", name: "Tunisia" },
  SO: { slug: "somalia", name: "Somalia" },
  LY: { slug: "libya", name: "Libya" },
  HT: { slug: "haiti", name: "Haiti" },
  KH: { slug: "cambodia", name: "Cambodia" },
  BJ: { slug: "benin", name: "Benin" },
  TG: { slug: "togo", name: "Togo" },
  XK: { slug: "kosovo", name: "Kosovo" },
  DJ: { slug: "djibouti", name: "Djibouti" },
  BZ: { slug: "belize", name: "Belize" },
};
