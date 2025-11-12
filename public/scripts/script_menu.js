// Full script including PRODUCTS (unchanged data)
// Paste your original PRODUCTS array here exactly as you provided.
// For brevity in this block I'll include the whole PRODUCTS array exactly as in your previous parts.

const PRODUCTS = [
  // Part 1 Food
  // 1. bread of the food
  {
    id: 101,
    category: 'food',
    sub: 'bread',
    title: 'Bread Oil',
    price: 7.20,
    img: './src/assets/images/menu/bread/Bread_BreadOil.png',
    desc: 'Sourdough drizzled with extra virgin olive oil and herbs.',
    tags: ['vegan', 'bestseller'],
    cal: '420 kcal'
  },
  {
    id: 102,
    category: 'food',
    sub: 'bread',
    title: 'Calzones',
    price: 4.50,
    img: './src/assets/images/menu/bread/Bread_Calzones.png',
    desc: 'Golden folded calzone stuffed with savory fillings.',
    tags: ['bakery'],
    cal: '350 kcal'
  },
  {
    id: 103,
    category: 'food',
    sub: 'bread',
    title: 'Cinnamon Roll',
    price: 6.90,
    img: './src/assets/images/menu/bread/Bread_CinnamonRoll.png',
    desc: 'Warm cinnamon roll topped with sweet glaze.',
    tags: ['classic'],
    cal: '520 kcal'
  },
  {
    id: 104,
    category: 'food',
    sub: 'bread',
    title: 'Pumpkin Bread',
    price: 2.80,
    img: './src/assets/images/menu/bread/Bread_PumpkinBread.png',
    desc: 'Moist pumpkin loaf spiced with autumn flavours.',
    tags: ['seasonal', 'bakery'],
    cal: '310 kcal'
  },
  {
    id: 201,
    category: 'food',
    sub: 'bread',
    title: 'Monkey Bread',
    price: 7.20,
    img: './src/assets/images/menu/bread/Bread_MonkeyBread.png',
    desc: 'Pull-apart sweet monkey bread with cinnamon sugar.',
    tags: ['bestseller'],
    cal: '420 kcal'
  },
  {
    id: 202,
    category: 'food',
    sub: 'bread',
    title: 'Fruit Bread',
    price: 4.50,
    img: './src/assets/images/menu/bread/Bread_FruitBread.png',
    desc: 'Loaf studded with mixed dried fruits and citrus zest.',
    tags: ['bakery'],
    cal: '350 kcal'
  },
  {
    id: 203,
    category: 'food',
    sub: 'bread',
    title: 'Fougasse',
    price: 6.90,
    img: './src/assets/images/menu/bread/Bread_Fougasse.png',
    desc: 'Rustic fougasse with olive oil and aromatic herbs.',
    tags: ['classic'],
    cal: '290 kcal'
  },

  // 2. sandwich of Food
  {
    id: 301,
    category: 'food',
    sub: 'sandwich',
    title: 'Ham Sandwich',
    price: 7.20,
    img: './src/assets/images/menu/bread/Bread_HamSandwich.png',
    desc: 'Classic ham sandwich on freshly baked bread.',
    tags: ['classic'],
    cal: '420 kcal'
  },
  {
    id: 302,
    category: 'food',
    sub: 'sandwich',
    title: 'Turkey Club Sandwich',
    price: 4.50,
    img: './src/assets/images/menu/bread/Bread_TurkeyClubSandwich.png',
    desc: 'Triple-decker turkey club with crisp lettuce and tomato.',
    tags: ['popular'],
    cal: '350 kcal'
  },
  {
    id: 303,
    category: 'food',
    sub: 'sandwich',
    title: 'Burritos',
    price: 6.90,
    img: './src/assets/images/menu/bread/Bread_Burritos.png',
    desc: 'Hearty burrito rolled with savory fillings and salsa.',
    tags: ['wrap'],
    cal: '520 kcal'
  },
  {
    id: 304,
    category: 'food',
    sub: 'sandwich',
    title: 'Sandwich',
    price: 2.80,
    img: './src/assets/images/menu/bread/Bread_Sandwich.png',
    desc: 'Simple sandwich made for a quick, satisfying bite.',
    tags: ['basic'],
    cal: '250 kcal'
  },

  // 3. cookie of Food
  {
    id: 401,
    category: 'food',
    sub: 'cookie',
    title: 'Cinnamon Cookies',
    price: 7.20,
    img: './src/assets/images/menu/Cookie/Cookie_CinnamonCookies.png',
    desc: 'Crisp cinnamon cookies dusted with spiced sugar.',
    tags: ['vegan', 'bestseller'],
    cal: '200 kcal'
  },
  {
    id: 402,
    category: 'food',
    sub: 'cookie',
    title: 'Chocolate Chip Cookies',
    price: 4.50,
    img: './src/assets/images/menu/Cookie/Cookie_ChocolateChipCookies.png',
    desc: 'Classic chocolate chunk cookies with gooey centers.',
    tags: ['bakery'],
    cal: '220 kcal'
  },
  {
    id: 403,
    category: 'food',
    sub: 'cookie',
    title: 'Thumbprint',
    price: 6.90,
    img: './src/assets/images/menu/Cookie/Cookie_Thumbprint.png',
    desc: 'Buttery thumbprint cookies filled with fruit jam.',
    tags: ['classic'],
    cal: '210 kcal'
  },
  {
    id: 404,
    category: 'food',
    sub: 'cookie',
    title: 'Peanut Butter Cookie Cups',
    price: 2.80,
    img: './src/assets/images/menu/Cookie/Cookie_PeanutButterCookieCups.png',
    desc: 'Peanut butter cookie cups with a sweet center.',
    tags: ['nutty'],
    cal: '260 kcal'
  },

  // 4. cake of food
  {
    id: 501,
    category: 'food',
    sub: 'cake',
    title: 'Almond Frangipane',
    price: 7.20,
    img: './src/assets/images/menu/Cake/Cake_AlmondFrangipane.png',
    desc: 'Flaky tart with rich almond frangipane filling.',
    tags: ['pastry'],
    cal: '380 kcal'
  },
  {
    id: 502,
    category: 'food',
    sub: 'cake',
    title: 'Black Tea Cake',
    price: 4.50,
    img: './src/assets/images/menu/Cake/Cake_BlackTeaCake.png',
    desc: 'Light cake infused with aromatic black tea.',
    tags: ['tea-flavored'],
    cal: '300 kcal'
  },
  {
    id: 503,
    category: 'food',
    sub: 'cake',
    title: 'Chocolate Cup Cakes',
    price: 6.90,
    img: './src/assets/images/menu/Cake/Cake_ChocolateCupCakes.png',
    desc: 'Rich chocolate cupcakes topped with frosting.',
    tags: ['chocolate'],
    cal: '420 kcal'
  },
  {
    id: 504,
    category: 'food',
    sub: 'cake',
    title: 'Matcha White Chocolate',
    price: 2.80,
    img: './src/assets/images/menu/Cake/Cake_MatchWhiteChocolate.png',
    desc: 'Matcha sponge cake with white chocolate glaze.',
    tags: ['matcha'],
    cal: '260 kcal'
  },
  {
    id: 601,
    category: 'food',
    sub: 'cake',
    title: 'Red Velvet Royale',
    price: 7.20,
    img: './src/assets/images/menu/Cake/Cake_RedVekvetRoyale.png',
    desc: 'Velvety red cake layered with cream cheese frosting.',
    tags: ['bestseller'],
    cal: '430 kcal'
  },
  {
    id: 602,
    category: 'food',
    sub: 'cake',
    title: 'Banana Walnut Loaf',
    price: 4.50,
    img: './src/assets/images/menu/Cake/Cake_BananaWalnutLoaf.png',
    desc: 'Moist banana loaf studded with crunchy walnuts.',
    tags: ['loaf'],
    cal: '340 kcal'
  },
  {
    id: 603,
    category: 'food',
    sub: 'cake',
    title: 'Chocolate Cheesecake',
    price: 6.90,
    img: './src/assets/images/menu/Cake/Cake_ChocolateCheesecake.png',
    desc: 'Creamy chocolate cheesecake slice with rich filling.',
    tags: ['cheesecake'],
    cal: '450 kcal'
  },
  {
    id: 604,
    category: 'food',
    sub: 'cake',
    title: 'Lemon Drizzle Cake',
    price: 2.80,
    img: './src/assets/images/menu/Cake/Cake_LemonDrizzleCake.png',
    desc: 'Zesty lemon drizzle cake with a sugary finish.',
    tags: ['citrus'],
    cal: '300 kcal'
  },
  {
    id: 701,
    category: 'food',
    sub: 'cake',
    title: 'Opera Slice',
    price: 6.90,
    img: './src/assets/images/menu/Cake/Cake_OperaSlice.png',
    desc: 'Layered opera slice with coffee and chocolate notes.',
    tags: ['classic'],
    cal: '410 kcal'
  },
  {
    id: 702,
    category: 'food',
    sub: 'cake',
    title: 'Tiramisu Delight',
    price: 2.80,
    img: './src/assets/images/menu/Cake/Cake_TiramisuDelight.png',
    desc: 'Classic tiramisu with mascarpone and espresso-soaked sponge.',
    tags: ['coffee'],
    cal: '380 kcal'
  },

  // Part 2 Drink
  // 1. coffee of drink
  {
    id: 801,
    category: 'drink',
    sub: 'coffee',
    title: 'Americano',
    price: 3.80,
    img: './src/assets/images/menu/coffee/coffee_Americano.png',
    desc: 'Robust Americano brewed from rich espresso shots.',
    tags: ['hot'],
    cal: '10 kcal'
  },
  {
    id: 802,
    category: 'drink',
    sub: 'coffee',
    title: 'Cappuccino',
    price: 3.80,
    img: './src/assets/images/menu/coffee/coffee_Cappuccino.png',
    desc: 'Creamy cappuccino with steamed milk and foam.',
    tags: ['hot', 'milk'],
    cal: '150 kcal'
  },
  {
    id: 803,
    category: 'drink',
    sub: 'coffee',
    title: 'Cold Brew',
    price: 3.00,
    img: './src/assets/images/menu/coffee/coffee_Coldbrew.png',
    desc: 'Smooth cold brew steeped for a clean, mellow taste.',
    tags: ['cold'],
    cal: '5 kcal'
  },
  {
    id: 804,
    category: 'drink',
    sub: 'coffee',
    title: 'Expresso',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Expresso.png',
    desc: 'Intense single-shot espresso with a rich crema.',
    tags: ['hot'],
    cal: '5 kcal'
  },
  {
    id: 901,
    category: 'drink',
    sub: 'coffee',
    title: 'Flatwhite',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Flatwhite.png',
    desc: 'Smooth flat white with silky steamed milk over espresso.',
    tags: ['hot', 'milk'],
    cal: '120 kcal'
  },
  {
    id: 902,
    category: 'drink',
    sub: 'coffee',
    title: 'Frappe',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Frappe.png',
    desc: 'Iced frappe blended to a frothy, chilled finish.',
    tags: ['cold'],
    cal: '180 kcal'
  },
  {
    id: 903,
    category: 'drink',
    sub: 'coffee',
    title: 'Irsh Coffee',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Irshcoffee.png',
    desc: 'Irish-style coffee with warmth and a hint of liqueur.',
    tags: ['warm'],
    cal: '210 kcal'
  },
  {
    id: 904,
    category: 'drink',
    sub: 'coffee',
    title: 'Latte',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Latte.png',
    desc: 'Classic latte with steamed milk and a smooth espresso base.',
    tags: ['hot', 'milk'],
    cal: '140 kcal'
  },
  {
    id: 1001,
    category: 'drink',
    sub: 'coffee',
    title: 'Long Black',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Longblack.png',
    desc: 'Long black made by topping hot water with espresso shots.',
    tags: ['hot'],
    cal: '10 kcal'
  },
  {
    id: 1002,
    category: 'drink',
    sub: 'coffee',
    title: 'Mocha',
    price: 2.50,
    img: './src/assets/images/menu/coffee/coffee_Mocha.png',
    desc: 'Chocolate mocha blending espresso and steamed chocolate milk.',
    tags: ['chocolate'],
    cal: '220 kcal'
  },

  // 2. tea
  {
    id: 1101,
    category: 'drink',
    sub: 'tea',
    title: 'Black Tea',
    price: 2.50,
    img: './src/assets/images/menu/tea/tea_Blacktea.png',
    desc: 'Full-bodied black tea brewed to a brisk finish.',
    tags: ['hot'],
    cal: '2 kcal'
  },
  {
    id: 1102,
    category: 'drink',
    sub: 'tea',
    title: 'Ginger Tea',
    price: 2.50,
    img: './src/assets/images/menu/tea/tea_Gingertea.png',
    desc: 'Warming ginger tea with bright, spicy notes.',
    tags: ['hot'],
    cal: '5 kcal'
  },
  {
    id: 1103,
    category: 'drink',
    sub: 'tea',
    title: 'Green Tea',
    price: 2.50,
    img: './src/assets/images/menu/tea/tea_Greentea.png',
    desc: 'Delicate green tea with vegetal, fresh flavors.',
    tags: ['hot'],
    cal: '2 kcal'
  },
  {
    id: 1104,
    category: 'drink',
    sub: 'tea',
    title: 'White Tea',
    price: 2.50,
    img: './src/assets/images/menu/tea/tea_Whitetea.png',
    desc: 'Light, subtle white tea with floral aroma.',
    tags: ['hot'],
    cal: '2 kcal'
  },

  // 3. juice
  {
    id: 1201,
    category: 'drink',
    sub: 'juice',
    title: 'Beatroot',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Beatroot.png',
    desc: 'Earthy beetroot juice, fresh-pressed and vibrant.',
    tags: ['cold'],
    cal: '60 kcal'
  },
  {
    id: 1202,
    category: 'drink',
    sub: 'juice',
    title: 'Kiwi',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Kiwi.png',
    desc: 'Tart-sweet kiwi juice with refreshing zing.',
    tags: ['cold'],
    cal: '55 kcal'
  },
  {
    id: 1203,
    category: 'drink',
    sub: 'juice',
    title: 'Lemonada',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Lemonada.png',
    desc: 'Sharp, chilled lemonade with bright citrus notes.',
    tags: ['cold'],
    cal: '45 kcal'
  },
  {
    id: 1204,
    category: 'drink',
    sub: 'juice',
    title: 'Mongo',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Mongo.png',
    desc: 'Rich mango juice, sweet and tropical.',
    tags: ['cold'],
    cal: '110 kcal'
  },
  {
    id: 1301,
    category: 'drink',
    sub: 'juice',
    title: 'Orange',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Orange.png',
    desc: 'Fresh-squeezed orange juice, bright and tangy.',
    tags: ['cold'],
    cal: '80 kcal'
  },
  {
    id: 1302,
    category: 'drink',
    sub: 'juice',
    title: 'Tomato',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Tomato.png',
    desc: 'Savory tomato juice with a clean, full-bodied taste.',
    tags: ['cold'],
    cal: '40 kcal'
  },
  {
    id: 1303,
    category: 'drink',
    sub: 'juice',
    title: 'Watermelon',
    price: 2.50,
    img: './src/assets/images/menu/juice/juice_Watermelon.png',
    desc: 'Light watermelon juice, subtly sweet and hydrating.',
    tags: ['cold'],
    cal: '60 kcal'
  }
];

// ----------------- Script logic -----------------
// DOM refs
const grid = document.getElementById('menuGrid');
const q = document.getElementById('q');
const sortEl = document.getElementById('sort');
const drawer = document.getElementById('drawer');

let activeSub = 'all';

// Helpers
function formatP(n) { return '€' + n.toFixed(2); }

function getDetail(p) {
  // keep title, price, calories unchanged in PRODUCTS
  // additional preview details shown in drawer only
  return `${p.desc} Preparation: freshly prepared using our kitchen recipes and finest ingredients. Serving suggestion: enjoy hot or cold depending on item. Allergy note: may contain gluten, dairy, nuts.`;
}

// Product card markup (includes overlay + See more)
function articleMarkup(p) {
  return `
    <article class="product" data-id="${p.id}" tabindex="0" aria-labelledby="title-${p.id}">
      <div class="product-media">
        <img src="${p.img}" alt="${p.title}" />
        <div class="media-overlay">
          <button class="see-more" data-id="${p.id}" aria-label="See more about ${p.title}">See more</button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-row">
          <h3 id="title-${p.id}" class="product-title">${p.title}</h3>
          <div class="price">${formatP(p.price)}</div>
        </div>
        <p class="product-sub">${p.desc}</p>
        <div class="product-tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="product-footer">
          <div class="muted">Calories: ${p.cal}</div>
          <div><button class="btn-ghost quick-view" data-id="${p.id}">Quick View</button></div>
        </div>
      </div>
    </article>
  `;
}

// get currently active main category
function getActiveMainCategory() {
  return document.querySelector('.filters-vertical .chip.active')?.dataset.filter || 'all';
}

// Rendering logic
function renderProducts(list) {
  const active = getActiveMainCategory();

  // If user chose All -> single flat grid with four items per row, preserve list order
  if (active === 'all') {
    // produce a single grid wrapper that CSS will style as 4-column on desktop
    const html = `<div class="flat-grid">${list.map(articleMarkup).join('')}</div>`;
    grid.innerHTML = html;
    return;
  }

  // For Food or Drink -> group by sub and order preferred subs first
  const preferredOrder = active === 'drink'
    ? ['coffee', 'tea', 'juice']
    : ['bread', 'cake', 'sandwich', 'cookie'];

  const groups = {};
  const order = [];
  list.forEach(p => {
    const key = p.sub || 'other';
    if (!groups[key]) { groups[key] = []; order.push(key); }
    groups[key].push(p);
  });

  // Create final ordering of subgroups: preferred first, then others in discovered order
  const finalOrder = [];
  preferredOrder.forEach(s => { if (groups[s]) finalOrder.push(s); });
  order.forEach(s => { if (!finalOrder.includes(s)) finalOrder.push(s); });

  const htmlParts = [];
  finalOrder.forEach(sub => {
    const heading = sub.charAt(0).toUpperCase() + sub.slice(1);
    htmlParts.push(`<div class="sub-section"><h2 class="sub-title">${heading}</h2>`);
    htmlParts.push('<div class="sub-grid">');
    htmlParts.push(groups[sub].map(articleMarkup).join(''));
    htmlParts.push('</div></div>');
  });

  grid.innerHTML = htmlParts.join('');
}

// Filtering and sorting
function applyFilterSort() {
  const qv = (q && q.value || '').trim().toLowerCase();
  const active = getActiveMainCategory();

  let out = PRODUCTS.filter(p => {
    const byChip = active === 'all' ? true : p.category === active;
    const bySub = activeSub === 'all' ? true : p.sub === activeSub;
    const combined = (p.title + ' ' + p.desc + ' ' + (p.tags||[]).join(' ')).toLowerCase();
    const byQuery = qv === '' ? true : combined.includes(qv);
    return byChip && bySub && byQuery;
  });

  const s = sortEl && sortEl.value;
  if (s === 'price-asc') out.sort((a,b)=>a.price-b.price);
  else if (s === 'price-desc') out.sort((a,b)=>b.price-a.price);
  else if (s === 'alpha') out.sort((a,b)=>a.title.localeCompare(b.title));
  // If no sort selected, keep original order for All view and for subgroups preserve grouping insertion order

  renderProducts(out);
}

// Render left sub filters (vertical chips)
function renderSubFiltersFor(category) {
  const container = document.getElementById('subFilters');
  if (!container) return;

  const subs = new Set();
  PRODUCTS.forEach(p => {
    if (category === 'all' || p.category === category) {
      if (p.sub) subs.add(p.sub);
    }
  });

  const arr = Array.from(subs).sort();
  if (arr.length === 0) {
    container.innerHTML = '';
    container.setAttribute('aria-hidden','true');
    activeSub = 'all';
    return;
  }

  const parts = [];
  parts.push(`<div class="sub-filters-inner">`);
  parts.push(`<button class="chip sub-chip ${activeSub==='all'?'active':''}" data-sub="all">All</button>`);
  arr.forEach(s => {
    parts.push(`<button class="chip sub-chip ${activeSub===s?'active':''}" data-sub="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</button>`);
  });
  parts.push(`</div>`);
  container.innerHTML = parts.join('');
  container.setAttribute('aria-hidden','false');
}

// Drawer preview
function openDrawer(id) {
  const p = PRODUCTS.find(x => x.id == id);
  if (!p) return;
  document.getElementById('drawerTitle').textContent = p.title;
  document.getElementById('drawerCategory').textContent = p.category.toUpperCase();
  document.getElementById('drawerMedia').innerHTML = `<img src="${p.img}" alt="${p.title}" />`;
  document.getElementById('drawerPrice').textContent = formatP(p.price);
  document.getElementById('drawerDesc').innerHTML = `
    <p class="drawer-detail-desc">${getDetail(p)}</p>
    <p><strong>Calories:</strong> ${p.cal}</p>
    <p><strong>Tags:</strong> ${(p.tags||[]).join(', ')}</p>
  `;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
}

// Event handling
document.addEventListener('click', function(e) {
  const t = e.target;

  if (t.matches('.see-more')) { e.preventDefault(); openDrawer(t.dataset.id); return; }
  if (t.matches('.quick-view')) { e.preventDefault(); openDrawer(t.dataset.id); return; }

  // main category chips
  if (t.closest('.filters-vertical') && t.classList.contains('chip')) {
    document.querySelectorAll('.filters-vertical .chip').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    activeSub = 'all';
    renderSubFiltersFor(t.dataset.filter || 'all');
    applyFilterSort();
    return;
  }

  // sub-chip clicks
  if (t.classList.contains('sub-chip')) {
    document.querySelectorAll('.sub-chip').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    activeSub = t.dataset.sub || 'all';
    applyFilterSort();
    return;
  }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const active = document.activeElement;
    if (active && active.closest && active.closest('.product')) {
      const id = active.closest('.product').dataset.id;
      if (id) openDrawer(id);
    }
  }
});

// Drawer close + ESC
const drawerCloseBtn = document.getElementById('drawerClose');
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', function(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); } });

// search & sort listeners
if (q) q.addEventListener('input', applyFilterSort);
if (sortEl) sortEl.addEventListener('change', applyFilterSort);

// initial render using original PRODUCTS order
renderProducts(PRODUCTS);
renderSubFiltersFor(getActiveMainCategory());
