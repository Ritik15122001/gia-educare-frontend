import { useSettings } from '../../hooks/useContent';

export default function TopBar() {
  const settings = useSettings();

  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar-left">
          <span className="dot"></span>
          {settings.topbarMessage}
        </div>
        <div className="topbar-right">
          <a href={`tel:${String(settings.phonePrimary || '').replace(/\s/g, '')}`}>{settings.phonePrimary}</a>
          <a href={`mailto:${settings.emailPrimary}`}>{settings.emailPrimary}</a>
        </div>
      </div>
    </div>
  );
}
