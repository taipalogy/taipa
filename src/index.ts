// client
export { Client } from './client';

// API
export {
  tonalLemmatizationAnalyzer,
  graphAnalyzeTonal,
} from './unchange/analyzer';
export { tonalInflectionAnalyzer } from './change/analyzer';
export { kanaLemmatizationAnalyzer, graphAnalyzeKana } from './kana/analyzer';
export { graphAnalyzeHangul } from './hangul/analyzer';
export { GraphemeMaker } from './unit';
export {
  lowerLettersTonal,
  TonalLetterTags,
  TonalSoundTags,
} from './tonal/version2';
export { KanaLetterTags } from './kana/kana';
export { lemmatize } from './unchange/lemmatizer';
export {
  createTonalPhrase,
  createTonalInflectionLexeme,
  createCompoundPhraseme,
} from './change/creator';
export {
  inflectDesinence,
  inflectTransfix,
  inflectEncliticE,
  inflectPhrasalVerbParticle,
  inflectEncliticLe,
  inflectPossesiveEx,
  inflectTo,
  inflectEighthToFirst,
  inflectEighthToSecond,
  inflectToProceeding,
  inflectVppToProceeding,
  inflectVppToTransitive,
  inflectEToAdnominal,
  inflectLeToConjunctive,
  inflectPossesive,
  inflectToParticiple,
  inflectVppToParticiple,
  inflectSerial,
} from './change/inflector';
export { insertToFollowingSyllable } from './change/inserter';
export { mutateFinalConsonantOfPrecedingSyllable } from './change/mutator';

export { TokenAnalysis } from './client';
export { AlphabeticGrapheme } from './unit';
export { TonalCombiningMorpheme } from './change/morpheme';
export { TonalUncombiningMorpheme } from './unchange/morpheme';
export { TonalInflectionLexeme, TonalInsertionLexeme } from './change/lexeme';
export { TonalLemmatizationLexeme } from './unchange/lexeme';
export {
  PhrasalVerbPhraseme,
  PhrasalVerbVppPhraseme,
  TonalMainParticlePhraseme,
  TonalCompoundPhraseme,
  SerialPhraseme,
} from './change/phraseme';
export { KanaUncombiningMorpheme } from './kana/morpheme';
export { TonalWord, TonalPhrase } from './unchange/unit';

export { Sound, PositionalSoundGeneration } from './unit';
export {
  initialConsonantsTonal,
  nasalizationsTonal,
  vowelsTonal,
} from './tonal/version2';

export {
  TonalDesinenceInflection,
  TonalCombiningForms,
} from './change/metaplasm';

export { predict } from './tonal/prediction';

export { syllableCompositions } from './tonal/soundgen';

export { getLatinSyllableCompositions } from './tonal/tokenizer';

export {
  LexicalTone,
  extractTones,
  getToneEndingNumber,
  getToneEndingNumbersTwo,
  getToneEndingNumbersThree,
} from './tonal/tone';
