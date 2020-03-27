import { AlphabeticLetter, Sound } from './grapheme';
import { TonalCombiningMetaplasm } from './metaplasm';

export class MatchedPattern {
  letters: Array<AlphabeticLetter> = new Array();
  pattern: Array<Sound> = new Array();

  get matchedLength() {
    return this.letters.length;
  } // length of pattern can be optionally returned

  get lastLetter() {
    if (this.letters.length > 0) return this.letters[this.letters.length - 1];
    return new AlphabeticLetter([]);
  }

  get lastSecondLetter() {
    if (this.letters.length > 1) return this.letters[this.letters.length - 2];
    return new AlphabeticLetter([]);
  }
}

export abstract class Morpheme {}

export class Syllable {
  literal: string = '';

  letters: Array<AlphabeticLetter>;

  constructor(letters: Array<AlphabeticLetter>) {
    this.letters = new Array();
    if (letters) {
      this.letters = letters;
      this.concat();
    }
  }

  pushLetter(l: AlphabeticLetter) {
    this.letters.push(l);
    this.concat();
  }

  replaceLetter(i: number, l: AlphabeticLetter) {
    this.letters.splice(i, 1, l);
    this.concat();
  }

  insertLetter(i: number, l: AlphabeticLetter) {
    this.letters.splice(i, 0, l);
    this.concat();
  }

  protected concat() {
    this.literal = this.letters.map(x => (x ? x.literal : '')).join('');
  }
}

export abstract class MorphemeMaker {
  protected abstract createMorphemes(): Morpheme[];

  protected abstract createMorpheme(
    matched: MatchedPattern,
    metaplasm: TonalCombiningMetaplasm
  ): Morpheme;

  protected make(
    letters: Array<AlphabeticLetter>,
    syllabify: (
      letters: Array<AlphabeticLetter>,
      beginOfSyllable: number
    ) => MatchedPattern
  ): MatchedPattern[] {
    let patterns = new Array<MatchedPattern>();
    let beginOfSyllable: number = 0;
    for (let i = 0; i < letters.length; i++) {
      let msp: MatchedPattern = new MatchedPattern();
      if (i - beginOfSyllable == 0) {
        msp = syllabify(letters, beginOfSyllable);

        if (msp.matchedLength == 0) {
          //console.log('no matched syllables found. the syllable might need to be added')
        }

        //console.log("matchedLen: %d", msp.matchedLength);
        //console.log(msp.pattern);
        //console.log(msp.letters)

        if (msp.letters.length > 0) {
          for (let j in msp.letters) {
            //console.log("msp.letters: %s", msp.letters[j].literal)
          }
          patterns.push(msp);
        }

        beginOfSyllable += msp.matchedLength;
      }

      if (patterns.length == 0) {
        //console.log('nothing matched')
      } else if (patterns.length >= 1) {
        if (msp == undefined) break;

        if (msp.matchedLength > 0) {
          i += beginOfSyllable - i - 1;
        }
      }
    }

    return patterns;
  }
}
