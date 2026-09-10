import Icon from '../common/Icon';
import Button from '../common/Button';

export default function SuccessState({ values, onReset }) {
  return (
    <div className="enq-success" role="status">
      <div className="succ-ring">
        <Icon name="check" size={28} strokeWidth={3} />
      </div>
      <h3>Thank you — we've got it.</h3>
      <p>A senior counsellor will call you within one working day. Check your email for a confirmation and a short prep checklist.</p>
      <div className="recap">
        <b>Name:</b> {values.name}
        <br />
        <b>Contact:</b> {values.code} {values.phone} · {values.email}
        <br />
        <b>Looking at:</b> {values.destination} · {values.level || '—'} · {values.intake || '—'}
      </div>
      <Button variant="outline" onClick={onReset} style={{ marginTop: 18 }}>
        Send another enquiry
      </Button>
    </div>
  );
}
