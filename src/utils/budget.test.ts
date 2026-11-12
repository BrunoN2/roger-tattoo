import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateStyleWhatsAppLink,
  generateScheduleWhatsAppLink,
  formatScheduleDatePtBr,
  getCalendarDays,
  SCHEDULE_TIME_SLOTS,
  searchFaq,
  OFFICIAL_PHONE
} from './budget';

test('generateStyleWhatsAppLink builds accurate WhatsApp url with chosen style', () => {
  const url = generateStyleWhatsAppLink('Maori', 'Fechamento de braço');
  assert.ok(url.includes(OFFICIAL_PHONE));
  assert.ok(url.includes('Maori'));
  assert.ok(url.includes('Fechamento'));
});

test('generateStyleWhatsAppLink works with default note', () => {
  const url = generateStyleWhatsAppLink('Flores');
  assert.ok(url.includes(OFFICIAL_PHONE));
  assert.ok(url.includes('Flores'));
});

test('SCHEDULE_TIME_SLOTS spans 13:30 to 19:30 in 30-min intervals', () => {
  assert.equal(SCHEDULE_TIME_SLOTS[0], '13:30');
  assert.equal(SCHEDULE_TIME_SLOTS[SCHEDULE_TIME_SLOTS.length - 1], '19:30');
  assert.equal(SCHEDULE_TIME_SLOTS.length, 13);
});

test('getCalendarDays aligns weekday offset and month length accurately', () => {
  // November 2026 starts on Sunday (day 0) and has 30 days
  const nov2026 = getCalendarDays(2026, 10);
  assert.equal(nov2026.length, 30);
  assert.deepEqual(nov2026[0], { iso: '2026-11-01', day: 1 });
  assert.deepEqual(nov2026[29], { iso: '2026-11-30', day: 30 });

  // December 2026 starts on Tuesday (day 2) and has 31 days
  const dec2026 = getCalendarDays(2026, 11);
  assert.equal(dec2026[0], null);
  assert.equal(dec2026[1], null);
  assert.deepEqual(dec2026[2], { iso: '2026-12-01', day: 1 });
  assert.equal(dec2026.length, 33);
});

test('formatScheduleDatePtBr and generateScheduleWhatsAppLink include date, time, and availability note', () => {
  assert.equal(formatScheduleDatePtBr('2026-11-15'), '15/11/2026 (domingo)');
  const url = generateScheduleWhatsAppLink('2026-11-15', '15:30');
  const decoded = decodeURIComponent(url);
  assert.ok(url.includes(OFFICIAL_PHONE));
  assert.ok(decoded.includes('15/11/2026'));
  assert.ok(decoded.includes('15:30'));
  assert.ok(decoded.includes('pode ou não estar disponível'));
});

test('searchFaq filters questions accurately', () => {
  const queryPrice = searchFaq('custa');
  assert.ok(queryPrice.length >= 2, 'Should find questions about tattoo and piercing price');

  const queryMenor = searchFaq('menor');
  assert.equal(queryMenor.length, 1);
  assert.ok(queryMenor[0].answer.includes('16 anos'));

  const emptySearch = searchFaq('');
  assert.ok(emptySearch.length >= 6, 'Empty search should return all FAQs');
});
