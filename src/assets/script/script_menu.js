
/* ===========================
   Data (replace with real product feed)
   =========================== */
const PRODUCTS = [
  { id:101, category:'food', title:'Avocado Toast', price:7.20, img:'./src/assets/images/PickUp01.png', hero:'./src/assets/images/TopImg01.png', desc:'Smashed avocado, lemon, chilli, olive oil on toasted sourdough.', tags:['vegan','bestseller'], ingredients:'Avocado, sourdough, lemon, olive oil', allergens:'Gluten', cal:'420 kcal', sizes:[{label:'Regular',price:7.2},{label:'Double',price:9.5}]},
  { id:102, category:'food', title:'Seasonal Scone', price:4.50, img:'./src/assets/images/PickUp01.png', hero:'./src/assets/images/TopImg02.png', desc:'Buttery scone served with house jam.', tags:['bakery'], ingredients:'Flour, butter, sugar, eggs', allergens:'Dairy, Gluten, Eggs', cal:'350 kcal', sizes:[{label:'Single',price:4.5},{label:'Box 3',price:12.0}]},
  { id:103, category:'food', title:'Quiche Lorraine', price:6.90, img:'./src/assets/images/PickUp01.png', hero:'./src/assets/images/TopImg03.png', desc:'Classic quiche with smoky bacon and gruyere.', tags:['classic'], ingredients:'Egg, cream, bacon, cheese', allergens:'Eggs, Dairy, Gluten', cal:'520 kcal', sizes:[{label:'Slice',price:6.9}]},
  { id:201, category:'drink', title:'Espresso', price:2.80, img:'./src/assets/images/PickUp01.png', hero:'./src/assets/images/TopImg01.png', desc:'Rich single-origin espresso.', tags:['hot','espresso'], ingredients:'Coffee', allergens:'—', cal:'5 kcal', sizes:[{label:'Single',price:2.8},{label:'Double',price:3.6}]},
  { id:202, category:'drink', title:'Cappuccino', price:3.80, img:'./src/assets/images/PickUp01.png', hero:'./src/assets/images/TopImg02.png', desc:'Steamed milk and velvety foam over espresso.', tags:['hot','milk'], ingredients:'Espresso, milk', allergens:'Dairy', cal:'150 kcal', sizes:[{label:'Regular',price:3.8},{label:'Large',price:4.5}]},
  { id:203, category:'drink', title:'Iced Latte', price:4.20, img:'./src/assets/images/PickUp01.png', hero:'./src/assets/images/TopImg03.png', desc:'Chilled milk and espresso over ice.', tags:['cold'], ingredients:'Espresso, milk, ice', allergens:'Dairy', cal:'160 kcal', sizes:[{label:'Regular',price:4.2}]}
];

/* Helpers */
const fmt = n => '€' + n.toFixed(2);
const viewport = document.getElementById('subwayViewport');
const productsGridInner = document.getElementById('productsGridInner');

/* Build subway cards with elegant stagger and parallax */
function createCard(p, idx){
  const el = document.createElement('a');
  el.className = 'subway-card';
  el.href = `product-${p.id}.html`; // per-product pages for SEO
  el.setAttribute('role','listitem');
  el.dataset.id = p.id;
  el.innerHTML = `
    <div class="media"><img src="${p.hero||p.img}" alt="${p.title}"></div>
    <div class="layer"></div>
    <div class="content">
      <div class="title">${p.title}</div>
      <div class="meta">${p.tags.join(' • ')} • ${p.cal}</div>
      <div class="price">${fmt(p.price)}</div>
    </div>
  `;
  // staggered entrance
  setTimeout(()=> el.classList.add('visible'), 70 * idx);
  return el;
}

function populateSubway(){
  viewport.innerHTML = '';
  PRODUCTS.forEach((p,i) => viewport.appendChild(createCard(p,i)));
  requestAnimationFrame(updateCenterClasses);
}

/* Center detection assigns classes: center / near / far / distant */
function updateCenterClasses(){
  const cards = Array.from(viewport.children);
  if(!cards.length) return;
  const vp = viewport.getBoundingClientRect();
  const cx = vp.left + vp.width/2;
  cards.forEach(card => {
    const r = card.getBoundingClientRect();
    const cc = r.left + r.width/2;
    const d = Math.abs(cc - cx);
    card.classList.remove('center','near','far','distant');
    if(d < r.width * 0.55) card.classList.add('center');
    else if(d < r.width * 1.4) card.classList.add('near');
    else if(d < r.width * 2.6) card.classList.add('far');
    else card.classList.add('distant');
  });
}

/* Scroll to center card by delta */
function scrollByCard(delta){
  const cards = Array.from(viewport.children);
  if(!cards.length) return;
  const vp = viewport.getBoundingClientRect();
  const cx = vp.left + vp.width/2;
  let idx = 0, best = Infinity;
  cards.forEach((c,i)=>{ const r = c.getBoundingClientRect(); const cc = r.left + r.width/2; const dist = Math.abs(cc - cx); if(dist < best){ best = dist; idx = i; } });
  const target = Math.min(Math.max(idx + delta, 0), cards.length - 1);
  const t = cards[target].getBoundingClientRect();
  const offset = (t.left + t.width/2) - cx;
  viewport.scrollTo({ left: viewport.scrollLeft + offset, behavior: 'smooth' });
}

/* Auto-play rail (play/pause) */
let railInterval = null;
function startRailAuto(speed = 2000){
  if(railInterval) clearInterval(railInterval);
  railInterval = setInterval(()=> {
    scrollByCard(1);
  }, speed);
  document.getElementById('railPlay').style.display = 'none';
  document.getElementById('railPause').style.display = '';
}
function stopRailAuto(){
  if(railInterval) clearInterval(railInterval);
  railInterval = null;
  document.getElementById('railPlay').style.display = '';
  document.getElementById('railPause').style.display = 'none';
}

document.getElementById('prevBtn').addEventListener('click', ()=> scrollByCard(-1));
document.getElementById('nextBtn').addEventListener('click', ()=> scrollByCard(1));
document.getElementById('railPlay').addEventListener('click', ()=> startRailAuto(2300));
document.getElementById('railPause').addEventListener('click', ()=> stopRailAuto());

viewport.addEventListener('scroll', ()=> { window.clearTimeout(window._vpT); updateCenterClasses(); window._vpT = setTimeout(updateCenterClasses, 80); });
window.addEventListener('resize', updateCenterClasses);
document.addEventListener('keydown', e => { if(e.key==='ArrowRight') scrollByCard(1); if(e.key==='ArrowLeft') scrollByCard(-1); });

/* Build product grid */
function productHtml(p){
  return `
    <article class="product" data-id="${p.id}">
      <a href="product-${p.id}.html" aria-label="${p.title}">
        <div class="product-media"><img src="${p.img}" alt="${p.title}"></div>
      </a>
      <div class="product-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
          <a href="product-${p.id}.html"><div class="product-title">${p.title}</div></a>
          <div class="price">${fmt(p.price)}</div>
        </div>
        <div class="product-desc">${p.desc}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <div class="muted" style="font-size:13px">${p.tags.join(' • ')}</div>
          <div style="display:flex;gap:8px">
            <button class="filter-btn quick-view" data-id="${p.id}" type="button">Quick View</button>
            <button class="cta add-mini" data-id="${p.id}" type="button">Add</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(list = PRODUCTS){
  productsGridInner.innerHTML = list.map(productHtml).join('');
}

/* Filters/search/sort */
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterButtons = document.querySelectorAll('.filters .filter-btn');

function applyFilters(){
  const q = (searchInput.value||'').trim().toLowerCase();
  const active = Array.from(filterButtons).find(b => b.classList.contains('active'))?.dataset.filter || 'all';
  let out = PRODUCTS.filter(p => {
    const okCat = active==='all' ? true : p.category===active;
    const okQ = !q ? true : (p.title + ' ' + p.desc + ' ' + p.tags.join(' ') + ' ' + p.ingredients).toLowerCase().includes(q);
    return okCat && okQ;
  });
  const s = sortSelect.value;
  if(s==='price-asc') out.sort((a,b)=>a.price-b.price);
  else if(s==='price-desc') out.sort((a,b)=>b.price-a.price);
  else if(s==='alpha') out.sort((a,b)=>a.title.localeCompare(b.title));
  renderGrid(out);
}

filterButtons.forEach(btn => btn.addEventListener('click', () => { filterButtons.forEach(x=>x.classList.remove('active')); btn.classList.add('active'); applyFilters(); }));
document.querySelector('.filters .filter-btn[data-filter="all"]').classList.add('active');
searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

/* Drawer quick-view behavior + Cancel button */
const drawer = document.getElementById('drawer');
const drawerTitle = document.getElementById('drawerTitle');
const drawerCategory = document.getElementById('drawerCategory');
const drawerMedia = document.getElementById('drawerMedia');
const drawerPrice = document.getElementById('drawerPrice');
const drawerDesc = document.getElementById('drawerDesc');
const drawerSizes = document.getElementById('drawerSizes');
const drawerIngredients = document.getElementById('drawerIngredients');
const drawerAllergens = document.getElementById('drawerAllergens');
const drawerCalories = document.getElementById('drawerCalories');
const drawerAdd = document.getElementById('drawerAdd');
const drawerCancel = document.getElementById('drawerCancel');
const drawerClose = document.getElementById('drawerClose');

function openDrawer(id){
  const p = PRODUCTS.find(x=>String(x.id) === String(id)); if(!p) return;
  drawerTitle.textContent = p.title;
  drawerCategory.textContent = p.category.toUpperCase();
  drawerMedia.innerHTML = `<img src="${p.img}" alt="${p.title}">`;
  drawerPrice.textContent = fmt(p.price);
  drawerDesc.textContent = p.desc;
  drawerIngredients.textContent = p.ingredients || '—';
  drawerAllergens.textContent = p.allergens || '—';
  drawerCalories.textContent = p.cal || '—';
  drawerSizes.innerHTML = (p.sizes||[]).map(s => `<button class="size-pill" data-price="${s.price}">${s.label} — ${fmt(s.price)}</button>`).join('');
  const first = drawerSizes.querySelector('.size-pill'); if(first) first.classList.add('active');
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
  drawerAdd.dataset.id = p.id; drawerAdd.dataset.price = p.sizes?.[0]?.price || p.price;
}

function closeDrawer(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }

document.addEventListener('click', e => {
  const t = e.target;
  if(t.matches('.quick-view')) { openDrawer(t.dataset.id); return; }
  if(t === drawerCancel){ closeDrawer(); animateCancel(); return; } // cancel action with animation
  if(t === drawerClose) { closeDrawer(); return; }
  if(t === drawerAdd){ const id = drawerAdd.dataset.id; const price = parseFloat(drawerAdd.dataset.price || drawerPrice.textContent.replace(/[^\d.]/g,'')); addToCart({ id:String(id), title:drawerTitle.textContent, price, qty:1, img: drawerMedia.querySelector('img')?.src || '' }); }
  if(t.matches('.size-pill')) { drawerSizes.querySelectorAll('.size-pill').forEach(x=>x.classList.remove('active')); t.classList.add('active'); const p = parseFloat(t.dataset.price); drawerPrice.textContent = fmt(p); drawerAdd.dataset.price = p; }
  if(t.matches('.add-mini')) { const id = t.dataset.id; const p = PRODUCTS.find(x=>String(x.id)===String(id)); if(!p) return; addToCart({ id:String(p.id), title:p.title, price:p.price, qty:1, img:p.img }); t.textContent='✓ Added'; t.disabled=true; setTimeout(()=>{ t.textContent='Add'; t.disabled=false; },900); }
});

function animateCancel(){
  drawer.classList.add('closing');
  setTimeout(()=> drawer.classList.remove('closing'), 280);
}

document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDrawer(); });

/* Cart widget: localStorage, toggle via icon, hidden by default */
const CART_KEY = 'CART@CAFED';
const cartWidget = document.getElementById('cartWidget');
const cartIcon = document.getElementById('cartIcon');

function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCart(); }

function renderCart(){
  const cart = getCart();
  const total = cart.reduce((s,i)=>s + i.price * (i.qty||1), 0);
  cartWidget.innerHTML = `
    <div class="cart-panel" role="region" aria-label="Shopping cart">
      <div class="cart-header"><strong>Cart</strong><div><button id="clearCart" class="filter-btn">Clear</button></div></div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-footer"><div><div class="muted">Total</div><div id="cartTotal" style="font-weight:800">${fmt(total)}</div></div><div><button id="checkoutBtn" class="cta">Checkout</button></div></div>
    </div>
  `;
  const body = document.getElementById('cartBody');
  if(!cart.length){ body.innerHTML = '<div class="muted" style="padding:14px;text-align:center">Your cart is empty</div>'; return; }
  body.innerHTML = '';
  cart.forEach((it, idx) => {
    const row = document.createElement('div'); row.className='cart-item';
    row.innerHTML = `
      <img src="${it.img}" alt="${it.title}">
      <div style="flex:1"><div style="font-weight:700">${it.title}</div><div class="muted">€${it.price.toFixed(2)} × <span class="qty">${it.qty}</span></div></div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="filter-btn qty-minus" data-idx="${idx}">−</button>
        <button class="filter-btn qty-plus" data-idx="${idx}">+</button>
        <button class="filter-btn remove" data-idx="${idx}">✕</button>
      </div>
    `;
    body.appendChild(row);
  });
  cartWidget.classList.remove('hidden'); cartWidget.setAttribute('aria-hidden','false');
}

function addToCart(item){
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id && i.price === item.price);
  if(existing) existing.qty = (existing.qty||1) + (item.qty||1);
  else cart.push(Object.assign({qty:item.qty||1}, item));
  saveCart(cart);
}

cartWidget.addEventListener('click', e => {
  const t = e.target;
  if(t.id === 'clearCart'){ localStorage.removeItem(CART_KEY); renderCart(); cartWidget.classList.add('hidden'); cartWidget.setAttribute('aria-hidden','true'); return; }
  if(t.id === 'checkoutBtn'){ alert('Checkout placeholder — integrate payment flow'); return; }
  if(t.matches('.qty-plus')){ const idx=+t.dataset.idx; const c=getCart(); c[idx].qty=(c[idx].qty||1)+1; saveCart(c); return; }
  if(t.matches('.qty-minus')){ const idx=+t.dataset.idx; const c=getCart(); c[idx].qty=Math.max(1,(c[idx].qty||1)-1); saveCart(c); return; }
  if(t.matches('.remove')){ const idx=+t.dataset.idx; const c=getCart(); c.splice(idx,1); saveCart(c); return; }
});

cartIcon.addEventListener('click', ()=> {
  if(cartWidget.classList.contains('hidden')) renderCart();
  else { cartWidget.classList.add('hidden'); cartWidget.setAttribute('aria-hidden','true'); }
});

/* Header shrink on scroll (freeze effect) */
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{
  siteHeader.classList.toggle('shrink', window.scrollY > 40);
});

/* Init: render subway and grid */
function init(){
  // subway and grid render
  populateSubway();
  renderGrid(PRODUCTS);
  // ensure center calculation after images load
  setTimeout(updateCenterClasses, 120);
  // ResizeObserver to recalc
  if(window.ResizeObserver){
    const ro = new ResizeObserver(()=> updateCenterClasses());
    ro.observe(viewport);
  }
}
init();





