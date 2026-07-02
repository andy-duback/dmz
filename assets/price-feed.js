// Shared live-price fetcher used across the DMZ site (landing-page watchlist,
// and each week's own page). Tries Yahoo Finance's public chart endpoint
// directly, then via a CORS proxy as a fallback. Resolves null if everything
// fails (offline, endpoint blocked, rate-limited, etc.) so callers can just
// leave their static/fallback price in place.
window.fetchLivePrice = function(symbol){
  var direct = 'https://query1.finance.yahoo.com/v8/finance/chart/' + symbol;
  var directAlt = 'https://query2.finance.yahoo.com/v8/finance/chart/' + symbol;
  var targets = [
    direct,
    directAlt,
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(direct),
    'https://corsproxy.io/?url=' + encodeURIComponent(direct),
    'https://thingproxy.freeboard.io/fetch/' + direct
  ];
  function tryNext(i){
    if(i >= targets.length) return Promise.resolve(null);
    return fetch(targets[i], {cache:'no-store'})
      .then(function(r){ if(!r.ok) throw new Error('bad status'); return r.json(); })
      .then(function(data){
        var result = data && data.chart && data.chart.result && data.chart.result[0];
        if(!result || !result.meta || typeof result.meta.regularMarketPrice !== 'number') throw new Error('bad payload');
        var meta = result.meta;
        return {
          price: meta.regularMarketPrice,
          prevClose: meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice,
          marketState: meta.marketState
        };
      })
      .catch(function(){ return tryNext(i+1); });
  }
  return tryNext(0);
};

// Same as fetchLivePrice, but backed by a localStorage cache per symbol so a
// blocked/rate-limited fetch degrades to "last known price, as of <time>"
// instead of an empty/unavailable row. Always resolves an object (never
// null) as long as either a live fetch OR a previous successful fetch has
// ever happened on this device; resolves null only the very first time,
// with no network available.
window.fetchLivePriceCached = function(symbol){
  var cacheKey = 'dmz-price-' + symbol;
  function readCache(){
    try { return JSON.parse(localStorage.getItem(cacheKey) || 'null'); } catch(e){ return null; }
  }
  function writeCache(q){
    try { localStorage.setItem(cacheKey, JSON.stringify({q: q, fetchedAt: Date.now()})); } catch(e){}
  }
  return window.fetchLivePrice(symbol).then(function(q){
    if(q){
      writeCache(q);
      return Object.assign({}, q, {isLive: true});
    }
    var cached = readCache();
    if(cached && cached.q){
      return Object.assign({}, cached.q, {isLive: false, cachedAt: cached.fetchedAt});
    }
    return null;
  });
};
