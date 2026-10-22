import LegalPage from '../components/LegalPage';

const sections = [
  {
    h: 'Who we are',
    p: [
      'ConversionLiftLab ("we", "us", "our") is the business of Rahim Badsha, a freelance landing page, conversion rate optimization (CRO) and sales funnel specialist. This website is conversionliftlab.com.',
      'For privacy questions or requests, email contact@conversionliftlab.com. For the purposes of laws such as the GDPR and UK GDPR, we are the "controller" of the personal data described below.',
    ],
  },
  {
    h: 'What information we collect',
    list: [
      'Contact form: if you use the contact form, we receive the details you enter: your name, email address, the platform and budget range you choose (optional), and your message.',
      'Emails and messages: if you email us, message us on WhatsApp, or contact us through Upwork or Fiverr, we receive whatever you send and your contact details on that service.',
      'Free Landing Page Score tool: we receive the web page address (URL) you enter. Our server visits that public page to read its content and calculate a score. We do not need, and you should not enter, any login details or private pages.',
      'Technical data: like most websites, our hosting and security provider (Cloudflare) processes your IP address, browser type, device information and the pages requested, in order to deliver the site, keep it secure and measure performance. This may include privacy-friendly, aggregated analytics.',
      'Browser storage: your theme (light/dark) and language choice are saved in your own browser (local storage) so the site remembers them. This stays on your device and is not sent to us.',
    ],
  },
  {
    h: 'How we use your information',
    list: [
      'To reply to your enquiry, send the free CRO audit or quote you ask for, and carry out agreed work.',
      'To run the Website Score tool and show you your result.',
      'To keep the website secure, prevent abuse (for example, limit how many scans one IP address can run per hour), and fix errors.',
      'To keep business records and meet legal, tax and accounting obligations.',
      'To improve the website and our services, using aggregated information.',
    ],
    p: ['We do not use your information for automated decisions that have legal or similarly significant effects on you, and we do not sell your personal information.'],
  },
  {
    h: 'Legal bases (for visitors in the UK and European Economic Area)',
    list: [
      'Consent: when you choose to send us a message or submit a URL.',
      'Contract: to take steps at your request before entering a contract, and to deliver services you hire us for.',
      'Legitimate interests: to secure and operate the site, prevent abuse, and communicate about your enquiry.',
      'Legal obligation: where the law requires us to keep records.',
    ],
  },
  {
    h: 'Who we share information with',
    p: ['We only share information with service providers that help us run the website and the business, and only as needed:'],
    list: [
      'Cloudflare, Inc.: website hosting, content delivery, security, performance monitoring and the temporary storage used to limit tool abuse.',
      'FormSubmit.co: delivers contact form messages to our email inbox and sends you an automatic confirmation.',
      'Our email provider: to receive and reply to your messages.',
      'Google Fonts: our pages load fonts from Google, which means your IP address is sent to Google to deliver the font files.',
      'WhatsApp (Meta), Upwork and Fiverr: only if you choose to contact us through those services. Their own privacy policies apply.',
      'Professional advisers, authorities or courts where we are legally required, or to protect our rights.',
    ],
  },
  {
    h: 'Cookies and similar technologies',
    p: [
      'We do not use advertising or cross-site tracking cookies. Cloudflare may set strictly necessary cookies or use similar technology for security and performance. We store your theme and language preferences in your browser local storage, which you can clear at any time in your browser settings.',
    ],
  },
  {
    h: 'International transfers',
    p: [
      'We are based outside the UK and EEA, and our providers (such as Cloudflare and Google) operate globally. Your information may therefore be processed in countries other than where you live. Where required, we rely on appropriate safeguards such as the providers\' standard contractual clauses.',
    ],
  },
  {
    h: 'How long we keep information',
    list: [
      'Contact messages and project communications: kept for as long as needed to handle your enquiry and the related business relationship, and generally no longer than three years after our last contact, unless the law or a contract requires longer.',
      'Website Score URLs: not stored after your result is produced.',
      'Rate-limit counters (based on IP address): kept for about one hour, then deleted automatically.',
      'Server and security logs: kept by Cloudflare according to its own retention schedule.',
    ],
  },
  {
    h: 'Your rights',
    p: ['Depending on where you live, you may have the right to:'],
    list: [
      'Access the personal information we hold about you and get a copy.',
      'Correct information that is wrong or incomplete.',
      'Delete your information, or restrict or object to how we use it.',
      'Withdraw consent at any time, where we rely on consent.',
      'Receive your information in a portable format.',
      'Complain to your local data protection authority.',
      'For California residents (CCPA/CPRA) and similar laws: know what is collected and used, request deletion or correction, and not be discriminated against for exercising your rights. We do not sell or "share" personal information for cross-context behavioural advertising.',
    ],
  },
  {
    h: 'How to make a request',
    p: ['Email contact@conversionliftlab.com with your request. We may need to confirm your identity first, and we aim to respond within 30 days. This does not affect your statutory rights.'],
  },
  {
    h: 'Children',
    p: ['This website is intended for businesses and adults. It is not directed to children under 16, and we do not knowingly collect their personal information. If you believe a child has sent us information, contact us and we will delete it.'],
  },
  {
    h: 'Security',
    p: ['We use reasonable technical and organisational measures, including HTTPS encryption in transit, to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. Please do not send passwords or payment card details through the contact form or email.'],
  },
  {
    h: 'Links to other websites',
    p: ['This site links to other websites and services (such as Upwork, Fiverr and WhatsApp). We are not responsible for their content or privacy practices, so please read their policies.'],
  },
  {
    h: 'Changes to this policy',
    p: ['We may update this policy from time to time. The "Last updated" date at the top shows when it last changed. Material changes will be highlighted on this page.'],
  },
  {
    h: 'Contact us',
    p: ['ConversionLiftLab, Rahim Badsha. Email: contact@conversionliftlab.com.'],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      description="How ConversionLiftLab collects, uses and protects your personal information, including contact form messages and the free Landing Page Score tool."
      updated="22 October 2026"
      intro={[
        'This Privacy Policy explains what personal information ConversionLiftLab collects when you visit conversionliftlab.com or use our services, why we collect it, and the choices you have. We have written it in plain language, and it applies to visitors from every country.',
      ]}
      sections={sections}
    />
  );
}
