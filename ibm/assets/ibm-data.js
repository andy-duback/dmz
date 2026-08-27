// Content for this week's presentation: IBM
window.PICK = {
  company: "International Business Machines",
  ticker: "IBM",
  exchange: "NYSE",
  weekLabel: "July 2, 2026",
  price: "281.21",
  priceDate: "Jun 30, 2026",
  oneLiner: "Hybrid cloud, AI and consulting giant — now racing Google and Microsoft to win the next era: quantum computing.",

  snapshot: [
    { key: "marketCap", label: "Market Cap", value: "$255.3B" },
    { key: "forwardPE", label: "P/E (Fwd)", value: "22.4" },
    { key: "dividendYield", label: "Div Yield", value: "2.4%" },
    { key: "weekRange", label: "52-Wk Range", value: "$212 – $332" }
  ],

  overview: {
    p1: "IBM makes its money four ways now: Software (hybrid cloud + AI platforms, incl. Red Hat), Consulting (strategy & technology services), Infrastructure (servers, storage, mainframes), and Financing. Software is the biggest and fastest-growing slice.",
    p2: "Since spinning off its old managed-infrastructure business (Kyndryl) a few years back, IBM has leaned hard into being a \u201chybrid cloud + AI\u201d company built around Red Hat OpenShift and its watsonx AI platform \u2014 rather than trying to out-build AWS or Azure on raw cloud infrastructure.",
    p3: "There's a fifth, not-yet-a-segment bet sitting underneath all of this: quantum computing. IBM has the largest install base of quantum systems today and a public roadmap toward a fault-tolerant machine by the end of the decade \u2014 racing Google and Microsoft to get there first. It doesn't move the revenue mix yet, but it's the long-duration call embedded in the stock (more in the video below).",
    segments: [
      { name: "Software", pct: 44.3 },
      { name: "Consulting", pct: 33.1 },
      { name: "Infrastructure", pct: 20.9 },
      { name: "Financing", pct: 1.4 }
    ],
    segNote: "% of Q1 2026 GAAP revenue"
  },

  financials: {
    metrics: [
      { key: "marketCap", label: "Market Cap", value: "$264B" },
      { key: "revenue", label: "Annual Revenue", value: "$68.9B" },
      { key: "trailingPE", label: "Trailing P/E", value: "24.9" },
      { key: "forwardPE", label: "Forward P/E", value: "22.4" },
      { key: "roe", label: "ROE", value: "35.9%" },
      { key: "dividend", label: "Dividend / Yield", value: "$6.76 / 2.4%" },
      { key: "totalDebt", label: "Total Debt", value: "$57.7B (3/31/26)" },
      { key: "earnings", label: "Next Earnings", value: "Jul 22, 2026" }
    ],
    q1: "Q1 2026 beat: revenue $15.92B (vs. $15.68B est, +6% cc), non-GAAP EPS $1.91 (vs. $1.60 a year ago, beat by 10\u00a2). Gross margin expanded to 56.2% from 55.2%.",
    estimates: "FY2026 EPS consensus $11.85–$12.43, up from FY2025's $11.59. Analysts see steady, unspectacular growth \u2014 not a hypergrowth story."
  },

  thesis: {
    verdict: "HOLD \u2014 steady compounder, fairly priced, quantum is the optionality",
    ratings: [
      { source: "Zacks Rank", value: "3 \u2013 Hold (Neutral)" },
      { source: "Verus Opinion", value: "Hold" },
      { source: "Sell-side (25 analysts)", value: "Buy-leaning (8 Strong Buy / 8 Buy / 8 Hold / 1 Sell)" }
    ],
    targets: [
      { source: "LSEG mean (22 analysts)", value: "$286.86", upside: "+2.0% from current" },
      { source: "Zacks", value: "$323.00", upside: "+14.9% from current" }
    ],
    take: "Ratings are split on purpose: the quant/quality models (Zacks, Verus) both land on Hold \u2014 IBM isn't cheap relative to its growth rate, and the stock is roughly at its 12-month target already. But sell-side analysts skew Buy, largely on the quantum + AI optionality that doesn't show up in a trailing-multiple screen yet. My take for discussion: this reads like a name you own for the dividend and steady execution, not one you chase here \u2014 unless you believe the quantum bet (see video below) is underpriced."
  },

  risks: [
    "Intense competition on every front: AWS/Azure in cloud, Oracle in middleware/analytics, Accenture in consulting, Dell/HPE in hardware.",
    "Anthropic's Claude Code and similar AI coding tools can modernize legacy COBOL/mainframe systems \u2014 a direct threat to IBM's services moat.",
    "Frequent acquisitions (HashiCorp, StreamSets, webMethods, Hakkoda) raise integration risk and have loaded the balance sheet with goodwill.",
    "$57.7B in total debt; a high debt load could pressure the dividend or slow future M&A if conditions tighten."
  ],

  headlines: [
    { headline: "IBM unveils sub-1nm \u201cNanoStack\u201d chip", source: "TechRadar, via Yahoo Tech", date: "Jun 29, 2026", url: "https://tech.yahoo.com/computing/articles/ibm-sub-1-nm-chip-224000833.html" },
    { headline: "JPMorgan upgrades IBM to Overweight on software strength", source: "Yahoo Finance", date: "Jun 23, 2026", url: "https://finance.yahoo.com/video/trending-jpmorgan-upgrades-ibm-stock-150837182.html" },
    { headline: "IBM, Red Hat and Deloitte announce Lightwell collaboration to strengthen open-source software supply chain trust", source: "IBM Newsroom", date: "Jun 26, 2026", url: "https://newsroom.ibm.com/campaign" }
  ],

  news: [
    {
      headline: "IBM unveils sub-1nm \u201cNanoStack\u201d chip",
      source: "TechRadar, via Yahoo Tech",
      date: "Jun 29, 2026",
      url: "https://tech.yahoo.com/computing/articles/ibm-sub-1-nm-chip-224000833.html",
      summary: "IBM says it's built the first sub-1nm chip, using a new 3D \u201cNanoStack\u201d architecture that stacks transistors vertically instead of shrinking them further sideways \u2014 nearly 100 billion transistors on a fingernail-sized chip, ~50% faster and 70% more energy-efficient than its current 2nm chips. Production is still an estimated 5+ years out.",
      sowhy: "Reinforces the R&D moat behind IBM's Infrastructure segment and its \u201cwe're still a serious hardware company\u201d case \u2014 but the payoff is long-dated and the same article notes IBM made similarly bold claims at its 2021 2nm unveiling before mass production took years longer than promised."
    },
    {
      headline: "U.S. takes equity stakes in quantum firms; IBM is the biggest winner",
      source: "CNBC",
      date: "May 21, 2026",
      url: "https://www.cnbc.com/2026/05/21/quantum-stocks--us-taking-equity-stakes.html",
      summary: "The U.S. Commerce Department is awarding $2B in grants (via the 2022 CHIPS Act) across nine quantum companies and taking a minority equity stake in each. IBM is the single largest beneficiary at $1B, earmarked to build what it calls America's first purpose-built quantum foundry.",
      sowhy: "Directly de-risks the quantum bet flagged in the Overview and Video sections \u2014 non-dilutive government funding for IBM's roadmap. Worth noting the rest of the sector re-rated hard on the news (D-Wave +33%, Rigetti +30%) while IBM, being larger and more diversified, only moved a few percent \u2014 a reminder that quantum is still a small lever on IBM's stock specifically, even as it becomes a bigger one for the pure-plays."
    }
  ],

  pdfs: [
    {
      title: "LSEG \u2014 Company in Context Report",
      date: "Jul 2, 2026",
      file: "assets/pdfs/lseg-ibm.pdf",
      takeaways: [
        "Verus Opinion: Hold. I/B/E/S mean from 25 analysts: Buy (8 Strong Buy, 8 Buy, 8 Hold, 1 Sell).",
        "12-month mean price target $286.86 (high $375 / low $195) \u2014 only 2.0% above current price.",
        "Trades cheaper than peer average on forward P/E (22.4 vs. 25.9 peer avg) but with a lower net margin (15.6% vs. 18.0% peer avg).",
        "5-year return: +100.8%. 1-year return: \u20134.6% \u2014 recent pullback after a strong multi-year run."
      ]
    },
    {
      title: "Zacks Equity Research \u2014 Full Report",
      date: "Jul 2, 2026",
      file: "assets/pdfs/zacks-ibm.pdf",
      takeaways: [
        "Zacks Rank 3 (Hold); Style Scores: Value D, Growth C, Momentum C \u2014 not a screen-friendly name on any factor right now.",
        "Reasons to buy: hybrid cloud + AI demand, watsonx platform, ~7\u20138% of revenue into R&D, HashiCorp integration strengthening multi-cloud story.",
        "Reasons to sell: stiff competition everywhere, AI coding tools threatening legacy services, integration risk from frequent M&A, high leverage.",
        "Q1 2026: beat on both revenue and EPS, gross margin expansion \u2014 healthy quarter operationally."
      ]
    }
  ],

  video: {
    title: "Can IBM Beat Microsoft and Google in the Quantum Computing Race?",
    channel: "WSJ's Bold Names",
    url: "https://youtu.be/7C56Syw5Ml8",
    embed: "https://www.youtube.com/embed/7C56Syw5Ml8",
    clipUrl: "https://youtu.be/7C56Syw5Ml8?si=OVeCwVpRfHn2NmaO&t=148",
    summary: "WSJ frames IBM's turnaround under CEO Arvind Krishna \u2014 hybrid cloud and consulting brought the company back \u2014 and then turns to the bigger bet: quantum computing. IBM, Google and Microsoft are each racing toward a fault-tolerant, commercially useful quantum computer, and IBM is leaning on its early lead (largest install base of quantum systems, a public roadmap) to try to stay ahead. The takeaway for us: today's profits come from cloud/AI/consulting, but the stock's long-run upside case increasingly hinges on whether IBM's quantum bet pays off before rivals catch up."
  },

  podcast: {
    title: "1261: John Young \u2014 Decrypting the Quantum Quandaries of Q-Day",
    show: "The Jordan Harbinger Show",
    url: "https://open.spotify.com/episode/0x4vX4yeCYCZLbbgwW4MtX",
    embed: "https://open.spotify.com/embed/episode/0x4vX4yeCYCZLbbgwW4MtX?utm_source=generator",
    synthesis: "Quantum eMotion's John Young lays out \u201cQ-Day\u201d \u2014 the point when quantum computers become powerful enough to break today's encryption. Adversaries are already doing \u201charvest now, decrypt later\u201d: quietly hoarding encrypted data today to crack once quantum matures. Large institutions face years of slow, expensive retrofitting to quantum-safe encryption, while the same underlying technology also promises breakthroughs in drugs, materials and batteries. Tying it back to IBM: this is exactly the double-edged sword IBM is betting on \u2014 quantum threatens the encryption every enterprise (including IBM's own client base) depends on, but also hands IBM a giant enterprise-services opportunity to sell quantum-safe migration, on top of whatever it earns from quantum hardware itself."
  }
};
