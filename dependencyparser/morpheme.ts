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
        if(allomorph) {
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
                    let crs = combiningRules.get(allomorph.tonal.getLiteral())
                    let rets = []
                    for(let k in crs) {
                        s.pushLetter(new AlphabeticLetter(crs[k].characters))
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
    
    getForms(): TonalSyllable[] {
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

export class TonalCombiningMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalCombiningMetaplasm
    
    constructor(graphemes: Array<AlphabeticGrapheme>, tsm: TonalCombiningMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = graphemes;
        this.metaplasm = tsm
    }

    createMorphemes() {
        return new Array<TonalCombiningMorpheme>()
    }

    createMorpheme(msp: MatchedPattern, tcm: TonalCombiningMetaplasm) {
        return new TonalCombiningMorpheme(new TonalSyllable(msp.letters), tcm)
    }

    makeMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}
