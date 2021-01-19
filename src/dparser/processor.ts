import { DependencyParser } from '../dparser/parser';
import { tag, Pairs } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../document';
import { getFeature, Feature } from './feature';
import { PhrasalVerbs, SeparateCompoundVerbs } from './rules';
import { lemmatize } from '../unchange/lemmatizer';
import { Tagset } from './symbols';
import { TonalWord } from '../unchange/lexeme';
import { baseVerbs, basePhrsalVerbParticles, subsidiaries } from './dictionary';

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
  const expressions = [];
  for (let i = 0; i < pairs.length - 1; i++) {
    // phrasal verbs as verb + particle
    if (
      pairs[i][1] === Tagset.vb &&
      pairs[i + 1][1] === Tagset.ppv &&
      baseVerbs.includes(pairs[i][0]) &&
      basePhrsalVerbParticles.includes(pairs[i + 1][0])
    ) {
      expressions.push(
        createExpressionLengthTwo(i, pairs[i][0], pairs[i + 1][0])
      );
    } else if (
      pairs[i][1] === Tagset.vb &&
      pairs[i + 1][1] === Tagset.psub &&
      baseVerbs.includes(pairs[i][0]) &&
      subsidiaries.includes(pairs[i + 1][0])
    ) {
      // verb + subsidiary
    } else {
      // verb of base form + adverb. mngz guaz
      // verb of proceeding form + terminal form of personal pronoun. chiauykow liw
    }
  }

  for (let j = 0; j < expressions.length - 1; j++) {
    if (expressions[j].index < pairs.length - 2) {
      if (
        pairs[expressions[j].index + 2][1] === Tagset.ppv &&
        basePhrsalVerbParticles.includes(pairs[expressions[j].index + 2][1])
      ) {
        // verb + particle + particle. e.g. thehh khih laih
      } else if (pairs[expressions[j].index + 2][1] === Tagset.psub) {
        // verb + particle + subsidiary. e.g. khuannw tiurh aw
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
      if (pairsTokenTag[i]) doc.nodes[i].tag = pairsTokenTag[i][1];
    }
  }

  doc = getLemmata(doc);
  doc = parseDenpendency(doc);
  return doc;
};
