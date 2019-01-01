import { AlphabeticLetter } from './grapheme'
import { ZeroTonal, TonalSS, FreeTonalY, TonalW, FreeTonalX, TonalXX, TonalXXX, TonalZZS, TonalZS, 
    FinalP, FinalT, FinalK, FinalH, FinalB, FinalD, FinalG, FinalF, TonalP, TonalT, TonalK, TonalH, CheckedTonalY, 
    TonalB, TonalD, TonalG, TonalF, CheckedTonalX } from './version1'
import { Sound, Tonal, Final } from './system'

//------------------------------------------------------------------------------
//  Morph
//------------------------------------------------------------------------------

class Morph {}

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class TonalMorpheme {}

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------


export class Allomorph extends Morph {
    tonal: Tonal = null;

    getLiteral() {
        if(this.tonal.getLiteral().length == 0) { 
            // return string 'zero' for first tone. member variable characters of graph is still null.
            return 'zero'; 
        } else return this.tonal.getLiteral();
    }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
    final: Final = null;

    getLiteral() {
        if(this.tonal != null) {
            return this.final.getLiteral() + this.tonal.getLiteral()
        }
        return this.final.getLiteral()
    }
}

export class ZeroAllomorph extends FreeAllomorph {
    tonal = new ZeroTonal()
}

class AllomorphSS extends FreeAllomorph {
    tonal = new TonalSS()
}

export class AllomorphY extends FreeAllomorph {
    tonal = new FreeTonalY()
}

export class AllomorphW extends FreeAllomorph {
    tonal = new TonalW()
}

export class AllomorphX extends FreeAllomorph {
    tonal = new FreeTonalX()
}

class AllomorphXX extends FreeAllomorph {
    tonal = new TonalXX()
}

class AllomorphXXX extends FreeAllomorph {
    tonal = new TonalXXX()
}

class AllomorphZZS extends FreeAllomorph {
    tonal = new TonalZZS()
}

export class AllomorphZS extends FreeAllomorph {
    tonal = new TonalZS()
}

class AllomorphPP extends CheckedAllomorph {
    final = new FinalP()
    tonal = new TonalP()
}

class AllomorphTT extends CheckedAllomorph {
    final = new FinalT()
    tonal = new TonalT()
}

class AllomorphKK extends CheckedAllomorph {
    final = new FinalK()
    tonal = new TonalK()
}

class AllomorphHH extends CheckedAllomorph {
    final = new FinalH()
    tonal = new TonalH()
}

class AllomorphHY extends CheckedAllomorph {
    final = new FinalH()
    tonal = new CheckedTonalY()
}

class AllomorphBB extends CheckedAllomorph {
    final = new FinalB()
    tonal = new TonalB()
}

class AllomorphDD extends CheckedAllomorph {
    final = new FinalD()
    tonal = new TonalD()
}

class AllomorphGG extends CheckedAllomorph {
    final = new FinalG()
    tonal = new TonalG()
}

class AllomorphFF extends CheckedAllomorph {
    final = new FinalF()
    tonal = new TonalF()
}

class AllomorphBX extends CheckedAllomorph {
    final = new FinalB()
    tonal = new CheckedTonalX()
}

class AllomorphDX extends CheckedAllomorph {
    final = new FinalD()
    tonal = new CheckedTonalX()
}

class AllomorphGX extends CheckedAllomorph {
    final = new FinalG()
    tonal = new CheckedTonalX()
}

class AllomorphFX extends CheckedAllomorph {
    final = new FinalF()
    tonal = new CheckedTonalX()
}

class ListOfFreeAllomorphs {
    protected getSS() { return new AllomorphSS() }
    protected getW() { return new AllomorphW() }
    protected getXX() { return new AllomorphXX() }
    protected getXXX() { return new AllomorphXXX() }
    protected getZZS() { return new AllomorphZZS() }
    protected getZS() { return new AllomorphZS() }
    protected getY() { return new AllomorphY() }
    protected getX() { return new AllomorphX() }
}

class ListOfFreeAllomorphsForInputing extends ListOfFreeAllomorphs {
    get ss() { return this.getSS() }
    get w() { return this.getW() }
    get xx() { return this.getXX () }
    get xxx() { return this.getXXX() }
    get zzs() { return this.getZZS() }
    get zs() { return this.getZS() }
    get y() { return this.getY() }
    get x() { return this.getX() }
}

class ListOfFreeAllomorphsForParsing extends ListOfFreeAllomorphs {
    get w() { return this.getW() }
    get zs() { return this.getZS() }

    get x() { return this.getX() }
    get y() { return this.getY() }
}

class ListOfAllomorphsInSandhiForm {
    // to specify the allomorphs in sandhi form
    listOfFreeAllomorphs: Array<Allomorph>  = new Array();
    listOfChechedAllomorphs: Array<Allomorph>  = new Array();

    private lofafi = new ListOfFreeAllomorphsForInputing()

    constructor() {
        this.listOfFreeAllomorphs.push(this.lofafi.ss)
        this.listOfFreeAllomorphs.push(this.lofafi.w)
        this.listOfFreeAllomorphs.push(this.lofafi.xx)
        this.listOfFreeAllomorphs.push(this.lofafi.xxx)
        this.listOfFreeAllomorphs.push(this.lofafi.zzs)
        this.listOfFreeAllomorphs.push(this.lofafi.zs)

        this.listOfFreeAllomorphs.push(this.lofafi.y)
        this.listOfFreeAllomorphs.push(this.lofafi.x)

        //<-->

        this.listOfChechedAllomorphs.push(new AllomorphP());
        this.listOfChechedAllomorphs.push(new AllomorphT());
        this.listOfChechedAllomorphs.push(new AllomorphK());
        this.listOfChechedAllomorphs.push(new AllomorphH());
        this.listOfChechedAllomorphs.push(new AllomorphB());
        this.listOfChechedAllomorphs.push(new AllomorphD());
        this.listOfChechedAllomorphs.push(new AllomorphG());
        this.listOfChechedAllomorphs.push(new AllomorphF());

        this.listOfChechedAllomorphs.push(new AllomorphPP());
        this.listOfChechedAllomorphs.push(new AllomorphTT());
        this.listOfChechedAllomorphs.push(new AllomorphKK());
        this.listOfChechedAllomorphs.push(new AllomorphHH());
        this.listOfChechedAllomorphs.push(new AllomorphBB());
        this.listOfChechedAllomorphs.push(new AllomorphDD());
        this.listOfChechedAllomorphs.push(new AllomorphGG());
        this.listOfChechedAllomorphs.push(new AllomorphFF());
        this.listOfChechedAllomorphs.push(new AllomorphHY());
        this.listOfChechedAllomorphs.push(new AllomorphBX());
        this.listOfChechedAllomorphs.push(new AllomorphDX());
        this.listOfChechedAllomorphs.push(new AllomorphGX());
        this.listOfChechedAllomorphs.push(new AllomorphFX());
    }
}

class AllomorphP extends CheckedAllomorph {
    final = new FinalP()
}

class AllomorphT extends CheckedAllomorph {
    final = new FinalT()
}

class AllomorphK extends CheckedAllomorph {
    final = new FinalK()
}

class AllomorphH extends CheckedAllomorph {
    final = new FinalH()
}

class AllomorphB extends CheckedAllomorph {
    final = new FinalB()
}

class AllomorphD extends CheckedAllomorph {
    final = new FinalD()
}

class AllomorphG extends CheckedAllomorph {
    final = new FinalG()
}

class AllomorphF extends CheckedAllomorph {
    final = new FinalF()
}

class ListOfAllomorphsInBaseForm {
    // to specify the allomorphs in base form
    listOfFreeAllomorphs: Array<Allomorph>  = new Array();
    listOfChechedAllomorphs: Array<Allomorph>  = new Array();

    private lofafp = new ListOfFreeAllomorphsForParsing()

    constructor() {
        this.listOfFreeAllomorphs.push(this.lofafp.w)
        this.listOfFreeAllomorphs.push(this.lofafp.zs)
        
        this.listOfFreeAllomorphs.push(this.lofafp.x)
        this.listOfFreeAllomorphs.push(this.lofafp.y)

        this.listOfChechedAllomorphs.push(new AllomorphP()); // -> pp
        this.listOfChechedAllomorphs.push(new AllomorphT()); // -> tt
        this.listOfChechedAllomorphs.push(new AllomorphK()); // -> kk
        this.listOfChechedAllomorphs.push(new AllomorphH()); // -> hh and hy
        this.listOfChechedAllomorphs.push(new AllomorphB()); // -> bb
        this.listOfChechedAllomorphs.push(new AllomorphD()); // -> dd
        this.listOfChechedAllomorphs.push(new AllomorphG()); // -> gg
        this.listOfChechedAllomorphs.push(new AllomorphF()); // -> ff
    }
}

//------------------------------------------------------------------------------
//  Root
//------------------------------------------------------------------------------

class LexicalRoot {
    stem: LexicalStem
    affix: TonalAffix
}

export class LexicalStem {
    sounds: Array<Sound>;
}

class VowelStem extends LexicalStem {}
class ConsonantStem extends LexicalStem {}

export class TonalAffix extends Morph {
    tonal: Tonal = null
    getLiteral() {
        return this.tonal.getLiteral()
    }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
    // there is no final for affix
}

class ZeroAffix extends FreeAffix {
    tonal = new ZeroTonal()
}

class DerivationalAffix {
    // lexical ending
}

class GrammaticalSuffix {
    // desinence
}

//------------------------------------------------------------------------------
//  Free Allomorph Base Rules
//------------------------------------------------------------------------------

export const freeAllomorphBaseRules: Map<string, Tonal[]> = new Map()
    .set('ss', [new FreeTonalY()])
    .set('w', [new TonalZS(), new FreeTonalX()])
    .set('xx', [new TonalZS(), new TonalSS, new FreeTonalX()])
    .set('xxx', [new TonalZS(), new TonalSS(), new FreeTonalX()])
    .set('zs', [new FreeTonalX(), new TonalSS(), new ZeroTonal()])
    .set('zzs', [])
    .set('x', [])
    .set('y', [new TonalW()])
    .set('zero', [new FreeTonalY()])

//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme
//------------------------------------------------------------------------------

export class Morpheme {}

class TonemarklessMorpheme extends Morpheme {}

export class ToneSandhiMorpheme extends Morpheme {}

export class ToneSandhiInputingMorpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null; // required to populate stems
    sounds: Array<Sound> // should sounds be blended with morphemes

    constructor(syllable: ToneSandhiSyllable) {
        this.syllable = syllable;
        this.sounds = new Array() // should sounds be blended with morphemes
        // assign allomorph for each syllable
        this.assignAllomorph();
    }

    assignAllomorph() {
        // assign the matched allomorph for this syllable
        // don't assign if the checked syllable is already in base form
        let allomorphs = new ListOfAllomorphsInSandhiForm();
        let aoas: Array<Allomorph> = []; // array of allomorphs

        //console.log(aotms)
        for(let key in allomorphs.listOfChechedAllomorphs) {
            if(this.syllable.literal.substr(this.syllable.literal.length-allomorphs.listOfChechedAllomorphs[key].getLiteral().length).lastIndexOf(allomorphs.listOfChechedAllomorphs[key].getLiteral()) != -1) {
                //console.debug(allomorphs.listOfChechedAllomorphs[key].getLiteral())
                //console.debug(this.syllable.literal.lastIndexOf(allomorphs.listOfChechedAllomorphs[key].getLiteral()))
                aoas.push(allomorphs.listOfChechedAllomorphs[key]);
                // there's no need to break here, as we want to collect the second match, if any
            }
        }
        //console.log(aoas)

        if(aoas.length > 0) {
            //console.debug('length of aoas: %d', aoas.length)
            if(aoas.length == 2) {
                let first = aoas[0]
                let second = aoas[1]
                if(first instanceof CheckedAllomorph && second instanceof CheckedAllomorph) {
                    if(first.final.getLiteral() === second.final.getLiteral()) {
                        // discard the base form
                        if(aoas[1].tonal != null) {
                            // the 1st element is in base form
                            aoas.shift()
                        } else if(aoas[0].tonal != null) {
                            // the 2nd element is in base form
                            aoas.pop()
                        }
                    }
                }
            }else if(aoas.length == 1 && aoas[0].tonal == null){
                // just return for stop finals without tonal
                return
            } else if(aoas.length == 1 && aoas[0].tonal.isEqualToTonal(new AllomorphHY().tonal)) {
                // there should be no more than 2 matches, either 1 match or 2
                // just fall through for the case of 'hy'
            } 

            // there is only one match after processing, we just assign it
            this.allomorph = aoas.shift();

            // we already have an allomorph assigned, just return
            return;
        }

        // after matching with checked allomorphs, we go on matching free allomorphs
        aoas = [];
        for(let key in allomorphs.listOfFreeAllomorphs) {
            if(this.syllable.literal.lastIndexOf(allomorphs.listOfFreeAllomorphs[key].getLiteral()) != -1) {
                //console.log(allomorphs.listOfFreeAllomorphs[key].getLiteral())
                //console.log(this.syllable.literal.lastIndexOf(allomorphs.listOfFreeAllomorphs[key].getLiteral()))
                aoas.push(allomorphs.listOfFreeAllomorphs[key]);
                break;
            }
        }
        //console.log(aotms)

        if(aoas.length == 0) {
            // tone 1 has no allomorph
            this.allomorph = new ZeroAllomorph();
        } else if(aoas.length) {
            // are there multiple allomorphs? there should be only one.
            for(let i = 0; i < aoas.length; i++) {
                if(aoas[i].tonal.isEqualToTonal(new AllomorphX().tonal)) {
                    // this syllable is already in base form
                    // in order to display this inflectional ending, we have to assign
                    this.allomorph = aoas[i]
                } else {
                    this.allomorph = aoas[i];
                }
            }
        }
    }

    getBaseForms(): Array<ToneSandhiSyllable> {
        //let facrs = new FreeAllomorphBaseRules();
        // get base forms as strings
        if(this.allomorph != null) {
            // member variable allomorph is not null
            if(this.allomorph instanceof FreeAllomorph) {
                //if(this.allomorph.hasZeroTonal()) {
                if(this.allomorph instanceof ZeroAllomorph) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2 ---->
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.pushLetter(new AlphabeticLetter(freeAllomorphBaseRules.get('zero')[0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in freeAllomorphBaseRules.get(this.allomorph.getLiteral())) {
                        // pop letter
                        // push letter
                        let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                        //if(!facrs.rules[this.allomorph.getLiteral()][i].isCharacterNull()) {
                        if(!(freeAllomorphBaseRules.get(this.allomorph.getLiteral())[i] instanceof ZeroAllomorph)) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.  ---->
                            s.popLetter();
                            // there are base tonals
                            // includes ss and x, exclude zero allomorph
                            s.pushLetter(new AlphabeticLetter(freeAllomorphBaseRules.get(this.allomorph.getLiteral())[i].characters));
                            ret.push(s);
                        } else {
                            // include zero suffix. the base tone of the seventh tone.
                            // exclude ss and x.
                            // 7 to 1 ---->
                            // tone 1 has no allomorph
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
                // 1 to 4. 3 to 8. 2 to 4. 5 to 8.  ---->
                let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                s.popLetter();
                //console.log(s.literal)
                return [s];
            }
        } else {
            // member variable allomorph is null
            // this syllable is already in base form
            // is this block redundant
            return [new ToneSandhiSyllable(this.syllable.letters)];
        }
        return []; // return empty array
    }
}

export class ToneSandhiRootMorpheme extends ToneSandhiMorpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null;


    constructor(syllable: ToneSandhiSyllable) {
        super();
        this.syllable = syllable;
    }

    assignAllomorph() {}
}

export class CombiningFormMorpheme extends ToneSandhiRootMorpheme {
    assignAllomorph() {
        let allomorphs = new ListOfAllomorphsInBaseForm()
        //let fasrs = new FreeAllomorphSandhiRules()
        for(let k in allomorphs.listOfChechedAllomorphs) {
            if(this.syllable.literal.substr(this.syllable.literal.length-allomorphs.listOfChechedAllomorphs[k].getLiteral().length).lastIndexOf(allomorphs.listOfChechedAllomorphs[k].getLiteral()) != -1) {
                this.allomorph = allomorphs.listOfChechedAllomorphs[k]
                return
            }
        }

        for(let k in allomorphs.listOfFreeAllomorphs) {
            if(this.syllable.literal.lastIndexOf(allomorphs.listOfFreeAllomorphs[k].getLiteral()) != -1) {
                this.allomorph = allomorphs.listOfFreeAllomorphs[k]
                return
            }
        }

        this.allomorph = new ZeroAllomorph()
        return
    }

    getCombiningForm(tm: Tonal): ToneSandhiSyllable  {
        if(this.allomorph != null) {
            let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph instanceof ZeroAllomorph) {
                    s.pushLetter(new AlphabeticLetter(tm.characters))
                } else if(this.allomorph instanceof AllomorphY) {
                    s.popLetter()
                    return s
                } else {
                    s.popLetter()
                    s.pushLetter(new AlphabeticLetter(tm.characters))
                    return s
                }
            } else if(this.allomorph instanceof CheckedAllomorph) {
                s.pushLetter(new AlphabeticLetter(this.allomorph.tonal.characters))
                return s
            }
        }
        return null
    }
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<Sound> = new Array();
    get matchedLength() { return this.letters.length; } // length of pattern can be optionally returned
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
