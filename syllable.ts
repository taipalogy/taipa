import { AlphabeticLetter, lowerLetters, list_of_syllables, LetterFilters, Character, Letters } from './metadata'
import { GrammaticalUnit } from './expression'
import { Context } from './context'
import { LetterMatcher } from './lettermatcher'

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

class Allomorph {
    literal: string = ''
}

class FreeToneMark extends Allomorph {
    baseToneMarks: Array<AlphabeticLetter> = null;
}

class FinalToneMark extends Allomorph {
    finals: Array<Final> = null;
}

class Final extends Allomorph {
}

class ZeroSuffix extends FreeToneMark {
    baseToneMarks = [lowerLetters['y']];
}

class FreeToneMarkSS extends FreeToneMark {
    literal = 'ss';
    baseToneMarks = [lowerLetters['y']];
}

class FreeToneMarkY extends FreeToneMark {
    literal = 'y';
    baseToneMarks = [lowerLetters['w']];
}

class FreeToneMarkW extends FreeToneMark {
    literal = 'w';
    baseToneMarks = [lowerLetters['zs']];
}

class FreeToneMarkX extends FreeToneMark {
    literal = 'x';
}

class FreeToneMarkXX extends FreeToneMark {
    literal = 'xx';
    baseToneMarks = [lowerLetters['zs'], lowerLetters['ss'], lowerLetters['x'], null];
}

class FreeToneMarkXXX extends FreeToneMark {
    literal = 'xxx';
    baseToneMarks = [lowerLetters['zs'], lowerLetters['ss'], lowerLetters['x'], null];
}

class FreeToneMarkZZS extends FreeToneMark {
    literal = 'zzs';
}

class FreeToneMarkZS extends FreeToneMark {
    literal = 'zs';
    baseToneMarks = [lowerLetters['x'], lowerLetters['ss'], null];
}

class FinalP extends Final {
    literal = 'p';
}

class FinalT extends Final {
    literal = 't';
}

class FinalK extends Final {
    literal = 'k';
}

class FinalH extends Final {
    literal = 'h';
}

class FinalB extends Final {
    literal = 'b';
}

class FinalD extends Final {
    literal = 'd';
}

class FinalG extends Final {
    literal = 'g';
}

class FinalF extends Final {
    literal = 'f';
}

class FinalToneMarkP extends FinalToneMark {
    literal = 'p';
    finals = [new FinalP()];
}

class FinalToneMarkT extends FinalToneMark {
    literal = 't';
    finals = [new FinalT()];
}

class FinalToneMarkK extends FinalToneMark {
    literal = 'k';
    finals = [new FinalK()];
}

class FinalToneMarkH extends FinalToneMark {
    literal = 'h';
    finals = [new FinalH()];
}

class FinalToneMarkY extends FinalToneMark {
    literal = 'y';
    finals = [new FinalH()];
}

class FinalToneMarkB extends FinalToneMark {
    literal = 'b';
    finals = [new FinalB()]
}

class FinalToneMarkD extends FinalToneMark {
    literal = 'd';
    finals = [new FinalD()];
}

class FinalToneMarkG extends FinalToneMark {
    literal = 'g';
    finals = [new FinalG()];
}

class FinalToneMarkF extends FinalToneMark {
    literal = 'f';
    finals = [new FinalF()];
}

class FinalToneMarkX extends FinalToneMark {
    literal = 'x';
    finals = [new FinalB(), new FinalD(), new FinalG(), new FinalF()];
}

class AllomorphsOfToneMorpheme {
    listOfFreeToneMarks: Array<Allomorph>  = new Array();
    listOfCheckedToneMarks: Array<Allomorph>  = new Array();

    constructor() {
        //this.list.push(new FreeToneMarkNone());
        this.listOfFreeToneMarks.push(new FreeToneMarkSS());
        this.listOfFreeToneMarks.push(new FreeToneMarkY());
        this.listOfFreeToneMarks.push(new FreeToneMarkW());
        this.listOfFreeToneMarks.push(new FreeToneMarkX());
        this.listOfFreeToneMarks.push(new FreeToneMarkXX());
        this.listOfFreeToneMarks.push(new FreeToneMarkXXX());
        this.listOfFreeToneMarks.push(new FreeToneMarkZZS());
        this.listOfFreeToneMarks.push(new FreeToneMarkZS());

        this.listOfCheckedToneMarks.push(new FinalToneMarkP());
        this.listOfCheckedToneMarks.push(new FinalToneMarkT());
        this.listOfCheckedToneMarks.push(new FinalToneMarkK());
        this.listOfCheckedToneMarks.push(new FinalToneMarkH());
        this.listOfCheckedToneMarks.push(new FinalToneMarkB());
        this.listOfCheckedToneMarks.push(new FinalToneMarkD());
        this.listOfCheckedToneMarks.push(new FinalToneMarkG());
        this.listOfCheckedToneMarks.push(new FinalToneMarkF());
        this.listOfCheckedToneMarks.push(new FinalToneMarkY());
        this.listOfCheckedToneMarks.push(new FinalToneMarkX());
    }

    getMatchedFreeToneMark(letter: AlphabeticLetter) {
        for(let key in this.listOfFreeToneMarks) {
            if(this.listOfFreeToneMarks[key].literal === letter.literal) {
                return this.listOfFreeToneMarks[key];
            }
        }
    }

    getMatchedCheckedToneMark(letter: AlphabeticLetter) {
        console.log("letter: %s", letter.literal);
        for(let key in this.listOfCheckedToneMarks) {
            //console.log("this.listOfCheckedToneMarks[key].literal: %s", this.listOfCheckedToneMarks[key].literal)
            if(this.listOfCheckedToneMarks[key].literal === letter.literal) {
                return this.listOfCheckedToneMarks[key];
            }
        }
    }
}

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

class Morpheme {
    lemma: string
}

class ToneSandhiMorpheme extends Morpheme {
    syllable: ToneSandhiSyllable;// = new ToneSandhiSyllable();
    allomorphOfTone = null;

    constructor(letters: Array<AlphabeticLetter>) {
        super();
        this.syllable = new ToneSandhiSyllable(letters);
        this.assignAllomorphOfTone();
    }

    assignAllomorphOfTone() {
        let allomorphs = new AllomorphsOfToneMorpheme();
        let tm;// = new Array();

        //console.log(arr.length)
        console.log(tm)
        tm = allomorphs.getMatchedCheckedToneMark(this.syllable.letters[this.syllable.letters.length-1]);
        console.log(tm)

        if(tm != undefined) {
            //console.log(arr.length)
            for(let i = 0; i < tm.finals.length; i++) {
                if(this.syllable.letters[this.syllable.letters.length-2].literal === tm.finals[i].literal) {
                    this.allomorphOfTone = tm;
                }
                // when there are no matches, it means this syllable is already in base form
            }
            return;
        }

        tm = allomorphs.getMatchedFreeToneMark(this.syllable.letters[this.syllable.letters.length-1]);
        
        if(tm != undefined) {
            this.allomorphOfTone = new ZeroSuffix();
        } else if(tm) {
            if(tm.literal === new FreeToneMarkX().literal) {
                // this syllable is already in base form
            } else {
                this.allomorphOfTone = tm;
            }
        }
    }

    getBaseForms(): Array<ToneSandhiSyllable> {
        if(this.allomorphOfTone != null) {
            if(this.allomorphOfTone instanceof FreeToneMark) {
                if(this.allomorphOfTone.literal == '') {
                    console.log(this.syllable)
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.popLetter();
                    s.pushLetter(this.allomorphOfTone.baseToneMarks[0]);
                    return [s];
                } else {
                    // split at last index
                    // push letter
                    // the 7th tone has mutilple baseforms
                    let ret = [];
                    for(let i in this.allomorphOfTone.baseToneMarks) {
                        if(this.allomorphOfTone.baseToneMarks != null) {
                            let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                            s.popLetter();
                            s.pushLetter(this.allomorphOfTone.baseToneMarks[i]);
                            ret.push(s);
                        }
                    }
                    return ret;
                }
            } else if(this.allomorphOfTone instanceof FinalToneMark) {
                // pop the last letter
                // no need to push letter
                let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                s.popLetter();
                return [s];
            }
        } else {
            return [Object.assign({}, this.syllable)];
        }
        return []; // return empty array
    }
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

class SyllablePatterns {
    // match base forms only

    list = new Array();

    constructor() {
        let lf = new LetterFilters();

        // one letter
        this.list.push([lf.medialLetters]);
        this.list.push([lf.nasalInitialLetters]);

        // two letters
        this.list.push([lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.finalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters]);        
        this.list.push([lf.nasalInitialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.nasalInitialLetters, lf.nasalLetters]);

        // three letters
        this.list.push([lf.medialLetters, lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.medialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.medialLetters, lf.nasalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.finalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.nasalLetters]);
        this.list.push([lf.nasalInitialLetters, lf.nasalLetters, lf.neutralFinalLetters]);
        this.list.push([lf.initialLetters, lf.nasalLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.finalLetters, lf.finalToneMarkLetters]);

        // four letters
        this.list.push([lf.medialLetters, lf.medialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.finalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.finalLetters, lf.finalToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.nasalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.nasalLetters, lf.neutralFinalLetterH]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.nasalLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.medialLetters, lf.nasalLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.finalLetters, lf.finalToneMarkLetters]);

        // five letters
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.nasalLetters, lf.neutralFinalLetters]);

        // lueifx, lurifx
    }
}

class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<string> = new Array();
    get matchedLength() { return this.pattern.length; }
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
    initial
    medial
    nasal
    final
    tonemark

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
        var tmp = this.literal.substr(0, this.literal.length-this.letters[this.letters.length-1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length-1);
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

    matchLetters(str: string) {
        // create just one syllable object using string
        // Letter Matcher
        let seqofletters: Array<AlphabeticLetter>;
        
        // Letter Matcher
        let lm = new LetterMatcher(str);
        seqofletters = lm.match();

        return seqofletters;
    }

    createSyllable(letters: Array<AlphabeticLetter>): ToneSandhiSyllable {
        return new ToneSandhiSyllable(letters);
    }

    getMatchedSyllablePattern(letters: Array<AlphabeticLetter>, i: number, beginOfSyllable: number) {
        // get the longest matched syllable pattern
        let sp = new SyllablePatterns();
        let matchedLen = 0;
        let mp = new MatchedPattern();
        for(let m in sp.list) {
            let min = Math.min(letters.length-beginOfSyllable, sp.list[m].length);
            //console.log("min: %d", min)
            if(sp.list[m].length == min) {
                for(let n = 0; n < min; n++) {
                    //console.log("i: %d. n: %d.", i, n)
                    //console.log(letters)
                    if(letters[i+n].literal.search(new RegExp(sp.list[m][n])) == 0) {
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[i+q];
                            }
                            mp.pattern = sp.list[m];
                            console.log(sp.list[m])
                            console.log(letters[i+n].literal)
                            //console.log(new RegExp(sp.list[m][n]))
                            //console.log(matchedLen)    
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return mp;
    }

    match(letters: Array<AlphabeticLetter>) {
        let syllables: Array<ToneSandhiSyllable> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        console.log(letters);
        let beginOfSyllable: number = 0;
        let ss: Array<ToneSandhiSyllable> = new Array(); // syllables
        for(let i = 0; i < letters.length; i++) {
            console.log("examining letter: %s. length of letters: %d. i: %d. beginOfSyllable: %d", letters[i].literal, letters.length, i, beginOfSyllable);
            //console.log("metadata letter array looping.");
            
            let msp: MatchedPattern;
            if(i-beginOfSyllable == 0) {
                console.log("i:%d. begin of syllable hit: %d", i, beginOfSyllable);
                //ss = this.list.filter(s => s.letters[0].literal === letters[i].literal);
                
                console.log(letters[letters.length-1].literal)
                msp = this.getMatchedSyllablePattern(letters, i, beginOfSyllable);

                console.log("matchedLen: %d", msp.matchedLength);
                console.log(msp.pattern);
                console.log(msp.letters)

                let tsm: ToneSandhiMorpheme;
                let baseforms: Array<ToneSandhiSyllable> = new Array();
                if(msp.letters.length > 0) {
                    console.log("msp.letters: %s", msp.letters)
                    tsm = new ToneSandhiMorpheme(msp.letters);
                    baseforms = tsm.getBaseForms();
                }

                let n: number = 0;
                for(let k = 0; k < baseforms.length; k++) {
                    console.log("baseform: %s", baseforms[k].literal)
                    let match = list_of_syllables.filter(s => s === baseforms[k].literal);
                    if(match.length == 1) {
                        if(beginOfSyllable > 0) {
                            ss.push(baseforms[k]);
                        }
                    } else {
                        console.log("no match or multiple matches")
                    }
                    if(tsm.syllable.literal != baseforms[k].literal) {
                        n++;
                    }
                }

                if(n == baseforms.length && baseforms.length > 0) {
                    // when there are baseforms
                    // no matches found in ss, push the sandhi form
                    ss.push(tsm.syllable);
                }

                console.log(ss);
                for(let p in syllables) {
                    console.log(syllables[p].literal)
                }
                console.log("beginOfSyllable: %d. msp.matchedLength: %d", beginOfSyllable, msp.matchedLength);
                beginOfSyllable += msp.matchedLength;
                console.log("beginOfSyllable: %d. msp.matchedLength: %d", beginOfSyllable, msp.matchedLength);
            }

            console.log(ss);
            for(let p in syllables) {
                console.log(syllables[p].literal)
            }
            
            if(ss.length == 0) {
                console.log("nothing matched");
            } else if(ss.length >= 1) {
                //beginOfSyllable += msp.letters.length;
                if(msp.matchedLength > 0) {
                    for(let k in ss) {
                        syllables.push(ss[k]); // push the matched letter
                    }
                    ss = [];
                    console.log("i: %d. beginOfSyllable: %d", i, beginOfSyllable);
                    i += beginOfSyllable-i-1;
                    console.log("i: %d. beginOfSyllable: %d", i, beginOfSyllable);    
                }
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        console.log(syllables);
        console.log("length of syllables: %d", syllables.length);
        return syllables;
    }
}
