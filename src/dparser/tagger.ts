import {
  isPadvLongy,
  isMainVerbOfPhrasalVerbInflected,
  isParticleOfPhrasalVerbInflected,
  isPhrassalVerbParticleKhih,
  isPhrasalVerbVp,
  isPhrasalVerbVpp,
} from './rules';
import { Tagset } from './symbols';
import { Feature } from './feature';
import {
  AdverbialParticlesInflected,
  dictOfVerbs,
  dictOfSubsidiaries,
  PersonalPronounInflected,
  dictOfPhrsalVerbParticles,
  dictOfDemonstrativePronoun,
  dictOfAuxiliaries,
  dictOfSeperateVVCompounds,
  phrasalVerbParticlesInflected,
} from './dictionary';
import { inflectDesinence } from '../change/inflector';
import { lemmatize } from '../unchange/lemmatizer';

type Pair<T, K> = [T, K];
export type Pairs<T, K> = Pair<T, K>[];

export function tag(features: Feature[]) {
  const pairs: Pairs<string, string> = [];
  let expecting: string = '';
  for (let i = 0; i < features.length; i++) {
    if (
      features[i].token === AdverbialParticlesInflected.longy &&
      isPadvLongy(features[i].nextToken, features[i].nextToken2)
    ) {
      pairs.push([features[i].token, Tagset.padv]);
      continue;
    }

    if (features[i].token === AdverbialParticlesInflected.bez) {
      pairs.push([features[i].token, Tagset.padv]);
      continue;
    }

    if (
      dictOfVerbs.includes(features[i].token) &&
      pairs.length == 1 &&
      pairs[pairs.length - 1][0] === AdverbialParticlesInflected.longy &&
      dictOfSubsidiaries.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      dictOfVerbs.includes(features[i].token) &&
      dictOfAuxiliaries.includes(features[i].prevToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      dictOfVerbs.includes(features[i].token) &&
      dictOfSubsidiaries.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      dictOfVerbs.includes(features[i].token) &&
      dictOfPhrsalVerbParticles.includes(features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      dictOfVerbs.includes(features[i].token) &&
      phrasalVerbParticlesInflected.laih === features[i].prevToken &&
      phrasalVerbParticlesInflected.khih === features[i].prevToken2
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      lemmatize(features[i].token).getLemmas().length == 3 &&
      dictOfVerbs.includes(
        lemmatize(features[i].token).getLemmas()[2].literal
      ) &&
      !dictOfPhrsalVerbParticles.includes(features[i].nextToken) && // object of the verb
      isPhrassalVerbParticleKhih(features[i].nextToken2)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      isPhrassalVerbParticleKhih(features[i].token) &&
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
      dictOfPhrsalVerbParticles.includes(features[i].token) &&
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
      phrasalVerbParticlesInflected.laih === features[i].token &&
      phrasalVerbParticlesInflected.khih === features[i].prevToken
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (
      dictOfSubsidiaries.includes(features[i].token) &&
      dictOfVerbs.includes(features[i].prevToken)
    ) {
      // to check the tone pattern. to check if last word
      pairs.push([features[i].token, Tagset.psub]);
      continue;
    }

    if (
      dictOfSubsidiaries.includes(features[i].token) &&
      dictOfPhrsalVerbParticles.includes(features[i].prevToken) &&
      dictOfVerbs.includes(features[i].prevToken2)
    ) {
      // to check the tone pattern. to check if last word
      pairs.push([features[i].token, Tagset.psub]);
      continue;
    }

    if (features[i].token === PersonalPronounInflected.guay) {
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
      isMainVerbOfPhrasalVerbInflected(features[i].token, features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (
      isParticleOfPhrasalVerbInflected(features[i].prevToken, features[i].token)
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
      continue;
    }

    if (dictOfDemonstrativePronoun.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.npr]);
      continue;
    }

    if (dictOfAuxiliaries.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.aux]);
      continue;
    }

    if (
      dictOfSeperateVVCompounds
        .map(it => inflectDesinence(it[0]).getForms()[0].literal)
        .includes(features[i].token)
    ) {
      // the first word of a VV compound
      expecting = 'kuew';
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    if (expecting === 'kuew' && features[i].token === 'kuew') {
      // the second word of a VV compound
      expecting = '';
      pairs.push([features[i].token, Tagset.vb]);
      continue;
    }

    pairs.push([features[i].token, Tagset.nn]);
  }
  return pairs;
}
