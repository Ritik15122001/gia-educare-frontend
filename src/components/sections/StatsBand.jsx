import StatCard from '../cards/StatCard';
import { useStats } from '../../hooks/useContent';

export default function StatsBand() {
  const stats = useStats();

  return (
    <div className="stats-band">
      <div className="wrap wrap-wide" style={{ paddingInline: 0 }}>
        <div className="stats">
          {stats.map((s, i) => (
            <StatCard key={s.id} stat={s} delay={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
