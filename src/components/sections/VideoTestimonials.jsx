import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import Pill from '../common/Pill';
import { useSection, useVideoTestimonials } from '../../hooks/useContent';

const DEFAULTS = {
  eyebrow: 'Hear it from students',
  title: 'Video stories from our admits',
  lead: 'Real students on how they chose a country, got the admit and cleared the visa.',
};

// The poster loads first; the player (and YouTube's scripts and cookies) only
// load after a click. youtube-nocookie keeps tracking off until playback.
function VideoCard({ video, delay }) {
  const [playing, setPlaying] = useState(false);
  const isYouTube = Boolean(video.youtubeId);
  const label = `Play ${video.name}'s story`;

  return (
    <Reveal as="article" delay={delay} className="video-card">
      <div className="video-media">
        {playing ? (
          isYouTube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${video.name} — student story`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video src={video.videoUrl} poster={video.poster || undefined} controls autoPlay playsInline />
          )
        ) : (
          <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={label}>
            {video.poster ? <img src={video.poster} alt="" loading="lazy" /> : <span className="video-poster-blank" />}
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
            </span>
          </button>
        )}
      </div>
      <div className="video-body">
        {video.quote && <p className="video-quote">“{video.quote}”</p>}
        <div className="video-who">
          <div style={{ minWidth: 0 }}>
            <b>{video.name}</b>
            <small>{[video.program, video.university].filter(Boolean).join(' · ')}</small>
          </div>
          {video.country && <Pill variant="plain">{video.country}</Pill>}
        </div>
      </div>
    </Reveal>
  );
}

export default function VideoTestimonials() {
  const videos = useVideoTestimonials();
  const section = useSection('home.videos', DEFAULTS);

  if (!videos.length) return null;

  return (
    <div className="section" style={{ background: 'var(--paper)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div className="grid cols-3">
          {videos.slice(0, 6).map((v, i) => (
            <VideoCard key={v.id} video={v} delay={i % 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
