import { useMilestones } from '../../hooks/useContent';

export default function Milestones() {
  const milestones = useMilestones();

  return (
    <div className="mline">
      {milestones.map((m) => (
        <div className="mitem" key={m.id || m.year}>
          <span className="yr">{m.year}</span>
          <b>{m.title}</b>
          <p>{m.description}</p>
        </div>
      ))}
    </div>
  );
}
