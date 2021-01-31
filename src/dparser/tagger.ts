import {
  isPhrasalVerbVp,
  isPhrasalVerbVpp,
  inflectedPhrasalVerbParticles,
  inflectedVerbs,
  inflectedAdverbialParticles,
  inflectedPersonalPronouns,
  proceedingAdverbialParticles,
} from './rules';
import { Tagset } from './symbols';
import { Feature } from './feature';
import {
  baseVerbs,
  subsidiariesA,
  basePhrasalVerbParticles,
  demonstrativePronouns,
  auxiliaries,
  seperateVVCompounds,
} from './dictionary';
import { lemmatize } from '../unchange/lemmatizer';

type Pair<T, K> = [T, K];
export type Pairs<T, K> = Pair<T, K>[];

export function tag(features: Feature[]) {
  const pairs: Pairs<string, string> = [];
  let expecting: string = '';
  for (let i = 0; i < features.length; i++) {
    if (
      proceedingAdverbialParticles.long === features[i].token &&
      baseVerbs.includes(features[i].nextToken) &&
      subsidiariesA.includes(features[i].nextToken2)
    ) {
      pairs.push([features[i].token, Tagset.padv]);
      continue;
    }

    if (inflectedAdverbialParticles.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.padv]);
      continue;
    }

    if (inflectedPhrasalVerbParticles.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      baseVerbs.includes(features[i].token) &&
      pairs.length == 1 &&
      inflectedAdverbialParticles.includes(pairs[pairs.length - 1][0]) &&
      subsidiariesA.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      baseVerbs.includes(features[i].token) &&
      auxiliaries.includes(features[i].prevToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      baseVerbs.includes(features[i].token) &&
      subsidiariesA.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      baseVerbs.includes(features[i].token) &&
      basePhrasalVerbParticles.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      baseVerbs.includes(features[i].token) &&
      inflectedPhrasalVerbParticles.includes(features[i].prevToken) &&
      inflectedPhrasalVerbParticles.includes(features[i].prevToken2)
    ) {
      // a verb after a preceding phrasal verb
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      lemmatize(features[i].token).getLemmas().length == 3 &&
      baseVerbs.includes(lemmatize(features[i].token).getLemmas()[2].literal) &&
      !basePhrasalVerbParticles.includes(features[i].nextToken) && // object of the verb
      (basePhrasalVerbParticles.includes(features[i].nextToken2) ||
        inflectedPhrasalVerbParticles.includes(features[i].nextToken2))
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      (basePhrasalVerbParticles.includes(features[i].token) ||
        inflectedPhrasalVerbParticles.includes(features[i].token)) &&
      features[i].prevToken &&
      pairs[pairs.length - 1][1] === Tagset.nn &&
      features[i].prevToken2 &&
      pairs[pairs.length - 2][1] === Tagset.vb
    ) {
      // we may also check if the next token is a phrasal verb particle
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      basePhrasalVerbParticles.includes(features[i].token) &&
      features[i].prevToken &&
      pairs[pairs.length - 1][1] === Tagset.ppv &&
      features[i].prevToken2 &&
      pairs[pairs.length - 2][1] === Tagset.nn
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      features[i].nextToken &&
      isPhrasalVerbVp(features[i].token, features[i].nextToken)
    ) {
      // is main verb of phrasal verb
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      inflectedPhrasalVerbParticles.includes(features[i].token) &&
      inflectedPhrasalVerbParticles.includes(features[i].prevToken)
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      subsidiariesA.includes(features[i].token) &&
      baseVerbs.includes(features[i].prevToken)
    ) {
      // to check the tone pattern. to check if last word
      pairs.push([features[i].token, Tagset.psub]);
      continue;
    }

    if (
      subsidiariesA.includes(features[i].token) &&
      basePhrasalVerbParticles.includes(features[i].prevToken) &&
      baseVerbs.includes(features[i].prevToken2)
    ) {
      // to check the tone pattern. to check if last word
      pairs.push([features[i].token, Tagset.psub]);
      continue;
    }

    if (inflectedPersonalPronouns.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.npr]);
      continue;
    }

    if (
      features[i].prevToken &&
      isPhrasalVerbVp(features[i].prevToken, features[i].token)
    ) {
      // is a particle of phrasal verb
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      features[i].prevToken &&
      features[i].prevToken2 &&
      isPhrasalVerbVpp(
        features[i].prevToken2,
        features[i].prevToken,
        features[i].token
      )
    ) {
      // is the 2nd particle of phrasal verb
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      inflectedVerbs.includes(features[i].token) &&
      features[i].nextToken &&
      inflectedPhrasalVerbParticles.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      inflectedPhrasalVerbParticles.includes(features[i].token) &&
      features[i].nextToken &&
      inflectedPhrasalVerbParticles.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      inflectedVerbs.includes(features[i].token) &&
      features[i].nextToken &&
      inflectedPhrasalVerbParticles.includes(features[i].nextToken2)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      inflectedPhrasalVerbParticles.includes(features[i].token) &&
      features[i].prevToken &&
      inflectedVerbs.includes(features[i].prevToken)
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (demonstrativePronouns.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.npr]);
      continue;
    }

    if (auxiliaries.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.aux]);
      continue;
    }

    if (seperateVVCompounds.map(it => it[0]).includes(features[i].token)) {
      // the first word of a VV compound
      expecting = seperateVVCompounds.filter(
        it => it[0] === features[i].token
      )[0][1];
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      seperateVVCompounds.map(it => it[1]).includes(expecting) &&
      features[i].token === expecting
    ) {
      // the second word of a VV compound
      expecting = '';
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    pairs.push([features[i].token, Tagset.nn]);
  }
  return pairs;
}
