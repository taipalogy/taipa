import { Character, characters } from './character';

//------------------------------------------------------------------------------

class Grapheme {}

export class AlphabeticGrapheme extends Grapheme {
    letter: AlphabeticLetter;

    constructor(letter: AlphabeticLetter) {
        super();
        this.letter = letter;
    }
}

//------------------------------------------------------------------------------

export class Letter {
    literal: string = '';
}

export class AlphabeticLetter extends Letter {
    characters: Array<Character>;

    constructor(characters?: Array<Character>) {
        super();
        this.characters = new Array();
        if (characters != null) {
            let len = characters.length;
            for (var i = 0; i < len; i++) {
                this.pushCharacter(characters[i]);
            }
        }
    }

    pushCharacter(c: Character) {
        this.characters.push(c);
        this.literal += c.character;
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
    larr: string[];
    protected o = new Map<string, AlphabeticLetter>();

    constructor(larr: string[]) {
        this.larr = larr;
        for (let i = 0; i < this.larr.length; i++) {
            this.assign(this.larr[i]);
        }
    }

    protected assign(e: string) {
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

//------------------------------------------------------------------------------

export class GraphemeMaker {
    private list: Array<AlphabeticLetter>;

    constructor(lowerLetters: Letters) {
        this.list = new Array();
        this.list = Array.from(lowerLetters.values);
    }

    makeGraphemes(str: string) {
        const characters = new Array();
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) != '\0') {
                characters.push(new Character(str.charAt(i)));
            }
        }

        let graphemes = this.make(characters);
        return graphemes;
    }

    private getMatchedSequence(
        characters: Array<Character>,
        beginOfLetter: number,
        candidates: Array<AlphabeticLetter>,
    ) {
        let ms = new MatchedSequence();
        let matchedLen = 0;

        //console.log(characters)
        if (characters[beginOfLetter].character === 'n') {
            if (characters.length - beginOfLetter >= 'nng'.length) {
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
            }
        }

        for (let j in candidates) {
            let min = Math.min(characters.length - beginOfLetter, candidates[j].literal.length);
            if (candidates[j].literal.length == min) {
                for (let k = 0; k < min; k++) {
                    if (characters[beginOfLetter + k].character === candidates[j].literal[k]) {
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

                let candidates = this.list.filter(l => l.characters[0].character === characters[i].character);

                let ms = this.getMatchedSequence(characters, beginOfLetter, candidates);

                if (ms.matchedLength > 0) {
                    for (let key in candidates) {
                        //console.log(candidates[key].literal + ' - ' + ms.toString())
                        if (candidates[key].literal === new AlphabeticLetter(ms.characters).literal) {
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

//------------------------------------------------------------------------------

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

export class SetOfSounds<T extends Sound> {
    sounds = new Array<T>();
    beginWith(str: string) {
        for (let i in this.sounds) {
            if (str.search(this.sounds[i].toString()) == 0 && str.length == this.sounds[i].toString().length)
                return true;
        }
        return false;
    }
}

//------------------------------------------------------------------------------

export const pipe = (...fns: Array<(sg: SoundGeneration) => SoundGeneration>) => (x: SoundGeneration) =>
    fns.reduce((v, f) => f(v), x);

export class SoundGeneration {
    letters: string[] = [];
    sounds = new Array<Sound>();
    bool: boolean = true;
}
