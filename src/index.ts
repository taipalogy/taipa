// client
export { Client } from './client';

// API
export { TokenAnalysis } from './token';
export { TonalLemmatizationAnalyzer } from './tonal/analyzer';
export { TonalInflectionAnalyzer, PhrasalInflectionAnalyzer } from './dparser/analyzer';
export { KanaAnalyzer } from './kana/analyzer';
export { TonalDesinenceInflection, TransfixInflection, RegressiveAssimilation } from "./dparser/lexeme";
export { TonalCombiningForms, ThirdCombiningForm, AssimilatedFinalForm } from "./dparser/morpheme";
export { Adnominal, Assimilation } from "./dparser/phraseme"