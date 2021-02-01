import { tonalLemmatizationAnalyzer } from './analyzer';
import {
  TonalUncombiningForms,
  PhrasalVerbParticleUncombining,
} from './metaplasm';

/**
 * Lemmatizes a word.
 * @param word A word to be lemmatized.
 */
export function lemmatize(word: string) {
  const ms = tonalLemmatizationAnalyzer.morphAnalyze(
    word,
    new TonalUncombiningForms([])
  );
  const lx = tonalLemmatizationAnalyzer.lexAnalyze(ms);
  return lx;
}

/**
 * Lemmatize a phrasal verb particle.
 * @param word A phrasal verb particle to be lemmatized.
 */
export function lemmatizePhrasalVerbParticle(word: string) {
  const ms = tonalLemmatizationAnalyzer.morphAnalyze(
    word,
    new PhrasalVerbParticleUncombining()
  );
  const lx = tonalLemmatizationAnalyzer.lexAnalyze(ms);
  return lx;
}
