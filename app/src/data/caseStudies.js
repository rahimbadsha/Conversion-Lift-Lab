// Case study data. RULE: only facts that are verifiable go here.
//  - `result` values are the ones already published in the portfolio on the homepage.
//  - `built` / `approach` describe what is visibly in the page screenshot (design choices), not claimed causes of the result.
//  - Optional fields (goal, challenge, timeline, platform, clientQuote, figmaUrl, liveUrl, result) render automatically when filled in.
//    Leave them empty rather than guessing.
//  - `page` points at a full-page design in portfolioPages.js. Studies without one fall back to `image`.
//  - DRAFT fields (marked `// DRAFT`) are placeholders inferred from the page's purpose or from site-wide standard delivery
//    times. They are NOT project facts: confirm or rewrite each one before treating it as final.

export const caseStudies = [
  {
    slug: 'disputifier',
    page: 'p76', // full-page design shown in the viewer (see portfolioPages.js)
    featured: true,
    platform: 'Webflow',
    timeline: 'Typically 7–14 days', // DRAFT
    goal: 'Turn visitors who land on the site into free trial signups.', // DRAFT
    challenge: 'Chargeback software is hard to explain quickly. The page needed to show what the product does and why it matters within the first screen.', // DRAFT
    liveUrl: 'https://www.disputifier.com/',
    figmaUrl: 'https://www.figma.com/proto/Y5Ws7F3o96U7ULd3rqPwsh/Disputifier-Websites---Webflow',
    title: 'Disputifier: SaaS Landing Page',
    short: 'Disputifier',
    type: 'SaaS',
    industry: 'Fintech software (chargeback automation)',
    pageType: 'SaaS product landing page',
    primaryAction: 'Start a free trial',
    result: '+38% trial signups',
    summary: 'A product landing page for a chargeback automation platform, built to turn visitors into free trial signups.',
    built: [
      'Hero with a clear value proposition and a free-trial button',
      'Product dashboard mockup next to the headline, so visitors see the product straight away',
      'Long-form sections walking through the problem, the solution and how it works',
      'FAQ section and repeated free-trial calls to action down the page',
    ],
    approach: [
      'One primary action (start a free trial) repeated in the header, hero and throughout the page',
      'The product is shown before the visitor has to scroll, which answers "what is this?" immediately',
      'A consistent brand colour is used to make actions stand out from the content',
    ],
    image: '/images/portfolio/disputifier',
  },
  {
    slug: 'wellness-course-funnel',
    page: 'p73', // full-page design shown in the viewer (see portfolioPages.js)
    timeline: 'Typically 7–14 days', // DRAFT
    goal: 'Move paid traffic toward a free session sign-up.', // DRAFT
    challenge: 'Visitors arriving from ads are cold. The page had to build enough trust and clarity to earn a free-session sign-up quickly.', // DRAFT
    title: 'Wellness Course Funnel',
    short: 'Wellness Course',
    type: 'Funnel',
    industry: 'Health and wellness coaching',
    pageType: 'Course sales funnel landing page',
    primaryAction: 'Claim a free session',
    result: '2.4x ROAS improvement',
    summary: 'A landing page for a wellness course, designed to move paid traffic toward a free session sign-up.',
    built: [
      'Hero with an outcome-focused headline and a single "claim your free session" button',
      'Icon-based benefits grid that makes the outcomes easy to scan',
      'Expert and authority section with a photo and credentials',
      'Repeated calls to action after the benefits and the expert section',
    ],
    approach: [
      'A free first step lowers the commitment needed from a cold visitor',
      'Benefits are shown as short, scannable items instead of long paragraphs',
      'Authority content sits next to the call to action to support the decision',
    ],
    image: '/images/portfolio/wellness-course-funnel',
  },
  {
    slug: 'down-to-ground-advertorial',
    page: 'p92', // full-page design shown in the viewer (see portfolioPages.js)
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Warm up cold traffic with a story before presenting the offer.', // DRAFT
    challenge: 'Cold visitors will not click an obvious ad. The page needed to read like helpful editorial content while still leading to the offer.', // DRAFT
    title: 'Down to Ground: Advertorial',
    short: 'Down to Ground',
    type: 'Advertorial',
    industry: 'Sleep and wellness products',
    pageType: 'Native-style advertorial',
    primaryAction: 'Click through to the offer',
    result: '4.1% CTR',
    summary: 'A long-form advertorial that warms up cold traffic with an article-style story before presenting the offer.',
    built: [
      'Article-style headline that opens with a relatable problem ("Can\'t sleep?")',
      'Educational sections that explain the product idea before selling it',
      'Customer testimonials shown with photos',
      'Benefit and "how to use it" sections leading to the offer',
    ],
    approach: [
      'The page reads like editorial content, which suits cold social and native traffic',
      'Problem first, product second: visitors are educated before they are asked to act',
      'Social proof is placed in the middle of the story, close to the point of decision',
    ],
    image: '/images/portfolio/down-to-ground-advertorial',
  },
  {
    slug: 'zapply-advertorial',
    page: 'p107', // full-page design shown in the viewer (see portfolioPages.js)
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Educate Dutch-speaking readers before presenting the supplement offer.', // DRAFT
    challenge: 'A long, information-heavy page in a different language had to stay easy to skim and still lead to a clear next step.', // DRAFT
    title: 'Zapply: Advertorial',
    short: 'Zapply',
    type: 'Advertorial',
    industry: "Men's health supplements",
    pageType: 'Long-form advertorial (Dutch language)',
    primaryAction: 'Click through to the offer',
    result: '3.2% conversion',
    summary: 'A Dutch-language long-form advertorial that educates the reader before presenting the supplement offer.',
    built: [
      'Article-style headline written for the Dutch-speaking market',
      'Long-form sections with product imagery and supporting visuals',
      'Structured information blocks that break up a long read',
      'A results-and-ingredients section near the end, before the offer',
    ],
    approach: [
      'Editorial format helps this type of offer feel informative rather than promotional',
      'Headings and visuals make a long page easy to skim',
      'The page was built for a specific language and market, not a translated template',
    ],
    image: '/images/portfolio/zapply-advertorial',
  },
  {
    slug: 'injury-claim-networks',
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Collect qualified legal leads at a lower cost per lead.', // DRAFT
    challenge: 'Legal intake needs qualified enquiries, not just form fills. The page had to filter leads while keeping the form easy to complete and the compliance wording in place.', // DRAFT
    title: 'Injury Claim Networks: Legal Lead Generation',
    short: 'Injury Claim Networks',
    type: 'Lead generation',
    industry: 'Legal (case intake)',
    pageType: 'Lead generation page with qualification form',
    primaryAction: 'Submit the "Do I qualify?" form',
    result: '$12 CPL (was $41)',
    summary: 'A legal lead generation page built to qualify potential claimants and lower the cost of each lead.',
    built: [
      'Attention banner and short explanation above a qualification form',
      'Multi-step form with qualifying yes/no questions, dropdowns and contact fields',
      'Long-form educational copy and legal-advertising disclaimers lower on the page',
      'A second page variant for a different case topic using the same structure',
    ],
    approach: [
      'Qualifying questions come first, so the form filters leads instead of collecting everyone',
      'The form sits in the first screen, so the main action is visible straight away',
      'Compliance wording is included on the page, as expected for legal advertising',
    ],
    image: '/images/portfolio/injury-claim-networks',
  },
  {
    slug: 'saas-software-integration',
    page: 'p101', // full-page design shown in the viewer (see portfolioPages.js)
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Turn interested B2B visitors into demo requests.', // DRAFT
    challenge: 'Software integration is abstract. The page needed to explain the value in business terms and keep the form short.', // DRAFT
    title: 'SaaS Software Integration Landing Page',
    short: 'SaaS Integration',
    type: 'SaaS',
    industry: 'B2B software integration',
    pageType: 'Demo-booking landing page',
    primaryAction: 'Request a demo',
    result: '+55% demo bookings',
    summary: 'A B2B landing page with a short form, designed to turn interested visitors into demo requests.',
    built: [
      'Hero with an outcome-focused headline and a three-field form (name, email, company)',
      'Illustrated benefits section focused on efficiency, logistics and sales',
      '"How it works" section that explains the process in a few steps',
      'Consistent brand colours and illustrations throughout',
    ],
    approach: [
      'A short form keeps the effort needed to enquire as low as possible',
      'Benefits are framed around results the buyer cares about, not features',
      'A "how it works" section answers the "what happens next?" question',
    ],
    image: '/images/portfolio/saas-software-integration',
  },
  {
    slug: 'era-wedding',
    page: 'p105', // full-page design shown in the viewer (see portfolioPages.js)
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Turn visitors into wedding booking enquiries.', // DRAFT
    challenge: 'Couples compare many photographers. The page needed to feel personal, show proof quickly and make enquiring effortless.', // DRAFT
    title: 'Era Wedding: Event Landing Page',
    short: 'Era Wedding',
    type: 'Local service',
    industry: 'Wedding photography and video',
    pageType: 'Enquiry landing page for a local service',
    primaryAction: 'Send an enquiry or schedule a call',
    result: '+82% inquiry rate',
    summary: 'A landing page for a wedding photo and video team, built to turn visitors into booking enquiries.',
    built: [
      'Hero with a contact form so couples can enquire straight away',
      'Testimonials and an "about the team" section to build trust',
      'Availability messaging ("fully booked dates") and a clear "schedule a call" option',
      'Emotional, photo-led design that matches the service being sold',
    ],
    approach: [
      'The enquiry form is in the first screen, with a call option for people who prefer to talk',
      'Real photography does most of the selling for a visual service',
      'Availability messaging adds a reason to act sooner',
    ],
    image: '/images/portfolio/era-wedding',
  },
  {
    slug: 'jl-studio',
    page: 'p89', // full-page design shown in the viewer (see portfolioPages.js)
    featured: true,
    platform: 'Unbounce', // DRAFT: inferred from the Figma file name ("UB"). Confirm.
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Turn visitors into free-estimate requests.', // DRAFT
    challenge: 'Architectural rendering is a considered purchase. The page needed to show quality and credibility fast and make the first step feel low-risk.', // DRAFT
    figmaUrl: 'https://www.figma.com/proto/YQBDXoWp0edOMWqE6U3AvM/Architectural-Design-LP---UB',
    title: 'JL Studio: Architectural 3D Rendering',
    short: 'JL Studio',
    type: 'Local service',
    industry: 'Architectural 3D rendering',
    pageType: 'Estimate-request landing page',
    primaryAction: 'Request a free estimate',
    result: '+67% booking rate',
    summary: 'A landing page for an architectural 3D rendering studio, built to turn visitors into free-estimate requests.',
    built: [
      'Hero with a "get a free estimate today" form and a discovery-call option',
      'Google rating badge and headline numbers (projects, images delivered, years of experience)',
      'Client logos and a portfolio gallery of rendered work',
      'Repeated estimate call to action through the page',
    ],
    approach: [
      'A free estimate is an easy first step for a project-based service',
      'Rating, numbers and client logos sit near the form to support the decision',
      'The rendered work is the proof, so it is shown prominently',
    ],
    image: '/images/portfolio/jl-studio',
  },

  {
    slug: 'true-gold-republic-website',
    page: 'p110', // full-page design shown in the viewer (see portfolioPages.js)
    title: 'True Gold Republic: Website',
    short: 'True Gold Republic',
    type: 'Website',
    industry: 'Precious metals (gold and silver IRA)',
    pageType: 'Brand website homepage',
    primaryAction: 'Get the free gold guide',
    summary: 'A Webflow homepage for a gold and silver IRA company, built around trust and one clear next step.',
    featured: true,
    platform: 'Webflow',
    timeline: 'Typically 7–14 days', // DRAFT
    goal: 'Give visitors a reason to trust the company quickly and move them to request the free guide or a consultation.', // DRAFT
    challenge: 'Investing retirement savings is a high-trust decision. The site had to look credible, answer doubts early and keep the main action obvious.', // DRAFT
    built: [
      'Hero with a benefit-led headline and two clear actions: the free gold guide and a free consultation',
      'Trust row of third-party ratings (BBB, TrustLink, Google, ConsumerAffairs) directly under the header',
      'Customer reviews section ("Trusted by Thousands") and a media endorsements section',
      'Live precious-metal price ticker and a phone number kept visible in the header',
    ],
    approach: [
      'Trust signals appear before the visitor has scrolled, which matters for a high-stakes financial decision',
      'The main action is repeated, and a lower-commitment option (consultation) sits beside it',
      'Reviews and endorsements are placed after the hero, where visitors start to weigh the decision',
    ],
    image: '/images/portfolio/true-gold-republic-website',
    liveUrl: 'https://www.truegoldrepublic.com/',
    figmaUrl: 'https://www.figma.com/proto/s8P4zdr0zftRjuY6XuxZun/TGR-Website-Homepage-webflow?node-id=0-1',
  },
  {
    slug: 'direct-bullion-funnel',
    page: 'p04', // full-page design shown in the viewer (see portfolioPages.js)
    title: 'Direct Bullion: Lead Capture Funnel',
    short: 'Direct Bullion',
    type: 'Lead generation',
    industry: 'Precious metals',
    pageType: 'Lead capture landing page (free guide)',
    primaryAction: 'Request the free kit',
    summary: 'An Unbounce landing page that trades a free gold and silver guide for a visitor\'s contact details.',
    featured: true,
    platform: 'Unbounce',
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Capture leads from paid traffic by offering a free guide.', // DRAFT
    challenge: 'Cold visitors will not hand over contact details without a clear reason. The offer and the credibility had to be obvious on one screen.', // DRAFT
    built: [
      'Dark and gold hero with a three-field form (name, email, phone) above the fold',
      'Media logos (CNBC, USA Today, Bloomberg, Forbes, Fox Business) directly under the hero',
      'Award and ranking section with a checklist of what the free resources cover',
      'A second guide request call to action further down the page',
    ],
    approach: [
      'The form is in the first screen, so the page has one obvious job',
      'Recognisable media logos and awards build credibility before the visitor has to decide',
      'A concrete free resource gives visitors a reason to share their details',
    ],
    image: '/images/portfolio/direct-bullion-funnel',
    liveUrl: 'https://secure.truegoldrepublic.com/direct-bullion/',
    figmaUrl: 'https://www.figma.com/proto/46BbvdiFlhi03vvtZFVFE5/GOLD-Optin-Direct-Bullions',
  },
  {
    slug: 'cobalt-technology-lead-gen',
    page: 'p74', // full-page design shown in the viewer (see portfolioPages.js)
    title: 'Cobalt Technology: IT Services Lead Gen',
    short: 'Cobalt Technology',
    type: 'Lead generation',
    industry: 'Managed IT services',
    pageType: 'Lead generation landing page',
    primaryAction: 'Claim free network monitoring',
    summary: 'A GoHighLevel landing page that offers a free year of network monitoring to win IT service enquiries.',
    featured: true,
    platform: 'GoHighLevel',
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Generate enquiries from businesses looking for IT support.', // DRAFT
    challenge: 'IT services are easy to ignore until something breaks. The page needed a strong, low-risk offer to earn the enquiry.', // DRAFT
    built: [
      'Hero headline about the visitor\'s problem, with a short form beside it (name, phone, email)',
      'A free-offer form headline ("Get 1 year of free network monitoring") and a single action button',
      'Google rating badge (5.0) placed directly under the form',
      'Illustrated service sections: Wi-Fi, AI-powered threat prevention and smart surveillance',
    ],
    approach: [
      'A free year of monitoring is a concrete, low-risk offer that makes the form worth filling in',
      'The form sits next to the headline, so the visitor never has to hunt for the action',
      'The rating badge supports the decision right where the visitor hesitates',
    ],
    image: '/images/portfolio/cobalt-technology-lead-gen',
    liveUrl: 'https://networkpromo.cobaltnow.com/',
    figmaUrl: 'https://www.figma.com/proto/NjeqeaXDUIjhbuSA69utzR/Cobalt-Technology---GHL',
  },
  {
    slug: 'michele-capots-coaching-mastermind',
    page: 'p93', // full-page design shown in the viewer (see portfolioPages.js)
    title: 'Michele Capots: Coaching Mastermind Funnel',
    short: 'Michele Capots',
    type: 'Funnel',
    industry: 'Coaching and mental wellness',
    pageType: 'Enrolment landing page for a 12-week mastermind',
    primaryAction: 'Enroll now',
    summary: 'A GoHighLevel enrolment page for a 12-week group coaching mastermind.',
    featured: true,
    platform: 'GoHighLevel',
    timeline: 'Typically 3–5 days', // DRAFT
    goal: 'Fill places in a 12-week group coaching program.', // DRAFT
    challenge: 'Coaching is a personal purchase. The page needed to explain the program quickly and let the coach\'s personality build trust.', // DRAFT
    built: [
      'Warm, photo-led hero with the program name, dates and a prominent "Enroll now" button',
      'Short message card that speaks to the reader\'s reason for joining',
      '"Meet your host" section with a photo and the coach\'s background',
      '"What to expect" grid that spells out the format (weekly live calls) and the benefits',
    ],
    approach: [
      'The dates and the enrol action are in the first screen',
      'The coach is introduced with a real photo and story, which matters for a personal-development purchase',
      'A scannable "what to expect" section answers the practical questions before the visitor has to ask',
    ],
    image: '/images/portfolio/michele-capots-coaching-mastermind',
    liveUrl: 'https://unapologetic.michelecapots.com/',
    figmaUrl: 'https://www.figma.com/proto/6UP90RACNib04QqWfUt4bm/Coach-Michele-Capots',
  },
];

export const featuredFirst = [...caseStudies].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export const caseTypes = ['All', ...Array.from(new Set(caseStudies.map(c => c.type)))];

export const bySlug = slug => caseStudies.find(c => c.slug === slug);
