/* Indicative display conversion for sample prices. Refresh rates before launch.
   NPR reference: Nepal Rastra Bank, 15 Nov 2026. */
(function () {
  var currencies = {
    NPR: { symbol: '\u0930\u0941 ', rate: 151.09, label: 'NPR (\u0930\u0941)' },
    USD: { symbol: '$', rate: 1, label: 'USD ($)' },
    EUR: { symbol: '\u20ac', rate: 0.904, label: 'EUR (\u20ac)' },
    GBP: { symbol: '\u00a3', rate: 0.756, label: 'GBP (\u00a3)' },
    INR: { symbol: '\u20b9', rate: 94.36, label: 'INR (\u20b9)' },
    AUD: { symbol: 'A$', rate: 1.472, label: 'AUD (A$)' },
    CAD: { symbol: 'C$', rate: 1.426, label: 'CAD (C$)' },
    SGD: { symbol: 'S$', rate: 1.287, label: 'SGD (S$)' },
    JPY: { symbol: '\u00a5', rate: 159.99, label: 'JPY (\u00a5)' },
    AED: { symbol: 'AED ', rate: 3.67, label: 'AED' }
  };
  var storageKey = 'veron-crest-currency';
  function getCurrency() {
    try { var saved = window.localStorage.getItem(storageKey); return currencies[saved] ? saved : 'NPR'; }
    catch (error) { return 'NPR'; }
  }
  function format(baseUsd, currencyCode) {
    var code = currencies[currencyCode] ? currencyCode : getCurrency();
    var currency = currencies[code];
    var locale = code === 'NPR' || code === 'INR' ? 'en-IN' : 'en-US';
    return currency.symbol + Math.round(Number(baseUsd || 0) * currency.rate).toLocaleString(locale);
  }
  function updatePriceNodes() {
    var code = getCurrency();
    document.querySelectorAll('[data-price-usd], .dp[data-usd]').forEach(function (element) {
      var amount = Number(element.dataset.priceUsd || element.dataset.usd);
      if (Number.isFinite(amount)) element.textContent = format(amount, code);
    });
  }
  function setCurrency(code) {
    if (!currencies[code]) return;
    try { window.localStorage.setItem(storageKey, code); } catch (error) { /* storage unavailable */ }
    document.querySelectorAll('.currency-picker').forEach(function (select) { select.value = code; });
    updatePriceNodes();
    window.dispatchEvent(new CustomEvent('currencychange', { detail: { currency: code } }));
  }
  window.TravelCurrency = { currencies: currencies, getCurrency: getCurrency, format: format, setCurrency: setCurrency };
  function init() {
    var code = getCurrency();
    document.querySelectorAll('.currency-picker').forEach(function (select) {
      select.value = code;
      select.addEventListener('change', function () { setCurrency(select.value); });
    });
    updatePriceNodes();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
