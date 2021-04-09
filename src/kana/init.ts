import {
  kanaPositionalSounds,
  lowerLettersKana,
  kogakimoji,
  hiraganaKatakana,
  hatsuon,
  gailaigo,
  initialConsonantsKana,
  geminatedConsonantsKana,
  finalConsonantsKana,
  hatsuonsKana,
  special,
  KanaLetterTags,
  otherKanas,
} from './kana';
import { KanaUncombiningMorpheme } from './morpheme';

export function checkNumberOfLettersKana() {
  if (kanaPositionalSounds.size !== lowerLettersKana.size) {
    console.log('sizes unmatched');
  }
}

function getKanasFollowingSmallChu(key: string) {
  let kanaSequences: string[] = ['', '', ''];
  let ks = kogakimoji.get('chu');
  if (ks) {
    kanaSequences[0] += ks[0];
    kanaSequences[1] += ks[1];
    kanaSequences[2] += ks[1];
  }

  ks = hiraganaKatakana.get(key);
  if (ks) {
    kanaSequences[0] += ks[0];
    kanaSequences[1] += ks[1];
    kanaSequences[2] += ks[1];
  }
  return kanaSequences;
}

function checkChouon(previousLetter: string, nextLetter: string): boolean {
  if (previousLetter === nextLetter) return true;
  if (previousLetter === KanaLetterTags.e && nextLetter === KanaLetterTags.i)
    return true;
  if (previousLetter === KanaLetterTags.o && nextLetter === KanaLetterTags.u)
    return true;
  return false;
}

function lookUp(str: string) {
  let kanas = hiraganaKatakana.get(str);
  if (kanas == undefined) {
    kanas = gailaigo.get(str);
  }
  if (kanas == undefined) {
    kanas = special.get(str);
  }
  return kanas;
}

function lookUpOtherKanas(str: string) {
  if (otherKanas.has(str)) {
    return otherKanas.get(str);
  }
}

export function getKanaBlocks(morphemes: KanaUncombiningMorpheme[]): string[] {
  // string one is hiragana, string two is katakana, string three is chouon
  const kanaSequences: string[] = [];
  kanaSequences[0] = '';
  kanaSequences[1] = '';
  const hiraganaChouonSeqs: string[] = []; // chouon. should have only 1 element
  hiraganaChouonSeqs[0] = '';
  const katakanaChouonSeqs: string[] = []; // chouon. should have only 1 element
  katakanaChouonSeqs[0] = '';
  let previous = '';

  for (const m of morphemes) {
    const ks = lookUp(m.syllable.literal);
    if (ks != undefined && ks[0] != undefined) {
      // in case the kana is absent, we check against ks[0]
      kanaSequences[0] += ks[0];
      kanaSequences[1] += ks[1];

      if (
        previous.length > 0 &&
        checkChouon(
          previous[previous.length - 1],
          m.syllable.literal[m.syllable.literal.length - 1]
        ) &&
        initialConsonantsKana.includes(m.syllable.literal) == false &&
        m.syllable.literal.length == 1
      ) {
        // a vowel without a preceding initial consonant and is of length 1
        // a vowel follows a previous vowel
        hiraganaChouonSeqs[0] += 'ー';
        katakanaChouonSeqs[0] += 'ー';
      } else {
        hiraganaChouonSeqs[0] += ks[0];
        katakanaChouonSeqs[0] += ks[1];
      }
      if (morphemes.length == 1) {
        const got = lookUpOtherKanas(m.syllable.literal);
        if (got) {
          if (got[0]) kanaSequences.push(got[0]);
          if (got[1]) kanaSequences.push(got[1]);
        }
      }
    } else if (
      finalConsonantsKana.includes(
        m.syllable.literal[m.syllable.literal.length - 1]
      ) == true
    ) {
      // a syllable with a final consonant
      const got = lookUp(
        m.syllable.literal.substring(0, m.syllable.literal.length - 1)
      );
      if (got != undefined && got[0] != undefined) {
        kanaSequences[0] += got[0];
        kanaSequences[1] += got[1];
        hiraganaChouonSeqs[0] += got[0];
        katakanaChouonSeqs[0] += got[1];
      }
      if (
        hatsuonsKana.includes(m.syllable.literal[m.syllable.literal.length - 1])
      ) {
        const got = hatsuon.get('n');
        if (got && got[0]) {
          kanaSequences[0] += got[0];
          kanaSequences[1] += got[1];
          hiraganaChouonSeqs[0] += got[0];
          katakanaChouonSeqs[0] += got[1];
        }
      } else {
        const got = kogakimoji.get('chu');
        if (got && got[0]) {
          kanaSequences[0] += got[0];
          kanaSequences[1] += got[1];
          hiraganaChouonSeqs[0] += got[0];
          katakanaChouonSeqs[0] += got[1];
        }
      }
    } else {
      let first = m.syllable.literal[0];
      let second = m.syllable.literal[1];

      if (first === second && geminatedConsonantsKana.includes(first) == true) {
        const got = getKanasFollowingSmallChu(
          m.sounds[1].toString() + m.sounds[2].toString()
        );
        kanaSequences[0] += got[0];
        kanaSequences[1] += got[1];
        hiraganaChouonSeqs[0] += got[0];
        katakanaChouonSeqs[0] += got[1];
      } else if (
        m.sounds[0].toString() === KanaLetterTags.t &&
        m.sounds[1].toString() === KanaLetterTags.ch &&
        geminatedConsonantsKana.includes(m.sounds[0].toString()) == true
      ) {
        const got = getKanasFollowingSmallChu(
          m.sounds[1].toString() + m.sounds[2].toString()
        );
        kanaSequences[0] += got[0];
        kanaSequences[1] += got[1];
        hiraganaChouonSeqs[0] += got[0];
        katakanaChouonSeqs[0] += got[1];
      }
    }

    previous = m.syllable.literal;
  }

  // copy chouon kanas
  if (kanaSequences[0] !== hiraganaChouonSeqs[0])
    kanaSequences.push(hiraganaChouonSeqs[0]);
  if (kanaSequences[1] !== katakanaChouonSeqs[0])
    kanaSequences.push(katakanaChouonSeqs[0]);

  return kanaSequences;
}
