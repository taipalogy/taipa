import { TonalCombiningMetaplasm, Morpheme, MatchedPattern, MorphemeMaker } from '../morpheme';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
import {
    FreeAllomorph,
    Allomorph,
    ZeroAllomorph,
    combiningRules,
    AllomorphY,
    CheckedAllomorph,
    uncombinedFreeAllomorphs,
    uncombinedCheckedAllomorphs,
    TonalLetterTags,
    tonalPositionalSound,
    TonalSoundTags,
    lowerLettersOfTonal,
    SetOfCheckedTonals,
    voiceless_voiced_finals,
    combinedCheckedAllomorphs
} from '../tonal/version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';

//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(syllable.letters);
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    const cfs = combiningRules.get(TonalLetterTags.zero);
                    for (let k in cfs) {
                        // it should loop only once
                        s.pushLetter(new AlphabeticLetter(cfs[k].characters));
                    }
                    return [s];
                } else if (allomorph instanceof AllomorphY) {
                    s.popLetter();
                    return [s];
                } else {
                    s.popLetter();
                    const crs = combiningRules.get(allomorph.tonal.toString());
                    const rets = [];
                    for (let k in crs) {
                        s.pushLetter(new AlphabeticLetter(crs[k].characters));
                        rets.push(new TonalSyllable(s.letters));
                        s.popLetter();
                    }
                    return rets;
                }
            } else if (allomorph instanceof CheckedAllomorph) {
                // nothing to pop here
                const cfs = combiningRules.get(allomorph.final.toString());
                const rets = [];
                for (let k in cfs) {
                    s.pushLetter(new AlphabeticLetter(cfs[k].characters));
                    rets.push(new TonalSyllable(s.letters));
                    s.popLetter();
                }
                return rets;
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class ThirdCombiningForm extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        if(allomorph) {
            let s: TonalSyllable = new TonalSyllable(syllable.letters);
            const ps = tonalPositionalSound.get(TonalLetterTags.w);
            let snd = new Sound();

            if (allomorph instanceof FreeAllomorph) {
                if(ps) snd = ps(TonalSoundTags.freeTonal);
                if (allomorph instanceof ZeroAllomorph) {
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                } else {
                    s.popLetter();
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                }
            } else if(allomorph instanceof CheckedAllomorph) {
                if(ps) snd = ps(TonalSoundTags.checkedTonal);
                if(allomorph.tonal.toString()) {
                    s.popLetter();
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                } else {
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                    console.log(s)
                }
            }
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class VoicedFinalForm extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        if(allomorph) {
            let s: TonalSyllable = new TonalSyllable(syllable.letters);
            let snd = new Sound();
            
            if(allomorph instanceof CheckedAllomorph) {
                const fnl = voiceless_voiced_finals.get(allomorph.final.toString());
                if(fnl) {
                    const ps = tonalPositionalSound.get(fnl);
                    if(ps) snd = ps(TonalSoundTags.stopFinal);
                
                    if(s.lastSecondLetter.literal === allomorph.final.toString()) {
                        s.replaceLetter(s.letters.length-2, new AlphabeticLetter(snd.characters));
                    }    
                }
            }
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class TonalCombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph; // required to populate stems
    metaplasm: TonalCombiningMetaplasm;

    constructor(syllable: TonalSyllable, tcf: TonalCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = tcf;

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable);
    }

    getForms(): TonalSyllable[] {
        return this.metaplasm.apply(this.syllable, this.allomorph);
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        if (uncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
            return uncombinedCheckedAllomorphs.get(syllable.lastLetter.literal);
        }

        if (new SetOfCheckedTonals().beginWith(syllable.lastLetter.literal) 
            && uncombinedCheckedAllomorphs.has(syllable.lastSecondLetter.literal)) {
            return combinedCheckedAllomorphs.get(syllable.lastSecondLetter.literal);
        }

        if (uncombinedFreeAllomorphs.has(syllable.lastLetter.literal)) {
            return uncombinedFreeAllomorphs.get(syllable.lastLetter.literal);
        }

        return new ZeroAllomorph();
    }
}

export class TonalCombiningMorphemeMaker extends MorphemeMaker {
    metaplasm: TonalCombiningMetaplasm;

    constructor(tsm: TonalCombiningMetaplasm) {
        super();
        this.metaplasm = tsm;
    }

    protected createMorphemes() {
        return new Array<TonalCombiningMorpheme>();
    }

    protected createMorpheme(msp: MatchedPattern) {
        return new TonalCombiningMorpheme(new TonalSyllable(msp.letters), this.metaplasm);
    }

    private postprocess(patterns: MatchedPattern[]): Array<TonalCombiningMorpheme> {
        let morphemes = this.createMorphemes();
        for(let i in patterns) {
            morphemes.push(this.createMorpheme(patterns[i]));
        }
        return morphemes;
    }

    makeMorphemes(gs: Array<AlphabeticGrapheme>): TonalCombiningMorpheme[] {
        const ltrs = gs.map(it => it.letter);
        const ptrns = this.make(ltrs, syllabifyTonal);
        const ms = this.postprocess(ptrns);
        
        return ms;
    }
}
