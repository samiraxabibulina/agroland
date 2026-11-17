/* ================== ТЕКСТЫ (RU / UZ / EN) ================== */
var STR = {
  ru: { sub:'мини-приложение', farm:'Хозяйство', hello:'Ваши поля под контролем', hello2:'Всё важное для здорового урожая',
    overview:'ОБЗОР ХОЗЯЙСТВА', nfields:'Полей: {n}', attn:'Требуют внимания: {n}', monitoring:'Мониторинг', upd:'Данные на {d}',
    tFields:'Поля', tFieldsSub:'Открыть карту', tDry:'Сухость', tSal:'Засоление', tIrr:'Полив', irrSub:'Норма по FAO-56',
    drySub:'Полей: {n} · низкая влага', salSub:'Полей: {n} · проверить', fine:'В пределах нормы',
    myfields:'Мои поля', demo:'Демо-данные · предварительный расчёт',
    home:'Главная', map:'Карта', tasks:'Задачи', more:'Ещё',
    ok:'Норма', dry:'Сухо', saline:'Засоление', crop:'Культура', irr:'Норма полива', date:'Данные на',
    history:'История (NDVI)', advice:'Совет', prelim:'Предварительно',
    prelimNote:'Расчёт по спутниковым моделям, до наземной калибровки',
    done:'Отметить выполненным', saved:'Записано в журнал', recDone:'Рекомендация выполнена', journal:'Журнал действий',
    empty:'Пока нет записей', close:'Закрыть', mm:'мм', ha:'га', loading:'Загрузка…', error:'Не удалось загрузить данные',
    about:'AgroLand показывает состояние полей по спутниковым снимкам Sentinel-2: индексы NDVI, SI 1, SWIR SI и норму полива по FAO-56.',
    crops:{ cotton:'Хлопок' },
    adviceBy:{ ok:'Полив по графику, критических отклонений нет.', dry:'Влажность низкая: запланируйте полив в ближайшие дни.', saline:'Признаки засоления: нужна промывка и проверка на месте.' } },
  uz: { sub:'mini-ilova', farm:'Xo‘jalik', hello:'Dalalaringiz nazorat ostida', hello2:'Sog‘lom hosil uchun barcha muhim ma’lumot',
    overview:'XO‘JALIK SHARHI', nfields:'Dalalar: {n}', attn:'Diqqat talab qiladi: {n}', monitoring:'Monitoring', upd:'Ma’lumot sanasi {d}',
    tFields:'Dalalar', tFieldsSub:'Xaritani ochish', tDry:'Qurg‘oqchilik', tSal:'Sho‘rlanish', tIrr:'Sug‘orish', irrSub:'FAO-56 me’yori',
    drySub:'Dalalar: {n} · namlik past', salSub:'Dalalar: {n} · tekshirish', fine:'Me’yorda',
    myfields:'Mening dalalarim', demo:'Demo ma’lumotlar · dastlabki hisob',
    home:'Bosh sahifa', map:'Xarita', tasks:'Vazifalar', more:'Yana',
    ok:'Normal', dry:'Quruq', saline:'Sho‘rlanish', crop:'Ekin', irr:'Sug‘orish me’yori', date:'Ma’lumot sanasi',
    history:'Tarix (NDVI)', advice:'Tavsiya', prelim:'Dastlabki',
    prelimNote:'Hisob sun’iy yo‘ldosh modellari asosida, yerdagi kalibrlashdan oldin',
    done:'Bajarildi deb belgilash', saved:'Jurnalga yozildi', recDone:'Tavsiya bajarildi', journal:'Harakatlar jurnali',
    empty:'Hozircha yozuv yo‘q', close:'Yopish', mm:'mm', ha:'ga', loading:'Yuklanmoqda…', error:'Ma’lumotni yuklab bo‘lmadi',
    about:'AgroLand dalalar holatini Sentinel-2 sun’iy yo‘ldosh suratlari bo‘yicha ko‘rsatadi: NDVI, SI 1, SWIR SI indekslari va FAO-56 bo‘yicha sug‘orish me’yori.',
    crops:{ cotton:'Paxta' },
    adviceBy:{ ok:'Sug‘orish jadval bo‘yicha, jiddiy og‘ish yo‘q.', dry:'Namlik past: yaqin kunlarda sug‘orishni rejalashtiring.', saline:'Sho‘rlanish belgilari: yuvish va joyida tekshirish kerak.' } },
  en: { sub:'mini app', farm:'Farm', hello:'Your fields under control', hello2:'Everything for a healthy harvest',
    overview:'FARM OVERVIEW', nfields:'Fields: {n}', attn:'Need attention: {n}', monitoring:'Monitoring', upd:'Data as of {d}',
    tFields:'Fields', tFieldsSub:'Open map', tDry:'Dryness', tSal:'Salinity', tIrr:'Irrigation', irrSub:'FAO-56 norm',
    drySub:'Fields: {n} · low moisture', salSub:'Fields: {n} · check', fine:'Within normal',
    myfields:'My fields', demo:'Demo data · preliminary estimate',
    home:'Home', map:'Map', tasks:'Tasks', more:'More',
    ok:'Normal', dry:'Dry', saline:'Saline', crop:'Crop', irr:'Irrigation norm', date:'Data as of',
    history:'History (NDVI)', advice:'Advice', prelim:'Preliminary',prelimNote:'Estimated from satellite models, before ground calibration',
    done:'Mark as done', saved:'Saved to log', recDone:'Recommendation done', journal:'Action log',
    empty:'No entries yet', close:'Close', mm:'mm', ha:'ha', loading:'Loading…', error:'Could not load data',
    about:'AgroLand shows field conditions from Sentinel-2 satellite imagery: NDVI, SI 1, SWIR SI indices and the FAO-56 irrigation norm.',
    crops:{ cotton:'Cotton' },
    adviceBy:{ ok:'Irrigate on schedule, no critical deviations.', dry:'Low moisture: plan irrigation in the coming days.', saline:'Signs of salinity: flushing and an on-site check are needed.' } }
};
var COLORS = { ok:'#2f9e44', dry:'#e8a800', saline:'#d6336c' };
var ICONS = { home:'🏠', map:'🗺', tasks:'✅', more:'⋯' };
var TABS = ['home', 'map', 'tasks', 'more'];

function T(s, o) { return s.replace(/\{(\w+)\}/g, function (m, k) { return o[k] !== undefined ? o[k] : ''; }); }
function L() { return STR[lang]; }
function $(id) { return document.getElementById(id); }
function store(k, v) {
  try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {}
  return null;
}

/* ================== ДАННЫЕ ================== */
async function getFields() {
  if (!API_URL) return MOCK_FIELDS;
  var r = await fetch(API_URL + '/fields');
  if (!r.ok) throw new Error('fields');
  return r.json();
}
async function getHistory(id) {
  if (!API_URL) return MOCK_HISTORY[id] || [];
  var r = await fetch(API_URL + '/fields/' + id + '/history');
  if (!r.ok) return [];
  return r.json();
}

/* ================== СОСТОЯНИЕ ================== */
var params = new URLSearchParams(location.search);
var tg = window.Telegram && Telegram.WebApp ? Telegram.WebApp : null;
var tgUser = tg && tg.initDataUnsafe ? tg.initDataUnsafe.user : null;
var lang = [params.get('lang'), store('lang'), tgUser && tgUser.language_code].filter(function (l) { return STR[l]; })[0] || 'ru';
var tab = 'home', selectedId = null, fields = null, layer = null;
var journal = [];
try { journal = JSON.parse(store('journal') || '[]'); } catch (e) { journal = []; }

if (tg) {
  tg.ready();
  tg.expand();
  tg.BackButton.onClick(function () { setTab('home'); });
}

var map = L.map('map', { zoomControl: false }).setView([40.3, 68.3], 8);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: 'Tiles © Esri', maxZoom: 18 }).addTo(map);

function props() { return fields.features.map(function (f) { return f.properties; }); }
function findField(id) { return props().filter(function (p) { return p.id === id; })[0]; }
function cropName(c) { return L().crops[c] || c; }

/* ================== ГЛАВНАЯ ================== */
function renderHome() {
  var t = L(), ps = props(), total = 0, dry = 0, sal = 0, last = '';
  ps.forEach(function (p) {
    total += p.area_ha || 0;
    if (p.status === 'dry') dry++;
    if (p.status === 'saline') sal++;
    if (p.updated_at > last) last = p.updated_at;
  });
  var attn = dry + sal, h = '';
  h += '<div class="farm">🏠 ' + t.farm + ' «' + FARM + '»</div>';
  h += '<h1>' + t.hello + '</h1><p class="sub">' + t.hello2 + '</p>';
  h += '<div class="hero"><div class="hr"><span>' + t.overview + '</span><span>☀ +' + WEATHER.temp + '°</span></div>';
  h += '<div class="big">' + total + ' <small>' + t.ha + '</small></div>';
  h += '<p>' + T(t.nfields, { n: ps.length }) + '</p>';
  h += '<a class="attn" onclick="setTab(\'map\')">⚠ ' + T(t.attn, { n: attn }) + ' →</a></div>';
  h += '<h2>' + t.monitoring + '</h2><p class="upd">' + T(t.upd, { d: last }) + '</p>';
  h += '<div class="grid2">';
  h += '<div class="tile g" onclick="setTab(\'map\')"><div class="ic">🗺</div><b>' + t.tFields + '</b><small>' + T(t.nfields, { n: ps.length }) + ' · ' + total + ' ' + t.ha + '</small><small>' + t.tFieldsSub + '</small></div>';h += '<div class="tile p" onclick="setTab(\'map\')"><div class="ic">💧</div><b>' + t.tDry + '</b><small>' + (dry ? T(t.drySub, { n: dry }) : t.fine) + '</small></div>';
  h += '<div class="tile g" onclick="setTab(\'map\')"><div class="ic">🧂</div><b>' + t.tSal + '</b><small>' + (sal ? T(t.salSub, { n: sal }) : t.fine) + '</small></div>';
  h += '<div class="tile g" onclick="setTab(\'map\')"><div class="ic">🚿</div><b>' + t.tIrr + '</b><small>' + t.irrSub + '</small></div>';
  h += '</div>';
  h += '<h2>' + t.myfields + '</h2><div style="height:10px"></div>';
  ps.forEach(function (p) {
    h += '<div class="row" onclick="openField(\'' + p.id + '\')"><div class="sw" style="background:' + COLORS[p.status] + '"></div>';
    h += '<div class="n"><b>' + p.name + '</b><small>' + cropName(p.crop) + ' · ' + p.area_ha + ' ' + t.ha + '</small></div>';
    h += '<span class="pill" style="background:' + COLORS[p.status] + '">' + t[p.status] + '</span></div>';
  });
  h += '<p class="demo">' + t.demo + '</p>';
  $('tab-home').innerHTML = h;
}

/* ================== ЗАДАЧИ И ЕЩЁ ================== */
function renderTasks() {
  var t = L(), h = '<h2 style="margin-top:8px">' + t.journal + '</h2><div style="height:10px"></div>';
  if (!journal.length) h += '<p class="empty">' + t.empty + '</p>';
  journal.forEach(function (j) {
    var p = fields ? findField(j.id) : null;
    h += '<div class="jr"><b>' + (p ? p.name : j.id) + '</b><br>' + t.recDone + '<br><small>' + j.ts + '</small></div>';
  });
  $('tab-tasks').innerHTML = h;
}
function renderMore() {
  var t = L();
  $('tab-more').innerHTML = '<h2 style="margin-top:8px">AgroLand</h2><p class="about">' + t.about + '</p><p class="note">⚠ ' + t.prelimNote + '</p>';
}

/* ================== КАРТА ================== */
function renderLegend() {
  var t = L(), h = '';
  ['ok', 'dry', 'saline'].forEach(function (s) { h += '<li><i style="background:' + COLORS[s] + '"></i>' + t[s] + '</li>'; });
  $('legend').innerHTML = h;
}
function drawFields() {
  if (layer) map.removeLayer(layer);
  var t = L();
  layer = L.geoJSON(fields, {
    style: function (f) {
      var sel = f.properties.id === selectedId;
      return { color: sel ? '#ffffff' : COLORS[f.properties.status], weight: sel ? 4 : 2, fillColor: COLORS[f.properties.status], fillOpacity: 0.45 };
    },
    onEachFeature: function (f, l) {
      l.bindTooltip(t[f.properties.status], { permanent: true, direction: 'center', className: 'field-label' });
      l.on('click', function () { selectField(f.properties.id); });
    }
  }).addTo(map);
}
function fit() {
  var feats = selectedId ? fields.features.filter(function (f) { return f.properties.id === selectedId; }) : fields.features;
  var b = L.geoJSON({ type: 'FeatureCollection', features: feats }).getBounds();
  if (b.isValid()) map.fitBounds(b, { padding: [60, 60], maxZoom: 16 });
}
function chartSvg(data) {
  if (!data.length) return '';
  var W = 320, H = 140, pl = 30, pr = 12, pt = 10, pb = 24;
  function x(i) { return data.length === 1 ? W / 2 : pl + i * (W - pl - pr) / (data.length - 1); }
  function y(v) { return pt + (1 - v) * (H - pt - pb); }
  var pts = data.map(function (d, i) { return x(i) + ',' + y(d.ndvi); }).join(' ');
  var g = '';
  [0, 0.5, 1].forEach(function (v) {
    g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#d9d5c7" stroke-dasharray="3 3"/>';
    g += '<text x="' + (pl - 6) + '" y="' + (y(v) + 4) + '" font-size="11" text-anchor="end" fill="#6b6f60">' + v + '</text>';
  });
  var dots = data.map(function (d, i) {
    return '<circle cx="' + x(i) + '" cy="' + y(d.ndvi) + '" r="4" fill="#1e5b4a"/>' +
      '<text x="' + x(i) + '" y="' + (y(d.ndvi) - 8) + '" font-size="11" text-anchor="middle" fill="#1f2a24">' + d.ndvi + '</text>' +'<text x="' + x(i) + '" y="' + (H - 6) + '" font-size="11" text-anchor="middle" fill="#6b6f60">' + d.date.slice(5) + '</text>';
  }).join('');
  return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '">' + g + '<polyline points="' + pts + '" fill="none" stroke="#1e5b4a" stroke-width="2.5"/>' + dots + '</svg>';
}
async function renderCard() {
  var card = $('card'), f = selectedId && fields ? findField(selectedId) : null;
  if (!f) { card.classList.remove('open'); return; }
  var t = L(), hist = await getHistory(f.id), h = '';
  h += '<div class="ch"><div><h2>' + f.name + '</h2><span class="pill" style="background:' + COLORS[f.status] + '">' + t[f.status] + '</span>';
  if (f.preliminary) h += '<span class="pill prelim">' + t.prelim + '</span>';
  h += '</div><button class="close" aria-label="' + t.close + '" onclick="selectField(null)">×</button></div>';
  h += '<div class="dl">';
  h += '<div><small>' + t.crop + '</small><b>' + cropName(f.crop) + '</b></div>';
  h += '<div><small>NDVI</small><b>' + f.ndvi + '</b></div>';
  h += '<div><small>SI 1</small><b>' + f.si1 + '</b></div>';
  h += '<div><small>SWIR SI</small><b>' + f.swir_si + '</b></div>';
  h += '<div><small>' + t.irr + '</small><b>' + f.irrigation_mm + ' ' + t.mm + '</b></div>';
  h += '<div><small>' + t.date + '</small><b>' + f.updated_at + '</b></div></div>';
  h += '<p class="advice"><b>' + t.advice + ':</b> ' + t.adviceBy[f.status] + '</p>';
  h += '<h3>' + t.history + '</h3>' + chartSvg(hist);
  if (f.preliminary) h += '<p class="note">⚠ ' + t.prelimNote + '</p>';
  h += '<button class="done" onclick="markDone(\'' + f.id + '\', this)">' + t.done + '</button>';
  card.innerHTML = h;
  card.classList.add('open');
}
function markDone(id, btn) {
  journal.unshift({ id: id, ts: new Date().toISOString().slice(0, 16).replace('T', ' ') });
  store('journal', JSON.stringify(journal));
  btn.disabled = true;
  btn.textContent = '✓ ' + L().saved;
  renderTasks();
}
function selectField(id) {
  selectedId = id;
  drawFields();
  fit();
  renderCard();
}
function openField(id) {
  setTab('map');
  selectField(id);
}

/* ================== НАВИГАЦИЯ И ЯЗЫК ================== */
function renderNav() {
  var t = L(), h = '';
  TABS.forEach(function (n) {
    h += '<button data-tab="' + n + '" class="' + (n === tab ? 'on' : '') + '" onclick="setTab(\'' + n + '\')"><span>' + ICONS[n] + '</span>' + t[n] + '</button>';
  });
  $('nav').innerHTML = h;
  $('sub').textContent = t.sub;
  $('lang').value = lang;
  document.documentElement.lang = lang;
}
function setTab(name) {
  tab = name;
  TABS.forEach(function (n) { $('tab-' + n).classList.toggle('on', n === name); });
  renderNav();
  if (name === 'map') setTimeout(function () { map.invalidateSize(); fit(); }, 50);
  if (tg) { if (name === 'home') tg.BackButton.hide(); else tg.BackButton.show(); }
}
function renderAll() {
  renderNav();
  if (!fields) return;
  renderHome(); renderTasks(); renderMore(); renderLegend();
  drawFields(); renderCard();
}
$('lang').onchange = function () {
  lang = this.value;
  store('lang', lang);
  renderAll();
};

/* ================== СТАРТ ================== */
renderNav();
$('tab-home').innerHTML = '<p class="empty">' + L().loading + '</p>';
setTab('home');
getFields().then(function (data) {
  fields = data;
  renderAll();
  var f = params.get('field');
  if (f && findField(f)) openField(f);
}).catch(function () {
  $('tab-home').innerHTML = '<p class="empty">' + L().error + '</p>';
});