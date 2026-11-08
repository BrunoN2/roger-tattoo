import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateStyleWhatsAppLink,
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

test('searchFaq filters questions accurately', () => {
  const queryPrice = searchFaq('custa');
  assert.ok(queryPrice.length >= 2, 'Should find questions about tattoo and piercing price');

  const queryMenor = searchFaq('menor');
  assert.equal(queryMenor.length, 1);
  assert.ok(queryMenor[0].answer.includes('16 anos'));

  const emptySearch = searchFaq('');
  assert.ok(emptySearch.length >= 6, 'Empty search should return all FAQs');
});
