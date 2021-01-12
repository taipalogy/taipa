import { DependencyParser } from '../dparser/parser';
import { tag } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../token';
import { TokenLemma } from '../token';
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

export const getLemmas = function (doc: Document) {
  const lm = new TokenLemma();
  return lm.getTonalLemmas(doc);
};

export const parseDenpendency = function (doc: Document) {
  const pa = new DependencyParser();
  return pa.parse(doc);
};

export const processor = function process(text: string) {
  const tokens = getTokens(text);

  let docTwo = new Document();
  docTwo.nodes = tokens.map(it => new Node(it));

  const features = [];
  for (let i = 0; i < tokens.length; i++) {
    features.push(getFeature(tokens[i], i, tokens));
  }
  const pairs = tag(features);

  if (pairs) {
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i]) docTwo.nodes[i].tag = pairs[i][1];
    }
  }

  docTwo = getLemmas(docTwo);
  docTwo = parseDenpendency(docTwo);
  return docTwo;
};
