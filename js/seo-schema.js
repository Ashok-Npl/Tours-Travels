/**
 * Wanderlux Tours & Travels - SEO Schema.org JSON-LD Generator
 * Injects structured schema markup for TravelAgency, WebSite, TouristTrip, and FAQPage.
 */

function generateAndInjectSEOData() {
  const currentUrl = window.location.origin + window.location.pathname;

  // 1. Travel Agency Organization Schema
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${currentUrl}#travelagency`,
    "name": "Wanderlux Luxury Tours & Travels",
    "alternateName": "Wanderlux Expeditions",
    "legalName": "Wanderlux Curated Journeys Ltd.",
    "url": currentUrl,
    "logo": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "description": "Award-winning bespoke luxury tour operator crafting customized global vacations, private safaris, Mediterranean yachting, and cultural expeditions.",
    "telephone": "+1-800-926-3375",
    "email": "concierge@wanderluxjourneys.com",
    "priceRange": "$$$$",
    "currenciesAccepted": "USD, EUR, GBP, AUD, CAD, INR",
    "paymentAccepted": "Credit Card, Bank Wire, Apple Pay, Amex, PayPal",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "75 Rockefeller Plaza, Suite 1800",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10019",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7590,
      "longitude": -73.9780
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.96",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "4850",
      "reviewCount": "4850"
    },
    "sameAs": [
      "https://www.facebook.com/wanderluxtravel",
      "https://www.instagram.com/wanderluxtravel",
      "https://www.twitter.com/wanderluxtravel",
      "https://www.linkedin.com/company/wanderlux-travel",
      "https://www.youtube.com/@wanderluxtravel"
    ]
  };

  // 2. FAQ Page Schema (Boosts Google SERP Rich Accordions)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": travelData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // 3. Featured Tourist Trips Schema
  const toursItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": travelData.packages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristTrip",
        "name": pkg.title,
        "description": pkg.overview,
        "touristType": pkg.category,
        "offers": {
          "@type": "Offer",
          "price": pkg.currentPriceUSD,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01"
        },
        "provider": {
          "@id": `${currentUrl}#travelagency`
        }
      }
    }))
  };

  // Append JSON-LD script tags to document head
  const schemas = [travelAgencySchema, faqSchema, toursItemListSchema];
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Auto-run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateAndInjectSEOData);
} else {
  generateAndInjectSEOData();
}
