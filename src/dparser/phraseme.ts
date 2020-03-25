import { TonalInflectionLexeme, TonalAssimilationLexeme } from './lexeme';
import {
  TonalPhrasalInflectionMetaplasm,
  TonalPhrasalAssimilationMetaplasm,
  Phraseme
} from '../phraseme';
import {
  Adnominal,
  ConjugateToProceeding,
  Conjunctive,
  ConjugateVppToProceeding,
  ConjugateToParticiple,
  ConjugateVppToParticiple,
  ConjugateVppToTransitive
} from './metaplasm';
import { TonalWord } from '../tonal/lexeme';
import { TonalPhrase } from '../tonal/phraseme';

/** A phrase and its inflected forms. */
export class PhrasalVerbPhraseme extends Phraseme {
  /** Verb + particle */
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    metaplasm: TonalPhrasalInflectionMetaplasm
  ) {
    super();
    this.phrase = new TonalPhrase([verb.word, particle.word]);

    this.forms = metaplasm.apply(verb, particle);
  }

  /** Get proceeding forms or participle forms */
  getForms() {
    return this.forms;
  }
}

/** A phrase and its inflected forms. */
export class PhrasalVerbVppPhraseme extends Phraseme {
  /** Verb + particle + particle */
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme,
    metaplasm: TonalPhrasalInflectionMetaplasm
  ) {
    super();
    this.phrase = new TonalPhrase([verb.word, particle.word, particleTwo.word]);

    this.forms = metaplasm.applyVpp(verb, particle, particleTwo);
  }

  /** Get proceeding forms, participle forms, or transitive form */
  getForms() {
    return this.forms;
  }
}

/** A compound. */
export class TonalCompoundPhraseme extends Phraseme {
  /** Preceding word is inflected while following word is not. */
  phrase: TonalPhrase;
  /** Separable phrasal verb. Separate compound verb. Separable verb. Tiappwsux gifchongwguy. Tiappwsux gifsiannzguy. Adverb + verb. Verb + preposition. */
  constructor(
    preceding: TonalInflectionLexeme,
    following: TonalInflectionLexeme
  ) {
    super();
    this.phrase = new TonalPhrase([preceding.getForms()[0], following.word]);
  }
}

/** A phrase and its inflected forms. */
export class TonalMainParticlePhraseme extends Phraseme {
  /** Main word and its particle. */
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  /** E-adjective. Le form. Terminal form of possesive case. */
  constructor(
    main: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    metaplasm: TonalPhrasalInflectionMetaplasm
  ) {
    super();
    this.phrase = new TonalPhrase([main.word, particle.word]);

    this.forms = metaplasm.apply(main, particle);
  }

  /** Adnominal form. Conjunctive form. */
  getForms() {
    return this.forms;
  }
}

/** A phrase and its inflected forms. */
export class SerialPhraseme extends Phraseme {
  /** A series of words that are inflected except for the last one. */
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  /** A series of lexemes. */
  constructor(lexemes: TonalInflectionLexeme[]) {
    super();
    // the base form is equivalent to a compound when there are only 2 words
    const words: TonalWord[] = [];
    for (let i = 0; i < lexemes.length - 1; i++) {
      if (lexemes[i].getForms().length > 0 && lexemes[i].getForms()[0]) {
        words.push(lexemes[i].getForms()[0]);
      }
    }
    if (
      lexemes[lexemes.length - 1] &&
      lexemes[lexemes.length - 1].word.literal.length > 0
    ) {
      words.push(lexemes[lexemes.length - 1].word);
    }
    this.phrase = new TonalPhrase(words);

    const forms = lexemes
      .filter(it => it.getForms().length > 0 && it.getForms()[0])
      .map(it => it.getForms()[0]);
    if (forms.length > 0) this.forms = [new TonalPhrase(forms)];
    else this.forms = [];
  }

  /** A series of inflected words. */
  getForms() {
    return this.forms;
  }
}

/** A phrase and its assimilated forms. */
export class TonalAssimilationPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalAssimilationLexeme,
    following: TonalAssimilationLexeme,
    metaplasm: TonalPhrasalAssimilationMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Assimilated forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalInflectionPhrasemeMaker {
  makePhrasalVerbPhraseme(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme
  ) {
    return new PhrasalVerbPhraseme(verb, particle, new ConjugateToProceeding());
  }

  makePhrasalVerbVppPhraseme(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ) {
    return new PhrasalVerbVppPhraseme(
      verb,
      particle,
      particleTwo,
      new ConjugateVppToProceeding()
    );
  }

  makeTransitiveVppPhraseme(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ) {
    return new PhrasalVerbVppPhraseme(
      verb,
      particle,
      particleTwo,
      new ConjugateVppToTransitive()
    );
  }

  makeCompoundPhraseme(
    preceding: TonalInflectionLexeme,
    following: TonalInflectionLexeme
  ) {
    return new TonalCompoundPhraseme(preceding, following);
  }

  makeAdjectivePhraseme(
    adjectivalNoun: TonalInflectionLexeme,
    e: TonalInflectionLexeme
  ) {
    return new TonalMainParticlePhraseme(adjectivalNoun, e, new Adnominal());
  }

  makeConjunctivePhraseme(
    verb: TonalInflectionLexeme,
    le: TonalInflectionLexeme
  ) {
    return new TonalMainParticlePhraseme(verb, le, new Conjunctive());
  }

  makePossesivePhraseme(
    noun: TonalInflectionLexeme,
    ex: TonalInflectionLexeme
  ) {
    return new TonalMainParticlePhraseme(noun, ex, new Adnominal());
  }

  makeParticiplePhraseme(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme
  ) {
    return new PhrasalVerbPhraseme(verb, particle, new ConjugateToParticiple());
  }

  makeVppParticiplePhraseme(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ) {
    return new PhrasalVerbVppPhraseme(
      verb,
      particle,
      particleTwo,
      new ConjugateVppToParticiple()
    );
  }

  makeSerialPhraseme(lexemes: TonalInflectionLexeme[]) {
    return new SerialPhraseme(lexemes);
  }
}

export class TonalAssimilationPhrasemeMaker {
  makePhraseme(
    preceding: TonalAssimilationLexeme,
    following: TonalAssimilationLexeme,
    metaplasm: TonalPhrasalAssimilationMetaplasm
  ) {
    return new TonalAssimilationPhraseme(preceding, following, metaplasm);
  }
}
