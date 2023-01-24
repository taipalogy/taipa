import { Word, Syllable, AlphabeticLetter } from '../unit';
import { Allomorph } from '../tonal/tonalalphabet';
import { TonalAffix } from '../tonal/tonalalphabet';
import { Phrase } from '../unit';

export class TonalSyllable extends Syllable {
  popLetter() {
    this.letters = this.letters.slice(0, this.letters.length - 1);
    this.concat();
  }

  get lastLetter() {
    if (this.letters.length >= 1) return this.letters[this.letters.length - 1];
    return new AlphabeticLetter([]);
  }

  get lastSecondLetter() {
    if (this.letters.length >= 2) return this.letters[this.letters.length - 2];
    return new AlphabeticLetter([]);
  }
}

class Ending {}

export class InflectionalEnding extends Ending {
  affix: TonalAffix = new TonalAffix(); // the affix of this word
  toString() {
    return this.affix.toString();
  }
}

export class FreeInflectionalEnding extends InflectionalEnding {}

export class CheckedInflectionalEnding extends InflectionalEnding {}

export class AllomorphicEnding extends Ending {
  allomorph: Allomorph = new Allomorph();
  toString() {
    return this.allomorph.toString();
  }
}

export class FreeAllomorphicEnding extends AllomorphicEnding {}

export class CheckedAllomorphicEnding extends AllomorphicEnding {}
/** A word made of syllables. */

export class TonalWord extends Word {
  syllables: Array<TonalSyllable>;
  constructor(syllables: Array<TonalSyllable>) {
    super();
    this.syllables = new Array<TonalSyllable>();
    if (syllables != undefined) {
      this.syllables = syllables;
      this.concat();
    }
  }

  popSyllable() {
    this.syllables = this.syllables.slice(0, this.syllables.length - 1);
    this.concat();
  }

  pushSyllable(syllable: TonalSyllable) {
    this.syllables.push(syllable);
    this.concat();
  }

  shiftSyllable() {
    const syl = this.syllables.shift();
    this.concat();
    return syl;
  }

  unshiftSyllable(syllable: TonalSyllable) {
    const num = this.syllables.unshift(syllable);
    this.concat();
    return num;
  }

  replaceSyllable(i: number, syllable: TonalSyllable) {
    if (i < this.syllables.length) {
      this.syllables.splice(i, 1, syllable);
    }
    this.concat();
  }

  private concat() {
    this.literal = this.syllables.map(x => (x ? x.literal : '')).join('');
  }
}

/** A phrase made of words. */
export class TonalPhrase extends Phrase {
  words: Array<TonalWord>;

  constructor(words: Array<TonalWord>) {
    super();
    this.words = new Array();
    if (words) {
      this.words = words;
      this.concat();
    }
  }

  popWord() {
    // get rid off the last word from array
    this.words = this.words.slice(0, this.words.length - 1);
    this.concat();
  }

  pushWord(w: TonalWord) {
    this.words.push(w);
    this.concat();
  }

  private concat() {
    if (this.words.length > 0) {
      if (this.words.filter(x => x && x.literal.length > 0).length == 0) {
        this.literal = '';
      } else this.literal = this.words.map(x => (x ? x.literal : '')).join(' ');
    }
  }
}
