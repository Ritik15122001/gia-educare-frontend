import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHead from '../../components/layout/PageHead';
import Reveal from '../../components/common/Reveal';
import Eyebrow from '../../components/common/Eyebrow';
import Button from '../../components/common/Button';
import Chk from '../../components/common/Chk';
import Icon from '../../components/common/Icon';
import SocialIcon from '../../components/common/SocialIcon';
import EnquiryForm from '../../components/forms/EnquiryForm';
import { useSection, useSettings } from '../../hooks/useContent';
import { telHref, whatsappHref } from '../../utils/contact';

const HEAD = {
  title: 'Get your free profile evaluation',
  lead: 'Tell us where you are today and a senior counsellor comes back within one working day with a shortlist built around your profile, budget and career goals. No obligation.',
};
const PANEL = {
  eyebrow: 'What you get back',
  title: 'A plan, not a sales pitch',
};

const ITEMS = [
  { title: 'Profile evaluation', description: 'Where you stand today, honestly.' },
  { title: 'University, country & course shortlist', description: '3–5 options matched to your profile, budget and career goals.' },
  { title: 'Your next steps, mapped out', description: 'Tests, applications, documents and timelines — clearly explained.' },
];

const WHATSAPP_MESSAGE = "Hi GIA Educare, I'd like a free profile evaluation.";

export default function Enquiry() {
  const settings = useSettings();
  const head = useSection('enquiry.head', HEAD);
  const panel = useSection('enquiry.panel', PANEL);
  // CTAs across the site hand over context (a course, a destination, a counsellor).
  const prefill = useLocation().state?.prefill || null;

  useEffect(() => {
    document.title = `Free profile evaluation · ${settings.brand}`;
  }, [settings.brand]);

  const phone = settings.phonePrimary;
  const whatsappNumber = (settings.socials?.whatsapp || '').match(/wa\.me\/(\d+)/)?.[1] || phone;

  return (
    <>
      <PageHead crumb="Free profile evaluation" title={head.title} lead={head.lead} />

      <div className="section">
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <EnquiryForm variant="full" prefill={prefill} badge="No obligation" />
            </Reveal>

            <Reveal delay={1}>
              <Eyebrow>{panel.eyebrow}</Eyebrow>
              <h2 className="h2" style={{ marginBottom: 22 }}>{panel.title}</h2>

              <ul className="checklist">
                {ITEMS.map((item) => (
                  <li key={item.title}>
                    <Chk />
                    <div>
                      <b>{item.title}</b>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cinfo" style={{ marginTop: 22 }}>
                <span className="ico" style={{ margin: 0, width: 46, height: 46, borderRadius: 13 }}>
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <b>Prefer to talk first?</b>
                  <p>{settings.hours}</p>
                  <div className="hero-actions" style={{ marginTop: 14 }}>
                    <Button variant="outline" href={telHref(phone)}>Call {phone}</Button>
                    <Button variant="outline" href={whatsappHref(whatsappNumber, WHATSAPP_MESSAGE)}>
                      <SocialIcon name="whatsapp" size={17} /> WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
