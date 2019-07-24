import { Syllable, Morpheme, MorphemeMaker, MatchedPattern, CombiningMetaplasm, Syllabary, TonalCombiningMetaplasm } from '../morpheme'
import { freeAllomorphUncombiningRules, checkedAllomorphs, freeAllomorphs,
    ZeroAllomorph, AllomorphHY, AllomorphX, ZeroTonal } from './version2'
import { CheckedAllomorph, FreeAllomorph, Allomorph } from './version2'
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme'
import { ListOfLexicalRoots } from './lexicalroot'

//------------------------------------------------------------------------------
//  Tonal Uncombining Forms
//------------------------------------------------------------------------------

export class TonalUncombiningForms extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {

        // get base forms as strings
        if(allomorph) {
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
    // TODO: if the first letter is x, letter a will be set. need to fix it.
    let matchedLen = 0;
    let mp = new MatchedPattern();
    for(let m in syllabary.list) {
        let min = Math.min(letters.length-beginOfSyllable, syllabary.list[m].length);
        if(syllabary.list[m].length == min) {
            for(let n = 0; n < min; n++) {
                if(syllabary.list[m][n] != undefined) {
                    if(letters[beginOfSyllable+n].literal === syllabary.list[m][n].getLiteral()) {
                        //console.log(syllabary[m])
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

    get lastLetter() {
        if(this.letters.length >= 1) return this.letters[this.letters.length-1]
        return new AlphabeticLetter()
    }

    get lastSecondLetter() {
        if(this.letters.length >= 2) return this.letters[this.letters.length-2]
        return new AlphabeticLetter()
    }

}

//------------------------------------------------------------------------------
//  Tonal Uncombining Morpheme
//------------------------------------------------------------------------------

export class TonalUncombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph // required to populate stems
    metaplasm: TonalCombiningMetaplasm
    sounds: Array<Sound> // populated in MorphemeMaker.make

    constructor(syllable: TonalSyllable, tsm: TonalCombiningMetaplasm) {
        super()
        this.syllable = syllable;
        this.metaplasm = tsm

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable)
        this.sounds = new Array()
    }
    
    apply(): any {
        return this.metaplasm.apply(this.syllable, this.allomorph)
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        let allomorph: Allomorph = new ZeroAllomorph()
        // assign the matched allomorph for this syllable
        let aoas: Array<Allomorph> = []; // array of allomorphs

        let keys = Array.from(checkedAllomorphs.keys())
        for(let k = 0; k < keys.length; k++) {
            let am = checkedAllomorphs.get(keys[k])
            if(am instanceof CheckedAllomorph) {
                if(am.tonal != null) {
                    if(am.tonal.getLiteral() === syllable.lastLetter.literal
                        && am.final.getLiteral() === syllable.lastSecondLetter.literal) {
                        aoas.push(checkedAllomorphs.get(keys[k]));
                        // there's no need to break here, as we want to collect the second match, if any
                    }
                } else {
                    if(am.final.getLiteral() === syllable.lastLetter.literal) {
                        aoas.push(checkedAllomorphs.get(keys[k]));
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
            } else if(aoas.length == 1 && aoas[0].tonal.isEqualToTonal(new ZeroTonal())){
                // return stop finals without tonal
                let ret = aoas.shift()
                if(ret) return ret
                return new Allomorph()
            } else if(aoas.length == 1 && aoas[0].tonal.isEqualToTonal(new AllomorphHY().tonal)) {
                // there should be no more than 2 matches, either 1 match or 2
                // just fall through for the case of 'hy'
            } 

            // there is only one match after processing, we just assign it
            let ret = aoas.shift();
            if(ret) return ret
            // we already one allomorph
            return new Allomorph()
        }

        // after matching with checked allomorphs, we go on matching free allomorphs
        aoas = [];
        if(freeAllomorphs.has(syllable.lastLetter.literal)) {
            aoas.push(freeAllomorphs.get(syllable.lastLetter.literal));
        }

        if(aoas.length == 0) {
            // tone 1 has no allomorph
            allomorph = new ZeroAllomorph();
        } else if(aoas.length == 1) {
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

}

//------------------------------------------------------------------------------
//  Tonal Lemmatization Morpheme Maker
//------------------------------------------------------------------------------

export class TonalUncombiningMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalCombiningMetaplasm
    lexicalRoots: ListOfLexicalRoots
    
    constructor(gs: Array<AlphabeticGrapheme>, tsm: TonalCombiningMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
        this.metaplasm = tsm
        this.lexicalRoots = new ListOfLexicalRoots()
    }

    make(letters: Array<AlphabeticLetter>, syllabary: Syllabary, syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) => MatchedPattern) {
        let morphemes = new Array<TonalUncombiningMorpheme>()
        let beginOfSyllable: number = 0;
        for(let i = 0; i < letters.length; i++) {

            let msp: MatchedPattern = new MatchedPattern();
            if(i-beginOfSyllable == 0) {
                
                msp = syllabify(letters, beginOfSyllable, syllabary)

                if(msp.matchedLength == 0) {
                    //console.log('no matched syllables found. the syllable might need to be added')
                }

                //console.log("matchedLen: %d", msp.matchedLength);
                //console.log(msp.pattern);
                //console.log(msp.letters)

                let tsm: TonalUncombiningMorpheme;
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    tsm = new TonalUncombiningMorpheme(new TonalSyllable(msp.letters), this.metaplasm)

                    tsm.sounds = msp.pattern

                    morphemes.push(tsm);
                }

                beginOfSyllable += msp.matchedLength;
            }
            
            if(morphemes.length == 0) {
                //console.log('nothing matched')
            } else if(morphemes.length >= 1) {
                if(msp == undefined) break

                if(msp.matchedLength > 0) {
                    i += beginOfSyllable-i-1;
                }

            }
        }

        return morphemes
    }

    makeMorphemes() {
        return this.make(this.preprocess(), this.lexicalRoots, syllabifyTonal);
    }
}
