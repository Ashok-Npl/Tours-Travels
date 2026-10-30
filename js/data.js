/**
 * Wanderlux Tours & Travels - Master Data Store
 * Structured data for destinations, curated tour packages, reviews, FAQs, and blog articles.
 */

const travelData = {
  // Available currency rates relative to USD
  currencies: {
    USD: { symbol: '$', rate: 1.00, label: 'USD ($)' },
    EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
    GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
    AUD: { symbol: 'A$', rate: 1.53, label: 'AUD (A$)' },
    INR: { symbol: '₹', rate: 83.50, label: 'INR (₹)' },
    CAD: { symbol: 'C$', rate: 1.36, label: 'CAD (C$)' }
  },

  currentCurrency: 'USD',

  // Curated Destinations
  destinations: [
    {
      id: 'santorini-greece',
      name: 'Santorini & Cyclades',
      country: 'Greece',
      region: 'Europe',
      badge: 'Best Seller',
      badgeColor: 'bg-emerald-500 shadow-emerald-500/30',
      rating: 4.96,
      reviewsCount: 428,
      priceUSD: 1899,
      duration: '7 Days / 6 Nights',
      weather: '26°C Sunny',
      bestSeason: 'May - Oct',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      description: 'Iconic whitewashed caldera cliffside villas, azure Aegean waters, and world-renowned sunset catamaran sailing.',
      highlights: ['Private Sunset Catamaran in Oia', 'Wine Tasting in Pyrgos', 'Akrotiri Archaeological Private Tour', '5-Star Cliffside Suite with Plunge Pool']
    },
    {
      id: 'kyoto-japan',
      name: 'Kyoto, Tokyo & Mt. Fuji',
      country: 'Japan',
      region: 'Asia',
      badge: 'Cultural Wonder',
      badgeColor: 'bg-rose-500 shadow-rose-500/30',
      rating: 4.98,
      reviewsCount: 512,
      priceUSD: 2450,
      duration: '10 Days / 9 Nights',
      weather: '19°C Pleasant',
      bestSeason: 'Mar - May & Oct - Nov',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      description: 'Centuries-old bamboo groves, tranquil Zen shrines, Michelin-starred kaiseki dining, and bullet train journeys across Japan.',
      highlights: ['Tea Ceremony with Geiko Master', 'First-Class Shinkansen Passes', 'Ryokan Stay with Private Onsen', 'Private Fuji Helicoper Flight']
    },
    {
      id: 'serengeti-tanzania',
      name: 'Serengeti & Ngorongoro Crater',
      country: 'Tanzania',
      region: 'Africa',
      badge: 'Bucket List',
      badgeColor: 'bg-amber-500 shadow-amber-500/30',
      rating: 4.99,
      reviewsCount: 389,
      priceUSD: 3200,
      duration: '8 Days / 7 Nights',
      weather: '28°C Safari Warmth',
      bestSeason: 'Jun - Oct',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      description: 'Witness the iconic Great Wildebeest Migration, the Big Five, and drift in a sunrise hot air balloon over endless savannah.',
      highlights: ['Sunrise Hot Air Balloon Safari', 'Four Seasons Safari Lodge Serengeti', 'Private 4x4 Land Cruiser with Master Tracker', 'Bush Champagne Breakfast']
    },
    {
      id: 'amalfi-italy',
      name: 'Amalfi Coast, Capri & Positano',
      country: 'Italy',
      region: 'Europe',
      badge: 'Romantic Getaway',
      badgeColor: 'bg-sky-500 shadow-sky-500/30',
      rating: 4.95,
      reviewsCount: 310,
      priceUSD: 2150,
      duration: '8 Days / 7 Nights',
      weather: '25°C Coastal Breeze',
      bestSeason: 'Apr - Oct',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      description: 'Limoncello groves clinging to rugged cliffs, historic pastel fishing hamlets, and private Riva yacht excursions to Capri.',
      highlights: ['Private Riva Yacht Day in Capri & Blue Grotto', 'Ravello Villa Cimbrone Gardens Access', 'Private Cooking Class with Italian Nonna', 'Vintage Alfa Romeo Coastal Tour']
    },
    {
      id: 'swiss-alps-switzerland',
      name: 'Zermatt, Matterhorn & Glacier Express',
      country: 'Switzerland',
      region: 'Europe',
      badge: 'Alpine Luxury',
      badgeColor: 'bg-indigo-500 shadow-indigo-500/30',
      rating: 4.97,
      reviewsCount: 440,
      priceUSD: 2890,
      duration: '9 Days / 8 Nights',
      weather: '16°C Crisp Alpine',
      bestSeason: 'Year Round (Ski / Hike)',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      description: 'Panorama Excellence Class scenic railways, snow-capped Matterhorn peaks, fondue alpine chalets, and pristine glacial lakes.',
      highlights: ['Glacier Express Excellence Class Cabin', 'Gornergrat Cogwheel Train to Matterhorn View', '5-Star Omnia Alpine Chalet Stay', 'Helicopter Glacier Flyover']
    },
    {
      id: 'bali-indonesia',
      name: 'Bali & Nusa Penida Luxury Sanctuary',
      country: 'Indonesia',
      region: 'Asia',
      badge: 'Tropical Haven',
      badgeColor: 'bg-emerald-600 shadow-emerald-600/30',
      rating: 4.93,
      reviewsCount: 620,
      priceUSD: 1450,
      duration: '9 Days / 8 Nights',
      weather: '29°C Tropical',
      bestSeason: 'Apr - Nov',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      description: 'Lush terraced emerald rice paddies, spiritual Hindu water temples, luxury cliffside villas in Uluwatu, and manta ray diving.',
      highlights: ['Private Pool Villa in Ubud & Uluwatu', 'Sunrise Mount Batur Jeep Safari', 'Manta Point Luxury Catamaran Snorkel', 'Balinese Holistic Spa Rituals']
    },
    {
      id: 'banff-canada',
      name: 'Banff, Jasper & Canadian Rockies',
      country: 'Canada',
      region: 'Americas',
      badge: 'Nature Wilderness',
      badgeColor: 'bg-teal-600 shadow-teal-600/30',
      rating: 4.94,
      reviewsCount: 280,
      priceUSD: 2390,
      duration: '7 Days / 6 Nights',
      weather: '18°C Mountain Fresh',
      bestSeason: 'Jun - Sep & Dec - Mar',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
      description: 'Vibrant turquoise glacial lakes, towering pine forests, Fairmont Chateau stays, and wild grizzly bear watching expeditions.',
      highlights: ['Fairmont Chateau Lake Louise Lakeview Suite', 'Icefields Parkway Athabasca Glacier Walk', 'Private Canoe Expedition on Moraine Lake', 'Night Sky Stargazing with Astronomer']
    },
    {
      id: 'tromso-norway',
      name: 'Tromsø & Lofoten Northern Lights',
      country: 'Norway',
      region: 'Arctic',
      badge: 'Aurora Adventure',
      badgeColor: 'bg-purple-600 shadow-purple-600/30',
      rating: 4.98,
      reviewsCount: 345,
      priceUSD: 2950,
      duration: '7 Days / 6 Nights',
      weather: '-3°C Crisp Winter',
      bestSeason: 'Oct - Mar',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      description: 'Chasing ethereal Aurora Borealis across Arctic fjords, husky sledding through snowdrifts, and sleeping under glass igloos.',
      highlights: ['Aurora Chase with Expert Astrophotographer', 'Husky Sledding & Sami Reindeer Experience', 'Glass Igloo Wilderness Resort Stay', 'Fjord Silent Electric Catamaran Cruise']
    }
  ],

  // Detailed Curated Tour Packages
  packages: [
    {
      id: 'pkg-mediterranean-odyssey',
      title: 'Grand Mediterranean Odyssey: Greece & Italy',
      category: 'Luxury & Culture',
      region: 'Europe',
      duration: '12 Days / 11 Nights',
      groupSize: 'Max 10 Guests (Small Group)',
      difficulty: 'Easy / Leisurely',
      rating: 4.99,
      reviewsCount: 284,
      originalPriceUSD: 3800,
      currentPriceUSD: 3190,
      featured: true,
      badge: 'Signature Tour',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['Luxury 5-Star Boutique Hotels', 'Private High-Speed Catamarans & Ferries', 'Daily Champagne Breakfasts & 4 Michelin Dinners', 'All VIP Entrance Fees & Skip-The-Line Passes', '24/7 Dedicated Local Concierge'],
      overview: 'An unforgettable voyage sweeping across Athens, Santorini, Capri, and the cliffside pastel marvels of Positano. Handcrafted for travelers who crave timeless beauty, world-class gastronomy, and deep historical resonance.',
      itinerary: [
        { day: 'Day 1-3', title: 'Athens Ancient Acropolis & Athenian Riviera', desc: 'Private rooftop welcome gala, sunrise private tour of the Parthenon, and coastal yacht cruise.' },
        { day: 'Day 4-7', title: 'Santorini Caldera & Volcanic Vineyards', desc: 'Clifftop cave villa in Oia, sunset catamaran sailing around volcanic hot springs, and Greek wine masterclass.' },
        { day: 'Day 8-10', title: 'Capri & Blue Grotto by Private Riva Boat', desc: 'Transfer to Naples, helicopter to Capri, sea cavern exploration, and shopping in Anacapri.' },
        { day: 'Day 11-12', title: 'Positano, Amalfi & Departure', desc: 'Scenic cliffside drive, private limoncello orchard walk, and farewell Michelin dining under lemon canopies.' }
      ]
    },
    {
      id: 'pkg-serengeti-luxury-safari',
      title: 'Untamed Serengeti & Zanzibar Beach Sanctuary',
      category: 'Wildlife & Safari',
      region: 'Africa',
      duration: '10 Days / 9 Nights',
      groupSize: 'Max 6 Guests (Private Jeep)',
      difficulty: 'Moderate',
      rating: 4.98,
      reviewsCount: 196,
      originalPriceUSD: 4600,
      currentPriceUSD: 3890,
      featured: true,
      badge: 'Eco-Luxury',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['Luxury Canvas Glamping with Butler Service', 'All Safari Game Drives with Expert Biologist', 'Internal Flights (Kilimanjaro - Serengeti - Zanzibar)', 'Zanzibar 5-Star Overwater Bungalow', 'All National Park Conservation Fees'],
      overview: 'Combine the raw thrill of the African savannah with the barefoot luxury of Zanzibar white sand beaches and turquoise Indian Ocean reefs.',
      itinerary: [
        { day: 'Day 1-2', title: 'Arusha & Tarangire Baobabs', desc: 'Arrival at Kilimanjaro, elephant herd tracking in Tarangire, evening campfire dinner.' },
        { day: 'Day 3-6', title: 'Deep Serengeti & The Great Migration', desc: 'Sunrise hot air balloon safari, daily big cat encounters, luxury tented camp under starlight.' },
        { day: 'Day 7', title: 'Ngorongoro Crater Eden', desc: 'Descend 600m into the ancient caldera, search for rare black rhinos and flamingos.' },
        { day: 'Day 8-10', title: 'Zanzibar Spice Island Oasis', desc: 'Fly to Zanzibar, private spice tour in Stone Town, dhow boat sunset sail, and overwater bungalow retreat.' }
      ]
    },
    {
      id: 'pkg-japan-zen-cherryblossom',
      title: 'Imperial Japan: Cherry Blossoms, Shrines & Shinkansen',
      category: 'Cultural Immersion',
      region: 'Asia',
      duration: '11 Days / 10 Nights',
      groupSize: 'Max 12 Guests',
      difficulty: 'Easy',
      rating: 4.97,
      reviewsCount: 350,
      originalPriceUSD: 3600,
      currentPriceUSD: 2990,
      featured: true,
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['Luxury Tokyo High-Rise & Kyoto Heritage Ryokans', 'Gran Class Shinkansen Bullet Train Passes', 'Private Kyoto Tea Master Ceremony', 'Exclusive Sumo Stable Morning Practice Visit', 'All Luggage Forwarding Between Cities'],
      overview: 'Traverse ultra-modern neon Tokyo, peaceful alpine Takayama, and the ancient imperial temples of Kyoto. Savor authentic culinary mastery at every step.',
      itinerary: [
        { day: 'Day 1-3', title: 'Tokyo: Past Meets Cyberpunk Future', desc: 'Tokyo Skytree private lounge, Meiji Shrine forest stroll, Tsukiji outer market food walk.' },
        { day: 'Day 4-5', title: 'Hakone & Mount Fuji Onsen Escape', desc: 'Traditional kaiseki multi-course dining, therapeutic volcanic hot springs, Lake Ashi pirate ship.' },
        { day: 'Day 6-9', title: 'Kyoto Imperial Capital & Arashiyama', desc: 'Bamboo grove meditation, Golden Pavilion (Kinkaku-ji), Gion evening walk with cultural guide.' },
        { day: 'Day 10-11', title: 'Nara Deer Sanctuary & Osaka Food Crawl', desc: 'Giant Bronze Buddha in Todai-ji, street food exploration in vibrant Dotonbori, departure.' }
      ]
    },
    {
      id: 'pkg-patagonia-wilderness',
      title: 'Wild Patagonia: Glaciers, Torres del Paine & Fjords',
      category: 'Adventure & Trekking',
      region: 'Americas',
      duration: '11 Days / 10 Nights',
      groupSize: 'Max 8 Guests',
      difficulty: 'Challenging / Active',
      rating: 4.96,
      reviewsCount: 165,
      originalPriceUSD: 4200,
      currentPriceUSD: 3550,
      featured: false,
      badge: 'Adventure High',
      image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['Explora Torres del Paine Luxury Lodge', 'Crampon Ice Trekking on Perito Moreno Glacier', 'Private Catamaran Navigation on Lake Pehoé', 'All Mountain Guides & Safety Gear', 'Gourmet Patagonian Asado Wine Dinners'],
      overview: 'Hike among dramatic granite spires, witness thundering blue glacier calving, and discover the raw majesty at the very end of the Earth.',
      itinerary: [
        { day: 'Day 1-2', title: 'Buenos Aires to El Calafate', desc: 'Tango show welcome dinner, flight to Patagonia, artisanal craft brewery tour.' },
        { day: 'Day 3-5', title: 'Perito Moreno Glacier & Estancia', desc: 'Walk on ancient blue ice, horseback riding through Patagonian steppe, traditional roast lamb.' },
        { day: 'Day 6-9', title: 'Torres del Paine National Park', desc: 'Grey Glacier navigation, French Valley trek, luxury dome suites with panoramic mountain views.' },
        { day: 'Day 10-11', title: 'Punta Arenas & Magellan Strait', desc: 'Magellanic penguin colony visit on Isla Magdalena, scenic return flight.' }
      ]
    },
    {
      id: 'pkg-swiss-alps-railway',
      title: 'Switzerland by Scenic Rail: Matterhorn to St. Moritz',
      category: 'Scenic & Luxury',
      region: 'Europe',
      duration: '8 Days / 7 Nights',
      groupSize: 'Max 10 Guests',
      difficulty: 'Relaxed',
      rating: 4.97,
      reviewsCount: 220,
      originalPriceUSD: 3400,
      currentPriceUSD: 2850,
      featured: false,
      badge: 'Scenic Grandeur',
      image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['First-Class Swiss Travel Pass with Panorama Seating', '5-Star Historic Grand Hotels (Zermatt, Lucerne, St. Moritz)', 'Fondue & Chocolate Masterclasses', 'Private Luggage Van Transfers', 'Top of Europe Jungfraujoch Excursion'],
      overview: 'Glide through soaring alpine passes, cascading waterfalls, and charming storybook villages aboard the Glacier Express and Bernina Express.',
      itinerary: [
        { day: 'Day 1-2', title: 'Lucerne & Mount Pilatus', desc: 'Lake Lucerne steamboat, worlds steepest cogwheel railway, historic Chapel Bridge.' },
        { day: 'Day 3-5', title: 'Interlaken, Lauterbrunnen & Jungfraujoch', desc: 'The valley of 72 waterfalls, standing atop the Jungfraujoch Sphinx Observatory at 3,454m.' },
        { day: 'Day 6-8', title: 'Zermatt & The Matterhorn Majesty', desc: 'Car-free alpine paradise, Gornergrat railway views, Swiss chocolate farewell gala.' }
      ]
    },
    {
      id: 'pkg-norway-northern-lights',
      title: 'Arctic Aurora: Tromsø, Fjords & Glass Igloos',
      category: 'Polar & Winter',
      region: 'Arctic',
      duration: '7 Days / 6 Nights',
      groupSize: 'Max 8 Guests',
      difficulty: 'Easy',
      rating: 4.99,
      reviewsCount: 310,
      originalPriceUSD: 3300,
      currentPriceUSD: 2790,
      featured: true,
      badge: 'Winter Magic',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['Glass-Roof Igloo Cabin with Heated Floors', 'Professional Night Aurora Hunt Expeditions', 'Arctic Thermal Suits & Boots Provided', 'Husky Sledding & Sami Cultural Feast', 'Silent Hybrid Catamaran Fjord Cruise'],
      overview: 'Gaze into the green dancing skies from the comfort of a heated glass igloo, glide through silent snow forests, and immerse in authentic Sami Arctic culture.',
      itinerary: [
        { day: 'Day 1-2', title: 'Arrival in Tromsø - Gateway to the Arctic', desc: 'Arctic Cathedral, Cable car ride over Tromsø island, evening aurora anticipation toast.' },
        { day: 'Day 3-4', title: 'Husky Musher Adventure & Glass Igloo Check-in', desc: 'Drive your own team of Alaskan huskies through powder snow, settle into your panoramic glass igloo.' },
        { day: 'Day 5-7', title: 'Reindeer Sledding & Fjord Cruise', desc: 'Hear ancient folk stories inside a traditional Lavvu tent, electric boat voyage into dramatic fjords.' }
      ]
    }
  ],

  // Travel Experience Styles
  travelStyles: [
    { title: 'Luxury & Bespoke', icon: 'fa-gem', count: '45+ Tours', desc: 'Private charters, 5-star palatial stays, and bespoke personalized concierges.' },
    { title: 'Adventure & Trekking', icon: 'fa-mountain-sun', count: '38+ Tours', desc: 'Summit high peaks, glacial ice treks, and deep jungle excursions with master guides.' },
    { title: 'Wildlife & Safaris', icon: 'fa-paw', count: '29+ Tours', desc: 'Responsible conservation safaris, tracking rare predators, and glamping under constellations.' },
    { title: 'Cultural Immersion', icon: 'fa-landmark', count: '52+ Tours', desc: 'Living traditions, ancient temple rites, artisan ateliers, and private archaeological access.' },
    { title: 'Tropical & Beaches', icon: 'fa-umbrella-beach', count: '34+ Tours', desc: 'Overwater bungalows, pristine coral atolls, and secluded private island sanctuaries.' },
    { title: 'Culinary & Wine', icon: 'fa-wine-glass', count: '24+ Tours', desc: 'Michelin star journeys, truffle foraging with locals, and private vineyard masterclasses.' }
  ],

  // Customer Reviews & Social Proof
  testimonials: [
    {
      id: 1,
      name: 'Elena Rostova',
      location: 'Geneva, Switzerland',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      tour: 'Grand Mediterranean Odyssey',
      rating: 5,
      date: 'Visited September 2026',
      badge: 'Verified Luxury Traveler',
      comment: 'Wanderlux orchestrated the most seamless anniversary trip of our lives. From our private Riva boat arriving right at Capri to the breathtaking clifftop villa in Oia, every single detail was executed with Michelin-level perfection. We will never book travel anywhere else!'
    },
    {
      id: 2,
      name: 'Marcus & Sophia Vance',
      location: 'San Francisco, USA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      tour: 'Serengeti & Ngorongoro Crater Safari',
      rating: 5,
      date: 'Visited August 2026',
      badge: 'Verified Explorer',
      comment: 'Watching thousands of wildebeest cross the Mara River while sipping chilled champagne in our private 4x4 was pure magic. Our guide Juma was a walking encyclopedia of wildlife biology. The tented camps were so luxurious it felt surreal in the wild!'
    },
    {
      id: 3,
      name: 'David Tanaka',
      location: 'Melbourne, Australia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      tour: 'Imperial Japan Cultural Journey',
      rating: 5,
      date: 'Visited April 2026',
      badge: 'Verified Solo Traveler',
      comment: 'The private access to a Kyoto Zen monastery during closed hours was spiritual and unforgettable. The 24/7 concierge WhatsApp service helped me find reservation-only cocktail bars in Ginza with 10-minute notice. Truly unmatched service!'
    },
    {
      id: 4,
      name: 'Claire Dupont',
      location: 'Paris, France',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      tour: 'Arctic Aurora & Glass Igloos',
      rating: 5,
      date: 'Visited February 2026',
      badge: 'Verified Polar Explorer',
      comment: 'Sleeping under dancing emerald northern lights in Norway in a heated glass dome was a dream ticked off my bucket list. The husky sledding through snowdrifts made me feel like an Arctic pioneer. Wanderlux deserves 10 stars!'
    }
  ],

  // Travel Blog & SEO Insights
  blogPosts: [
    {
      id: 1,
      title: '10 Hidden European Coastal Towns Untouched by Mass Tourism in 2026',
      excerpt: 'Beyond the crowded shores of Positano lies a world of secret coves, cliffside trattorias, and tranquil turquoise bays waiting to be discovered.',
      category: 'Europe Travel Guide',
      readTime: '6 min read',
      date: 'October 18, 2026',
      author: 'Julian Thorne (Senior Travel Editor)',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'The Ultimate First-Timer Safari Handbook: Serengeti vs. Okavango Delta',
      excerpt: 'How to pick your dream safari, what to pack, photography essentials, and ethical wildlife conservation standards explained by top trackers.',
      category: 'Safari & Wildlife',
      readTime: '8 min read',
      date: 'September 29, 2026',
      author: 'Amara Kimani (Lead Wildlife Guide)',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Regenerative Luxury: How Modern Travel Can Restore the Planet',
      excerpt: 'From carbon-negative lodges in Costa Rica to community-run tea estates in Sri Lanka, discover how conscious travel elevates both you and local communities.',
      category: 'Sustainable Travel',
      readTime: '5 min read',
      date: 'September 12, 2026',
      author: 'Dr. Evelyn Ward (Sustainability Director)',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
    }
  ],

  // Frequently Asked Questions (Structured for Schema.org FAQPage)
  faqs: [
    {
      question: 'What is included in a Wanderlux signature tour package?',
      answer: 'Our packages are all-inclusive luxury experiences. This includes hand-selected 5-star boutique accommodations or luxury glamping, private chauffeurs, premium domestic flights or high-speed rail, certified private local guides, VIP skip-the-line admissions, curated gastronomic dining experiences, 24/7 dedicated personal concierge support via WhatsApp or phone, and 100% financial protection.'
    },
    {
      question: 'Can I customize any of the itineraries or build a fully private trip?',
      answer: 'Absolutely. Over 65% of our guests choose tailored itineraries. Our Destination Specialists will consult with you to adapt travel pacing, swap hotels, add private helicopter transfers, or craft a 100% bespoke private expedition from scratch for solo travelers, couples, multi-generational families, or corporate retreats.'
    },
    {
      question: 'What is your cancellation and booking flexibility policy?',
      answer: 'We provide peace-of-mind booking. All trips can be reserved with a flexible 20% deposit. You may reschedule or alter your dates without penalty up to 45 days prior to departure. We also partner with premium global underwriters to offer comprehensive Cancel-For-Any-Reason (CFAR) travel insurance.'
    },
    {
      question: 'Do you assist with international visas, entry permits, and vaccinations?',
      answer: 'Yes! Our dedicated Concierge Desk provides end-to-end visa concierge services, advising on required paperwork, scheduling biometric appointments, verifying passport validity requirements, and providing official invitation letters and safari permits.'
    },
    {
      question: 'How does Wanderlux champion sustainable and eco-conscious travel?',
      answer: 'We believe travel should be regenerative. For every traveler who embarks on a journey with us, we invest in vetted local conservation and rewilding projects, offset 100% of carbon emissions (including flights), eliminate single-use plastics across our ground operations, and ensure at least 70% of tour expenditures stay directly within indigenous host communities.'
    }
  ]
};

if (typeof window !== 'undefined') {
  window.travelData = travelData;
}
