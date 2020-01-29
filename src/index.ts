// client
export { Client } from './client';

// API
export { TokenAnalysis } from './token';
export { TonalLemmatizationAnalyzer } from './tonal/analyzer';
export { TonalInflectionAnalyzer, TonalPhrasalInflector } from './dparser/analyzer';
export { KanaLemmatizationAnalyzer } from './kana/analyzer';
export { TonalDesinenceInflection, TransfixInflection } from './dparser/lexeme';
export { TonalCombiningForms, ThirdCombiningForm } from './dparser/morpheme';
export { Adnominal } from './dparser/phraseme';
export { Sound } from './grapheme';

// TODO: to be removed
export { AssimilatedFinalForm } from './dparser/morpheme';
export { RegressiveAssimilation } from './dparser/lexeme';
export { Assimilation } from './dparser/phraseme';
