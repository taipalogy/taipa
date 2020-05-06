import { MatchedPattern, MorphemeMaker, Morpheme } from '../unit';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
import {
  Allomorph,
  ZeroAllomorph,
  combinedFreeAllomorphs,
  uncombinedCheckedAllomorphs,
  TonalLetterTags,
  TonalSoundTags,
  checkedTonalSounds,
  combinedCheckedAllomorphs,
  medialSounds,
  lowerLettersTonal,
} from '../tonal/version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../unit';
import {
  initialsBghjl,
  ttInitialTInitialPairs,
  voicelessVoicedFinals,
  initialsForFinalT,
  finalBgjlsbbggjjllss,
  voicedVoicelessFinals,
  initialsForTT,
  nasalInitials,
} from '../tonal/collections';
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
      checkedTonalSounds.includes(syllable.lastLetter.literal) &&
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

  insertNasal(sound: Sound) {
    if (sound) {
      if (sound.name === TonalSoundTags.nasalFinal) {
        // insertion of nasals, both internal and external sandhi
        const snds = this.sounds;
        snds.splice(0, 0, sound);
        return [
          new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters))),
        ];
      }
    }
    return [];
  }

  infect(sound: Sound) {
    if (sound) {
      if (sound.name === TonalSoundTags.nasalization) {
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
    }
    return [];
  }

  mutateConsonant(sound: Sound) {
    if (sound) {
      if (sound.name === TonalSoundTags.initial) {
        const snds = this.sounds;
        if (snds[0].toString() === sound.toString()) {
          const s: TonalSyllable = new TonalSyllable(
            this.sounds.map(it => new AlphabeticLetter(it.characters))
          );

          s.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.l));
          return [s];
        }
        return [
          new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters))),
        ];
      }
    }
    return [];
  }

  private changeFinalTTt(soundFollowingSyllable: Sound) {
    // absolute assimilation. regressive
    if (
      (this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.tt &&
        Array.from(Object.values(initialsForTT)).includes(
          soundFollowingSyllable.toString()
        )) ||
      (this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.t &&
        Array.from(Object.values(initialsForFinalT)).includes(
          soundFollowingSyllable.toString()
        ))
    ) {
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
      );

      const fnl = ttInitialTInitialPairs.get(
        this.sounds[this.sounds.length - 2].toString() +
          soundFollowingSyllable.toString()
      );
      if (fnl) {
        s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
        if (nasalInitials.includes(soundFollowingSyllable.toString())) {
          s.insertLetter(
            s.letters.length - 2,
            new AlphabeticLetter(soundFollowingSyllable.characters)
          );
        }
        return [s];
      }
    }
    return [];
  }

  changeFinalHHh(soundFollowingSyllable: Sound) {
    // TODO: add sandhi hh and h.
    return [];
  }
  changeFinalPPp(soundFollowingSyllable: Sound) {
    // TODO: neutrals. pp -> hh. p -> h.
    return [];
  }

  withInitialMnng(soundFollowingSyllable: Sound) {
    if (
      soundFollowingSyllable.name === TonalSoundTags.initial &&
      nasalInitials.includes(soundFollowingSyllable.toString())
    ) {
      return this.voicedFinal(this.sounds);
    }

    return [];
  }

  withInitialBghjl(soundFollowingSyllable: Sound) {
    if (
      soundFollowingSyllable.name === TonalSoundTags.medial &&
      medialSounds.includes(soundFollowingSyllable.toString())
    ) {
      return this.voicedFinal(this.sounds);
    }

    return [];
  }

  withMedial(soundFollowingSyllable: Sound) {
    if (
      soundFollowingSyllable.name === TonalSoundTags.initial &&
      initialsBghjl.includes(soundFollowingSyllable.toString())
    ) {
      return this.voicedFinal(this.sounds);
    }
    return [];
  }

  changeFinalPtkppttkk(soundFollowingSyllable: Sound) {
    const sandhiTTt = this.changeFinalTTt(soundFollowingSyllable);
    if (sandhiTTt.length > 0) return sandhiTTt;

    const sandhiHHh = this.changeFinalHHh(soundFollowingSyllable);
    if (sandhiHHh.length > 0) return sandhiHHh;

    const sandhiPPp = this.changeFinalPPp(soundFollowingSyllable);
    if (sandhiPPp.length > 0) return sandhiPPp;

    const voicedWithMnng = this.withInitialMnng(soundFollowingSyllable);
    if (voicedWithMnng.length > 0) return voicedWithMnng;

    const voicedWithMedial = this.withMedial(soundFollowingSyllable);
    if (voicedWithMedial.length > 0) return voicedWithMedial;

    const voicedWithBghjl = this.withInitialBghjl(soundFollowingSyllable);
    if (voicedWithBghjl.length > 0) return voicedWithBghjl;
  }

  changeFinalN(soundFollowingSyllable: Sound): Array<TonalSyllable> {
    if (
      this.sounds[this.sounds.length - 2].name != TonalSoundTags.stopFinal &&
      this.sounds[this.sounds.length - 2].name != TonalSoundTags.nasalFinal
    ) {
      return [];
    }

    if (
      soundFollowingSyllable.toString() === TonalLetterTags.b &&
      this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.n
    ) {
      // replace final n with final m
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
      );
      s.replaceLetter(
        s.letters.length - 2,
        lowerLettersTonal.get(TonalLetterTags.m)
      );
      return [s];
    }

    return [];
  }

  private voicedFinal(sounds: Sound[]) {
    const fnl = voicelessVoicedFinals.get(sounds[sounds.length - 2].toString());

    if (fnl) {
      const s: TonalSyllable = new TonalSyllable(
        sounds.map(it => new AlphabeticLetter(it.characters))
      );
      s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
      return [s];
    }
    return [];
  }
}

/** A syllable and its sound changing forms. */
export class TonalSoundUnchangingMorpheme extends Morpheme {
  syllable: TonalSyllable;
  sounds: Array<Sound>;

  constructor(syllable: TonalSyllable, sounds: Sound[]) {
    super();
    this.syllable = syllable;
    this.sounds = sounds;
  }

  uninsertNasal() {
    const snds = this.sounds;
    snds.shift();
    return [
      new TonalSyllable(snds.map(it => new AlphabeticLetter(it.characters))),
    ];
  }

  toVoicelessFinal() {
    if (
      voicedVoicelessFinals.has(this.sounds[this.sounds.length - 2].toString())
    ) {
      const fnl = voicedVoicelessFinals.get(
        this.sounds[this.sounds.length - 2].toString()
      );
      if (fnl) {
        const s: TonalSyllable = new TonalSyllable(
          this.sounds.map(it => new AlphabeticLetter(it.characters))
        );
        s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
        return [s];
      }
    }
    return [];
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

  makeMorphemes(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalCombiningMorpheme[] {
    const ltrs = graphemes.map(it => it.letter);
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

  makeMorphemes(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalSoundChangingMorpheme[] {
    const ltrs = graphemes.map(it => it.letter);
    const ptrns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptrns);

    return ms;
  }
}

export class TonalSoundUnchangingMorphemeMaker extends MorphemeMaker {
  constructor() {
    super();
  }

  protected createMorphemes() {
    return new Array<TonalSoundUnchangingMorpheme>();
  }

  protected createMorpheme(match: MatchedPattern) {
    const tcm = new TonalSoundUnchangingMorpheme(
      new TonalSyllable(match.letters),
      match.pattern
    );
    return tcm;
  }

  private postprocess(
    matches: MatchedPattern[]
  ): Array<TonalSoundUnchangingMorpheme> {
    let morphemes = this.createMorphemes();
    for (let i in matches) {
      morphemes.push(this.createMorpheme(matches[i]));
    }
    return morphemes;
  }

  makeMorphemes(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalSoundUnchangingMorpheme[] {
    const ltrs = graphemes.map(it => it.letter);
    const ptrns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptrns);

    return ms;
  }
}
