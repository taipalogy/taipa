import { syllabifyTonal } from '../unchange/morpheme';
import { AlphabeticGrapheme, makeMatchedPatterns } from '../unit';
import { graphAnalyzeTonal } from '../unchange/analyzer';
import { TonalSpellingTags, ToneLetterTags } from './tonalres';

/** Tone letters and stop finals of the syllables of a word. */
export class LexicalTone {
  /** Tone letters of all syllables. A transfix is comprised of its tone affixes. */
  toneLetters: string[] = [];
  /** Stop finals of all syllables. */
  stopFinals: string[] = [];
  /** Return the last tone letter of a word. */
  getInflectionalEnding() {
    return this.toneLetters[this.toneLetters.length - 1];
  }
  /** Return the tone of a word. */
  getAllomorphicEnding() {
    return (
      this.stopFinals[this.stopFinals.length - 1] +
      this.toneLetters[this.toneLetters.length - 1]
    );
  }
  /** Return tone numbers for all syllables. */
  getToneNumbers() {
    const numbers: number[] = [];
    for (let i = 0; i < this.toneLetters.length; i++) {
      if (this.toneLetters[i] === '' && this.stopFinals[i] === '')
        numbers.push(1);
      else if (this.toneLetters[i] === '' && this.stopFinals[i] !== '') {
        if (this.stopFinals[i].length == 1) numbers.push(4);
        else if (this.stopFinals[i].length == 2) numbers.push(8);
      } else if (this.toneLetters[i] !== '') {
        if (this.toneLetters[i] === ToneLetterTags.f) numbers.push(1);
        if (this.toneLetters[i] === ToneLetterTags.y) numbers.push(2);
        if (this.toneLetters[i] === ToneLetterTags.w) numbers.push(3);
        if (this.toneLetters[i] === ToneLetterTags.x) numbers.push(5);
        if (this.toneLetters[i] === ToneLetterTags.z) numbers.push(7);
        if (this.toneLetters[i] === ToneLetterTags.xx) numbers.push(9);
      }
    }
    return numbers;
  }
}

/** Given a word, populate and return a LexicalTone object. */
export function extractTones(token: string) {
  const gs: AlphabeticGrapheme[] = graphAnalyzeTonal(token);
  const ltrs = gs.map((it) => it.letter);
  const ptrns = makeMatchedPatterns(ltrs, syllabifyTonal);
  const tone = new LexicalTone();

  const ptn = ptrns.map((it) => it.pattern);
  const stps = ptn.map((it) =>
    it
      .map((it) =>
        it.name === TonalSpellingTags.stopFinalConsonant ? it.toString() : ''
      )
      .filter((it) => it.length > 0)
  );

  const tnls = ptn.map((it) =>
    it
      .map((it) =>
        it.name === TonalSpellingTags.freeTone ||
        it.name === TonalSpellingTags.checkedTone
          ? it.toString()
          : ''
      )
      .filter((it) => it.length > 0)
  );

  stps.map((it) =>
    it.length > 0 ? tone.stopFinals.push(it[0]) : tone.stopFinals.push('')
  );
  tnls.map((it) =>
    it.length > 0 ? tone.toneLetters.push(it[0]) : tone.toneLetters.push('')
  );

  return tone;
}

/** Return tone ending number for 1 word. */
export function getToneEndingNumber(token: string): number {
  const tone = extractTones(token);
  if (tone.getInflectionalEnding() === '' && tone.getAllomorphicEnding() === '')
    return 1;
  if (
    tone.getInflectionalEnding() === '' &&
    tone.getAllomorphicEnding() !== ''
  ) {
    // p, t, k, h
    if (tone.getAllomorphicEnding().length == 1) return 4;
    // pp, tt, kk, hh
    if (tone.getAllomorphicEnding().length == 2) return 8;
  }
  if (tone.getInflectionalEnding() !== '') {
    // -f, -y, -w, -x, -z, -xx. -pf, -tf, -kf, -hf.
    if (tone.getInflectionalEnding() === ToneLetterTags.f) return 1;
    if (tone.getInflectionalEnding() === ToneLetterTags.y) return 2;
    if (tone.getInflectionalEnding() === ToneLetterTags.w) return 3;
    if (tone.getInflectionalEnding() === ToneLetterTags.x) return 5;
    if (tone.getInflectionalEnding() === ToneLetterTags.z) return 7;
    if (tone.getInflectionalEnding() === ToneLetterTags.xx) return 9;
  }
  return -1;
}

/** Return tone ending numbers for 2 words. */
export function getToneEndingNumbersTwo(token1: string, token2: string) {
  return [getToneEndingNumber(token1), getToneEndingNumber(token2)];
}

/** Return tone ending numbers for 3 words. */
export function getToneEndingNumbersThree(
  token1: string,
  token2: string,
  token3: string
) {
  return [
    getToneEndingNumber(token1),
    getToneEndingNumber(token2),
    getToneEndingNumber(token3),
  ];
}
