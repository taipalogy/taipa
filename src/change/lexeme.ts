import { Lexeme } from '../unit';
import { LexemeMaker } from '../maker';
import { TonalCombiningMorpheme, TonalSoundChangingMorpheme } from './morpheme';
import {
  TonalSyllable,
  TonalWord,
  AllomorphicEnding,
  FreeAllomorphicEnding,
  CheckedAllomorphicEnding,
} from '../unchange/unit';
import {
  Allomorph,
  FreeAllomorph,
  CheckedAllomorph,
  TonalSpellingTags,
  TonalLetterTags,
} from '../tonal/tonalres';
import { TonalSoundUnchangingMorpheme } from '../unchange/morpheme';
import { Sound } from '../unit';
import {
  TonalInflectionMetaplasm,
  TonalInsertionMetaplasm,
  TonalInfectionMetaplasm,
  TonalUnmutationMetaplasm,
  TonalUninfectionMetaplasm,
  TonalMutationMetaplasm,
} from '../metaplasm';

/** A word and its inflected forms. */
export class TonalInflectionLexeme extends Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();
  private endingAllomorphic: AllomorphicEnding;
  // TODO: word patterns for thiapwsux chongwthaiwgiy, ay, etc... check out member sounds in morpheme.

  constructor(
    morphemes: Array<TonalCombiningMorpheme>,
    metaplasm: TonalInflectionMetaplasm
  ) {
    super();

    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) {
      if (morphemes[morphemes.length - 1]) {
        // tonal ending needs to be assigned to sandhi lexeme
        this.endingAllomorphic = this.assignAllomorphicEnding(
          morphemes[morphemes.length - 1].allomorph
        );
      } else {
        this.endingAllomorphic = new AllomorphicEnding();
      }
    } else {
      this.endingAllomorphic = new AllomorphicEnding();
    }

    if (morphemes.length > 0)
      this.forms = this.assignWordForms(morphemes, metaplasm);
  }

  private assignAllomorphicEnding(allomorph: Allomorph) {
    let ending: AllomorphicEnding = new AllomorphicEnding();

    if (allomorph instanceof FreeAllomorph) {
      // replace the tonal ending
      let fae = new FreeAllomorphicEnding();
      fae.allomorph = allomorph;
      ending = fae;
    } else if (allomorph instanceof CheckedAllomorph) {
      // append the tonal of the tonal ending
      let chae = new CheckedAllomorphicEnding();
      chae.allomorph = allomorph;
      ending = chae;
    }
    return ending;
  }

  getInflectionalEnding() {
    if (this.endingAllomorphic)
      return this.endingAllomorphic.allomorph.tonal.toString();
    return '';
  }

  getAllomorphicEnding() {
    if (this.endingAllomorphic) return this.endingAllomorphic;
    return '';
  }

  private assignWordForms(
    ms: Array<TonalCombiningMorpheme>,
    ti: TonalInflectionMetaplasm
  ): TonalWord[] {
    return ti.apply(ms);
  }

  getForms() {
    // TODO: change member variable name and method name.
    return this.forms;
  }
}

/** A word and its inserted forms. */
export class TonalInsertionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundChangingMorpheme>,
    metaplasm: TonalInsertionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  insertWith(preceding: TonalInsertionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(x => new TonalSyllable(x.syllable.letters))
    );
    if (preceding.morphemes.length > 0) {
      const adjacentLtrs =
        preceding.morphemes[preceding.morphemes.length - 1].sounds;
      let s = new Sound();
      if (
        adjacentLtrs[adjacentLtrs.length - 1].name ===
          TonalSpellingTags.freeTone &&
        adjacentLtrs[adjacentLtrs.length - 2].name ===
          TonalSpellingTags.nasalFinalConsonant
      ) {
        s = adjacentLtrs[adjacentLtrs.length - 2];
      } else if (
        adjacentLtrs[adjacentLtrs.length - 1].name ===
        TonalSpellingTags.nasalFinalConsonant
      ) {
        s = adjacentLtrs[adjacentLtrs.length - 1];
      }
      const syls = this.morphemes[0].insertNasal(s);

      wrd.replaceSyllable(0, syls[0]);

      return [wrd];
    }
    return [];
  }
}

/** A word and its inserted forms. */
export class TonalUninsertionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundUnchangingMorpheme>,
    metaplasm: TonalInsertionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  uninsertWith(preceding: TonalUninsertionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(x => new TonalSyllable(x.syllable.letters))
    );
    let initial: string = '';
    if (this.morphemes.length > 0) {
      initial = this.morphemes[0].sounds[0].toString();
    }
    if (preceding.morphemes.length > 0) {
      const precedingLtrs =
        preceding.morphemes[preceding.morphemes.length - 1].sounds;
      let s = new Sound();
      if (
        precedingLtrs[precedingLtrs.length - 1].name ===
          TonalSpellingTags.freeTone &&
        precedingLtrs[precedingLtrs.length - 2].name ===
          TonalSpellingTags.nasalFinalConsonant
      ) {
        s = precedingLtrs[precedingLtrs.length - 2];
      } else if (
        precedingLtrs[precedingLtrs.length - 1].name ===
        TonalSpellingTags.nasalFinalConsonant
      ) {
        s = precedingLtrs[precedingLtrs.length - 1];
      }

      if (
        s &&
        s.toString().length > 0 &&
        (s.toString() === initial ||
          (s.toString() === TonalLetterTags.ng &&
            initial === TonalLetterTags.g))
      ) {
        // when the preceding letter is m, the initial of this enclitic is m
        // when the preceding letter is n, the initial of this enclitic is n
        // when the preceding letter is ng, the initial of this enclitic is ng/g
        const syls = this.morphemes[0].uninsertNasal();

        wrd.replaceSyllable(0, syls[0]);
        return [wrd];
      }
    }
    return [];
  }
}

export class TonalInfectionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundChangingMorpheme>,
    metaplasm: TonalInfectionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal sandhi
    return this.forms;
  }

  infectWith(preceding: TonalInfectionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(x => new TonalSyllable(x.syllable.letters))
    );
    if (
      preceding.morphemes.length > 0 &&
      preceding.morphemes[preceding.morphemes.length - 1].sounds.filter(
        i => i.name === TonalSpellingTags.nasalization
      ).length > 0
    ) {
      // if there is a nasalization in the preceding word
      const syls = this.morphemes[0].infect();
      wrd.replaceSyllable(0, syls[0]);
      return [wrd];
    }
    return [];
  }
}

export class TonalUninfectionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundUnchangingMorpheme>,
    metaplasm: TonalUninfectionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  uninfectWith(preceding: TonalUninfectionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(i => new TonalSyllable(i.syllable.letters))
    );
    if (preceding.morphemes.length > 0) {
      const adjacentLtrs = this.morphemes[this.morphemes.length - 1].sounds;
      const n = preceding.morphemes[
        preceding.morphemes.length - 1
      ].sounds.filter(i => i.name === TonalSpellingTags.nasalization);

      if (
        n.length == 1 &&
        adjacentLtrs.filter(it => it.name === TonalSpellingTags.nasalization)
          .length == 1
      ) {
        // if there is a nasalization in the preceding word and the current word
        wrd.replaceSyllable(0, this.morphemes[0].uninfect()[0]);
        return [wrd];
      }
    }
    return [];
  }
}

/** A word and its mutated forms. */
export class TonalMutationLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundChangingMorpheme>,
    metaplasm: TonalMutationMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  mutateWith(following: TonalMutationLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(i => new TonalSyllable(i.syllable.letters))
    );

    if (following.morphemes.length > 0) {
      const adjacentLtrs =
        following.morphemes[following.morphemes.length - 1].sounds;
      if (adjacentLtrs[0].name === TonalSpellingTags.initialConsonant) {
        const s = adjacentLtrs[0];
        const syls = this.morphemes[
          this.morphemes.length - 1
        ].changeFinalPtkppttkk(s);

        if (syls && syls.length > 0) {
          wrd.popSyllable();
          wrd.pushSyllable(syls[0]);
        }

        return [wrd];
      }
    }
    return [];
  }
}

/** A word and its unmutated forms. */
export class TonalUnmutationLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundUnchangingMorpheme>,
    metaplasm: TonalUnmutationMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  unmutateWith(following: TonalUnmutationLexeme) {
    const ltrs = this.morphemes[this.morphemes.length - 1].sounds;
    const fnls = ltrs.filter(i => i.name === TonalSpellingTags.stopFinalConsonant);
    const wrd = new TonalWord(
      this.morphemes.map(i => new TonalSyllable(i.syllable.letters))
    );

    if (following.morphemes[0].sounds[0].toString() === TonalLetterTags.g) {
      if (
        fnls[0].toString() === TonalLetterTags.gg ||
        fnls[0].toString() === TonalLetterTags.g
      ) {
        wrd.replaceSyllable(
          0,
          this.morphemes[0].unmutateFinalConsonant(
            following.morphemes[0].sounds[0]
          )[0]
        );
        return [wrd];
      }
    }
    return [];
  }
}

export class TonalInflectionLexemeMaker extends LexemeMaker {
  constructor(private metaplasm: TonalInflectionMetaplasm) {
    super();
  }

  makeLexemes(morphemes: Array<TonalCombiningMorpheme>) {
    return this.make(morphemes);
  }

  protected make(morphemes: Array<TonalCombiningMorpheme>) {
    let isInflStemWithX: boolean = false; // inflectional stem with x in the middle

    if (morphemes) {
      isInflStemWithX = this.checkFifth(morphemes);
      if (isInflStemWithX) return new TonalInflectionLexeme([], this.metaplasm);
    }

    return new TonalInflectionLexeme(morphemes, this.metaplasm);
  }

  private checkFifth(ms: Array<TonalCombiningMorpheme>): boolean {
    for (let i = 0; i < ms.length; i++) {
      if (ms[i] && ms[i].syllable.lastLetter.literal === TonalLetterTags.x) {
        if (i < ms.length - 1 && !ms[ms.length - 1].isAy()) {
          if (
            ms[ms.length - 1].syllable.lastLetter.literal === TonalLetterTags.a
          ) {
            break;
          } else {
            // tonal x can't not appear in them middle of an inflectional stem
            // if it is not preceding an ay or a
            return true;
          }
        }
      }
    }

    return false;
  }
}
