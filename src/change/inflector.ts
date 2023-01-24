import { tonalInflectionAnalyzer } from './analyzer';
import {
  TonalCombiningForms,
  ThirdCombiningForm,
  AdnominalECombining,
  PhrasalVerbParticleCombining,
  ConjunctiveLeCombining,
  PossesiveExCombining,
  FirstSeventhCombining,
  EighthToSecondCombining,
  EighthToFirstCombining,
} from './metaplasm';
import { TonalInflectionLexeme } from './lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { createTonalInflectionLexeme } from './creator';
import { TonalLetterTags } from '../tonal/tonalalphabet';
import { TonalDesinenceInflection, TransfixInflection } from './metaplasm';
import { ParticlesPhrasalVerb } from '../dparser/dictionary';

/** Inflects the inflectional suffix of a word. Lexical inflector. */
export function inflectDesinence(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new TonalCombiningForms());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/** Inflects the transfix of a word. All tonals other than 3rd tone will be changed to 3rd tone. Lexical inflector. */
export function inflectTransfix(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new ThirdCombiningForm());
  const lx = tia.lexAnalyze(ms, new TransfixInflection());
  return lx;
}

/**
 * Inflects e to ez. Lexical inflector.
 * @param word E, ew, or ez
 */
export function inflectEncliticE(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new AdnominalECombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects 4th tone to 1st tone or 3rd tone accordingly. Inflects laih to laiz. Lexical inflector.
 * @param word Particle
 * @param tone F, w, or z
 */
export function inflectPhrasalVerbParticle(
  word: string,
  tone: TonalLetterTags
) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new PhrasalVerbParticleCombining(tone));
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects lez and lew to le. Lexical inflector.
 * @param word Lew, lez, or le
 */
export function inflectEncliticLe(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new ConjunctiveLeCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects ex to ew. Lexical inflector.
 * @param word Ex
 */
export function inflectPossesiveEx(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new PossesiveExCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects 4th tone to either 1st free tone or 7th free tone. Lexical inflector.
 * @param word 4th checked tone
 * @param tone F or z
 */
export function inflectTo(word: string, tone: TonalLetterTags) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new FirstSeventhCombining(tone));
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects 8th tone to 1st tone. Addon inflector.
 * @param word 8th checked tone
 */
export function inflectEighthToFirst(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new EighthToFirstCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects 8th tone to 2nd tone. Addon inflector.
 * @param word 8th neutral tone
 */
export function inflectEighthToSecond(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new EighthToSecondCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflects a phrasal verb of length 2 to proceeding form. Phrasal inflector.
 * @param verb Main word
 * @param particle Particle
 */
export function inflectToProceeding(verb: string, particle: string) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectDesinence(verb);
  let lxParticle: TonalInflectionLexeme = createTonalInflectionLexeme('');
  if (particle === ParticlesPhrasalVerb.khih) {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
  } else {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.w);
  }
  return phm.makePhrasalVerbPhraseme(lxVerb, lxParticle);
}

/**
 * Inflects a phrasal verb of length 3 to proceeding form. Phrasal inflector.
 * @param verb Main word
 * @param particle Particle one
 * @param particleTwo Particle two
 */
export function inflectVppToProceeding(
  verb: string,
  particle: string,
  particleTwo: string
) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectDesinence(verb);
  let lxParticle: TonalInflectionLexeme = createTonalInflectionLexeme('');
  let lxParticleTwo: TonalInflectionLexeme = createTonalInflectionLexeme('');
  if (
    particle === ParticlesPhrasalVerb.cut &&
    particleTwo === ParticlesPhrasalVerb.khih
  ) {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
    lxParticleTwo = inflectPhrasalVerbParticle(particleTwo, TonalLetterTags.f);
  } else if (
    particle === ParticlesPhrasalVerb.khih &&
    particleTwo === ParticlesPhrasalVerb.laih
  ) {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
    lxParticleTwo = inflectPhrasalVerbParticle(particleTwo, TonalLetterTags.z);
  }
  return phm.makePhrasalVerbVppPhraseme(lxVerb, lxParticle, lxParticleTwo);
}

/**
 * Inflects a phrasal verb of length 3 to transitive form. Phrasal inflector.
 * @param verb Main word
 * @param particle Particle one
 * @param particleTwo Particle two
 */
export function inflectVppToTransitive(
  verb: string,
  particle: string,
  particleTwo: string
) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectDesinence(verb);
  const lxParticle = inflectDesinence(particle);
  const lxParticleTwo = inflectDesinence(particleTwo);
  return phm.makeTransitiveVppPhraseme(lxVerb, lxParticle, lxParticleTwo);
}

/**
 * Inflects e form to adnominal form. Phrasal inflector.
 * @param adjectivalNoun Main word
 * @param e E, ew, or ez
 */
export function inflectEToAdnominal(adjectivalNoun: string, e: string) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxAdjective = createTonalInflectionLexeme(adjectivalNoun);
  const lxE = inflectEncliticE(e);
  return phm.makeAdjectivePhraseme(lxAdjective, lxE);
}

/**
 * Inflects le form to conjunctive form. Phrasal inflector.
 * @param verb Main word
 * @param le Le, lew, or lez
 */
export function inflectLeToConjunctive(verb: string, le: string) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectDesinence(verb);
  const lxLe = inflectEncliticLe(le);
  return phm.makeConjunctivePhraseme(lxVerb, lxLe);
}

/**
 * Inflects possesive case from teriminal form to adnominal form. Phrasal inflector.
 * @param noun Main word
 * @param ex Ex
 */
export function inflectPossesive(noun: string, ex: string) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxNoun = createTonalInflectionLexeme(noun);
  const lxEx = inflectPossesiveEx(ex);
  return phm.makePossesivePhraseme(lxNoun, lxEx);
}

/**
 * Inflects a phrasal verb of length 2 to participle form. Phrasal inflector.
 * @param verb Main word
 * @param particle Particle
 * @param tone 1st tone or 7th tone
 * */
export function inflectToParticiple(
  verb: string,
  particle: string,
  tone: TonalLetterTags
) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectTo(verb, tone);
  const lxParticle = inflectTo(particle, tone);
  return phm.makeParticiplePhraseme(lxVerb, lxParticle);
}

/**
 * Inflects a phrasal verb of length 3 to participle form. Phrasal inflector.
 * @param verb Main word
 * @param particle Particle one
 * @param particleTwo Particle two
 * @param tone 1st tone or 7th tone
 */
export function inflectVppToParticiple(
  verb: string,
  particle: string,
  particleTwo: string,
  tone: TonalLetterTags
) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectTo(verb, tone);
  const lxParticle = inflectTo(particle, tone);
  const lxParticleTwo = inflectTo(particleTwo, tone);
  return phm.makeVppParticiplePhraseme(lxVerb, lxParticle, lxParticleTwo);
}

/** Inflects a series of words. The forms of the last word indicates the whole phrase is in proceeding form or not. Phrasal inflector. */
export function inflectSerial(...words: string[]) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lexemes = words.map(it => inflectDesinence(it));
  return phm.makeSerialPhraseme(lexemes);
}
