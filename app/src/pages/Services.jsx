import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, TrendingUp, Filter, ArrowRight, ChevronDown,
  Zap, Globe, RefreshCw, Bot, Code2, Star,
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const coreServices = [
  {
    icon: Layout,
    id: 'landing-page-design',
    en: {
      title: 'Landing Page Design & Development',
      body: [
        "I design and build landing pages from scratch — hero section, social proof, offer, objection-handling, and a call to action that doesn't get buried. Every page is built mobile-first and tested to load fast, because a slow page loses leads before it gets the chance to convert.",
        "I work directly inside whatever platform you're already using — Webflow, ClickFunnels, GoHighLevel, Unbounce, Instapage, WordPress, or Shopify — or I hand-code it if you need something a page builder can't do. Forms, tracking, and CRM integrations are set up and tested before launch, not left for you to sort out.",
      ],
      proofText: 'See real landing pages I\'ve built',
    },
    bn: {
      title: 'ল্যান্ডিং পেজ ডিজাইন ও ডেভেলপমেন্ট',
      body: [
        'আমি স্ক্র্যাচ থেকে ল্যান্ডিং পেজ ডিজাইন ও তৈরি করি — হিরো সেকশন, সোশ্যাল প্রুফ, অফার এবং একটি স্পষ্ট কল-টু-অ্যাকশন সহ। প্রতিটি পেজ মোবাইল-ফার্স্ট এবং দ্রুত লোডের জন্য তৈরি।',
        'আমি আপনার বর্তমান প্ল্যাটফর্মে কাজ করি — Webflow, ClickFunnels, GoHighLevel, Unbounce, Instapage, WordPress বা Shopify — অথবা প্রয়োজনে কাস্টম কোড লিখি। ফর্ম, ট্র্যাকিং এবং CRM ইন্টিগ্রেশন লঞ্চের আগেই সেট আপ ও টেস্ট করা হয়।',
      ],
      proofText: 'আমার তৈরি আসল ল্যান্ডিং পেজ দেখুন',
    },
  },
  {
    icon: TrendingUp,
    id: 'cro',
    en: {
      title: 'Conversion Rate Optimization (CRO)',
      body: [
        "If a page already exists but isn't converting, I run a CRO audit first. I look at messaging, layout, where the CTA sits, how much trust the page builds before it asks for the sale, the form itself, and where visitors are most likely dropping off.",
        "From there I make targeted changes — not a redesign for the sake of it — and where it makes sense, I set up A/B tests so we're not guessing. One legal lead-gen client I still work with dropped their cost per lead from $41 to $12 this way.",
      ],
      proofText: 'Get a free CRO audit',
    },
    bn: {
      title: 'কনভার্সন রেট অপ্টিমাইজেশন (CRO)',
      body: [
        'পেজ থাকলেও কনভার্ট না করলে, আমি প্রথমে একটি CRO অডিট করি — মেসেজিং, লেআউট, CTA প্লেসমেন্ট, ট্রাস্ট এবং ফর্ম পরীক্ষা করে ভিজিটর কোথায় ঝরে পড়ছে তা খুঁজে বের করি।',
        'তারপর প্রয়োজনীয় পরিবর্তন করি — অকারণে পুরো রিডিজাইন নয় — এবং যেখানে দরকার সেখানে A/B টেস্ট সেট আপ করি। একজন লিগ্যাল লিড-জেন ক্লায়েন্টের লিড খরচ এভাবে $৪১ থেকে $১২-তে নেমেছে।',
      ],
      proofText: 'ফ্রি CRO অডিট পান',
    },
  },
  {
    icon: Filter,
    id: 'sales-funnels',
    en: {
      title: 'Sales Funnel Building',
      body: [
        "A landing page is one page. A funnel is the whole journey — from the first click to the lead capture, through the sales sequence, to the upsell if there is one. I build the pages, set up lead capture and forms, wire up the integrations, and map out the automation so nothing falls through.",
        "I've built funnels for course launches, legal lead generation, and ecommerce brands. One course funnel I built took ROAS from 1.1 to 2.4 within two weeks of launch.",
      ],
      proofText: 'See funnel work',
    },
    bn: {
      title: 'সেলস ফানেল বিল্ডিং',
      body: [
        'একটি ল্যান্ডিং পেজ একটি মাত্র পেজ। একটি ফানেল হলো পুরো যাত্রা — প্রথম ক্লিক থেকে লিড ক্যাপচার, সেলস সিকোয়েন্স, এবং আপসেল পর্যন্ত। আমি পেজ তৈরি করি, লিড ক্যাপচার ও ফর্ম সেট আপ করি, ইন্টিগ্রেশন যুক্ত করি এবং অটোমেশন ম্যাপ করি।',
        'আমি কোর্স লঞ্চ, লিগ্যাল লিড জেনারেশন এবং ইকমার্স ব্র্যান্ডের জন্য ফানেল তৈরি করেছি। একটি কোর্স ফানেলে লঞ্চের ২ সপ্তাহের মধ্যে ROAS ১.১ থেকে ২.৪-এ পৌঁছেছে।',
      ],
      proofText: 'ফানেলের কাজ দেখুন',
    },
  },
];

const supportingServices = [
  {
    icon: Zap,
    en: { title: 'Lead Generation Pages', desc: 'Squeeze pages, webinar registrations, and quiz funnels built to capture qualified leads at scale.' },
    bn: { title: 'লিড জেনারেশন পেজ', desc: 'স্কুইজ পেজ, ওয়েবিনার রেজিস্ট্রেশন এবং কুইজ ফানেল, যোগ্য লিড ক্যাপচার করতে তৈরি।' },
  },
  {
    icon: Globe,
    en: { title: 'Advertorial & VSL Pages', desc: 'Native-style advertorials and video sales letters that warm up cold traffic before the offer.' },
    bn: { title: 'অ্যাডভার্টোরিয়াল ও VSL পেজ', desc: 'নেটিভ-স্টাইল অ্যাডভার্টোরিয়াল ও ভিডিও সেলস লেটার যা কোল্ড ট্র্যাফিক গরম করে।' },
  },
  {
    icon: RefreshCw,
    en: { title: 'Platform Migration & Rebuilds', desc: 'Moving an existing page to a new platform without losing what already works — pixel for pixel.' },
    bn: { title: 'প্ল্যাটফর্ম মাইগ্রেশন ও রিবিল্ড', desc: 'যা কাজ করছে তা না হারিয়ে বিদ্যমান পেজ নতুন প্ল্যাটফর্মে স্থানান্তর।' },
  },
];

const platforms = ['Webflow', 'Unbounce', 'ClickFunnels', 'GoHighLevel', 'WordPress', 'Shopify', 'Instapage', 'Systeme.io', 'HubSpot', 'Funnelish'];

const processSteps = [
  { en: 'We talk through your offer, audience, and traffic — a quick call, not a sales pitch.', bn: 'আপনার অফার, দর্শক এবং ট্র্যাফিক নিয়ে একটি সংক্ষিপ্ত কল।' },
  { en: 'I research your competitors and your customer before I design anything.', bn: 'ডিজাইন শুরুর আগে আমি প্রতিযোগী ও কাস্টমার নিয়ে গবেষণা করি।' },
  { en: 'Wireframe, then design, then build — on your platform or hand-coded.', bn: 'ওয়্যারফ্রেম, তারপর ডিজাইন, তারপর বিল্ড — আপনার প্ল্যাটফর্মে বা কাস্টম কোডে।' },
  { en: 'Everything gets tested — cross-browser, mobile, forms, and tracking — before launch.', bn: 'লঞ্চের আগে সবকিছু টেস্ট করা হয় — ব্রাউজার, মোবাইল, ফর্ম ও ট্র্যাকিং।' },
  { en: "After launch, I'm still around for tweaks and, if you want it, ongoing optimization.", bn: 'লঞ্চের পরেও আমি থাকি — পরিবর্তন এবং চলমান অপ্টিমাইজেশনের জন্য।' },
];

const faqs = [
  {
    en: { q: 'Do you design and develop landing pages?', a: "Yes — that's the core of what I do. I handle the design, the build, and the conversion-focused structure, whether you need one page or a full funnel." },
    bn: { q: 'আপনি কি ল্যান্ডিং পেজ ডিজাইন ও ডেভেলপ করেন?', a: 'হ্যাঁ — এটাই আমার মূল কাজ। আমি ডিজাইন, বিল্ড এবং কনভার্সন-কেন্দ্রিক স্ট্রাকচার সবকিছু সামলাই।' },
  },
  {
    en: { q: 'Can you work with my existing platform?', a: "Yes. I work across Webflow, ClickFunnels, GoHighLevel, Unbounce, Instapage, WordPress, Shopify, Systeme.io, HubSpot, and Funnelish. If you're on something else, ask — I've probably worked with it." },
    bn: { q: 'আপনি কি আমার বর্তমান প্ল্যাটফর্মে কাজ করতে পারবেন?', a: 'হ্যাঁ। আমি Webflow, ClickFunnels, GoHighLevel, Unbounce, Instapage, WordPress, Shopify, Systeme.io, HubSpot এবং Funnelish-এ কাজ করি।' },
  },
  {
    en: { q: 'Do you also handle CRO?', a: "Yes — both auditing pages that already exist and building new ones with CRO principles baked in from day one." },
    bn: { q: 'আপনি কি CRO-ও করেন?', a: 'হ্যাঁ — বিদ্যমান পেজ অডিট করা এবং প্রথম থেকেই CRO নীতি মেনে নতুন পেজ তৈরি করা দুটোই।' },
  },
  {
    en: { q: 'Can you connect forms to my CRM?', a: 'Yes. Form-to-CRM integration and follow-up automation are part of the funnel work I do, so leads don\'t sit untouched.' },
    bn: { q: 'আপনি কি ফর্ম CRM-এর সাথে সংযুক্ত করতে পারবেন?', a: 'হ্যাঁ। ফর্ম-টু-CRM ইন্টিগ্রেশন এবং ফলো-আপ অটোমেশন আমার ফানেল কাজের অংশ।' },
  },
  {
    en: { q: 'Can you work with existing designs or Figma files?', a: "Yes. If you already have a design or a Figma file, I can build it as-is, or flag conversion issues and improve it along the way." },
    bn: { q: 'আপনি কি বিদ্যমান ডিজাইন বা Figma ফাইল নিয়ে কাজ করতে পারবেন?', a: 'হ্যাঁ। আপনার ডিজাইন বা Figma ফাইল থাকলে আমি তা হুবহু বিল্ড করতে পারি অথবা উন্নত করতে পারি।' },
  },
  {
    en: { q: 'How long does a landing page usually take?', a: 'Most single landing pages take 3–5 days. Full funnels take 7–14 days depending on scope.' },
    bn: { q: 'একটি ল্যান্ডিং পেজ সাধারণত কতদিন লাগে?', a: 'সাধারণ ল্যান্ডিং পেজ: ৩–৫ দিন। সম্পূর্ণ ফানেল: ৭–১৪ দিন, স্কোপের উপর নির্ভর করে।' },
  },
  {
    en: { q: 'Do you work with custom code?', a: "Yes. Most builds happen inside a page builder, but I write custom JavaScript and React when a page needs something the builder can't do out of the box." },
    bn: { q: 'আপনি কি কাস্টম কোড নিয়ে কাজ করেন?', a: 'হ্যাঁ। বেশিরভাগ বিল্ড পেজ বিল্ডারে হয়, তবে প্রয়োজনে আমি কাস্টম JavaScript ও React লিখি।' },
  },
  {
    en: { q: 'Can you improve an existing landing page instead of building from scratch?', a: "Yes — that's exactly what a CRO audit is for. I'll tell you what's working, what isn't, and fix it without a full rebuild unless one is actually needed." },
    bn: { q: 'নতুন করে না বানিয়ে কি বিদ্যমান পেজ উন্নত করা যাবে?', a: 'হ্যাঁ — এটাই CRO অডিটের কাজ। কী কাজ করছে আর কী করছে না তা জানিয়ে, প্রয়োজন ছাড়া পুরো রিবিল্ড না করেই ঠিক করি।' },
  },
];

function FAQRow({ item, index, isDark }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass rounded-xl overflow-hidden">
      <h3 className="m-0 text-base font-normal">
        <button onClick={() => setOpen(v => !v)} aria-expanded={open} className="w-full flex items-center justify-between p-5 text-left gap-4">
          <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(item.en.q, item.bn.q)}</span>
          <ChevronDown size={18} className={`text-indigo-600 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className={`px-5 pb-5 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t(item.en.a, item.bn.a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://conversionliftlab.com/services#webpage',
        url: 'https://conversionliftlab.com/services',
        name: 'Landing Page, CRO & Funnel Services | ConversionLiftLab',
        description: 'Landing page design & development, conversion rate optimization, and sales funnel building — the three core services ConversionLiftLab provides.',
        isPartOf: { '@id': 'https://conversionliftlab.com/#website' },
        about: { '@id': 'https://conversionliftlab.com/#organization' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://conversionliftlab.com/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://conversionliftlab.com/services' },
        ],
      },
      ...coreServices.map(s => ({
        '@type': 'Service',
        '@id': `https://conversionliftlab.com/services#${s.id}`,
        name: s.en.title,
        provider: { '@id': 'https://conversionliftlab.com/#organization' },
        areaServed: 'Worldwide',
        description: s.en.body.join(' '),
        url: `https://conversionliftlab.com/services#${s.id}`,
      })),
      {
        '@type': 'OfferCatalog',
        '@id': 'https://conversionliftlab.com/services#offer-catalog',
        name: 'ConversionLiftLab Core Services',
        itemListElement: coreServices.map(s => ({
          '@type': 'Offer',
          itemOffered: { '@id': `https://conversionliftlab.com/services#${s.id}` },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.en.q,
          acceptedAnswer: { '@type': 'Answer', text: f.en.a },
        })),
      },
    ],
  };

  return (
    <main className={`min-h-screen pt-24 pb-0 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Landing Page, CRO & Funnel Services</title>
        <meta name="description" content="Landing page design & development, CRO audits, and sales funnel building from a Top Rated Upwork specialist. 1050+ pages & funnels built, 100% Job Success." />
        <link rel="canonical" href="https://conversionliftlab.com/services" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Hero ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center pt-6 pb-16">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t('Landing Pages, CRO, and Funnels ', 'ল্যান্ডিং পেজ, CRO এবং ফানেল ')}
          <span className="text-gradient">{t('That Turn Traffic Into Customers', 'যা ট্র্যাফিককে কাস্টমারে রূপান্তর করে')}</span>
        </motion.h1>

        {/* What I help clients do */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto">
          <h2 className={`text-sm font-medium uppercase tracking-widest mb-3 text-indigo-600`}>
            {t('What I Help Clients Do', 'আমি ক্লায়েন্টদের যা সাহায্য করি')}
          </h2>
          <p className={`leading-relaxed mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t(
              "I build landing pages and sales funnels meant to do one thing: turn traffic into customers. Not just look good — actually convert. Every page I design, whether it's a single landing page or a full funnel, gets built with CRO principles from the start: clear messaging, a logical flow, and a call to action that doesn't get lost.",
              'আমি ল্যান্ডিং পেজ ও সেলস ফানেল তৈরি করি যা ট্র্যাফিককে কাস্টমারে রূপান্তর করার জন্য তৈরি। শুধু সুন্দর দেখানো নয় — সত্যিকার অর্থে কনভার্ট করা।'
            )}
          </p>
          <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t(
              "If you already have a page that isn't converting, I can also audit it and tell you exactly what's holding it back — no fluff, just what to fix.",
              'আপনার পেজ কনভার্ট না করলে, আমি অডিট করে ঠিক কী ঠিক করতে হবে তা জানাতে পারি।'
            )}
          </p>
        </motion.div>
      </div>

      {/* ── Core Services ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-4">
          <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Core Services', 'মূল সেবা')}
          </h2>
          <p className={`max-w-xl mx-auto mb-12 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t("These are the three things I do most — where most of my 1050+ pages and funnels have come from.", 'এই তিনটি কাজ আমি সবচেয়ে বেশি করি।')}
          </p>
        </div>

        <div className="space-y-6">
          {coreServices.map((s, i) => {
            const Icon = s.icon;
            const proofHref = s.id === 'cro' ? '/contact' : '/case-studies';
            return (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-7 lg:p-9 scroll-mt-24"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {t(s.en.title, s.bn.title)}
                    </h3>
                    {t(s.en.body, s.bn.body).map((p, j) => (
                      <p key={j} className={`leading-relaxed mb-3 last:mb-0 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p}</p>
                    ))}
                    <a href={proofHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-3">
                      {t(s.en.proofText, s.bn.proofText)}<ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Supporting Services ── */}
      <div className={`py-16 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Supporting Services', 'সহায়ক সেবা')}
          </h2>
          <p className={`mb-8 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            {t('Alongside the three core services above, I also handle:', 'উপরের তিনটি মূল সেবার পাশাপাশি, আমি এগুলোও করি:')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {supportingServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass rounded-xl p-5">
                  <Icon size={18} className="text-indigo-600 mb-3" />
                  <h3 className={`font-medium text-sm mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(s.en.title, s.bn.title)}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t(s.en.desc, s.bn.desc)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Funnel Automation & CRM Integration ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-7 lg:p-9">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <h2 className={`font-semibold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('Funnel Automation & CRM Integration', 'ফানেল অটোমেশন ও CRM ইন্টিগ্রেশন')}
              </h2>
              <p className={`leading-relaxed mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t(
                  "Once a funnel is capturing leads, the next problem is usually making sure none of them get lost. I connect your forms to your CRM, set up notifications so you know the moment a lead comes in, and build follow-up automation so a lead doesn't sit untouched.",
                  'ফানেল লিড ক্যাপচার শুরু করলে, পরবর্তী কাজ হলো কোনো লিড যেন হারিয়ে না যায় তা নিশ্চিত করা। আমি ফর্ম CRM-এর সাথে সংযুক্ত করি এবং ফলো-আপ অটোমেশন সেট আপ করি।'
                )}
              </p>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t(
                  "Where it's useful, I also set up AI-assisted lead qualification — routing and prioritizing leads automatically instead of someone sorting through everything by hand. This is something I build on top of a funnel I've already built for you, not a separate service.",
                  'প্রয়োজনে আমি AI-সহায়ক লিড কোয়ালিফিকেশনও সেট আপ করি — এটি একটি আলাদা সেবা নয়, বরং তৈরি করা ফানেলের একটি সম্প্রসারণ।'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Beyond Landing Pages ── */}
      <div className={`py-16 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
              <Code2 size={22} className="text-indigo-600" />
            </div>
            <div>
              <h2 className={`font-semibold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('Beyond Landing Pages', 'ল্যান্ডিং পেজের বাইরে')}
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t(
                  "Most builds don't need custom code — but some do. I have hands-on experience with JavaScript, React, and the MERN stack, along with API integrations, automation, and custom WordPress development. That background means if your funnel needs a custom calculator, a multi-step form with conditional logic, or an integration a page builder can't handle out of the box, I can build it directly instead of you needing a separate developer. This isn't a separate service — it's technical depth that supports the landing pages and funnels I build.",
                  'বেশিরভাগ কাজে কাস্টম কোডের দরকার হয় না — তবে কিছু ক্ষেত্রে হয়। আমার JavaScript, React এবং MERN স্ট্যাকে হাতে-কলমে অভিজ্ঞতা আছে, সাথে API ইন্টিগ্রেশন ও কাস্টম WordPress ডেভেলপমেন্ট। এটি আলাদা সেবা নয় — বরং আমার তৈরি ল্যান্ডিং পেজ ও ফানেলকে সমর্থনকারী প্রযুক্তিগত গভীরতা।'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Platforms I Build On ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className={`text-xl lg:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t('Platforms I Build On', 'যেসব প্ল্যাটফর্মে আমি কাজ করি')}
        </h2>
        <p className={`mb-8 text-sm max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t("I build on whichever platform makes sense for your business — or migrate you to a new one if yours isn't working.", 'আপনার ব্যবসার জন্য যে প্ল্যাটফর্ম উপযুক্ত সেখানেই আমি কাজ করি।')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {platforms.map(p => (
            <span key={p} className={`px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>{p}</span>
          ))}
        </div>
        <p className={`text-xs mt-6 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          {t('Dedicated breakdowns for each platform are coming soon.', 'প্রতিটি প্ল্যাটফর্মের জন্য বিস্তারিত পেজ শীঘ্রই আসছে।')}
        </p>
      </div>

      {/* ── Proof: Real Client Work ── */}
      <div className={`py-16 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className={`text-2xl lg:text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Proof: Real Client Work', 'প্রমাণ: আসল ক্লায়েন্টের কাজ')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { val: '1050+', label: t('Pages & Funnels', 'পেজ ও ফানেল') },
              { val: '358+', label: t('Reviews', 'রিভিউ') },
              { val: '$200K+', label: t('Earned', 'আয়') },
              { val: '100%', label: t('Job Success', 'জব সাফল্য') },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <div className="text-xl lg:text-2xl font-bold text-gradient mb-1">{s.val}</div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
            {[
              { name: 'Client — TortExpert', role: 'Legal Lead Gen, 2-Year Retainer', quote: t('"Rahim is exceptional. He redesigned our landing pages and our lead cost dropped from $41 to $12. Working together for 2 years now."', '"রাহিম অসাধারণ। তিনি আমাদের ল্যান্ডিং পেজ পুনর্ডিজাইন করেছেন এবং লিড খরচ $৪১ থেকে $১২-তে নেমেছে।"') },
              { name: 'Client — TrueGoldRepublic', role: 'eCommerce, Ongoing', quote: t('"The funnel Rahim built converts cold Facebook traffic at 3.8%. He understands buyer psychology."', '"রাহিমের তৈরি ফানেল ৩.৮% কনভার্সন দিচ্ছে।"') },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
                <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{r.quote}</p>
                <div className={`text-xs font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{r.name}</div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{r.role}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a href="/case-studies" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              {t('See full portfolio', 'সম্পূর্ণ পোর্টফোলিও দেখুন')}<ArrowRight size={15} />
            </a>
            <span className={`mx-3 text-sm ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>·</span>
            <a href="/about" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              {t('More about me', 'আমার সম্পর্কে আরও')}<ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* ── How I Work ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className={`text-2xl lg:text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t('How I Work', 'আমি যেভাবে কাজ করি')}
        </h2>
        <ul className="space-y-4 mb-6">
          {processSteps.map((step, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
              <span className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t(step.en, step.bn)}</span>
            </motion.li>
          ))}
        </ul>
        <div className="text-center">
          <a href="/#process" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            {t('Full process breakdown', 'সম্পূর্ণ প্রক্রিয়া দেখুন')}<ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* ── Pricing teaser ── */}
      <div className={`py-16 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Pricing', 'মূল্য')}
          </h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('Fixed-price projects, starting at $997 for a single landing page. No hourly billing surprises.', 'নির্দিষ্ট মূল্যের প্রজেক্ট, একটি ল্যান্ডিং পেজের জন্য $৯৯৭ থেকে শুরু।')}
          </p>
          <a href="/#pricing" className="btn-primary inline-flex">
            {t('See full pricing', 'সম্পূর্ণ মূল্য তালিকা দেখুন')}<ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className={`text-2xl lg:text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t('Frequently Asked Questions', 'প্রায়ই জিজ্ঞাসিত প্রশ্ন')}
        </h2>
        <div className="space-y-3">
          {faqs.map((item, i) => <FAQRow key={i} item={item} index={i} isDark={isDark} />)}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className={`py-20 lg:py-28 relative overflow-hidden ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
        <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-br from-indigo-900/30 via-transparent to-purple-900/30' : 'bg-gradient-to-br from-indigo-50 via-transparent to-purple-50'}`} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass rounded-3xl p-10 lg:p-14">
            <h2 className={`text-2xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('Get a Free Landing Page Teardown', 'ফ্রি ল্যান্ডিং পেজ পর্যালোচনা পান')}
            </h2>
            <p className={`text-base max-w-lg mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t("I'll review your current landing page and tell you exactly what's costing you conversions — no pushy sales, just what to fix.", 'আমি আপনার বর্তমান ল্যান্ডিং পেজ পর্যালোচনা করে ঠিক কী কনভার্সন কমাচ্ছে তা জানাব।')}
            </p>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25">
              {t('Get My Free Teardown', 'ফ্রি পর্যালোচনা পান')}<ArrowRight size={18} />
            </a>
            <p className={`text-xs mt-6 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
              {t('Typically responds within 2 hours · No commitment required', 'সাধারণত ২ ঘণ্টার মধ্যে সাড়া দেন · কোনো প্রতিশ্রুতি প্রয়োজন নেই')}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
