import { DependencyParser } from '../dparser/parser';
import { tag, Pairs } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../document';
import { getFeature } from './feature';
import { inflectedVerbs, inflectedPhrasalVerbParticles } from './rules';
import { Tagset } from './symbols';
import { baseVerbs, basePhrasalVerbParticles } from './dictionary';
import { lemmatize } from '../unchange/lemmatizer';

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

export const parseDenpendency = function (nodes: Node[]) {
  const pa = new DependencyParser();
  return pa.parse(nodes);
};

function getFeatures(tokens: string[]) {
  const features = [];
  for (let i = 0; i < tokens.length; i++) {
    features.push(getFeature(tokens[i], i, tokens));
  }
  return features;
}

class MultiWordExpression {
  index: number = 0;
  distance: number = 0;
  tokens: string[] = [];
}

function createExpressionLengthTwo(
  index: number,
  token1: string,
  token2: string
) {
  const obj = new MultiWordExpression();
  obj.index = index;
  obj.tokens.push(token1);
  obj.tokens.push(token2);
  return obj;
}

function getMultiWordExpressions(pairs: Pairs<string, string>) {
  const expressions: MultiWordExpression[] = [];
  for (let i = 0; i < pairs.length - 1; i++) {
    const exprs: MultiWordExpression[] = []; // expecting only one element
    // phrasal verbs as verb + particle
    if (
      pairs[i][1] === Tagset.vb &&
      pairs[i + 1][1] === Tagset.ppv &&
      ((baseVerbs.includes(pairs[i][0]) &&
        basePhrasalVerbParticles.includes(pairs[i + 1][0])) ||
        (inflectedVerbs.includes(pairs[i][0]) &&
          inflectedPhrasalVerbParticles.includes(pairs[i + 1][0])))
    ) {
      expressions.push(
        createExpressionLengthTwo(i, pairs[i][0], pairs[i + 1][0])
      );
      // look ahead for the 2nd particle of a phrasal verb
      if (i + 2 < pairs.length && pairs[i + 2][1] === Tagset.ppv) {
        // can further check if the 2nd particle is inflected
        // push the 2nd particle into tokens array of the last element of the expressions
        expressions[expressions.length - 1].tokens.push(pairs[i + 2][0]);
      }
    }
  }

  for (let i = 0; i < pairs.length - 2; i++) {
    if (pairs[i][1] === Tagset.vb && pairs[i + 1][1] === Tagset.nn) {
      const exprs: MultiWordExpression[] = [];
      // separable transitive phrasal verb
      // search in the remained tokens. check dictionary for a match
      for (let k = i + 2; k < pairs.length; k++) {
        // look ahead
        if (pairs[k][1] === Tagset.ppv) {
          exprs.push(createExpressionLengthTwo(i, pairs[i][0], pairs[k][0]));
        }
        if (k + 1 == pairs.length && exprs.length == 1) {
          // phrasal verb of length 2
          const popped = exprs.shift();
          if (popped) {
            popped.distance = 1;
            expressions.push(popped);
          }
        } else if (k + 1 == pairs.length && exprs.length == 2) {
          const secondParticle = exprs[1].tokens.pop();
          // phrasal verb of length 3
          // main verb and 1st particle already in the array
          // we then push the 2nd particle
          if (secondParticle) exprs[0].tokens.push(secondParticle);
          const popped = exprs.shift();
          if (popped) {
            popped.distance = 1;
            expressions.push(popped);
          }
        }
      }
    } else if (pairs[i][1] === Tagset.vb && pairs[i + 1][1] === Tagset.padv) {
      for (let k = i + 2; k < pairs.length; k++) {
        // look ahead
        if (pairs[k][1] === Tagset.vb) {
          // separate verb
          const expr = createExpressionLengthTwo(i, pairs[i][0], pairs[k][0]);
          expr.distance = 1;
          expressions.push(expr);
        } else if (pairs[k][1] === Tagset.ppv) {
          // separable phrasal verb
          const expr = createExpressionLengthTwo(i, pairs[i][0], pairs[k][0]);
          expr.distance = 1;
          expressions.push(expr);
        }
      }
    }
  }

  return expressions;
}

function getLemmas(
  pairs: Pairs<string, string>,
  expressions: MultiWordExpression[]
) {
  // console.log(pairs, expressions);

  const lemmas: string[] = [];
  let ind: number = 0;

  for (let i = 0; i < pairs.length; i++) {
    if (
      expressions.length > 0 &&
      expressions[ind] &&
      i >= expressions[ind].index &&
      i <
        expressions[ind].index +
          expressions[ind].distance +
          expressions[ind].tokens.length
    ) {
      // when the multi-word expression is hit
      if (expressions[ind].index == i) {
        // the begin of a multi-word expression
        if (pairs[i][1] === Tagset.vb) {
          lemmas.push(lemmatize(pairs[i][0]).getLemmas()[0].literal);
        }
      } else if (
        i <
        expressions[ind].index +
          expressions[ind].distance +
          expressions[ind].tokens.length
      ) {
        // in the middle of a multi-word expression
        if (pairs[i][1] === Tagset.padv)
          lemmas.push(lemmatize(pairs[i][0]).getLemmas()[0].literal);
        else if (pairs[i][1] === Tagset.vb) lemmas.push(pairs[i][0]);
        else if (pairs[i][1] === Tagset.nn) lemmas.push(pairs[i][0]);
        else if (pairs[i][1] === Tagset.ppv) lemmas.push('');

        if (
          i + 1 ==
          expressions[ind].index +
            expressions[ind].distance +
            expressions[ind].tokens.length
        ) {
          if (ind < expressions.length) {
            ind++;
          }
        }
      }
    } else {
      lemmas.push('');
    }
  }
  // console.log(lemmas, lemmas.length);
  return lemmas;
}

function convertTokensToNodes(
  tokens: string[],
  pairs: Pairs<string, string>,
  lemmas: string[]
) {
  // convert token-tag pairs to nodes which are used as stack or queue elements
  const nodes = tokens.map(it => new Node(it));
  if (pairs) {
    for (let i = 0; i < pairs.length; i++) {
      if (nodes.length === pairs.length && pairs[i]) {
        nodes[i].tag = pairs[i][1];
        nodes[i].lemma = lemmas[i];
      }
    }
  }
  return nodes;
}

export function nlp(text: string) {
  const tokens = getTokens(text);
  const features = getFeatures(tokens);
  const pairsTokenTag = tag(features);
  const expressions = getMultiWordExpressions(pairsTokenTag);
  const lemmas = getLemmas(pairsTokenTag, expressions);
  const nodes = convertTokensToNodes(tokens, pairsTokenTag, lemmas);
  const relations = parseDenpendency(nodes);

  const doc = new Document();
  doc.nodes = nodes;
  doc.relations = relations;
  return doc;
}
