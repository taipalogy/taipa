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
  nasalizationSounds,
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

  infect() {
    const n = nasalizationSounds.sounds[0];
    if (n) {
      if (n.name === TonalSoundTags.nasalization) {
        const snds = this.sounds;
        if (snds[snds.length - 1].name === TonalSoundTags.freeTonal) {
          snds.splice(snds.length - 1, 0, n);
        } else if (snds[snds.length - 1].name === TonalSoundTags.medial) {
          snds.push(n);
        }
        return [
          new TonalSyllable(snds.map(x => new AlphabeticLetter(x.characters))),
        ];
      }
    }
    return [];
  }

  /** Mutate initial consonants. */
  mutateInitialConsonant(sound: Sound) {
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

  mutateFinalConsonant(sound: Sound) {
    if (sound) {
      const snds = this.sounds;
      const syl: TonalSyllable = new TonalSyllable(
        this.sounds.map(i => new AlphabeticLetter(i.characters))
      );
      const idx = snds.findIndex(i => i.name === TonalSoundTags.stopFinal);
      syl.replaceLetter(idx, lowerLettersTonal.get(TonalLetterTags.gg));

      return [syl];
    }
    return [];
  }

  private changeFinalTTt(initial: Sound) {
    // absolute assimilation. regressive
    if (
      (this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.tt &&
        Array.from(Object.values(initialsForTT)).includes(
          initial.toString()
        )) ||
      (this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.t &&
        Array.from(Object.values(initialsForFinalT)).includes(
          initial.toString()
        ))
    ) {
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
      );

      const fnl = ttInitialTInitialPairs.get(
        this.sounds[this.sounds.length - 2].toString() + initial.toString()
      );
      if (fnl) {
        s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
        if (nasalInitials.includes(initial.toString())) {
          s.insertLetter(
            s.letters.length - 2,
            new AlphabeticLetter(initial.characters)
          );
        }
        return [s];
      }
    }
    return [];
  }

  private changeFinalHHh(initial: Sound) {
    // TODO: add sandhi hh and h.
    return [];
  }

  private changeFinalPPp(initial: Sound) {
    // TODO: neutrals. pp -> hh. p -> h.
    return [];
  }

  private changeWithInitialMnng(initial: Sound) {
    if (
      initial.name === TonalSoundTags.initial &&
      nasalInitials.includes(initial.toString())
    ) {
      return this.voicedFinal();
    }

    return [];
  }

  private changeWithMedial(medial: Sound) {
    if (
      medial.name === TonalSoundTags.medial &&
      medialSounds.includes(medial.toString())
    ) {
      return this.voicedFinal();
    }

    return [];
  }

  private changeWithInitialBghjl(initial: Sound) {
    if (
      initial.name === TonalSoundTags.initial &&
      initialsBghjl.includes(initial.toString())
    ) {
      return this.voicedFinal();
    }
    return [];
  }

  /**
   * Change a final with the beginning sound/letter of the following syllable
   * @param beginning Beginning sound of the following syllable
   */
  changeFinalPtkppttkk(beginning: Sound) {
    const sandhiTTt = this.changeFinalTTt(beginning);
    if (sandhiTTt.length > 0) return sandhiTTt;

    const sandhiHHh = this.changeFinalHHh(beginning);
    if (sandhiHHh.length > 0) return sandhiHHh;

    const sandhiPPp = this.changeFinalPPp(beginning);
    if (sandhiPPp.length > 0) return sandhiPPp;

    const voicedWithMnng = this.changeWithInitialMnng(beginning);
    if (voicedWithMnng.length > 0) return voicedWithMnng;

    const voicedWithMedial = this.changeWithMedial(beginning);
    if (voicedWithMedial.length > 0) return voicedWithMedial;

    const voicedWithBghjl = this.changeWithInitialBghjl(beginning);
    if (voicedWithBghjl.length > 0) return voicedWithBghjl;
  }

  changeFinalN(initial: Sound): Array<TonalSyllable> {
    if (
      this.sounds[this.sounds.length - 2].name != TonalSoundTags.stopFinal &&
      this.sounds[this.sounds.length - 2].name != TonalSoundTags.nasalFinal
    ) {
      return [];
    }

    if (
      initial.toString() === TonalLetterTags.b &&
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

  private voicedFinal() {
    const fnl = voicelessVoicedFinals.get(
      this.sounds[this.sounds.length - 2].toString()
    );

    if (fnl) {
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
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
    // unvoiced
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

  unmutateInitialConsonant(initial: Sound) {
    if (
      initial.name === TonalSoundTags.initial &&
      initial.toString() === TonalLetterTags.d
    ) {
      // l -> d
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
      );
      s.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.d));
      return [s];
    }
    return [];
  }

  unmutateFinalConsonant(initial: Sound) {
    if (
      initial.name === TonalSoundTags.initial &&
      initial.toString() === TonalLetterTags.g
    ) {
      // gg -> tt
      const syl: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
      );
      const idx = this.sounds.findIndex(
        i => i.name === TonalSoundTags.stopFinal
      );
      syl.replaceLetter(idx, lowerLettersTonal.get(TonalLetterTags.tt));
      return [syl];
    }

    return [];
  }

  uninfect() {
    const n = this.sounds.filter(i => i.name === TonalSoundTags.nasalization);
    if (n.length == 1) {
      let snds = this.sounds.filter(
        i => i.name !== TonalSoundTags.nasalization
      );
      const s: TonalSyllable = new TonalSyllable(
        snds.map(it => new AlphabeticLetter(it.characters))
      );
      return [s];
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
