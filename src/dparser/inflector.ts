import { TonalInflectionAnalyzer } from './analyzer';
import {
  TonalCombiningForms,
  ThirdCombiningForm,
  EncliticECombining,
  PhrasalVerbParticleCombining,
  ConjunctiveLeCombining,
  PossesiveExCombining,
  FirstSeventhCombining
} from './metaplasm';
import { TonalInflectionLexeme } from './lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { createTonalInflectionLexeme } from './creator';
import { TonalLetterTags } from '../tonal/version2';
import { TonalDesinenceInflection, TransfixInflection } from './metaplasm';

/** Given a word, inflect it accordingly and create a `TonalInflectionLexeme`. */
export class TonalInflector {
  private readonly tia = new TonalInflectionAnalyzer();

  /** Inflect the inflectional suffix of a word. */
  inflectDesinence(word: string) {
    const ms = this.tia.morphAnalyze(word, new TonalCombiningForms());
    const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
    return lx;
  }

  /** Inflect the transfix of a word. All tonals other than 3rd tone will be changed to 3rd tone. */
  inflectTransfix(word: string) {
    const ms = this.tia.morphAnalyze(word, new ThirdCombiningForm());
    const lx = this.tia.lexAnalyze(ms, new TransfixInflection());
    return lx;
  }

  /** Inflect lez and lew to le. */
  inflectEncliticE(word: string) {
    const ms = this.tia.morphAnalyze(word, new EncliticECombining());
    const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
    return lx;
  }

  /** Inflect 4th tone to 1st tone or 3rd tone accordingly. Inflect laih to laiz. */
  inflectPhrasalVerbParticle(word: string, tone: TonalLetterTags) {
    const ms = this.tia.morphAnalyze(
      word,
      new PhrasalVerbParticleCombining(tone)
    );
    const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
    return lx;
  }

  /** Inflect ez and ew to e. */
  inflectEncliticLe(word: string) {
    const ms = this.tia.morphAnalyze(word, new ConjunctiveLeCombining());
    const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
    return lx;
  }

  /** inflect ex to ew. */
  inflectPossesiveEx(word: string) {
    const ms = this.tia.morphAnalyze(word, new PossesiveExCombining());
    const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
    return lx;
  }

  /**
   * Inflect 4th tone to either 1st free tone or 7th free tone.
   * @param word 4th checked tone
   * @param tone 1st or 7th
   */
  inflectTo(word: string, tone: TonalLetterTags) {
    const ms = this.tia.morphAnalyze(word, new FirstSeventhCombining(tone));
    const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
    return lx;
  }

  // TODO: EighthToSecondCombining and EighthToFirstCombining
}

export class TonalPhrasalInflector {
  private readonly infl = new TonalInflector();
  private readonly phm = new TonalInflectionPhrasemeMaker();

  /**
   * Inflect a verb-particle phrase to proceeding form.
   * @param verb main word
   * @param particle particle
   */
  inflectToProceeding(verb: string, particle: string) {
    const lxVerb = this.infl.inflectDesinence(verb);
    let lxParticle: TonalInflectionLexeme = createTonalInflectionLexeme('');
    if (particle === 'kih') {
      lxParticle = this.infl.inflectPhrasalVerbParticle(
        particle,
        TonalLetterTags.f
      );
    } else {
      lxParticle = this.infl.inflectPhrasalVerbParticle(
        particle,
        TonalLetterTags.w
      );
    }
    return this.phm.makePhrasalVerbPhraseme(lxVerb, lxParticle);
  }

  /**
   * Inflect a verb-particle-particle phrase to proceeding form.
   * @param verb main word
   * @param particle particle one
   * @param particleTwo particle two
   */
  inflectVppToProceeding(verb: string, particle: string, particleTwo: string) {
    const lxVerb = this.infl.inflectDesinence(verb);
    let lxParticle: TonalInflectionLexeme = createTonalInflectionLexeme('');
    let lxParticleTwo: TonalInflectionLexeme = createTonalInflectionLexeme('');
    if (particle === 'cut' && particleTwo === 'kih') {
      lxParticle = this.infl.inflectPhrasalVerbParticle(
        particle,
        TonalLetterTags.f
      );
      lxParticleTwo = this.infl.inflectPhrasalVerbParticle(
        particleTwo,
        TonalLetterTags.f
      );
    } else if (particle === 'kih' && particleTwo === 'laih') {
      lxParticle = this.infl.inflectPhrasalVerbParticle(
        particle,
        TonalLetterTags.f
      );
      lxParticleTwo = this.infl.inflectPhrasalVerbParticle(
        particleTwo,
        TonalLetterTags.z
      );
    }
    return this.phm.makePhrasalVerbVppPhraseme(
      lxVerb,
      lxParticle,
      lxParticleTwo
    );
  }

  /**
   * Inflect a verb-particle-particle phrase to transitive form.
   * @param verb main word
   * @param particle particle one
   * @param particleTwo particle two
   */
  inflectVppToTransitive(verb: string, particle: string, particleTwo: string) {
    const lxVerb = this.infl.inflectDesinence(verb);
    const lxParticle = this.infl.inflectDesinence(particle);
    const lxParticleTwo = this.infl.inflectDesinence(particleTwo);
    return this.phm.makeTransitiveVppPhraseme(
      lxVerb,
      lxParticle,
      lxParticleTwo
    );
  }

  /**
   * Inflect to adnominal form. E will be inflected to ez.
   * @param adjectivalNoun main word
   * @param e e, ew, or ez
   */
  inflectEToAdnominal(adjectivalNoun: string, e: string) {
    const lexemeAdjective = createTonalInflectionLexeme(adjectivalNoun);
    const lexemeE = this.infl.inflectEncliticE(e);
    return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE);
  }

  /**
   * Inflect to conjunctive form. Lew and lez will be inflected to le.
   * @param verb main word
   * @param le le, lew, or lez
   */
  inflectToConjunctive(verb: string, le: string) {
    const lexemeVerb = this.infl.inflectDesinence(verb);
    const lexemeLe = this.infl.inflectEncliticLe(le);
    return this.phm.makeConjunctivePhraseme(lexemeVerb, lexemeLe);
  }

  /**
   * Inflect possesive case from teriminal form to adnominal form.
   * @param noun main word
   * @param ex ex
   */
  inflectPossesive(noun: string, ex: string) {
    const lexemeNoun = createTonalInflectionLexeme(noun);
    const lexemeEx = this.infl.inflectPossesiveEx(ex);
    return this.phm.makePossesivePhraseme(lexemeNoun, lexemeEx);
  }

  /**
   * Inflect a verb-particle phrase to participle form.
   * @param verb main word
   * @param particle particle
   * @param tone 1st tone or 7th tone
   * */
  inflectToParticiple(verb: string, particle: string, tone: TonalLetterTags) {
    const lexemeVerb = this.infl.inflectTo(verb, tone);
    const lexemeParticle = this.infl.inflectTo(particle, tone);
    return this.phm.makeParticiplePhraseme(lexemeVerb, lexemeParticle);
  }

  /**
   * inflect a verb-particle-particle phrase to participle form.
   * @param verb main word
   * @param particles particle one and particle two
   * @param tone 1st tone or 7th tone
   */
  inflectVppToParticiple(
    verb: string,
    particles: string[],
    tone: TonalLetterTags
  ) {
    const lxVerb = this.infl.inflectTo(verb, tone);
    const lxParticle = this.infl.inflectTo(particles[0], tone);
    const lxParticleTwo = this.infl.inflectTo(particles[1], tone);
    return this.phm.makeVppParticiplePhraseme(lxVerb, [
      lxParticle,
      lxParticleTwo
    ]);
  }

  /** Inflect a series of words. The forms of the last word indicates the whole phrase is in proceeding form or not. */
  inflectSerial(...words: string[]) {
    const lexemes = words.map(it => this.infl.inflectDesinence(it));
    return this.phm.makeSerialPhraseme(lexemes);
  }
}
