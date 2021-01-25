import {
  inflectDesinence,
  inflectPhrasalVerbParticle,
} from '../change/inflector';
import {
  baseVerbs,
  basePhrasalVerbParticles,
  ParticlesPhrasalVerb,
  basePersonalPronouns,
  baseAdverbialParticles,
  ParticlesAdverbial,
} from './dictionary';
import { TonalLetterTags } from '../tonal/version2';

export function isPhrasalVerbVp(token1: string, token2: string) {
  if (baseVerbs.includes(token1) && basePhrasalVerbParticles.includes(token2))
    return true;
  return false;
}

export function isPhrasalVerbVpp(
  token1: string,
  token2: string,
  token3: string
) {
  if (
    baseVerbs.includes(token1) &&
    basePhrasalVerbParticles.includes(token2) &&
    basePhrasalVerbParticles.includes(token3)
  )
    return true;
  return false;
}

export const inflectedVerbs = baseVerbs.map(
  // get the first element of the returned array
  it => inflectDesinence(it).getForms()[0].literal
);

export const inflectedPhrasalVerbParticles = basePhrasalVerbParticles.map(it =>
  it === ParticlesPhrasalVerb.cut
    ? inflectPhrasalVerbParticle(
        ParticlesPhrasalVerb.cut,
        TonalLetterTags.f
      ).getForms()[0].literal
    : it === ParticlesPhrasalVerb.khih
    ? inflectPhrasalVerbParticle(
        ParticlesPhrasalVerb.khih,
        TonalLetterTags.f
      ).getForms()[0].literal
    : it === ParticlesPhrasalVerb.laih
    ? inflectPhrasalVerbParticle(
        ParticlesPhrasalVerb.laih,
        TonalLetterTags.z
      ).getForms()[0].literal
    : it === ParticlesPhrasalVerb.tiurh
    ? inflectPhrasalVerbParticle(
        ParticlesPhrasalVerb.tiurh,
        TonalLetterTags.w
      ).getForms()[0].literal
    : ''
);

export const inflectedPersonalPronouns = basePersonalPronouns.map(
  it => inflectDesinence(it).getForms()[0].literal
);

export const inflectedAdverbialParticle = {
  long: inflectDesinence(ParticlesAdverbial.longy.toString()).getForms()[0]
    .literal,
};

export const inflectedAdverbialParticles = baseAdverbialParticles.map(
  it => inflectDesinence(it).getForms()[0].literal
);
