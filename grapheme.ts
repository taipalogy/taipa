

import { GrammaticalUnit } from './expression';
import { Character, characters } from './character';
import { Context } from './context';

//------------------------------------------------------------------------------
//  Graph
//------------------------------------------------------------------------------

export class Graph {
    letter: AlphabeticLetter

    isLetterNull() {
        if(this.letter == null) {
            return true;
        }
        return false;
    }

    isEqualTo(letter: AlphabeticLetter) {
        if(letter.literal === this.letter.literal) {
            return true;
        }
        return false;
    }

    toString() {
        if(this.letter != null) {
            return this.letter.literal;
        }
        return '';
    }
}

export class Initial extends Graph {}
export class Medial extends Graph {}
export class Final extends Graph {}
export class Nasal extends Graph {}
export class ToneMark extends Graph {}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {}

class AlphabeticGrpheme extends Grapheme {}

export class Sound extends AlphabeticGrpheme {
    letter: AlphabeticLetter
    
    constructor(letter?: AlphabeticLetter) {
        super();
        this.letter = letter;
    }
}

//------------------------------------------------------------------------------
//  Initial, Medial, Nasal, Final Consonant, Tone Mark
//------------------------------------------------------------------------------

export class MedialA extends Initial {letter = lowerLetters['a']}
export class MedialE extends Initial {letter = lowerLetters['e']}
export class MedialI extends Initial {letter = lowerLetters['i']}
export class MedialO extends Initial {letter = lowerLetters['o']}
export class MedialU extends Initial {letter = lowerLetters['u']}
export class MedialUR extends Initial {letter = lowerLetters['ur']}

export class NasalInitialM extends Initial {letter = lowerLetters['m']}
export class NasalInitialN extends Initial {letter = lowerLetters['n']}
export class NasalInitialNG extends Initial {letter = lowerLetters['ng']}

export class InitialC extends Initial {letter = lowerLetters['c']}
export class InitialJ extends Initial {letter = lowerLetters['j']}
export class InitialL extends Initial {letter = lowerLetters['l']}
export class InitialQ extends Initial {letter = lowerLetters['q']}
export class InitialS extends Initial {letter = lowerLetters['s']}
export class InitialV extends Initial {letter = lowerLetters['v']}
export class InitialZ extends Initial {letter = lowerLetters['z']}

export class InitialP extends Initial {letter = lowerLetters['p']}
export class InitialT extends Initial {letter = lowerLetters['t']}
export class InitialK extends Initial {letter = lowerLetters['k']}
export class InitialB extends Initial {letter = lowerLetters['b']}
export class InitialD extends Initial {letter = lowerLetters['d']}
export class InitialG extends Initial {letter = lowerLetters['g']}

export class InitialH extends Initial {letter = lowerLetters['h']}

export class NasalM extends Initial {letter = lowerLetters['m']}
export class NasalN extends Initial {letter = lowerLetters['n']}
export class NasalNG extends Initial {letter = lowerLetters['ng']}
export class NasalNN extends Initial {letter = lowerLetters['nn']}

export class ZeroToneMark extends ToneMark {letter = null;}

export class ToneMarkZS extends ToneMark {letter = lowerLetters['zs']}
export class ToneMarkW extends ToneMark {letter = lowerLetters['w']}
export class ToneMarkSS extends ToneMark {letter = lowerLetters['ss']}
export class ToneMarkXX extends ToneMark {letter = lowerLetters['xx']}
export class ToneMarkXXX extends ToneMark {letter = lowerLetters['xxx']}
export class ToneMarkZZS extends ToneMark {letter = lowerLetters['zzs']}

export class ToneMarkP extends ToneMark {letter = lowerLetters['p']}
export class ToneMarkT extends ToneMark {letter = lowerLetters['t']}
export class ToneMarkK extends ToneMark {letter = lowerLetters['k']}
export class ToneMarkH extends ToneMark {letter = lowerLetters['h']}
export class ToneMarkB extends ToneMark {letter = lowerLetters['b']}
export class ToneMarkD extends ToneMark {letter = lowerLetters['d']}
export class ToneMarkG extends ToneMark {letter = lowerLetters['g']}
export class ToneMarkF extends ToneMark {letter = lowerLetters['f']}

export class ToneMarkX extends ToneMark {letter = lowerLetters['x']}
export class ToneMarkY extends ToneMark {letter = lowerLetters['y']}

export class FinalP extends Final {letter = lowerLetters['p']}
export class FinalT extends Final {letter = lowerLetters['t']}
export class FinalK extends Final {letter = lowerLetters['k']}
export class FinalH extends Final {letter = lowerLetters['h']}
export class FinalB extends Final {letter = lowerLetters['b']}
export class FinalD extends Final {letter = lowerLetters['d']}
export class FinalG extends Final {letter = lowerLetters['g']}
export class FinalF extends Final {letter = lowerLetters['f']}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter {
    literal: string = '';
    evaluate(context: Context){}
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
        this.literal += c.symbol;
    }
}

class MatchedSequence {
    characters: Array<Character> = new Array();
    get matchedLength() { return this.characters.length; }
}

export class Letters {
    list: Array<AlphabeticLetter>;
    constructor() {
        this.list = new Array();

        for(let key in lowerLetters) {
            this.list.push(lowerLetters[key])
        }

    }

    get length() {
        return this.list.length;
    }

    getMatchedSequence(characters: Array<Character>, i: number, beginOfLetter: number) {
        let ms = new MatchedSequence();
        let matchedLen = 0;
        for(let m in this.list) {
            let min = Math.min(characters.length-beginOfLetter, this.list[m].literal.length);
            //console.log("min: %d", min)
            if(this.list[m].literal.length == min) {
                for(let n = 0; n < min; n++) {
                    //console.log("i: %d. n: %d.", i, n)
                    //console.log(letters)
                    if(characters[i+n].symbol.search(this.list[m].literal[n]) == 0) {
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                ms.characters[q] = characters[i+q];
                            }
                            //console.log(this.list[m])
                            //console.log(characters[i+n].symbol)
                            //console.log(new RegExp(sp.list[m][n]))
                            //console.log(matchedLen)    
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return ms;
    }

    match(characters: Array<Character>) {
        
        let letters: Array<AlphabeticLetter> = new Array();
        let sounds: Array<Sound> = new Array();
        //console.log("metadata letter array length %d. ", letters.length);
        //console.log(characters);
        let beginOfLetter: number = 0;
        let ltts: Array<AlphabeticLetter> = new Array();
        for(let i = 0; i < characters.length; i++) {
            //console.log("examining character: %s. length of characters: %d", characters[i].symbol, characters.length);
            //console.log("metadata letter array looping.");
            
            if(i-beginOfLetter == 0) {
                let ms = this.getMatchedSequence(characters, i, beginOfLetter);
                //console.log("matchedLen: %d", ms.matchedLength);
                //console.log(ms.characters)

                let candidates = this.list.filter(l => l.characters[0].symbol === characters[i].symbol);

                //console.log(candidates)

                if(ms.matchedLength > 0) {
                    for(let key in candidates) {
                        if(candidates[key].literal === new AlphabeticLetter(ms.characters).literal) {
                            ltts.push(candidates[key]);
                        }
                    }
                }
            } else {

            }

            //console.log(ls);
            if(ltts.length == 0) {
                console.log("i: %d. characters[i].symbol: %s", i, characters[i].symbol);
                console.log("something wrong");
            } else if(ltts.length == 1) {
                //console.log("just one matched. i:%d. ls[0].characters.length:%d. ls[0]:", i, ls[0].characters.length, ls[0])
                //console.log("just one matched. i:%d. ls[0].characters.length:%d", i, ls[0].characters.length);
                if(i+1-beginOfLetter == ltts[0].characters.length) {
                    // when index i plus one equals the length of the matched syllable
                    let tmp = ltts.shift();
                    beginOfLetter +=  tmp.characters.length;
                    letters.push(tmp);
                    // pack letters into sounds
                    let sound = new Sound(tmp);
                    sounds.push(sound);
                }

            }
        }
        //console.log("metadata letter array length %d", letters.length);
        //console.log(letters);
        //return letters;
        return sounds;
    }
}

interface ILetters {
    readonly [index: string]: AlphabeticLetter
}

export let lowerLetters: ILetters = {
    // medials
    'a': new AlphabeticLetter([characters['a']]),
    'e': new AlphabeticLetter([characters['e']]),
    'i': new AlphabeticLetter([characters['i']]),
    'o': new AlphabeticLetter([characters['o']]),
    'u': new AlphabeticLetter([characters['u']]),
    'ur': new AlphabeticLetter([characters['u'], characters['r']]),

    // initials excludes checked finals and neutral finals
    'c': new AlphabeticLetter([characters['c']]),
    'j': new AlphabeticLetter([characters['j']]),
    'l': new AlphabeticLetter([characters['l']]),
    'q': new AlphabeticLetter([characters['q']]),
    's': new AlphabeticLetter([characters['s']]),
    'v': new AlphabeticLetter([characters['v']]),
    'z': new AlphabeticLetter([characters['z']]),

    // initials and nasals
    'm': new AlphabeticLetter([characters['m']]),
    'n': new AlphabeticLetter([characters['n']]),
    'ng': new AlphabeticLetter([characters['n'], characters['g']]),
    
    // nasal
    'nn': new AlphabeticLetter([characters['n'], characters['n']]),

    // free tone marks
    'ss': new AlphabeticLetter([characters['s'], characters['s']]),
    'w': new AlphabeticLetter([characters['w']]),
    'xx': new AlphabeticLetter([characters['x'], characters['x']]),
    'xxx': new AlphabeticLetter([characters['x'], characters['x'], characters['x']]),
    'zs': new AlphabeticLetter([characters['z'], characters['s']]),
    'zzs': new AlphabeticLetter([characters['z'], characters['z'], characters['s']]),

    // free tone mark, checked tone mark
    'x': new AlphabeticLetter([characters['x']]),

    // free tone mark, neutral tone mark
    'y': new AlphabeticLetter([characters['y']]),

    // initials, checked tone marks, and finals
    'b': new AlphabeticLetter([characters['b']]),
    'd': new AlphabeticLetter([characters['d']]),
    'g': new AlphabeticLetter([characters['g']]),
    'k': new AlphabeticLetter([characters['k']]),
    'p': new AlphabeticLetter([characters['p']]),
    't': new AlphabeticLetter([characters['t']]),
    
    // neutral final
    'f': new AlphabeticLetter([characters['f']]),

    // initial and final
    'h': new AlphabeticLetter([characters['h']]),
}

let ziangLetters: ILetters = {
    // medial
    'ee': new AlphabeticLetter([characters['e'], characters['e']]),
    'or': new AlphabeticLetter([characters['o'], characters['r']]),
}

let zuanxLetters: ILetters = {
    // medial
    'er': new AlphabeticLetter([characters['e'], characters['r']]),
    'ir': new AlphabeticLetter([characters['i'], characters['r']]),
}

let consonantLetters: ILetters = {
    // voiced l
    'lr': new AlphabeticLetter([characters['l'], characters['r']]),
    // voiced d
    'dr': new AlphabeticLetter([characters['d'], characters['r']]),
    // palatal
    'gn': new AlphabeticLetter([characters['g'], characters['n']]),
}
