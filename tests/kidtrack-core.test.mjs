import test from 'node:test';
import assert from 'node:assert/strict';
import { addTimetablePeriod, isLessonReminderCancelled } from '../kidtrack-core.mjs';

test('two adjacent periods of one subject remain two periods', () => {
  const out = [], seen = new Set(), course = { id: 'english', name: 'Anh' };
  assert.equal(addTimetablePeriod(out, seen, course, '13:30-14:15', 'C1'), true);
  assert.equal(addTimetablePeriod(out, seen, course, '14:15-15:00', 'C2'), true);
  assert.equal(out.length, 2);
  assert.deepEqual(out.map(x => x.p), ['C1', 'C2']);
});

test('duplicate representations of the same timetable period count once', () => {
  const out = [], seen = new Set(), course = { id: 'english', name: 'Anh' };
  assert.equal(addTimetablePeriod(out, seen, course, '13:30-14:15', 'C1'), true);
  assert.equal(addTimetablePeriod(out, seen, course, '13:30-14:15', 'C1'), false);
  assert.equal(out.length, 1);
});

test('fallback periods are distinct by course and time', () => {
  const out = [], seen = new Set();
  addTimetablePeriod(out, seen, { id: 'a' }, '13:30', null);
  addTimetablePeriod(out, seen, { id: 'b' }, '13:30', null);
  assert.equal(out.length, 2);
});

test('absence and teacher cancellation suppress lesson reminders only', () => {
  assert.equal(isLessonReminderCancelled('absent'), true);
  assert.equal(isLessonReminderCancelled('toff'), true);
  assert.equal(isLessonReminderCancelled('present'), false);
  assert.equal(isLessonReminderCancelled(''), false);
  assert.equal(isLessonReminderCancelled(undefined), false);
});
