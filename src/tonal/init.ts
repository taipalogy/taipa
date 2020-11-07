import {
  tonalPositionalLetters,
  lowerLettersTonal,
  TonalSpellingTags,
  TonalLetterTags,
  materLectionisTonal,
  neutralFinalsTonal,
} from './version2';
import { TonalUncombiningMorpheme } from './morpheme';
import {
  hiraganaKatakana,
  KanaLetterTags,
  otherKanas,
  kogakimoji,
  hatsuon,
  special,
} from '../kana/kana';
import { PositionalLetter } from '../unit';
import { fourthFinalConsonants } from './collections';

export function checkNumberOfLetterTonal() {
  if (tonalPositionalLetters.size !== lowerLettersTonal.size) {
    console.log('sizes unmatched');
  }
}

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

function getToneSymbolForFourthEighth(final: string, tonalLen: number) {
  if (tonalLen == 0) {
    // 4th tone and 8th tone
    const kn = mappingSymbolForTones.get(final.toString());
    if (kn) {
      return kn[0];
    }
  }
  return '';
}

function getReplicatedKanaVowel(
  letters: PositionalLetter[],
  j: number,
  replica: string
) {
  if (
    (j == 0 &&
      letters[0].name === TonalSpellingTags.vowel &&
      (letters.length == 1 ||
        (letters.length == 2 &&
          letters[letters.length - 1].name === TonalSpellingTags.freeTonal) ||
        (letters.length == 2 &&
          letters[letters.length - 1].name ===
            TonalSpellingTags.nasalization))) ||
    (letters.length == 3 &&
      letters[letters.length - 2].name === TonalSpellingTags.nasalization &&
      letters[letters.length - 1].name === TonalSpellingTags.freeTonal)
  ) {
    // reduplicate the vowel for syllables without an initial
    // in case of a, e,
    // in case ax, ex. enn,
    // in case of ennx
    return replica;
  } else if (
    (letters.length == 2 &&
      letters[0].name === TonalSpellingTags.vowel &&
      (letters[1].toString() === TonalLetterTags.h ||
        letters[1].toString() === TonalLetterTags.hh)) ||
    (letters.length == 3 &&
      letters[0].name === TonalSpellingTags.vowel &&
      (letters[1].toString() === TonalLetterTags.h ||
        letters[1].toString() === TonalLetterTags.hh) &&
      letters[2].name === TonalSpellingTags.checkedTonal) ||
    (letters.length == 3 &&
      letters[0].name === TonalSpellingTags.vowel &&
      letters[1].name === TonalSpellingTags.nasalization &&
      (letters[2].toString() === TonalLetterTags.h ||
        letters[2].toString() === TonalLetterTags.hh))
  ) {
    // reduplicate the vowel for syllables without an initial
    // in case of ah, ehh
    // in case of ahy
    // in case of ennh, innh
    return getSmallKanaVowel(letters[0].toString());
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

function compose(morphemes: TonalUncombiningMorpheme[]) {
  let kanaSeqs: string[] = [];
  let kanas: string[] = new Array(morphemes.length);
  let kanas4thToneWoArrow = '';

  for (let i = 0; i < morphemes.length; i++) {
    const initl = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.initial
    );
    const mdls = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.vowel
    );
    const nslFnl = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.nasalFinal
    );
    const stpFnl = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.stopFinal
    );
    const frTnl = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.freeTonal
    );
    const chkTnl = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.checkedTonal
    );
    const nslz = morphemes[i].letters.filter(
      it => it.name === TonalSpellingTags.nasalization
    );
    const finalsForEToKanaIE = stpFnl
      .filter(
        it =>
          it.name === TonalSpellingTags.stopFinal &&
          finalsForEKegekkeggeng.includes(it.toString())
      )
      .concat(
        nslFnl.filter(
          it =>
            it.name === TonalSpellingTags.nasalFinal &&
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
          } else if (mdls[j].toString() === TonalLetterTags.ur) {
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
              mdls[j].toString() === TonalLetterTags.e &&
              nslFnl.length + stpFnl.length > 0 &&
              nslz.length == 0 &&
              finalsForEToKanaIE.length == 1
            ) {
              // if there is a final, letter i should be used to retrieve an initial kana
              // in the case of ~eng or -ek
              if (mdls.length == 1) {
                kanas[i] += handleCombiningDotBelowOverline(
                  initl[0].toString(),
                  TonalLetterTags.i
                );
              } else if (
                mdls.length == 2 &&
                mdls[0].toString() === TonalLetterTags.i
              ) {
                // in case of -ieng
                kanas[i] += getSmallKanaVowel(KanaLetterTags.i);
              }
              if (mdls[j].toString() === TonalLetterTags.e) {
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
                  neutralFinalsTonal.includes(stpFnl[0].toString())
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
            mdls[j].toString() === TonalLetterTags.o &&
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
              mdls[j].toString() === TonalLetterTags.e &&
              nslFnl.length + stpFnl.length > 0 &&
              nslz.length == 0 &&
              finalsForEToKanaIE.length == 1
            ) {
              // if there is a final, letter i should be used to retrieve an extra medial kana
              // in the case of ~eng or -ek
              const kn = hiraganaKatakana.get(TonalLetterTags.i);
              if (kn) kanas[i] += kn[1];
              if (mdls[j].toString() === TonalLetterTags.e) {
                // for letter e, a small kana e is appended to the preceding i-
                kanas[i] += getSmallKanaVowel(mdls[j].toString());
              }
            } else {
              kanas[i] += got[1];
              kanas[i] += getReplicatedKanaVowel(
                morphemes[i].letters,
                j,
                got[1]
              );
            }
          } else {
            if (
              mdls[j].toString() === TonalLetterTags.or ||
              mdls[j].toString() === TonalLetterTags.ir
            ) {
              const kn = mappingMedial.get(mdls[j].toString());
              if (kn) {
                kanas[i] += kn[1] + combiningOverline;
                if (
                  stpFnl.length == 1 &&
                  neutralFinalsTonal.includes(stpFnl[0].toString())
                ) {
                  // in case of orh, use kanaIRor to get one extra small kana
                  kanas[i] += getKanaIRor(
                    mdls,
                    stpFnl.length + nslFnl.length == 1
                  );
                } else {
                  // there replicated kana other than ir, or
                  kanas[i] += getReplicatedKanaVowel(
                    morphemes[i].letters,
                    i,
                    kn[1] + combiningOverline
                  );
                }
              }
            } else if (
              mdls[j].toString() === TonalLetterTags.ur ||
              mdls[j].toString() === TonalLetterTags.er
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
                      morphemes[i].letters,
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
      kanas[i] += getToneSymbolForFourthEighth(
        stpFnl[0].toString(),
        chkTnl.length
      );
    }

    if (frTnl.length == 1) {
      kanas[i] += mappingSymbolForTones.get(frTnl[0].toString());
    }

    if (chkTnl.length == 1) {
      kanas[i] += mappingSymbolForTones.get(chkTnl[0].toString());
    }
  }

  kanaSeqs.push(kanas.join(''));
  if (kanas4thToneWoArrow.length > 0 && morphemes.length == 1) {
    kanaSeqs.push(kanas4thToneWoArrow);
  }
  return kanaSeqs;
}

/** Get Taiwanese Kana blocks. */
export function getTaiKanaBlocks(morphemes: TonalUncombiningMorpheme[]) {
  const kanaSequences: string[] = compose(morphemes);
  return kanaSequences;
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

const getKanaIRor = function (
  vowels: PositionalLetter[],
  hasOneFinal: boolean
) {
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
  TonalLetterTags.ch.toString() + TonalLetterTags.a.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.a.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.e.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.e.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.o.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.or.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.ur.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.o.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.i.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.i.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.u.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.u.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.ng.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.ng.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.ir.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.ir.toString(),
];

const initialsWithCombiningDotBelow = {
  // whether the dot should be combined
  aspirated: [
    // with a dot
    TonalLetterTags.kh.toString(),
    TonalLetterTags.c.toString(),
    TonalLetterTags.ph.toString(),
    TonalLetterTags.th.toString(),
  ],
  withoutADotOrOverline: [
    TonalLetterTags.k.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.b.toString(),
    TonalLetterTags.p.toString(),
    TonalLetterTags.j.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.h.toString(),
    TonalLetterTags.s.toString(),
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString(),
  ],
  withAnOverline: [
    TonalLetterTags.ch.toString(),
    TonalLetterTags.c.toString(),
    TonalLetterTags.t.toString(),
  ],
};

// includes mater lectionis
const mappingMedial = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.ir, hiraganaKatakana.get(KanaLetterTags.u))
  .set(TonalLetterTags.or, hiraganaKatakana.get(KanaLetterTags.o))
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o)
  )
  .set(TonalLetterTags.er, hiraganaKatakana.get(KanaLetterTags.e))
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.n,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(TonalLetterTags.ng, hatsuon.get(KanaLetterTags.n));

const voewlsIRor = [
  TonalLetterTags.ir.toString(),
  TonalLetterTags.or.toString(),
];

const mappingMedialSmallForm = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.a, otherKanas.get(KanaLetterTags.a))
  .set(TonalLetterTags.i, otherKanas.get(KanaLetterTags.i))
  .set(TonalLetterTags.e, otherKanas.get(KanaLetterTags.e))
  .set(TonalLetterTags.or, otherKanas.get(KanaLetterTags.o))
  .set(TonalLetterTags.ur, otherKanas.get(KanaLetterTags.w + KanaLetterTags.o))
  .set(TonalLetterTags.ir, otherKanas.get(KanaLetterTags.u))
  .set(TonalLetterTags.m, otherKanas.get(KanaLetterTags.m + KanaLetterTags.u))
  .set(TonalLetterTags.n, otherKanas.get(KanaLetterTags.n + KanaLetterTags.u))
  .set(TonalLetterTags.ng, otherKanas.get(KanaLetterTags.n));

const mappingSymbolForTones = new Map()
  .set(TonalLetterTags.f, '⍭') // apl functional symbol stile tilde (U+236D)
  .set(TonalLetterTags.y, '⎛') // left parenthesis upper hook (U+239B)
  .set(TonalLetterTags.w, '⎝') // left parenthesis lower hook (U+239D)
  .set(TonalLetterTags.x, '⟨') // mathematical left angle bracket (U+27E8)
  .set(TonalLetterTags.zx, '⟩') // mathematical left angle bracket (U+27E8)
  .set(TonalLetterTags.z, '⎸') // left vertical box line (U+23B8)
  .set(TonalLetterTags.xx, '⫽') // double solidus operator (U+2AFD)
  .set(TonalLetterTags.p, '⤆') // leftwards double arrow from bar (U+2906)
  .set(TonalLetterTags.t, '⤆')
  .set(TonalLetterTags.k, '⤆')
  .set(TonalLetterTags.h, '⤆')
  .set(TonalLetterTags.b, '⤆')
  .set(TonalLetterTags.g, '⤆')
  .set(TonalLetterTags.j, '⤆')
  .set(TonalLetterTags.l, '⤆')
  .set(TonalLetterTags.s, '⤆')
  .set(TonalLetterTags.pp, '⤇') // rightwards double arrow from bar (U+2907)
  .set(TonalLetterTags.tt, '⤇')
  .set(TonalLetterTags.kk, '⤇')
  .set(TonalLetterTags.hh, '⤇')
  .set(TonalLetterTags.bb, '⤇')
  .set(TonalLetterTags.gg, '⤇')
  .set(TonalLetterTags.ll, '⤇')
  .set(TonalLetterTags.ss, '⤇');

const mappingStopFinal = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.p, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(TonalLetterTags.t, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(TonalLetterTags.k, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(TonalLetterTags.b, otherKanas.get(KanaLetterTags.b + KanaLetterTags.u))
  .set(TonalLetterTags.g, otherKanas.get(KanaLetterTags.g + KanaLetterTags.u))
  .set(TonalLetterTags.j, otherKanas.get(KanaLetterTags.j + KanaLetterTags.u))
  .set(TonalLetterTags.l, otherKanas.get(KanaLetterTags.r + KanaLetterTags.u))
  .set(TonalLetterTags.s, otherKanas.get(KanaLetterTags.s + KanaLetterTags.u))
  .set(TonalLetterTags.pp, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(TonalLetterTags.tt, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(TonalLetterTags.kk, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(TonalLetterTags.bb, otherKanas.get(KanaLetterTags.b + KanaLetterTags.u))
  .set(TonalLetterTags.gg, otherKanas.get(KanaLetterTags.g + KanaLetterTags.u))
  .set(TonalLetterTags.ll, otherKanas.get(KanaLetterTags.r + KanaLetterTags.u))
  .set(TonalLetterTags.ss, otherKanas.get(KanaLetterTags.s + KanaLetterTags.u));

const mappingNasalization = new Map<string, string>()
  .set(TonalLetterTags.a, '㋐')
  .set(TonalLetterTags.i, '㋑')
  .set(TonalLetterTags.ir, '㋒')
  .set(TonalLetterTags.u, '㋒')
  .set(TonalLetterTags.e, '㋓')
  .set(TonalLetterTags.o, '㋔')
  .set(TonalLetterTags.kh + TonalLetterTags.a, '㋕')
  .set(TonalLetterTags.kh + TonalLetterTags.i, '㋖')
  .set(TonalLetterTags.kh + TonalLetterTags.u, '㋗')
  .set(TonalLetterTags.kh + TonalLetterTags.e, '㋘')
  .set(TonalLetterTags.kh + TonalLetterTags.o, '㋙')
  .set(TonalLetterTags.s + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.s + TonalLetterTags.i, '㋛')
  .set(TonalLetterTags.s + TonalLetterTags.u, '㋜')
  .set(TonalLetterTags.s + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.s + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.c + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.c + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.c + TonalLetterTags.ir, '㋡')
  .set(TonalLetterTags.c + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.c + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.c + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.ch + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.ch + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.ch + TonalLetterTags.ir, '㋡')
  .set(TonalLetterTags.ch + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.ch + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.ch + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.t + TonalLetterTags.a, '㋟')
  .set(TonalLetterTags.t + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.t + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.t + TonalLetterTags.e, '㋢')
  .set(TonalLetterTags.t + TonalLetterTags.o, '㋣')
  .set(TonalLetterTags.j + TonalLetterTags.i, '㋛' + '\u{3099}') // ㋛゙
  .set(TonalLetterTags.ph + TonalLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(TonalLetterTags.ph + TonalLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(TonalLetterTags.ph + TonalLetterTags.u, '㋫' + '\u{309a}') // ㋫゚
  .set(TonalLetterTags.ph + TonalLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(TonalLetterTags.ph + TonalLetterTags.o, '㋭' + '\u{309a}') // ㋭゚
  .set(TonalLetterTags.k + TonalLetterTags.a, '㋕')
  .set(TonalLetterTags.k + TonalLetterTags.i, '㋖')
  .set(TonalLetterTags.k + TonalLetterTags.ir, '㋗')
  .set(TonalLetterTags.k + TonalLetterTags.u, '㋗')
  .set(TonalLetterTags.k + TonalLetterTags.e, '㋘')
  .set(TonalLetterTags.k + TonalLetterTags.o, '㋙')
  .set(TonalLetterTags.h + TonalLetterTags.a, '㋩')
  .set(TonalLetterTags.h + TonalLetterTags.i, '㋪')
  .set(TonalLetterTags.h + TonalLetterTags.ir, '㋫')
  .set(TonalLetterTags.h + TonalLetterTags.u, '㋫')
  .set(TonalLetterTags.h + TonalLetterTags.e, '㋬')
  .set(TonalLetterTags.h + TonalLetterTags.o, '㋭')
  .set(TonalLetterTags.th + TonalLetterTags.a, '㋟')
  .set(TonalLetterTags.th + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.th + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.th + TonalLetterTags.e, '㋢')
  .set(TonalLetterTags.th + TonalLetterTags.o, '㋣')
  .set(TonalLetterTags.p + TonalLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(TonalLetterTags.p + TonalLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(TonalLetterTags.p + TonalLetterTags.u, '㋫' + '\u{309a}') // ㋫゚
  .set(TonalLetterTags.p + TonalLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(TonalLetterTags.p + TonalLetterTags.o, '㋭' + '\u{309a}'); // ㋭゚

const finalsForEKegekkeggeng = [
  TonalLetterTags.k.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.kk.toString(),
  TonalLetterTags.gg.toString(),
  TonalLetterTags.ng.toString(),
];

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

const mappingSmallNasalFinal = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.m, otherKanas.get(KanaLetterTags.m + KanaLetterTags.u))
  .set(TonalLetterTags.n, otherKanas.get(KanaLetterTags.n + KanaLetterTags.u))
  .set(TonalLetterTags.ng, otherKanas.get(KanaLetterTags.n));

const mappingInitialB = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  );

const mappingInitialC = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.c + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
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

const mappingInitialH = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  );

const mappingInitialJ = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.j + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
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

const mappingInitialL = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  );

const mappingInitialM = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  );

const mappingInitialN = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  );

const mappingInitialNG = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.a, special.get(KanaLetterTags.ng + KanaLetterTags.a))
  .set(TonalLetterTags.i, special.get(KanaLetterTags.ng + KanaLetterTags.i))
  .set(TonalLetterTags.e, special.get(KanaLetterTags.ng + KanaLetterTags.e))
  .set(TonalLetterTags.o, special.get(KanaLetterTags.ng + KanaLetterTags.o))
  .set(TonalLetterTags.ir, special.get(KanaLetterTags.ng + KanaLetterTags.u));

const mappingInitialP = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  );

const mappingInitialS = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  );

const mappingInitialT = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.c + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.or,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  );

const mappingInitial = new Map<string, Map<string, string[] | undefined>>()
  .set(TonalLetterTags.b, mappingInitialB)
  .set(TonalLetterTags.c, mappingInitialC)
  .set(TonalLetterTags.ch, mappingInitialC)
  .set(TonalLetterTags.t, mappingInitialT)
  .set(TonalLetterTags.g, mappingInitialG)
  .set(TonalLetterTags.h, mappingInitialH)
  .set(TonalLetterTags.j, mappingInitialJ)
  .set(TonalLetterTags.kh, mappingInitialK)
  .set(TonalLetterTags.l, mappingInitialL)
  .set(TonalLetterTags.m, mappingInitialM)
  .set(TonalLetterTags.n, mappingInitialN)
  .set(TonalLetterTags.ng, mappingInitialNG)
  .set(TonalLetterTags.ph, mappingInitialP)
  .set(TonalLetterTags.k, mappingInitialK)
  .set(TonalLetterTags.s, mappingInitialS)
  .set(TonalLetterTags.th, mappingInitialT)
  .set(TonalLetterTags.p, mappingInitialP);
