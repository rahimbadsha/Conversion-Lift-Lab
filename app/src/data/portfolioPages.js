// Full-page landing page designs from the Flickr portfolio album.
// Files: /images/pages/<key>.webp (full page, 1440px wide) and <key>-thumb.webp (top of page).
// Labels describe what is visible on the page (industry + page type). They deliberately do not name brands.

export const pageCategories = ['All', 'E-commerce', 'Lead generation', 'SaaS', 'Local service', 'Health & wellness'];

export const portfolioPages = [
  { key: 'p01', h: 3496, cat: 'E-commerce', label: 'Scratch-off adventure map: product landing page' },
  { key: 'p02', h: 9152, cat: 'Lead generation', label: "Women's rite-of-passage program: registration page" },
  { key: 'p03', h: 4759, cat: 'Health & wellness', label: 'Fitness challenge: sales page' },
  { key: 'p04', h: 5517, cat: 'Lead generation', label: 'Gold and silver investing: free guide lead page' },
  { key: 'p05', h: 4502, cat: 'E-commerce', label: 'Personalised gift mugs: product page' },
  { key: 'p06', h: 4674, cat: 'SaaS', label: 'Sports recruiting platform: demo request page' },
  { key: 'p07', h: 6209, cat: 'Local service', label: 'Photo booth rental: service landing page' },
  { key: 'p08', h: 5222, cat: 'E-commerce', label: 'Tinted SPF moisturiser: product page' },
  { key: 'p09', h: 3016, cat: 'Lead generation', label: 'Private-label clothing manufacturing: B2B lead page' },
  { key: 'p10', h: 6655, cat: 'Lead generation', label: 'Lead generation agency: services landing page' },
  { key: 'p11', h: 6609, cat: 'SaaS', label: 'Product data feed software: SaaS landing page' },
  { key: 'p12', h: 7964, cat: 'E-commerce', label: 'Ethical jewellery: brand landing page' },
  { key: 'p13', h: 7659, cat: 'Local service', label: 'Residential painting: quote request page' },
  { key: 'p14', h: 12244, cat: 'Health & wellness', label: 'Herbal tea for blood sugar: product page' },
  { key: 'p15', h: 5381, cat: 'Health & wellness', label: 'Ashwagandha gummies: product page' },
  { key: 'p16', h: 11300, cat: 'Health & wellness', label: 'Oral care for gum health: product sales page' },
  { key: 'p17', h: 5854, cat: 'E-commerce', label: 'Healthy office snacks subscription: landing page' },
  { key: 'p18', h: 7138, cat: 'Health & wellness', label: 'Hair loss treatment: consultation lead page' },
  { key: 'p19', h: 4071, cat: 'E-commerce', label: 'Vegan cookbook: product page' },
  { key: 'p20', h: 3970, cat: 'SaaS', label: 'Help desk software: SaaS landing page' },
];

export const pageSrc = key => `/images/pages/${key}.webp`;
export const pageThumb = key => `/images/pages/${key}-thumb.webp`;
