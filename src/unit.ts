import { TonalCombiningMetaplasm } from './metaplasm';
import { InflectionalEnding } from './tonal/lexeme';

export class Character {
  character: string;

  constructor(s: string) {
    this.character = s;
  }
}

class Characters {
  private carr: string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  private o: Map<string, Character> = new Map();

  constructor() {
    for (let e of this.carr) {
      this.assign(e);
    }
  }

  private assign(e: string) {
    this.o.set(e, new Character(e));
  }

  get(key: string): Character {
    let value = this.o.get(key);
    if (value) {
      return value;
    }
    return new Character('');
  }

  get size() {
    return this.o.size;
  }
}

export const characters = new Characters();

export abstract class Grapheme {}

export class AlphabeticGrapheme extends Grapheme {
  letter: AlphabeticLetter;

  constructor(letter: AlphabeticLetter) {
    super();
    this.letter = letter;
  }
}

export class Letter {
  literal: string = '';
}

export class AlphabeticLetter extends Letter {
  characters: Array<Character>;

  constructor(characters: Array<Character>) {
    super();
    this.characters = new Array();
    if (characters) {
      this.characters = characters;
      this.concat();
    }
  }

  pushCharacter(c: Character) {
    this.characters.push(c);
    this.concat();
  }

  protected concat() {
    this.literal = this.characters.map(x => (x ? x.character : '')).join('');
  }
}

export class MatchedSequence {
  characters: Array<Character> = new Array();
  get matchedLength() {
    return this.characters.length;
  }
  toString() {
    let str = '';
    for (let i in this.characters) {
      str += this.characters[i].character;
    }
    return str;
  }
}

export class Letters {
  private arr: string[];
  protected o = new Map<string, AlphabeticLetter>();

  constructor(larr: string[]) {
    this.arr = larr;
    for (let i = 0; i < this.arr.length; i++) {
      this.assign(this.arr[i]);
    }
  }

  private assign(e: string) {
    let carr: Character[] = [];
    for (let i = 0; i < e.length; i++) {
      let c = characters.get(e[i]);
      if (c) {
        carr.push(c);
      }
    }
    this.o.set(e, new AlphabeticLetter(carr));
  }

  get(key: string): AlphabeticLetter {
    let value = this.o.get(key);
    if (value) {
      return value;
    }
    return new AlphabeticLetter([]);
  }

  get size() {
    return this.o.size;
  }

  get values() {
    return this.o.values();
  }
}

/** Turn a string into graphemes. */
export class GraphemeMaker {
  private list: Array<AlphabeticLetter>;

  constructor(lowerLetters: Letters) {
    this.list = new Array();
    this.list = Array.from(lowerLetters.values);
  }

  makeGraphemes(str: string) {
    const characters = new Array();
    if (str) {
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != '\0') {
          characters.push(new Character(str.charAt(i)));
        }
      }
    }

    let graphemes = this.make(characters);
    return graphemes;
  }

  private getMatchedSequence(
    characters: Array<Character>,
    beginOfLetter: number,
    candidates: Array<AlphabeticLetter>
  ) {
    let ms = new MatchedSequence();
    let matchedLen = 0;

    //console.log(characters)
    if (characters[beginOfLetter].character === 'n') {
      // TODO: need to be broken down into two routines
      if (
        characters.length - beginOfLetter >= 'nng'.length &&
        this.list.length == 43
      ) {
        if (
          characters[beginOfLetter].character === 'n' &&
          characters[beginOfLetter + 1].character === 'n' &&
          characters[beginOfLetter + 2].character === 'g'
        ) {
          // at the beginning of a letter, we should always prefer 'n' to 'nn'
          // 'nn' is not able to begin a syllable
          // 'ng' has higher associativity than 'nn' when in 'nng'
          // special case for 'nng'

          // copy the matched letter
          ms.characters[0] = new Character('n');
          return ms;
        }
      } else if (
        characters.length - beginOfLetter >= 'ng'.length &&
        this.list.length == 26
      ) {
        if (
          characters[beginOfLetter].character === 'n' &&
          characters[beginOfLetter + 1].character === 'g'
        ) {
          // handling final n and initial ng in kana
          ms.characters[0] = new Character('n');
          return ms;
        }
      }
    }

    for (let j in candidates) {
      let min = Math.min(
        characters.length - beginOfLetter,
        candidates[j].literal.length
      );
      if (candidates[j].literal.length == min) {
        for (let k = 0; k < min; k++) {
          if (
            characters[beginOfLetter + k].character === candidates[j].literal[k]
          ) {
            if (k + 1 == min && min > matchedLen) {
              // to make sure it is longer than previous patterns
              // last letter matched for the pattern
              matchedLen = min;
              // copy the matched letters
              for (let q = 0; q < matchedLen; q++) {
                ms.characters[q] = characters[beginOfLetter + q];
              }
            }
          } else {
            break;
          }
        }
      }
    }
    return ms;
  }

  private make(characters: Array<Character>) {
    let graphemes: Array<AlphabeticGrapheme> = new Array();
    //console.log("metadata letter array length %d. ", letters.length);
    let beginOfLetter: number = 0;
    let letters: Array<AlphabeticLetter> = new Array();
    for (let i = 0; i < characters.length; i++) {
      //console.log("examining character: %s. length of characters: %d", characters[i].symbol, characters.length);
      //console.log("metadata letter array looping.");

      if (i - beginOfLetter == 0) {
        //console.log("matchedLen: %d", ms.matchedLength);

        let candidates = this.list.filter(
          l => l.characters[0].character === characters[i].character
        );

        let ms = this.getMatchedSequence(characters, beginOfLetter, candidates);

        if (ms.matchedLength > 0) {
          for (let key in candidates) {
            //console.log(candidates[key].literal + ' - ' + ms.toString())
            if (
              candidates[key].literal ===
              new AlphabeticLetter(ms.characters).literal
            ) {
              letters.push(candidates[key]);
            }
          }
        }
      }

      if (letters.length == 0) {
        for (let j in characters) {
          //console.log(characters[j].character)
        }
        // 'length of letters is zero'
      } else if (letters.length == 1) {
        //console.log("just one matched. i:%d. ls[0].characters.length:%d. ls[0]:", i, ls[0].characters.length, ls[0])
        //console.log("just one matched. i:%d. ls[0].characters.length:%d", i, ls[0].characters.length);
        if (i + 1 - beginOfLetter == letters[0].characters.length) {
          // when index i plus one equals the length of the matched syllable
          let l = letters.shift();
          if (l) {
            beginOfLetter += l.characters.length;
            // pack letters into sounds
            let gr = new AlphabeticGrapheme(l);
            graphemes.push(gr);
          }
        }
      }
    }

    //console.log("metadata letter array length %d", letters.length);
    return graphemes;
  }
}

export class Sound {
  name: string = '';
  // an array of character objects. can be used to make a word object.
  characters: Array<Character> = new Array();

  // we still need a method for combinning characters from each character objects.
  // this is different from an array of character objects. it is a string.
  toString() {
    let l: string = '';
    // there is no characters for 1st tone
    if (this.characters != null) {
      // when it is not 1st tone
      for (let k in this.characters) {
        l += this.characters[k].character;
      }
    }

    return l;
  }

  makeCharacters(str: string) {
    let arr: Array<Character> = new Array();
    for (let i = 0; i < str.length; i++) {
      arr.push(new Character(str[i]));
    }
    return arr;
  }
}

export class SetOfSounds {
  sounds = new Array<Sound>();
  includes(str: string) {
    for (let i in this.sounds) {
      if (str && this.sounds[i] && str === this.sounds[i].toString())
        return true;
    }
    return false;
  }
}

export const sgPipe = (
  ...fns: Array<(sg: SoundGeneration) => SoundGeneration>
) => (x: SoundGeneration) => fns.reduce((v, f) => f(v), x);

/** Sound generation for syllable compositions. */
export class SoundGeneration {
  /** The letters to be matched. */
  letters: string[] = [];
  /** Matched sounds accumulator. */
  sounds: Sound[] = new Array<Sound>();
  /** Indicator of syllable matching process. */
  matching: boolean = true;
  /** Will populate `predictions` when set to true. */
  predictive: boolean = false;
  /** Predicted sounds */
  predictions: Array<Sound[]> = new Array();
  predictEuphonicFinal: boolean = false;
}

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

export abstract class Lexeme {}

export class Word {
  literal: string = '';
}

export abstract class LexemeMaker {
  protected abstract make(ms: Array<Morpheme>): Lexeme;
}

export class ToneGroup {
  inflectionalEndings: Array<InflectionalEnding> = new Array();
}

class ToneSandhiGroup extends ToneGroup {}

export abstract class Phraseme {}

export class Phrase {
  literal: string = '';
}
