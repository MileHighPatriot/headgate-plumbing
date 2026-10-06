import { areas } from "@/data/areas";
import { site } from "@/data/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
    areaServed: areas.map((a) => ({ "@type": "City", name: `${a.city}, CO` })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
