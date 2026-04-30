import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Mail, MessageSquare, Clock } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

// FormSubmit.co — no key needed. On first submission you'll get an activation email
// at contact@conversionliftlab.com — click "Activate" once, then all submissions deliver.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/contact@conversionliftlab.com';

const WA_LINK = (() => {
  const p = ['880', '163', '288', '8127'];
  return `https://wa.me/${p.join('')}?text=${encodeURIComponent("Hi Rahim, I found you via ConversionLiftLab. I'd like to discuss a project.")}`;
})();

const WA_ICON = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function Contact() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Lead from ConversionLiftLab — ${data.name}`,
          _autoresponse: `Hi ${data.name}, thanks for reaching out to ConversionLiftLab! I received your message and will get back to you within 2 hours. — Rahim Badsha`,
          _template: 'table',
          ...data,
        }),
      });
      const result = await res.json();
      if (result.success === 'true' || result.success === true) {
        setSent(true);
      } else {
        setError(t('Something went wrong. Please email directly.', 'কিছু ভুল হয়েছে। সরাসরি ইমেইল করুন।'));
      }
    } catch {
      setError(t('Network error. Please try again.', 'নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।'));
    }
  };

  const inputCls = (hasError) => `form-input ${hasError ? 'error' : ''}`;

  const contactItems = [
    { icon: Mail, label: t('Email', 'ইমেইল'), value: 'contact@conversionliftlab.com', href: 'mailto:contact@conversionliftlab.com' },
    { icon: WA_ICON, label: 'WhatsApp', value: t('Chat directly on WhatsApp', 'WhatsApp-এ সরাসরি চ্যাট করুন'), href: WA_LINK },
    { icon: MessageSquare, label: 'Upwork', value: t('Message on Upwork', 'আপওয়ার্কে মেসেজ'), href: 'https://www.upwork.com/freelancers/rahimbadsha' },
    { icon: Clock, label: t('Response Time', 'সাড়া দেওয়ার সময়'), value: t('Within 2 hours', '২ ঘণ্টার মধ্যে'), href: null },
  ];

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Contact ConversionLiftLab | Free CRO Audit — Rahim Badsha</title>
        <meta name="description" content="Get a free CRO audit and discuss your project. Response within 2 hours. Contact Rahim Badsha via email, WhatsApp, or Upwork. No pushy sales — just results." />
        <link rel="canonical" href="https://conversionliftlab.com/contact" />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t("Let's Build Something", 'চলুন কিছু তৈরি করি')}<br />
            <span className="text-gradient">{t('That Converts', 'যা রূপান্তর করে')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`max-w-lg mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t("Tell me about your project and I'll get back to you within 2 hours with next steps.", 'আপনার প্রজেক্ট সম্পর্কে বলুন এবং আমি ২ ঘণ্টার মধ্যে ফিরে আসব।')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-4">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <div className="glass rounded-xl p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                    <Icon size={18} className={item.label === 'WhatsApp' ? 'text-green-600' : 'text-indigo-600'} />
                  </div>
                  <div>
                    <div className={`text-xs mb-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.label}</div>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.value}</div>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={i} href={item.href} target={item.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener" className="block hover:scale-[1.01] transition-transform">{inner}</a>
              ) : <div key={i}>{inner}</div>;
            })}

            <div className="glass rounded-xl p-5">
              <h3 className={`font-medium mb-3 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('What to expect', 'কী আশা করবেন')}</h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {[
                  t('Free 30-min strategy call', 'বিনামূল্যে ৩০ মিনিটের কৌশল কল'),
                  t('CRO audit of your current page', 'বর্তমান পেজের CRO অডিট'),
                  t('Project timeline & pricing', 'প্রজেক্ট সময়সীমা ও মূল্য'),
                  t('No pushy sales', 'কোনো চাপাচাপি নেই'),
                ].map((it, i) => (
                  <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />{it}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
            {sent ? (
              <div className="glass rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Send size={28} className="text-green-500" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Message Sent!', 'মেসেজ পাঠানো হয়েছে!')}</h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {t("Thanks for reaching out! Check your inbox — I've sent you a confirmation. I'll review your project and reply within 2 hours.", 'যোগাযোগের জন্য ধন্যবাদ! আপনার ইনবক্স চেক করুন — আমি একটি নিশ্চিতকরণ পাঠিয়েছি।')}
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors mt-2">
                  <WA_ICON />
                  {t('Also message on WhatsApp', 'WhatsApp-এও মেসেজ করুন')}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={`text-xs mb-1.5 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('Your Name', 'আপনার নাম')} *</label>
                    <input {...register('name', { required: true })} className={inputCls(errors.name)} placeholder={t('John Smith', 'জন স্মিথ')} />
                  </div>
                  <div>
                    <label className={`text-xs mb-1.5 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('Email', 'ইমেইল')} *</label>
                    <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" className={inputCls(errors.email)} placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label className={`text-xs mb-1.5 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('Platform / Tool', 'প্ল্যাটফর্ম / টুল')}</label>
                  <select {...register('platform')} className="form-input appearance-none">
                    <option value="">{t('Select a platform', 'প্ল্যাটফর্ম বেছে নিন')}</option>
                    {['Webflow', 'ClickFunnels', 'GoHighLevel', 'HubSpot', 'Unbounce', 'WordPress', 'Shopify', 'Instapage', 'Other'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`text-xs mb-1.5 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('Budget Range', 'বাজেট রেঞ্জ')}</label>
                  <select {...register('budget')} className="form-input appearance-none">
                    <option value="">{t('Select budget', 'বাজেট বেছে নিন')}</option>
                    {['Under $500', '$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`text-xs mb-1.5 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('Tell me about your project', 'আপনার প্রজেক্ট সম্পর্কে বলুন')} *</label>
                  <textarea {...register('message', { required: true })} rows={5} className={`${inputCls(errors.message)} resize-none`} placeholder={t("What's your offer? Which platform? Traffic source? Conversion goals?", 'আপনার অফার কী? কোন প্ল্যাটফর্ম? ট্র্যাফিক সোর্স? রূপান্তর লক্ষ্য?')} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60 shadow-lg shadow-indigo-500/20">
                  {isSubmitting
                    ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><Send size={16} />{t('Send Message', 'মেসেজ পাঠান')}</>
                  }
                </button>
                <p className={`text-center text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                  {t('Or chat instantly: ', 'অথবা সরাসরি: ')}
                  <a href={WA_LINK} target="_blank" rel="noopener" className="text-green-600 hover:text-green-700 font-medium">WhatsApp</a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
