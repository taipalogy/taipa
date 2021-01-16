import {
  inflectToProceeding,
  inflectVppToProceeding,
} from '../change/inflector';
import { OrthoPhraseme, VisitorMatching, OrthoCompoundHead } from './visitor';
import {
  dictOfVerbs,
  dictOfPhrasalVerbs,
  dictOfPhrasalVerbsVpp,
  dictOfSubsidiaries,
  dictOfPhrsalVerbParticles,
  dictOfSeperateVVCompounds,
  phrasalVerbParticlesInflected,
} from './dictionary';
import { PhrasalVerbPhraseme } from '../change/phraseme';
import { createCompoundPhraseme } from '../change/creator';

export const isPadvLongy = function (nextToken: string, nextToken2: string) {
  if (
    dictOfVerbs.includes(nextToken) &&
    dictOfSubsidiaries.includes(nextToken2)
  ) {
    return true;
  }
  return false;
};

export function isPhrassalVerbParticleKhih(token: string) {
  if (phrasalVerbParticlesInflected.khih === token) return true;
  if (token === 'khih') return true;
  return false;
}

export function isPhrasalVerbVp(token1: string, token2: string) {
  if (
    dictOfVerbs.includes(token1) &&
    dictOfPhrsalVerbParticles.includes(token2)
  )
    return true;
  return false;
}

export function isPhrasalVerbVpp(
  token1: string,
  token2: string,
  token3: string
) {
  if (
    dictOfVerbs.includes(token1) &&
    dictOfPhrsalVerbParticles.includes(token2) &&
    dictOfPhrsalVerbParticles.includes(token3)
  )
    return true;
  return false;
}

function isInflectedPhrasalVerb(
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
 * @param token1 Main verb
 * @param token2 Particle
 */
export function isMainVerbOfPhrasalVerbInflected(
  token1: string,
  token2: string
) {
  const phs = dictOfPhrasalVerbs.map(it => inflectToProceeding(it[0], it[1]));
  if (isInflectedPhrasalVerb(token1, token2, phs)) {
    return true;
  }
  return false;
}

/**
 * Check if the token is the particle of a phrasal verb
 * @param token1 Main verb
 * @param token2 Particle
 */
export function isParticleOfPhrasalVerbInflected(
  token1: string,
  token2: string
) {
  const phs = dictOfPhrasalVerbs.map(it => inflectToProceeding(it[0], it[1]));
  if (isInflectedPhrasalVerb(token1, token2, phs)) {
    return true;
  }
  return false;
}

/** Construction element. */
export class ConstructionElement {
  /** Orthographic text. */
  orth: string = '';
  /** The simple part-of-speech tag. */
  pos: string = '';
  /** The detailed part-of-speech tag. */
  tag: string = '';
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
    dictOfPhrasalVerbsVpp
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

export class SeparateCompoundVerbs {
  compounds: Array<OrthoPhraseme> = new Array();

  constructor() {
    this.populatePhrasemes();
  }

  private populatePhrasemes() {
    dictOfSeperateVVCompounds.map(it => {
      const oe = new OrthoPhraseme();
      oe.form = it[0] + ' ' + it[1];
      oe.inflected.push(createCompoundPhraseme(it[0], it[1]).phrase.literal);
      this.compounds.push(oe);
    });
  }

  matchHead(head: string) {
    const v = new VisitorMatching();
    const arr = this.compounds
      .map(it => {
        const oe = new OrthoCompoundHead();
        // assign the inflected form to oe
        oe.form = it.inflected[0];
        return oe;
      })
      .filter(it => it.accept(v, head));
    if (arr.length > 0 && arr[0]) return arr[0].form.split(' ')[1];
    return '';
  }
}
