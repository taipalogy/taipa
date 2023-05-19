import { MatchedPattern, Morpheme } from '../unit';
import { MorphemeMaker } from '../maker';
import { syllabifyTonal } from '../unchange/morpheme';
import { TonalSyllable } from '../unchange/unit';
import {
  Allomorph,
  ZeroAllomorph,
  combinedFreeAllomorphs,
  uncombinedCheckedAllomorphs,
  TonalLetterTags,
  TonalSpellingTags,
  checkedToneLettersTonal,
  combinedCheckedAllomorphs,
  vowelsTonal,
  lowerLettersTonal,
  nasalizationsTonal,
} from '../tonal/tonalres';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../unit';
import {
  initialConsonantsBghjl,
  ttInitialTInitialPairs,
  voicelessVoicedFinalConsonants,
  initialConsonantsForFinalT,
  finalConsonantsForBgjlsbbggjjllss,
  initialConsonantsForTT,
  nasalInitialConsonants,
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

  isAy() {
    if (
      this.sounds[this.sounds.length - 1].toString() === TonalLetterTags.y &&
      this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.a
    )
      return true;
    return false;
  }

  private assignAllomorph(syllable: TonalSyllable): Allomorph {
    if (uncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
      const am = uncombinedCheckedAllomorphs.get(syllable.lastLetter.literal);
      if (am) return am;
      return new Allomorph();
    }

    if (
      checkedToneLettersTonal.includes(syllable.lastLetter.literal) &&
      (uncombinedCheckedAllomorphs.has(syllable.lastSecondLetter.literal) ||
        finalConsonantsForBgjlsbbggjjllss.has(
          syllable.lastSecondLetter.literal
        ))
    ) {
      // in case of a final followed by a tonal
      const ams = combinedCheckedAllomorphs.get(
        syllable.lastSecondLetter.literal + syllable.lastLetter.literal
      );

      if (ams && ams.length > 0) {
        const ret = ams.filter(
          (it) => it.tonal.toString() === syllable.lastLetter.literal
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

  get lastSecondLetter() {
    return this.sounds[this.sounds.length - 2].toString();
  }

  insertNasal(sound: Sound) {
    if (sound) {
      if (sound.name === TonalSpellingTags.nasalFinalConsonant) {
        // insertion of nasals, both internal and external sandhi
        const ltrs = this.sounds;
        ltrs.splice(0, 0, sound);
        return [
          new TonalSyllable(
            ltrs.map((x) => new AlphabeticLetter(x.characters))
          ),
        ];
      }
    }
    return [];
  }

  infect() {
    const n = nasalizationsTonal.sounds[0];
    if (n) {
      if (n.name === TonalSpellingTags.nasalization) {
        const snds = this.sounds;
        if (snds[snds.length - 1].name === TonalSpellingTags.freeTone) {
          snds.splice(snds.length - 1, 0, n);
        } else if (snds[snds.length - 1].name === TonalSpellingTags.vowel) {
          snds.push(n);
        }
        return [
          new TonalSyllable(
            snds.map((x) => new AlphabeticLetter(x.characters))
          ),
        ];
      }
    }
    return [];
  }

  /** Mutate initial consonants. */
  mutateInitialConsonant(sound: Sound) {
    if (sound) {
      if (sound.name === TonalSpellingTags.initialConsonant) {
        const snds = this.sounds;
        if (snds[0].toString() === sound.toString()) {
          const s: TonalSyllable = new TonalSyllable(
            this.sounds.map((it) => new AlphabeticLetter(it.characters))
          );

          s.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.l));
          return [s];
        }
        return [
          new TonalSyllable(
            snds.map((x) => new AlphabeticLetter(x.characters))
          ),
        ];
      }
    }
    return [];
  }

  mutateFinalConsonant(sound: Sound) {
    if (sound) {
      const snds = this.sounds;
      const syl: TonalSyllable = new TonalSyllable(
        this.sounds.map((i) => new AlphabeticLetter(i.characters))
      );
      const idx = snds.findIndex(
        (i) => i.name === TonalSpellingTags.stopFinalConsonant
      );
      syl.replaceLetter(idx, lowerLettersTonal.get(TonalLetterTags.gg));

      return [syl];
    }
    return [];
  }

  private changeFinalTTt(initial: Sound) {
    // absolute assimilation, except for t or tt followed by j. regressive
    if (
      (this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.tt &&
        Object.values(initialConsonantsForTT).includes(initial.toString())) ||
      (this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.t &&
        Object.values(initialConsonantsForFinalT).includes(initial.toString()))
    ) {
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map((it) => new AlphabeticLetter(it.characters))
      );

      let fnl = ttInitialTInitialPairs.get(
        this.sounds[this.sounds.length - 2].toString() + initial.toString()
      );
      if (!fnl && initial.toString() === TonalLetterTags.j) {
        // this block is dedicated to -tfj- and -twj-, since there is only -jfj- but not -jwj-
        fnl = ttInitialTInitialPairs.get(
          this.sounds[this.sounds.length - 2].toString() +
            this.sounds[this.sounds.length - 1] +
            initial.toString()
        );
      }
      if (fnl) {
        s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
        if (nasalInitialConsonants.includes(initial.toString())) {
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
    // TODO: mutate consonants hh and h.
    return [];
  }

  private changeFinalPPp(initial: Sound) {
    // TODO: neutrals. pp -> hh. p -> h.
    return [];
  }

  private changeWithInitialMnng(initial: Sound) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      nasalInitialConsonants.includes(initial.toString())
    ) {
      return this.voicedFinal();
    }

    return [];
  }

  private changeWithMedial(medial: Sound) {
    if (
      medial.name === TonalSpellingTags.vowel &&
      vowelsTonal.includes(medial.toString())
    ) {
      return this.voicedFinal();
    }

    return [];
  }

  private changeWithInitialBghjl(initial: Sound) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      initialConsonantsBghjl.includes(initial.toString())
    ) {
      return this.voicedFinal();
    }
    return [];
  }

  /**
   * Change a final with the beginning letter of the following syllable
   * @param beginning Beginning letter of the following syllable
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
      this.sounds[this.sounds.length - 2].name !=
        TonalSpellingTags.stopFinalConsonant &&
      this.sounds[this.sounds.length - 2].name !=
        TonalSpellingTags.nasalFinalConsonant
    ) {
      return [];
    }

    if (
      initial.toString() === TonalLetterTags.b &&
      this.sounds[this.sounds.length - 2].toString() === TonalLetterTags.n
    ) {
      // replace final n with final m
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map((it) => new AlphabeticLetter(it.characters))
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
    const fnl = voicelessVoicedFinalConsonants.get(
      this.sounds[this.sounds.length - 2].toString()
    );

    if (fnl) {
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map((it) => new AlphabeticLetter(it.characters))
      );
      s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
      return [s];
    }
    return [];
  }
}

export class TonalCombiningMorphemeMaker extends MorphemeMaker {
  private metaplasm: TonalCombiningMetaplasm;

  constructor(metaplasm: TonalCombiningMetaplasm) {
    super();
    this.metaplasm = metaplasm;
  }

  protected createArray() {
    return new Array<TonalCombiningMorpheme>();
  }

  protected createMorpheme(matched: MatchedPattern) {
    const tcm = new TonalCombiningMorpheme(
      new TonalSyllable(matched.letters),
      matched.pattern,
      this.metaplasm
    );
    return tcm;
  }

  private postprocess(
    patterns: MatchedPattern[]
  ): Array<TonalCombiningMorpheme> {
    let morphemes = this.createArray();
    for (let i in patterns) {
      morphemes.push(this.createMorpheme(patterns[i]));
    }
    return morphemes;
  }

  makeMorphemes(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalCombiningMorpheme[] {
    const ltrs = graphemes.map((it) => it.letter);
    const ptrns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptrns);

    return ms;
  }
}

export class TonalSoundChangingMorphemeMaker extends MorphemeMaker {
  constructor() {
    super();
  }

  protected createArray() {
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
    const morphemes = this.createArray();
    for (let i in matches) {
      morphemes.push(this.createMorpheme(matches[i]));
    }
    return morphemes;
  }

  makeMorphemes(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalSoundChangingMorpheme[] {
    const ltrs = graphemes.map((it) => it.letter);
    const ptrns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptrns);

    return ms;
  }
}
