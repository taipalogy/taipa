import { AlphabeticLetter, Final, ToneMark, FinalP, FinalT, FinalK, FinalH, FinalB, FinalD, FinalG, FinalF,
        ToneMarkX, ToneMarkP, ToneMarkT, ToneMarkK, ToneMarkH, ToneMarkB, ToneMarkD, ToneMarkG, ToneMarkF, ToneMarkY, ToneMarkZS,
        ToneMarkW, ToneMarkSS, ToneMarkXX, ToneMarkXXX, ZeroToneMark, ToneMarkZZS, Sound } from './grapheme'
import { MedialA, MedialE, MedialI, MedialO, MedialU, MedialUR } from './grapheme'
import { NasalInitialM, NasalInitialN, NasalInitialNG } from './grapheme'
import { InitialC, InitialJ, InitialL, InitialQ, InitialS, InitialV, InitialZ, InitialP, InitialT, InitialK, InitialB, InitialD,
        InitialG, InitialH } from './grapheme'
import { NasalM, NasalN, NasalNG, NasalNN } from './grapheme'
import { GrammaticalUnit } from './expression'
import { Context } from './context'
import { LetterMatcher } from './lettermatcher'

//------------------------------------------------------------------------------
//  Morph
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

class ToneMorpheme {
}

export class Allomorph {
    toneMark: ToneMark

    isZeroToneMark() {
        //if(this.toneMark.isLetterNull()){}
    }
}

export class FreeAllomorph extends Allomorph {
    baseToneMarks: Array<ToneMark> = null;
}

export class CheckedAllomorph extends Allomorph {
    final: Final;
}

class ZeroAllomorph extends FreeAllomorph {
    toneMark = new ZeroToneMark();
    baseToneMarks = [new ToneMarkY()];
}

class AllomorphSS extends FreeAllomorph {
    toneMark = new ToneMarkSS();
    baseToneMarks = [new ToneMarkY()];
}

export class AllomorphY extends FreeAllomorph {
    toneMark = new ToneMarkY();
    baseToneMarks = [new ToneMarkW()];
}

export class AllomorphW extends FreeAllomorph {
    toneMark = new ToneMarkW();
    baseToneMarks = [new ToneMarkZS()];
}

class AllomorphX extends FreeAllomorph {
    toneMark = new ToneMarkX();
}

class AllomorphXX extends FreeAllomorph {
    toneMark = new ToneMarkXX();
    baseToneMarks = [new ToneMarkZS(), new ToneMarkSS(), new ToneMarkX()];
}

class AllomorphXXX extends FreeAllomorph {
    toneMark = new ToneMarkXXX();
    baseToneMarks = [new ToneMarkZS(), new ToneMarkSS(), new ToneMarkX()];
}

class AllomorphZZS extends FreeAllomorph {
    toneMark = new ToneMarkZZS();
}

class AllomorphZS extends FreeAllomorph {
    toneMark = new ToneMarkZS();
    baseToneMarks = [new ToneMarkX(), new ToneMarkSS(), new ZeroToneMark()];
}

class AllomorphPP extends CheckedAllomorph {
    toneMark = new ToneMarkP();
    final = new FinalP();
}

class AllomorphTT extends CheckedAllomorph {
    toneMark = new ToneMarkT();
    final = new FinalT();
}

class AllomorphKK extends CheckedAllomorph {
    toneMark = new ToneMarkK();
    final = new FinalK();
}

class AllomorphHH extends CheckedAllomorph {
    toneMark = new ToneMarkH();
    final = new FinalH();
}

class AllomorphHY extends CheckedAllomorph {
    toneMark = new ToneMarkY();
    final = new FinalH();
}

class AllomorphBB extends CheckedAllomorph {
    toneMark = new ToneMarkB();
    final = new FinalB();
}

class AllomorphDD extends CheckedAllomorph {
    toneMark = new ToneMarkD();
    final = new FinalD();
}

class AllomorphGG extends CheckedAllomorph {
    toneMark = new ToneMarkG();
    final = new FinalG();
}

class AllomorphFF extends CheckedAllomorph {
    toneMark = new ToneMarkF();
    final = new FinalF();
}

class AllomorphBX extends CheckedAllomorph {
    toneMark = new ToneMarkX();
    final = new FinalB();
}

class AllomorphDX extends CheckedAllomorph {
    toneMark = new ToneMarkX();
    final = new FinalD();
}

class AllomorphGX extends CheckedAllomorph {
    toneMark = new ToneMarkX();
    final = new FinalG();
}

class AllomorphFX extends CheckedAllomorph {
    toneMark = new ToneMarkX();
    final = new FinalF();
}

class AllomorphsOfToneMorpheme {
    listOfFreeAllomorph: Array<Allomorph>  = new Array();
    listOfFinalAllomorph: Array<Allomorph>  = new Array();

    constructor() {
        this.listOfFreeAllomorph.push(new AllomorphSS());
        this.listOfFreeAllomorph.push(new AllomorphW());
        this.listOfFreeAllomorph.push(new AllomorphXX());
        this.listOfFreeAllomorph.push(new AllomorphXXX());
        this.listOfFreeAllomorph.push(new AllomorphZZS());
        this.listOfFreeAllomorph.push(new AllomorphZS());

        this.listOfFreeAllomorph.push(new AllomorphY());
        this.listOfFreeAllomorph.push(new AllomorphX());

        this.listOfFinalAllomorph.push(new AllomorphPP());
        this.listOfFinalAllomorph.push(new AllomorphTT());
        this.listOfFinalAllomorph.push(new AllomorphKK());
        this.listOfFinalAllomorph.push(new AllomorphHH());
        this.listOfFinalAllomorph.push(new AllomorphBB());
        this.listOfFinalAllomorph.push(new AllomorphDD());
        this.listOfFinalAllomorph.push(new AllomorphGG());
        this.listOfFinalAllomorph.push(new AllomorphFF());

        this.listOfFinalAllomorph.push(new AllomorphHY());
        this.listOfFinalAllomorph.push(new AllomorphBX());
        this.listOfFinalAllomorph.push(new AllomorphDX());
        this.listOfFinalAllomorph.push(new AllomorphGX());
        this.listOfFinalAllomorph.push(new AllomorphFX());
    }
}

export class LexicalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    sounds: Array<Sound>;
    // abstract factory
}

class PluralMorpheme {}

export class Affix {
    toneMark: ToneMark = new ToneMark();
}

class Interfix extends Affix {}
class Suffix extends Affix {}

class DerivationalAffix {}

class InflectionalAffix {}
class GrammaticalSuffix {
    // desinence
}
class InflectionalStem {}

//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme
//------------------------------------------------------------------------------

class Morpheme {
    lemma: string
}

export class ToneSandhiMorpheme extends Morpheme {
    syllable: ToneSandhiSyllable;
    allomorphOfToneMorpheme: Allomorph = null; // required to populate lexical stems

    constructor(syllable: ToneSandhiSyllable) {
        super();
        this.syllable = syllable;
        this.assignAllomorphOfToneMorpheme();
    }

    isEqualTo(allomorph: Allomorph) {
        // if the last letter of this syllable equal to that of the tone mark of the allomorph
        if(allomorph.toneMark.isEqualTo(this.syllable.letters[this.syllable.letters.length-1])) {
            return true;
        }
        return false;
    }

    assignAllomorphOfToneMorpheme() {
        let allomorphs = new AllomorphsOfToneMorpheme();
        let aotms;

        console.log(aotms)
        for(let key in allomorphs.listOfFinalAllomorph) {
            if(this.isEqualTo(allomorphs.listOfFinalAllomorph[key])) {
                aotms = allomorphs.listOfFinalAllomorph[key];
                break;
            }
        }
        console.log(aotms)

        if(aotms != undefined) {
            for(let i = 0; i < aotms.length; i++) {
                if(this.syllable.letters[this.syllable.letters.length-2].literal === aotms[i].final.toString()) {
                    this.allomorphOfToneMorpheme = aotms[i];
                }
                // when there are no matches, it means this syllable is already in base form
            }
            return;
        }

        console.log(aotms)
        for(let key in allomorphs.listOfFreeAllomorph) {
            if(this.isEqualTo(allomorphs.listOfFreeAllomorph[key])) {
                aotms = allomorphs.listOfFreeAllomorph[key];
                break;
            }
        }
        console.log(aotms)

        if(aotms == undefined) {
            this.allomorphOfToneMorpheme = new ZeroAllomorph();
        } else if(aotms) {
            if(aotms.literal === new AllomorphX().toneMark.toString()) {
                // this syllable is already in base form
            } else {
                this.allomorphOfToneMorpheme = aotms;
            }
        }
    }

    getBaseForms(): Array<ToneSandhiSyllable> {
        // get base forms as strings
        if(this.allomorphOfToneMorpheme != null) {
            if(this.allomorphOfToneMorpheme instanceof FreeAllomorph) {
                if(this.allomorphOfToneMorpheme.toneMark.toString() == '') {
                    console.log(this.syllable)
                    // no need to pop letter
                    // push letter
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.pushLetter(this.allomorphOfToneMorpheme.baseToneMarks[0].letter);
                    return [s];
                } else {
                    // pop letter
                    // push letter
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in this.allomorphOfToneMorpheme.baseToneMarks) {
                        if(this.allomorphOfToneMorpheme.baseToneMarks[i].letter != null) {
                            let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                            s.popLetter();
                            if(this.allomorphOfToneMorpheme.baseToneMarks[i] != null) {
                                // includes ss and x, exclude zero suffix
                                s.pushLetter(this.allomorphOfToneMorpheme.baseToneMarks[i].letter);
                            }
                            ret.push(s);
                        }
                    }
                    return ret;
                }
            } else if(this.allomorphOfToneMorpheme instanceof CheckedAllomorph) {
                // pop the last letter
                // no need to push letter
                let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                s.popLetter();
                return [s];
            }
        } else {
            return [new ToneSandhiSyllable(this.syllable.letters)];
        }
        return []; // return empty array
    }
}


export class RootMorpheme extends ToneSandhiMorpheme {
    //lexicalStem: LexicalStem
    //lexicalAffixes: Array<LexicalAffix>

    populateLexicalStem(msp: MatchedPattern) {
        /*
        if(this.allomorphOfToneMorpheme == null) {
            this.lexicalStem = new LexicalStem();
            for(let key in this.syllable.letters) {
                this.lexicalStem[key] = msp.pattern[key].copyMatched(this.syllable.letters[key]);
            }
        }
        */
    }
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

class SoundsOfPattern {
    list: Array<Sound>

    copyMatched(letter: AlphabeticLetter) {
        console.log(letter);
        console.log(this.list)
        for(let key in this.list) {
            if(this.list[key].isEqualTo(letter)) {
                return this.list[key];
            }
        }
    }

    toString() {
        let str = '';
        for(let i = 0; i < this.list.length; i++) {
            if(i+1 < this.list.length) {
                str += this.list[i].toString();
                str += '|';
            } else if(i+1 == this.list.length) {
                str += this.list[i].toString();
            }
        }
        return str;
    }
}

class Medials extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();
        this.list.push(new MedialA());
        this.list.push(new MedialE());
        this.list.push(new MedialI());
        this.list.push(new MedialO());
        this.list.push(new MedialU());
        this.list.push(new MedialUR());
    }
}

class NasalInitials extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();
        this.list.push(new NasalInitialM());
        this.list.push(new NasalInitialN());
        this.list.push(new NasalInitialNG());
    }
}

class FreeToneMarks extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();
        this.list.push(new ToneMarkSS());
        this.list.push(new ToneMarkW());
        this.list.push(new ToneMarkXX());
        this.list.push(new ToneMarkXXX());
        this.list.push(new ToneMarkZS());
        this.list.push(new ToneMarkZZS());

        this.list.push(new ToneMarkX());
        this.list.push(new ToneMarkY());
    }
}

class NeutralFinals extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();
        this.list.push(new FinalH());
        this.list.push(new FinalF());
    }
}

class Finals extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();

        this.list.push(new FinalH());
        this.list.push(new FinalF());

        this.list.push(new FinalP());
        this.list.push(new FinalT());
        this.list.push(new FinalK());
        this.list.push(new FinalB());
        this.list.push(new FinalD());
        this.list.push(new FinalG());
    }
}

class Initials extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();
        this.list.push(new InitialC());
        this.list.push(new InitialJ());
        this.list.push(new InitialL());
        this.list.push(new InitialQ());
        this.list.push(new InitialS());
        this.list.push(new InitialV());
        this.list.push(new InitialZ());

        this.list.push(new InitialP());
        this.list.push(new InitialT());
        this.list.push(new InitialK());
        this.list.push(new InitialB());
        this.list.push(new InitialD());
        this.list.push(new InitialG());

        this.list.push(new InitialH());

        this.list.push(new NasalInitialM());
        this.list.push(new NasalInitialN());
        this.list.push(new NasalInitialNG());
    }
}

class Nasals extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();
        this.list.push(new NasalM());
        this.list.push(new NasalN());
        this.list.push(new NasalNG());
        this.list.push(new NasalNN());
    }
}

class FinalToneMarks extends SoundsOfPattern {
    list: Array<Sound> = new Array();
    constructor() {
        super();

        this.list.push(new ToneMarkP());
        this.list.push(new ToneMarkT());
        this.list.push(new ToneMarkK());
        this.list.push(new ToneMarkB());
        this.list.push(new ToneMarkD());
        this.list.push(new ToneMarkG());

        this.list.push(new ToneMarkH());
        this.list.push(new ToneMarkF());

        this.list.push(new ToneMarkX());
        this.list.push(new ToneMarkY());
    }
}

class SyllableNewPatterns {
    list = new Array();

    constructor() {
        // one letter
        this.list.push([new Medials()]);
        this.list.push([new NasalInitials()]);

        // two letters
        this.list.push([new Medials(), new Medials()]);
        this.list.push([new Medials(), new FreeToneMarks()]);
        this.list.push([new Medials(), new Finals()]);
        this.list.push([new Initials(), new Medials()]);
        this.list.push([new NasalInitials, new FreeToneMarks()]);
        this.list.push([new NasalInitials(), new Nasals()]);

        // three letters
        this.list.push([new Medials(), new Medials(), new Medials()]);
        this.list.push([new Medials(), new Medials(), new FreeToneMarks()]);
        this.list.push([new Medials(), new Medials(), new Nasals()]);
        this.list.push([new Initials(), new Medials(), new FreeToneMarks()]);
        this.list.push([new Initials(), new Medials(), new Finals()]);
        this.list.push([new Initials(), new Medials(), new Medials()]);
        this.list.push([new Initials(), new Medials(), new Nasals()]);
        this.list.push([new Nasals(), new Nasals(), new NeutralFinals()]);
        this.list.push([new Initials(), new Nasals(), new FreeToneMarks()]);
        this.list.push([new Medials(), new Finals(), new FinalToneMarks()]);

        // four letters
        this.list.push([new Medials(), new Medials(), new Medials(), new FreeToneMarks()]);
        this.list.push([new Initials(), new Medials(), new Medials(), new Medials()]);
        this.list.push([new Initials(), new Medials(), new Medials(), new FreeToneMarks()]);
        this.list.push([new Initials(), new Medials(), new Medials(), new Finals()]);
        this.list.push([new Initials(), new Medials(), new Medials(), new Nasals()]);
        this.list.push([new Initials(), new Medials(), new Nasals(), new NeutralFinals()]);
        this.list.push([new Initials(), new Medials(), new Nasals(), new FreeToneMarks()]);
        this.list.push([new Medials(), new Medials(), new Nasals(), new FreeToneMarks()]);
        this.list.push([new Initials(), new Medials(), new Finals(), new FinalToneMarks]);

        // five letters
        this.list.push([new Initials(), new Medials(), new Medials(), new Nasals(), new NeutralFinals()]);
        this.list.push([new Initials(), new Medials(), new Medials(), new Nasals(), new FreeToneMarks()]);
        this.list.push([new Initials(), new Medials(), new Medials(), new Finals(), new FinalToneMarks()]);

        // lueifx, lurifx
    }
}

class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<SoundsOfPattern> = new Array();
    get matchedLength() { return this.pattern.length; }
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------


export class Syllable {
    literal: string = '';
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
        let seqOfSounds: Array<Sound>
        
        // Letter Matcher
        let lm = new LetterMatcher(str);
        //seqofletters = lm.match();
        seqOfSounds = lm.match();

        //return seqofletters;
        return seqOfSounds;
    }

    createSyllable(letters: Array<AlphabeticLetter>): ToneSandhiSyllable {
        return new ToneSandhiSyllable(letters);
    }

    getMatchedSyllablePattern(letters: Array<AlphabeticLetter>, i: number, beginOfSyllable: number) {
        // get the longest matched syllable pattern
        let sp = new SyllableNewPatterns();
        let matchedLen = 0;
        let mp = new MatchedPattern();
        for(let m in sp.list) {
            let min = Math.min(letters.length-beginOfSyllable, sp.list[m].length);
            if(sp.list[m].length == min) {
                for(let n = 0; n < min; n++) {
                    if(letters[i+n].literal.search(new RegExp(sp.list[m][n].toString())) == 0) {
                        console.log(sp.list[m][n].toString())
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[i+q];
                            }
                            mp.pattern = sp.list[m];
                            //for(let key in sp.list[m]) {
                                console.log(sp.list[m])
                            //}
                            console.log(letters[i+n].literal)
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return mp;
    }

    match(sounds: Array<Sound>) {

        let affixes: Array<RootMorpheme> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        
        // unpack sounds and get letters from them
        let letters: Array<AlphabeticLetter> = new Array();
        for(let key in sounds) {
            letters.push(sounds[key].letter);
        }

        console.log(letters);
        let beginOfSyllable: number = 0;
        //let slbs: Array<ToneSandhiSyllable> = new Array(); // syllables
        for(let i = 0; i < letters.length; i++) {
            console.log("examining letter: %s. length of letters: %d. i: %d. beginOfSyllable: %d", letters[i].literal, letters.length, i, beginOfSyllable);
            //console.log("metadata letter array looping.");
            
            let msp: MatchedPattern;
            if(i-beginOfSyllable == 0) {
                console.log("i:%d. begin of syllable hit: %d", i, beginOfSyllable);
                
                console.log(letters[letters.length-1].literal)
                msp = this.getMatchedSyllablePattern(letters, i, beginOfSyllable);

                console.log("matchedLen: %d", msp.matchedLength);
                console.log(msp.pattern);
                console.log(msp.letters)

                //let tsm: ToneSandhiMorpheme;
                let la: RootMorpheme;
                //let baseforms: Array<ToneSandhiSyllable> = new Array();
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    //tsm = new ToneSandhiMorpheme(new ToneSandhiSyllable(msp.letters));
                    la =  new RootMorpheme(new ToneSandhiSyllable(msp.letters));
                    //la.populateLexicalStem(msp);

                    //baseforms = tsm.getBaseForms();
                    //slbs.push(tsm.syllable);
                    affixes.push(la);
                }

                /*
                let n: number = 0;
                for(let k = 0; k < baseforms.length; k++) {
                    console.log("baseform: %s", baseforms[k].literal)
                    let match = list_of_lexical_roots.filter(s => s === baseforms[k].literal);
                    if(match.length == 1) {
                        // push base form into slbs array
                        //slbs.push(baseforms[k]);
                    } else {
                        console.log("no match or multiple matches")
                    }
                    if(tsm.syllable.literal != baseforms[k].literal) {
                        n++;
                    }
                }

                if(n == baseforms.length && baseforms.length > 0) {
                    // when there are baseforms
                    // no matches found in array of syllables, push the sandhi form
                    //slbs.push(tsm.syllable);
                }
*/
                console.log(affixes);
                //for(let p in syllables) {
                //    console.log(syllables[p].literal)
                //}
                console.log("beginOfSyllable: %d. msp.matchedLength: %d", beginOfSyllable, msp.matchedLength);
                beginOfSyllable += msp.matchedLength;
                console.log("beginOfSyllable: %d. msp.matchedLength: %d", beginOfSyllable, msp.matchedLength);
            }

            console.log(affixes);
            //for(let p in syllables) {
            //    console.log(syllables[p].literal)
            //}
            
            //if(slbs.length == 0) {
            if(affixes.length == 0) {
                console.log("nothing matched");
            //} else if(slbs.length >= 1) {
            } else if(affixes.length >= 1) {
                //beginOfSyllable += msp.letters.length;
                if(msp.matchedLength > 0) {
                    //for(let k in slbs) {
                        //syllables.push(slbs[k]); // push the matched letter
                        // pack syllables into lexical affixes
                        //lexicalAffixes.push(new LexicalAffix(slbs[k]));
                    //}
                    //slbs = [];
                    console.log("i: %d. beginOfSyllable: %d", i, beginOfSyllable);
                    i += beginOfSyllable-i-1;
                    console.log("i: %d. beginOfSyllable: %d", i, beginOfSyllable);    
                }
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        //console.log(syllables);
        //console.log("length of syllables: %d", syllables.length);
        //return syllables;
        //console.log(lexicalAffixes);
        //console.log("length of lexical affixes: %d", lexicalAffixes.length);
        return affixes;
    }
}


let list_of_rime_of_ziang_accent = [
    'ee', 'eeh', 'eef', 'eng', 'ek', 'eg', 'ionn', 'ionnh', 'ionnf', 
]

let list_of_rime_of_zuanx_accent = [
    'er', 'erh', 'erf', 'ere', 'ereh', 'eref', 'eru', 'ir', 'irh', 'irf', 'irinn', 'irm', 'irn', 'irng', 'irp', 'irt', 'ird', 'irk',
    'irg',
]

let list_of_ziang_syllables = []

let list_of_zuanx_syllables = [
    'huang',
]

export let list_of_lexical_roots = [
    'a', 'ay', 'azs', 'ah', 'af', 'ai', 'aiy', 'aiw', 'ainnzs', 'ak', 'am', 'amy', 'amw', 'amx', 'amzs', 'an', 'any', 'anw', 'anx',
    'anzs', 'ang', 'angw', 'angx', 'angzs', 'annw', 'annx', 'annzs', 'ap', 'ab', 'at', 'au', 'auy', 'auw', 'aux', 'auzs',

    'ba', 'bax', 'bazs', 'bah', 'bai', 'baiy', 'baix', 'bak', 'bag', 'ban', 'bany', 'banx', 'banzs', 'bangy', 'bangw', 'bangx',
    'bangzs', 'bat', 'bad', 'bauy', 'bauzs', 'bey', 'bex', 'bezs', 'beh', 'bef', 'biy', 'bix', 'bizs', 'bieny', 'bienx', 'bienzs',
    'bied', 'biauy', 'biaux', 'biauzs', 'bih', 'bif', 'big', 'biny', 'binx', 'binzs', 'bingy', 'bingx', 'bingzs', 'biury', 'biurx',
    'biurzs', 'bit', 'biuzs', 'bury', 'burx', 'burzs', 'bok', 'bog', 'bong', 'bongy', 'bongw', 'bongx', 'bongzs', 'boy', 'box',
    'bozs', 'buy', 'bux', 'buzs', 'buax', 'buah', 'buaf', 'buany', 'buad', 'buey', 'buex', 'buezs', 'buef', 'bui', 'buny', 'bunw',
    'bunx', 'bunzs', 'but', 'bud',
    
    'ca', 'cay', 'cax', 'cazs', 'cah', 'cai', 'caiy', 'caiw', 'caix', 'caizs', 'cak', 'cag', 'cam', 'camy', 'camw', 'camx', 'can',
    'canw', 'canx', 'cang', 'cangy', 'cangw', 'canny', 'cannzs', 'cap', 'cab', 'cat', 'cad', 'cau', 'cauy', 'cauw', 'cauf', 'ce',
    'cey', 'cew', 'cex', 'cezs', 'ceh', 'cenn', 'cenny', 'cennw', 'ci', 'ciy', 'ciw', 'cix', 'cizs', 'cia', 'ciax', 'ciah', 'ciag',
    'ciam', 'ciamy', 'cien', 'cieny', 'cienx', 'ciangy', 'ciangw', 'ciangx', 'ciangzs', 'ciann', 'cianny', 'ciannw', 'ciannx',
    'ciap', 'ciet', 'ciau', 'ciauw', 'ciaux', 'cih', 'cif', 'cik', 'cig', 'cim', 'cimy', 'cin', 'cinw', 'cing', 'cingy', 'cingw',
    'cingx', 'cingzs', 'cinn', 'cinny', 'cinnx', 'ciur', 'ciurw', 'ciurzs', 'ciurh', 'ciurf', 'ciok', 'ciog', 'ciong', 'ciongw',
    'cip', 'cit', 'ciu', 'ciuy', 'ciux', 'ciuzs', 'ciunn', 'ciunny', 'ciunnw', 'ciunnx', 'ciunnzs', 'cng', 'cngy', 'cngw', 'cngx',
    'cngh', 'cngf', 'cur', 'cury', 'curw', 'curh', 'cok', 'cog', 'cong', 'congy', 'congw', 'congx', 'co', 'coy', 'cow', 'cu', 'cuy',
    'cuw', 'cuzs', 'cuaw', 'cuazs', 'cuah', 'cuaf', 'cuan', 'cuan', 'cuanw', 'cuanx', 'cuangw', 'cuann', 'cuannw', 'cue', 'cuey',
    'cuex',   'cuezs', 'cuh', 'cuf', 'cui', 'cuiy', 'cuiw', 'cun', 'cuny', 'cunw', 'cunx', 'cunzs', 'cut',

    'da', 'day', 'daw', 'dah', 'daf', 'dai', 'daiy', 'daiw', 'daix', 'diazs', 'dainn', 'dianny', 'dak', 'dag', 'dam', 'damy',
    'damw', 'damx', 'damzs', 'dan', 'dany', 'danw', 'danx', 'danzs', 'dang', 'dangy', 'dangw', 'dangx', 'dangzs', 'dann', 'danny',
    'dannw', 'dannx', 'dannzs', 'dap', 'dab', 'dat', 'dad', 'dau', 'dauy', 'dauw', 'daux', 'dauzs', 'dauh', 'dauf', 'de', 'dey',
    'dew', 'dex', 'dezs', 'deh', 'denn', 'dennw', 'dennzs', 'di', 'diy', 'diw', 'dix', 'dizs', 'dia', 'diah', 'diaf', 'diak',
    'diag', 'diam', 'diamy', 'diamw', 'diamx', 'diamzs', 'dien', 'dieny', 'dienx', 'tienzs', 'dianny', 'diannx', 'diannzs', 'diap,',
    'diab', 'diet', 'died', 'diau', 'diauw', 'diaux', 'diauzs', 'dih', 'dif', 'dik', 'dig', 'dimw', 'dimx', 'dimzs', 'din', 'diny',
    'dinw', 'dinx', 'dinzs', 'ding', 'dingy', 'dingw', 'dingx', 'dingzs', 'dinn', 'dinnx', 'dinnzs', 'dinnf', 'diurw', 'diurx',
    'diurzs', 'diurh', 'diurf', 'diok', 'diog', 'diong', 'diongy', 'diongw', 'diongx', 'diongzs', 'dit', 'did', 'diu', 'diuy',
    'diuw', 'diux', 'diuzs', 'diuh', 'diunn', 'diunny', 'diunnw', 'diunnx', 'diunnzs', 'dng', 'dngy', 'dngw', 'dngx', 'dngzs',
    'dur', 'dury', 'durw', 'durx', 'durzs', 'durh', 'durf', 'dok', 'dog', 'domx', 'dong', 'dongy', 'dongw', 'dongx', 'dongzs', 'do',
    'doy', 'dow', 'dox', 'dozs', 'du', 'duy', 'duw', 'dux', 'duzs', 'duaw', 'duazs', 'duan', 'duany', 'duanw', 'duanzs', 'duann',
    'duannw', 'duannx', 'duannzs', 'duat', 'duad', 'duew', 'duex', 'duezs', 'duh', 'duf', 'dui', 'duiw', 'duix', 'duizs', 'dun',
    'duny', 'dunw', 'dunzs', 'dud', 

    'e', 'ey', 'ew', 'ex', 'ezs', 'eh', 'ef', 'enn', 'ennx',

    'gax', 'gazs', 'gaix', 'gaizs', 'gag', 'gamy', 'gamx', 'gamzs', 'gany', 'ganw', 'ganx', 'ganzs', 'gangzs', 'gaux', 'gew', 'gex',
    'gezs', 'giy', 'gix', 'gizs', 'giax','giah', 'giaf', 'giamy', 'giamx', 'giamzs', 'gieny', 'gienw', 'gienx', 'gienzs', 'giang',
    'giangw', 'giangzs', 'giap', 'giab', 'giet', 'gied', 'giaux', 'gig', 'gimy', 'gimx', 'gimzs', 'giny', 'ginx', 'ginzs', 'gingy',
    'gingx', 'giury', 'giurx', 'giurf', 'giok', 'giog', 'giongy', 'giuy', 'giux', 'gurx', 'gurzs', 'gog', 'gongx', 'gongzs', 'gox',
    'gozs', 'guy', 'gux', 'guzs', 'guay', 'guazs', 'guany', 'guanx', 'guanzs', 'guad', 'guezs', 'guef', 'guix', 'guizs',
    
    'ha', 'haw', 'hax', 'hazs', 'hah', 'haf', 'hai', 'haiy', 'haix', 'haizs', 'hainn', 'hainnw', 'hainnx', 'hak', 'hag', 'ham',
    'hamy', 'hamw', 'hamx', 'hamzs','han', 'hany', 'hanw', 'hanx', 'hanzs', 'hang', 'hangw', 'hangx', 'hangzs', 'hanny', 'hannx',
    'hannzs', 'hannh', 'hap', 'hab', 'hat', 'had', 'hau', 'hauy', 'hauw', 'haux', 'hauzs', 'he', 'hey', 'hew', 'hex', 'hezs', 'heh',
    'hennw', 'hennx', 'hennh', 'hi', 'hiy', 'hiw','hix', 'hia', 'hiazs', 'hiah', 'hiaf', 'hiam', 'hiamy', 'hiamw', 'hiamx', 'hien',
    'hieny', 'hienw', 'hienx', 'hienzs', 'hiang', 'hiangy', 'hiangw', 'hiann', 'hianny', 'hiannw', 'hiannx', 'hiannzs', 'hiannh',
    'hiab', 'hiat', 'hiad', 'hiau', 'hiauy', 'hiaux', 'hiauh', 'hik', 'hig', 'him', 'himx', 'hin', 'hinx', 'hinzs', 'hing', 'hingw',
    'hingx', 'hingzs', 'hinn', 'hinnw', 'hinnzs', 'hiurx', 'hiurzs', 'hiurh', 'hiurf', 'hiok', 'hiong', 'hiongy', 'hiongw',
    'hiongx', 'hip','hit', 'hid', 'hiu', 'hiuy', 'hiuw', 'hiux', 'hiunn', 'hiunnf', 'hmy', 'hmx', 'hmh', 'hmf', 'hng', 'hngy',
    'hngx', 'hngzs', 'hngh', 'hngf', 'hury', 'hurx', 'hurzs', 'hurf', 'hok', 'hog', 'hong', 'hongy', 'hongw', 'hongx', 'hongzs',
    'honn', 'honny', 'honnw', 'honnh', 'ho', 'hoy', 'how', 'hox', 'hozs', 'hu', 'huy', 'huw', 'hux', 'huzs', 'hua', 'huaw', 'huax',
    'huazs', 'huah', 'huaf', 'huaix', 'huaizs', 'huainnx', 'huan', 'huany', 'huanw', 'huanx', 'huanzs', 'huann', 'huanny', 'huannx',
    'huannzs', 'huat', 'huad', 'hue', 'huey', 'huew', 'huex', 'huezs', 'hueh', 'hui', 'huiy', 'huiw', 'huix', 'huizs', 'hun',
    'huny', 'hunw', 'hunx', 'hunzs', 'hut', 'hud',

    'i', 'iy', 'iw', 'ix', 'izs', 'ia', 'iay', 'iaw', 'iax', 'iazs', 'iah', 'iaf', 'iam', 'iamy', 'iamx', 'iamzs', 'ien', 'ieny',
    'ienw', 'ienx', 'iang', 'iangzs', 'iann', 'ianny', 'iannw', 'iannx', 'iannzs', 'iap', 'iab', 'iat', 'iad', 'iau', 'iauy',
    'iauw', 'iaux', 'iauzs', 'iaunn', 'ik', 'ig', 'im', 'imy', 'imw', 'imx', 'in', 'iny', 'inw', 'inx', 'inzs', 'ing', 'ingy',
    'ingw', 'ingx', 'ingzs', 'inn', 'inny', 'innw', 'innx', 'innzs', 'iur', 'iury', 'iurx', 'iurh', 'iurf', 'iok', 'iog', 'iong',
    'iongy', 'iongw', 'iongx', 'iongzs', 'ip', 'it', 'id', 'iu', 'iuy', 'iuw', 'iux', 'iuzs', 'iunn', 'iunny', 'iunnx', 'iunnzs',

    'jiy', 'jix', 'jizs', 'jia', 'jiay', 'jiamy', 'jienx', 'jiangy', 'jiab', 'jiad', 'jiauy', 'jiauw', 'jiaux', 'jimy', 'jimx',
    'jimzs', 'jinx', 'jinzs', 'jiurzs', 'jiok', 'jiog', 'jiongy', 'jiongx', 'jiongzs', 'jib', 'jid', 'jiux', 'juy', 'jux', 'juzs',
    'juaf', 'juex', 'juezs', 'junzs',

    'ka', 'kay', 'kaw', 'kah', 'kaf', 'kai', 'kaiy', 'kaiw', 'kainn', 'kainny', 'kak', 'kag', 'kam', 'kamy', 'kamw', 'kan', 
    'kanw', 'kang', 'kangy', 'kangw', 'kann', 'kap', 'kab', 'kat', 'kau', 'kauy', 'kauw', 'ke', 'key', 'kew', 'kex', 'keh', 'kef',
    'kenn', 'kennf', 'ki', 'kiy', 'kiw', 'kix', 'kizs', 'kia', 'kiax', 'kiazs', 'kiah', 'kiag', 'kiam', 'kiamw', 'kiamx',
    'kiamzs', 'kien', 'kieny', 'kienw', 'kienx', 'kiang', 'kiangw', 'kiap', 'kiet', 'kied', 'kiau', 'kiauy', 'kiauw', 'kiauh',
    'kih', 'kik', 'kim', 'kimy', 'kimx', 'kin', 'kiny', 'kinx', 'king', 'kingy', 'kingw', 'kingx', 'kingzs', 'kinnx', 'kiury',
    'kiurw', 'kiurh', 'kiok', 'kiong', 'kiongy', 'kiongx', 'kip', 'kib', 'kit', 'kid', 'kiu', 'kiuy', 'kiux', 'kiuzs', 'kiunn',
    'kiunnzs', 'kng', 'kngw', 'kur', 'kury', 'kurw', 'kurx', 'kok', 'kog', 'kong', 'kongy', 'kongw', 'kongzs', 'ko', 'koy', 'kow',
    'ku', 'kux', 'kuzs', 'kua', 'kuay', 'kuaw', 'kuah', 'kuaiw', 'kuan', 'kuany', 'kuanw', 'kuanx', 'kuann', 'kuanny', 'kuannw',
    'kuat', 'kue', 'kuew', 'kuex', 'kueh', 'kuh', 'kui', 'kuiy', 'kuiw', 'kun', 'kuny', 'kunw', 'kunx', 'kut', 'kud',


    'la', 'lax', 'lazs', 'lah', 'laf', 'laix', 'laizs', 'lak', 'lag', 'lam', 'lamy', 'lamw', 'lamx', 'lamzs', 'lan', 'lany',
    'lanx', 'lanzs', 'lang', 'langy', 'langw', 'langx', 'langzs', 'lap', 'lab', 'lad', 'lauy', 'lauw', 'laux', 'lauzs', 'lauf',
    'le', 'ley', 'lew', 'lex', 'lezs', 'leh', 'lef', 'li', 'liy', 'liw', 'lix', 'lizs', 'liah', 'liaf', 'liam', 'liamy', 'liamw', 
    'liamx', 'liamzs', 'lien', 'lieny', 'lienx', 'lienzs', 'liang', 'liangy', 'liangx', 'liangzs', 'liap', 'liab', 'liet', 'liauy',
    'liauw', 'liaux', 'liauzs', 'lif', 'lik', 'lig', 'lim', 'limy', 'limx', 'limzs', 'lin', 'liny', 'linw', 'linx', 'limzs', 'ling',
    'lingy', 'lingw', 'lingx', 'lingzs', 'liury', 'liurx', 'liurzs', 'liurf', 'liok', 'liog', 'liongy', 'liongw', 'liongx',
    'liongzs', 'lib', 'liu', 'liuy', 'liuw', 'liux', 'liuzs', 'lur', 'lury', 'lurw', 'lurx', 'lurzs', 'lurh', 'lurf', 'lok', 'log',
    'long', 'longy', 'longw', 'longx', 'longzs', 'loy', 'lox', 'lozs', 'lu', 'luy', 'luw', 'lux', 'luzs', 'luax', 'luazs', 'luah',
    'luaf', 'luany', 'luanx', 'luanzs', 'luad', 'luex', 'luezs', 'lui', 'luiy', 'luiw', 'luix', 'luizs', 'lun', 'luny', 'lunx',
    'lunzs', 'lut', 'lud',

    'my', 'mx', 'mzs', 'ma', 'may', 'maw', 'max', 'mazs', 'mai', 'maiy', 'maiw', 'maizs', 'mau', 'maux', 'mauzs', 'mauh', 'me',
    'mey', 'mex', 'mezs', 'meh', 'mef', 'mi', 'miy', 'mix', 'mizs', 'miax', 'miazs', 'miauzs', 'mih', 'mif', 'mngy', 'mngx',
    'mngzs', 'mo', 'moy', 'mox', 'mozs', 'moh', 'mof', 'mua', 'muay', 'muax', 'muazs', 'muiy', 'muix',

    'nay', 'naw', 'nax', 'nazs', 'nah', 'nai', 'naiy', 'naizs', 'nauy', 'nauzs', 'nauh', 'ne', 'nex', 'neh', 'ni', 'niy', 'nix',
    'nizs', 'niay', 'niax', 'niazs', 'niau', 'niauy', 'nih', 'niuy', 'niux', 'niuzs', 'nng', 'nngy', 'nngw', 'nngx', 'nngzs',
    'noy', 'nozs', 'nuay', 'nuaw', 'nuax', 'nuazs',

    'ng', 'ngy', 'ngw', 'ngx', 'ngzs', 'ngay', 'nagizs', 'ngaux', 'ngauzs', 'ngey', 'ngezs', 'ngeh', 'ngef', 'ngiax', 'ngiau',
    'ngiauy', 'ngiauh', 'ngiauf', 'ngoy', 'ngox', 'ngozs',

    'o', 'oy', 'ox', 'ozs', 'ok', 'om', 'omzs', 'ong', 'ongy', 'ongx', 'ongzs', 'onn', 'onnw', 

    'pa', 'paw', 'pazs', 'pah', 'paiw', 'painny', 'painnzs', 'pak', 'pag', 'pan', 'pan', 'pang', 'pangy', 'pangw', 'pangx',
    'pangzs', 'pannw', 'pannzs', 'pau', 'pauy', 'pauw', 'pauzs', 'pauf', 'pe', 'pey', 'pew', 'pezs', 'penn', 'pennx', 'pennzs',
    'pi', 'piy', 'piw', 'pix', 'pizs', 'piah', 'piaf', 'piak', 'piag', 'pien', 'pienw', 'pienx', 'piang', 'piangzs', 'piann',
    'pianny', 'piannx', 'piet', 'piau', 'piauw', 'piaux', 'pih', 'pif', 'pik', 'piny', 'pinx', 'pinzs', 'ping', 'pingw', 'pingx',
    'pingzs', 'pinn', 'pinnw', 'pinnx', 'pinnzs', 'piurw', 'piurx', 'pit', 'pngh', 'pur', 'pury', 'purw', 'purzs', 'purh', 'pok',
    'pog', 'pong', 'pongy', 'pongw', 'pongx', 'pongzs', 'po', 'poy', 'pow', 'pox', 'pozs', 'puy', 'pux', 'puzs', 'puaw', 'puah',
    'puaf', 'puan', 'puanx', 'puanzs', 'puann', 'puannw', 'puannzs', 'puat', 'pue', 'puey', 'puew', 'puex', 'puezs', 'puef', 'puf',
    'puiy', 'puiw', 'pun', 'puny', 'punw', 'punx', 'put', 'pud',

    'qa', 'qay', 'qaw', 'qazs', 'qah', 'qai', 'qaiy', 'qaiw', 'qainn', 'qainnx', 'qak', 'qag', 'qam', 'qamy', 'qamw', 'qamx',
    'qan', 'qany', 'qanw', 'qang', 'qangy', 'qangw', 'qangx', 'qangzs', 'qann', 'qanny', 'qannw', 'qannx', 'qap', 'qat', 'qau',
    'qauy', 'qauw', 'qaux', 'qauzs', 'qauh', 'qe', 'qey', 'qew', 'qezs', 'qeh', 'qef', 'qenn', 'qenny', 'qennw', 'qi', 'qiy',
    'qiw', 'qix', 'qizs', 'qia', 'qiaw', 'qiazs', 'qiaf', 'qiam', 'qiamy', 'qiamw', 'qiamx', 'qien', 'qieny', 'qienw', 'qienzs',
    'qiann', 'qianny', 'qiannw', 'qiannx', 'qiannzs', 'qiap', 'kiet', 'kied', 'qiau', 'qiauy', 'qiaux', 'qiauzs', 'qik', 'qig',
    'qim', 'qimy', 'qimw', 'qimzs', 'qin', 'qiny', 'qinw', 'qinzs', 'qing', 'qingy', 'qingw', 'qingx', 'qingzs', 'qinn', 'qinnw',
    'qinnx', 'kiurw', 'qiurx', 'qiurzs', 'qiurh', 'qiok', 'qiog', 'qiong', 'qiongy', 'qiongx', 'qiongzs', 'qip', 'qib', 'qid',
    'qiu', 'qiuy', 'qiuw', 'qiux', 'qiuzs', 'qiunn', 'qng', 'qngy', 'qngw', 'qur', 'qury', 'qurw', 'qurx', 'qurzs', 'qurh', 'qok',
    'qog', 'qong', 'qongy', 'qongw', 'qongx', 'qonnx', 'qo', 'qoy', 'qow', 'qox', 'qozs', 'qu', 'quy', 'quw', 'quzs', 'qua',
    'quay', 'quaw', 'quazs', 'quah', 'quai', 'quaiy', 'quaiw', 'quainn', 'quainny', 'quainnzs', 'quan', 'quany', 'quanw', 'quanx',
    'quanzs', 'quann', 'quanny', 'quannx', 'quannzs', 'quat', 'que', 'quey', 'quew', 'queh', 'qui', 'quiy', 'quiw', 'quix',
    'quizs', 'qun', 'quny', 'qunw', 'qunx', 'qunzs', 'qut', 'qud',

    'sa', 'say', 'saw', 'sah', 'saf', 'sai', 'saiy', 'saiw', 'saix', 'saizs', 'sak', 'sam', 'samy', 'samw', 'samx', 'san', 'sany',
    'sanw', 'sang', 'sangy', 'sangw', 'sann', 'sannh', 'sap', 'sat', 'sau', 'sauy', 'se', 'sey', 'sew', 'sex', 'seh', 'sef', 'senn',
    'senny', 'sennw', 'si', 'siy', 'siw', 'six', 'sizs', 'sia', 'siay', 'siaw', 'siax', 'siazs', 'siah', 'siaf', 'siak', 'siam',
    'siamy', 'siamw', 'siamx', 'sien', 'sieny', 'sienw', 'sienx', 'sienzs', 'siang', 'siangy', 'siangw', 'siangx', 'siangzs',
    'siann', 'sianny', 'siannw', 'siannx', 'siannzs', 'siap', 'siab', 'siet', 'sied', 'siau', 'siauy', 'siauw', 'siaux', 'siauzs',
    'sih', 'sif', 'sik', 'sig', 'sim', 'simy', 'simw', 'simx', 'simzs', 'sin', 'sinw', 'sinx', 'sinzs', 'sing', 'singy', 'singw',
    'singx', 'singzs', 'sinn', 'sinnw', 'sinnzs', 'siur', 'siury', 'siurx', 'siurh', 'siurf', 'siok', 'siog', 'siong', 'siongy',
    'siongw', 'siongx', 'siongzs', 'sip', 'sib', 'sit', 'sid', 'siu', 'siuy', 'siuw', 'siux', 'siuzs', 'siunn', 'siunny', 'siunnw',
    'siunnx', 'siunnzs', 'sng', 'sngy', 'sngw', 'sngx', 'sngh', 'sur', 'sury', 'surw', 'surx', 'surzs', 'surh', 'sok', 'som',
    'song', 'songy', 'songw', 'songx', 'so', 'soy', 'sow', 'su', 'suy', 'suw', 'sux', 'suzs', 'sua', 'suay', 'suaw', 'suah', 'suai',
    'suainnzs', 'suan', 'suany', 'suanw', 'suanx', 'suanzs', 'suann', 'suanny', 'suannw', 'suat', 'sue', 'suey', 'suew', 'suex',
    'sueh', 'suh', 'sui', 'suiy', 'suiw', 'suix', 'suizs', 'sun', 'suny', 'sunw', 'sunx', 'sunzs', 'sut', 'sud',

    'taw', 'tah', 'taf', 'tai', 'taiy', 'taiw', 'taix', 'taizs', 'tak', 'tag', 'tam', 'tamw', 'tamx', 'tamzs', 'tan', 'tany',
    'tanw', 'tanx', 'tang', 'tangy', 'tangw', 'tangx', 'tann', 'tanny', 'tap', 'tat', 'tau', 'tauy', 'tauw', 'taux', 'tauzs', 'te',
    'tey', 'tew', 'tex', 'tezs', 'teh', 'tef', 'tennw', 'tennx', 'ti', 'tiy', 'tiw', 'tix', 'tizs', 'tiah', 'tiam', 'tiamy',
    'tiamzs', 'tien', 'tieny', 'tiann', 'tiannw', 'tiannx', 'tiannzs', 'tiap', 'tiab', 'tiet', 'tiau', 'tiauy', 'tiauw', 'tiaux',
    'tiauzs', 'tih', 'tif', 'tik', 'tig', 'tim', 'tin', 'tinx', 'tinzs', 'ting', 'tingy', 'tingw', 'tingx', 'tinn', 'tinnzs',
    'tiur', 'tiurw', 'tiurx', 'tiok', 'tiong', 'tiongy', 'tiongw', 'tiongx', 'tiu', 'tiuy', 'tng', 'tngw', 'tngx', 'tngzs', 'tur',
    'tury', 'turw', 'turx', 'turh', 'turf', 'tok', 'tog', 'tong', 'tongy', 'tongw', 'tongzs', 'toy', 'tow', 'tox', 'tuy', 'tua',
    'tuazs', 'tuah', 'tuanx', 'tuann', 'tuanny', 'tuannw', 'tuat', 'tuh', 'tui', 'tuiy', 'tuiw', 'tuix', 'tun', 'tuny', 'tunx',
    'tunzs', 'tut', 'tud',

    'u', 'uy', 'uw', 'ux', 'uzs', 'ua', 'uay', 'uax', 'uaf', 'uai', 'uainny', 'uan', 'uany', 'uanw', 'uanx', 'uanzs', 'uang',
    'uann', 'uanny', 'uannw', 'uannzs', 'uat', 'uad', 'ue', 'uey', 'uew', 'uex', 'uezs', 'ueh', 'uh', 'ui', 'uiy', 'uiw', 'uix',
    'uizs', 'un', 'uny', 'unw', 'unx', 'unzs', 'ut',

    'ur', 'urw', 'urx', 'urh', 'urf',

    'va', 'vay', 'vaw', 'vax', 'vazs', 'vah', 'vai', 'vaiy', 'vaiw', 'vaix', 'vaizs', 'vak', 'vag', 'van', 'vany', 'vanx', 'vanzs',
    'vang', 'vangy', 'vangw', 'vangx', 'vat', 'vad', 'vau', 'vauy', 'vaux', 'vauzs', 've', 'vey', 'vew', 'vex', 'vezs', 'veh',
    'vef', 'venn', 'vennw', 'vennx', 'vennzs', 'vi', 'viy', 'viw', 'vix', 'vizs', 'viah', 'viak', 'viag', 'vien', 'vieny', 'vienw',
    'vienzs', 'viangw', 'viangzs', 'viann', 'vianny', 'viannw', 'viannx', 'viet', 'vied', 'viau', 'viauy', 'vih', 'vik', 'vig',
    'vin', 'viny', 'vinw', 'vinx', 'ving', 'vingy', 'vingw', 'vingx', 'vingzs', 'vinn', 'vinny', 'vinnw', 'vinnzs', 'viur', 'viury',
    'viurzs', 'vit', 'vid', 'viu', 'vng', 'vngy', 'vngzs', 'vur', 'vury', 'vurw', 'vurx', 'vurzs', 'vurh', 'vurf', 'vok', 'vog',
    'vongy', 'vongw', 'vongx', 'vongzs', 'vo', 'voy', 'vow', 'vox', 'vozs', 'vu', 'vuw', 'vux', 'vuzs', 'vuaw', 'vuah', 'vuaf',
    'vuan', 'vuanw', 'vuanx', 'vuanzs', 'vuann', 'vuanny', 'vuannw', 'vuannx', 'vuannzs', 'vuat', 'vuad', 'vue', 'vuey', 'vuew',
    'vuex', 'puezs', 'pueh', 'puef', 'vuh', 'vui', 'vuix', 'vuizs', 'vun', 'vuny', 'vunw', 'vunx', 'vunzs', 'vut', 'vud',

    'za', 'zay', 'zaw', 'zah', 'zaf', 'zai', 'zaiy', 'zaiw', 'zaix', 'zaizs', 'zainny', 'zak', 'zag', 'zam', 'zamy', 'zamw',
    'zamzs', 'zan', 'zany', 'zanw', 'zanx', 'zanzs', 'zang', 'zangy', 'zangw', 'zangx', 'zanny', 'zannzs', 'zab', 'zat', 'zad',
    'zau', 'zauy', 'zauw', 'zaux', 'zauzs', 'ze', 'zey', 'zew', 'zex', 'zezs', 'zeh', 'zef', 'zenn', 'zenny', 'zennw', 'zennzs',
    'zi', 'ziy', 'ziw', 'zix', 'zizs', 'zia', 'ziay', 'ziaw', 'ziazs', 'ziah', 'ziaf', 'ziam', 'ziamw', 'ziamx', 'ziamzs', 'zien',
    'zieny', 'zienw', 'zienx', 'zienzs', 'ziang', 'ziangy', 'ziangw', 'ziann', 'zianny', 'ziannw', 'ziannx', 'ziannzs', 'ziap',
    'ziab', 'ziet', 'zied', 'ziau', 'ziauy', 'ziauw', 'ziaux', 'zih', 'zif', 'zik', 'zig', 'zim', 'zimy', 'zimw', 'zimx', 'zin',
    'ziny', 'zinw', 'zinx', 'zinzs', 'zing', 'zingy', 'zingw', 'zingx', 'zingzs', 'zinn', 'zinny', 'zinnw', 'zinnx', 'zinnzs',
    'ziur', 'ziury', 'ziurw', 'ziurh', 'ziurf', 'ziok', 'ziong', 'ziongy', 'ziongw', 'ziongx', 'ziongzs', 'zip', 'zib', 'zit',
    'zid', 'ziu', 'ziuy', 'ziuw', 'ziuzs', 'ziunn', 'ziunny', 'ziunnw', 'ziunnzs', 'zng', 'zngy', 'zngw', 'zngx', 'zngzs', 'zur',
    'zury', 'zurw', 'zurx', 'zurzs', 'zurh', 'zok', 'zog', 'zong', 'zongy', 'zongw', 'zongx', 'zongzs', 'zo', 'zoy', 'zozs', 'zu',
    'zuy', 'zuw', 'zux', 'zuxzs', 'zuay', 'zuax', 'zuazs', 'zuah', 'zuaf', 'zuainnzs', 'zuan', 'zuany', 'zuanw', 'zuanx', 'zuanzs',
    'zuann', 'zuanny', 'zuannw', 'zuannx', 'zuannzs', 'zud', 'zuew', 'zuezs', 'zuh', 'zui', 'zuiy', 'zuiw', 'zuix', 'zuizs', 'zun',
    'zuny', 'zunw', 'zunx', 'zunzs', 'zut', 'zud', 

]
