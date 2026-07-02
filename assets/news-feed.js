// Shared live-headline fetcher used across the DMZ site. Pulls the ticker's
// Yahoo Finance RSS feed through rss2json (a free CORS-friendly RSS->JSON
// proxy) so this works from a plain static origin like GitHub Pages, where a
// direct cross-origin RSS fetch would be blocked. Resolves null if everything
// fails (offline, endpoint blocked, rate-limited, etc.) so callers can just
// leave their static/fallback headlines in place \u2014 the section never breaks,
// it just may not be the freshest data.
window.fetchLiveHeadlines = function(symbol, limit){
  limit = limit || 3;
  var maxAgeMs = 14 * 24 * 60 * 60 * 1000; // stories older than 2 weeks are dropped, not shown
  var rssUrl = 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=' + symbol + '&region=US&lang=en-US';
  var targets = [
    'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl),
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl),
    'https://corsproxy.io/?url=' + encodeURIComponent(rssUrl),
    'https://thingproxy.freeboard.io/fetch/' + rssUrl
  ];

  function isRecent(d){
    return d && !isNaN(d) && (Date.now() - d.getTime()) <= maxAgeMs;
  }

  function fromRss2Json(data){
    if(!data || data.status !== 'ok' || !Array.isArray(data.items) || !data.items.length) throw new Error('bad payload');
    return data.items
      .map(function(item){
        var d = item.pubDate ? new Date(item.pubDate) : null;
        return {
          headline: item.title,
          url: item.link,
          source: (item.author && item.author.trim()) || 'Yahoo Finance',
          date: d && !isNaN(d) ? d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) : '',
          _d: d
        };
      })
      .filter(function(h){ return isRecent(h._d); })
      .slice(0, limit);
  }

  // allorigins returns raw XML text, so it needs its own light parser.
  function fromRawXml(xmlText){
    var doc = new DOMParser().parseFromString(xmlText, 'text/xml');
    var items = Array.prototype.slice.call(doc.querySelectorAll('item'));
    if(!items.length) throw new Error('bad xml');
    return items
      .map(function(item){
        var title = (item.querySelector('title') || {}).textContent || '';
        var link = (item.querySelector('link') || {}).textContent || '';
        var pubDate = (item.querySelector('pubDate') || {}).textContent || '';
        var d = pubDate ? new Date(pubDate) : null;
        return {
          headline: title,
          url: link,
          source: 'Yahoo Finance',
          date: d && !isNaN(d) ? d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) : '',
          _d: d
        };
      })
      .filter(function(h){ return isRecent(h._d); })
      .slice(0, limit);
  }

  function tryNext(i){
    if(i >= targets.length) return Promise.resolve(null);
    var url = targets[i];
    var isRss2Json = url.indexOf('rss2json') !== -1;
    return fetch(url, {cache:'no-store'})
      .then(function(r){ if(!r.ok) throw new Error('bad status'); return isRss2Json ? r.json() : r.text(); })
      .then(function(data){
        var items = isRss2Json ? fromRss2Json(data) : fromRawXml(data);
        if(!items.length) throw new Error('nothing recent enough');
        return items;
      })
      .catch(function(){ return tryNext(i+1); });
  }

  return tryNext(0);
};
