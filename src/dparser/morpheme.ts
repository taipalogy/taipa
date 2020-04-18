import { MatchedPattern, MorphemeMaker, Morpheme } from '../unit';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
import {
  Allomorph,
  ZeroAllomorph,
  combinedFreeAllomorphs,
  uncombinedCheckedAllomorphs,
  TonalLetterTags,
  tonalPositionalSounds,
  TonalSoundTags,
  CheckedTonalSounds,
  combinedCheckedAllomorphs,
  MedialSounds,
} from '../tonal/version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../unit';
import {
  initialBghl,
  ttInitialTInitialPairs,
  voicelessVoicedFinals,
  initialsForEuphonicTt,
  initialsForEuphonicT,
  nasalInitialSounds,
  finalBgjlsbbggjjllss,
} from '../tonal/collections';
import { AssimiDirection } from './metaplasm';
import { TonalCombiningMetaplasm } from '../metaplasm';

/** A syllable and its combining forms. */
export class TonalCombiningMorpheme extends Morpheme {
  syllable: TonalSyllable;
  allomorph: Allomorph; // required to populate stems
  private metaplasm: TonalCombiningMetaplasm;
  sounds: Array<Sound>;
  private forms: TonalSyllable[];

  constructor(
    syllable: TonalSyllable,
    sounds: Sound[],
    metaplasm: TonalCombiningMetaplasm
  ) {
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
      (uncombinedCheckedAllomorphs.has(syllable.lastSecondLetter.literal) ||
        finalBgjlsbbggjjllss.has(syllable.lastSecondLetter.literal))
    ) {
      // in case of a final followed by a tonal
      const ams = combinedCheckedAllomorphs.get(
        syllable.lastSecondLetter.literal
      );

      if (ams && ams.length > 0) {
        const ret = ams.filter(
          it => it.tonal.toString() === syllable.lastLetter.literal
        );
        return ret[0];
      }
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

/** A syllable and its sound changing forms. */
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
      if (
        sound.name === TonalSoundTags.nasalFinal &&
        dir === AssimiDirection.agressive
      ) {
        // agressive assimilation of nasals, both internal and external sandhi
        const snds = this.sounds;
        snds.splice(0, 0, sound);
        return [
          new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters))),
        ];
      } else if (
        sound.name === TonalSoundTags.initial &&
        dir === AssimiDirection.agressive
      ) {
        const snds = this.sounds;
        if (snds[0].toString() === sound.toString()) {
          let duplifix = new Sound();
          const ps = tonalPositionalSounds.get(TonalLetterTags.l);
          if (ps) duplifix = ps(TonalSoundTags.initial);

          snds.splice(0, 1, duplifix);
        }
        return [
          new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters))),
        ];
      } else if (
        sound.name === TonalSoundTags.nasalization &&
        dir === AssimiDirection.agressive
      ) {
        const snds = this.sounds;
        if (snds[snds.length - 1].name === TonalSoundTags.freeTonal) {
          snds.splice(snds.length - 1, 0, sound);
        } else if (snds[snds.length - 1].name === TonalSoundTags.medial) {
          snds.push(sound);
        }
        return [
          new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters))),
        ];
      }

      // internal sandhi. regressive assimilation
      return this.regAssimilate(this.sounds, sound);
    }
    return [];
  }

  private regAssimilate(
    sounds: Sound[],
    soundFollowingSyllable: Sound
  ): Array<TonalSyllable> {
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
      // absolute assimilation. euphonic tt and t.
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      let snd = new Sound();

      const af = ttInitialTInitialPairs.get(
        sounds[sounds.length - 2].toString() + soundFollowingSyllable.toString()
      );
      if (af) {
        const ps = tonalPositionalSounds.get(af);
        if (ps) snd = ps(TonalSoundTags.stopFinal);
        s.replaceLetter(
          s.letters.length - 2,
          new AlphabeticLetter(snd.characters)
        );
        if (nasalInitialSounds.includes(soundFollowingSyllable.toString())) {
          s.insertLetter(
            s.letters.length - 2,
            new AlphabeticLetter(soundFollowingSyllable.characters)
          );
        }

        return [s];
      }
    } else if (
      soundFollowingSyllable.toString() === TonalLetterTags.b &&
      sounds[sounds.length - 2].toString() === TonalLetterTags.n
    ) {
      // replace final n with final m
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      let snd = new Sound();
      const ps = tonalPositionalSounds.get(TonalLetterTags.m);
      if (ps) snd = ps(TonalSoundTags.nasalFinal);
      s.replaceLetter(
        s.letters.length - 2,
        new AlphabeticLetter(snd.characters)
      );
      return [s];
    } else {
      const tss = this.conditionalVoicedFinal(sounds, soundFollowingSyllable);
      if (tss) return tss;
    }

    // TODO: add euphonic hh and h.
    // TODO: neutrals. pp -> hh. p -> h.

    return [];
  }

  private conditionalVoicedFinal(
    sounds: Sound[],
    soundFollowingSyllable: Sound
  ) {
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
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      let snd = new Sound();
      const ps = tonalPositionalSounds.get(fnl);
      if (ps) snd = ps(TonalSoundTags.stopFinal);
      s.replaceLetter(
        s.letters.length - 2,
        new AlphabeticLetter(snd.characters)
      );
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
    const tcm = new TonalCombiningMorpheme(
      new TonalSyllable(msp.letters),
      msp.pattern,
      this.metaplasm
    );
    return tcm;
  }

  private postprocess(
    patterns: MatchedPattern[]
  ): Array<TonalCombiningMorpheme> {
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
    const tcm = new TonalSoundChangingMorpheme(
      new TonalSyllable(match.letters),
      match.pattern
    );
    return tcm;
  }

  private postprocess(
    matches: MatchedPattern[]
  ): Array<TonalSoundChangingMorpheme> {
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
