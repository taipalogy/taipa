import { DependencyParser } from '../dparser/parser';
import { tag } from '../dparser/tagger';

import { Document } from '../document';
import { Node } from '../document';
import { getFeature } from './feature';
import { PhrasalVerbs, SeparateCompoundVerbs } from './rules';
import { lemmatize } from '../unchange/lemmatizer';
import { Tagset } from './symbols';
import { TonalWord } from '../unchange/lexeme';

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

function getFeatures(tokens: string[]) {
  const features = [];
  for (let i = 0; i < tokens.length; i++) {
    features.push(getFeature(tokens[i], i, tokens));
  }
  return features;
}

export class TokenLemma {
  private getLemma(token: string) {
    const lemmas = lemmatize(token).getLemmas();
    if (lemmas.length > 0) return lemmas[0].literal;
    return '';
  }

  getTonalLemmas(doc: Document): Document {
    const phrvbs = new PhrasalVerbs();
    const scvbs = new SeparateCompoundVerbs();
    let expecting: string = '';
    let j: number = 0;
    let k: number = 0;
    let len: number = 0;

    for (let i = 0; i < doc.nodes.length; i++) {
      if (len == i) {
        // loop over the doc.phrases sequence
        if (j < doc.phrases.length) {
          len += doc.phrases[j].elements.length;
          if (j + 1 < doc.phrases.length) j++;
          k = 0;
        }
      } else {
        k++;
      }

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

          const base = phrvbs.match([
            doc.nodes[i].token,
            doc.nodes[i + 1].token,
          ]);
          if (base != '') {
            const lemmas = base.split(' ');
            doc.nodes[i].lemma = lemmas[0];
            doc.nodes[i + 1].lemma = lemmas[1];
            i++;
          }
          continue;
        } else {
          expecting = scvbs.matchHead(doc.nodes[i].token);
          doc.nodes[i].lemma = this.getLemma(doc.nodes[i].token);
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
      if (doc.phrases[j] && k + 1 == doc.phrases[j].elements.length) {
        // at the end of a phrase
        // need to further check if the phrase is a compound noun or verb phrase
        doc.nodes[i].lemma = doc.nodes[i].token; // copy the base form
        continue;
      }

      let lemmas: TonalWord[] = [];
      lemmas = lemmatize(doc.nodes[i].token).getLemmas();
      if (lemmas.length > 0) doc.nodes[i].lemma = lemmas[0].literal;
    }
    return doc;
  }
}

export const processor = function process(text: string) {
  const tokens = getTokens(text);
  const features = getFeatures(tokens);
  const pairsTokenTag = tag(features);

  let docTwo = new Document();
  docTwo.nodes = tokens.map(it => new Node(it));

  if (pairsTokenTag) {
    // convert token-tag pairs to nodes as stack or queue elements
    for (let i = 0; i < pairsTokenTag.length; i++) {
      if (pairsTokenTag[i]) docTwo.nodes[i].tag = pairsTokenTag[i][1];
    }
  }

  docTwo = getLemmas(docTwo);
  docTwo = parseDenpendency(docTwo);
  return docTwo;
};
