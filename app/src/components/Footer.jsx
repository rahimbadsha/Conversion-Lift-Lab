import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const platforms = ['Webflow', 'ClickFunnels', 'GoHighLevel', 'HubSpot', 'Unbounce', 'WordPress', 'Shopify', 'Instapage'];

// Number split to avoid plain-text scraping
const getWaLink = () => {
  const p = ['880', '163', '288', '8127'];
  return `https://wa.me/${p.join('')}`;
};

export default function Footer() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t pt-16 pb-8 ${isDark ? 'bg-[#050816] border-indigo-500/10' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">CL</div>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ConversionLift<span className="text-gradient">Lab</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('Expert CRO landing pages & funnels that convert. 950+ pages built, $200K+ earned on Upwork, 100% Job Success.', '৯৫০+ পেজ তৈরি, ১০০% জব সাফল্য সহ CRO ল্যান্ডিং পেজ ও ফানেল বিশেষজ্ঞ।')}
            </p>
            {/* WhatsApp button — number not shown as text */}
            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full font-medium transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('Chat on WhatsApp', 'WhatsApp-এ চ্যাট করুন')}
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className={`font-medium mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Quick Links', 'দ্রুত লিঙ্ক')}</h4>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {[['/#services', t('Services', 'সেবাসমূহ')], ['/#case-studies', t('Case Studies', 'কেস স্টাডি')], ['/#process', t('Process', 'প্রক্রিয়া')], ['/#pricing', t('Pricing', 'মূল্য')], ['/about', t('About', 'সম্পর্কে')], ['/contact', t('Contact', 'যোগাযোগ')]].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:text-indigo-600 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-medium mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Contact', 'যোগাযোগ')}</h4>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><a href="mailto:rahimbadsha.cse@gmail.com" className="hover:text-indigo-600 transition-colors break-all">rahimbadsha.cse@gmail.com</a></li>
              <li><a href="https://www.upwork.com/freelancers/rahimbadsha" target="_blank" rel="noopener" className="hover:text-indigo-600 transition-colors">Upwork Profile</a></li>
              <li><a href="https://www.fiverr.com/s/8zk7Wpv" target="_blank" rel="noopener" className="hover:text-indigo-600 transition-colors">Fiverr Profile</a></li>
              <li><a href={getWaLink()} target="_blank" rel="noopener" className="hover:text-green-600 transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2 mb-8">
          {platforms.map(p => (
            <span key={p} className={`text-xs px-3 py-1 rounded-full border ${isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>{p}</span>
          ))}
        </div>

        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs ${isDark ? 'border-indigo-500/10 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
          <p>© 2025 ConversionLiftLab. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
          <p>{t('Built with precision. Optimized for conversions.', 'নির্ভুলভাবে তৈরি। রূপান্তরের জন্য অপ্টিমাইজড।')}</p>
        </div>
      </div>
    </footer>
  );
}
