import { TonalLemmatizationLexeme } from './tonal/lexeme';
import { checkNumberOfLetterTonal } from './tonal/init';
import { tonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { getKanaBlocks, checkNumberOfLettersKana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { kanaLemmatizationAnalyzer } from './kana/analyzer';

import { TokenAnalysis } from './token';

export class Client {
  processKana(str: string): TokenAnalysis {
    checkNumberOfLettersKana();
    // kana
    let ta: TokenAnalysis = new TokenAnalysis();
    if (str) {
      const ka = kanaLemmatizationAnalyzer;
      const morphemes: KanaUncombiningMorpheme[] = ka.morphAnalyze(str);
      ta.blockSequences = getKanaBlocks(morphemes);

      for (let m of morphemes) {
        ta.soundSequences.push(m.sounds);
      }
    }

    return ta;
  }

  processTonal(str: string): TokenAnalysis {
    checkNumberOfLetterTonal();
    // tonal lurzmafjiz
    let ta: TokenAnalysis = new TokenAnalysis();
    if (str) {
      const tla = tonalLemmatizationAnalyzer;
      const morphemes: TonalUncombiningMorpheme[] = tla.morphAnalyze(str);
      const lexeme: TonalLemmatizationLexeme = tla.lexAnalyze(morphemes);
      ta.word = lexeme.word;
      ta.lemmas = lexeme.getLemmas();
      ta.inflectionalEnding = lexeme.getInflectionalEnding();

      for (let m of morphemes) {
        ta.soundSequences.push(m.sounds);
        // TODO: first free tone to fourth. first checked tone to eighth
        ta.uncombiningSequences.push(m.getForms().map(it => it.literal));
      }
    }

    return ta;
  }
}
