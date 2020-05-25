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
import { Sound } from '../unit';

export function checkNumberOfLetterTonal() {
  if (tonalPositionalSounds.size !== lowerLettersTonal.size) {
    console.log('sizes unmatched');
  }
}

const combiningDotBelow = '\u0323';
const combiningOverline = '\u0305';

function handleCombiningDotBelow(str: string, sound: string) {
  const got = kanaInitials(getMap(sound))(str);
  if (aspiratedInitials.includes(sound)) {
    return got[0] + combiningDotBelow;
  } else if (unaspiratedInitials.includes(sound)) {
    return got[0];
  } else if (otherInitials.includes(sound)) {
    return got[0];
  }
  return '';
}

function getMap(str: string) {
  if (str === KanaLetterTags.g) return mappingInitialG;
  if (str === KanaLetterTags.h) return mappingInitialH;
  return mappingInitialK;
}

function insertIAndReplaceEWithSmall(
  kanas: string,
  sounds: Sound[],
  i: number
) {
  if (sounds[i - 1].name === TonalSoundTags.medial) {
    if (sounds[0].toString() === TonalLetterTags.e) {
      // insert kana for i before kana for e
      const got = hiraganaKatakana.get(KanaLetterTags.i);
      if (got) {
        kanas = got[1] + kanas;
      }
    }
  }
  if (kanas.length > 1) {
    // replace the kana before the final with a smaller one
    const got = otherKanas.get(sounds[i - 1].toString());
    if (got) {
      const sliced = kanas.slice(0, kanas.length - 1);
      kanas = '';
      kanas = sliced + got[1];
    }
  }
  return kanas;
}

function reduplicateKana(
  kanas: string,
  sounds: Sound[],
  i: number,
  str: string
) {
  if (
    i == 0 &&
    sounds[0].name === TonalSoundTags.medial &&
    sounds.length == 1
  ) {
    // reduplicate the kana
    kanas = kanas + str;
  }
  return kanas;
}

function replacwWithSmall(kanas: string, sounds: Sound[], i: number) {
  const sliced = kanas.slice(0, i - 1);
  if (sounds[i - 1].toString() === TonalLetterTags.or) {
    // an extra vowel is already been appended to the initial kana
    // when there is an initial and followed by a vowel, an or kana should be replaced with a small form
    const mapped = mappingMedialSmallForm.get(sounds[i - 1].toString());
    if (mapped) {
      kanas = sliced + mapped[1] + combiningOverline;
    }
  } else {
    // replace the middle medial with a small form.
    const got = otherKanas.get(sounds[i - 1].toString());
    if (got) {
      kanas = sliced + got[1];
    }
  }
  return kanas;
}

function lookup(morphemes: TonalUncombiningMorpheme[]) {
  let seqs: string[] = [];
  let kanas = '';
  for (const mr of morphemes) {
    for (let i = 0; i < mr.sounds.length; i++) {
      if (mr.sounds[i].name === TonalSoundTags.initial) {
        const initials = kanaInitials(getMap(mr.sounds[i].toString()))();
        initials.map(it => seqs.push(it));
      } else if (mr.sounds[i].name === TonalSoundTags.medial) {
        if (mr.sounds[0].name === TonalSoundTags.initial) {
          // remove all of the initials previously populated with kanaInitials
          seqs = [];
          if (
            mr.sounds[i].toString() === TonalLetterTags.or ||
            mr.sounds[i].toString() === TonalLetterTags.ir
          ) {
            const mapped = mappingMedial.get(mr.sounds[i].toString());
            if (mapped) {
              kanas +=
                handleCombiningDotBelow(
                  mr.sounds[i].toString(),
                  mr.sounds[0].toString()
                ) +
                mapped[1] +
                combiningOverline;
            }
          } else if (mr.sounds[i].toString() === TonalLetterTags.ur) {
            const mapped = mappingMedial.get(mr.sounds[i].toString());
            if (mapped && mr.sounds[i - 1].name == TonalSoundTags.initial) {
              // if the preceding letter is an initial
              kanas +=
                handleCombiningDotBelow(
                  mr.sounds[i].toString(),
                  mr.sounds[0].toString()
                ) + mapped[1];
            } else if (mapped) {
              // if the preceding letter is not an initial
              const mapped = mappingMedial.get(mr.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1];
              }
            }
          } else {
            if (i > 1) {
              const tuple = hiraganaKatakana.get(mr.sounds[i].toString());
              if (tuple) {
                if (
                  i > 2 &&
                  mr.sounds[i - 1].name === TonalSoundTags.medial &&
                  mr.sounds[i - 2].name === TonalSoundTags.medial
                ) {
                  kanas = replacwWithSmall(kanas, mr.sounds, i);
                } else if (
                  i > 1 &&
                  mr.sounds[i].name === TonalSoundTags.medial &&
                  mr.sounds[i - 1].name === TonalSoundTags.medial &&
                  mr.sounds[i - 2].name === TonalSoundTags.initial &&
                  mr.sounds[i - 1].toString() === TonalLetterTags.or
                ) {
                  kanas = replacwWithSmall(kanas, mr.sounds, i);
                }

                kanas = kanas + tuple[1];
              }
            } else {
              if (
                mr.sounds[i].toString() === TonalLetterTags.e &&
                mr.sounds.filter(
                  it =>
                    it.name === TonalSoundTags.nasalFinal ||
                    it.name === TonalSoundTags.stopFinal
                ).length > 0
              ) {
                // if there is a final, e should be replaced with i for retrieving initial kana
                kanas += handleCombiningDotBelow(
                  TonalLetterTags.i,
                  mr.sounds[0].toString()
                );
                if (mr.sounds[i].toString() === TonalLetterTags.e) {
                  // for letter e, an extra kana small e is appended to the preceding -i
                  const got = otherKanas.get(mr.sounds[i].toString());
                  if (got) {
                    kanas += got[1];
                  }
                }
              } else {
                kanas += handleCombiningDotBelow(
                  mr.sounds[i].toString(),
                  mr.sounds[0].toString()
                );
              }

              if (mr.sounds.length == 2) {
                const got = hiraganaKatakana.get(mr.sounds[i].toString());
                if (got) {
                  // get the same kana character and append it
                  kanas += got[1];
                }
              }
            }
          }
        } else {
          if (
            i > 1 &&
            mr.sounds[i].name === TonalSoundTags.medial &&
            mr.sounds[i - 1].name === TonalSoundTags.medial &&
            mr.sounds[i - 2].name === TonalSoundTags.medial
          ) {
            // replace the middle medial with a small kana
            kanas = replacwWithSmall(kanas, mr.sounds, i);
          }

          let tuple;
          if (
            mr.sounds[i].toString() === TonalLetterTags.o &&
            i == 0 &&
            mr.sounds.length > 1 &&
            mr.sounds[i + 1].name === TonalSoundTags.medial
          ) {
            // map o to wo
            tuple = hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o);
          } else {
            // map o to o
            tuple = hiraganaKatakana.get(mr.sounds[i].toString());
          }
          if (tuple) {
            kanas = kanas + tuple[1];

            kanas = reduplicateKana(kanas, mr.sounds, i, tuple[1]);
          } else {
            if (
              mr.sounds[i].toString() === TonalLetterTags.or ||
              mr.sounds[i].toString() === TonalLetterTags.ir
            ) {
              const mapped = mappingMedial.get(mr.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1] + combiningOverline;
                kanas = reduplicateKana(
                  kanas,
                  mr.sounds,
                  i,
                  mapped[1] + combiningOverline
                );
              }
            } else if (
              mr.sounds[i].toString() === TonalLetterTags.ur ||
              mr.sounds[i].toString() === TonalLetterTags.er
            ) {
              const mapped = mappingMedial.get(mr.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1];
                kanas = reduplicateKana(kanas, mr.sounds, i, mapped[1]);
              }
            }
          }
        }
      } else if (mr.sounds[i].name === TonalSoundTags.nasalization) {
        if (mr.sounds[0].name === TonalSoundTags.initial) {
          const sliced = kanas.slice(1);
          kanas =
            mappingNasalization.get(
              mr.sounds[0].toString() + mr.sounds[1].toString()
            ) + sliced;
        } else {
          const sliced = kanas.slice(1);
          // kanas = '';
          kanas = mappingNasalization.get(mr.sounds[0].toString()) + sliced;
        }
      } else if (
        mr.sounds[i].name === TonalSoundTags.freeTonal ||
        mr.sounds[i].name === TonalSoundTags.checkedTonal
      ) {
        kanas += mappingToneLetter.get(mr.sounds[i].toString());
      } else if (mr.sounds[i].name === TonalSoundTags.stopFinal) {
        kanas = insertIAndReplaceEWithSmall(kanas, mr.sounds, i);
        const mappedFinal = mappingStopFinal.get(mr.sounds[i].toString());
        if (mappedFinal && mappedFinal[1]) {
          // stop finals p, t, k
          kanas += mappedFinal[1];
          if (
            mr.sounds[mr.sounds.length - 1].name != TonalSoundTags.checkedTonal
          ) {
            const mapped = mappingToneLetter.get(mr.sounds[i].toString());
            if (mapped) {
              kanas += mapped[0];
            }
          }
        } else {
          // stop final h
          const sliced = kanas.slice(0, kanas.length - 1);
          const medials = mr.sounds.filter(
            it => it.name === TonalSoundTags.medial
          );
          const mapped = mappingMedialSmallForm.get(
            medials[medials.length - 1].toString()
          );
          if (mapped) {
            kanas = sliced + mapped[1];
          }
        }
      } else if (mr.sounds[i].name === TonalSoundTags.nasalFinal) {
        if (i == 1 && mr.sounds[0].name === TonalSoundTags.initial) {
          // remove all of the initials previously populated with kanaInitials
          seqs = [];
          const got = kanaInitials(getMap(mr.sounds[i].toString()))(
            TonalLetterTags.ng
          );
          kanas += got[0];
        }
        kanas = insertIAndReplaceEWithSmall(kanas, mr.sounds, i);
        const got = mappingNasalFinal.get(mr.sounds[i].toString());
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
const otherInitials = [TonalLetterTags.h.toString()];

const mappingMedial = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.ir, hiraganaKatakana.get(KanaLetterTags.u))
  .set(TonalLetterTags.or, hiraganaKatakana.get(KanaLetterTags.o))
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o)
  )
  .set(TonalLetterTags.er, hiraganaKatakana.get(KanaLetterTags.e));

const mappingMedialSmallForm = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.a, otherKanas.get(KanaLetterTags.a))
  .set(TonalLetterTags.or, otherKanas.get(KanaLetterTags.o))
  .set(TonalLetterTags.ur, otherKanas.get(KanaLetterTags.w + KanaLetterTags.o));

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

const mappingToneLetter = new Map()
  .set(TonalLetterTags.f, '⍭') // apl functional symbol stile tilde (U+236D)
  .set(TonalLetterTags.y, '⎛') // left parenthesis upper hook (U+239B)
  .set(TonalLetterTags.w, '⎝') // left parenthesis lower hook (U+239D)
  .set(TonalLetterTags.x, '⟨') // mathematical left angle bracket (U+27E8)
  .set(TonalLetterTags.zx, '⟩') // mathematical left angle bracket (U+27E8)
  .set(TonalLetterTags.z, '⎸') // left vertical box line (U+23B8)
  .set(TonalLetterTags.xx, '⫽') // double solidus operator (U+2AFD)
  .set(TonalLetterTags.kk, '﹅');

const mappingInitialH = new Map<string, string[] | undefined>().set(
  TonalLetterTags.i,
  hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.i)
);

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
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
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
  .set(TonalLetterTags.k, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(TonalLetterTags.pp, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(TonalLetterTags.tt, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(TonalLetterTags.kk, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u));

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

const mappingNasalization = new Map<string, string>()
  .set(TonalLetterTags.a, '㋐')
  .set(TonalLetterTags.i, '㋑')
  .set(TonalLetterTags.u, '㋒')
  .set(TonalLetterTags.e, '㋓')
  .set(TonalLetterTags.o, '㋔')
  .set(TonalLetterTags.h + TonalLetterTags.i, '㋪');
