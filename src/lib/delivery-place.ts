// Place-specific delivery details for the "How we deliver" and support
// sections: time-zone overlap with our team in India, when the daily update
// lands in the client's day, and the local market facts (payments, privacy
// law, regulator, language, currency, dominant mobile platform) that change
// how a project is built there.

import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { locationContext, utcOffsetMinutes, formatUtcOffset } from "@/lib/geo-facts";
import type { Track } from "@/lib/delivery-plan";

export interface PlaceNote {
  title: string;
  body: string;
}

export interface PlaceDelivery {
  label: string; // "London, United Kingdom"
  short: string; // "London"
  offsetLabel: string | null; // "UTC+1"
  diffLabel: string | null; // "India (IST) is 4h 30m ahead"
  dailyUpdateAt: string | null; // "2:30 PM" in the client's time zone
  overlapHours: number | null; // shared working hours per weekday
  privacyLaw?: string;
  regulator?: string;
  notes: PlaceNote[];
}

const TEAM_TZ = "Asia/Kolkata";
const TEAM_DAY = [10, 19]; // our working day in IST
const CLIENT_DAY = [9, 18]; // typical client working day, local time

function clockLabel(hours: number): string {
  const h = ((hours % 24) + 24) % 24;
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const suffix = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ":00"} ${suffix}`;
}

const byName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export function placeDeliveryFor(place: string | undefined, track: Track): PlaceDelivery | null {
  if (!place) return null;
  const parts = place.split(",").map((p) => p.trim());
  const countryName = parts[parts.length - 1];
  const cityName = parts.length > 1 ? parts[0] : undefined;

  const country = countries.find((c) => byName(c.countryName, countryName));
  if (!country) return null;
  const city = cityName ? cities.find((c) => c.countrySlug === country.slug && byName(c.cityName, cityName)) : undefined;
  const ctx = locationContext(country.slug, city?.slug.split("/").pop());
  const tz = ctx.city?.timezone || ctx.country?.timezone || null;
  const m = ctx.market;

  let dailyUpdateAt: string | null = null;
  let overlapHours: number | null = null;
  if (tz) {
    // Hours India is ahead of the client.
    const ahead = (utcOffsetMinutes(TEAM_TZ) - utcOffsetMinutes(tz)) / 60;
    dailyUpdateAt = clockLabel(TEAM_DAY[1] - ahead);
    const start = Math.max(TEAM_DAY[0], CLIENT_DAY[0] + ahead);
    const end = Math.min(TEAM_DAY[1], CLIENT_DAY[1] + ahead);
    overlapHours = Math.max(0, Math.round((end - start) * 2) / 2);
  }

  const short = cityName || countryName;
  const notes: PlaceNote[] = [];
  const showPayments = track === "app" || track === "payments" || track === "api";
  const showRegulator = track === "payments" || track === "blockchain" || track === "security" || track === "api";

  if (showPayments && m.payments?.length) {
    notes.push({ title: "Local payments", body: `${m.payments.slice(0, 4).join(", ")} — integrated and tested as part of the build.` });
  }
  if (m.privacyLaw) {
    notes.push({ title: "Data protection", body: `Data handling, consent and retention designed for ${m.privacyLaw}.` });
  }
  if (showRegulator && m.regulator) {
    notes.push({ title: "Regulator", body: `Controls, reports and audit trails prepared with ${m.regulator} expectations in mind, alongside your local counsel.` });
  }
  const languages = m.businessLanguage || ctx.country?.languages?.slice(0, 2).join(" and ");
  const currency = ctx.country?.currency;
  if (languages || currency) {
    const bits = [
      languages ? `${languages} interfaces and content` : null,
      currency ? `${currency.code} pricing, invoices and number formats` : null,
    ].filter(Boolean);
    notes.push({ title: "Language & currency", body: `${bits.join(", ")}.` });
  }
  if (track === "app" && m.mobile) {
    const body =
      m.mobile === "android"
        ? `Most users in ${countryName} are on Android, so testing prioritises the popular Android devices and low-bandwidth networks.`
        : m.mobile === "ios"
          ? `iPhone has a large share in ${countryName}, so iOS polish and App Store review come first — Android is built alongside.`
          : `${countryName} is split between iOS and Android, so both platforms are designed and tested with equal priority.`;
    notes.push({ title: "Mobile platforms", body });
  }
  if (track === "cloud" || track === "database") {
    notes.push({ title: "Data residency", body: `Hosting region and backups chosen to keep ${countryName} data where your regulators and customers expect it.` });
  }
  if (tz) {
    notes.push({
      title: "Time zone",
      body: `${short} is on ${formatUtcOffset(utcOffsetMinutes(tz))}; ${ctx.overlap?.diffLabel ?? ""}. Calls, demos and sign-offs are scheduled in your business hours.`,
    });
  }

  return {
    label: place,
    short,
    offsetLabel: tz ? formatUtcOffset(utcOffsetMinutes(tz)) : null,
    diffLabel: ctx.overlap?.diffLabel ?? null,
    dailyUpdateAt,
    overlapHours,
    privacyLaw: m.privacyLaw,
    regulator: m.regulator,
    notes,
  };
}
