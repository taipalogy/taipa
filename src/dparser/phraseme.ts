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
  ConjugateVppToParticiple
} from './metaplasm';
import { TonalWord } from '../tonal/lexeme';
import { TonalPhrase } from '../tonal/phraseme';

export class PhrasalVerbPhraseme extends Phraseme {
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

  getForms() {
    return this.forms;
  }
}
/*
export class PhrasalVerbVppPhraseme extends Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    verb: TonalInflectionLexeme,
    particles: TonalInflectionLexeme[],
    metaplasm: TonalPhrasalInflectionMetaplasm
  ) {
    super();
    this.phrase = new TonalPhrase([
      verb.word,
      particles[0].word,
      particles[1].word
    ]);

    this.forms = metaplasm.apply(verb, particles[0], particles[1]);
  }

  getForms() {
    return this.forms;
  }
}
*/
export class PhrasalVerbVppPhraseme extends Phraseme {
  phrase: TonalPhrase;
  private forms: Array<TonalPhrase> = new Array();

  constructor(
    lexemeVerb: TonalInflectionLexeme,
    lexemeParticle: TonalInflectionLexeme,
    lexemeParticleTwo: TonalInflectionLexeme,
    metaplasm: TonalPhrasalInflectionMetaplasm
  ) {
    super();
    this.phrase = new TonalPhrase([
      lexemeVerb.word,
      lexemeParticle.word,
      lexemeParticleTwo.word
    ]);

    this.forms = metaplasm.applyVpp(
      lexemeVerb,
      lexemeParticle,
      lexemeParticleTwo
    );
  }

  getForms() {
    return this.forms;
  }
}

export class TonalCompoundPhraseme extends Phraseme {
  // separable phrasal verb. separate compound verb. separable verb.
  // separable phrasal verbs are transitive when main verb and its particles are separated
  // tiappwsux gifchongwguy. tiappwsux gifsiannzguy
  // adverb + verb. verb + adverb
  phrase: TonalPhrase;
  constructor(
    lexemePreceding: TonalInflectionLexeme,
    lexemeFollowing: TonalInflectionLexeme
  ) {
    super();
    this.phrase = new TonalPhrase([
      lexemePreceding.getForms()[0],
      lexemeFollowing.word
    ]);
  }
}

export class TonalMainParticlePhraseme extends Phraseme {
  // main word and its particle
  // e-adjective. conjunctive form. possesive
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

  makePhrasalVerbTwoPhraseme(
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
