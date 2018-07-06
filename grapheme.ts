
//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {

}

class GrphemeP extends Grapheme {
    initial: InitialP
    final: FinalP
    tonemark: ToneMarkP
}

class Initial {}
class Medial {}
class Final {}
class Nasal {}
class ToneMark {}
class ZeroToneMark {}

class InitialP extends Initial {
    letter = lowerLetters['p'];
}

class FinalP extends Final {}
class ToneMarkP extends ToneMark {}

class InitialNG extends Initial {}
class MedialNG extends Medial {}
class NasalNG extends Nasal {}

import { GrammaticalUnit } from './expression';
import { Character, characters } from './character';
import { Context } from './context';

//------------------------------------------------------------------------------
//  Initial, Medial, Nasal, Final Consonant, Tone Mark
//------------------------------------------------------------------------------

export class LetterFilters {
    nonNasalNonFinalInitialLetters: string = lowerLetters['c'].literal + '|' +
                                        lowerLetters['j'].literal + '|' +
                                        lowerLetters['l'].literal + '|' +
                                        lowerLetters['q'].literal + '|' +
                                        lowerLetters['s'].literal + '|' +
                                        lowerLetters['v'].literal + '|' +
                                        lowerLetters['z'].literal;

    initialNeutralLetterH: string = lowerLetters['h'].literal;

    nasalInitialLetters: string = lowerLetters['m'].literal + '|' +
                                    lowerLetters['n'].literal + '|' +
                                    lowerLetters['ng'].literal;

    medialLetters: string = lowerLetters['a'].literal + '|' +
                            lowerLetters['e'].literal + '|' +
                            lowerLetters['i'].literal + '|' +
                            lowerLetters['o'].literal + '|' +
                            lowerLetters['u'].literal + '|' +
                            lowerLetters['ur'].literal;

    nasalMedialLetters: string = lowerLetters['m'].literal + '|' +
                            lowerLetters['ng'].literal;

    nasalLetters: string = lowerLetters['m'].literal + '|' +
                            lowerLetters['n'].literal + '|' +
                            lowerLetters['ng'].literal + '|' +
                            lowerLetters['nn'].literal;

    neutralFinalLetterH: string = lowerLetters['h'].literal;
                    
    neutralFinalLetters: string = lowerLetters['h'].literal + '|' +
                                  lowerLetters['f'].literal;
    
    neutralToneMarkLetterX: string = lowerLetters['x'].literal;
    
    neutralToneMarkLetterY: string = lowerLetters['y'].literal;

    checkedFinalLetters: string = lowerLetters['p'].literal + '|' +
                                    lowerLetters['t'].literal + '|' +
                                    lowerLetters['k'].literal + '|' +
                                    lowerLetters['b'].literal + '|' +
                                    lowerLetters['d'].literal + '|' +
                                    lowerLetters['g'].literal;

    checkedToneMarkLetters: string = this.checkedFinalLetters;

    initialCheckedLetters: string = this.checkedFinalLetters

    freeToneMarkLetters: string = lowerLetters['ss'].literal + '|' +
                                    lowerLetters['y'].literal + '|' +
                                    lowerLetters['w'].literal + '|' +
                                    lowerLetters['x'].literal + '|' +
                                    lowerLetters['xx'].literal + '|' +
                                    lowerLetters['xxx'].literal + '|' +
                                    lowerLetters['zs'].literal + '|' +
                                    lowerLetters['zzs'].literal;
                                    
    finalLetters: string = this.checkedFinalLetters + '|' +
                          this.neutralFinalLetters;

    initialLetters: string = this.nasalInitialLetters + '|' +
                                this.nonNasalNonFinalInitialLetters + '|' +
                                this.initialCheckedLetters + '|' +
                                this.initialNeutralLetterH;

    finalToneMarkLetters: string = this.checkedToneMarkLetters + '|' +
                                    this.neutralFinalLetters + '|' +
                                    this.neutralToneMarkLetterX + '|' +
                                    this.neutralToneMarkLetterY;
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter extends GrammaticalUnit {
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

class AbstractLetterFactory {}

export class AlphabetFactory extends AbstractLetterFactory {}

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
                }

            }
        }
        //console.log("metadata letter array length %d", letters.length);
        //console.log(letters);
        return letters;
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

let list_of_rime_of_ziang_accent = [
    'ee', 'eeh', 'eef', 'eng', 'ek', 'eg', 'ionn', 'ionnh', 'ionnf', 
]

let list_of_rime_of_zuanx_accent = [
    'er', 'erh', 'erf', 'ere', 'ereh', 'eref', 'eru', 'ir', 'irh', 'irf', 'irinn', 'irm', 'irn', 'irng', 'irp', 'irt', 'ird', 'irk',
    'irg',
]
