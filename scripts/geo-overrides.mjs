// Manual corrections applied on top of Wikidata by fetch-geo-facts.mjs.
// Wikidata's "official language" and "currency" claims are sometimes
// technically true but wrong for a business audience (e.g. the US lists
// Hawaiian and Samoan; euro countries return no ISO code; the Netherlands
// returns USD because of Caribbean Netherlands).

const EUR = { code: "EUR", name: "Euro" };
const euro = ["AD", "AT", "AX", "BE", "BG", "CY", "DE", "EE", "ES", "FI", "FR", "GF", "GP", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MC", "ME", "MQ", "MT", "NL", "PM", "PT", "RE", "SI", "SK", "SM", "VA", "XK"];

export const currencyOverrides = {
  ...Object.fromEntries(euro.map((c) => [c, EUR])),
  CZ: { code: "CZK", name: "Czech koruna" },
  PL: { code: "PLN", name: "Polish złoty" },
  DK: { code: "DKK", name: "Danish krone" },
  FO: { code: "DKK", name: "Danish krone" },
  IM: { code: "GBP", name: "Pound sterling" },
  MO: { code: "MOP", name: "Macanese pataca" },
  CW: { code: "XCG", name: "Caribbean guilder" },
  MA: { code: "MAD", name: "Moroccan dirham" },
  PA: { code: "PAB", name: "Panamanian balboa (USD also legal tender)" },
  VN: { code: "VND", name: "Vietnamese đồng" },
  TZ: { code: "TZS", name: "Tanzanian shilling" },
  HK: { code: "HKD", name: "Hong Kong dollar" },
  ZW: { code: "ZWG", name: "Zimbabwe Gold (USD widely used)" },
  UY: { code: "UYU", name: "Uruguayan peso" },
};

export const languageOverrides = {
  US: ["English", "Spanish"],
  ZA: ["English", "Afrikaans", "isiZulu", "isiXhosa"],
  ZW: ["English", "Shona", "Ndebele"],
  MX: ["Spanish"],
  PE: ["Spanish", "Quechua"],
  EC: ["Spanish"],
  BO: ["Spanish", "Quechua", "Aymara"],
  PY: ["Spanish", "Guarani"],
  UY: ["Spanish"],
  PA: ["Spanish"],
  SN: ["French", "Wolof"],
  BF: ["French", "Mooré"],
  NE: ["French", "Hausa"],
  GN: ["French"],
  MW: ["English", "Chichewa"],
  BN: ["Malay", "English"],
  FK: ["English"],
  GI: ["English"],
  JE: ["English"],
  IE: ["English", "Irish"],
  NZ: ["English", "Māori"],
  SG: ["English", "Mandarin", "Malay", "Tamil"],
  CH: ["German", "French", "Italian"],
  NO: ["Norwegian"],
  PH: ["Filipino", "English"],
  DZ: ["Arabic", "French", "Tamazight"],
  MA: ["Arabic", "French", "Tamazight"],
  IQ: ["Arabic", "Kurdish"],
  GP: ["French"],
  MQ: ["French"],
  CY: ["Greek", "Turkish", "English"],
  VN: ["Vietnamese"],
  TZ: ["Swahili", "English"],
  HK: ["Cantonese", "English", "Mandarin"],
  MO: ["Cantonese", "Portuguese"],
  CW: ["Papiamentu", "Dutch", "English"],
  FI: ["Finnish", "Swedish"],
  LU: ["Luxembourgish", "French", "German"],
  BE: ["Dutch", "French", "German"],
  FJ: ["English", "Fijian", "Fiji Hindi"],
  IN: ["Hindi", "English"],
  BB: ["English"],
  JM: ["English"],
  GD: ["English"],
  KE: ["English", "Swahili"],
};

export const capitalOverrides = {
  NO: "Oslo",
  CW: "Willemstad",
  CY: "Nicosia",
  MA: "Rabat",
  PA: "Panama City",
  VN: "Hanoi",
  TZ: "Dodoma",
  AG: "St. John's",
  HK: null,
};

export function applyOverrides(country) {
  const c = country.code;
  if (!c) return country;
  if (currencyOverrides[c]) country.currency = currencyOverrides[c];
  if (languageOverrides[c]) country.languages = languageOverrides[c];
  if (c in capitalOverrides) country.capital = capitalOverrides[c];
  // Wikidata occasionally returns ISO 4217 numeric codes or obsolete codes.
  if (country.currency && !/^[A-Z]{3}$/.test(country.currency.code)) country.currency = null;
  return country;
}
