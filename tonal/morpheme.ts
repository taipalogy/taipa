import { Syllable, Morpheme, MorphemeMaker, MatchedPattern, SyllableMetaplasm } from '../morpheme'
import { Syllabary } from '../morpheme'
import { freeAllomorphUncombiningRules, listOfCheckedAllomorphs, listOfFreeAllomorphs,
    ZeroAllomorph, AllomorphHY, AllomorphX } from './version2'
import { AlphabeticLetter, AlphabeticGrapheme, Tonal } from '../grapheme'
import { ListOfLexicalRoots } from './lexicalroot'
import { CheckedAllomorph, FreeAllomorph, Allomorph, listOfUncombinedCheckedAllomorphs,
    listOfUncombinedFreeAllomorphs, AllomorphY } from './version2'

//------------------------------------------------------------------------------
//  Tonal Syllable Metaplasm
//------------------------------------------------------------------------------

export class TonalSyllableMetaplasm extends SyllableMetaplasm {
    assignAllomorph(syllable: TonalSyllable): Allomorph { return null }
    apply(syllable: TonalSyllable, allomorph: Allomorph) {}
}

export class TonalUncombiningForms extends TonalSyllableMetaplasm {
    assignAllomorph(syllable: TonalSyllable): Allomorph {
        let allomorph: Allomorph
        // assign the matched allomorph for this syllable
        // don't assign if the checked syllable is already in base form
        let aoas: Array<Allomorph> = []; // array of allomorphs

        let keys = Array.from(listOfCheckedAllomorphs.keys())
        for(let k = 0; k < keys.length; k++) {
            let am = listOfCheckedAllomorphs.get(keys[k])
            if(am instanceof CheckedAllomorph) {
                if(am.tonal != null) {
                    if(am.tonal.getLiteral() === syllable.lastLetter.literal
                        && am.final.getLiteral() === syllable.lastSecondLetter.literal) {
                        aoas.push(listOfCheckedAllomorphs.get(keys[k]));
                        // there's no need to break here, as we want to collect the second match, if any
                    }
                } else {
                    if(am.final.getLiteral() === syllable.lastLetter.literal) {
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
            } else if(aoas.length == 1 && aoas[0].tonal == null){
                // just return for stop finals without tonal
                return
            } else if(aoas.length == 1 && aoas[0].tonal.isEqualToTonal(new AllomorphHY().tonal)) {
                // there should be no more than 2 matches, either 1 match or 2
                // just fall through for the case of 'hy'
            } 

            // there is only one match after processing, we just assign it
            allomorph = aoas.shift();

            // we already have an allomorph assigned, just return
            return allomorph;
        }

        // after matching with checked allomorphs, we go on matching free allomorphs
        aoas = [];
        if(listOfFreeAllomorphs.has(syllable.lastLetter.literal)) {
            aoas.push(listOfFreeAllomorphs.get(syllable.lastLetter.literal));
        }

        if(aoas.length == 0) {
            // tone 1 has no allomorph
            allomorph = new ZeroAllomorph();
        } else if(aoas.length) {
            // are there multiple allomorphs? there should be only one.
            for(let i = 0; i < aoas.length; i++) {
                if(aoas[i].tonal.isEqualToTonal(new AllomorphX().tonal)) {
                    // this syllable is already in base form
                    // in order to display this inflectional ending, we have to assign
                    allomorph = aoas[i]
                } else {
                    allomorph = aoas[i];
                }
            }
        }
        return allomorph
    }

    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {

        // get base forms as strings
        if(allomorph != null) {
            // member variable allomorph is not null
            if(allomorph instanceof FreeAllomorph) {
                if(allomorph instanceof ZeroAllomorph) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2 ---->
                    let s: TonalSyllable = new TonalSyllable(syllable.letters);
                    s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get('zero')[0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in freeAllomorphUncombiningRules.get(allomorph.getLiteral())) {
                        // pop letter
                        // push letter
                        let s: TonalSyllable = new TonalSyllable(syllable.letters);
                        //if(!facrs.rules[this.allomorph.getLiteral()][i].isCharacterNull()) {
                        if(!(freeAllomorphUncombiningRules.get(allomorph.getLiteral())[i] instanceof ZeroAllomorph)) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.  ---->
                            s.popLetter();
                            // there are base tonals
                            // includes ss and x, exclude zero allomorph
                            s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get(allomorph.getLiteral())[i].characters));
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
            } else if(allomorph instanceof CheckedAllomorph) {
                // pop the last letter
                // no need to push letter
                // 1 to 4. 3 to 8. 2 to 4. 5 to 8.  ---->
                let s: TonalSyllable = new TonalSyllable(syllable.letters);
                s.popLetter();
                //console.log(s.literal)
                return [s];
            }
        } else {
            // member variable allomorph is null
            // this syllable is already in base form
            // is this block redundant
            return [new TonalSyllable(syllable.letters)];
        }
        return []; // return empty array
    }

}

//------------------------------------------------------------------------------
//  syllabifyTonal
//------------------------------------------------------------------------------

export function syllabifyTonal(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
    // get the longest matched syllable pattern
    syllabary.setFirstLetter(letters[beginOfSyllable].literal)
    let matchedLen = 0;
    let mp = new MatchedPattern();
    for(let m in syllabary.list) {
        let min = Math.min(letters.length-beginOfSyllable, syllabary.list[m].length);
        if(syllabary.list[m].length == min) {
            for(let n = 0; n < min; n++) {
                if(syllabary.list[m][n] != undefined) {
                    if(letters[beginOfSyllable+n].literal === syllabary.list[m][n].getLiteral()) {
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[beginOfSyllable+q];
                            }
                            
                            // copy the pattern of sounds
                            mp.pattern = syllabary.list[m];
                            //console.log(syllabary.list[m])
                            //console.log(mp.letters)
                        }
                    } else {
                        break;
                    }    
                }
            }
        }
    }
    return mp;
}

//------------------------------------------------------------------------------
//  Tonal Syllable
//------------------------------------------------------------------------------

export class TonalSyllable extends Syllable {
    popLetter() {
        let tmp = this.literal.substr(0, this.literal.length-this.letters[this.letters.length-1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length-1);
    }
}

//------------------------------------------------------------------------------
//  Tonal Lemmatization Morpheme
//------------------------------------------------------------------------------

export class TonalLemmatizationMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph = null; // required to populate stems
    metaplasm: TonalSyllableMetaplasm

    constructor(syllable: TonalSyllable, tsm: TonalSyllableMetaplasm) {
        super()
        this.syllable = syllable;
        this.metaplasm = tsm

        // assign allomorph for each syllable
        this.allomorph = this.metaplasm.assignAllomorph(this.syllable)
    }
    
    apply(): any {
        return this.metaplasm.apply(this.syllable, this.allomorph)
    }

}

//------------------------------------------------------------------------------
//  Tonal Lemmatization Morpheme Maker
//------------------------------------------------------------------------------

export class TonalLemmatizationMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalSyllableMetaplasm
    
    constructor(gs: Array<AlphabeticGrapheme>, tsm: TonalSyllableMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
        this.metaplasm = tsm
    }

    create(syllable: TonalSyllable) { return new TonalLemmatizationMorpheme(syllable, this.metaplasm) }

    createArray() { return new Array<TonalLemmatizationMorpheme>() }

    makeMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}
