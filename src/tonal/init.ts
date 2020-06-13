import {
  tonalPositionalSounds,
  lowerLettersTonal,
  TonalSoundTags,
  TonalLetterTags,
  materLectionisSounds,
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
import { Sound } from '../unit';
import { fourthFinals } from './collections';

export function checkNumberOfLetterTonal() {
  if (tonalPositionalSounds.size !== lowerLettersTonal.size) {
    console.log('sizes unmatched');
  }
}

const combiningOverline = '\u0305';
const combiningDotBelow = '\u0323';

function handleCombiningDotBelowOverline(initial: string, medial: string) {
  const got = kanaInitials(mappingInitial.get(initial))(medial);
  if (got && got[0]) {
    if (initialWithCombiningDotBelow.aspirated.includes(initial)) {
      if (initialWithCombiningOverline.includes(initial + medial)) {
        return got[0] + combiningOverline + combiningDotBelow;
      }
      return got[0] + combiningDotBelow;
    } else if (
      initialWithCombiningDotBelow.withoutADotOrOverline.includes(initial)
    ) {
      return got[0];
    } else if (initialWithCombiningDotBelow.withOverline.includes(initial)) {
      if (initialWithCombiningOverline.includes(initial + medial)) {
        return got[0] + combiningOverline;
      }
      return got[0];
    }
  }
  return '';
}

function handleToneSymbolForFourthEighth(
  kanas: string,
  sounds: Sound[],
  i: number
) {
  if (sounds[sounds.length - 1].name != TonalSoundTags.checkedTonal) {
    // 4th tone and 8th tone
    const mapped = mappingSymbolForTones.get(sounds[i].toString());
    if (mapped) {
      kanas += mapped[0];
    }
  }
  return kanas;
}

function insertIReplaceWithSmall(kanas: string, sounds: Sound[], i: number) {
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
    const medials = sounds.filter(i => i.name === TonalSoundTags.medial);
    if (
      (medials.length > 0 && medials[0].toString() === TonalLetterTags.e) ||
      medials.length > 1
    ) {
      kanas = replaceWithSmall(kanas, sounds, i);
    } else if (
      medials.length > 0 &&
      medials[0].toString() === TonalLetterTags.ir &&
      sounds[0].name === TonalSoundTags.initial
    ) {
      kanas = replaceWithSmall(kanas, sounds, i);
    }
  }
  return kanas;
}

function replicateVowel(
  kanas: string,
  sounds: Sound[],
  i: number,
  replica: string
) {
  if (
    (i == 0 &&
      sounds[0].name === TonalSoundTags.medial &&
      (sounds.length == 1 ||
        (sounds.length == 2 &&
          sounds[sounds.length - 1].name === TonalSoundTags.freeTonal) ||
        sounds[sounds.length - 1].name === TonalSoundTags.nasalization)) ||
    (sounds.length == 3 &&
      sounds[sounds.length - 2].name === TonalSoundTags.nasalization &&
      sounds[sounds.length - 1].name === TonalSoundTags.freeTonal) ||
    (sounds.length == 2 &&
      sounds[0].name === TonalSoundTags.medial &&
      (sounds[1].toString() === TonalLetterTags.h ||
        sounds[1].toString() === TonalLetterTags.hh)) ||
    (sounds.length == 3 &&
      sounds[0].name === TonalSoundTags.medial &&
      (sounds[1].toString() === TonalLetterTags.h ||
        sounds[1].toString() === TonalLetterTags.hh) &&
      sounds[2].name === TonalSoundTags.checkedTonal)
  ) {
    // reduplicate the vowel for open syllables without an initial
    // in case of a, e, ax, ex.
    // in case of enn, ennx
    // in case of ah, ehh
    // in case of ahy
    kanas = kanas + replica;
  }

  return kanas;
}

function replaceWithSmall(kanas: string, sounds: Sound[], i: number) {
  if (smallFormIRor.includes(sounds[i - 1].toString())) {
    // an extra vowel is already been appended to the initial kana
    // when there is an initial and followed by a vowel, an or kana should be replaced with a small form
    const mapped = mappingMedialSmallForm.get(sounds[i - 1].toString());
    if (mapped) {
      const sliced = kanas.slice(0, kanas.length - 2);
      kanas = sliced + mapped[1] + combiningOverline;
    }
  } else {
    const sliced = kanas.slice(0, kanas.length - 1);
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
  let checkedKanasWithoutBullet = '';
  let idxNasalization = 0;
  for (const mr of morphemes) {
    for (let i = 0; i < mr.sounds.length; i++) {
      if (
        i == 0 &&
        mr.sounds.filter(i => i.name === TonalSoundTags.nasalization).length > 0
      ) {
        idxNasalization = kanas.length; // beginning of the nasalized syllable
      }
      if (mr.sounds[i].name === TonalSoundTags.initial) {
        const initials = kanaInitials(
          mappingInitial.get(mr.sounds[i].toString())
        )();
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
                handleCombiningDotBelowOverline(
                  mr.sounds[0].toString(),
                  mr.sounds[i].toString()
                ) +
                mapped[1] +
                combiningOverline;
            }
          } else if (mr.sounds[i].toString() === TonalLetterTags.ur) {
            const mapped = mappingMedial.get(mr.sounds[i].toString());
            if (mapped && mr.sounds[i - 1].name == TonalSoundTags.initial) {
              // if the preceding letter is an initial
              kanas +=
                handleCombiningDotBelowOverline(
                  mr.sounds[0].toString(),
                  mr.sounds[i].toString()
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
              const got = hiraganaKatakana.get(mr.sounds[i].toString());
              if (got) {
                if (
                  i > 2 &&
                  mr.sounds[i - 1].name === TonalSoundTags.medial &&
                  mr.sounds[i - 2].name === TonalSoundTags.medial
                ) {
                  kanas = replaceWithSmall(kanas, mr.sounds, i);
                } else if (
                  i > 1 &&
                  mr.sounds[i].name === TonalSoundTags.medial &&
                  mr.sounds[i - 1].name === TonalSoundTags.medial &&
                  mr.sounds[i - 2].name === TonalSoundTags.initial &&
                  smallFormIRor.includes(mr.sounds[i - 1].toString())
                ) {
                  kanas = replaceWithSmall(kanas, mr.sounds, i);
                }

                kanas = kanas + got[1];
              }
            } else {
              const nasalizations = mr.sounds.filter(
                i => i.name === TonalSoundTags.nasalization
              );
              const finals = mr.sounds.filter(
                it =>
                  it.name === TonalSoundTags.nasalFinal ||
                  it.name === TonalSoundTags.stopFinal
              );
              if (
                mr.sounds[i].toString() === TonalLetterTags.e &&
                finals.length > 0 &&
                nasalizations.length == 0
              ) {
                const finalsForEToKanaIE = mr.sounds.filter(
                  i =>
                    (i.name === TonalSoundTags.stopFinal &&
                      finalsForEKegekkeggeng.includes(i.toString())) ||
                    (i.name === TonalSoundTags.nasalFinal &&
                      finalsForEKegekkeggeng.includes(i.toString()))
                );
                if (finalsForEToKanaIE.length > 0) {
                  // if there is a final, e should be replaced with i for retrieving initial kana
                  // in the case of ~eng or -ek
                  kanas += handleCombiningDotBelowOverline(
                    mr.sounds[0].toString(),
                    TonalLetterTags.i
                  );
                  if (mr.sounds[i].toString() === TonalLetterTags.e) {
                    // for letter e, an extra kana small e is appended to the preceding -i
                    const got = otherKanas.get(mr.sounds[i].toString());
                    if (got) {
                      kanas += got[1];
                    }
                  }
                } else {
                  // e.g. qen, qet, chet, gehh, etc. syllables with an e and do not end with -k, -kk, or -ng
                  kanas += handleCombiningDotBelowOverline(
                    mr.sounds[0].toString(),
                    mr.sounds[i].toString()
                  );

                  const got = hiraganaKatakana.get(mr.sounds[i].toString());
                  if (got && got[1]) {
                    // replicate the vowel and append it
                    kanas += got[1];
                  }
                }
              } else {
                kanas += handleCombiningDotBelowOverline(
                  mr.sounds[0].toString(),
                  mr.sounds[i].toString()
                );

                const stopFinalsExceptForHHh = mr.sounds.filter(
                  it =>
                    it.name === TonalSoundTags.stopFinal &&
                    stopFinalsPPttkkbbggjjllssptkbgjls.includes(it.toString())
                );
                const nasalFinals = mr.sounds.filter(
                  it => it.name === TonalSoundTags.nasalFinal
                );
                const medials = mr.sounds.filter(
                  it => it.name === TonalSoundTags.medial
                );
                if (
                  stopFinalsExceptForHHh.length == 0 &&
                  nasalFinals.length == 0 &&
                  medials.length == 1
                ) {
                  // open syllables with an initial, except for ~h, ~hh
                  const got = hiraganaKatakana.get(mr.sounds[i].toString());
                  if (got && got[1]) {
                    // replicate the vowel and append it
                    kanas += got[1];
                  }
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
            kanas = replaceWithSmall(kanas, mr.sounds, i);
          }

          let got;
          if (
            mr.sounds[i].toString() === TonalLetterTags.o &&
            i == 0 &&
            mr.sounds.length > 1 &&
            mr.sounds[i + 1].name === TonalSoundTags.medial
          ) {
            // map o to wo
            got = hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o);
          } else {
            // map o to o
            got = hiraganaKatakana.get(mr.sounds[i].toString());
          }

          if (got) {
            kanas = kanas + got[1];
            kanas = replicateVowel(kanas, mr.sounds, i, got[1]);
          } else {
            if (
              mr.sounds[i].toString() === TonalLetterTags.or ||
              mr.sounds[i].toString() === TonalLetterTags.ir
            ) {
              const mapped = mappingMedial.get(mr.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1] + combiningOverline;
                kanas = replicateVowel(
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
                kanas = replicateVowel(kanas, mr.sounds, i, mapped[1]);
              }
            } else if (materLectionisSounds.includes(mr.sounds[i].toString())) {
              // mater lectionis: m, n, ng.
              const mapped = mappingMedial.get(mr.sounds[i].toString());
              if (mapped) {
                kanas += mapped[1];
              }
            }
          }
        }
      } else if (mr.sounds[i].name === TonalSoundTags.nasalization) {
        const slicedHead = kanas.slice(0, idxNasalization);
        const slicedTail = kanas.slice(idxNasalization + 1, kanas.length);
        if (mr.sounds[0].name === TonalSoundTags.initial) {
          const got = mappingNasalization.get(
            mr.sounds[0].toString() + mr.sounds[1].toString()
          );
          if (got) kanas = slicedHead + got + slicedTail;
        } else {
          const got = mappingNasalization.get(mr.sounds[0].toString());
          if (got) kanas = slicedHead + got + slicedTail;
        }
      } else if (
        mr.sounds[i].name === TonalSoundTags.freeTonal ||
        mr.sounds[i].name === TonalSoundTags.checkedTonal
      ) {
        kanas += mappingSymbolForTones.get(mr.sounds[i].toString());
      } else if (mr.sounds[i].name === TonalSoundTags.stopFinal) {
        // syllable finals
        kanas = insertIReplaceWithSmall(kanas, mr.sounds, i);
        const mappedFinal = mappingStopFinal.get(mr.sounds[i].toString());
        if (mappedFinal && mappedFinal[1]) {
          // stop finals p, t, k, pp, tt, kk
          kanas += mappedFinal[1];
          if (fourthFinals.includes(mr.sounds[i].toString())) {
            checkedKanasWithoutBullet = kanas;
          }
          kanas = handleToneSymbolForFourthEighth(kanas, mr.sounds, i);
        } else {
          // stop final h, hh
          const sliced = kanas.slice(0, kanas.length - 1);
          const medials = mr.sounds.filter(
            it => it.name === TonalSoundTags.medial
          );
          const nasalFinals = mr.sounds.filter(
            it => it.name === TonalSoundTags.nasalFinal
          );

          if (medials.length > 0) {
            let mapped;
            if (nasalFinals.length == 0) {
              mapped = mappingMedialSmallForm.get(
                medials[medials.length - 1].toString()
              );
            } else if (
              mr.sounds[mr.sounds.length - 2].name === TonalSoundTags.nasalFinal
            ) {
              // in case of vowel + ngh. e.g. sangh, langh
              mapped = mappingMedialSmallForm.get(
                mr.sounds[mr.sounds.length - 2].toString()
              );
            } else if (
              mr.sounds[mr.sounds.length - 3].name === TonalSoundTags.nasalFinal
            ) {
              // in case of mhf, nhf, nghf, mhhw, nhhw, nghhw
              mapped = mappingMedialSmallForm.get(
                mr.sounds[mr.sounds.length - 3].toString()
              );
            }

            if (mapped) {
              if (mr.sounds[0].name === TonalSoundTags.initial) {
                // except for ngh which has no initials. the same for mhf, nhf, nghf, mhhw, nhhw, nghhw.
                kanas = sliced + mapped[1];
              }
            }
          } else if (medials.length == 0) {
            const nasalFinals = mr.sounds.filter(
              it => it.name === TonalSoundTags.nasalFinal
            );
            if (nasalFinals.length > 0) {
              const mapped = mappingMedialSmallForm.get(
                nasalFinals[0].toString()
              );
              if (mapped) {
                kanas = sliced + mapped[1];
              }
            }
          }
          if (fourthFinals.includes(mr.sounds[i].toString())) {
            if (
              !(
                mr.sounds[0].toString() === TonalLetterTags.ng &&
                mr.sounds[1].toString() === TonalLetterTags.h
              )
            ) {
              // except for ngh
              checkedKanasWithoutBullet = kanas;
            }
          }
          kanas = handleToneSymbolForFourthEighth(kanas, mr.sounds, i);
        }
      } else if (mr.sounds[i].name === TonalSoundTags.nasalFinal) {
        // syllable finals
        if (i == 1 && mr.sounds[0].name === TonalSoundTags.initial) {
          // remove all of the initials previously populated with kanaInitials
          seqs = [];
          const got = kanaInitials(mappingInitial.get(mr.sounds[0].toString()))(
            TonalLetterTags.ng
          );
          if (got && got[0]) {
            kanas += handleCombiningDotBelowOverline(
              mr.sounds[0].toString(),
              mr.sounds[i].toString()
            );
          }
        }
        kanas = insertIReplaceWithSmall(kanas, mr.sounds, i);
        const got = mappingNasalFinal.get(mr.sounds[i].toString());
        if (got && got[1]) kanas += got[1];
      }
    }
  }
  seqs.push(kanas);
  if (checkedKanasWithoutBullet.length > 0 && morphemes.length == 1)
    seqs.push(checkedKanasWithoutBullet);
  return seqs;
}

/** Get Taiwanese Kana blocks. */
export function getTaiKanaBlocks(morphemes: TonalUncombiningMorpheme[]) {
  const kanaSequences: string[] = lookup(morphemes);
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

const initialWithCombiningOverline = [
  TonalLetterTags.ch.toString() + TonalLetterTags.a.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.a.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.e.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.e.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.o.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.or.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.ur.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.o.toString(),
  TonalLetterTags.d.toString() + TonalLetterTags.i.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.i.toString(),
  TonalLetterTags.d.toString() + TonalLetterTags.u.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.u.toString(),
  TonalLetterTags.d.toString() + TonalLetterTags.ng.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.ng.toString(),
  TonalLetterTags.d.toString() + TonalLetterTags.ir.toString(),
];

const initialWithCombiningDotBelow = {
  // whether the dot should be combined
  aspirated: [
    // with a dot
    TonalLetterTags.k.toString(),
    TonalLetterTags.c.toString(),
    TonalLetterTags.p.toString(),
    TonalLetterTags.t.toString(),
  ],
  withoutADotOrOverline: [
    TonalLetterTags.q.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.b.toString(),
    TonalLetterTags.v.toString(),
    TonalLetterTags.j.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.h.toString(),
    TonalLetterTags.s.toString(),
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString(),
  ],
  withOverline: [
    TonalLetterTags.ch.toString(),
    TonalLetterTags.c.toString(),
    TonalLetterTags.d.toString(),
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

const smallFormIRor = [
  TonalLetterTags.ir.toString(),
  TonalLetterTags.or.toString(),
];

const stopFinalsPPttkkbbggjjllssptkbgjls = [
  TonalLetterTags.p.toString(),
  TonalLetterTags.t.toString(),
  TonalLetterTags.k.toString(),
  TonalLetterTags.pp.toString(),
  TonalLetterTags.tt.toString(),
  TonalLetterTags.kk.toString(),
  TonalLetterTags.b.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.j.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.s.toString(),
  TonalLetterTags.bb.toString(),
  TonalLetterTags.gg.toString(),
  TonalLetterTags.jj.toString(),
  TonalLetterTags.ll.toString(),
  TonalLetterTags.ss.toString(),
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
  .set(TonalLetterTags.jj, '⤇')
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
  .set(TonalLetterTags.u, '㋒')
  .set(TonalLetterTags.e, '㋓')
  .set(TonalLetterTags.o, '㋔')
  .set(TonalLetterTags.k + TonalLetterTags.a, '㋕')
  .set(TonalLetterTags.k + TonalLetterTags.i, '㋖')
  .set(TonalLetterTags.k + TonalLetterTags.e, '㋘')
  .set(TonalLetterTags.k + TonalLetterTags.o, '㋙')
  .set(TonalLetterTags.s + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.s + TonalLetterTags.i, '㋛')
  .set(TonalLetterTags.s + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.s + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.c + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.c + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.c + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.c + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.ch + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.ch + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.ch + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.ch + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.d + TonalLetterTags.a, '㋟')
  .set(TonalLetterTags.d + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.d + TonalLetterTags.e, '㋢')
  .set(TonalLetterTags.d + TonalLetterTags.o, '㋣')
  .set(TonalLetterTags.p + TonalLetterTags.a, '㋩' + '\u{309a}')
  .set(TonalLetterTags.p + TonalLetterTags.e, '㋬' + '\u{309a}')
  .set(TonalLetterTags.p + TonalLetterTags.i, '㋪' + '\u{309a}')
  .set(TonalLetterTags.p + TonalLetterTags.o, '㋭' + '\u{309a}')
  .set(TonalLetterTags.q + TonalLetterTags.a, '㋕')
  .set(TonalLetterTags.q + TonalLetterTags.i, '㋖')
  .set(TonalLetterTags.q + TonalLetterTags.e, '㋘')
  .set(TonalLetterTags.q + TonalLetterTags.o, '㋙')
  .set(TonalLetterTags.h + TonalLetterTags.a, '㋩')
  .set(TonalLetterTags.h + TonalLetterTags.i, '㋪')
  .set(TonalLetterTags.h + TonalLetterTags.e, '㋬')
  .set(TonalLetterTags.h + TonalLetterTags.o, '㋭')
  .set(TonalLetterTags.t + TonalLetterTags.a, '㋟')
  .set(TonalLetterTags.t + TonalLetterTags.e, '㋢')
  .set(TonalLetterTags.t + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.t + TonalLetterTags.o, '㋣')
  .set(TonalLetterTags.v + TonalLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(TonalLetterTags.v + TonalLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(TonalLetterTags.v + TonalLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(TonalLetterTags.v + TonalLetterTags.o, '㋭' + '\u{309a}'); // ㋭゚

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
  );

const mappingInitialNG = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.a, special.get(KanaLetterTags.ng + KanaLetterTags.a))
  .set(TonalLetterTags.i, special.get(KanaLetterTags.ng + KanaLetterTags.i))
  .set(TonalLetterTags.e, special.get(KanaLetterTags.ng + KanaLetterTags.e))
  .set(TonalLetterTags.o, special.get(KanaLetterTags.ng + KanaLetterTags.o));

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
  .set(TonalLetterTags.d, mappingInitialT)
  .set(TonalLetterTags.g, mappingInitialG)
  .set(TonalLetterTags.h, mappingInitialH)
  .set(TonalLetterTags.j, mappingInitialJ)
  .set(TonalLetterTags.k, mappingInitialK)
  .set(TonalLetterTags.l, mappingInitialL)
  .set(TonalLetterTags.m, mappingInitialM)
  .set(TonalLetterTags.n, mappingInitialN)
  .set(TonalLetterTags.ng, mappingInitialNG)
  .set(TonalLetterTags.p, mappingInitialP)
  .set(TonalLetterTags.q, mappingInitialK)
  .set(TonalLetterTags.s, mappingInitialS)
  .set(TonalLetterTags.t, mappingInitialT)
  .set(TonalLetterTags.v, mappingInitialP);
