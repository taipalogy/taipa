


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

    getMatchedSequence(characters: Array<Character>, beginOfLetter: number) {
        let ms = new MatchedSequence();
        let matchedLen = 0;
        for(let j in this.list) {
            let min = Math.min(characters.length-beginOfLetter, this.list[j].literal.length);
            //console.log("min: %d", min)
            if(this.list[j].literal.length == min) {
                for(let k = 0; k < min; k++) {
                    //console.log("i: %d. k: %d.", i, k)
                    if(characters[beginOfLetter+k].character.search(this.list[j].literal[k]) == 0) {
                        if(k == 0 && characters[0].character === 'n') {
                            if(this.list[j].literal === 'nn') {
                                // at the beginning of a letter, we should always prefer 'n' to 'nn'
                                // 'nn' is not able to begin a syllable
                                // 'ng' has higher associativity than 'nn' when in 'nng'
                                
                                matchedLen = 1;
                                // copy the matched letter
                                ms.characters[0] = new Character('n')
                                //console.log(this.list[j].literal + '-')
                                break
                            }
                        }

                        if(k+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                ms.characters[q] = characters[beginOfLetter+q];
                            }
                            //console.log(this.list[j].literal + '+')
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
                let ms = this.getMatchedSequence(characters, beginOfLetter);
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
                    let l = ltts.shift();
                    beginOfLetter +=  l.characters.length;
                    letters.push(l);
                    // pack letters into sounds
                    let gr = new AlphabeticGrapheme(l);
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
    'a': new AlphabeticLetter([characters.get('a')]),
    'e': new AlphabeticLetter([characters.get('e')]),
    'i': new AlphabeticLetter([characters.get('i')]),
    'o': new AlphabeticLetter([characters.get('o')]),
    'u': new AlphabeticLetter([characters.get('u')]),
    'ur': new AlphabeticLetter([characters.get('u'), characters.get('r')]),

    // initials excludes checked finals and neutral finals
    'c': new AlphabeticLetter([characters.get('c')]),
    'j': new AlphabeticLetter([characters.get('j')]),
    'l': new AlphabeticLetter([characters.get('l')]),
    'q': new AlphabeticLetter([characters.get('q')]),
    's': new AlphabeticLetter([characters.get('s')]),
    'v': new AlphabeticLetter([characters.get('v')]),
    'z': new AlphabeticLetter([characters.get('z')]),

    // initials, medial, and nasal finals
    'm': new AlphabeticLetter([characters.get('m')]),
    'n': new AlphabeticLetter([characters.get('n')]),
    'ng': new AlphabeticLetter([characters.get('n'), characters.get('g')]),
    
    // nasal
    'nn': new AlphabeticLetter([characters.get('n'), characters.get('n')]),

    // free tone marks
    'ss': new AlphabeticLetter([characters.get('s'), characters.get('s')]),
    'w': new AlphabeticLetter([characters.get('w')]),
    'xx': new AlphabeticLetter([characters.get('x'), characters.get('x')]),
    'xxx': new AlphabeticLetter([characters.get('x'), characters.get('x'), characters.get('x')]),
    'zs': new AlphabeticLetter([characters.get('z'), characters.get('s')]),
    'zzs': new AlphabeticLetter([characters.get('z'), characters.get('z'), characters.get('s')]),

    // free tone mark, checked tone mark
    'x': new AlphabeticLetter([characters.get('x')]),

    // free tone mark, neutral tone mark
    'y': new AlphabeticLetter([characters.get('y')]),

    // initials, stop finals, and checked tone marks
    'b': new AlphabeticLetter([characters.get('b')]),
    'd': new AlphabeticLetter([characters.get('d')]),
    'g': new AlphabeticLetter([characters.get('g')]),
    'k': new AlphabeticLetter([characters.get('k')]),
    'p': new AlphabeticLetter([characters.get('p')]),
    't': new AlphabeticLetter([characters.get('t')]),
    
    // neutral final
    'f': new AlphabeticLetter([characters.get('f')]),

    // initial and neutral final
    'h': new AlphabeticLetter([characters.get('h')]),
}

let ziangLetters: ILetters = {
    // medial
    'ee': new AlphabeticLetter([characters.get('e'), characters.get('e')]),
    'or': new AlphabeticLetter([characters.get('o'), characters.get('r')]),
}

let zuanxLetters: ILetters = {
    // medial
    'er': new AlphabeticLetter([characters.get('e'), characters.get('r')]),
    'ir': new AlphabeticLetter([characters.get('i'), characters.get('r')]),
}

let consonantLetters: ILetters = {
    // voiced d
    'dr': new AlphabeticLetter([characters.get('d'), characters.get('r')]),
}
