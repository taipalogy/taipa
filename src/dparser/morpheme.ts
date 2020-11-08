import { MatchedPattern, MorphemeMaker, Morpheme } from '../unit';
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme';
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
} from '../tonal/version2';
import {
  AlphabeticLetter,
  AlphabeticGrapheme,
  PositionalLetter,
} from '../unit';
import {
  initialConsonantsBghjl,
  ttInitialTInitialPairs,
  voicelessVoicedFinalConsonants,
  initialConsonantsForFinalT,
  finalConsonantsForBgjlsbbggllss,
  voicedVoicelessFinalConsonants,
  initialConsonantsForTT,
  nasalInitialConsonants,
} from '../tonal/collections';
import { TonalCombiningMetaplasm } from '../metaplasm';

/** A syllable and its combining forms. */
export class TonalCombiningMorpheme extends Morpheme {
  syllable: TonalSyllable;
  allomorph: Allomorph; // required to populate stems
  private metaplasm: TonalCombiningMetaplasm;
  letters: Array<PositionalLetter>;
  private forms: TonalSyllable[];

  constructor(
    syllable: TonalSyllable,
    letters: PositionalLetter[],
    metaplasm: TonalCombiningMetaplasm
  ) {
    super();
    this.syllable = syllable;
    this.metaplasm = metaplasm;

    // assign allomorph for each syllable
    this.allomorph = this.assignAllomorph(this.syllable);
    this.letters = letters;
    this.forms = this.metaplasm.apply(this.letters, this.allomorph);
  }

  getForms(): TonalSyllable[] {
    return this.forms;
  }

  isAy() {
    if (
      this.letters[this.letters.length - 1].toString() === TonalLetterTags.y &&
      this.letters[this.letters.length - 2].toString() === TonalLetterTags.a
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
        finalConsonantsForBgjlsbbggllss.has(syllable.lastSecondLetter.literal))
    ) {
      // in case of a final followed by a tonal
      const ams = combinedCheckedAllomorphs.get(
        syllable.lastSecondLetter.literal + syllable.lastLetter.literal
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
  letters: Array<PositionalLetter>;

  constructor(syllable: TonalSyllable, letters: PositionalLetter[]) {
    super();
    this.syllable = syllable;
    this.letters = letters;
  }

  get lastSecondLetter() {
    return this.letters[this.letters.length - 2].toString();
  }

  insertNasal(letter: PositionalLetter) {
    if (letter) {
      if (letter.name === TonalSpellingTags.nasalFinalConsonant) {
        // insertion of nasals, both internal and external sandhi
        const ltrs = this.letters;
        ltrs.splice(0, 0, letter);
        return [
          new TonalSyllable(ltrs.map(x => new AlphabeticLetter(x.characters))),
        ];
      }
    }
    return [];
  }

  infect() {
    const n = nasalizationsTonal.letters[0];
    if (n) {
      if (n.name === TonalSpellingTags.nasalization) {
        const ltrs = this.letters;
        if (ltrs[ltrs.length - 1].name === TonalSpellingTags.freeTone) {
          ltrs.splice(ltrs.length - 1, 0, n);
        } else if (ltrs[ltrs.length - 1].name === TonalSpellingTags.vowel) {
          ltrs.push(n);
        }
        return [
          new TonalSyllable(ltrs.map(x => new AlphabeticLetter(x.characters))),
        ];
      }
    }
    return [];
  }

  /** Mutate initial consonants. */
  mutateInitialConsonant(letter: PositionalLetter) {
    if (letter) {
      if (letter.name === TonalSpellingTags.initialConsonant) {
        const ltrs = this.letters;
        if (ltrs[0].toString() === letter.toString()) {
          const s: TonalSyllable = new TonalSyllable(
            this.letters.map(it => new AlphabeticLetter(it.characters))
          );

          s.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.l));
          return [s];
        }
        return [
          new TonalSyllable(ltrs.map(x => new AlphabeticLetter(x.characters))),
        ];
      }
    }
    return [];
  }

  mutateFinalConsonant(letter: PositionalLetter) {
    if (letter) {
      const ltrs = this.letters;
      const syl: TonalSyllable = new TonalSyllable(
        this.letters.map(i => new AlphabeticLetter(i.characters))
      );
      const idx = ltrs.findIndex(
        i => i.name === TonalSpellingTags.stopFinalConsonant
      );
      syl.replaceLetter(idx, lowerLettersTonal.get(TonalLetterTags.gg));

      return [syl];
    }
    return [];
  }

  private changeFinalTTt(initial: PositionalLetter) {
    // absolute assimilation, except for t or tt followed by j. regressive
    if (
      (this.letters[this.letters.length - 2].toString() ===
        TonalLetterTags.tt &&
        Object.values(initialConsonantsForTT).includes(initial.toString())) ||
      (this.letters[this.letters.length - 2].toString() === TonalLetterTags.t &&
        Object.values(initialConsonantsForFinalT).includes(initial.toString()))
    ) {
      const s: TonalSyllable = new TonalSyllable(
        this.letters.map(it => new AlphabeticLetter(it.characters))
      );

      let fnl = ttInitialTInitialPairs.get(
        this.letters[this.letters.length - 2].toString() + initial.toString()
      );
      if (!fnl && initial.toString() === TonalLetterTags.j) {
        // this block is dedicated to -tfj- and -twj-, since there is only -jfj- but not -jwj-
        // TODO: need to clarify if there is -jwj-
        fnl = ttInitialTInitialPairs.get(
          this.letters[this.letters.length - 2].toString() +
            this.letters[this.letters.length - 1] +
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

  private changeFinalHHh(initial: PositionalLetter) {
    // TODO: mutate consonants hh and h.
    return [];
  }

  private changeFinalPPp(initial: PositionalLetter) {
    // TODO: neutrals. pp -> hh. p -> h.
    return [];
  }

  private changeWithInitialMnng(initial: PositionalLetter) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      nasalInitialConsonants.includes(initial.toString())
    ) {
      return this.voicedFinal();
    }

    return [];
  }

  private changeWithMedial(medial: PositionalLetter) {
    if (
      medial.name === TonalSpellingTags.vowel &&
      vowelsTonal.includes(medial.toString())
    ) {
      return this.voicedFinal();
    }

    return [];
  }

  private changeWithInitialBghjl(initial: PositionalLetter) {
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
  changeFinalPtkppttkk(beginning: PositionalLetter) {
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

  changeFinalN(initial: PositionalLetter): Array<TonalSyllable> {
    if (
      this.letters[this.letters.length - 2].name !=
        TonalSpellingTags.stopFinalConsonant &&
      this.letters[this.letters.length - 2].name !=
        TonalSpellingTags.nasalFinalConsonant
    ) {
      return [];
    }

    if (
      initial.toString() === TonalLetterTags.b &&
      this.letters[this.letters.length - 2].toString() === TonalLetterTags.n
    ) {
      // replace final n with final m
      const s: TonalSyllable = new TonalSyllable(
        this.letters.map(it => new AlphabeticLetter(it.characters))
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
      this.letters[this.letters.length - 2].toString()
    );

    if (fnl) {
      const s: TonalSyllable = new TonalSyllable(
        this.letters.map(it => new AlphabeticLetter(it.characters))
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
  letters: Array<PositionalLetter>;

  constructor(syllable: TonalSyllable, letters: PositionalLetter[]) {
    super();
    this.syllable = syllable;
    this.letters = letters;
  }

  get lastSecondLetter() {
    return this.letters[this.letters.length - 2].toString();
  }

  uninsertNasal() {
    const ltrs = this.letters;
    ltrs.shift();
    return [
      new TonalSyllable(ltrs.map(it => new AlphabeticLetter(it.characters))),
    ];
  }

  toVoicelessFinal() {
    // unvoiced
    if (
      voicedVoicelessFinalConsonants.has(
        this.letters[this.letters.length - 2].toString()
      )
    ) {
      const fnl = voicedVoicelessFinalConsonants.get(
        this.letters[this.letters.length - 2].toString()
      );
      if (fnl) {
        const s: TonalSyllable = new TonalSyllable(
          this.letters.map(it => new AlphabeticLetter(it.characters))
        );
        s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
        return [s];
      }
    }
    return [];
  }

  unmutateInitialConsonant(initial: PositionalLetter) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      initial.toString() === TonalLetterTags.t
    ) {
      // l -> d
      const s: TonalSyllable = new TonalSyllable(
        this.letters.map(it => new AlphabeticLetter(it.characters))
      );
      s.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.t));
      return [s];
    }
    return [];
  }

  unmutateFinalConsonant(initial: PositionalLetter) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      initial.toString() === TonalLetterTags.g
    ) {
      // gg -> tt
      const syl: TonalSyllable = new TonalSyllable(
        this.letters.map(it => new AlphabeticLetter(it.characters))
      );
      const idx = this.letters.findIndex(
        i => i.name === TonalSpellingTags.stopFinalConsonant
      );
      syl.replaceLetter(idx, lowerLettersTonal.get(TonalLetterTags.tt));
      return [syl];
    }

    return [];
  }

  uninfect() {
    const n = this.letters.filter(
      i => i.name === TonalSpellingTags.nasalization
    );
    if (n.length == 1) {
      let ltrs = this.letters.filter(
        i => i.name !== TonalSpellingTags.nasalization
      );
      const s: TonalSyllable = new TonalSyllable(
        ltrs.map(it => new AlphabeticLetter(it.characters))
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
