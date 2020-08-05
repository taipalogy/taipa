import {
  TonalInflectionLexeme,
  TonalInsertionLexeme,
  TonalUninsertionLexeme,
  TonalUninfectionLexeme,
  TonalInfectionLexeme,
  TonalMutationLexeme,
  TonalUnmutationLexeme,
} from './lexeme';
import { Phraseme } from '../unit';
import {
  Adnominal,
  ConjugateToProceeding,
  Conjunctive,
  ConjugateVppToProceeding,
  ConjugateToParticiple,
  ConjugateVppToParticiple,
  ConjugateVppToTransitive,
} from './metaplasm';
import { TonalWord } from '../tonal/lexeme';
import { TonalPhrase } from '../tonal/phraseme';
import {
  TonalPhrasalInflectionMetaplasm,
  TonalPhrasalInsertionMetaplasm,
  TonalPhrasalUninsertionMetaplasm,
  TonalPhrasalUninfectionMetaplasm,
  TonalPhrasalInfectionMetaplasm,
  TonalPhrasalMutationMetaplasm,
  TonalPhrasalUnmutationMetaplasm,
} from '../metaplasm';

/** A phrase of length 2 and its inflected forms. */
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

  /** Returns proceeding forms or participle forms */
  getForms() {
    return this.forms;
  }
}

/** A phrase of length 3 and its inflected forms. */
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

  /** Returns proceeding forms, participle forms, or transitive forms. */
  getForms() {
    return this.forms;
  }
}

/** A compound. */
export class TonalCompoundPhraseme extends Phraseme {
  /** Preceding word is inflected while following word is not. */
  phrase: TonalPhrase;
  /** Separable phrasal verb. Separate compound verb. Separable verb. Tiapwsux gifchongwguy. Tiapwsux gifsiannzguy. Adverb + verb. Prepositional verb. */
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

  /** Returns adnominal forms or conjunctive forms. */
  getForms() {
    return this.forms;
  }
}

/** A phrase and its proceeding forms. */
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

  /** Returna a series of inflected words. */
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

export class TonalInsertionPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalInsertionLexeme,
    following: TonalInsertionLexeme,
    metaplasm: TonalPhrasalInsertionMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Returns inserted forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalInsertionPhrasemeMaker {
  makePhraseme(
    preceding: TonalInsertionLexeme,
    following: TonalInsertionLexeme,
    metaplasm: TonalPhrasalInsertionMetaplasm
  ) {
    return new TonalInsertionPhraseme(preceding, following, metaplasm);
  }
}

export class TonalUninsertionPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalUninsertionLexeme,
    following: TonalUninsertionLexeme,
    metaplasm: TonalPhrasalUninsertionMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Returns uninserted forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalUninsertionPhrasemeMaker {
  makePhraseme(
    preceding: TonalUninsertionLexeme,
    following: TonalUninsertionLexeme,
    metaplasm: TonalPhrasalUninsertionMetaplasm
  ) {
    return new TonalUninsertionPhraseme(preceding, following, metaplasm);
  }
}

export class TonalInfectionPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalInfectionLexeme,
    following: TonalInfectionLexeme,
    metaplasm: TonalPhrasalInfectionMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Returns infected forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalInfectionPhrasemeMaker {
  makePhraseme(
    preceding: TonalInfectionLexeme,
    following: TonalInfectionLexeme,
    metaplasm: TonalPhrasalInfectionMetaplasm
  ) {
    return new TonalInfectionPhraseme(preceding, following, metaplasm);
  }
}

export class TonalUninfectionPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalUninfectionLexeme,
    following: TonalUninfectionLexeme,
    metaplasm: TonalPhrasalUninfectionMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Returns uninfected forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalUninfectionPhrasemeMaker {
  makePhraseme(
    preceding: TonalUninfectionLexeme,
    following: TonalUninfectionLexeme,
    metaplasm: TonalPhrasalUninfectionMetaplasm
  ) {
    return new TonalUninfectionPhraseme(preceding, following, metaplasm);
  }
}

/** A phrase and its mutated form. */
export class TonalMutationPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalMutationLexeme,
    following: TonalMutationLexeme,
    metaplasm: TonalPhrasalMutationMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Returns mutated forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalMutationPhrasemeMaker {
  makePhraseme(
    preceding: TonalMutationLexeme,
    following: TonalMutationLexeme,
    metaplasm: TonalPhrasalMutationMetaplasm
  ) {
    return new TonalMutationPhraseme(preceding, following, metaplasm);
  }
}

/** A phrase and its unmutated form. */
export class TonalUnmutationPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    preceding: TonalUnmutationLexeme,
    following: TonalUnmutationLexeme,
    metaplasm: TonalPhrasalUnmutationMetaplasm
  ) {
    this.phrase = new TonalPhrase([preceding.word, following.word]);

    this.forms = metaplasm.apply(preceding, following);
  }

  /** Returns unmutated forms. */
  getForms() {
    return this.forms;
  }
}

export class TonalUnmutationPhrasemeMaker {
  makePhraseme(
    preceding: TonalUnmutationLexeme,
    following: TonalUnmutationLexeme,
    metaplasm: TonalPhrasalUnmutationMetaplasm
  ) {
    return new TonalUnmutationPhraseme(preceding, following, metaplasm);
  }
}
