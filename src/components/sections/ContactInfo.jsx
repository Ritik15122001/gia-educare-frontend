import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import { useSettings } from '../../hooks/useContent';

const tel = (n) => `tel:${String(n || '').replace(/\s/g, '')}`;

export default function ContactInfo() {
  const settings = useSettings();
  const headOffice = settings.offices?.[0];

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
    </Reveal>
  );
}
