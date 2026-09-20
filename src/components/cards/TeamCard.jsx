import Reveal from '../common/Reveal';
import { useImageOk } from '../../hooks/useImageOk';

export default function TeamCard({ member, delay = 0 }) {
  const [showPhoto, onPhotoError] = useImageOk(member.photoUrl);

  return (
    <Reveal as="article" delay={delay} className="team">
      {showPhoto ? (
        <img className="av av--photo" src={member.photoUrl} alt={member.name} onError={onPhotoError} />
      ) : (
        <span className="av">{member.initials}</span>
      )}
      <b>{member.name}</b>
      <div className="role">{member.role}</div>
      <p>{member.bio}</p>
    </Reveal>
  );
}
