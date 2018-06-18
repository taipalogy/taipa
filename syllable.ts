import { AlphabeticLetter, lowerLetters, list_of_syllables, LetterFilters } from './metadata'
import { GrammaticalUnit } from './expression'
import { Context } from './context'
import { LetterMatcher } from './lettermatcher'


//------------------------------------------------------------------------------
//  Rules of Sandhi Tone
//------------------------------------------------------------------------------

abstract class Rule {
    abstract getSandhiForm(b: ToneSandhiSyllable)
}

class FromSSToZS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['zs']);
        return b;
    }
}

class FromSSToXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['xx']);
        return b;
    }
}

class FromSSToXXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['xxx']);
        return b;
    }
}

class FromYToSS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['y'])) {
            return b;
        }
    }
}

class FromWToY extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['w'])) {
            b.pushLetter(lowerLetters['y']);
            return b;
        }
    }
}

class FromZSToW extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['zs'])) {
            b.pushLetter(lowerLetters['w']);
            return b;
        }

    }
}

class FromZSToXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['zs'])) {
            b.pushLetter(lowerLetters['xx']);
            return b;
        }

    }
}

class FromZSToXXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['zs'])) {
            b.pushLetter(lowerLetters['xxx']);
            return b;
        }
    }
}

class FromXToZS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['x'])) {
            b.pushLetter(lowerLetters['zs']);
            return b;
        }
    }
}

class FromXToXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['x'])) {
            b.pushLetter(lowerLetters['xx']);
            return b;
        }
    }
}

class FromXToXXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['x'])) {
            b.pushLetter(lowerLetters['xxx']);
            return b;
        }
    }
}

class FromKToKK extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['k']);
        return b;
    }
}

class FromPToPP extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['p']);
        return b;
    }
}

class FromTToTT extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['t']);
        return b;
    }
}

class FromBToBX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['x']);
        return b;
    }
}

class FromBToBB extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['b']);
        return b;
    }
}

class FromDToDX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['x']);
        return b;
    }
}

class FromDToDD extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['d']);
        return b;
    }
}

class FromGToGX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['x']);
        return b;
    }
}

class FromGToGG extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['g']);
        return b;
    }
}

class FromHToHY extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['y']);
        return b;
    }
}

class FromFToFX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['x']);
        return b;
    }
}

class FromFToFF extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['f']);
        return b;
    }
}

class RulesOfSandhiTone {
    rules = {
        'ss': [new FromSSToZS(), new FromSSToXX(), new FromSSToXXX()],
        'y': [new FromYToSS()],
        'w': [new FromWToY()],
        'zs': [new FromZSToW(), new FromZSToXX, new FromZSToXXX()],
        'x': [new FromXToZS(), new FromZSToXX, new FromZSToXXX()],
        'k': [new FromKToKK()],
        'p': [new FromPToPP()],
        't': [new FromTToTT()],
        'b': [new FromBToBX(), new FromBToBB()],
        'd': [new FromDToDX(), new FromDToDD()],
        'g': [new FromGToGX(), new FromGToGG()],
        'h': [new FromHToHY()],
        'f': [new FromFToFX(), new FromFToFF()],
    }

    rulesOfA = {
        'ss': ['x'],
        'y': ['ss'],
        'w': ['ss'],
        'h': ['hh'],
        'x': ['x'],
        'zs': ['x'],
        'p': ['pp'],
        't': ['tt'],
        'k': ['kk'],
        'b': ['bx'],
        'd': ['dx'],
        'g': ['gx'],
        'f': ['fx'],
    }

    getSandhiForms(b: ToneSandhiSyllable): Array<ToneSandhiSyllable> {
        let arr;
        if(this.rules[b.lastLetter.literal]) {
            arr = this.rules[b.lastLetter.literal];
            //console.log(arr)
        } else {
            arr = this.rules['ss'];
            //console.log("first tone hit")
        }
        let ret: Array<ToneSandhiSyllable> = new Array();

        for(let k in arr) {
            let letarr =  Object.assign([], b.letters); // clone the array of letters from baseform
            ret.push(arr[k].getSandhiForm(new ToneSandhiSyllable(letarr)));
        }

        return ret;
    }
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------


export class Syllable extends GrammaticalUnit {
    literal: string;
    evaluate(context: Context){}
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(var i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    isBaseForm() {
        // look up in the lexicon to check if this syllable is in base form
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
        //console.log("%s", l.literal);
    }

    popLetter() {
        this.literal.substr(0, this.literal.length-1)
        this.letters.slice(0, this.letters.length-2);
    }

    splitAtLastIndex(l: AlphabeticLetter) {
        if(this.letters[this.letters.length-1].literal == l.literal) {
            this.popLetter();
            return true;
        }
        return false;
    }

    get lastLetter() {
        return this.letters[this.letters.length-1]
    }
}

//------------------------------------------------------------------------------
//  ISyllables
//------------------------------------------------------------------------------

export interface ISyllables {
    list: {
        readonly [index: string]: ToneSandhiSyllable
    }
}

//------------------------------------------------------------------------------
//  Syllables
//------------------------------------------------------------------------------

export class Syllables {

    //list: Array<ToneSandhiSyllable>;
    

/*
    get length() {
        //return this.list.length;
        return 0;
    }
*/
/*
    isMedial(l: AlphabeticLetter) {
        let arr = new LetterFilters().medialLetters;
        for(let i in arr) {
            if(arr[i].literal === l.literal) {
                return true;
            }
        }
        return false;
    }

    isNasalInitial(l: AlphabeticLetter) {
        return false;
    }
*/
    create(str: string): ToneSandhiSyllable {
        // create just one syllable object using string
        // Letter Matcher
        let seqofletters: Array<AlphabeticLetter>;
        
        // Letter Matcher
        let ga = new LetterMatcher(str);
        seqofletters = ga.match();
  
        //console.log(new ToneSandhiSyllable(seqofletters))
        return new ToneSandhiSyllable(seqofletters);
    }

    populateSandhiFormTo(ss: Array<ToneSandhiSyllable>) {
        //console.log(ss)

        let baseforms: Array<ToneSandhiSyllable> = new Array();
        for(let k in ss) {
            baseforms.push(ss[k]);
        }
        // apply rules of sandhi form here
        let rost = new RulesOfSandhiTone();
        let sandhiforms;
        for(let m in baseforms) {
            /*
            for(let x in ss[0].letters) {
                console.log(ss[0].letters[x].literal)
            }
            */
            sandhiforms = rost.getSandhiForms(baseforms[m]);
            //console.log(sandhiforms)
            for(let r in ss) {
                // filter out duplicates
                for(let n in sandhiforms) {            
                    //console.log("r: %s, n: %s.", r, n)
                    //console.log(ss[r])
                    //console.log(sandhiforms[n])
                    if(ss[r].literal != sandhiforms[n].literal) {
                        ss.push(sandhiforms[n]);
                    }
                }
            }
    
        }
    }

    match(letters: Array<AlphabeticLetter>) {
        
        let syllables: Array<ToneSandhiSyllable> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        console.log(letters);
        let beginOfSyllable: number = 0;
        let ss: Array<ToneSandhiSyllable> = new Array(); // syllables
        for(let i = 0; i < letters.length; i++) {
            console.log("examining letter: %s. length of letters: %d", letters[i].literal, letters.length);
            //console.log("metadata letter array looping.");

            if(i-beginOfSyllable == 0) {
                console.log("i:%d. begin of syllable hit", i);
                //ss = this.list.filter(s => s.letters[0].literal === letters[i].literal);

                if(new LetterFilters().isMedial(letters[i]) || new LetterFilters().isNasalInitial(letters[i])) {
                    // if the first letter of this syllable is a medial or nasal,
                    // we populate the array
                    // if the first letter of the syllable is an initial,
                    // we just don't populate
                    let arr = list_of_syllables.filter(s => s[0] === letters[i].literal);
                    for(let k in arr) {
                        ss.push(this.create(arr[k]));
                    }
                } 
                
                //this.populateSandhiFormTo(ss);
            } else {
                console.log("i:%d. beginOfSyllable:%d. i-beginOfSyllable:%d", i, beginOfSyllable, i-beginOfSyllable);
                ss = ss.filter(s => s[i-beginOfSyllable] === letters[i].literal);
            }

            //console.log(ss);
            if(ss.length == 0) {
                console.log("something wrong");
            } else if(ss.length == 1) {
                //console.log("just one matched. i:%d. ss[0].letters.length:%d", i, ss[0].letters.length);
                if(i+1-beginOfSyllable == ss[0].letters.length) {
                    // when index i plus one equals the length of the matched syllable
                    let tmp = ss.shift();
                    beginOfSyllable +=  tmp.letters.length;
                    syllables.push(tmp);
                }
            } else if(ss.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    //console.log(ls);
                    console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ = new Array();
                    atLeastJ = ss.filter(s => s.letters.length >= j+1);
                    //console.log(atLeastJ);

                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ = new Array();
                    underJ = ss.filter(s => s.letters.length < j+1);
                    //console.log(underJ);

                    if(atLeastJ.length > 0){
                        //console.log(ss);
                        //console.log("%s. %s", ss[0].literal, letters[i+j].literal)
                        ss = atLeastJ.filter(s => s.letters[j].literal === letters[i+j].literal);
                        //console.log("%s. %s", ss[0].literal, letters[i+j].literal)
                        //console.log("length of ss is: %d", ss.length)
                        //console.log(ss);
                        //console.log("length of ss is: %d", ss.length)
                        if(ss.length > 0){
                            ;
                        } else {
                            ss = underJ;
                        }
                    }
                    
                    j++;
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    //console.log(ss);
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ss.length > 1 && i+j < letters.length);
                i += ss[0].letters.length-1; // skip the length-1 of characters of the found letter
                //console.log("i:%d", i)
                // we want it only when the whole syllable is matched
                let tmp = ss.shift();
                beginOfSyllable += tmp.letters.length;
                syllables.push(tmp); // push the matched letter
                //console.log(tmp);
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        console.log(syllables);
        //console.log("length of syllables: %d", syllables.length);
        return syllables;
    }
}
