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

export function notificationRouteFromSearch(search) {
  const p = new URLSearchParams(search);
  if (p.get('kt_notice') !== '1') return null;
  const tabs = new Set(['home', 'lich', 'tkb', 'mon', 'tien', 'diem']);
  const date = p.get('date') || '';
  return {
    student: p.get('student') || '',
    tab: tabs.has(p.get('tab')) ? p.get('tab') : 'home',
    date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : ''
  };
}
