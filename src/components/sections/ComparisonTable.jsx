import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { useComparisonRows, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'Side by side',
  title: 'The four-minute comparison',
  lead: 'Swipe horizontally on mobile. Figures are indicative for a taught masters and are confirmed live during counselling.',
};

export default function ComparisonTable() {
  const rows = useComparisonRows();
  const section = useSection('destinations.compare', DEFAULTS);

  if (!rows.length) return null;

  return (
    <div className="section section--tight" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <Reveal className="tbl-wrap">
          <table className="cmp">
            <thead>
              <tr>
                <th>Country</th>
                <th>Course length</th>
                <th>Tuition / yr</th>
                <th>Living cost / yr</th>
                <th>Post-study work</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id || row.country}>
                  <td>{row.country}</td>
                  <td>{row.length}</td>
                  <td>{row.tuition}</td>
                  <td>{row.living}</td>
                  <td>{row.work}</td>
                  <td>{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </div>
  );
}
