import { AlphabeticLetter, Final, ToneMark, Sound, MedialGraphs, NasalGraphs, 
        FreeToneMarkGraphs, CheckedToneMarkGraphs, NeutralFinalGraphs, FinalGraphs, InitialNasalGraphs,
        InitialGraphs, ToneMarkSS, FreeToneMarkY, ToneMarkW, FreeToneMarkX, ToneMarkXX, ToneMarkXXX, ToneMarkZZS, ToneMarkZS, 
        FinalP, FinalT, FinalK, FinalH, FinalB, FinalD, FinalG, FinalF, ToneMarkP, ToneMarkT, ToneMarkK, ToneMarkH, CheckedToneMarkY, 
        ToneMarkB, ToneMarkD, ToneMarkG, ToneMarkF, CheckedToneMarkX } from './grapheme'
import { ZeroToneMark } from './grapheme'
import { IDictionary, Dictionary } from './collection'

//------------------------------------------------------------------------------
//  Morph
//------------------------------------------------------------------------------

class Morph {}

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class ToneMorpheme {}

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------


export class Allomorph extends Morph {
    toneMark: ToneMark = null;

    isToneMarkEqualTo(syllable: ToneSandhiSyllable) {
        return this.toneMark.isEqualTo(syllable.letters[syllable.letters.length-1]);
    }

    hasZeroToneMark() {
        //return this.toneMark.isLetterNull();
        return this.toneMark.isCharacterNull();
    }

    getLiteral() {
        if(this.toneMark.getLiteral().length == 0) { 
            // return string 'zero' for first tone. member variable characters for graph is still null.
            return 'zero'; 
        } else return this.toneMark.getLiteral();
    }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
    final: Final = null;
}

class ZeroAllomorph extends FreeAllomorph {
    toneMark = new ZeroToneMark()
}

class AllomorphSS extends FreeAllomorph {
    toneMark = new ToneMarkSS()
}

class AllomorphY extends FreeAllomorph {
    toneMark = new FreeToneMarkY()
}

class AllomorphW extends FreeAllomorph {
    toneMark = new ToneMarkW()
}

class AllomorphX extends FreeAllomorph {
    toneMark = new FreeToneMarkX()
}

class AllomorphXX extends FreeAllomorph {
    toneMark = new ToneMarkXX()
}

class AllomorphXXX extends FreeAllomorph {
    toneMark = new ToneMarkXXX()
}

class AllomorphZZS extends FreeAllomorph {
    toneMark = new ToneMarkZZS()
}

class AllomorphZS extends FreeAllomorph {
    toneMark = new ToneMarkZS()
}

class AllomorphPP extends CheckedAllomorph {
    toneMark = new ToneMarkP()
    final = new FinalP()
}

class AllomorphTT extends CheckedAllomorph {
    toneMark = new ToneMarkT()
    final = new FinalT()
}

class AllomorphKK extends CheckedAllomorph {
    toneMark = new ToneMarkK()
    final = new FinalK()
}

class AllomorphHH extends CheckedAllomorph {
    toneMark = new ToneMarkH()
    final = new FinalH()
}

class AllomorphHY extends CheckedAllomorph {
    toneMark = new CheckedToneMarkY()
    final = new FinalH()
}

class AllomorphBB extends CheckedAllomorph {
    toneMark = new ToneMarkB()
    final = new FinalB()
}

class AllomorphDD extends CheckedAllomorph {
    toneMark = new ToneMarkD()
    final = new FinalD()
}

class AllomorphGG extends CheckedAllomorph {
    toneMark = new ToneMarkG()
    final = new FinalG()
}

class AllomorphFF extends CheckedAllomorph {
    toneMark = new ToneMarkF()
    final = new FinalF()
}

class AllomorphBX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalB()
}

class AllomorphDX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalD()
}

class AllomorphGX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalG()
}

class AllomorphFX extends CheckedAllomorph {
    toneMark = new CheckedToneMarkX()
    final = new FinalF()
}

class Allomorphs {
    listOfFreeAllomorph: Array<Allomorph>  = new Array();
    listOfChechedAllomorph: Array<Allomorph>  = new Array();

    constructor() {
        this.listOfFreeAllomorph.push(new AllomorphSS());
        this.listOfFreeAllomorph.push(new AllomorphW());
        this.listOfFreeAllomorph.push(new AllomorphXX());
        this.listOfFreeAllomorph.push(new AllomorphXXX());
        this.listOfFreeAllomorph.push(new AllomorphZZS());
        this.listOfFreeAllomorph.push(new AllomorphZS());

        this.listOfFreeAllomorph.push(new AllomorphY());
        this.listOfFreeAllomorph.push(new AllomorphX());

        //-- 

        this.listOfChechedAllomorph.push(new AllomorphPP());
        this.listOfChechedAllomorph.push(new AllomorphTT());
        this.listOfChechedAllomorph.push(new AllomorphKK());
        this.listOfChechedAllomorph.push(new AllomorphHH());
        this.listOfChechedAllomorph.push(new AllomorphBB());
        this.listOfChechedAllomorph.push(new AllomorphDD());
        this.listOfChechedAllomorph.push(new AllomorphGG());
        this.listOfChechedAllomorph.push(new AllomorphFF());
        this.listOfChechedAllomorph.push(new AllomorphHY());
        this.listOfChechedAllomorph.push(new AllomorphBX());
        this.listOfChechedAllomorph.push(new AllomorphDX());
        this.listOfChechedAllomorph.push(new AllomorphGX());
        this.listOfChechedAllomorph.push(new AllomorphFX());
    }
}

//------------------------------------------------------------------------------
//  Root
//------------------------------------------------------------------------------

class LexicalRoot {
    stem: Stem
    affix: Affix
}

export class Stem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    sounds: Array<Sound>;
    // abstract factory
}

class VowelStem extends Stem {}
class ConsonantStem extends Stem {}

export class Affix extends Morph {
    toneMark: ToneMark = null;
}

class FreeAffix extends Affix {}

class CheckedAffix extends Affix {
    final: Final = null;
}

class ZeroAffix extends FreeAffix {
    toneMark = new ZeroToneMark()
}

class Interfix extends Affix {}
class Suffix extends Affix {}

class DerivationalAffix {}

class GrammaticalSuffix {
    // desinence
}

//------------------------------------------------------------------------------
//  Free Allomorph Cycling Rules
//------------------------------------------------------------------------------

interface IDictionaryOfRules extends IDictionary {
    //toString(): string;
}

class DictionaryOfRules extends Dictionary {
    constructor(init: { key: string; value: Array<ToneMark>; }[]) {
        super(init);
    }

    toLookup(): IDictionaryOfRules {
        return this;
    }
}

export class FreeAllomorphCyclingRules {
    readonly rules = new DictionaryOfRules([
        { key: 'ss', value: [new FreeToneMarkY()] },
        { key: 'w', value: [new ToneMarkZS(), new FreeToneMarkX()] },
        { key: 'xx', value: [new ToneMarkZS(), new ToneMarkSS, new FreeToneMarkX()] },
        { key: 'xxx', value: [new ToneMarkZS(), new ToneMarkSS(), new FreeToneMarkX()] },
        { key: 'zs', value: [new FreeToneMarkX(), new ToneMarkSS(), new ZeroToneMark()] },
        { key: 'zzs', value: [] },

        { key: 'x', value: [] },
        { key: 'y', value: [new ToneMarkW()] },

        { key: 'zero', value: [new FreeToneMarkY()] },
    ]).toLookup();
}

//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme
//------------------------------------------------------------------------------

export class Morpheme {}

export class ToneSandhiMorpheme extends Morpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null; // required to populate stems

    constructor(syllable: ToneSandhiSyllable) {
        super();
        this.syllable = syllable;
        // assign allomorph for each syllable
        this.assignAllomorph();
    }

    assignAllomorph() {
        let allomorphs = new Allomorphs();
        let aoas = []; // array of allomorphs

        //console.log(aotms)
        for(let key in allomorphs.listOfChechedAllomorph) {
            if(allomorphs.listOfChechedAllomorph[key].isToneMarkEqualTo(this.syllable)) {
                aoas.push(allomorphs.listOfChechedAllomorph[key]);
                break;
            }
        }
        //console.log(aotms)

        if(aoas.length) {
            for(let i = 0; i < aoas.length; i++) {
                //console.log("aotms[i].final: %s", aotms[i].final.letter.literal);
                //console.log("letter: %s", this.syllable.letters[this.syllable.letters.length-2].literal)
                if(aoas[i].final.isEqualTo(this.syllable.letters[this.syllable.letters.length-2])) {
                    //console.log("hit. i: %d.", i)
                    this.allomorph = aoas[i];
                } else if(aoas[i].final.isEqualTo(this.syllable.letters[this.syllable.letters.length-1])) {
                    // if final is equal to tone mark
                    return;
                }
                // when there are no matches, it means this syllable is already in base form
            }
            if(this.allomorph != null) {
                // if there are allomorph
                return;
            }
        }
        //console.log(aotms)

        aoas = [];
        for(let key in allomorphs.listOfFreeAllomorph) {
            if(allomorphs.listOfFreeAllomorph[key].isToneMarkEqualTo(this.syllable)) {
                aoas.push(allomorphs.listOfFreeAllomorph[key]);
                break;
            }
        }
        //console.log(aotms)

        if(aoas.length == 0) {
            this.allomorph = new ZeroAllomorph();
        } else if(aoas.length) {
            // are there multiple allomorphs? there should be only one.
            for(let i = 0; i < aoas.length; i++) {
                if(aoas[i].toneMark.isEqualToToneMark(new AllomorphX().toneMark)) {
                    // this syllable is already in base form
                } else {
                    this.allomorph = aoas[i];
                }
            }
        }
    }

    getBaseForms(): Array<ToneSandhiSyllable> {
        let facrs = new FreeAllomorphCyclingRules();
        // get base forms as strings
        if(this.allomorph != null) {
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph.hasZeroToneMark()) {
                    // no need to pop letter
                    // push letter
                    // the base tone of the first tone is the second tone
                    // 1 to 2
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.pushLetter(new AlphabeticLetter(facrs.rules['zero'][0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // pop letter
                    // push letter
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in facrs.rules[this.allomorph.getLiteral()]) {
                        let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                        if(!facrs.rules[this.allomorph.getLiteral()][i].isCharacterNull()) {
                            // 2 to 3. 3 to 7. 7 to 5. 5 to 3.
                            s.popLetter();
                            // there are base tonemarks
                            // includes ss and x, exclude zero suffix
                            s.pushLetter(new AlphabeticLetter(facrs.rules[this.allomorph.getLiteral()][i].characters));
                            ret.push(s);
                        } else {
                            // include zero suffix. the base tone of the seventh tone.
                            // exclude ss and x.
                            // 7 to 1
                            s.popLetter();
                            ret.push(s);
                        }
                    }
                    //console.log(ret)
                    return ret;
                }
            } else if(this.allomorph instanceof CheckedAllomorph) {
                // pop the last letter
                // no need to push letter
                let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                s.popLetter();
                //console.log(s)
                return [s];
            }
        } else {
            return [new ToneSandhiSyllable(this.syllable.letters)];
        }
        return []; // return empty array
    }
}

export class RootMorpheme extends ToneSandhiMorpheme {
    // affix
    populateStem(msp: MatchedPattern) {
    }
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

class PatternOfSounds {
    list: Array<Sound>

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

export class SyllablePatterns {
    list = new Array();

    constructor() {
        // one letter
        this.list.push([new MedialGraphs()]);
        this.list.push([new InitialNasalGraphs()]);

        // two letters
        this.list.push([new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new FinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs()]);
        this.list.push([new InitialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialNasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialNasalGraphs(), new NasalGraphs()]);

        // three letters
        this.list.push([new MedialGraphs(), new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new MedialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new FinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialNasalGraphs(), new NasalGraphs(), new NeutralFinalGraphs()]);
        this.list.push([new InitialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new FinalGraphs(), new CheckedToneMarkGraphs()]);

        // four letters
        this.list.push([new MedialGraphs(), new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new MedialGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new FinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new NasalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new NasalGraphs(), new NeutralFinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new MedialGraphs(), new MedialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new FinalGraphs(), new CheckedToneMarkGraphs()]);

        // five letters
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new NasalGraphs(), new NeutralFinalGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new NasalGraphs(), new FreeToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new FinalGraphs(), new CheckedToneMarkGraphs()]);
        this.list.push([new InitialGraphs(), new MedialGraphs(), new MedialGraphs(), new MedialGraphs(), new FreeToneMarkGraphs()]);

        // lueifx, lurifx
    }
}

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<PatternOfSounds> = new Array();
    get matchedLength() { return this.pattern.length; }
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------


export class Syllable {
    literal: string = '';
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(let i = 0; i < len; i++) {
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
        let tmp = this.literal.substr(0, this.literal.length-this.letters[this.letters.length-1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length-1);
    }

    get lastLetter() {
        return this.letters[this.letters.length-1]
    }
}
