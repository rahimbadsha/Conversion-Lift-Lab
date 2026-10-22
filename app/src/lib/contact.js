// Contact details shared by the footer and the contact page.
export const CONTACT_EMAIL = 'contact@conversionliftlab.com';
export const UPWORK_URL = 'https://www.upwork.com/freelancers/rahimbadsha';

// FormSubmit.co: no key needed. The first submission sends an activation email to CONTACT_EMAIL.
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// Number split to avoid plain-text scraping.
const WA_NUMBER = ['880', '163', '288', '8127'].join('');

export const whatsappLink = text => `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
