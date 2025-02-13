import { Letters } from '../unit';

export enum HangulLetterTags {
}

export class LettersOfHangul extends Letters {}

export const lowerLettersHangul = new LettersOfHangul([
]);

export enum HangulSpellingTags {
  initialConsonant = 'initialConsonant',
  vowel = 'vowel',
  finalConsonant = 'finalConsonant',
}
