// client
export { Client } from './client';

// API
export { TonalLemmatizationAnalyzer } from './tonal/analyzer';
export { TonalInflectionAnalyzer } from './dparser/analyzer';
export { KanaLemmatizationAnalyzer } from './kana/analyzer';
export { GraphemeMaker } from './unit';
export { lexicalRoots } from './tonal/lexicalroots2';
export {
  lowerLettersTonal,
  TonalLetterTags,
  TonalSoundTags
} from './tonal/version2';
export { TonalLemmatizer } from './tonal/lemmatizer';
export { TonalAssimilator } from './dparser/assimilator';
export {
  createTonalPhrase,
  createTonalInflectionLexeme,
  createCompoundPhraseme
} from './dparser/creator';
export { TonalPhrasalInflector, TonalInflector } from './dparser/inflector';
export { TonalInserter } from './dparser/inserter';

export { TokenAnalysis } from './token';
export { AlphabeticGrapheme } from './unit';
export { TonalCombiningMorpheme } from './dparser/morpheme';
export { TonalUncombiningMorpheme } from './tonal/morpheme';
export {
  TonalInflectionLexeme,
  TonalAssimilationLexeme,
  TonalInsertionLexeme
} from './dparser/lexeme';
export { TonalLemmatizationLexeme } from './tonal/lexeme';
export {
  PhrasalVerbPhraseme,
  PhrasalVerbVppPhraseme,
  TonalMainParticlePhraseme,
  TonalCompoundPhraseme,
  SerialPhraseme,
  TonalAssimilationPhraseme
} from './dparser/phraseme';
export { KanaUncombiningMorpheme } from './kana/morpheme';
export { TonalWord } from './tonal/lexeme';
export { TonalPhrase } from './tonal/phraseme';

export { Sound, SoundGeneration } from './unit';

export {
  TonalDesinenceInflection,
  TonalCombiningForms
} from './dparser/metaplasm';

export { Prediction } from './tonal/prediction';
