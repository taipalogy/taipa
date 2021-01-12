import { ConstructionElement } from './keywords';
import {
  inflectToProceeding,
  inflectVppToProceeding,
} from '../change/inflector';
import { OrthoPhraseme, VisitorMatching } from './visitor';
import {
  dictOfVerbs,
  dictOfPhrasalVerbs,
  dictOfPhrasalVerbTwos,
  dictOfSubsidiaries,
  AdverbialParticlesInflected,
  dictOfPhrsalVerbParticles,
  dictOfAuxiliaries,
} from './dictionary';
import { Pairs } from './tagger';
import { PhrasalVerbPhraseme } from '../change/phraseme';

export const isPadvLongy = function (nextToken: string, nextToken2: string) {
  if (
    dictOfVerbs.includes(nextToken) &&
    dictOfSubsidiaries.includes(nextToken2)
  ) {
    return true;
  }
  return false;
};

export const isVb = function (
  pairs: Pairs<string, string>,
  prvToken: string,
  nextToken: string
) {
  if (
    pairs.length == 1 &&
    pairs[pairs.length - 1][0] === AdverbialParticlesInflected.longy &&
    dictOfSubsidiaries.includes(nextToken)
  ) {
    return true;
  } else if (dictOfPhrsalVerbParticles.includes(nextToken)) {
    return true;
  } else if (dictOfSubsidiaries.includes(nextToken)) {
    return true;
  } else if (dictOfAuxiliaries.includes(prvToken)) {
    return true;
  }
  return false;
};

function matchInflectedPhrasalVerb(
  token1: string,
  token2: string,
  phrasemes: PhrasalVerbPhraseme[]
) {
  if (
    phrasemes.filter(it => it.getForms()[0].words[0].literal === token1)
      .length > 0 &&
    phrasemes.filter(it => it.getForms()[0].words[1].literal === token2)
      .length > 0
  )
    return true;
  return false;
}

/**
 * Check if the token is the main verb of a phrasal verb
 * @param token Main verb
 * @param nextToken Particle
 */
export function isMainVerbOfPhrasalVerbInflected(
  token: string,
  nextToken: string
) {
  const phs = dictOfPhrasalVerbs.map(it => inflectToProceeding(it[0], it[1]));
  if (matchInflectedPhrasalVerb(token, nextToken, phs)) {
    return true;
  }
  return false;
}

/**
 * Check if the token is the particle of a phrasal verb
 * @param token Particle
 * @param prvToken Main verb
 */
export function isParticleOfPhrasalVerbInflected(
  token: string,
  prvToken: string
) {
  const phs = dictOfPhrasalVerbs.map(it => inflectToProceeding(it[0], it[1]));
  if (matchInflectedPhrasalVerb(prvToken, token, phs)) {
    return true;
  }
  return false;
}

/** Construction of a phrase. */
export class ConstructionOfPhrase {
  /** Part-of-speech of this phrase. */
  pos: string = '';
  /** Construction elements of this phrase. */
  elements: Array<ConstructionElement> = new Array();
  constructor(arr: Array<ConstructionElement>) {
    for (let key in arr) {
      this.elements.push(arr[key]);
    }
  }
}

export class PhrasalVerbs {
  phvbs: Array<OrthoPhraseme> = new Array();

  constructor() {
    this.populatePhrasemes();
  }

  private populatePhrasemes() {
    dictOfPhrasalVerbs
      .map(it => inflectToProceeding(it[0], it[1]))
      .map(it => {
        const ol = new OrthoPhraseme();
        ol.form = it.phrase.words[0].literal + ' ' + it.phrase.words[1].literal;
        ol.inflected.push(
          it.getForms()[0].words[0].literal +
            ' ' +
            it.getForms()[0].words[1].literal
        );
        this.phvbs.push(ol);
      });
    dictOfPhrasalVerbTwos
      .map(it => inflectVppToProceeding(it[0], it[1], it[2]))
      .map(it => {
        const ol = new OrthoPhraseme();
        ol.form =
          it.phrase.words[0].literal +
          ' ' +
          it.phrase.words[1].literal +
          ' ' +
          it.phrase.words[2].literal;
        ol.inflected.push(
          it.getForms()[0].words[0].literal +
            ' ' +
            it.getForms()[0].words[1].literal +
            ' ' +
            it.getForms()[0].words[2].literal
        );
        this.phvbs.push(ol);
      });
  }

  match(sequence: string[]) {
    // match any form, return the base one
    const v = new VisitorMatching();
    const arr = this.phvbs.filter(it => it.accept(v, sequence));
    if (arr.length > 0) return arr[0].form;
    return '';
  }
}
