import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { KeyFactsPanel, ConsiderationGrid, PlacePhoto } from "@/components/location/LocationBlocks";
import { GEO_FACTS_DATE, LocationContext } from "@/lib/geo-facts";
import { buildMarketBrief } from "@/lib/solution-location-content";

// Localised context block (photo, facts, requirements) shared by service,
// industry and /en-xx pages so every country and city page carries the same
// real, place-specific signals as the solution pages.
export function LocalMarketSection({
  ctx,
  placeName,
  countryName,
  topic,
  isCity = false,
  fallbackImage,
}: {
  ctx: LocationContext;
  placeName: string;
  countryName: string;
  topic: string;
  isCity?: boolean;
  fallbackImage?: { src: string; alt: string };
}) {
  const brief = buildMarketBrief(ctx, placeName, countryName, topic, isCity);
  const photo =
    isCity && ctx.city?.image
      ? { src: ctx.city.image, alt: `${placeName}, ${countryName}`, width: ctx.city.imageWidth, height: ctx.city.imageHeight, commonsFile: ctx.city.imageFile }
      : ctx.country?.image
        ? { src: ctx.country.image, alt: ctx.country.imageCaption && ctx.country.imageCaption !== countryName ? `${ctx.country.imageCaption}, ${countryName}` : countryName, width: ctx.country.imageWidth, height: ctx.country.imageHeight, commonsFile: ctx.country.imageFile }
        : fallbackImage;
  return (
    <section id="local-context" className="border-t border-border py-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Localised for your market"
              title={`${topic} in ${placeName}: local requirements we build for`}
              description="Currency, tax, payments, data protection and 24/7 support — planned into the project from the first sprint."
            />
            {photo && (
              <div className="mt-8">
                <PlacePhoto {...photo} />
              </div>
            )}
          </div>
          <KeyFactsPanel
            title={`${placeName} at a glance`}
            facts={brief.keyFacts}
            source={`Population and currency from Wikidata; time zones from the IANA tz database (checked ${GEO_FACTS_DATE}). Tax rates are standard headline rates — confirm with a local advisor.`}
          />
        </div>
        <div className="mt-10">
          <ConsiderationGrid items={brief.considerations} />
        </div>
      </Container>
    </section>
  );
}
