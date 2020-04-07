import { DependencyParser } from '../dparser/parser';
import { RuleBasedTagger } from '../dparser/tagger';

import { Document } from '../document';
import { Token } from '../token';
import { TokenLemmaLookup } from '../token';

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
