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
} from './dictionary';

type Pair<T, K> = [T, K];
export type Pairs<T, K> = Pair<T, K>[];

export function tag(features: Feature[]) {
  const pairs: Pairs<string, string> = [];
  for (let i = 0; i < features.length; i++) {
    if (
      features[i].token === AdverbialParticlesInflected.longy &&
      isPadvLongy(features[i].nextToken, features[i].nextToken2)
    ) {
      pairs.push([features[i].token, Tagset.padv]);
    }

    if (dictOfVerbs.includes(features[i].token)) {
      if (isVb(pairs, features[i].prevToken, features[i].nextToken))
        pairs.push([features[i].token, Tagset.vb]);
    }

    if (
      dictOfSubsidiaries.includes(features[i].token) &&
      dictOfVerbs.includes(features[i].prevToken)
    ) {
      // to check the tone pattern. to check if last word
      pairs.push([features[i].token, Tagset.psub]);
    }

    if (
      dictOfSubsidiaries.includes(features[i].token) &&
      dictOfVerbs.includes(features[i].prevToken2) &&
      dictOfPhrsalVerbParticles.includes(features[i].prevToken)
    ) {
      // to check the tone pattern. to check if last word
      pairs.push([features[i].token, Tagset.psub]);
    }

    if (features[i].token === PersonalPronounInflected.guay) {
      pairs.push([features[i].token, Tagset.npr]);
    }

    if (
      dictOfPhrsalVerbParticles.includes(features[i].token) &&
      dictOfVerbs.includes(features[i].prevToken)
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
    }

    if (
      isMainVerbOfPhrasalVerbInflected(features[i].token, features[i].nextToken)
    ) {
      pairs.push([features[i].token, Tagset.vb]);
    }

    if (
      isParticleOfPhrasalVerbInflected(features[i].token, features[i].prevToken)
    ) {
      pairs.push([features[i].token, Tagset.ppv]);
    }

    if (dictOfDemonstrativePronoun.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.npr]);
    }

    if (dictOfAuxiliaries.includes(features[i].token)) {
      pairs.push([features[i].token, Tagset.aux]);
    }
  }
  return pairs;
}
