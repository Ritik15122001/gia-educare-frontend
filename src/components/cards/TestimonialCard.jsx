import Reveal from '../common/Reveal';

export default function TestimonialCard({ testimonial, delay = 0 }) {
  return (
    <Reveal as="figure" delay={delay} className="quote" style={{ margin: 0 }}>
      <div className="qm">"</div>
      <p>{testimonial.quote}</p>
      <figcaption className="qwho">
        <span className="av">{testimonial.initials}</span>
        <div>
          <b>{testimonial.name}</b>
          <small>{testimonial.program}</small>
          <div className="stars" aria-label={`${testimonial.rating || 5} out of 5`}>
            {'★'.repeat(testimonial.rating || 5)}
          </div>
        </div>
      </figcaption>
    </Reveal>
  );
}
