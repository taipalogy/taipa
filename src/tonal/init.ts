import { tonalPositionalSounds, lowerLettersTonal } from './tonalres';
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
