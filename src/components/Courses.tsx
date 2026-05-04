import { BookOpen, Clock } from 'lucide-react';
import { coursesData } from '@/data/courses';
import type { CourseEntry } from '@/types';
import { CoursesExpandable } from './CoursesExpandable';

const VISIBLE_COUNT = 6;

function CourseRow({ course }: { course: CourseEntry }) {
  return (
    <div className="group border-mist/40 hover:bg-carbon/50 -mx-4 grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b px-4 py-4 transition-colors duration-200 md:grid-cols-[1fr_180px_80px] md:gap-8">
      <div className="flex items-center gap-3">
        <BookOpen
          size={14}
          strokeWidth={1}
          aria-hidden="true"
          className="text-racing-green-lit hidden flex-shrink-0 md:block"
        />
        <span className="text-body text-pearl group-hover:text-gold-leaf font-sans transition-colors duration-300">
          {course.name}
        </span>
      </div>
      <span className="text-caption text-chrome text-right font-mono tracking-wide">
        {course.date}
      </span>
      <span className="text-caption text-racing-green-lit flex items-center justify-end gap-1 text-right font-mono tracking-wide tabular-nums">
        <Clock
          size={12}
          strokeWidth={1}
          aria-hidden="true"
          className="hidden md:block"
        />
        {course.hours}
      </span>
    </div>
  );
}

// Server component. The toggle below the fold is the only stateful piece;
// the rows render as static HTML and the CoursesExpandable client island
// just hides the overflow tail behind a button.
export function Courses() {
  const ordered = [...coursesData].reverse();
  const visibleCourses = ordered.slice(0, VISIBLE_COUNT);
  const hiddenCourses = ordered.slice(VISIBLE_COUNT);

  const totalHours = coursesData.reduce((sum, c) => {
    const num = parseFloat(c.hours.replace(',', '.').replace('h', ''));
    return sum + num;
  }, 0);

  return (
    <section id="courses" className="bg-graphite px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16">
          <p className="text-caption text-racing-green-lit tracking-luxury mb-3 font-mono uppercase">
            Aprendizado contínuo
          </p>
          <h2 className="font-display text-display-lg text-pearl">
            Cursos e certificações
          </h2>
          <div className="bg-gold-leaf mt-4 h-px w-24" />
          <p className="text-caption text-chrome mt-4 font-mono tracking-wide tabular-nums">
            {coursesData.length} cursos · {totalHours.toFixed(0)}+ horas de
            estudo
          </p>
        </div>

        <div className="space-y-0">
          {visibleCourses.map((course) => (
            <CourseRow key={course.name} course={course} />
          ))}
        </div>

        {hiddenCourses.length > 0 ? (
          <CoursesExpandable hiddenCount={hiddenCourses.length}>
            {hiddenCourses.map((course) => (
              <CourseRow key={course.name} course={course} />
            ))}
          </CoursesExpandable>
        ) : null}
      </div>
    </section>
  );
}
