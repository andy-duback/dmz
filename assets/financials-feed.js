// Shared live-financials fetcher used across the DMZ site. Pulls Yahoo
// Finance's public quoteSummary endpoint (summaryDetail + financialData +
// calendarEvents) directly, then via a CORS proxy as a fallback \u2014 same
// pattern as fetchLivePrice() in price-feed.js. Resolves null if everything
// fails so callers can leave their static/fallback numbers in place; nothing
// on the page ever breaks, it just may not be the freshest snapshot.
window.fetchLiveFinancials = function(symbol){
  var base = 'v10/finance/quoteSummary/' + symbol + '?modules=summaryDetail,financialData,calendarEvents';
  var direct = 'https://query1.finance.yahoo.com/' + base;
  var targets = [
    direct,
    'https://query2.finance.yahoo.com/' + base,
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(direct),
    'https://corsproxy.io/?url=' + encodeURIComponent(direct),
    'https://thingproxy.freeboard.io/fetch/' + direct
  ];

  function num(field){ return field && typeof field.raw === 'number' ? field.raw : null; }

  function tryNext(i){
    if(i >= targets.length) return Promise.resolve(null);
    return fetch(targets[i], {cache:'no-store'})
      .then(function(r){ if(!r.ok) throw new Error('bad status'); return r.json(); })
      .then(function(data){
        var result = data && data.quoteSummary && data.quoteSummary.result && data.quoteSummary.result[0];
        if(!result) throw new Error('bad payload');
        var sd = result.summaryDetail || {};
        var fd = result.financialData || {};
        var ce = result.calendarEvents || {};
        var earningsRaw = ce.earnings && ce.earnings.earningsDate && ce.earnings.earningsDate[0] && ce.earnings.earningsDate[0].raw;

        var out = {
          marketCap: num(sd.marketCap),
          trailingPE: num(sd.trailingPE),
          forwardPE: num(sd.forwardPE),
          dividendRate: num(sd.dividendRate),
          dividendYieldPct: num(sd.dividendYield) != null ? num(sd.dividendYield) * 100 : null,
          fiftyTwoWeekLow: num(sd.fiftyTwoWeekLow),
          fiftyTwoWeekHigh: num(sd.fiftyTwoWeekHigh),
          roePct: num(fd.returnOnEquity) != null ? num(fd.returnOnEquity) * 100 : null,
          totalDebt: num(fd.totalDebt),
          revenueTTM: num(fd.totalRevenue),
          earningsDate: earningsRaw ? new Date(earningsRaw * 1000) : null
        };
        if(out.marketCap == null && out.trailingPE == null) throw new Error('empty payload');
        return out;
      })
      .catch(function(){ return tryNext(i+1); });
  }
  // Yahoo's quoteSummary endpoint now requires an auth crumb, so it commonly
  // fails from a static origin even through a proxy. The chart endpoint (used by
  // price-feed.js) does work and carries the 52-week range, so fall back to that
  // for the fields it has rather than leaving them on the static seed.
  function chartFallback(){
    if(!window.fetchLivePrice) return Promise.resolve(null);
    var url = 'https://query1.finance.yahoo.com/v8/finance/chart/' + symbol;
    var hops = [
      url,
      'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
      'https://corsproxy.io/?url=' + encodeURIComponent(url)
    ];
    function hop(i){
      if(i >= hops.length) return Promise.resolve(null);
      return fetch(hops[i], {cache:'no-store'})
        .then(function(r){ if(!r.ok) throw new Error('bad status'); return r.json(); })
        .then(function(data){
          var meta = data && data.chart && data.chart.result && data.chart.result[0] && data.chart.result[0].meta;
          if(!meta) throw new Error('bad payload');
          return {
            fiftyTwoWeekLow: typeof meta.fiftyTwoWeekLow === 'number' ? meta.fiftyTwoWeekLow : null,
            fiftyTwoWeekHigh: typeof meta.fiftyTwoWeekHigh === 'number' ? meta.fiftyTwoWeekHigh : null
          };
        })
        .catch(function(){ return hop(i+1); });
    }
    return hop(0);
  }

  return tryNext(0).then(function(full){ return full || chartFallback(); });
};

// ---- formatting helpers shared by any page that renders these numbers ----
window.formatUSDCompact = function(n){
  if(n == null) return null;
  var abs = Math.abs(n);
  if(abs >= 1e12) return '$' + (n/1e12).toFixed(2) + 'T';
  if(abs >= 1e9) return '$' + (n/1e9).toFixed(1) + 'B';
  if(abs >= 1e6) return '$' + (n/1e6).toFixed(1) + 'M';
  return '$' + n.toFixed(0);
};
window.formatDateShort = function(d){
  if(!d || isNaN(d)) return null;
  return d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
};
