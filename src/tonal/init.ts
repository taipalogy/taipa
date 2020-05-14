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

const combiningDotBelow = '\u0323';
const combiningDoubleMacron = '\u035e';

function lookup(morphemes: TonalUncombiningMorpheme[]) {
  const ret = morphemes.map(it => {
    if (it.sounds[0].name === TonalSoundTags.initial) {
      if (it.sounds[1].name === TonalSoundTags.medial) {
        if (
          hiraganaKatakana.has(
            it.sounds[0].toString() + it.sounds[1].toString()
          )
        ) {
          const kanas = hiraganaKatakana.get(
            it.sounds[0].toString() + it.sounds[1].toString()
          );
          if (kanas) {
            if (voicedInitials.includes(it.sounds[0].toString())) {
              return kanas[1];
            }
            return kanas[1] + combiningDotBelow;
          }
        } else {
          const kanas = mappingKana.get(
            it.sounds[0].toString() + it.sounds[1].toString()
          );
          if (kanas) {
            return kanas[1];
          }
        }
      }
    } else if (it.sounds[0].name === TonalSoundTags.medial) {
      if (hiraganaKatakana.has(it.sounds[0].toString())) {
        const kanas = hiraganaKatakana.get(it.sounds[0].toString());
        if (kanas) return kanas[1];
      } else if (mappingKana.has(it.sounds[0].toString())) {
        const kanas = mappingKana.get(it.sounds[0].toString());
        if (kanas) return kanas[1] + combiningDoubleMacron;
      }
    }
    return '';
  });
  return ret;
}

/** Get Taiwanese Kana blocks. */
export function getTaiKanaBlocks(morphemes: TonalUncombiningMorpheme[]) {
  const kanaSequences: [string] = [''];
  kanaSequences[0] = lookup(morphemes)[0];
  return kanaSequences;
}

const voicedInitials = [TonalLetterTags.g.toString()];

const mappingKana = new Map()
  .set(
    TonalLetterTags.q + KanaLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.q + KanaLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.q + KanaLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.q + KanaLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.q + KanaLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(TonalLetterTags.ir, hiraganaKatakana.get(KanaLetterTags.u))
  .set(TonalLetterTags.or, hiraganaKatakana.get(KanaLetterTags.o))
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o)
  );
