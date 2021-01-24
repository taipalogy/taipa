import {
  inflectToProceeding,
  inflectVppToProceeding,
  inflectDesinence,
  inflectPhrasalVerbParticle,
} from '../change/inflector';
import { OrthoPhraseme, VisitorMatching, OrthoCompoundHead } from './visitor';
import {
  baseVerbs,
  phrasalVerbs,
  phrasalVerbsVpp,
  basePhrasalVerbParticles,
  seperateVVCompounds,
  ParticlesPhrasalVerb,
  basePersonalPronouns,
  baseAdverbialParticles,
  ParticlesAdverbial,
} from './dictionary';
import { createCompoundPhraseme } from '../change/creator';
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
    phrasalVerbs
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
    phrasalVerbsVpp
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
    seperateVVCompounds.map(it => {
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
