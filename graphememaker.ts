


import { Character, characters } from './character';
import { AlphabeticLetter, AlphabeticGrapheme, MatchedSequence } from './grapheme';
import { lowerLetters } from './version2'

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

    make(characters: Array<Character>): Array<AlphabeticGrapheme> {
        let graphemes: Array<AlphabeticGrapheme> = new Array();
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
            } else {

            }

            if(letters.length == 0) {
                for(let j in characters) {
                    console.log(characters[j])
                }
                console.debug("i: %d. characters[i].symbol: %s", i, characters[i].character);
                console.error("something wrong. length of letters is zero");
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

            }
        }
        //console.log("metadata letter array length %d", letters.length);
        return graphemes;
    }
}

