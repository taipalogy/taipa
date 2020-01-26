import { TonalCombiningMetaplasm, Morpheme, MatchedPattern, MorphemeMaker } from '../morpheme';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
import {
    FreeAllomorph,
    Allomorph,
    ZeroAllomorph,
    combiningRules,
    AllomorphY,
    CheckedAllomorph,
    combinedFreeAllomorphs,
    uncombinedCheckedAllomorphs,
    TonalLetterTags,
    tonalPositionalSound,
    TonalSoundTags,
    SetOfCheckedTonals,
    voiceless_voiced_finals,
    combinedCheckedAllomorphs,
    InitialsForEuphonicTT,
    InitialsForEuphonicT,
    assimilatedFinals,
    NasalInitials,
    SetOfMedials,
} from '../tonal/version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';

export enum AssimilationDirection {
    agressive = 0,
    regressive = 1,
}

//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
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
                if (allomorph.tonal.toString().length > 0) return [];
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
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            const ps = tonalPositionalSound.get(TonalLetterTags.w);
            let snd = new Sound();

            if (allomorph instanceof FreeAllomorph) {
                if (ps) snd = ps(TonalSoundTags.freeTonal);
                if (allomorph instanceof ZeroAllomorph) {
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                } else {
                    s.popLetter();
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                }
            } else if (allomorph instanceof CheckedAllomorph) {
                if (ps) snd = ps(TonalSoundTags.checkedTonal);
                if (allomorph.tonal.toString()) {
                    s.popLetter();
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                } else {
                    s.pushLetter(new AlphabeticLetter(snd.characters));
                }
            }
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------
// TODO: to be removed
export class AssimilatedFinalForm extends TonalCombiningMetaplasm {}

function voicedFinal(sounds: Sound[]) {
    const fnl = voiceless_voiced_finals.get(sounds[sounds.length - 2].toString());

    if (fnl) {
        let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
        let snd = new Sound();
        const ps = tonalPositionalSound.get(fnl);
        if (ps) snd = ps(TonalSoundTags.stopFinal);
        s.replaceLetter(s.letters.length - 2, new AlphabeticLetter(snd.characters));
        return [s];
    }
}

function conditionsForVoicedFinal(sounds: Sound[], soundFollowingSyllable: Sound) {
    if(soundFollowingSyllable.name === TonalSoundTags.initial && 
        new NasalInitials().beginWith(soundFollowingSyllable.toString())) {
        return voicedFinal(sounds);
    }

    if(soundFollowingSyllable.name === TonalSoundTags.medial &&
        new SetOfMedials().beginWith(soundFollowingSyllable.toString())) {
        return voicedFinal(sounds);
    } 
        
    if(soundFollowingSyllable.name === TonalSoundTags.initial &&
        (soundFollowingSyllable.toString() === TonalLetterTags.h ||
        soundFollowingSyllable.toString() === TonalLetterTags.l ||
        soundFollowingSyllable.toString() === TonalLetterTags.b ||
        soundFollowingSyllable.toString() === TonalLetterTags.g )) {
        return voicedFinal(sounds);
    }
}

function regAssimilate(sounds: Sound[], soundFollowingSyllable: Sound): Array<TonalSyllable> {
        if (sounds[sounds.length - 2].name != TonalSoundTags.stopFinal &&
            sounds[sounds.length - 2].name != TonalSoundTags.nasalFinal) return [];
            
        if (
            sounds[sounds.length - 2].toString() === TonalLetterTags.tt &&
            new InitialsForEuphonicTT().beginWith(soundFollowingSyllable.toString()) ||
                sounds[sounds.length - 2].toString() === TonalLetterTags.t &&
            new InitialsForEuphonicT().beginWith(soundFollowingSyllable.toString())
        ) {
            // absolute assimilation
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();

            const af = assimilatedFinals.get(sounds[sounds.length - 2].toString() + soundFollowingSyllable.toString());
            if (af) {
                const ps = tonalPositionalSound.get(af);
                if (ps) snd = ps(TonalSoundTags.stopFinal);
                s.replaceLetter(s.letters.length - 2, new AlphabeticLetter(snd.characters));
                if(new NasalInitials().beginWith(soundFollowingSyllable.toString())) {
                    s.insertLetter(s.letters.length - 2, new AlphabeticLetter(soundFollowingSyllable.characters));
                }

                return [s];
            }
        } else if(soundFollowingSyllable.toString() === TonalLetterTags.b &&
                sounds[sounds.length-2].toString() === TonalLetterTags.n) {
            // replace final n with final m
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();
            const ps = tonalPositionalSound.get(TonalLetterTags.m);
            if (ps) snd = ps(TonalSoundTags.nasalFinal);
            s.replaceLetter(s.letters.length-2, new AlphabeticLetter(snd.characters))
            return [s];
        } else {
            const tss = conditionsForVoicedFinal(sounds, soundFollowingSyllable);
            if (tss) return tss;
        }

        return [];
}

//------------------------------------------------------------------------------

export class TonalCombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph; // required to populate stems
    private metaplasm: TonalCombiningMetaplasm;
    sounds: Array<Sound>;

    constructor(syllable: TonalSyllable, tcf: TonalCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = tcf;

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable);
        this.sounds = new Array();
    }

    getForms(): TonalSyllable[] {
        return this.metaplasm.apply(this.sounds, this.allomorph);
    }

    getSoundChangeForm(sound: Sound, dir: AssimilationDirection): TonalSyllable[] {
        if (sound) {
            if (sound.name === TonalSoundTags.nasalFinal && dir === AssimilationDirection.agressive) {
                // agressive assimilation of nasals, both internal and external sandhi
                const snds = this.sounds;
                snds.splice(0, 0, sound);
                return [new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters)))];
            } else if(sound.name === TonalSoundTags.initial && dir === AssimilationDirection.agressive) {
                const snds = this.sounds;
                if(snds[0].toString() === sound.toString()) {
                    let duplifix = new Sound();
                    const ps = tonalPositionalSound.get(TonalLetterTags.l);
                    if (ps) duplifix = ps(TonalSoundTags.initial);
        
                    snds.splice(0, 1, duplifix);
                }
                return [new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters)))];
            }

            // internal sandhi. regressive assimilation
            return regAssimilate(this.sounds, sound);
        }
        return [];
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        if (uncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
            return uncombinedCheckedAllomorphs.get(syllable.lastLetter.literal);
        }

        if (
            new SetOfCheckedTonals().beginWith(syllable.lastLetter.literal) &&
            uncombinedCheckedAllomorphs.has(syllable.lastSecondLetter.literal)
        ) {
            // in case of final followed by tonal
            const alms = combinedCheckedAllomorphs.get(syllable.lastSecondLetter.literal);
            if (alms.length > 1) {
                const it = alms.filter(x => x.tonal.toString() === syllable.lastLetter.literal);
                return it[0];
            }
            return alms[0];
        }

        if (combinedFreeAllomorphs.has(syllable.lastLetter.literal)) {
            return combinedFreeAllomorphs.get(syllable.lastLetter.literal);
        }

        return new ZeroAllomorph();
    }
}

export class TonalCombiningMorphemeMaker extends MorphemeMaker {
    private metaplasm: TonalCombiningMetaplasm;

    constructor(tsm: TonalCombiningMetaplasm) {
        super();
        this.metaplasm = tsm;
    }

    protected createMorphemes() {
        return new Array<TonalCombiningMorpheme>();
    }

    protected createMorpheme(msp: MatchedPattern) {
        const tcm = new TonalCombiningMorpheme(new TonalSyllable(msp.letters), this.metaplasm);
        tcm.sounds = msp.pattern;
        return tcm;
    }

    private postprocess(patterns: MatchedPattern[]): Array<TonalCombiningMorpheme> {
        let morphemes = this.createMorphemes();
        for (let i in patterns) {
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
