import {
  isPadvLongy,
  isVb,
  isMainVerbOfPhrasalVerbInflected,
  isParticleOfPhrasalVerbInflected,
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
} from './dictionary';
import { inflectDesinence } from '../change/inflector';

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

    if (dictOfVerbs.includes(features[i].token)) {
      if (isVb(pairs, features[i].prevToken, features[i].nextToken))
        pairs.push([features[i].token, Tagset.vb]);
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
      dictOfVerbs.includes(features[i].prevToken2) &&
      dictOfPhrsalVerbParticles.includes(features[i].prevToken)
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
      dictOfPhrsalVerbParticles.includes(features[i].token) &&
      dictOfVerbs.includes(features[i].prevToken)
    ) {
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
      isParticleOfPhrasalVerbInflected(features[i].token, features[i].prevToken)
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
  }
  return pairs;
}
