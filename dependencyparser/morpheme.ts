import { TonalCombiningMetaplasm, Morpheme, MatchedPattern, MorphemeMaker, Syllabary } from '../morpheme'
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme'
import { FreeAllomorph, Allomorph, ZeroAllomorph, combiningRules, AllomorphY, CheckedAllomorph,
    uncombinedFreeAllomorphs, uncombinedCheckedAllomorphs } from '../tonal/version2'
import { AlphabeticLetter, AlphabeticGrapheme } from '../grapheme'
import { ListOfLexicalRoots } from '../tonal/lexicalroot'

//------------------------------------------------------------------------------
//  Tonal Combining Forms
//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable>  {
        if(allomorph != null) {
            let s: TonalSyllable = new TonalSyllable(syllable.letters);
            if(allomorph instanceof FreeAllomorph) {
                if(allomorph instanceof ZeroAllomorph) {
                    let cfs = combiningRules.get(allomorph.tonal.getLiteral())
                    for(let k in cfs) {
                        // it should loop only once
                        s.pushLetter(new AlphabeticLetter(cfs[k].characters))
                    }
                    return [s]
                } else if(allomorph instanceof AllomorphY) {
                    s.popLetter()
                    return [s]
                } else {
                    s.popLetter()
                    let cfs = combiningRules.get(allomorph.tonal.getLiteral())
                    let rets = []
                    for(let k in cfs) {
                        s.pushLetter(new AlphabeticLetter(cfs[k].characters))
                        rets.push(new TonalSyllable(s.letters))
                        s.popLetter()
                    }
                    return rets
                }
            } else if(allomorph instanceof CheckedAllomorph) {
                // nothing to pop here
                let cfs = combiningRules.get(allomorph.tonal.getLiteral())
                let rets = []
                for(let k in cfs) {
                    s.pushLetter(new AlphabeticLetter(cfs[k].characters))
                    rets.push(new TonalSyllable(s.letters))
                    s.popLetter()
                }
                return rets
            }
        }
        return []
    }

}

//------------------------------------------------------------------------------
//  Tonal Inflexion Morpheme
//------------------------------------------------------------------------------

export class TonalCombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph// required to populate stems
    metaplasm: TonalCombiningMetaplasm

    constructor(syllable: TonalSyllable, tsm: TonalCombiningMetaplasm) {
        super()
        this.syllable = syllable;
        this.metaplasm = tsm

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable)
    }
    
    getForms(): any {
        return this.metaplasm.apply(this.syllable, this.allomorph)
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        if(uncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
            return uncombinedCheckedAllomorphs.get(syllable.lastLetter.literal)
        }

        if(uncombinedFreeAllomorphs.has(syllable.lastLetter.literal)) {
            return uncombinedFreeAllomorphs.get(syllable.lastLetter.literal)
        }

        return new ZeroAllomorph()
    }

}

//------------------------------------------------------------------------------
//  Tonal Inflexion Morpheme Maker
//------------------------------------------------------------------------------

export class TonalInflexionMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalCombiningMetaplasm
    
    constructor(graphemes: Array<AlphabeticGrapheme>, tsm: TonalCombiningMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = graphemes;
        this.metaplasm = tsm
    }

    make(letters: Array<AlphabeticLetter>, syllabary: Syllabary, syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) => MatchedPattern) {
        let morphemes = new Array<TonalCombiningMorpheme>()
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

                let tsm: TonalCombiningMorpheme;
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    tsm = new TonalCombiningMorpheme(new TonalSyllable(msp.letters), this.metaplasm)

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
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}
