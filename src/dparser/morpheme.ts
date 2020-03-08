import { TonalCombiningMetaplasm, Morpheme, MatchedPattern, MorphemeMaker } from '../morpheme';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
import {
    FreeAllomorph,
    Allomorph,
    ZeroAllomorph,
    AllomorphY,
    CheckedAllomorph,
    combinedFreeAllomorphs,
    uncombinedCheckedAllomorphs,
    TonalLetterTags,
    tonalPositionalSounds,
    TonalSoundTags,
    CheckedTonalSounds,
    combinedCheckedAllomorphs,
    MedialSounds,
    lowerLettersTonal,
    AllomorphH
} from '../tonal/version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';
import {
    eighthToFirst,
    initialBghl,
    euphonicTtT,
    voicelessVoicedFinals,
    initialsForEuphonicTt,
    initialsForEuphonicT,
    combiningRules,
    nasalInitialSounds,
    finalOfPhrasalVerbParticle
} from '../tonal/collections';

export enum AssimiDirection {
    agressive = 0,
    regressive = 1
}

//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    const tos = combiningRules.get(TonalLetterTags.zero);
                    if (tos) {
                        s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(tos[0]).characters));
                    }
                    return [s];
                } else if (allomorph instanceof AllomorphY) {
                    s.popLetter();
                    return [s];
                } else {
                    s.popLetter();
                    const tos = combiningRules.get(allomorph.tonal.toString());
                    const rets = [];
                    if (tos) {
                        for (let k = 0; k < tos.length; k++) {
                            s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(tos[k]).characters));
                            rets.push(new TonalSyllable(s.letters));
                            s.popLetter();
                        }
                    }
                    return rets;
                }
            } else if (allomorph instanceof CheckedAllomorph) {
                // nothing to pop here
                if (allomorph.tonal.toString().length > 0) return [];
                const tos = combiningRules.get(allomorph.final.toString());
                const rets = [];
                if (tos) {
                    for (let k = 0; k < tos.length; k++) {
                        s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(tos[k]).characters));
                        rets.push(new TonalSyllable(s.letters));
                        s.popLetter();
                    }
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
            const ps = tonalPositionalSounds.get(TonalLetterTags.w);
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

export class FourthToFirstCombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph && allomorph instanceof AllomorphH) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(TonalLetterTags.f).characters));
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class EighthToFirstCombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph && allomorph instanceof CheckedAllomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            const tnl = eighthToFirst.get(allomorph.toString());
            if (tnl) {
                s.popLetter();
                s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(tnl).characters));
                s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(TonalLetterTags.f).characters));
            }
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class EighthToSecondCombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph && allomorph instanceof CheckedAllomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));

            s.popLetter();
            s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(TonalLetterTags.h).characters));
            s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(TonalLetterTags.y).characters));
            console.log(s);
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class EncliticECombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        // 1->7, 7->7, 3->3
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    const tos = combiningRules.get(TonalLetterTags.zero);
                    if (tos) {
                        // it should loop only once
                        s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(tos[0]).characters));
                    }
                    return [s];
                }
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class PhrasalVerbParticleCombining extends TonalCombiningMetaplasm {
    constructor(private tone: TonalLetterTags) {
        super();
    }

    private toThird(syllable: TonalSyllable, final: string) {
        let s: TonalSyllable = new TonalSyllable(syllable.letters);
        s.popLetter();
        const fnl = finalOfPhrasalVerbParticle.get(final);
        if (fnl) {
            // h -> hh, p -> pp
            s.pushLetter(lowerLettersTonal.get(fnl));
            s.pushLetter(lowerLettersTonal.get(TonalLetterTags.w));
        }
        return s;
    }

    private toFirst(syllable: TonalSyllable) {
        let s: TonalSyllable = new TonalSyllable(syllable.letters);
        s.pushLetter(lowerLettersTonal.get(TonalLetterTags.f));
        return s;
    }

    private toSeventh(syllable: TonalSyllable) {
        let s: TonalSyllable = new TonalSyllable(syllable.letters);
        s.popLetter();
        s.pushLetter(lowerLettersTonal.get(TonalLetterTags.z));
        return s;
    }

    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            if (allomorph instanceof CheckedAllomorph) {
                const ret: TonalSyllable[] = [];
                let syl: TonalSyllable = new TonalSyllable([]);
                if (this.tone === TonalLetterTags.f) {
                    syl = this.toFirst(s);
                } else if (this.tone === TonalLetterTags.w) {
                    syl = this.toThird(s, sounds[sounds.length - 1].toString());
                } else if (this.tone === TonalLetterTags.z) {
                    syl = this.toSeventh(s);
                }
                ret.push(syl);

                // free form of the syllable could be handle outside of this routine by popping f/w and h/hh
                return ret;
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class ConjunctiveLeCombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            if (allomorph instanceof FreeAllomorph) {
                if (
                    allomorph.tonal.toString() === TonalLetterTags.z ||
                    allomorph.tonal.toString() === TonalLetterTags.w
                ) {
                    s.popLetter();
                    return [s];
                }
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class PossesiveExCombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            s.popLetter();
            s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(TonalLetterTags.w).characters));
            return [s];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class NthCombining extends TonalCombiningMetaplasm {
    constructor(private tone: TonalLetterTags) {
        super();
    }

    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        // from -h to 1 or 7
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            if (s.lastLetter.literal === TonalLetterTags.h) {
                s.popLetter();
            }
            if (this.tone === TonalLetterTags.z) {
                s.pushLetter(new AlphabeticLetter(lowerLettersTonal.get(TonalLetterTags.z).characters));
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
    private metaplasm: TonalCombiningMetaplasm;
    sounds: Array<Sound>;
    private forms: TonalSyllable[];

    constructor(syllable: TonalSyllable, sounds: Sound[], metaplasm: TonalCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = metaplasm;

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable);
        this.sounds = sounds;
        this.forms = this.metaplasm.apply(this.sounds, this.allomorph);
    }

    getForms(): TonalSyllable[] {
        return this.forms;
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        if (uncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
            const am = uncombinedCheckedAllomorphs.get(syllable.lastLetter.literal);
            if (am) return am;
            return new Allomorph();
        }

        if (
            new CheckedTonalSounds().includes(syllable.lastLetter.literal) &&
            uncombinedCheckedAllomorphs.has(syllable.lastSecondLetter.literal)
        ) {
            // in case of final followed by tonal
            const ams = combinedCheckedAllomorphs.get(syllable.lastSecondLetter.literal);

            if (ams && ams.length > 1) {
                const it = ams.filter(x => x.tonal.toString() === syllable.lastLetter.literal);
                return it[0];
            }
            // return alms[0];
            return new Allomorph();
        }

        if (combinedFreeAllomorphs.has(syllable.lastLetter.literal)) {
            const am = combinedFreeAllomorphs.get(syllable.lastLetter.literal);
            if (am) return am;
            return new Allomorph(); // return empty allomorph
        }

        return new ZeroAllomorph();
    }
}

export class TonalSoundChangingMorpheme extends Morpheme {
    syllable: TonalSyllable;
    sounds: Array<Sound>;

    constructor(syllable: TonalSyllable, sounds: Sound[]) {
        super();
        this.syllable = syllable;
        this.sounds = sounds;
    }

    changeSoundWith(sound: Sound, dir: AssimiDirection): TonalSyllable[] {
        if (sound) {
            if (sound.name === TonalSoundTags.nasalFinal && dir === AssimiDirection.agressive) {
                // agressive assimilation of nasals, both internal and external sandhi
                const snds = this.sounds;
                snds.splice(0, 0, sound);
                return [new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters)))];
            } else if (sound.name === TonalSoundTags.initial && dir === AssimiDirection.agressive) {
                const snds = this.sounds;
                if (snds[0].toString() === sound.toString()) {
                    let duplifix = new Sound();
                    const ps = tonalPositionalSounds.get(TonalLetterTags.l);
                    if (ps) duplifix = ps(TonalSoundTags.initial);

                    snds.splice(0, 1, duplifix);
                }
                return [new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters)))];
            } else if (sound.name === TonalSoundTags.nasalization && dir === AssimiDirection.agressive) {
                const snds = this.sounds;
                if (snds[snds.length - 1].name === TonalSoundTags.freeTonal) {
                    snds.splice(snds.length - 1, 0, sound);
                } else if (snds[snds.length - 1].name === TonalSoundTags.medial) {
                    snds.push(sound);
                }
                return [new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters)))];
            }

            // internal sandhi. regressive assimilation
            return this.regAssimilate(this.sounds, sound);
        }
        return [];
    }

    private regAssimilate(sounds: Sound[], soundFollowingSyllable: Sound): Array<TonalSyllable> {
        if (
            sounds[sounds.length - 2].name != TonalSoundTags.stopFinal &&
            sounds[sounds.length - 2].name != TonalSoundTags.nasalFinal
        ) {
            return [];
        }

        if (
            (sounds[sounds.length - 2].toString() === TonalLetterTags.tt &&
                initialsForEuphonicTt.includes(soundFollowingSyllable.toString())) ||
            (sounds[sounds.length - 2].toString() === TonalLetterTags.t &&
                initialsForEuphonicT.includes(soundFollowingSyllable.toString()))
        ) {
            // absolute assimilation
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();

            const af = euphonicTtT.get(sounds[sounds.length - 2].toString() + soundFollowingSyllable.toString());
            if (af) {
                const ps = tonalPositionalSounds.get(af);
                if (ps) snd = ps(TonalSoundTags.stopFinal);
                s.replaceLetter(s.letters.length - 2, new AlphabeticLetter(snd.characters));
                if (nasalInitialSounds.includes(soundFollowingSyllable.toString())) {
                    s.insertLetter(s.letters.length - 2, new AlphabeticLetter(soundFollowingSyllable.characters));
                }

                return [s];
            }
        } else if (
            soundFollowingSyllable.toString() === TonalLetterTags.b &&
            sounds[sounds.length - 2].toString() === TonalLetterTags.n
        ) {
            // replace final n with final m
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();
            const ps = tonalPositionalSounds.get(TonalLetterTags.m);
            if (ps) snd = ps(TonalSoundTags.nasalFinal);
            s.replaceLetter(s.letters.length - 2, new AlphabeticLetter(snd.characters));
            return [s];
        } else {
            const tss = this.conditionalVoicedFinal(sounds, soundFollowingSyllable);
            if (tss) return tss;
        }

        return [];
    }

    private conditionalVoicedFinal(sounds: Sound[], soundFollowingSyllable: Sound) {
        if (
            soundFollowingSyllable.name === TonalSoundTags.initial &&
            nasalInitialSounds.includes(soundFollowingSyllable.toString())
        ) {
            return this.voicedFinal(sounds);
        }

        if (
            soundFollowingSyllable.name === TonalSoundTags.medial &&
            new MedialSounds().includes(soundFollowingSyllable.toString())
        ) {
            return this.voicedFinal(sounds);
        }

        if (
            soundFollowingSyllable.name === TonalSoundTags.initial &&
            initialBghl.includes(soundFollowingSyllable.toString())
        ) {
            return this.voicedFinal(sounds);
        }
    }

    private voicedFinal(sounds: Sound[]) {
        const fnl = voicelessVoicedFinals.get(sounds[sounds.length - 2].toString());

        if (fnl) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();
            const ps = tonalPositionalSounds.get(fnl);
            if (ps) snd = ps(TonalSoundTags.stopFinal);
            s.replaceLetter(s.letters.length - 2, new AlphabeticLetter(snd.characters));
            return [s];
        }
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
        const tcm = new TonalCombiningMorpheme(new TonalSyllable(msp.letters), msp.pattern, this.metaplasm);
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

export class TonalSoundChangingMorphemeMaker extends MorphemeMaker {
    constructor() {
        super();
    }

    protected createMorphemes() {
        return new Array<TonalSoundChangingMorpheme>();
    }

    protected createMorpheme(match: MatchedPattern) {
        const tcm = new TonalSoundChangingMorpheme(new TonalSyllable(match.letters), match.pattern);
        return tcm;
    }

    private postprocess(matches: MatchedPattern[]): Array<TonalSoundChangingMorpheme> {
        let morphemes = this.createMorphemes();
        for (let i in matches) {
            morphemes.push(this.createMorpheme(matches[i]));
        }
        return morphemes;
    }

    makeMorphemes(gs: Array<AlphabeticGrapheme>): TonalSoundChangingMorpheme[] {
        const ltrs = gs.map(it => it.letter);
        const ptrns = this.make(ltrs, syllabifyTonal);
        const ms = this.postprocess(ptrns);

        return ms;
    }
}
