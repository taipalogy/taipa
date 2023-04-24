import {
  TonalSpellingTags,
  ToneLetterTags,
  materLectionisTonal,
  neutralFinalConsonantsTonal,
} from './tonalres';
import {
  hiraganaKatakana,
  KanaLetterTags,
  otherKanas,
  kogakimoji,
  hatsuon,
  special,
} from '../kana/kanares';
import { Sound } from '../unit';
import { fourthFinalConsonants } from './collections';
import { TonalUncombiningMorpheme } from '../unchange/morpheme';
import { PseudoUnicodeEncodings } from './tonesets';

const combiningOverline = '\u0305';
const combiningDotBelow = '\u0323';

function handleCombiningDotBelowOverline(initial: string, medial: string) {
  const got = kanaInitials(mappingInitial.get(initial))(medial);
  if (got && got[0]) {
    if (initialsWithCombiningDotBelow.aspirated.includes(initial)) {
      if (freeSyllablesWithCombiningOverline.includes(initial + medial)) {
        return got[0] + combiningOverline + combiningDotBelow;
      }
      return got[0] + combiningDotBelow;
    } else if (
      initialsWithCombiningDotBelow.withoutADotOrOverline.includes(initial)
    ) {
      return got[0];
    } else if (initialsWithCombiningDotBelow.withAnOverline.includes(initial)) {
      if (freeSyllablesWithCombiningOverline.includes(initial + medial)) {
        return got[0] + combiningOverline;
      }
      return got[0];
    }
  }
  return '';
}

function getToneMarkForFourthEighth(final: string, tonalLen: number) {
  if (tonalLen == 0) {
    // 4th tone and 8th tone
    const kn = mappingLettersToPseudoEncoding.get(final.toString());
    if (kn) {
      return kn[0];
    }
  }
  return '';
}

function getReplicatedKanaVowel(sounds: Sound[], j: number, replica: string) {
  if (
    (j == 0 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      (sounds.length == 1 ||
        (sounds.length == 2 &&
          sounds[sounds.length - 1].name === TonalSpellingTags.freeTone) ||
        (sounds.length == 2 &&
          sounds[sounds.length - 1].name ===
            TonalSpellingTags.nasalization))) ||
    (sounds.length == 3 &&
      sounds[sounds.length - 2].name === TonalSpellingTags.nasalization &&
      sounds[sounds.length - 1].name === TonalSpellingTags.freeTone)
  ) {
    // reduplicate the vowel for syllables without an initial
    // in case of a, e,
    // in case ax, ex. enn,
    // in case of ennx
    return replica;
  } else if (
    (sounds.length == 2 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      (sounds[1].toString() === ToneLetterTags.h ||
        sounds[1].toString() === ToneLetterTags.hh)) ||
    (sounds.length == 3 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      (sounds[1].toString() === ToneLetterTags.h ||
        sounds[1].toString() === ToneLetterTags.hh) &&
      sounds[2].name === TonalSpellingTags.checkedTone) ||
    (sounds.length == 3 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      sounds[1].name === TonalSpellingTags.nasalization &&
      (sounds[2].toString() === ToneLetterTags.h ||
        sounds[2].toString() === ToneLetterTags.hh))
  ) {
    // reduplicate the vowel for syllables without an initial
    // in case of ah, ehh
    // in case of ahy
    // in case of ennh, innh
    return getSmallKanaVowel(sounds[0].toString());
  }

  return '';
}

function getSmallKanaVowel(medial: string) {
  const got = otherKanas.get(medial);
  if (got && got[1]) {
    // get the small form of the vowel and append it
    return got[1];
  }
  return '';
}

export function composeTaiKana(morphemes: TonalUncombiningMorpheme[]) {
  let kanaSeqs: string[] = [];
  let kanas: string[] = new Array(morphemes.length);
  let kanas4thToneWoArrow = '';

  for (let i = 0; i < morphemes.length; i++) {
    const initl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.initialConsonant
    );
    const mdls = morphemes[i].sounds.filter(
      (it) =>
        it.name === TonalSpellingTags.vowel ||
        it.name === TonalSpellingTags.materLectionis
    );
    const nslFnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.nasalFinalConsonant
    );
    const stpFnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.stopFinalConsonant
    );
    const frTnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.freeTone
    );
    const chkTnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.checkedTone
    );
    const nslz = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.nasalization
    );
    const finalsForEToKanaIE = stpFnl
      .filter(
        (it) =>
          it.name === TonalSpellingTags.stopFinalConsonant &&
          finalsForEKegekkeggeng.includes(it.toString())
      )
      .concat(
        nslFnl.filter(
          (it) =>
            it.name === TonalSpellingTags.nasalFinalConsonant &&
            finalsForEKegekkeggeng.includes(it.toString())
        )
      );

    // initialize for this morpheme
    kanas[i] = '';

    if (initl.length == 1) {
      if (mdls.length > 0) {
        for (let j = 0; j < mdls.length; j++) {
          if (voewlsIRor.includes(mdls[j].toString())) {
            kanas[i] +=
              handleCombiningDotBelowOverline(
                initl[0].toString(),
                mdls[j].toString()
              ) + getKanaIRor(mdls, stpFnl.length + nslFnl.length == 1);
          } else if (mdls[j].toString() === ToneLetterTags.ur) {
            if (j == 0) {
              // if the preceding letter is an initial
              const initialKana = handleCombiningDotBelowOverline(
                initl[0].toString(),
                mdls[j].toString()
              );
              kanas[i] += initialKana;
              if (stpFnl.length == 1) {
                const kn = mappingMedialSmallForm.get(mdls[j].toString());
                if (kn) kanas[i] += kn[1];
              } else {
                const kn = mappingMedial.get(mdls[j].toString());
                if (kn) kanas[i] += kn[1];
              }
            } else {
              if (stpFnl.length == 1) {
                const kn = mappingMedialSmallForm.get(mdls[j].toString());
                if (kn) kanas[i] += kn[1];
              } else {
                const gotVowels = mappingMedial.get(mdls[j].toString());
                if (gotVowels) kanas[i] += gotVowels[1];
              }
            }
          } else {
            if (
              mdls[j].toString() === ToneLetterTags.e &&
              nslFnl.length + stpFnl.length > 0 &&
              nslz.length == 0 &&
              finalsForEToKanaIE.length == 1
            ) {
              // if there is a final, letter i should be used to retrieve an initial kana
              // in the case of ~eng or -ek
              if (mdls.length == 1) {
                kanas[i] += handleCombiningDotBelowOverline(
                  initl[0].toString(),
                  ToneLetterTags.i
                );
              } else if (
                mdls.length == 2 &&
                mdls[0].toString() === ToneLetterTags.i
              ) {
                // in case of -ieng
                // kanas[i] += getSmallKanaVowel(KanaLetterTags.i);
              }
              if (mdls[j].toString() === ToneLetterTags.e) {
                // for letter e, an small kana e is appended to the preceding i-ending initial
                kanas[i] += getSmallKanaVowel(mdls[j].toString());
              }
            } else {
              if (j > 0) {
                if (stpFnl.length == 1) {
                  // more that one vowels. e.g. goehh
                  kanas[i] += getSmallKanaVowel(mdls[j].toString());
                } else {
                  if (j == 1 && mdls.length == 3) {
                    kanas[i] += getSmallKanaVowel(mdls[j].toString());
                  } else if (j == 1 && mdls.length == 2 && nslFnl.length == 1) {
                    kanas[i] += getSmallKanaVowel(mdls[j].toString());
                  } else {
                    const kn = hiraganaKatakana.get(mdls[j].toString());
                    if (kn && kn[1]) kanas[i] += kn[1];
                  }
                }
              } else {
                // the first vowel. e.g. gehh, goehh
                kanas[i] += handleCombiningDotBelowOverline(
                  initl[0].toString(),
                  mdls[j].toString()
                );

                if (
                  nslFnl.length == 0 &&
                  mdls.length == 1 &&
                  stpFnl.length == 0
                ) {
                  // open syllables with an initial
                  const kn = hiraganaKatakana.get(mdls[j].toString());
                  if (kn && kn[1]) {
                    // replicate the vowel and append it
                    kanas[i] += kn[1];
                  }
                } else if (
                  nslFnl.length == 0 &&
                  mdls.length == 1 &&
                  stpFnl.length == 1 &&
                  neutralFinalConsonantsTonal.includes(stpFnl[0].toString())
                ) {
                  kanas[i] += getSmallKanaVowel(mdls[j].toString());
                }
              }
            }
          }
        }
      } else {
        // there is no medials
      }
    }

    if (initl.length == 0) {
      if (mdls.length > 0) {
        for (let j = 0; j < mdls.length; j++) {
          let got;
          if (
            j == 0 &&
            mdls[j].toString() === ToneLetterTags.o &&
            mdls.length > 1
          ) {
            // map o to wo
            got = hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o);
          } else {
            // map o to o
            got = hiraganaKatakana.get(mdls[j].toString());
          }

          if (got) {
            if (j == 1 && mdls.length == 3) {
              // get small kana for 2nd medial
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (j == 1 && mdls.length == 2 && stpFnl.length == 1) {
              // get small kana for 2nd vowel
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (j == 1 && mdls.length == 2 && nslFnl.length == 1) {
              // get small kana for 2nd vowel
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (j == 2 && mdls.length == 3 && stpFnl.length == 1) {
              // get small kana for 3rd vowel
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (
              j == 0 &&
              mdls[j].toString() === ToneLetterTags.e &&
              nslFnl.length + stpFnl.length > 0 &&
              nslz.length == 0 &&
              finalsForEToKanaIE.length == 1
            ) {
              // if there is a final, letter i should be used to retrieve an extra medial kana
              // in the case of ~eng or -ek
              const kn = hiraganaKatakana.get(ToneLetterTags.i);
              if (kn) kanas[i] += kn[1];
              if (mdls[j].toString() === ToneLetterTags.e) {
                // for letter e, a small kana e is appended to the preceding i-
                kanas[i] += getSmallKanaVowel(mdls[j].toString());
              }
            } else {
              kanas[i] += got[1];
              kanas[i] += getReplicatedKanaVowel(
                morphemes[i].sounds,
                j,
                got[1]
              );
            }
          } else {
            if (
              mdls[j].toString() === ToneLetterTags.or ||
              mdls[j].toString() === ToneLetterTags.ir
            ) {
              const kn = mappingMedial.get(mdls[j].toString());
              if (kn) {
                kanas[i] += kn[1] + combiningOverline;
                if (
                  stpFnl.length == 1 &&
                  neutralFinalConsonantsTonal.includes(stpFnl[0].toString())
                ) {
                  // in case of orh, use kanaIRor to get one extra small kana
                  kanas[i] += getKanaIRor(
                    mdls,
                    stpFnl.length + nslFnl.length == 1
                  );
                } else {
                  // there replicated kana other than ir, or
                  kanas[i] += getReplicatedKanaVowel(
                    morphemes[i].sounds,
                    i,
                    kn[1] + combiningOverline
                  );
                }
              }
            } else if (
              mdls[j].toString() === ToneLetterTags.ur ||
              mdls[j].toString() === ToneLetterTags.er
            ) {
              // if the preceding letter is not an initial
              const kn = mappingMedial.get(mdls[j].toString());
              // in case of ur, iur. bypass urh, urhy, iurh, iurhy
              if (kn && stpFnl.length == 0) kanas[i] += kn[1];

              if (stpFnl.length == 1) {
                // in case of urh, urhy
                if (kn && mdls.length == 1) kanas[i] += kn[1];
                const sml = mappingMedialSmallForm.get(mdls[j].toString());
                if (sml) kanas[i] += sml[1];
              } else {
                if (mdls.length == 1) {
                  if (kn)
                    kanas[i] += getReplicatedKanaVowel(
                      morphemes[i].sounds,
                      j,
                      kn[1]
                    );
                }
              }
            } else if (materLectionisTonal.includes(mdls[j].toString())) {
              // mater lectionis: m, n, ng.
              const kn = mappingMedial.get(mdls[j].toString());
              if (kn) {
                kanas[i] += kn[1];
              }
            }
          }
        }
      }
    }

    if (nslz.length == 1) {
      const tail = kanas[i].slice(1, kanas[i].length);
      if (initl.length == 1) {
        const kn = mappingNasalization.get(
          initl[0].toString() + mdls[0].toString()
        );
        if (kn) kanas[i] = kn + tail;
      } else {
        const kn = mappingNasalization.get(mdls[0].toString());
        if (kn) kanas[i] = kn + tail;
      }
    }

    if (nslFnl.length == 1) {
      // syllable finals
      if (initl.length == 1 && mdls.length == 0) {
        // there is no medials
        const kn = kanaInitials(mappingInitial.get(initl[0].toString()))(
          nslFnl[0].toString()
        );
        if (kn && kn[0]) {
          kanas[i] += handleCombiningDotBelowOverline(
            initl[0].toString(),
            nslFnl[0].toString()
          );
        }
      }

      let kn;
      if (stpFnl.length > 0)
        kn = mappingSmallNasalFinal.get(nslFnl[0].toString());
      else kn = mappingNasalFinal.get(nslFnl[0].toString());
      if (kn && kn[1]) kanas[i] += kn[1];
    }

    if (stpFnl.length == 1) {
      // syllable finals
      const kn = mappingStopFinal.get(stpFnl[0].toString());
      if (kn && kn[1]) {
        // stop finals p, t, k, pp, tt, kk
        kanas[i] += kn[1];
      }
      if (Object.values(fourthFinalConsonants).includes(stpFnl[0].toString())) {
        kanas4thToneWoArrow = kanas[i];
      }
      kanas[i] += getToneMarkForFourthEighth(
        stpFnl[0].toString(),
        chkTnl.length
      );
    }

    if (frTnl.length == 1) {
      kanas[i] += mappingLettersToPseudoEncoding.get(frTnl[0].toString());
    }

    if (chkTnl.length == 1) {
      kanas[i] += mappingLettersToPseudoEncoding.get(chkTnl[0].toString());
    }
  }

  kanaSeqs.push(kanas.join(''));
  if (kanas4thToneWoArrow.length > 0 && morphemes.length == 1) {
    kanaSeqs.push(kanas4thToneWoArrow);
  }
  return kanaSeqs;
}

const kanaInitials = function (map?: Map<string, string[] | undefined>) {
  return function (following?: string) {
    if (following) {
      if (map && map.has(following)) {
        const got: string[] | undefined = map.get(following);
        if (got && got[1]) {
          return [got[1]];
        }
      }
    } else {
      if (map) {
        /*
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
        */
      }
    }
    return [];
  };
};

const getKanaIRor = function (vowels: Sound[], hasOneFinal: boolean) {
  if (vowels.length == 1) {
    const kn = mappingMedial.get(vowels[0].toString());
    if (kn) {
      if (hasOneFinal) {
        const sml = mappingMedialSmallForm.get(vowels[0].toString());
        if (sml) {
          return sml[1] + combiningOverline;
        }
      }
      return kn[1] + combiningOverline;
    }
  } else if (vowels.length == 2) {
    // return small form
    const kn = mappingMedialSmallForm.get(vowels[0].toString());
    if (kn) {
      return kn[1] + combiningOverline;
    }
  }
  return '';
};

const freeSyllablesWithCombiningOverline = [
  ToneLetterTags.ch.toString() + ToneLetterTags.a.toString(),
  ToneLetterTags.c.toString() + ToneLetterTags.a.toString(),
  ToneLetterTags.ch.toString() + ToneLetterTags.e.toString(),
  ToneLetterTags.c.toString() + ToneLetterTags.e.toString(),
  ToneLetterTags.ch.toString() + ToneLetterTags.o.toString(),
  ToneLetterTags.ch.toString() + ToneLetterTags.or.toString(),
  ToneLetterTags.ch.toString() + ToneLetterTags.ur.toString(),
  ToneLetterTags.c.toString() + ToneLetterTags.o.toString(),
  ToneLetterTags.t.toString() + ToneLetterTags.i.toString(),
  ToneLetterTags.th.toString() + ToneLetterTags.i.toString(),
  ToneLetterTags.t.toString() + ToneLetterTags.u.toString(),
  ToneLetterTags.th.toString() + ToneLetterTags.u.toString(),
  ToneLetterTags.t.toString() + ToneLetterTags.ng.toString(),
  ToneLetterTags.th.toString() + ToneLetterTags.ng.toString(),
  ToneLetterTags.t.toString() + ToneLetterTags.ir.toString(),
  ToneLetterTags.th.toString() + ToneLetterTags.ir.toString(),
];

const initialsWithCombiningDotBelow = {
  // whether the dot should be combined
  aspirated: [
    // with a dot
    ToneLetterTags.kh.toString(),
    ToneLetterTags.c.toString(),
    ToneLetterTags.ph.toString(),
    ToneLetterTags.th.toString(),
  ],
  withoutADotOrOverline: [
    ToneLetterTags.k.toString(),
    ToneLetterTags.g.toString(),
    ToneLetterTags.b.toString(),
    ToneLetterTags.p.toString(),
    ToneLetterTags.j.toString(),
    ToneLetterTags.l.toString(),
    ToneLetterTags.h.toString(),
    ToneLetterTags.s.toString(),
    ToneLetterTags.m.toString(),
    ToneLetterTags.n.toString(),
    ToneLetterTags.ng.toString(),
  ],
  withAnOverline: [
    ToneLetterTags.ch.toString(),
    ToneLetterTags.c.toString(),
    ToneLetterTags.t.toString(),
  ],
};

// includes mater lectionis
const mappingMedial = new Map<string, string[] | undefined>()
  .set(ToneLetterTags.ir, hiraganaKatakana.get(KanaLetterTags.u))
  .set(ToneLetterTags.or, hiraganaKatakana.get(KanaLetterTags.o))
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o)
  )
  .set(ToneLetterTags.er, hiraganaKatakana.get(KanaLetterTags.e))
  .set(
    ToneLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.n,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(ToneLetterTags.ng, hatsuon.get(KanaLetterTags.n));

const voewlsIRor = [ToneLetterTags.ir.toString(), ToneLetterTags.or.toString()];

const mappingMedialSmallForm = new Map<string, string[] | undefined>()
  .set(ToneLetterTags.a, otherKanas.get(KanaLetterTags.a))
  .set(ToneLetterTags.i, otherKanas.get(KanaLetterTags.i))
  .set(ToneLetterTags.e, otherKanas.get(KanaLetterTags.e))
  .set(ToneLetterTags.or, otherKanas.get(KanaLetterTags.o))
  .set(ToneLetterTags.ur, otherKanas.get(KanaLetterTags.w + KanaLetterTags.o))
  .set(ToneLetterTags.ir, otherKanas.get(KanaLetterTags.u))
  .set(ToneLetterTags.m, otherKanas.get(KanaLetterTags.m + KanaLetterTags.u))
  .set(ToneLetterTags.n, otherKanas.get(KanaLetterTags.n + KanaLetterTags.u))
  .set(ToneLetterTags.ng, otherKanas.get(KanaLetterTags.n));

const mappingLettersToPseudoEncoding = new Map()
  .set(ToneLetterTags.f, PseudoUnicodeEncodings.first)
  .set(ToneLetterTags.y, PseudoUnicodeEncodings.second)
  .set(ToneLetterTags.w, PseudoUnicodeEncodings.third)
  .set(ToneLetterTags.x, PseudoUnicodeEncodings.fifth)
  .set(ToneLetterTags.zx, PseudoUnicodeEncodings.sixth)
  .set(ToneLetterTags.z, PseudoUnicodeEncodings.seventh)
  .set(ToneLetterTags.xx, PseudoUnicodeEncodings.ninth)
  .set(ToneLetterTags.p, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.t, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.k, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.h, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.b, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.g, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.j, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.l, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.s, PseudoUnicodeEncodings.fourth)
  .set(ToneLetterTags.pp, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.tt, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.kk, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.hh, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.bb, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.gg, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.jj, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.ll, PseudoUnicodeEncodings.eighth)
  .set(ToneLetterTags.ss, PseudoUnicodeEncodings.eighth);

const mappingStopFinal = new Map<string, string[] | undefined>()
  .set(ToneLetterTags.p, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(ToneLetterTags.t, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(ToneLetterTags.k, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(ToneLetterTags.b, otherKanas.get(KanaLetterTags.b + KanaLetterTags.u))
  .set(ToneLetterTags.g, otherKanas.get(KanaLetterTags.g + KanaLetterTags.u))
  .set(ToneLetterTags.j, otherKanas.get(KanaLetterTags.j + KanaLetterTags.u))
  .set(ToneLetterTags.l, otherKanas.get(KanaLetterTags.r + KanaLetterTags.u))
  .set(ToneLetterTags.s, otherKanas.get(KanaLetterTags.s + KanaLetterTags.u))
  .set(ToneLetterTags.pp, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(ToneLetterTags.tt, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(ToneLetterTags.kk, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(ToneLetterTags.bb, otherKanas.get(KanaLetterTags.b + KanaLetterTags.u))
  .set(ToneLetterTags.gg, otherKanas.get(KanaLetterTags.g + KanaLetterTags.u))
  .set(ToneLetterTags.jj, otherKanas.get(KanaLetterTags.j + KanaLetterTags.u))
  .set(ToneLetterTags.ll, otherKanas.get(KanaLetterTags.r + KanaLetterTags.u))
  .set(ToneLetterTags.ss, otherKanas.get(KanaLetterTags.s + KanaLetterTags.u));

const mappingNasalization = new Map<string, string>()
  .set(ToneLetterTags.a, '㋐')
  .set(ToneLetterTags.i, '㋑')
  .set(ToneLetterTags.ir, '㋒')
  .set(ToneLetterTags.u, '㋒')
  .set(ToneLetterTags.e, '㋓')
  .set(ToneLetterTags.o, '㋔')
  .set(ToneLetterTags.kh + ToneLetterTags.a, '㋕')
  .set(ToneLetterTags.kh + ToneLetterTags.i, '㋖')
  .set(ToneLetterTags.kh + ToneLetterTags.u, '㋗')
  .set(ToneLetterTags.kh + ToneLetterTags.e, '㋘')
  .set(ToneLetterTags.kh + ToneLetterTags.o, '㋙')
  .set(ToneLetterTags.s + ToneLetterTags.a, '㋚')
  .set(ToneLetterTags.s + ToneLetterTags.i, '㋛')
  .set(ToneLetterTags.s + ToneLetterTags.u, '㋜')
  .set(ToneLetterTags.s + ToneLetterTags.e, '㋝')
  .set(ToneLetterTags.s + ToneLetterTags.o, '㋞')
  .set(ToneLetterTags.c + ToneLetterTags.a, '㋚')
  .set(ToneLetterTags.c + ToneLetterTags.i, '㋠')
  .set(ToneLetterTags.c + ToneLetterTags.ir, '㋡')
  .set(ToneLetterTags.c + ToneLetterTags.u, '㋡')
  .set(ToneLetterTags.c + ToneLetterTags.e, '㋝')
  .set(ToneLetterTags.c + ToneLetterTags.o, '㋞')
  .set(ToneLetterTags.ch + ToneLetterTags.a, '㋚')
  .set(ToneLetterTags.ch + ToneLetterTags.i, '㋠')
  .set(ToneLetterTags.ch + ToneLetterTags.ir, '㋡')
  .set(ToneLetterTags.ch + ToneLetterTags.u, '㋡')
  .set(ToneLetterTags.ch + ToneLetterTags.e, '㋝')
  .set(ToneLetterTags.ch + ToneLetterTags.o, '㋞')
  .set(ToneLetterTags.t + ToneLetterTags.a, '㋟')
  .set(ToneLetterTags.t + ToneLetterTags.i, '㋠')
  .set(ToneLetterTags.t + ToneLetterTags.u, '㋡')
  .set(ToneLetterTags.t + ToneLetterTags.e, '㋢')
  .set(ToneLetterTags.t + ToneLetterTags.o, '㋣')
  .set(ToneLetterTags.j + ToneLetterTags.i, '㋛' + '\u{3099}') // ㋛゙
  .set(ToneLetterTags.ph + ToneLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(ToneLetterTags.ph + ToneLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(ToneLetterTags.ph + ToneLetterTags.u, '㋫' + '\u{309a}') // ㋫゚
  .set(ToneLetterTags.ph + ToneLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(ToneLetterTags.ph + ToneLetterTags.o, '㋭' + '\u{309a}') // ㋭゚
  .set(ToneLetterTags.k + ToneLetterTags.a, '㋕')
  .set(ToneLetterTags.k + ToneLetterTags.i, '㋖')
  .set(ToneLetterTags.k + ToneLetterTags.ir, '㋗')
  .set(ToneLetterTags.k + ToneLetterTags.u, '㋗')
  .set(ToneLetterTags.k + ToneLetterTags.e, '㋘')
  .set(ToneLetterTags.k + ToneLetterTags.o, '㋙')
  .set(ToneLetterTags.h + ToneLetterTags.a, '㋩')
  .set(ToneLetterTags.h + ToneLetterTags.i, '㋪')
  .set(ToneLetterTags.h + ToneLetterTags.ir, '㋫')
  .set(ToneLetterTags.h + ToneLetterTags.u, '㋫')
  .set(ToneLetterTags.h + ToneLetterTags.e, '㋬')
  .set(ToneLetterTags.h + ToneLetterTags.o, '㋭')
  .set(ToneLetterTags.th + ToneLetterTags.a, '㋟')
  .set(ToneLetterTags.th + ToneLetterTags.i, '㋠')
  .set(ToneLetterTags.th + ToneLetterTags.u, '㋡')
  .set(ToneLetterTags.th + ToneLetterTags.e, '㋢')
  .set(ToneLetterTags.th + ToneLetterTags.o, '㋣')
  .set(ToneLetterTags.p + ToneLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(ToneLetterTags.p + ToneLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(ToneLetterTags.p + ToneLetterTags.u, '㋫' + '\u{309a}') // ㋫゚
  .set(ToneLetterTags.p + ToneLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(ToneLetterTags.p + ToneLetterTags.o, '㋭' + '\u{309a}'); // ㋭゚

const finalsForEKegekkeggeng = [
  ToneLetterTags.k.toString(),
  ToneLetterTags.g.toString(),
  ToneLetterTags.kk.toString(),
  ToneLetterTags.gg.toString(),
  ToneLetterTags.ng.toString(),
];

const mappingNasalFinal = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.n,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(ToneLetterTags.ng, hatsuon.get(KanaLetterTags.n));

const mappingSmallNasalFinal = new Map<string, string[] | undefined>()
  .set(ToneLetterTags.m, otherKanas.get(KanaLetterTags.m + KanaLetterTags.u))
  .set(ToneLetterTags.n, otherKanas.get(KanaLetterTags.n + KanaLetterTags.u))
  .set(ToneLetterTags.ng, otherKanas.get(KanaLetterTags.n));

const mappingInitialB = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  );

const mappingInitialC = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  );

const mappingInitialG = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  );

const mappingInitialH = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  );

const mappingInitialJ = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.j + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  );

const mappingInitialK = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  );

const mappingInitialL = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  );

const mappingInitialM = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  );

const mappingInitialN = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  );

const mappingInitialNG = new Map<string, string[] | undefined>()
  .set(ToneLetterTags.a, special.get(KanaLetterTags.ng + KanaLetterTags.a))
  .set(ToneLetterTags.i, special.get(KanaLetterTags.ng + KanaLetterTags.i))
  .set(ToneLetterTags.u, special.get(KanaLetterTags.ng + KanaLetterTags.u))
  .set(ToneLetterTags.e, special.get(KanaLetterTags.ng + KanaLetterTags.e))
  .set(ToneLetterTags.o, special.get(KanaLetterTags.ng + KanaLetterTags.o))
  .set(ToneLetterTags.ir, special.get(KanaLetterTags.ng + KanaLetterTags.u));

const mappingInitialP = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  );

const mappingInitialS = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  );

const mappingInitialT = new Map<string, string[] | undefined>()
  .set(
    ToneLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.a)
  )
  .set(
    ToneLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.e)
  )
  .set(
    ToneLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.i)
  )
  .set(
    ToneLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    ToneLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  )
  .set(
    ToneLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  );

const mappingInitial = new Map<string, Map<string, string[] | undefined>>()
  .set(ToneLetterTags.b, mappingInitialB)
  .set(ToneLetterTags.c, mappingInitialC)
  .set(ToneLetterTags.ch, mappingInitialC)
  .set(ToneLetterTags.t, mappingInitialT)
  .set(ToneLetterTags.g, mappingInitialG)
  .set(ToneLetterTags.h, mappingInitialH)
  .set(ToneLetterTags.j, mappingInitialJ)
  .set(ToneLetterTags.kh, mappingInitialK)
  .set(ToneLetterTags.l, mappingInitialL)
  .set(ToneLetterTags.m, mappingInitialM)
  .set(ToneLetterTags.n, mappingInitialN)
  .set(ToneLetterTags.ng, mappingInitialNG)
  .set(ToneLetterTags.ph, mappingInitialP)
  .set(ToneLetterTags.k, mappingInitialK)
  .set(ToneLetterTags.s, mappingInitialS)
  .set(ToneLetterTags.th, mappingInitialT)
  .set(ToneLetterTags.p, mappingInitialP);
