import {
  tonalPositionalSounds,
  lowerLettersTonal,
  TonalSoundTags,
  TonalLetterTags,
} from './version2';
import { TonalUncombiningMorpheme } from './morpheme';
import {
  hiraganaKatakana,
  KanaLetterTags,
  otherKanas,
  kogakimoji,
  hatsuon,
} from '../kana/kana';

export function checkNumberOfLetterTonal() {
  if (tonalPositionalSounds.size !== lowerLettersTonal.size) {
    console.log('sizes unmatched');
  }
}

const combiningDotBelow = '\u0323';
const combiningDoubleMacron = '\u035e';

function handleAspiration(str: string, sound: string) {
  const buffer = kanaInitials(getMap(sound))(str);
  if (aspiratedInitials.includes(sound)) {
    return buffer[0] + combiningDotBelow;
  } else if (unaspiratedInitials.includes(sound)) {
    return buffer[0];
  }
  return '';
}

function getMap(str: string) {
  if (str === KanaLetterTags.g) return mappingInitialG;
  return mappingInitialK;
}

function lookup(morphemes: TonalUncombiningMorpheme[]) {
  let seqs: string[] = [];
  let kanas = '';
  for (const mor of morphemes) {
    for (let i = 0; i < mor.sounds.length; i++) {
      if (mor.sounds[i].name === TonalSoundTags.initial) {
        const initials = kanaInitials(getMap(mor.sounds[i].toString()))();
        initials.map(it => seqs.push(it));
      } else if (mor.sounds[i].name === TonalSoundTags.medial) {
        if (mor.sounds[0].name === TonalSoundTags.initial) {
          // remove all of the initials previously populated with kanaInitials
          seqs = [];
          if (
            mor.sounds[i].toString() === TonalLetterTags.or ||
            mor.sounds[i].toString() === TonalLetterTags.ir
          ) {
            const mapped = mappingTaiKanaToKana.get(mor.sounds[i].toString());
            if (mapped) {
              kanas +=
                handleAspiration(
                  mor.sounds[i].toString(),
                  mor.sounds[0].toString()
                ) +
                mapped[1] +
                combiningDoubleMacron;
            }
          } else if (mor.sounds[i].toString() === TonalLetterTags.ur) {
            const mapped = mappingTaiKanaToKana.get(mor.sounds[i].toString());
            if (mapped) {
              kanas +=
                handleAspiration(
                  mor.sounds[i].toString(),
                  mor.sounds[0].toString()
                ) + mapped[1];
            }
          } else {
            if (i > 1) {
              const tuple = hiraganaKatakana.get(mor.sounds[i].toString());
              if (tuple) {
                kanas = kanas + tuple[1];
              }
            } else {
              kanas += handleAspiration(
                mor.sounds[i].toString(),
                mor.sounds[0].toString()
              );
            }
          }
        } else {
          const tuple = hiraganaKatakana.get(mor.sounds[i].toString());
          if (tuple) {
            kanas = kanas + tuple[1];
          } else {
            if (
              mor.sounds[i].toString() === TonalLetterTags.or ||
              mor.sounds[i].toString() === TonalLetterTags.ir
            ) {
              const mapped = mappingTaiKanaToKana.get(mor.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1] + combiningDoubleMacron;
              }
            } else if (mor.sounds[i].toString() === TonalLetterTags.ur) {
              const mapped = mappingTaiKanaToKana.get(mor.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1];
              }
            }
          }
        }
      } else if (mor.sounds[i].name === TonalSoundTags.nasalization) {
        const sliced = kanas.slice(1);
        kanas = '';
        kanas = mappingNasalization.get(mor.sounds[0].toString()) + sliced;
      } else if (
        mor.sounds[i].name === TonalSoundTags.freeTonal ||
        mor.sounds[i].name === TonalSoundTags.checkedTonal
      ) {
        kanas += mappingToneLetter.get(mor.sounds[i].toString());
      } else if (mor.sounds[i].name === TonalSoundTags.stopFinal) {
        const got = mappingStopFinal.get(mor.sounds[i].toString());
        if (got && got[1]) kanas += got[1];
      } else if (mor.sounds[i].name === TonalSoundTags.nasalFinal) {
        const got = mappingNasalFinal.get(mor.sounds[i].toString());
        if (got && got[1]) kanas += got[1];
      }
    }
  }
  seqs.push(kanas);
  return seqs;
}

/** Get Taiwanese Kana blocks. */
export function getTaiKanaBlocks(morphemes: TonalUncombiningMorpheme[]) {
  const kanaSequences: string[] = lookup(morphemes);
  return kanaSequences;
}

const aspiratedInitials = [TonalLetterTags.k.toString()];
const unaspiratedInitials = [
  TonalLetterTags.q.toString(),
  TonalLetterTags.g.toString(),
];

const mappingTaiKanaToKana = new Map<string, string[] | undefined>()
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

const mappingStopFinal = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.p, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(TonalLetterTags.t, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(TonalLetterTags.k, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u));

const mappingNasalFinal = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.n,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(TonalLetterTags.ng, hatsuon.get(KanaLetterTags.n));

const mappingNasalization = new Map()
  .set(TonalLetterTags.a, '㋐')
  .set(TonalLetterTags.i, '㋑')
  .set(TonalLetterTags.u, '㋒')
  .set(TonalLetterTags.e, '㋓')
  .set(TonalLetterTags.o, '㋔');

const mappingToneLetter = new Map()
  .set(TonalLetterTags.f, '⍭') // apl functional symbol stile tilde (U+236D)
  .set(TonalLetterTags.y, '⎛') // left parenthesis upper hook (U+239B)
  .set(TonalLetterTags.w, '⎝') // left parenthesis lower hook (U+239D)
  .set(TonalLetterTags.x, '⟨') // mathematical left angle bracket (U+27E8)
  .set(TonalLetterTags.zx, '⟩') // mathematical left angle bracket (U+27E8)
  .set(TonalLetterTags.z, '⎸') // left vertical box line (U+23B8)
  .set(TonalLetterTags.xx, '⫽'); // double solidus operator (U+2AFD)
