# 🌍 Wanderlux | Modern Luxury Tours & Travels Website

An ultra-modern, high-converting, fully responsive, and SEO-optimized **Tours & Travels Website Home Page** built with **Tailwind CSS**, vanilla JavaScript, Swiper.js, and Schema.org structured data.

Designed for luxury tour operators, travel agencies, expedition organizers, and bespoke vacation curators.

---

## 🌟 Key Features & Highlights

### 1. 🔍 Interactive Smart Search Engine Booking Bar
- **Tabbed Experience Selectors**: Quick toggle between *Curated Tours*, *Luxury Stays & Villas*, *Private Charters*, and *Custom Itineraries*.
- **Live Destination Autocomplete**: Real-time dropdown search as you type, showcasing thumbnails, regions, and starting prices.
- **Departure Date Picker**: Integrated travel date selector.
- **Dynamic Guests & Rooms Counter**: Interactive counter modal for Adults and Children.
- **Budget Range Slider**: Live filtering of destinations based on maximum budget per traveler.

### 2. 💱 Real-Time Dynamic Multi-Currency Converter
- Instantly toggles prices across all destination cards, tour packages, trip calculators, and booking modals.
- Supported currencies: **USD ($)**, **EUR (€)**, **GBP (£)**, **AUD (A$)**, **INR (₹)**, and **CAD (C$)**.

### 3. 🏖️ Handpicked & Filterable Destinations Grid
- Category filter chips (*All*, *Europe*, *Asia*, *Africa*, *Americas*, *Arctic*).
- Live weather and best season indicators (*e.g. 26°C Sunny • Best: May - Oct*).
- Interactive Wishlist heart button with feedback toasts.
- **Full Destination Modal**: High-res imagery, curated excursions, climate details, and direct reservation triggers.

### 4. 🧭 Signature Curated Tour Packages (Swipeable Carousel)
- Built with **Swiper.js** for smooth touch and swipe gestures on mobile and desktop.
- Comprehensive package badges (*Signature Tour*, *Eco-Luxury*, *Popular*).
- Day-by-day roadmap modal preview showcasing detailed daily itineraries and luxury inclusions.

### 5. 💰 Live Interactive Trip Cost Estimator
- Allows prospective clients to customize:
  - Destination
  - Travel Tier (*Comfort Luxury*, *Signature Luxury*, *Ultra-Bespoke*)
  - Trip Duration (*5 to 21 Days*)
  - Number of Guests (*Solo, Couples, Families, Charters*)
- Instant calculation of total investment and per-person cost.
- **"Request Custom Proposal PDF"** lead generation button with celebratory confetti!

### 6. 📱 100% Responsive & Glassmorphic UI
- Built with Tailwind CSS utility classes and modern glassmorphic styling (`backdrop-blur-md`, subtle border glows, gradient glass).
- Mobile slide-over navigation drawer with dedicated currency selector and direct concierge contact.
- Sticky navbar that responds dynamically to scrolling.

### 7. 🎬 Cinematic Video Experience Reel Modal
- Interactive video popup showcasing travel moments (Arctic aurora, hot air balloons over Serengeti, Amalfi sailing).

### 8. 💬 Social Proof & Verified Reviews
- Swiper testimonial slider featuring verified luxury travelers with trip destinations, dates, and star ratings.
- Integrated **Trustpilot 4.96/5** verified rating badge.

### 9. 🚀 SEO Optimization & Google Rich Snippets
- **Semantic HTML5 Architecture**: Proper `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` layout.
- **Hierarchy of Headings**: Single semantic `<h1>`, descriptive `<h2>` sections, and structured `<h3>`/`<h4>` cards.
- **Schema.org Structured Data (JSON-LD)** dynamically injected:
  - `TravelAgency` / `Organization` with contact points, geographic coordinates, opening hours, and aggregate rating.
  - `FAQPage` schema markup for instant Google Search SERP expandable dropdowns.
  - `ItemList` of `TouristTrip` for featured tour packages.
- **Comprehensive Meta Tags**: Open Graph (Facebook/LinkedIn) and Twitter Cards for social sharing.
- Optimized Unsplash imagery with descriptive `alt` tags and lazy loading.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5 & Semantic Markup** | High SEO performance and accessibility standards |
| **Tailwind CSS (Play CDN)** | Modern styling, fluid typography, dark luxury palette |
| **Vanilla JavaScript (ES6+)** | Lightweight, zero-dependency, lightning-fast interactivity |
| **Swiper.js 11** | Mobile-touch responsive sliders for packages and testimonials |
| **AOS (Animate on Scroll)** | Silky-smooth entry transitions and animations |
| **FontAwesome 6.5 & Google Fonts** | Vector icons & Google Fonts (*Plus Jakarta Sans* & *Playfair Display*) |
| **Canvas-Confetti** | Delightful visual feedback upon booking and newsletter actions |
| **Schema.org (JSON-LD)** | Structured data for search engine rich snippets |

---

## 📂 Project Structure

```text
Tours&Travels/
│
├── index.html               # Main responsive homepage with all sections
├── package.json             # NPM metadata and convenience scripts
├── README.md                # Comprehensive documentation
│
├── css/
│   └── style.css            # Custom animations, glassmorphism, scrollbars
│
├── js/
│   ├── app.js               # Application logic (search, filters, modals, calculator)
│   ├── data.js              # Central data repository (destinations, packages, reviews, FAQs)
│   └── seo-schema.js        # Dynamic Schema.org JSON-LD structured data generator
│
└── assets/
    └── images/              # Local icons, favicons, and graphic assets
```

---

## 🚀 How to Run & Preview

### Option 1: Direct Browser Launch (Zero Installation Required!)
Simply double-click `index.html` or drag it into any web browser (**Google Chrome**, **Microsoft Edge**, **Mozilla Firefox**, or **Safari**). Everything will render cleanly without requiring a build step or server.

### Option 2: Using the Included NPM Scripts
If you have Node.js installed:

```bash
# Start a local static server
npm start
```
or
```bash
npx serve .
```

Then open `http://localhost:3000` (or the port specified in terminal) in your browser.

---

## ⚙️ Customization Guide

### 1. Adding or Modifying Destinations
Open [`js/data.js`](file:///c:/Users/wd0as/OneDrive/Desktop/Tours&Travels/js/data.js) and update the `destinations` array:
```javascript
{
  id: 'your-destination-id',
  name: 'Destination Name',
  country: 'Country',
  region: 'Europe' | 'Asia' | 'Africa' | 'Americas' | 'Arctic',
  badge: 'Best Seller',
  badgeColor: 'bg-emerald-500',
  rating: 4.95,
  reviewsCount: 310,
  priceUSD: 1950,
  duration: '8 Days / 7 Nights',
  weather: '24°C Sunny',
  bestSeason: 'Apr - Oct',
  image: 'https://images.unsplash.com/...',
  description: 'Your enticing description here...',
  highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3']
}
```

### 2. Updating Contact Information & Hotline
- Change the phone number in `index.html`: search for `+1 (800) 926-3375`.
- Change the WhatsApp link in `index.html`: search for `https://wa.me/18009263375`.
- Change the email: search for `concierge@wanderluxjourneys.com`.

### 3. Updating Currency Conversion Rates
Open [`js/data.js`](file:///c:/Users/wd0as/OneDrive/Desktop/Tours&Travels/js/data.js) and edit `travelData.currencies`:
```javascript
currencies: {
  USD: { symbol: '$', rate: 1.00, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AUD: { symbol: 'A$', rate: 1.53, label: 'AUD (A$)' },
  INR: { symbol: '₹', rate: 83.50, label: 'INR (₹)' },
  CAD: { symbol: 'C$', rate: 1.36, label: 'CAD (C$)' }
}
```

---

## 📄 License
This project is released under the **MIT License**. Free to customize, rebrand, and deploy for personal and commercial travel businesses.
