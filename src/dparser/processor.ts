import { DependencyParser } from '../dparser/parser';
import { RuleBasedTagger, tag } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../token';
import { TokenLemmaLookup } from '../token';
import { getFeature } from './feature';

export const getTokens = function (text: string) {
  const tokens: string[] = [];
  if (text) {
    const matchArr = text.match(/\w+/g);
    if (matchArr) {
      matchArr.filter(it => it != undefined).map(it => tokens.push(it));
    }
  }
  return tokens;
};

export const tokenizeSpace = function (text: string) {
  const tokens: Node[] = [];
  if (text) {
    const matchArr = text.match(/\w+/g);
    if (matchArr) {
      matchArr
        .filter(it => it != undefined)
        .map(it => tokens.push(new Node(it)));
    }
  }
  return tokens;
};

export const tokenizePre = function (preTokenized: string[]) {
  const tokens: Node[] = [];
  if (preTokenized && preTokenized.length > 0) {
    preTokenized
      .filter(it => it != undefined)
      .map(it => tokens.push(new Node(it)));
  }
  return tokens;
};

export const tagRuleBased = function (doc: Document) {
  const tgr = new RuleBasedTagger();
  return tgr.tag(doc);
};

export const getLemmas = function (doc: Document) {
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
  docTwo.nodes = tokens;
  //---------------------------------

  /*
  const tokens = getTokens(text);

  let docTwo = new Document();
  docTwo.nodes = tokens.map(it => new Node(it));

  const features = [];
  for (let i = 0; i < tokens.length; i++) {
    features.push(getFeature(tokens[i], i, tokens));
  }
  const pairs = tag(features);

  console.log(pairs);
  if (pairs) {
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i]) docTwo.nodes[i].tag = pairs[i][1];
    }
  }
*/
  docTwo = tagRuleBased(docTwo);
  docTwo = getLemmas(docTwo);
  docTwo = parseDenpendency(docTwo);
  return docTwo;
};
