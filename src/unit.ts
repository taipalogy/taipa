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
    for (const e of this.carr) {
      this.assign(e);
    }
  }

  private assign(e: string) {
    this.o.set(e, new Character(e));
  }

  get(key: string): Character {
    const value = this.o.get(key);
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

/** Letter is a subword unit. */
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
    for (const i in this.characters) {
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
    const carr: Character[] = [];
    for (let i = 0; i < e.length; i++) {
      let c = characters.get(e[i]);
      if (c) {
        carr.push(c);
      }
    }
    this.o.set(e, new AlphabeticLetter(carr));
  }

  handleN(
    characters: Character[],
    beginOfLetter: number,
    listLength: number
  ): MatchedSequence {
    return new MatchedSequence();
  }

  get(key: string): AlphabeticLetter {
    const value = this.o.get(key);
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
  private listOfLetters: Array<AlphabeticLetter> = new Array();

  constructor(private lowerLetters: Letters) {
    this.listOfLetters = Array.from(lowerLetters.values);
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

    const graphemes = this.make(characters);
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
      // ms = this.handler.handleN(
      ms = this.lowerLetters.handleN(
        characters,
        beginOfLetter,
        this.listOfLetters.length
      );
      if (ms.matchedLength > 0) return ms;
    }

    for (const j in candidates) {
      const min = Math.min(
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
    const graphemes: Array<AlphabeticGrapheme> = new Array();
    let beginOfLetter: number = 0;
    const letters: Array<AlphabeticLetter> = new Array();
    for (let i = 0; i < characters.length; i++) {
      // console.log('examining character: %s. length of characters: %d', characters[i].character, characters.length);
      //console.log("metadata letter array looping.");

      if (i - beginOfLetter == 0) {
        //console.log("matchedLen: %d", ms.matchedLength);

        // let candidates = this.list.filter(
        const candidates = this.listOfLetters.filter(
          l => l.characters[0].character === characters[i].character
        );

        const ms = this.getMatchedSequence(
          characters,
          beginOfLetter,
          candidates
        );

        if (ms.matchedLength > 0) {
          for (const key in candidates) {
            // console.log(candidates[key].literal + ' - ' + ms.toString());
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
        for (const j in characters) {
          //console.log(characters[j].character)
        }
        // 'length of letters is zero'
      } else if (letters.length == 1) {
        //console.log("just one matched. i:%d. ls[0].characters.length:%d. ls[0]:", i, ls[0].characters.length, ls[0])
        //console.log("just one matched. i:%d. ls[0].characters.length:%d", i, ls[0].characters.length);
        if (i + 1 - beginOfLetter == letters[0].characters.length) {
          // when index i plus one equals the length of the matched syllable
          const l = letters.shift();
          if (l) {
            beginOfLetter += l.characters.length;
            // pack letters into graphemes
            const gr = new AlphabeticGrapheme(l);
            graphemes.push(gr);
          }
        }
      }
    }

    //console.log("metadata letter array length %d", letters.length);
    return graphemes;
  }
}

/** The spelling tag of a given letter. */
export class PositionalLetter {
  // one member of TonalSpellingTags
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
    const arr: Array<Character> = new Array();
    for (let i = 0; i < str.length; i++) {
      arr.push(new Character(str[i]));
    }
    return arr;
  }
}

export const letterSequence = function (letters: PositionalLetter[]) {
  return {
    letters: letters,
    includes(str: string) {
      for (let i in this.letters) {
        if (str && this.letters[i] && str === this.letters[i].toString())
          return true;
      }
      return false;
    },
  };
};

// spelling generation
export const sgPipe = (
  ...fns: Array<(sg: PositionalLetterGeneration) => PositionalLetterGeneration>
) => (x: PositionalLetterGeneration) => fns.reduce((v, f) => f(v), x);

/** Positional letter generation for syllable compositions. */
export class PositionalLetterGeneration {
  /** The letters to be matched. */
  letters: string[] = [];
  /** Matched letters accumulator. */
  matchedLetters: PositionalLetter[] = new Array<PositionalLetter>();
  /** flag for syllable matching process. */
  matching: boolean = true;
  /** Will populate `predictions` when set to true. */
  predictive: boolean = false;
  /** Predicted positional letters */
  predictions: Array<PositionalLetter[]> = new Array();
  predictSandhiFinalConsonant: boolean = false;
}

export class MatchedPattern {
  letters: Array<AlphabeticLetter> = new Array();
  pattern: Array<PositionalLetter> = new Array();

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

/** Syllable is a subword unit. */
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

export function makeMatchedPatterns(
  letters: Array<AlphabeticLetter>,
  syllabify: (
    letters: Array<AlphabeticLetter>,
    beginOfSyllable: number
  ) => MatchedPattern
): MatchedPattern[] {
  const patterns = new Array<MatchedPattern>();
  let beginOfSyllable: number = 0;
  for (let i = 0; i < letters.length; i++) {
    let msp: MatchedPattern = new MatchedPattern();
    if (i - beginOfSyllable == 0) {
      msp = syllabify(letters, beginOfSyllable);

      if (msp.matchedLength == 0) {
        //console.log('no matched syllables found. the syllable might need to be added')
      }

      // console.log('matchedLen: %d', msp.matchedLength);
      // console.log(msp.pattern);
      // console.log(msp.letters);

      if (msp.letters.length > 0) {
        for (const j in msp.letters) {
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

export abstract class Lexeme {}

export class Word {
  literal: string = '';
}

export abstract class Phraseme {}

export class Phrase {
  literal: string = '';
}
