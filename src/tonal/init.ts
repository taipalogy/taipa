import { tonalPositionalSounds, lowerLettersTonal } from './version2';
import { TonalUncombiningMorpheme } from '../unchange/morpheme';
import { composeTaiKana } from './taikana';

export function checkNumberOfLetterTonal() {
  if (tonalPositionalSounds.size !== lowerLettersTonal.size) {
    console.log('sizes unmatched');
  }
}

/** Get Taiwanese Kana blocks. */
export function getBlocks(morphemes: TonalUncombiningMorpheme[]) {
  const sequences: string[] = composeTaiKana(morphemes);
  return sequences;
}
