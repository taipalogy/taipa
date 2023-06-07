import { characters } from '../src/unit';
import { lowerLettersTonal } from '../src/tonal/tonalres';
import { basicSyllables } from '../src/tonal/syllablelists';

describe('Basic testing', () => {
  test('check the number of characters', () => {
    expect(characters.size).toEqual(26);
  });

  test('check the number of letters', () => {
    expect(lowerLettersTonal.size).toEqual(44);
  });

  test('check the number of syllables', () => {
    expect(basicSyllables.length).toEqual(2209);
  });
});
