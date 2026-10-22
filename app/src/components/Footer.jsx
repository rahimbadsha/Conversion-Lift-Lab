import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import WhatsAppIcon from './WhatsAppIcon';
import { CONTACT_EMAIL, UPWORK_URL, whatsappLink } from '../lib/contact';

const platforms = ['Webflow', 'ClickFunnels', 'GoHighLevel', 'HubSpot', 'Unbounce', 'WordPress', 'Shopify', 'Instapage'];

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
                Conversion<span className="text-gradient">Lift</span>Lab
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('Expert CRO landing pages & funnels that convert. 1050+ pages & funnels built, $200K+ earned on Upwork, 100% Job Success.', '১০৫০+ পেজ ও ফানেল তৈরি, ১০০% জব সাফল্য সহ CRO ল্যান্ডিং পেজ ও ফানেল বিশেষজ্ঞ।')}
            </p>
            {/* WhatsApp button — number not shown as text */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full font-medium transition-colors"
            >
              <WhatsAppIcon />
              {t('Chat on WhatsApp', 'WhatsApp-এ চ্যাট করুন')}
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className={`font-medium mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Quick Links', 'দ্রুত লিঙ্ক')}</h4>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {[['/services', t('Services', 'সেবাসমূহ')], ['/case-studies', t('Case Studies', 'কেস স্টাডি')], ['/portfolio', t('Portfolio', 'পোর্টফোলিও')], ['/#process', t('Process', 'প্রক্রিয়া')], ['/#pricing', t('Pricing', 'মূল্য')], ['/website-score', t('Free CRO Audit Tool', 'ফ্রি CRO অডিট টুল')], ['/about', t('About', 'সম্পর্কে')], ['/contact', t('Contact', 'যোগাযোগ')]].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:text-indigo-600 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-medium mb-4 text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Contact', 'যোগাযোগ')}</h4>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-indigo-600 transition-colors break-all">{CONTACT_EMAIL}</a></li>
              <li><a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Upwork Profile</a></li>
              <li><a href="https://www.fiverr.com/s/8zk7Wpv" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Fiverr Profile</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">WhatsApp</a></li>
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
          <p>© {new Date().getFullYear()} ConversionLiftLab. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
          <p className="flex items-center gap-3">
            <a href="/privacy" className="hover:text-indigo-500 transition-colors">{t('Privacy Policy', 'গোপনীয়তা নীতি')}</a>
            <span aria-hidden="true">·</span>
            <a href="/terms" className="hover:text-indigo-500 transition-colors">{t('Terms & Disclaimer', 'শর্তাবলী ও দাবিত্যাগ')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
