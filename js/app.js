/**
 * Wanderlux Tours & Travels — Main Application (Light-Theme Version)
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── State ────────────────────────────────────────────────────────────── */
  const S = {
    currency: 'USD',
    filter: 'All',
    keyword: '',
    budget: 5000,
    travelers: { adults: 2, children: 0 }
  };

  /* ── Shorthand DOM queries ────────────────────────────────────────────── */
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  const destGrid       = $('destinations-grid');
  const pkgWrap        = $('packages-container');
  const stylesWrap     = $('styles-container');
  const revWrap        = $('reviews-container');
  const blogWrap       = $('blog-container');
  const faqWrap        = $('faqs-container');
  const currSel        = $('currency-selector');
  const currSelM       = $('mobile-currency-selector');
  const nav            = $('main-nav');
  const topBtn         = $('back-to-top');
  const progressBar    = $('scroll-progress');

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function fmtPrice(usd) {
    const c = travelData.currencies[S.currency] || travelData.currencies.USD;
    return `${c.symbol}${Math.round(usd * c.rate).toLocaleString()}`;
  }

  /* ── TOAST ────────────────────────────────────────────────────────────── */
  function toast(msg, type='info', ms=3500) {
    const box = $('toast-container'); if (!box) return;
    const colors = { success:'border-emerald-400 bg-white text-emerald-700', info:'border-primary-400 bg-white text-primary-700', warning:'border-amber-400 bg-white text-amber-700' };
    const d = document.createElement('div');
    d.className = `flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg ${colors[type]||colors.info} pointer-events-auto text-xs font-semibold toast-enter`;
    const icon = type==='success'?'fa-circle-check text-emerald-500':'fa-circle-info text-primary-500';
    d.innerHTML = `<i class="fa-solid ${icon}"></i><span class="text-slate-700">${msg}</span>`;
    box.appendChild(d);
    requestAnimationFrame(()=>d.classList.add('show'));
    setTimeout(()=>{ d.classList.remove('show'); setTimeout(()=>d.remove(),350); }, ms);
  }

  function confettiBurst() { if(typeof confetti==='function') confetti({particleCount:80,spread:70,origin:{y:0.6}}); }

  /* ── Price updater ────────────────────────────────────────────────────── */
  function syncPrices() { $$('.dp').forEach(e=>{const u=parseFloat(e.dataset.usd);if(!isNaN(u))e.textContent=fmtPrice(u);}); }

  /* ══════════════════════════════════════════════════════════════════════
     RENDER — Destinations
     ══════════════════════════════════════════════════════════════════════ */
  function renderDest() {
    if (!destGrid) return;
    let list = travelData.destinations;
    if (S.filter!=='All') list = list.filter(d=>d.region.toLowerCase()===S.filter.toLowerCase());
    if (S.keyword.trim()) { const q=S.keyword.toLowerCase(); list=list.filter(d=>d.name.toLowerCase().includes(q)||d.country.toLowerCase().includes(q)||d.description.toLowerCase().includes(q)); }
    list = list.filter(d=>d.priceUSD<=S.budget);

    if (!list.length) {
      destGrid.innerHTML = `
        <div class="col-span-full text-center py-16">
          <i class="fa-solid fa-compass text-5xl text-primary-300 mb-4"></i>
          <h3 class="text-xl font-bold text-slate-700 mb-2">No Destinations Found</h3>
          <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Try adjusting your filters or budget range.</p>
          <button id="reset-filters" class="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition text-sm">Reset Filters</button>
        </div>`;
      $('reset-filters')?.addEventListener('click',()=>{ S.filter='All'; S.keyword=''; S.budget=5000; $$('.dest-filter-btn').forEach(b=>{b.classList.remove('bg-primary-500','text-white');b.classList.add('bg-slate-100','text-slate-600');}); document.querySelector('.dest-filter-btn[data-filter="All"]')?.classList.add('bg-primary-500','text-white'); const sl=$('budget-slider');if(sl)sl.value=5000; const bv=$('budget-val');if(bv)bv.textContent='$5,000+'; renderDest(); });
      return;
    }

    destGrid.innerHTML = list.map(d=>`
      <div class="group soft-card overflow-hidden flex flex-col" data-aos="fade-up">
        <div class="relative h-60 overflow-hidden card-zoom">
          <img src="${d.image}" alt="${d.name}, ${d.country} — luxury tour" loading="lazy" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow ${d.badgeColor}">${d.badge}</span>
            <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-slate-700 backdrop-blur-sm"><i class="fa-solid fa-cloud-sun text-amber-400 mr-1"></i>${d.weather}</span>
          </div>
          <button class="wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition" aria-label="Save"><i class="fa-regular fa-heart"></i></button>
          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
            <span class="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg"><i class="fa-solid fa-calendar-days mr-1 text-primary-300"></i>Best: ${d.bestSeason}</span>
            <span class="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg text-yellow-300 font-bold"><i class="fa-solid fa-star mr-0.5"></i>${d.rating} <span class="text-white/60 font-normal">(${d.reviewsCount})</span></span>
          </div>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-primary-500"><i class="fa-solid fa-location-dot mr-1"></i>${d.country} · ${d.region}</span>
            <h3 class="text-lg font-bold text-slate-800 mt-1 group-hover:text-primary-600 transition">${d.name}</h3>
            <p class="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">${d.description}</p>
            <ul class="mt-3 space-y-1">
              ${d.highlights.slice(0,2).map(h=>`<li class="flex items-center gap-2 text-xs text-slate-600"><i class="fa-solid fa-check text-teal-500 text-[10px]"></i>${h}</li>`).join('')}
            </ul>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <div><span class="text-[10px] text-slate-400 block">From</span><span class="text-xl font-extrabold text-teal-600 dp" data-usd="${d.priceUSD}">${fmtPrice(d.priceUSD)}</span><span class="text-[10px] text-slate-400"> /person</span></div>
            <div class="flex gap-2">
              <a href="destination-details.html?id=${encodeURIComponent(d.id)}" class="view-dest-btn px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition" data-id="${d.id}">Details</a>
              <button class="book-dest-btn px-3.5 py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-lg shadow-sm shadow-primary-200 transition" data-id="${d.id}" data-name="${d.name}" data-price="${d.priceUSD}">Book</button>
            </div>
          </div>
        </div>
      </div>`).join('');
    bindDestEvents();
  }

  function bindDestEvents() {
    $$('.view-dest-btn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();}));
    $$('.book-dest-btn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();openBooking({name:b.dataset.name,price:b.dataset.price});}));
    $$('.wishlist-btn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();b.querySelector('i').classList.toggle('fa-solid');b.querySelector('i').classList.toggle('fa-regular');toast('Saved to Wishlist ❤️','success');}));
  }

  /* ══════════════════════════════════════════════════════════════════════
     RENDER — Tour Packages
     ══════════════════════════════════════════════════════════════════════ */
  function renderPkgs() {
    if (!pkgWrap) return;
    pkgWrap.innerHTML = travelData.packages.map(p=>{
      const savings = p.originalPriceUSD - p.currentPriceUSD;
      const savingsPercent = Math.round((savings / p.originalPriceUSD) * 100);
      return `
      <div class="swiper-slide h-auto">
        <div class="h-full soft-card overflow-hidden flex flex-col">
          <div class="relative h-56 overflow-hidden card-zoom">
            <img src="${p.image}" alt="${p.title}" loading="lazy" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <span class="absolute top-3 left-3 px-2.5 py-1 bg-primary-500 text-white text-[11px] font-bold rounded-full shadow">${p.badge}</span>
            <span class="package-save-badge">Save ${savingsPercent}%</span>
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span class="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg"><i class="fa-solid fa-clock text-primary-300 mr-1"></i>${p.duration}</span>
              <span class="bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg text-yellow-300 font-bold"><i class="fa-solid fa-star mr-0.5"></i>${p.rating}</span>
            </div>
          </div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                <span class="text-teal-600 font-bold uppercase tracking-wider">${p.category}</span>
                <span><i class="fa-solid fa-users mr-1"></i>${p.groupSize}</span>
              </div>
              <h3 class="text-base font-bold text-slate-800 line-clamp-1">${p.title}</h3>
              <p class="text-slate-500 text-xs mt-1 line-clamp-2">${p.overview}</p>
              <div class="flex flex-wrap gap-1.5 mt-3">
                ${p.inclusions.slice(0,3).map(i=>`<span class="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-100"><i class="fa-solid fa-circle-check text-teal-500 mr-0.5"></i>${i}</span>`).join('')}
              </div>
            </div>
            <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-400 line-through dp" data-usd="${p.originalPriceUSD}">${fmtPrice(p.originalPriceUSD)}</span>
                <span class="text-xl font-extrabold text-teal-600 ml-1 dp" data-usd="${p.currentPriceUSD}">${fmtPrice(p.currentPriceUSD)}</span>
                <span class="text-[10px] text-slate-400"> /person</span>
                <span class="package-save-amount">Save ${fmtPrice(savings)}</span>
              </div>
              <button class="view-package-btn px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-lg shadow-sm shadow-primary-200 transition flex items-center gap-1" data-id="${p.id}">View offer <i class="fa-solid fa-arrow-right text-[10px]"></i></button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
    $$('.view-package-btn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();window.location.href=`package-details.html?id=${encodeURIComponent(b.dataset.id)}`;}));
    initPkgSwiper();
  }

  /* ══════════════════════════════════════════════════════════════════════
     RENDER — Travel Styles
     ══════════════════════════════════════════════════════════════════════ */
  function renderStyles() {
    if (!stylesWrap) return;
    const iconColors = ['text-primary-500 bg-primary-50','text-teal-600 bg-teal-50','text-amber-500 bg-amber-50','text-indigo-500 bg-indigo-50','text-rose-500 bg-rose-50','text-emerald-500 bg-emerald-50'];
    stylesWrap.innerHTML = travelData.travelStyles.map((s,i)=>`
      <div class="group soft-card p-6 flex flex-col justify-between hover:border-primary-200" data-aos="fade-up" data-aos-delay="${i*60}">
        <div>
          <div class="w-12 h-12 rounded-xl ${iconColors[i%iconColors.length]} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition"><i class="fa-solid ${s.icon}"></i></div>
          <h4 class="text-base font-bold text-slate-800 mb-1.5">${s.title}</h4>
          <p class="text-slate-500 text-xs leading-relaxed">${s.desc}</p>
        </div>
        <div class="flex items-center justify-between text-xs text-primary-500 font-semibold pt-4 mt-4 border-t border-slate-100">
          <span>${s.count}</span><i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>`).join('');
  }

  /* ══════════════════════════════════════════════════════════════════════
     RENDER — Testimonials
     ══════════════════════════════════════════════════════════════════════ */
  function renderRevs() {
    if (!revWrap) return;
    revWrap.innerHTML = travelData.testimonials.map(t=>`
      <div class="swiper-slide h-auto">
        <div class="h-full soft-card p-7 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1 text-yellow-400 text-sm mb-3">${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}<span class="text-slate-400 text-xs font-semibold ml-2">${t.date}</span></div>
            <p class="text-slate-600 text-sm leading-relaxed italic mb-5">"${t.comment}"</p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <div class="flex items-center gap-3">
              <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover border-2 border-primary-200"/>
              <div><h5 class="text-slate-800 font-bold text-sm flex items-center gap-1.5">${t.name} <i class="fa-solid fa-circle-check text-primary-400 text-[10px]"></i></h5><span class="text-[11px] text-slate-400">${t.location}</span></div>
            </div>
            <div class="text-right hidden sm:block"><span class="text-[10px] text-primary-500 block font-medium">${t.tour}</span><span class="text-[9px] text-teal-600 font-semibold uppercase tracking-wider">${t.badge}</span></div>
          </div>
        </div>
      </div>`).join('');
    initRevSwiper();
  }

  /* ══════════════════════════════════════════════════════════════════════
     RENDER — Blog
     ══════════════════════════════════════════════════════════════════════ */
  function renderBlog() {
    if (!blogWrap) return;
    blogWrap.innerHTML = travelData.blogPosts.map(p=>`
      <article class="group soft-card overflow-hidden flex flex-col" data-aos="fade-up">
        <div class="relative h-52 card-zoom overflow-hidden">
          <img src="${p.image}" alt="${p.title}" loading="lazy" class="w-full h-full object-cover"/>
          <span class="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-teal-600 text-[11px] font-bold rounded-lg">${p.category}</span>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-[11px] text-slate-400 mb-2"><span><i class="fa-regular fa-calendar mr-1"></i>${p.date}</span><span>•</span><span><i class="fa-regular fa-clock mr-1"></i>${p.readTime}</span></div>
            <h3 class="text-base font-bold text-slate-800 group-hover:text-primary-600 transition line-clamp-2 mb-1.5">${p.title}</h3>
            <p class="text-slate-500 text-xs line-clamp-3 leading-relaxed">${p.excerpt}</p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400">${p.author}</span>
            <span class="text-primary-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Read <i class="fa-solid fa-arrow-right text-[10px]"></i></span>
          </div>
        </div>
      </article>`).join('');
  }

  /* ══════════════════════════════════════════════════════════════════════
     RENDER — FAQs
     ══════════════════════════════════════════════════════════════════════ */
  function renderFAQs() {
    if (!faqWrap) return;
    faqWrap.innerHTML = travelData.faqs.map((f,i)=>`
      <div class="faq-item bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm transition" data-aos="fade-up" data-aos-delay="${i*50}">
        <button class="faq-question w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-primary-600 transition">
          <span class="flex items-center gap-3"><span class="w-7 h-7 rounded-full bg-primary-50 text-primary-500 text-xs flex items-center justify-center font-mono font-bold">0${i+1}</span><span class="text-sm sm:text-base">${f.question}</span></span>
          <i class="fa-solid fa-chevron-down faq-chevron text-slate-400 text-sm transition-transform duration-300"></i>
        </button>
        <div class="faq-answer px-5 pb-5 text-slate-500 text-sm leading-relaxed"><p class="pt-1">${f.answer}</p></div>
      </div>`).join('');
    $$('.faq-question').forEach(b=>b.addEventListener('click',()=>{
      const item=b.closest('.faq-item'), open=item.classList.contains('active');
      $$('.faq-item').forEach(o=>{if(o!==item)o.classList.remove('active');});
      item.classList.toggle('active',!open);
    }));
  }

  /* ══════════════════════════════════════════════════════════════════════
     SWIPERS
     ══════════════════════════════════════════════════════════════════════ */
  let pkgSw=null, revSw=null;
  function initPkgSwiper() {
    if (typeof Swiper==='undefined') return;
    if (pkgSw) pkgSw.destroy(true,true);
    pkgSw = new Swiper('.packages-swiper',{slidesPerView:1,spaceBetween:20,grabCursor:true,pagination:{el:'.packages-pagination',clickable:true},navigation:{nextEl:'.packages-next',prevEl:'.packages-prev'},breakpoints:{640:{slidesPerView:1.4},1024:{slidesPerView:2.4},1280:{slidesPerView:3}}});
  }
  function initRevSwiper() {
    if (typeof Swiper==='undefined') return;
    if (revSw) revSw.destroy(true,true);
    revSw = new Swiper('.reviews-swiper',{slidesPerView:1,spaceBetween:20,loop:true,autoplay:{delay:5000,disableOnInteraction:false},pagination:{el:'.reviews-pagination',clickable:true},breakpoints:{768:{slidesPerView:2},1280:{slidesPerView:3}}});
  }

  /* ══════════════════════════════════════════════════════════════════════
     CURRENCY
     ══════════════════════════════════════════════════════════════════════ */
  function setCurr(c) { if(!travelData.currencies[c])return; S.currency=c; if(currSel)currSel.value=c; if(currSelM)currSelM.value=c; syncPrices(); reCalc(); toast(`Currency → ${travelData.currencies[c].label}`,'info'); }
  currSel?.addEventListener('change',e=>setCurr(e.target.value));
  currSelM?.addEventListener('change',e=>setCurr(e.target.value));

  /* ══════════════════════════════════════════════════════════════════════
     FILTER BUTTONS
     ══════════════════════════════════════════════════════════════════════ */
  $$('.dest-filter-btn').forEach(b=>b.addEventListener('click',()=>{
    $$('.dest-filter-btn').forEach(x=>{x.classList.remove('bg-primary-500','text-white');x.classList.add('bg-slate-100','text-slate-600');});
    b.classList.add('bg-primary-500','text-white'); b.classList.remove('bg-slate-100','text-slate-600');
    S.filter=b.dataset.filter||'All'; renderDest();
  }));

  /* ══════════════════════════════════════════════════════════════════════
     SEARCH BAR
     ══════════════════════════════════════════════════════════════════════ */
  const sInput=$('search-destination-input'), pageDestInput=$('destination-page-search'), sBtn=$('search-itineraries-btn'), bSlider=$('budget-slider'), bVal=$('budget-val'), acList=$('dest-autocomplete-list');

  // Autocomplete
  if (sInput && acList) {
    function autoSuggest(q) {
      q=q.toLowerCase().trim(); if(!q){acList.classList.add('hidden');acList.innerHTML='';return;}
      const m=travelData.destinations.filter(d=>d.name.toLowerCase().includes(q)||d.country.toLowerCase().includes(q)||d.region.toLowerCase().includes(q));
      if(!m.length){acList.innerHTML=`<div class="p-3 text-xs text-slate-400 text-center">No matches</div>`;acList.classList.remove('hidden');return;}
      acList.innerHTML=m.slice(0,5).map(d=>`<div class="ac-item p-3 hover:bg-primary-50 flex items-center justify-between cursor-pointer border-b border-slate-50 last:border-0 transition" data-name="${d.name}"><div class="flex items-center gap-3"><img src="${d.image}" class="w-9 h-9 rounded-lg object-cover"/><div><span class="text-xs font-bold text-slate-700">${d.name}</span><br><span class="text-[10px] text-slate-400">${d.country} · ${d.region}</span></div></div><span class="text-[11px] font-bold text-teal-600">${fmtPrice(d.priceUSD)}</span></div>`).join('');
      acList.classList.remove('hidden');
      acList.querySelectorAll('.ac-item').forEach(it=>it.addEventListener('click',()=>{sInput.value=it.dataset.name;acList.classList.add('hidden');S.keyword=it.dataset.name;renderDest();}));
    }
    sInput.addEventListener('input',e=>autoSuggest(e.target.value));
    sInput.addEventListener('focus',()=>{if(sInput.value.trim())autoSuggest(sInput.value);});
    document.addEventListener('click',e=>{if(!sInput.contains(e.target)&&!acList.contains(e.target))acList.classList.add('hidden');});
  }
  pageDestInput?.addEventListener('input', e=>{S.keyword=e.target.value;renderDest();});

  if(bSlider&&bVal){bSlider.addEventListener('input',e=>{S.budget=+e.target.value;bVal.textContent=`$${S.budget.toLocaleString()}+`;renderDest();});}
  sBtn?.addEventListener('click',()=>{if(sInput)S.keyword=sInput.value;renderDest();$('destinations')?.scrollIntoView({behavior:'smooth'});toast(`Searching for "${S.keyword||'All'}"…`,'info');});

  /* ══════════════════════════════════════════════════════════════════════
     TRAVELERS COUNTER
     ══════════════════════════════════════════════════════════════════════ */
  const tBtn=$('travelers-dropdown-btn'), tMenu=$('travelers-dropdown-menu'), tSum=$('travelers-summary');
  tBtn?.addEventListener('click',e=>{e.stopPropagation();tMenu.classList.toggle('hidden');});
  document.addEventListener('click',e=>{if(tMenu&&!tMenu.contains(e.target)&&!tBtn.contains(e.target))tMenu.classList.add('hidden');});
  function updTravelers(){$('adult-count').textContent=S.travelers.adults;$('child-count').textContent=S.travelers.children;tSum.textContent=`${S.travelers.adults} Adults${S.travelers.children?`, ${S.travelers.children} Kids`:''}`;}
  $('adult-plus')?.addEventListener('click',()=>{if(S.travelers.adults<10){S.travelers.adults++;updTravelers();}});
  $('adult-minus')?.addEventListener('click',()=>{if(S.travelers.adults>1){S.travelers.adults--;updTravelers();}});
  $('child-plus')?.addEventListener('click',()=>{if(S.travelers.children<8){S.travelers.children++;updTravelers();}});
  $('child-minus')?.addEventListener('click',()=>{if(S.travelers.children>0){S.travelers.children--;updTravelers();}});

  /* ══════════════════════════════════════════════════════════════════════
     TRIP ESTIMATOR
     ══════════════════════════════════════════════════════════════════════ */
  const cDest=$('calc-destination'),cSty=$('calc-style'),cDay=$('calc-days'),cGst=$('calc-guests'),cTot=$('calc-total-display'),cPP=$('calc-per-person-display');
  function reCalc(){if(!cDest||!cTot)return;const base={santorini:320,kyoto:280,serengeti:450,amalfi:350,swiss:390,bali:190,banff:310,tromso:420}[cDest.value]||300;const mul={comfort:1,luxury:1.6,bespoke:2.4}[cSty.value]||1.6;const d=+cDay.value||7,g=+cGst.value||2,pp=Math.round(base*mul*d),tot=pp*g;cTot.textContent=fmtPrice(tot);cPP.textContent=`${fmtPrice(pp)} / person`;}
  [cDest,cSty,cDay,cGst].forEach(el=>el?.addEventListener('change',reCalc));
  $('calc-quote-btn')?.addEventListener('click',()=>{const dn=cDest.options[cDest.selectedIndex].text;openBooking({name:`Custom Trip to ${dn} (${cDay.value}d, ${cGst.value} guests)`,price:2500});});

  /* ══════════════════════════════════════════════════════════════════════
     MODALS
     ══════════════════════════════════════════════════════════════════════ */
  const modal=$('generic-modal'), mContent=$('modal-dynamic-content'), mClose=$('modal-close-btn');
  function openModal(html){if(!modal||!mContent)return;mContent.innerHTML=html;modal.classList.remove('hidden');modal.classList.add('flex');document.body.style.overflow='hidden';}
  function closeModal(){if(!modal)return;modal.classList.add('hidden');modal.classList.remove('flex');document.body.style.overflow='';}
  mClose?.addEventListener('click',closeModal);
  modal?.addEventListener('click',e=>{if(e.target===modal)closeModal();});

  // -- Destination detail modal
  function openDestModal(id){
    const d=travelData.destinations.find(x=>x.id===id); if(!d)return;
    openModal(`
      <div class="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6"><img src="${d.image}" alt="${d.name}" class="w-full h-full object-cover"/><div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div class="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div><span class="text-xs uppercase tracking-widest text-primary-300 font-bold block mb-1"><i class="fa-solid fa-map-location-dot mr-1"></i>${d.country} · ${d.region}</span><h2 class="text-2xl sm:text-3xl font-extrabold text-white">${d.name}</h2></div>
          <div class="bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-right"><span class="text-xs text-slate-500 block">From</span><span class="text-xl font-extrabold text-teal-600">${fmtPrice(d.priceUSD)}</span><span class="text-xs text-slate-500"> /person</span></div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-slate-50 p-3 rounded-xl flex items-center gap-3"><i class="fa-solid fa-clock text-primary-400 text-lg"></i><div><span class="text-[10px] text-slate-400 block">Duration</span><span class="text-xs font-bold text-slate-700">${d.duration}</span></div></div>
        <div class="bg-slate-50 p-3 rounded-xl flex items-center gap-3"><i class="fa-solid fa-sun text-amber-400 text-lg"></i><div><span class="text-[10px] text-slate-400 block">Weather</span><span class="text-xs font-bold text-slate-700">${d.weather}</span></div></div>
        <div class="bg-slate-50 p-3 rounded-xl flex items-center gap-3"><i class="fa-solid fa-calendar-check text-teal-500 text-lg"></i><div><span class="text-[10px] text-slate-400 block">Best Season</span><span class="text-xs font-bold text-slate-700">${d.bestSeason}</span></div></div>
      </div>
      <h4 class="font-bold text-slate-800 mb-1.5">About</h4><p class="text-slate-600 text-sm leading-relaxed mb-5">${d.description}</p>
      <h4 class="font-bold text-slate-800 mb-3">Highlights & Excursions</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">${d.highlights.map(h=>`<div class="flex items-center gap-2 bg-slate-50 p-3 rounded-lg text-xs text-slate-700"><i class="fa-solid fa-gem text-primary-400"></i>${h}</div>`).join('')}</div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-100">
        <span class="text-xs text-slate-400"><i class="fa-solid fa-shield-halved text-teal-500 mr-1"></i>100% financial protection & 24/7 concierge</span>
        <button id="m-book" class="w-full sm:w-auto px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-extrabold rounded-xl shadow-md transition">Reserve Journey</button>
      </div>`);
    $('m-book')?.addEventListener('click',()=>{closeModal();openBooking({name:d.name,price:d.priceUSD});});
  }

  // -- Package itinerary modal
  function openPkgModal(id){
    const p=travelData.packages.find(x=>x.id===id);if(!p)return;
    openModal(`
      <div class="relative h-56 sm:h-72 rounded-xl overflow-hidden mb-6"><img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover"/><div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div class="absolute bottom-5 left-5 right-5"><span class="px-2.5 py-1 bg-primary-500 text-white text-[11px] font-bold rounded-full">${p.badge} · ${p.category}</span><h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-2">${p.title}</h2></div>
      </div>
      <div class="flex flex-wrap gap-4 bg-slate-50 p-4 rounded-xl mb-6 text-xs">
        <div><span class="text-slate-400 block">Duration</span><span class="font-bold text-slate-700"><i class="fa-solid fa-clock text-primary-400 mr-1"></i>${p.duration}</span></div>
        <div><span class="text-slate-400 block">Group</span><span class="font-bold text-slate-700"><i class="fa-solid fa-users text-primary-400 mr-1"></i>${p.groupSize}</span></div>
        <div><span class="text-slate-400 block">Style</span><span class="font-bold text-slate-700"><i class="fa-solid fa-compass text-primary-400 mr-1"></i>${p.difficulty}</span></div>
        <div><span class="text-slate-400 block">Price</span><span class="text-xl font-extrabold text-teal-600">${fmtPrice(p.currentPriceUSD)}</span><span class="text-xs text-slate-400 line-through ml-1">${fmtPrice(p.originalPriceUSD)}</span></div>
      </div>
      <h4 class="font-bold text-slate-800 mb-1.5">Overview</h4><p class="text-slate-600 text-sm leading-relaxed mb-5">${p.overview}</p>
      <h4 class="font-bold text-slate-800 mb-3">Day-by-Day Itinerary</h4>
      <div class="space-y-3 mb-6">${p.itinerary.map(it=>`<div class="p-4 bg-slate-50 rounded-xl"><span class="text-[11px] font-extrabold tracking-wider text-primary-500 uppercase block mb-1">${it.day}</span><h5 class="text-slate-800 font-bold text-sm">${it.title}</h5><p class="text-slate-500 text-xs mt-1">${it.desc}</p></div>`).join('')}</div>
      <h4 class="font-bold text-slate-800 mb-2">Inclusions</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">${p.inclusions.map(i=>`<div class="flex items-center gap-2 text-xs text-slate-600"><i class="fa-solid fa-circle-check text-teal-500"></i>${i}</div>`).join('')}</div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-100">
        <span class="text-xs text-slate-400"><i class="fa-solid fa-award text-amber-400 mr-1"></i>Guaranteed departures · Flexible cancellation</span>
        <button id="m-book-p" class="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-md transition">Book This Package</button>
      </div>`);
    $('m-book-p')?.addEventListener('click',()=>{closeModal();openBooking({name:p.title,price:p.currentPriceUSD});});
  }

  // -- Booking inquiry modal
  function openBooking({name,price}){
    window.location.href = `book.html?journey=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
    return;
    /* openModal(`
      <div class="max-w-lg mx-auto text-center">
        <div class="w-14 h-14 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto text-2xl mb-3"><i class="fa-solid fa-paper-plane"></i></div>
        <h3 class="text-2xl font-bold text-slate-800">Reserve Your Journey</h3>
        <p class="text-slate-500 text-xs mt-1 mb-6">Lock in your dates with a flexible 20% deposit. Our concierge will respond within 2 hours.</p>
        <div class="bg-slate-50 p-4 rounded-xl mb-6 text-left"><span class="text-[10px] text-slate-400 block">Selected Journey</span><h4 class="text-sm font-bold text-slate-800">${name}</h4><div class="flex items-center justify-between text-xs mt-2"><span class="text-primary-500 font-semibold">Estimated Rate</span><span class="text-lg text-teal-600 font-extrabold">${fmtPrice(price)} <span class="text-xs text-slate-400">/person</span></span></div></div>
        <form id="bk-form" class="space-y-3 text-left">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label><input type="text" required placeholder="John Doe" class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary-400"/></div>
            <div><label class="block text-xs font-semibold text-slate-600 mb-1">Email *</label><input type="email" required placeholder="you@email.com" class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary-400"/></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label class="block text-xs font-semibold text-slate-600 mb-1">Phone *</label><input type="tel" required placeholder="+1 (555) 000-0000" class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary-400"/></div>
            <div><label class="block text-xs font-semibold text-slate-600 mb-1">Travel Date</label><input type="date" class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary-400"/></div>
          </div>
          <div><label class="block text-xs font-semibold text-slate-600 mb-1">Special Requests</label><textarea rows="2" placeholder="Anniversary surprises, dietary needs…" class="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary-400"></textarea></div>
          <button type="submit" class="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2">Confirm Request <i class="fa-solid fa-arrow-right text-xs"></i></button>
        </form>
      </div>`);
    $('bk-form')?.addEventListener('submit',e=>{e.preventDefault();closeModal();confettiBurst();toast('🎉 Booking Submitted! Check your email.','success',6000);}); */
  }

  /* ══════════════════════════════════════════════════════════════════════
     NEWSLETTER
     ══════════════════════════════════════════════════════════════════════ */
  $('newsletter-form')?.addEventListener('submit',e=>{e.preventDefault();const inp=e.target.querySelector('input[type="email"]');if(inp?.value){confettiBurst();toast('✨ Welcome! $150 credit sent to your inbox.','success');inp.value='';}});

  /* ══════════════════════════════════════════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════════════════════════════════════════ */
  const mDraw=$('mobile-menu-drawer'),mBtn=$('mobile-menu-btn'),mXBtn=$('mobile-menu-close-btn'),mOver=$('mobile-overlay');
  function closeDraw(){mDraw?.classList.add('translate-x-full');document.body.style.overflow='';}
  mBtn?.addEventListener('click',()=>{mDraw.classList.remove('translate-x-full');document.body.style.overflow='hidden';});
  mXBtn?.addEventListener('click',closeDraw);
  mOver?.addEventListener('click',closeDraw);
  $$('.mobile-nav-link').forEach(l=>l.addEventListener('click',closeDraw));

  /* ══════════════════════════════════════════════════════════════════════
     SCROLL EFFECTS
     ══════════════════════════════════════════════════════════════════════ */
  let scrollTicking = false;
  function updateScrollEffects() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (nav) nav.classList.toggle('scrolled', scrollY > 40);
    if (topBtn) {
      topBtn.classList.toggle('opacity-0', scrollY <= 500);
      topBtn.classList.toggle('pointer-events-none', scrollY <= 500);
      topBtn.classList.toggle('translate-y-4', scrollY <= 500);
    }
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollEffects();

  const navLinks = [...document.querySelectorAll('.nav-link')];
  const observedSections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
    observedSections.forEach(section => sectionObserver.observe(section));
  }
  topBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  /* ══════════════════════════════════════════════════════════════════════
     AOS INIT + FIRST PAINT
     ══════════════════════════════════════════════════════════════════════ */
  if(typeof AOS!=='undefined') AOS.init({duration:750,once:true,offset:70,easing:'ease-out-cubic'});
  renderDest(); renderPkgs(); renderStyles(); renderRevs(); renderBlog(); renderFAQs(); reCalc();
  if(typeof AOS!=='undefined') AOS.refreshHard();
});
