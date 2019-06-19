import { Character } from './character';
import { Result, NoSuccess, Success } from './result';
import { Debug } from './debug'

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

export interface ILetters {
    readonly [index: string]: AlphabeticLetter
}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {}

export class AlphabeticGrapheme extends Grapheme {
    letter: AlphabeticLetter

    constructor(letter?: AlphabeticLetter) {
        super();
        this.letter = letter;
    }
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter {
    literal: string = '';
}

export class AlphabeticLetter extends Letter {
    characters: Array<Character>;

    constructor(characters?: Array<Character>) {
        super();
        this.characters = new Array();
        if(characters != null) {
            let len = characters.length;
            for(var i = 0; i < len; i++) {
                this.pushCharacter(characters[i]);
            }
        }
    }

    pushCharacter(c: Character){
        this.characters.push(c);
        this.literal += c.character;
    }
}

export class MatchedSequence {
    characters: Array<Character> = new Array();
    get matchedLength() { return this.characters.length; }
    toString() {
        let str = ''
        for(let i in this.characters) {
            str += this.characters[i].character
        }
        return str
    }
}

//------------------------------------------------------------------------------
//  Grapheme Maker
//------------------------------------------------------------------------------

export class GraphemeMaker {
    characters: Array<Character>;
    list: Array<AlphabeticLetter>;

    constructor(l: string, lowerLetters: ILetters) {
        this.characters = new Array();
        let len = l.length;
        for(var i = 0; i < len; i++) {
            if(l.charAt(i) != '\0') {
                this.characters.push(new Character(l.charAt(i)));
            }
        }

        this.list = new Array();

        for(let key in lowerLetters) {
            this.list.push(lowerLetters[key])
        }
    }

    makeGraphemes() {
        let graphemes = this.make(this.characters);
        return graphemes;
    }

    getMatchedSequence(characters: Array<Character>, beginOfLetter: number, candidates: Array<AlphabeticLetter>) {
        let ms = new MatchedSequence();
        let matchedLen = 0;

        if(characters[beginOfLetter].character === 'n') {
            if(characters.length-beginOfLetter >= 'nng'.length) {
                if(characters[beginOfLetter].character === 'n'
                    && characters[beginOfLetter+1].character === 'n'
                    && characters[beginOfLetter+2].character === 'g') {
                    // at the beginning of a letter, we should always prefer 'n' to 'nn'
                    // 'nn' is not able to begin a syllable
                    // 'ng' has higher associativity than 'nn' when in 'nng'
                    // special case for 'nng'

                    // copy the matched letter
                    ms.characters[0] = new Character('n')
                    return ms
                }
            }
        }

        for(let j in candidates) {
            let min = Math.min(characters.length-beginOfLetter, candidates[j].literal.length);
            if(candidates[j].literal.length == min) {
                for(let k = 0; k < min; k++) {
                    if(characters[beginOfLetter+k].character === candidates[j].literal[k] ) {
                        if(k+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                ms.characters[q] = characters[beginOfLetter+q];
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return ms
    }

    make(characters: Array<Character>) {
        let graphemes: Array<AlphabeticGrapheme> = new Array();
        let result: Result
        let debug: Debug = new Debug()
        //console.log("metadata letter array length %d. ", letters.length);
        //console.log(characters);
        let beginOfLetter: number = 0;
        let letters: Array<AlphabeticLetter> = new Array();
        for(let i = 0; i < characters.length; i++) {
            //console.log("examining character: %s. length of characters: %d", characters[i].symbol, characters.length);
            //console.log("metadata letter array looping.");

            if(i-beginOfLetter == 0) {

                //console.log("matchedLen: %d", ms.matchedLength);

                let candidates = this.list.filter(l => l.characters[0].character === characters[i].character);

                //console.log(candidates)

                let ms = this.getMatchedSequence(characters, beginOfLetter, candidates)

                if(ms.matchedLength > 0) {
                    for(let key in candidates) {
                        //console.log(candidates[key].literal + ' - ' + ms.toString())
                        if(candidates[key].literal === new AlphabeticLetter(ms.characters).literal) {
                            letters.push(candidates[key]);
                        }
                    }
                }
            }

            if(letters.length == 0) {
                for(let j in characters) {
                    debug.messages.push(`${characters[j].character}`)
                }
                debug.messages.push(`i: ${i}. characters[i].character: ${characters[i].character}`)
                result = new NoSuccess()
                result.messages.push('length of letters is zero')
            } else if(letters.length == 1) {
                //console.log("just one matched. i:%d. ls[0].characters.length:%d. ls[0]:", i, ls[0].characters.length, ls[0])
                //console.log("just one matched. i:%d. ls[0].characters.length:%d", i, ls[0].characters.length);
                if(i+1-beginOfLetter == letters[0].characters.length) {
                    // when index i plus one equals the length of the matched syllable
                    let l = letters.shift();
                    beginOfLetter +=  l.characters.length;
                    // pack letters into sounds
                    let gr = new AlphabeticGrapheme(l);
                    graphemes.push(gr);
                }
                result = new Success()
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        return graphemes
    }
}

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Sound {
    name: string
    // an array of character objects. can be used to make a word object.
    characters: Array<Character> = null

    // we still need a method for combinning characters from each character objects.
    // this is different from an array of character objects. it is a string.
    getLiteral() {
        let l: string = '';
        // there is no characters for 1st tone
        if(this.characters != null) {
            // when it is not 1st tone
            for(let k in this.characters) {
                l += this.characters[k].character;
            }
        }

        return l;
    }
}

export class Initial extends Sound {name = 'initial'}
export class Medial extends Sound {name = 'medial'}
export class Final extends Sound {name = 'final'}
export class Nasal extends Sound {name = 'nasalization'}
export class Tonal extends Sound {
    name = 'tonal'
    isEqualToTonal(tonal: Tonal) {
        if(this.getLiteral() === tonal.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeTonal extends Tonal {
    name = 'free tonal'
}
export class CheckedTonal extends Tonal {
    name = 'checked tonal'
}

export class StopFinal extends Final {name = 'stop final'}
export class NasalFinal extends Final {name = 'nasal final'}

export class SetOfSounds {
    beginWith(str: string) {
        if(str.search(new RegExp(this.toString())) == 0) return true
        return false
    }

    toRegexString(elements: Array<Sound>) {
        let str = '';
        for(let i = 0; i < elements.length; i++) {
            if(i+1 < elements.length) {
                for(let k in elements[i].characters) {
                    str += elements[i].characters[k].character;
                }
                str += '|';
            } else if(i+1 == elements.length) {
                for(let k in elements[i].characters) {
                    str += elements[i].characters[k].character;
                }
            }
        }
        return str;
    }
}
