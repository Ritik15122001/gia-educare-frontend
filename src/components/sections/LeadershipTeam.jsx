import { useState } from 'react';
import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import Chk from '../common/Chk';
import { useTeam, useSection } from '../../hooks/useContent';

const initialsOf = (name = '') => name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

const DEFAULTS = {
  eyebrow: 'Meet our leadership team',
  title: 'The People Behind GIA Educare',
  lead: 'At GIA Educare, our vision is driven by a team that combines entrepreneurship, education, technology, business development and student-focused thinking. Our leadership team works together to build a professional and student-centric platform that provides personalised guidance and structured support to students aspiring to pursue education abroad.',
};

export const LEADER_NAMES = ['Jugal Kishor Sharma', 'Mithilesh Kumar'];

const LEADERS = [
  {
    name: 'Jugal Kishor Sharma',
    role: 'Founder & Director, GIA Educare',
    tagline: 'Building Opportunities. Guiding Ambitions. Shaping Global Futures.',
    photo: '/team/jugal-kishor-sharma.jpg',
    paras: [
      'Jugal Kishor Sharma is an entrepreneur, business leader and the Founder & Director of GIA Educare. His journey has been shaped by a strong belief that the right opportunity, combined with the right guidance, can change the direction of a student’s future.',
      'Over the years, Jugal has built experience across multiple business domains, including travel, education, technology, digital marketing and business development. This diverse entrepreneurial experience has given him a practical understanding of how businesses, people and technology can come together to create meaningful services.',
      'His journey into the education sector comes from a simple belief: students should have access to the right information and guidance before making one of the most important decisions of their lives.',
      'For many students, studying abroad is more than choosing a university. It involves choosing the right career path, understanding different countries and education systems, evaluating courses, managing finances, completing applications and preparing for an entirely new environment. Jugal saw an opportunity to make this journey more structured, transparent and student-focused.',
    ],
    roleTitle: 'His role at GIA Educare',
    roleIntro: 'As the Founder & Director of GIA Educare, Jugal leads the organisation’s vision, strategy and overall growth. He is actively involved in:',
    bullets: [
      'Strategic business development and growth',
      'Building institutional and strategic partnerships',
      'Developing the GIA Educare brand and digital presence',
      'Technology and digital transformation',
      'Marketing and communication',
      'Business operations and service development',
      'Improving the overall student experience',
      'Building a strong and professional team',
    ],
    more: [
      {
        title: 'A technology-driven approach to education',
        paras: [
          'With his background in technology and digital business, Jugal believes the future of education counselling will increasingly combine human expertise with technology.',
          'At GIA Educare, he is focused on developing digital processes and technology-enabled systems that make communication, counselling, application management and student support more organised and efficient. The objective is simple — use technology to improve the student experience, while keeping personalised human guidance at the centre.',
        ],
      },
      {
        title: 'His vision for GIA Educare',
        paras: [
          'Jugal’s vision is to build GIA Educare into a trusted global education platform that students and parents can rely on throughout their international education journey.',
          'He wants GIA Educare to go beyond simply helping students submit applications. The larger objective is to become a long-term education partner — helping students understand their options, make informed decisions and prepare confidently for their next chapter.',
        ],
      },
      {
        title: 'Beyond business',
        paras: [
          'For Jugal, GIA Educare is not simply about building a business. It is about building a platform that can create meaningful opportunities for students and their families.',
          'His entrepreneurial philosophy is rooted in trust, transparency, innovation and long-term relationships.',
        ],
      },
    ],
    quote: 'Every student’s journey is different. Our responsibility is to understand that journey, provide the right guidance and help them move towards their global ambitions with clarity and confidence.',
  },
  {
    name: 'Mithilesh Kumar',
    role: 'Co-Founder, GIA Educare',
    tagline: 'Supporting Students. Building Relationships. Creating Opportunities.',
    photo: '/team/mithilesh-kumar.jpg',
    paras: [
      'Mithilesh Kumar is the Co-Founder of GIA Educare and plays an important role in the organisation’s business development, student engagement and relationship-building initiatives.',
      'With an entrepreneurial mindset and a strong focus on building professional relationships, Mithilesh contributes to the growth of GIA Educare by connecting with students, families, referral networks and potential partners.',
    ],
    roleTitle: 'His role at GIA Educare',
    roleIntro: 'As a Co-Founder, Mithilesh works closely with the leadership team on:',
    bullets: [
      'Business development and growth initiatives',
      'Student and referral relationships',
      'Strategic networking and partnerships',
      'Student engagement',
      'Business opportunities and collaborations',
      'Supporting the expansion of GIA Educare’s reach',
    ],
    more: [
      {
        title: 'His contribution',
        paras: [
          'Mithilesh believes that strong relationships are an important part of a successful education journey. His approach focuses on understanding student requirements, maintaining clear communication and helping connect students with suitable education opportunities.',
          'Working alongside the leadership team, he brings his network, business relationships and entrepreneurial perspective to help GIA Educare build meaningful connections with students and partners.',
        ],
      },
      {
        title: 'His vision',
        paras: [
          'Mithilesh’s vision is to contribute towards building GIA Educare as a trusted education brand where students and parents feel supported, informed and confident throughout their journey towards international education.',
        ],
      },
    ],
    quote: 'The right guidance begins with understanding the student’s aspirations and building a relationship based on trust.',
  },
];

function LeaderPhoto({ leader, sources }) {
  // Walk the candidates in order: a photo uploaded in the CRM, the bundled
  // portrait, then initials. A dead URL on one must not hide the next.
  const [index, setIndex] = useState(0);
  const src = sources[index];
  if (!src) {
    return <div className="leader-photo"><span aria-hidden="true">{initialsOf(leader.name)}</span></div>;
  }
  return (
    <div className="leader-photo">
      <img src={src} alt={leader.name} loading="lazy" onError={() => setIndex((i) => i + 1)} />
    </div>
  );
}

export default function LeadershipTeam() {
  const section = useSection('about.leadership', DEFAULTS);
  const team = useTeam();

  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader center eyebrow={section.eyebrow} title={section.title} lead={section.lead} />

        <div className="leaders">
          {LEADERS.map((leader, i) => {
            // A photo uploaded against this person in the CRM wins; the bundled
            // file is the fallback, and initials cover both being missing.
            const fromCrm = team.find((m) => m.name?.trim().toLowerCase() === leader.name.toLowerCase())?.photoUrl;
            return (
              <Reveal as="article" className="leader" key={leader.name} delay={i}>
                <div className="leader-head">
                  <LeaderPhoto leader={leader} sources={[fromCrm, leader.photo].filter(Boolean)} />
                  <div>
                    <h3>{leader.name}</h3>
                    <p className="leader-role">{leader.role}</p>
                    <p className="leader-tagline">{leader.tagline}</p>
                  </div>
                </div>

                <div className="leader-body">
                  {leader.paras.map((p) => <p key={p.slice(0, 22)}>{p}</p>)}

                  <h4>{leader.roleTitle}</h4>
                  <p>{leader.roleIntro}</p>
                  <ul className="checklist leader-list">
                    {leader.bullets.map((b) => (
                      <li key={b}><Chk /><div><b>{b}</b></div></li>
                    ))}
                  </ul>

                  {leader.more.map((block) => (
                    <div key={block.title}>
                      <h4>{block.title}</h4>
                      {block.paras.map((p) => <p key={p.slice(0, 22)}>{p}</p>)}
                    </div>
                  ))}

                  <blockquote className="leader-quote">{leader.quote}</blockquote>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
