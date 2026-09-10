import Button from '../common/Button';
import { useSettings } from '../../hooks/useContent';
import { useOpenEnquiry } from '../../hooks/useOpenEnquiry';

export default function StickyCta() {
  const settings = useSettings();
  const openEnquiry = useOpenEnquiry();

  return (
    <div className="sticky-cta">
      <Button variant="ghost" href={`tel:${String(settings.phonePrimary || '').replace(/\s/g, '')}`}>
        Call now
      </Button>
      <Button onClick={() => openEnquiry()}>Free counselling</Button>
    </div>
  );
}
