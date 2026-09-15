import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import { useSettings } from '../../hooks/useContent';

const tel = (n) => `tel:${String(n || '').replace(/\s/g, '')}`;

// Turns a Google Maps link (…?q=lat,lng or …?q=address) into an embeddable URL
// that needs no API key.
function embedUrlOf(mapUrl) {
  if (!mapUrl) return '';
  try {
    const url = new URL(mapUrl);
    const q = url.searchParams.get('q') || url.searchParams.get('query');
    return q ? `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed` : '';
  } catch {
    return '';
  }
}

export default function ContactInfo() {
  const settings = useSettings();
  const headOffice = settings.offices?.[0];
  const mapEmbed = embedUrlOf(settings.mapUrl);

  return (
    <Reveal delay={2}>
      <div className="grid" style={{ gap: 14 }}>
        <div className="cinfo">
          <span className="ico" style={{ margin: 0, width: 46, height: 46, borderRadius: 13 }}>
            <Icon name="phone" />
          </span>
          <div>
            <b>Call us</b>
            <p>
              <a href={tel(settings.phonePrimary)}>{settings.phonePrimary}</a>
              {settings.phoneSecondary && (
                <>
                  {' · '}
                  <a href={tel(settings.phoneSecondary)}>{settings.phoneSecondary}</a>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="cinfo">
          <span className="ico" style={{ margin: 0, width: 46, height: 46, borderRadius: 13 }}>
            <Icon name="mail" />
          </span>
          <div>
            <b>Email</b>
            <p>
              <a href={`mailto:${settings.emailPrimary}`}>{settings.emailPrimary}</a>
              {settings.emailAdmissions && (
                <>
                  <br />
                  <a href={`mailto:${settings.emailAdmissions}`}>{settings.emailAdmissions}</a>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="cinfo">
          <span className="ico" style={{ margin: 0, width: 46, height: 46, borderRadius: 13 }}>
            <Icon name="pin" />
          </span>
          <div>
            <b>Head office</b>
            <p>{headOffice?.address || settings.addressLine}</p>
          </div>
        </div>

        <div className="cinfo">
          <span className="ico" style={{ margin: 0, width: 46, height: 46, borderRadius: 13 }}>
            <Icon name="clock" />
          </span>
          <div>
            <b>Office hours</b>
            <p>
              {settings.hours}
              <br />
              Sunday: closed (email replies only)
            </p>
          </div>
        </div>
      </div>

      {mapEmbed ? (
        <Reveal className="map map--embed" style={{ marginTop: 16 }}>
          <iframe
            title={`Map to ${headOffice?.name || settings.brand}`}
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="map-directions" href={settings.mapUrl} target="_blank" rel="noreferrer noopener">
            Get directions ↗
          </a>
        </Reveal>
      ) : (
        <Reveal className="map" style={{ marginTop: 16 }}>
          <div className="map-pin">
            <div className="p">
              <span>📍</span>
            </div>
            <b style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', fontWeight: 700 }}>
              {headOffice?.name || settings.addressLine}
            </b>
            <p className="small" style={{ color: 'var(--muted)', marginTop: 6 }}>
              {headOffice?.address || ''}
            </p>
          </div>
        </Reveal>
      )}
    </Reveal>
  );
}
