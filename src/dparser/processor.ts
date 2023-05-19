import { DependencyParser } from '../dparser/parser';
import { tag, tokenTagPair } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../document';
import { getFeature } from './feature';
import { inflectedVerbs, inflectedPhrasalVerbParticles } from './rules';
import { Tagset } from './symbols';
import { baseVerbs, basePhrasalVerbParticles } from './dictionary';
import {
  lemmatize,
  lemmatizePhrasalVerbParticle,
} from '../unchange/lemmatizer';
import { TonalLetterTags } from '../tonal/tonalres';
import { extractTones } from '../tonal/tone';

export const getTokens = function (text: string) {
  const tokens: string[] = [];
  if (text) {
    const matchArr = text.match(/\w+/g);
    if (matchArr) {
      matchArr.filter((it) => it != undefined).map((it) => tokens.push(it));
    }
  }
  return tokens;
};

export const getDepRelations = function (nodes: Node[]) {
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

/** Check if the word is in fourth tone or eighth tone. */
function isFourthEighthTone(token: string) {
  const tone = extractTones(token);
  // no inflectional endings, not first tone which has no inflectional ending
  // the fourth or eighth tone has a final

  if (
    tone.getInflectionalEnding().length == 0 &&
    (tone.getAllomorphicEnding().length == 1 ||
      tone.getAllomorphicEnding().length == 2)
  )
    return true;
  return false;
}

/** Check if the word is in fourth tone. */
function isFourthTone(token: string) {
  const tone = extractTones(token);
  // no inflectional endings, not first tone which has no inflectional ending
  // the fourth tone has a final of length 1
  if (
    tone.getInflectionalEnding().length == 0 &&
    tone.getAllomorphicEnding().length == 1
  )
    return true;
  return false;
}

function isFirstCheckedTone(token: string) {
  const tone = extractTones(token);
  // a final plus a first tone letter
  if (
    tone.getInflectionalEnding().length == 1 &&
    tone.getInflectionalEnding() === TonalLetterTags.f &&
    tone.getAllomorphicEnding().length == 2
  )
    return true;
  return false;
}

function isSeventhTone(token: string) {
  const tone = extractTones(token);
  // a seventh tone letter
  if (
    tone.getInflectionalEnding().length == 1 &&
    tone.getInflectionalEnding() === TonalLetterTags.z
  )
    return true;
  return false;
}

function isThirdCheckedTone(token: string) {
  const tone = extractTones(token);
  // a final plus a first tone letter
  if (
    tone.getInflectionalEnding().length == 1 &&
    tone.getInflectionalEnding() === TonalLetterTags.w &&
    tone.getAllomorphicEnding().length == 2
  )
    return true;
  return false;
}

/**
 * Given a multi-word expression, which word should be uninflect to get lemmas.
 * @param expression A multi-word expression
 * @param position Position of a word in a sentence.
 */
function shouldUninflect(expression: MultiWordExpression, position: number) {
  if (position == expression.begin) {
    // main verb
    if (expression.distance > 0) return true;
  } else if (
    position > expression.begin &&
    position == expression.begin + 1 + expression.distance
  ) {
    // 1st particle or 2nd verb
    if (isFourthTone(expression.tokens[1])) return false;
    if (isFirstCheckedTone(expression.tokens[1])) return true;
    if (isThirdCheckedTone(expression.tokens[1])) return true;
  } else if (position > expression.begin && position == expression.end) {
    // 2nd particle, if any
    if (isSeventhTone(expression.tokens[2])) return true;
    if (isFirstCheckedTone(expression.tokens[2])) return true;
  }
  return false;
}

/** Multi-Word Expression. */
class MultiWordExpression {
  /** The begining of an expression in a sentence. */
  begin: number = 0;
  /** The end of an expression in a sentence. */
  end: number = 0;
  /** How far is the preceding word from the separated following words. */
  distance: number = 0;
  /** The constituents of an expression. */
  tokens: string[] = [];
}

function createExpressionLengthTwo(
  begin: number,
  token1: string,
  token2: string
) {
  const obj = new MultiWordExpression();
  obj.begin = begin;
  obj.tokens.push(token1);
  obj.tokens.push(token2);
  return obj;
}

function getMultiWordExpressions(pairs: Array<tokenTagPair>) {
  const expressions: MultiWordExpression[] = [];
  for (let i = 0; i < pairs.length - 1; i++) {
    // phrasal verbs as verb + particle
    if (
      pairs[i][1] === Tagset.vb &&
      pairs[i + 1][1] === Tagset.ppv &&
      ((baseVerbs.includes(pairs[i][0]) &&
        basePhrasalVerbParticles.includes(pairs[i + 1][0])) ||
        (inflectedVerbs.includes(pairs[i][0]) &&
          inflectedPhrasalVerbParticles.includes(pairs[i + 1][0])))
    ) {
      const expr = createExpressionLengthTwo(i, pairs[i][0], pairs[i + 1][0]);
      expr.end = i + 1;
      expressions.push(expr);
      // look ahead for the 2nd particle of a phrasal verb
      if (i + 2 < pairs.length && pairs[i + 2][1] === Tagset.ppv) {
        // can further check if the 2nd particle is inflected
        // push the 2nd particle into tokens array of the last element of the expressions
        expressions[expressions.length - 1].tokens.push(pairs[i + 2][0]);
        expressions[expressions.length - 1].end = i + 2;
      }
    }
  }

  for (let i = 0; i < pairs.length - 2; i++) {
    if (pairs[i][1] === Tagset.vb && pairs[i + 1][1] === Tagset.nn) {
      const exprs: MultiWordExpression[] = [];
      // separable transitive phrasal verb
      // search in the remained tokens. check dictionary for a match
      for (let k = i + 2; k < pairs.length; k++) {
        if (pairs[k][1] === Tagset.ppv) {
          const expr = createExpressionLengthTwo(i, pairs[i][0], pairs[k][0]);
          expr.end = k;
          exprs.push(expr);
          // in the case of length 2, there will be 1 expression in exprs.
          // in the case of length 3, there will be 2 expressions in exprs.
        }
        // look ahead until the end of the sentence
        if (k + 1 == pairs.length && exprs.length == 1) {
          // phrasal verb of length 2
          const popped = exprs.shift();
          if (popped) {
            popped.distance = 1;
            expressions.push(popped);
          }
        } else if (k + 1 == pairs.length && exprs.length == 2) {
          // the 2nd particle is popped out from the tokens array of the 2nd expression
          const secondParticle = exprs[1].tokens.pop();
          // phrasal verb of length 3
          // main verb and 1st particle already in the array
          // we then push the 2nd particle
          if (secondParticle) exprs[0].tokens.push(secondParticle);
          // get the end of the 2nd expression
          const end2nd = exprs[1].end;
          const popped = exprs.shift();
          if (popped) {
            popped.distance = 1;
            // assign the end
            popped.end = end2nd;
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
  pairs: Array<tokenTagPair>,
  expressions: MultiWordExpression[]
) {
  // console.log(pairs, expressions);

  const lemmas: string[] = [];
  let ind: number = 0;

  for (let i = 0; i < pairs.length; i++) {
    if (
      expressions.length > 0 &&
      expressions[ind] &&
      i >= expressions[ind].begin &&
      i <
        expressions[ind].begin +
          expressions[ind].distance +
          expressions[ind].tokens.length
    ) {
      // when the multi-word expression is hit
      if (expressions[ind].begin == i) {
        // the begin of a multi-word expression
        if (pairs[i][1] === Tagset.vb) {
          // to match tone patterns
          lemmas.push(
            isFourthEighthTone(pairs[i][0])
              ? ''
              : lemmatize(pairs[i][0]).getLemmas()[0].literal
          );
        }
      } else if (
        i <
        expressions[ind].begin +
          expressions[ind].distance +
          expressions[ind].tokens.length
      ) {
        // in the middle of a multi-word expression
        if (pairs[i][1] === Tagset.padv)
          lemmas.push(lemmatize(pairs[i][0]).getLemmas()[0].literal);
        else if (pairs[i][1] === Tagset.vb) lemmas.push('');
        else if (pairs[i][1] === Tagset.nn) lemmas.push(pairs[i][0]);
        else if (pairs[i][1] === Tagset.ppv) {
          if (shouldUninflect(expressions[ind], i)) {
            if (
              isThirdCheckedTone(pairs[i][0]) ||
              isFirstCheckedTone(pairs[i][0]) ||
              isSeventhTone(pairs[i][0])
            ) {
              // if tiurhw, laiz, khihf, etc. 1, 3, 7 to 4.
              lemmas.push(
                lemmatizePhrasalVerbParticle(pairs[i][0]).getLemmas()[0].literal
              );
            } else {
              const lemma = lemmatize(pairs[i][0]).getLemmas()[0].literal;
              lemmas.push(lemma);
            }
          } else lemmas.push('');
        }

        if (
          i + 1 ==
          expressions[ind].begin +
            expressions[ind].distance +
            expressions[ind].tokens.length
        ) {
          if (ind < expressions.length) {
            // move indicator to the next expression
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

function convertTokensToNodes(pairs: Array<tokenTagPair>, lemmas: string[]) {
  // convert token-tag pairs to nodes which are used as stack or queue elements
  const nodes = pairs.map((it) => new Node(it[0]));
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

export function depParse(text: string) {
  const tokens = getTokens(text);
  const features = getFeatures(tokens);
  const pairsTokenTag = tag(features);
  const expressions = getMultiWordExpressions(pairsTokenTag);
  const lemmas = getLemmas(pairsTokenTag, expressions);
  const nodes = convertTokensToNodes(pairsTokenTag, lemmas);
  const relations = getDepRelations(nodes);

  const doc = new Document();
  doc.nodes = nodes;
  doc.relations = relations;
  return doc;
}
