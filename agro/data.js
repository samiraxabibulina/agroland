/* ===== НАСТРОЙКИ ===== */
// Когда у Человека 2 будет API, впиши адрес, например 'https://api.example.com'. Пусто = моки ниже.
var API_URL = '';
var FARM = 'Росток';
var WEATHER = { temp: 24 };   // потом брать из API

/* ===== МОКИ: замени контуры и числа на свои (контуры из geojson.io) ===== */
var MOCK_FIELDS = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature',
      properties: { id: 'syr-01', name: 'Сырдарья, поле 1', crop: 'cotton', area_ha: 46, status: 'dry', ndvi: 0.41, si1: 0.18, swir_si: 0.22, irrigation_mm: 38, updated_at: '2026-10-28', preliminary: true },
      geometry: { type: 'Polygon', coordinates: [[[68.7800,40.5000],[68.7880,40.5000],[68.7880,40.5060],[68.7800,40.5060],[68.7800,40.5000]]] } },
    { type: 'Feature',
      properties: { id: 'jiz-01', name: 'Джизак, поле 1', crop: 'cotton', area_ha: 52, status: 'saline', ndvi: 0.29, si1: 0.46, swir_si: 0.51, irrigation_mm: 55, updated_at: '2026-10-28', preliminary: true },
      geometry: { type: 'Polygon', coordinates: [[[67.8400,40.1100],[67.8500,40.1100],[67.8500,40.1170],[67.8400,40.1170],[67.8400,40.1100]]] } }
  ]
};
var MOCK_HISTORY = {
  'syr-01': [ { date:'2026-09-30', ndvi:0.58 }, { date:'2026-10-14', ndvi:0.49 }, { date:'2026-10-28', ndvi:0.41 } ],
  'jiz-01': [ { date:'2026-09-30', ndvi:0.44 }, { date:'2026-10-14', ndvi:0.36 }, { date:'2026-10-28', ndvi:0.29 } ]
};