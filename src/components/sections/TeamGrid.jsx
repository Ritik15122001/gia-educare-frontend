import SectionHeader from '../common/SectionHeader';
import TeamCard from '../cards/TeamCard';
import { useTeam, useSection } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'The team',
  title: 'Senior counsellors, not call-centre staff',
  lead: 'Sample profiles for layout — replace with your actual team before launch.',
};

export default function TeamGrid() {
  const team = useTeam();
  const section = useSection('about.team', DEFAULTS);

  if (!team.length) return null;

  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div className="grid cols-4">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
