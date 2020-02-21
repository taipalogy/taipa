import { TonalCombiningMetaplasm, Morpheme, MatchedPattern, MorphemeMaker } from '../morpheme';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
import {
    FreeAllomorph,
    Allomorph,
    ZeroAllomorph,
    combining_rules,
    AllomorphY,
    CheckedAllomorph,
    combined_free_allomorphs,
    uncombined_checked_allomorphs,
    TonalLetterTags,
    tonal_positional_sounds,
    TonalSoundTags,
    CheckedTonalSounds,
    voiceless_voiced_finals,
    combined_checked_allomorphs,
    InitialsForEuphonicTT,
    InitialsForEuphonicT,
    euphonic_t_tt,
    NasalInitialSounds,
    MedialSounds,
    initial_bghl
} from '../tonal/version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';

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
                    const cfs = combining_rules.get(TonalLetterTags.zero);
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
                    const crs = combining_rules.get(allomorph.tonal.toString());
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
                const cfs = combining_rules.get(allomorph.final.toString());
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

export class EncliticECombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        // 1->7, 7->7, 3->3
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    const cfs = combining_rules.get(TonalLetterTags.zero);
                    for (let k in cfs) {
                        // it should loop only once
                        s.pushLetter(new AlphabeticLetter(cfs[k].characters));
                    }
                    return [s];
                }
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
            const ps = tonal_positional_sounds.get(TonalLetterTags.w);
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

export class PhrasalVerbParticleCombining extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));

            // TODO: add free syllable
            if (allomorph instanceof CheckedAllomorph) {
                const cfs = combining_rules.get(allomorph.final.toString());
                for (let k in cfs) {
                    // f only
                    if (cfs[k].toString() === TonalLetterTags.f) s.pushLetter(new AlphabeticLetter(cfs[k].characters));
                    return [new TonalSyllable(s.letters)];
                }
            }
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
        if (uncombined_checked_allomorphs.has(syllable.lastLetter.literal)) {
            const am = uncombined_checked_allomorphs.get(syllable.lastLetter.literal);
            if (am) return am;
            return new Allomorph();
        }

        if (
            new CheckedTonalSounds().includes(syllable.lastLetter.literal) &&
            uncombined_checked_allomorphs.has(syllable.lastSecondLetter.literal)
        ) {
            // in case of final followed by tonal
            const ams = combined_checked_allomorphs.get(syllable.lastSecondLetter.literal);

            if (ams && ams.length > 1) {
                const it = ams.filter(x => x.tonal.toString() === syllable.lastLetter.literal);
                return it[0];
            }
            // return alms[0];
            return new Allomorph();
        }

        if (combined_free_allomorphs.has(syllable.lastLetter.literal)) {
            const am = combined_free_allomorphs.get(syllable.lastLetter.literal);
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
                    const ps = tonal_positional_sounds.get(TonalLetterTags.l);
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
                new InitialsForEuphonicTT().includes(soundFollowingSyllable.toString())) ||
            (sounds[sounds.length - 2].toString() === TonalLetterTags.t &&
                new InitialsForEuphonicT().includes(soundFollowingSyllable.toString()))
        ) {
            // absolute assimilation
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();

            const af = euphonic_t_tt.get(sounds[sounds.length - 2].toString() + soundFollowingSyllable.toString());
            if (af) {
                const ps = tonal_positional_sounds.get(af);
                if (ps) snd = ps(TonalSoundTags.stopFinal);
                s.replaceLetter(s.letters.length - 2, new AlphabeticLetter(snd.characters));
                if (new NasalInitialSounds().includes(soundFollowingSyllable.toString())) {
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
            const ps = tonal_positional_sounds.get(TonalLetterTags.m);
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
            new NasalInitialSounds().includes(soundFollowingSyllable.toString())
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
            initial_bghl.filter(x => x === soundFollowingSyllable.toString()).length > 0
        ) {
            return this.voicedFinal(sounds);
        }
    }

    private voicedFinal(sounds: Sound[]) {
        const fnl = voiceless_voiced_finals.get(sounds[sounds.length - 2].toString());

        if (fnl) {
            let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
            let snd = new Sound();
            const ps = tonal_positional_sounds.get(fnl);
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
