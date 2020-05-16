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

function getMap(str: string) {
  if (str === KanaLetterTags.g) return mappingInitialG;
  return mappingInitialK;
}

function lookupNew(morphemes: TonalUncombiningMorpheme[]) {
  const kanas: string[] = [];
  for (const mr of morphemes) {
    for (const s of mr.sounds) {
      if (s.name === TonalSoundTags.initial) {
        const initials = kanaInitials(getMap(s.toString()))();
      } else if (s.name === TonalSoundTags.medial) {
        if (mr.sounds[0].name === TonalSoundTags.initial) {
          const buffer = kanaInitials(getMap(mr.sounds[0].toString()))(
            s.toString()
          );
          if (aspiratedInitials.includes(mr.sounds[0].toString())) {
            kanas.push(buffer[0] + combiningDotBelow);
          } else if (unaspiratedInitials.includes(mr.sounds[0].toString())) {
            kanas.push(buffer[0]);
          }
          if (
            s.toString() === TonalLetterTags.or ||
            s.toString() === TonalLetterTags.ir
          ) {
            kanas.push(
              mappingTaiKanaToKana.get(s.toString())[1] + combiningDoubleMacron
            );
          } else if (s.toString() === TonalLetterTags.ur) {
            kanas.push(mappingTaiKanaToKana.get(s.toString())[1]);
          }
        } else {
          const buffer = hiraganaKatakana.get(s.toString());
          if (buffer) {
            kanas.push(buffer[1]);
          } else {
            if (
              s.toString() === TonalLetterTags.or ||
              s.toString() === TonalLetterTags.ir
            ) {
              kanas.push(
                mappingTaiKanaToKana.get(s.toString())[1] +
                  combiningDoubleMacron
              );
            } else if (s.toString() === TonalLetterTags.ur) {
              kanas.push(mappingTaiKanaToKana.get(s.toString())[1]);
            }
          }
        }
      }
    }
  }
  return kanas;
}

/** Get Taiwanese Kana blocks. */
export function getTaiKanaBlocks(morphemes: TonalUncombiningMorpheme[]) {
  return [lookupNew(morphemes).join('')];
}

const aspiratedInitials = [TonalLetterTags.k.toString()];
const unaspiratedInitials = [
  TonalLetterTags.q.toString(),
  TonalLetterTags.g.toString(),
];

const mappingTaiKanaToKana = new Map()
  .set(TonalLetterTags.ir, hiraganaKatakana.get(KanaLetterTags.u))
  .set(TonalLetterTags.or, hiraganaKatakana.get(KanaLetterTags.o))
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o)
  );

const kanaInitials = function (map: Map<string, string[] | undefined>) {
  return function (following?: string) {
    if (following) {
      const kanas: string[] | undefined = map.get(following);
      if (kanas) {
        return [kanas[1]];
      }
    } else {
      const kanas = Array.from(map.values());
      const dupes = Array.from(kanas.map(it => (it ? it[1] : '')));
      const dedupes = dupes.reduce(function (
        accumulator: string[],
        curr: string
      ) {
        if (accumulator.filter(it => it === curr).length == 0) {
          accumulator.push(curr);
        }
        return accumulator;
      },
      []);
      return dedupes;
    }
    return [];
  };
};

const mappingInitialK = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  );

const mappingInitialG = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  );
