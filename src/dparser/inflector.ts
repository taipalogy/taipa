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
  EighthToFirstCombining
} from './metaplasm';
import { TonalInflectionLexeme } from './lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { createTonalInflectionLexeme } from './creator';
import { TonalLetterTags } from '../tonal/version2';
import { TonalDesinenceInflection, TransfixInflection } from './metaplasm';

/** Inflect the inflectional suffix of a word. Lexical inflector. */
export function inflectDesinence(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new TonalCombiningForms());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/** Inflect the transfix of a word. All tonals other than 3rd tone will be changed to 3rd tone. Lexical inflector. */
export function inflectTransfix(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new ThirdCombiningForm());
  const lx = tia.lexAnalyze(ms, new TransfixInflection());
  return lx;
}

/**
 * Inflect e to ez. Lexical inflector.
 * @param word e, ew, or ez
 */
export function inflectEncliticE(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new AdnominalECombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflect 4th tone to 1st tone or 3rd tone accordingly. Inflect laih to laiz. Lexical inflector.
 * @param word particle
 * @param tone f, w, or z
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
 * Inflect lez and lew to le. Lexical inflector.
 * @param word lew, lez, or le
 */
export function inflectEncliticLe(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new ConjunctiveLeCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflect ex to ew. Lexical inflector.
 * @param word ex
 */
export function inflectPossesiveEx(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new PossesiveExCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflect 4th tone to either 1st free tone or 7th free tone. Lexical inflector.
 * @param word 4th checked tone
 * @param tone f or z
 */
export function inflectTo(word: string, tone: TonalLetterTags) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new FirstSeventhCombining(tone));
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflect 8th tone to 1st tone. Addon inflector.
 * @param word 8th checked tone
 */
export function inflectEighthToFirst(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new EighthToFirstCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflect 8th tone to 2nd tone. Addon inflector.
 * @param word 8th neutral tone
 */
export function inflectEighthToSecond(word: string) {
  const tia = tonalInflectionAnalyzer;

  const ms = tia.morphAnalyze(word, new EighthToSecondCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
  return lx;
}

/**
 * Inflect a phrasal verb of length 2 to proceeding form. Phrasal inflector.
 * @param verb Main word
 * @param particle Particle
 */
export function inflectToProceeding(verb: string, particle: string) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lxVerb = inflectDesinence(verb);
  let lxParticle: TonalInflectionLexeme = createTonalInflectionLexeme('');
  if (particle === 'kih') {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
  } else {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.w);
  }
  return phm.makePhrasalVerbPhraseme(lxVerb, lxParticle);
}

/**
 * Inflect a phrasal verb of length 3 to proceeding form. Phrasal inflector.
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
  if (particle === 'cut' && particleTwo === 'kih') {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
    lxParticleTwo = inflectPhrasalVerbParticle(particleTwo, TonalLetterTags.f);
  } else if (particle === 'kih' && particleTwo === 'laih') {
    lxParticle = inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
    lxParticleTwo = inflectPhrasalVerbParticle(particleTwo, TonalLetterTags.z);
  }
  return phm.makePhrasalVerbVppPhraseme(lxVerb, lxParticle, lxParticleTwo);
}

/**
 * Inflect a phrasal verb of length 3 to transitive form. Phrasal inflector.
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
 * Inflect e form to adnominal form. Phrasal inflector.
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
 * Inflect le form to conjunctive form. Phrasal inflector.
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
 * Inflect possesive case from teriminal form to adnominal form. Phrasal inflector.
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
 * Inflect a phrasal verb of length 2 to participle form. Phrasal inflector.
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
 * Inflect a phrasal verb of length 3 to participle form. Phrasal inflector.
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

/** Inflect a series of words. The forms of the last word indicates the whole phrase is in proceeding form or not. Phrasal inflector. */
export function inflectSerial(...words: string[]) {
  const phm = new TonalInflectionPhrasemeMaker();

  const lexemes = words.map(it => inflectDesinence(it));
  return phm.makeSerialPhraseme(lexemes);
}
