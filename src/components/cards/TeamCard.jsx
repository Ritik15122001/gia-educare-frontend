import Reveal from '../common/Reveal';

export default function TeamCard({ member, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="team">
      {member.photoUrl ? (
        <img className="av av--photo" src={member.photoUrl} alt={member.name} />
      ) : (
        <span className="av">{member.initials}</span>
      )}
      <b>{member.name}</b>
      <div className="role">{member.role}</div>
      <p>{member.bio}</p>
    </Reveal>
  );
}
