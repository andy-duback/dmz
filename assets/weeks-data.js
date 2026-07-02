// Shared nav config + watchlist source for the whole DMZ site.
// Add one entry per week here, newest first, so it shows up in the landing-page
// watchlist and in every week's dropdown. Each week lives in its own folder at
// the repo root (e.g. /ibm/, /nextco/) so URLs stay clean: dmz/ibm, dmz/nextco...
window.WEEKS = [
  { company: "International Business Machines", ticker: "IBM", exchange: "NYSE", date: "Jul 2, 2026", slug: "ibm" }
  // { company: "Next Co.", ticker: "TICK", exchange: "NASDAQ", date: "Jul 8, 2026", slug: "nextco" },
];
