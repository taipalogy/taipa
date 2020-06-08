import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { TonalZeroAssimilation } from '../metaplasm';
import { TonalAssimilationLexeme } from './lexeme';
import { TonalAssimilationPhrasemeMaker } from './phraseme';
import { RegressiveInternal, RegressiveExternal } from './metaplasm';
import { graphAnalyzeTonal } from '../tonal/analyzer';

/**
 * Analyzes a string into morphemes. Morphological analysis.
 * @param str A string
 */
export function morphAnalyzeChanging(str: string) {
  const gs = graphAnalyzeTonal(str);
  const tschmm = new TonalSoundChangingMorphemeMaker();
  const mrphs = tschmm.makeMorphemes(gs);
  return mrphs;
}

/** No internal sandhi. */
export function getNoAssimilation(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalAssimilationLexeme(mrphs, new TonalZeroAssimilation());

  return lx;
}

// TODO: need to differentiate assimilation between consonant mutation

/** Assimilates regressively inside a word. */
export function assimilateRegressiveInternal(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalAssimilationLexeme(mrphs, new RegressiveInternal());

  return lx;
}

/** Assimilates regressively between 2 words. */
export function assimilateRegressiveExternal(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoAssimilation(preceding);
  const lxFollowing = getNoAssimilation(following);
  const phmk = new TonalAssimilationPhrasemeMaker();

  return phmk.makePhraseme(lxPreceding, lxFollowing, new RegressiveExternal());
}
