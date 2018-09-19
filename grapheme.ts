

import { Character, characters } from './character';
import { Context } from './context';
import { IDictionary, Dictionary } from './collection'

//------------------------------------------------------------------------------
//  Graph
//------------------------------------------------------------------------------

export class Graph {
    // an array of character objects. can be used to make a word object.
    characters: Array<Character> = null

    // we still need a method for combinning characters from each character objects.
    // this is different from an array of character objects. it is a string.
    getLiteral() {
        let l: string = '';
        // there is no characters for 1st tone
        if(this.characters != undefined) {
            // when it is not 1st tone
            for(let k in this.characters) {
                l += this.characters[k].symbol;
            }
        }

        return l;
    }

    isEqualTo(letter: AlphabeticLetter) {
        if(this.getLiteral() === letter.literal) {
            return true;
        }
        return false;
    }

    isCharacterNull() {
        if(this.characters == null) {
            return true;
        }
        return false;
    }

    toString() {
        if(this.characters != null) {
            return this.getLiteral();
        }
        return '';
    }
}

export class Initial extends Graph {}
export class Medial extends Graph {}
export class Final extends Graph {}
export class Nasal extends Graph {}
export class ToneMark extends Graph {
    isEqualToToneMark(toneMark: ToneMark) {
        if(this.getLiteral() === toneMark.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeToneMark extends ToneMark {}

export class CheckedToneMark extends ToneMark {}

//------------------------------------------------------------------------------
//  Initial, Medial, Nasal, Final Consonant, Tone Mark
//------------------------------------------------------------------------------

class MedialA extends Medial {characters = [characters['a']]}
class MedialE extends Medial {characters = [characters['e']]}
class MedialI extends Medial {characters = [characters['i']]}
class MedialO extends Medial {characters = [characters['o']]}
class MedialU extends Medial {characters = [characters['u']]}
class MedialUR extends Medial {characters = [characters['u'], characters['r']]}

class InitialNasalM extends Initial {characters = [characters['m']]}
class InitialNasalN extends Initial {characters = [characters['n']]}
class InitialNasalNG extends Initial {characters = [characters['n'], characters['g']]}

class InitialC extends Initial {characters = [characters['c']]}
class InitialJ extends Initial {characters = [characters['j']]}
class InitialL extends Initial {characters = [characters['l']]}
class InitialQ extends Initial {characters = [characters['q']]}
class InitialS extends Initial {characters = [characters['s']]}
class InitialV extends Initial {characters = [characters['v']]}
class InitialZ extends Initial {characters = [characters['z']]}

class InitialP extends Initial {characters = [characters['p']]}
class InitialT extends Initial {characters = [characters['t']]}
class InitialK extends Initial {characters = [characters['k']]}
class InitialB extends Initial {characters = [characters['b']]}
class InitialD extends Initial {characters = [characters['d']]}
class InitialG extends Initial {characters = [characters['g']]}

class InitialH extends Initial {characters = [characters['h']]}

class NasalM extends Nasal {characters = [characters['m']]}
class NasalN extends Nasal {characters = [characters['n']]}
class NasalNG extends Nasal {characters = [characters['n'], characters['g']]}
class NasalNN extends Nasal {characters = [characters['n'], characters['n']]}

export class ZeroToneMark extends FreeToneMark {characters = null;}

class ToneMarkZS extends FreeToneMark {characters = [characters['z'], characters['s']]}
class ToneMarkW extends FreeToneMark {characters = [characters['w']]}
class ToneMarkSS extends FreeToneMark {characters = [characters['s'], characters['s']]}
class ToneMarkXX extends FreeToneMark {characters = [characters['x'], characters['x']]}
class ToneMarkXXX extends FreeToneMark {characters = [characters['x'], characters['x'], characters['x']]}
class ToneMarkZZS extends FreeToneMark {characters = [characters['z'], characters['z'], characters['s']]}

class FreeToneMarkX extends FreeToneMark {characters = [characters['x']]}
class FreeToneMarkY extends FreeToneMark {characters = [characters['y']]}

class ToneMarkP extends CheckedToneMark {characters = [characters['p']]}
class ToneMarkT extends CheckedToneMark {characters = [characters['t']]}
class ToneMarkK extends CheckedToneMark {characters = [characters['k']]}
class ToneMarkH extends CheckedToneMark {characters = [characters['h']]}
class ToneMarkB extends CheckedToneMark {characters = [characters['b']]}
class ToneMarkD extends CheckedToneMark {characters = [characters['d']]}
class ToneMarkG extends CheckedToneMark {characters = [characters['g']]}
class ToneMarkF extends CheckedToneMark {characters = [characters['f']]}

class CheckedToneMarkX extends CheckedToneMark {characters = [characters['x']]}
class CheckedToneMarkY extends CheckedToneMark {characters = [characters['y']]}

class FinalP extends Final {characters = [characters['p']]}
class FinalT extends Final {characters = [characters['t']]}
class FinalK extends Final {characters = [characters['k']]}
class FinalH extends Final {characters = [characters['h']]}
class FinalB extends Final {characters = [characters['b']]}
class FinalD extends Final {characters = [characters['d']]}
class FinalG extends Final {characters = [characters['g']]}
class FinalF extends Final {characters = [characters['f']]}


interface IGraphDictionary extends IDictionary {
    values(): Graph[];
    toString(): string;
}

class GraphDictionary extends Dictionary {
    constructor(init: { key: string; value: Graph; }[]) {
        super(init);
    }

    values(): Graph[] {
        return this._values;
    }

    toString(): string {
        let str = '';
        let values = this.values();
        for(let i = 0; i < values.length; i++) {
            if(i+1 < values.length) {
                for(let c in values[i].characters) {
                    str += values[i].characters[c].symbol;
                }
                str += '|';
            } else if(i+1 == values.length) {
                for(let c in values[i].characters) {
                    str += values[i].characters[c].symbol;
                }
            }
        }
        return str;
    }

    toLookup(): IGraphDictionary {
        return this;
    }
}

export class MedialGraphs {
    readonly medials = new GraphDictionary([
        { key: 'a', value: new MedialA() },
        { key: 'e', value: new MedialE() },
        { key: 'i', value: new MedialI() },
        { key: 'o', value: new MedialO() },
        { key: 'u', value: new MedialU() },
        { key: 'ur', value: new MedialUR() },
    ]).toLookup();

    toString() {
        return this.medials.toString();
    }
}

export class NasalGraphs {
    readonly nasals = new GraphDictionary([
        { key: 'm', value: new NasalM() },
        { key: 'n', value: new NasalN() },
        { key: 'ng', value: new NasalNG() },
        { key: 'nn', value: new NasalNN() },
    ]).toLookup();

    toString() {
        return this.nasals.toString();
    }
}

export class FreeToneMarkGraphs {
    readonly freeToneMarks = new GraphDictionary([
        { key: 'ss', value: new ToneMarkSS() },
        { key: 'w', value: new ToneMarkW() },
        { key: 'xx', value: new ToneMarkXX() },
        { key: 'xxx', value: new ToneMarkXXX() },
        { key: 'zs', value: new ToneMarkZS() },
        { key: 'zzs', value: new ToneMarkZZS() },

        { key: 'x', value: new FreeToneMarkX() },
        { key: 'y', value: new FreeToneMarkY() },
    ]).toLookup();

    toString() {
        return this.freeToneMarks.toString();
    }
}

export class NeutralFinalGraphs {
    readonly neutralFinals = new GraphDictionary([
        { key: 'h', value: new FinalH() },
        { key: 'f', value: new FinalF() },
    ]).toLookup();

    toString() {
        return this.neutralFinals.toString();
    }
}

export class InitialNasalGraphs {
    readonly initialNasals = new GraphDictionary([
        { key: 'm', value: new InitialNasalM() },
        { key: 'n', value: new InitialNasalN() },
        { key: 'ng', value: new InitialNasalNG() },
    ]).toLookup();

    toString() {
        return this.initialNasals.toString();
    }
}

export class InitialGraphs {
    readonly initials = new GraphDictionary([
        { key: 'c', value: new InitialC() },
        { key: 'j', value: new InitialJ() },
        { key: 'l', value: new InitialL() },
        { key: 'q', value: new InitialQ() },
        { key: 's', value: new InitialS() },
        { key: 'v', value: new InitialV() },
        { key: 'z', value: new InitialZ() },

        { key: 'p', value: new InitialP() },
        { key: 't', value: new InitialT() },
        { key: 'k', value: new InitialK() },
        { key: 'b', value: new InitialB() },
        { key: 'd', value: new InitialD() },
        { key: 'g', value: new InitialG() },

        { key: 'm', value: new InitialNasalM() },
        { key: 'n', value: new InitialNasalN() },
        { key: 'ng', value: new InitialNasalNG() },

        { key: 'h', value: new InitialH()},
    ]).toLookup();

    toString() {
        return this.initials.toString();
    }
}

export class CheckedToneMarkGraphs {
    readonly checkedToneMarks = new GraphDictionary([
        { key: 'p', value: new ToneMarkP() },
        { key: 't', value: new ToneMarkT() },
        { key: 'k', value: new ToneMarkK() },
        { key: 'b', value: new ToneMarkB() },
        { key: 'd', value: new ToneMarkD() },
        { key: 'g', value: new ToneMarkG() },

        { key: 'h', value: new ToneMarkH() },
        { key: 'f', value: new ToneMarkF() },

        { key: 'x', value: new CheckedToneMarkX() },
        { key: 'y', value: new CheckedToneMarkY() },
    ]).toLookup();

    toString() {
        return this.checkedToneMarks.toString();
    }
}

export class FinalGraphs {
    readonly finals = new GraphDictionary([
        { key: 'p', value: new FinalP() },
        { key: 't', value: new FinalT() },
        { key: 'k', value: new FinalK() },
        { key: 'b', value: new FinalB() },
        { key: 'd', value: new FinalD() },
        { key: 'g', value: new FinalG() },

        { key: 'h', value: new FinalH() },
        { key: 'f', value: new FinalF() },
    ]).toLookup();

    toString() {
        return this.finals.toString();
    }
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

    process(characters: Array<Character>) {
        
        let letters: Array<AlphabeticLetter> = new Array();
        let graphemes: Array<AlphabeticGrapheme> = new Array();
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
                    let gr = new AlphabeticGrapheme(tmp);
                    graphemes.push(gr);
                }

            }
        }
        //console.log("metadata letter array length %d", letters.length);
        //console.log(letters);
        return graphemes;
    }
}

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

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
