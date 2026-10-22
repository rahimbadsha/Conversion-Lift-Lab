import LegalPage from '../components/LegalPage';

const sections = [
  {
    h: 'Agreement to these terms',
    p: ['By using conversionliftlab.com (the "Website") you agree to these Terms of Use and Disclaimer. If you do not agree, please do not use the Website. These terms cover use of the Website and its free tools only. Paid projects are governed by the separate written agreement, proposal, or the Upwork or Fiverr contract we agree on.'],
  },
  {
    h: 'What we offer',
    p: ['ConversionLiftLab provides landing page design and development, conversion rate optimization (CRO), sales funnel building and related services. Information on the Website, including packages and prices, is a general description and not a binding offer. A project only begins once scope, price and timeline are confirmed in writing.'],
  },
  {
    h: 'No guarantee of results',
    p: [
      'Conversion rates, lead costs, return on ad spend and other outcomes depend on many factors we do not control, including your offer, traffic quality, pricing, market, ad platform changes and seasonality.',
      'Case studies, testimonials and results shown on the Website are examples from specific client projects. They are not typical, promised or guaranteed results, and your results may be different. Nothing on the Website is a promise of any level of revenue, leads or ranking.',
    ],
  },
  {
    h: 'Free Landing Page Score tool',
    list: [
      'The tool is an automated, rule-based check of the public HTML of a page you enter. It looks at signals such as headline, calls to action, trust elements, forms and basic mobile and speed markers.',
      'The score and tips are general information only. They are not professional advice, a full CRO audit, or a prediction of performance, and they can be incomplete or wrong, especially for pages that load content with JavaScript.',
      'Only enter web pages that are publicly accessible and that you own or have permission to analyze. Do not enter private, internal or login-protected addresses.',
      'Do not misuse the tool: no automated or bulk scanning, attempts to bypass rate limits or security, or use to attack or overload any website. We may block access or change or remove the tool at any time.',
      'The tool is provided free, "as is" and "as available".',
    ],
  },
  {
    h: 'Acceptable use',
    p: ['You agree not to use the Website to break any law, infringe anyone\'s rights, send malware or spam, attempt unauthorised access, interfere with the Website\'s operation, or copy or scrape the Website in bulk.'],
  },
  {
    h: 'Intellectual property',
    p: ['The Website\'s text, design, graphics and code are owned by or licensed to ConversionLiftLab and protected by copyright and other laws. You may view and share links to the Website, but you may not copy, republish or sell its content without written permission. Ownership of deliverables for client projects is set out in the agreement for that project. Third-party names, logos and trademarks (such as Webflow, ClickFunnels, GoHighLevel, Shopify, Upwork and Fiverr) belong to their owners, and mention of them does not imply endorsement or affiliation.'],
  },
  {
    h: 'Third-party websites and platforms',
    p: ['The Website links to and works with third-party services. We do not control and are not responsible for their content, availability, policies or changes. Your use of them is at your own risk and subject to their terms.'],
  },
  {
    h: 'Disclaimer of warranties',
    p: ['The Website and its content are provided "as is" and "as available", without warranties of any kind, whether express or implied, including accuracy, completeness, fitness for a particular purpose, and uninterrupted or error-free operation. To the fullest extent permitted by law, we disclaim all such warranties.'],
  },
  {
    h: 'Limitation of liability',
    p: ['To the fullest extent permitted by law, ConversionLiftLab and Rahim Badsha are not liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or business opportunity, arising from your use of, or inability to use, the Website or its tools, or from reliance on its content. Where liability cannot be excluded, it is limited to the greater of the amount you paid us for the relevant service in the 12 months before the claim, or USD 100. Nothing in these terms limits liability that cannot lawfully be limited, such as for fraud or for death or personal injury caused by negligence, and your statutory consumer rights are not affected.'],
  },
  {
    h: 'Privacy',
    p: ['Our Privacy Policy at /privacy explains how we handle personal information, and forms part of these terms.'],
  },
  {
    h: 'Governing law',
    p: ['These terms are governed by the laws of Bangladesh, where ConversionLiftLab operates, without regard to conflict of laws rules. If you are a consumer, you may also have mandatory protections under the law of your country of residence, which these terms do not remove.'],
  },
  {
    h: 'Changes',
    p: ['We may update these terms and the Website at any time. The "Last updated" date shows the latest version, and continued use means you accept the changes.'],
  },
  {
    h: 'Contact',
    p: ['Questions about these terms? Email contact@conversionliftlab.com.'],
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use & Disclaimer"
      path="/terms"
      description="Terms of use and disclaimer for ConversionLiftLab: no guarantee of results, how the free Landing Page Score tool works, and your responsibilities."
      updated="22 October 2026"
      intro={[
        'Please read these terms before using conversionliftlab.com. They are written in plain language and apply to visitors from every country.',
      ]}
      sections={sections}
    />
  );
}
