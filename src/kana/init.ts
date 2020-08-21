import {
  kanaPositionalSound,
  lowerLettersKana,
  kogakimoji,
  hiraganaKatakana,
  hatsuon,
  gailaigo,
  initialConsonantsKana,
  germinatedConsonantsKana,
  finalConsonantsKana,
  hatsuonKana,
  special,
  KanaLetterTags,
  otherKanas,
} from './kana';
import { KanaUncombiningMorpheme } from './morpheme';

export function checkNumberOfLettersKana() {
  if (kanaPositionalSound.size !== lowerLettersKana.size) {
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
  kanaSequences[2] = '';
  let previous = '';

  for (const m of morphemes) {
    let ks = lookUp(m.syllable.literal);
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
        // a vowel does not begin with a consonant and is of length 1
        // a vowel follows a previous vowel
        kanaSequences[2] += 'ー';
      } else {
        kanaSequences[2] += ks[1];
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
      ks = lookUp(
        m.syllable.literal.substring(0, m.syllable.literal.length - 1)
      );
      if (ks != undefined && ks[0] != undefined) {
        kanaSequences[0] += ks[0];
        kanaSequences[1] += ks[1];
        kanaSequences[2] += ks[1];
      }
      if (
        hatsuonKana.includes(m.syllable.literal[m.syllable.literal.length - 1])
      ) {
        ks = hatsuon.get('n');
        if (ks) {
          kanaSequences[0] += ks[0];
          kanaSequences[1] += ks[1];
          kanaSequences[2] += ks[1];
        }
      } else {
        ks = kogakimoji.get('chu');
        if (ks) {
          kanaSequences[0] += ks[0];
          kanaSequences[1] += ks[1];
          kanaSequences[2] += ks[1];
        }
      }
    } else {
      let first = m.syllable.literal[0];
      let second = m.syllable.literal[1];

      if (
        first === second &&
        germinatedConsonantsKana.includes(first) == true
      ) {
        const ret = getKanasFollowingSmallChu(
          m.sounds[1].toString() + m.sounds[2].toString()
        );
        kanaSequences[0] += ret[0];
        kanaSequences[1] += ret[1];
        kanaSequences[2] += ret[1];
      } else if (
        m.sounds[0].toString() === KanaLetterTags.t &&
        m.sounds[1].toString() === KanaLetterTags.ch &&
        germinatedConsonantsKana.includes(m.sounds[0].toString()) == true
      ) {
        const ret = getKanasFollowingSmallChu(
          m.sounds[1].toString() + m.sounds[2].toString()
        );
        kanaSequences[0] += ret[0];
        kanaSequences[1] += ret[1];
        kanaSequences[2] += ret[1];
      }
    }

    previous = m.syllable.literal;
  }

  // remove duplicates
  if (kanaSequences[1] === kanaSequences[2]) kanaSequences[2] = '';

  return kanaSequences;
}
