import { DependencyParser } from '../dparser/parser';
import { tag, Pairs } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../document';
import { getFeature, Feature } from './feature';
import {
  PhrasalVerbs,
  SeparateCompoundVerbs,
  inflectedVerbs,
  inflectedPhrasalVerbParticles,
} from './rules';
import { lemmatize } from '../unchange/lemmatizer';
import { Tagset } from './symbols';
import { TonalWord } from '../unchange/lexeme';
import {
  baseVerbs,
  basePhrasalVerbParticles,
  subsidiariesA,
  subsidiariesPersonalPronoun,
  subsidiariesLe,
  subsidiariesE,
} from './dictionary';

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

export const parseDenpendency = function (doc: Document) {
  const pa = new DependencyParser();
  return pa.parse(doc);
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
          if (popped) expressions.push(popped);
        } else if (k + 1 == pairs.length && exprs.length == 2) {
          const secondParticle = exprs[1].tokens.pop();
          // phrasal verb of length 3
          // main verb and 1st particle already in the array
          // we then push the 2nd particle
          if (secondParticle) exprs[0].tokens.push(secondParticle);
          const popped = exprs.shift();
          if (popped) expressions.push(popped);
        }
      }
    } else if (pairs[i][1] === Tagset.vb && pairs[i + 1][1] === Tagset.padv) {
      for (let k = i + 2; k < pairs.length; k++) {
        // look ahead
        if (pairs[k][1] === Tagset.vb) {
          // separate verb
          expressions.push(
            createExpressionLengthTwo(i, pairs[i][0], pairs[k][0])
          );
        } else if (pairs[k][1] === Tagset.ppv) {
          // separable phrasal verb
          expressions.push(
            createExpressionLengthTwo(i, pairs[i][0], pairs[k][0])
          );
        }
      }
    }
  }

  return expressions;
}

function getLemma(token: string) {
  const lemmas = lemmatize(token).getLemmas();
  if (lemmas.length > 0) return lemmas[0].literal;
  return '';
}

function getLemmata(doc: Document): Document {
  const phrvbs = new PhrasalVerbs();
  const scvbs = new SeparateCompoundVerbs();
  let expecting: string = '';

  for (let i = 0; i < doc.nodes.length; i++) {
    if (doc.nodes[i].token === 'che' || doc.nodes[i].token === 'he') {
      doc.nodes[i].lemma = doc.nodes[i].token;
      continue; // defective
    }

    if (doc.nodes[i].tag === Tagset.psub || doc.nodes[i].tag === Tagset.aux) {
      doc.nodes[i].lemma = doc.nodes[i].token;
      continue;
    }

    if (doc.nodes[i].tag === Tagset.vb && i + 1 < doc.nodes.length) {
      if (i + 2 < doc.nodes.length && doc.nodes[i + 2].tag === Tagset.ppv) {
        // phrasal verbs of length 3

        const base = phrvbs.match([
          doc.nodes[i].token,
          doc.nodes[i + 1].token,
          doc.nodes[i + 2].token,
        ]);
        if (base != '') {
          const lemmas = base.split(' ');
          doc.nodes[i].lemma = lemmas[0];
          doc.nodes[i + 1].lemma = lemmas[1];
          doc.nodes[i + 2].lemma = lemmas[2];
          i++;
        }
        continue;
      } else if (doc.nodes[i + 1].tag === Tagset.ppv) {
        // phrasal verbs of length 2

        const base = phrvbs.match([doc.nodes[i].token, doc.nodes[i + 1].token]);
        if (base != '') {
          const lemmas = base.split(' ');
          doc.nodes[i].lemma = lemmas[0];
          doc.nodes[i + 1].lemma = lemmas[1];
          i++;
        }
        continue;
      } else {
        expecting = scvbs.matchHead(doc.nodes[i].token);
        doc.nodes[i].lemma = getLemma(doc.nodes[i].token);
        continue;
      }
    }
    if (doc.nodes[i].tag === Tagset.vb) {
      if (i + 1 < doc.nodes.length && doc.nodes[i + 1].tag === Tagset.psub) {
        doc.nodes[i].lemma = doc.nodes[i].token; // copy the base form
        continue;
      } else if (expecting) {
        doc.nodes[i].lemma = doc.nodes[i].token; // copy the base form
        expecting = '';
        continue;
      }
    }

    let lemmas: TonalWord[] = [];
    lemmas = lemmatize(doc.nodes[i].token).getLemmas();
    if (lemmas.length > 0) doc.nodes[i].lemma = lemmas[0].literal;
  }
  return doc;
}

function getLemmas(
  pairs: Pairs<string, string>,
  expressions: MultiWordExpression[]
) {
  // console.log(pairs, expressions);
  return [];
}

export const processor = function process(text: string) {
  const tokens = getTokens(text);
  const features = getFeatures(tokens);
  const pairsTokenTag = tag(features);
  const expressions = getMultiWordExpressions(pairsTokenTag);
  const lemmas = getLemmas(pairsTokenTag, expressions);

  let doc = new Document();
  // convert token-tag pairs to nodes which are used as stack or queue elements
  doc.nodes = tokens.map(it => new Node(it));
  if (pairsTokenTag) {
    for (let i = 0; i < pairsTokenTag.length; i++) {
      if (doc.nodes.length === pairsTokenTag.length && pairsTokenTag[i])
        doc.nodes[i].tag = pairsTokenTag[i][1];
    }
  }

  doc = getLemmata(doc);
  doc = parseDenpendency(doc);
  return doc;
};
