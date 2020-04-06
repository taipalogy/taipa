import { TonalLemmatizationLexeme } from './tonal/lexeme';
import { checkNumberOfLetterTonal } from './tonal/init';
import { tonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { getKanaBlocks, checkNumberOfLettersKana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { kanaLemmatizationAnalyzer } from './kana/analyzer';

import { DependencyParser } from './dparser/parser';
import { RuleBasedTagger } from './dparser/tagger';

import { Document } from './document';
import { Token, TokenAnalysis } from './token';
import { TokenLemmaLookup } from './token';

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

export const tokenizeSpace = function (text: string) {
  const tokens: Token[] = [];
  if (text) {
    const matchArr = text.match(/\w+/g);
    if (matchArr) {
      matchArr
        .filter(it => it != undefined)
        .map(it => tokens.push(new Token(it)));
    }
  }
  return tokens;
};

export const tokenizePre = function (preTokenized: string[]) {
  const tokens: Token[] = [];
  if (preTokenized && preTokenized.length > 0) {
    preTokenized
      .filter(it => it != undefined)
      .map(it => tokens.push(new Token(it)));
  }
  return tokens;
};

export const tagRuleBased = function (doc: Document) {
  const tgr = new RuleBasedTagger();
  return tgr.tag(doc);
};

export const lemmaLookup = function (doc: Document) {
  const lm = new TokenLemmaLookup();
  return lm.getTonalLemmas(doc);
};

export const parseDenpendency = function (doc: Document) {
  const pa = new DependencyParser();
  return pa.parse(doc);
};

export const processor = function process(text: string) {
  const tokens = tokenizeSpace(text);
  let docTwo = new Document();
  docTwo.tokens = tokens;
  docTwo = tagRuleBased(docTwo);
  docTwo = lemmaLookup(docTwo);
  docTwo = parseDenpendency(docTwo);
  return docTwo;
};
