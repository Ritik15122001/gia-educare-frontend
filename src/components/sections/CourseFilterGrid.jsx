import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import CourseCard from '../cards/CourseCard';
import { useCourseStore } from '../../store/courseStore';
import { useCourses, useCourseCategories, useSection } from '../../hooks/useContent';
import { cn } from '../../utils/cn';

const DEFAULTS = { eyebrow: 'Course catalogue', title: 'Filter by field of study' };

export default function CourseFilterGrid() {
  const selectedCategory = useCourseStore((s) => s.selectedCategory);
  const setSelectedCategory = useCourseStore((s) => s.setSelectedCategory);
  const courses = useCourses();
  const categories = useCourseCategories();
  const section = useSection('courses.list', DEFAULTS);

  const filtered = selectedCategory === 'all' ? courses : courses.filter((c) => c.category === selectedCategory);
  const tabs = [{ key: 'all', label: 'All programs' }, ...categories];

  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} />

        <Reveal className="tabs">
          {tabs.map((cat) => (
            <button
              key={cat.key}
              className={cn('tab', selectedCategory === cat.key && 'on')}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <div className="grid cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="center small" style={{ color: 'var(--muted)', padding: '30px 0' }}>
            No programs in this category yet — try another filter.
          </p>
        )}
      </div>
    </div>
  );
}
