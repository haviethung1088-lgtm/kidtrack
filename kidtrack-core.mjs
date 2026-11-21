export function addTimetablePeriod(out, seen, course, time, period) {
  const key = period || course.id + '|' + time;
  if (seen.has(key)) return false;
  seen.add(key);
  out.push({ c: course, t: time || '', p: period });
  return true;
}

export function isLessonReminderCancelled(status) {
  return status === 'absent' || status === 'toff';
}
