import {
  tonalPositionalSounds,
  lowerLettersTonal,
  TonalSoundTags,
  TonalLetterTags,
} from './version2';
import { TonalUncombiningMorpheme } from './morpheme';
import { hiraganaKatakana, KanaLetterTags } from '../kana/kana';

export function checkNumberOfLetterTonal() {
  if (tonalPositionalSounds.size !== lowerLettersTonal.size) {
    console.log('sizes unmatched');
  }
}

function lookup(morphemes: TonalUncombiningMorpheme[]) {
  const ret = morphemes.map(it => {
    if (it.sounds[0].name === TonalSoundTags.initial) {
      if (it.sounds[1].name === TonalSoundTags.medial) {
        if (
          hiraganaKatakana.has(
            it.sounds[0].toString() + it.sounds[1].toString()
          )
        ) {
          const results = hiraganaKatakana.get(
            it.sounds[0].toString() + it.sounds[1].toString()
          );
          const uni = '\u0323';
          if (results) {
            if (voicedInitials.includes(it.sounds[0].toString())) {
              return results[1];
            }
            return results[1] + uni;
          }
        } else {
          const results = mappingKana.get(
            it.sounds[0].toString() + it.sounds[1].toString()
          );
          if (results) {
            return results[1];
          }
        }
      }
    } else if (it.sounds[0].name === TonalSoundTags.medial) {
      // console.log(it.sounds[0].toString());
      if (hiraganaKatakana.has(it.sounds[0].toString())) {
        const results = hiraganaKatakana.get(it.sounds[0].toString());
        if (results) return results[1];
      }
    }
    return '';
  });
  return ret;
}

/** Get Taiwanese Kana blocks */
export function getTKanaBlocks(morphemes: TonalUncombiningMorpheme[]) {
  const kanaSequences: [string] = [''];
  kanaSequences[0] = lookup(morphemes)[0];
  return kanaSequences;
}

const voicedInitials = [TonalLetterTags.g.toString()];

const mappingKana = new Map().set(
  TonalLetterTags.q + KanaLetterTags.a,
  hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.a)
);
