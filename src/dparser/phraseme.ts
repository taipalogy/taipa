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

export class TonalMainParticlePhraseme extends Phraseme {
  /** Main word and its particle. E-adjective. Conjunctive form. Possesive case. */
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    lexemeAdjectivalNoun: TonalInflectionLexeme,
    lexemeE: TonalInflectionLexeme,
    metaplasm: TonalPhrasalInflectionMetaplasm
  ) {
    super();
    this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

    this.forms = metaplasm.apply(lexemeAdjectivalNoun, lexemeE);
  }

  getForms() {
    return this.forms;
  }
}

export class SerialPhraseme extends Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

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

  getForms() {
    return this.forms;
  }
}

export class TonalAssimilationPhraseme implements Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    lexemePreceding: TonalAssimilationLexeme,
    lexemeFollowing: TonalAssimilationLexeme,
    metaplasm: TonalPhrasalAssimilationMetaplasm
  ) {
    this.phrase = new TonalPhrase([lexemePreceding.word, lexemeFollowing.word]);

    this.forms = metaplasm.apply(lexemePreceding, lexemeFollowing);
  }

  getForms() {
    return this.forms;
  }
}

export class TonalInflectionPhrasemeMaker {
  makePhrasalVerbPhraseme(
    lexemeVerb: TonalInflectionLexeme,
    lexemeParticle: TonalInflectionLexeme
  ) {
    return new PhrasalVerbPhraseme(
      lexemeVerb,
      lexemeParticle,
      new ConjugateToProceeding()
    );
  }

  makePhrasalVerbVppPhraseme(
    lexemeVerb: TonalInflectionLexeme,
    lexemeParticle: TonalInflectionLexeme,
    lexemeParticleTwo: TonalInflectionLexeme
  ) {
    return new PhrasalVerbVppPhraseme(
      lexemeVerb,
      lexemeParticle,
      lexemeParticleTwo,
      new ConjugateVppToProceeding()
    );
  }

  makeTransitiveVppPhraseme(
    lexemeVerb: TonalInflectionLexeme,
    lexemeParticle: TonalInflectionLexeme,
    lexemeParticleTwo: TonalInflectionLexeme
  ) {
    return new PhrasalVerbVppPhraseme(
      lexemeVerb,
      lexemeParticle,
      lexemeParticleTwo,
      new ConjugateVppToTransitive()
    );
  }

  makeCompoundPhraseme(
    lexemePreceding: TonalInflectionLexeme,
    lexemeFollowing: TonalInflectionLexeme
  ) {
    return new TonalCompoundPhraseme(lexemePreceding, lexemeFollowing);
  }

  makeAdjectivePhraseme(
    lexemeAdjectivalNoun: TonalInflectionLexeme,
    lexemeE: TonalInflectionLexeme
  ) {
    return new TonalMainParticlePhraseme(
      lexemeAdjectivalNoun,
      lexemeE,
      new Adnominal()
    );
  }

  makeConjunctivePhraseme(
    lexemeVerb: TonalInflectionLexeme,
    lexemeLe: TonalInflectionLexeme
  ) {
    return new TonalMainParticlePhraseme(
      lexemeVerb,
      lexemeLe,
      new Conjunctive()
    );
  }

  makePossesivePhraseme(
    lexemeNoun: TonalInflectionLexeme,
    lexemeEx: TonalInflectionLexeme
  ) {
    return new TonalMainParticlePhraseme(lexemeNoun, lexemeEx, new Adnominal());
  }

  makeParticiplePhraseme(
    lexemeVerb: TonalInflectionLexeme,
    lexemeParticle: TonalInflectionLexeme
  ) {
    return new PhrasalVerbPhraseme(
      lexemeVerb,
      lexemeParticle,
      new ConjugateToParticiple()
    );
  }

  makeVppParticiplePhraseme(
    verb: TonalInflectionLexeme,
    particles: TonalInflectionLexeme[]
  ) {
    return new PhrasalVerbVppPhraseme(
      verb,
      particles[0],
      particles[1],
      new ConjugateVppToParticiple()
    );
  }

  makeSerialPhraseme(lexemes: TonalInflectionLexeme[]) {
    return new SerialPhraseme(lexemes);
  }
}

export class TonalAssimilationPhrasemeMaker {
  makePhraseme(
    lexemePreceding: TonalAssimilationLexeme,
    lexemeFollowing: TonalAssimilationLexeme,
    metaplasm: TonalPhrasalAssimilationMetaplasm
  ) {
    return new TonalAssimilationPhraseme(
      lexemePreceding,
      lexemeFollowing,
      metaplasm
    );
  }
}
