// client
export { Client } from './client';

// API
export { TokenAnalysis } from './token';
export { TonalLemmatizationAnalyzer } from './tonal/analyzer';
export { TonalInflectionAnalyzer } from './dparser/analyzer';
export { KanaLemmatizationAnalyzer } from './kana/analyzer';
export { AlphabeticGrapheme, GraphemeMaker, Sound, SoundGeneration } from './grapheme';
export { lexicalRoots } from './tonal/lexicalroots2';
export { lowerLettersTonal, TonalLetterTags } from './tonal/version2';
export { TonalLemmatizer } from './tonal/lemmatizer';
export { TonalAssimilator } from './dparser/assimilator';
export { TonalPhrasalInflector, TonalInflector } from './dparser/inflector';
export { Prediction } from './tonal/prediction';
export { TonalInserter } from './dparser/inserter';
export { KanaLetterTags } from './kana/kana';

export { TonalInflectionLexeme } from './dparser/lexeme';
export { TonalCombiningMorpheme } from './dparser/morpheme';
export { PhrasalVerbPhraseme } from './dparser/phraseme';
