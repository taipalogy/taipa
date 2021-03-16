import { TonalLemmatizationLexeme } from './unchange/lexeme';
import { checkNumberOfLetterTonal, getTaiKanaBlocks } from './tonal/init';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';

import { getKanaBlocks, checkNumberOfLettersKana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { kanaLemmatizationAnalyzer } from './kana/analyzer';
import { Word, PositionalLetter } from './unit';
import { TonalUncombiningForms } from './unchange/metaplasm';

export class TokenAnalysis {
  /** Analyzed token. */
  word: Word = new Word();
  /** Base forms of the word. */
  lemmas: Array<Word> = new Array();
  /** Inflectional suffix. */
  inflectionalEnding: string = '';
  /** positional letter sequences. */
  letterSequences: Array<PositionalLetter[]> = new Array();
  /** Syllabic block or syllabogram sequences. */
  blockSequences: string[] = [];
  /** Uncombining form sequences. */
  uncombiningSequences: Array<string[]> = new Array(); // uncombining form sequences
}

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
        ta.letterSequences.push(m.letters);
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
      const morphemes = tla.morphAnalyze(str, new TonalUncombiningForms([]));
      const lexeme: TonalLemmatizationLexeme = tla.lexAnalyze(morphemes);
      ta.word = lexeme.word;
      ta.lemmas = lexeme.getLemmas();
      ta.inflectionalEnding = lexeme.getInflectionalEnding();

      ta.blockSequences = getTaiKanaBlocks(morphemes);

      for (let m of morphemes) {
        ta.letterSequences.push(m.letters);
        // TODO: first free tone to fourth. first checked tone to eighth
        ta.uncombiningSequences.push(m.getForms().map(it => it.literal));
      }
    }

    return ta;
  }
}
