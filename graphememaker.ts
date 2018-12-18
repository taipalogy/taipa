


import { Character, characters } from './character';
import { AlphabeticLetter, AlphabeticGrapheme, MatchedSequence } from './grapheme';

//------------------------------------------------------------------------------
//  Grapheme Maker
//------------------------------------------------------------------------------

export class GraphemeMaker {
    characters: Array<Character>;
    list: Array<AlphabeticLetter>;

    constructor(l: string) {
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
        //let ls = new Letters();
        let graphemes = this.make(this.characters);//ls.process(this.characters);
        return graphemes;
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
                    if(characters[i+n].character.search(this.list[m].literal[n]) == 0) {
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

    make(characters: Array<Character>): Array<AlphabeticGrapheme> {
        
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

                let candidates = this.list.filter(l => l.characters[0].character === characters[i].character);

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
                for(let j in characters) {
                    console.log(characters[j])
                }
                console.log("i: %d. characters[i].symbol: %s", i, characters[i].character);
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
    // voiced d
    'dr': new AlphabeticLetter([characters['d'], characters['r']]),
}
