
import { AlphabeticLetter } from './grapheme'
import { Sound, Tonal, Morph, Allomorph, FreeAllomorph, CheckedAllomorph } from './system'
import {
    listOfFreeAllomorphs,
    listOfCheckedAllomorphs,
    listOfUncombinedFreeAllomorphs,
    listOfUncombinedCheckedAllomorphs,
    freeAllomorphUncombiningRules,
    AllomorphHY,
    ZeroAllomorph,
    AllomorphX,
    AllomorphY,
    ZeroTonal,
    } from './version1'

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class TonalMorpheme {}

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
        let aoas: Array<Allomorph> = []; // array of allomorphs

        let keys = Array.from(listOfCheckedAllomorphs.keys())
        for(let k = 0; k < keys.length; k++) {
            let am = listOfCheckedAllomorphs.get(keys[k])
            if(am instanceof CheckedAllomorph) {
                if(am.tonal != null) {
                    if(am.tonal.getLiteral() === this.syllable.lastLetter.literal
                        && am.final.getLiteral() === this.syllable.lastSecondLetter.literal) {
                        aoas.push(listOfCheckedAllomorphs.get(keys[k]));
                        // there's no need to break here, as we want to collect the second match, if any
                    }
                } else {
                    if(am.final.getLiteral() === this.syllable.lastLetter.literal) {
                        aoas.push(listOfCheckedAllomorphs.get(keys[k]));
                    }
                }
            }
        }

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
        if(listOfFreeAllomorphs.has(this.syllable.lastLetter.literal)) {
            aoas.push(listOfFreeAllomorphs.get(this.syllable.lastLetter.literal));
        }

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
        // get base forms as strings
        if(this.allomorph != null) {
            // member variable allomorph is not null
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph instanceof ZeroAllomorph) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2 ---->
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get('zero')[0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in freeAllomorphUncombiningRules.get(this.allomorph.getLiteral())) {
                        // pop letter
                        // push letter
                        let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                        //if(!facrs.rules[this.allomorph.getLiteral()][i].isCharacterNull()) {
                        if(!(freeAllomorphUncombiningRules.get(this.allomorph.getLiteral())[i] instanceof ZeroAllomorph)) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.  ---->
                            s.popLetter();
                            // there are base tonals
                            // includes ss and x, exclude zero allomorph
                            s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get(this.allomorph.getLiteral())[i].characters));
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
        if(listOfUncombinedCheckedAllomorphs.has(this.syllable.lastLetter.literal)) {
            this.allomorph = listOfUncombinedCheckedAllomorphs.get(this.syllable.lastLetter.literal)
            return
        }

        if(listOfUncombinedFreeAllomorphs.has(this.syllable.lastLetter.literal)) {
            this.allomorph = listOfUncombinedFreeAllomorphs.get(this.syllable.lastLetter.literal)
            return
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
        if(this.letters.length >= 1) return this.letters[this.letters.length-1]
        return null
    }

    get lastSecondLetter() {
        if(this.letters.length >= 2) return this.letters[this.letters.length-2]
        return null
    }
}
