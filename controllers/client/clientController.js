const renderClientPage = (view, pageTitle, activePage) => (req, res) => {
  res.render(`client/${view}`, { pageTitle, activePage });
};

exports.home = renderClientPage(
  'index',
  'Veron Crest | Luxury Tours, Bespoke Vacations & Global Expeditions 2027',
  'home'
);
exports.about = renderClientPage('about', 'About Veron Crest | Tours and Travels', 'about');
exports.destinations = renderClientPage('destinations', 'Destinations | Veron Crest Tours and Travels', 'destinations');
exports.destinationDetails = renderClientPage('destination-details', 'Destination Details | Veron Crest', 'destinations');
exports.packages = renderClientPage('packages', 'Luxury Tour Packages | Veron Crest', 'packages');
exports.packageDetails = renderClientPage('package-details', 'Package Details | Veron Crest', 'packages');
exports.book = renderClientPage('book', 'Book Your Journey | Veron Crest', 'book');
exports.contact = renderClientPage('contact', 'Contact Veron Crest | Plan Your Journey', 'contact');
exports.gallery = renderClientPage('gallery', 'Travel Gallery | Veron Crest — Breathtaking Destinations Worldwide', 'gallery');
