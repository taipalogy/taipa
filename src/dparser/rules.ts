import {
  KeyWords,
  EncliticElement,
  ConstructionElement,
  VerbElement,
  ParticleElement,
  PersonalPronounElement,
  PronounElement
} from './keywords';
import { POSTags, Tagset } from './symbols';
import { TonalPhrasalInflector } from './inflector';
import { OrthoPhraseme, VisitorMatching } from './visitor';
import {
  dictOfVerbs,
  dictOfPhrasalVerbs,
  dictOfSeperateVVCompounds,
  dictOfPhrasalVerbTwos
} from './dictionary';

export class ConstructionOfPhrase {
  pos: string = '';
  elements: Array<ConstructionElement> = new Array();
  constructor(arr: Array<ConstructionElement>) {
    for (let key in arr) {
      this.elements.push(arr[key]);
    }
  }
}

export class PhrasalVerb extends ConstructionOfPhrase {
  constructor(arr: Array<ConstructionElement>) {
    super(arr);
    this.pos = POSTags.verb;
  }
}

class VerbPhrase extends ConstructionOfPhrase {
  constructor() {
    super([]);
    this.pos = POSTags.verb;
  }
}

class PrepositionalPhrase extends ConstructionOfPhrase {}
class NounPhrase extends ConstructionOfPhrase {}

export class PhrasalVerbWithEnclitic extends VerbPhrase {
  constructor(
    verb: VerbElement,
    particle: ParticleElement,
    enclitic: EncliticElement
  ) {
    super();
    verb.tag = Tagset.vb;
    this.elements.push(verb);
    particle.tag = Tagset.ppv;
    this.elements.push(particle);
    enclitic.tag = Tagset.auxn;
    this.elements.push(enclitic);
  }
}

export class VerbWithEnclitic extends VerbPhrase {
  constructor(verb: VerbElement, enclitic: EncliticElement) {
    super();
    verb.tag = Tagset.vb;
    this.elements.push(verb);
    enclitic.tag = Tagset.auxn;
    this.elements.push(enclitic);
  }
}

export class PhrasalVerbs {
  phvbs: Array<OrthoPhraseme> = new Array();

  constructor() {
    this.populatePhrasemes();
  }

  private populatePhrasemes() {
    const infl = new TonalPhrasalInflector();

    dictOfPhrasalVerbs
      .map(it => infl.inflectToProceeding(it[0], it[1]))
      .map(it => {
        const ol = new OrthoPhraseme();
        ol.base = it.phrase.words[0].literal + ' ' + it.phrase.words[1].literal;
        ol.inflected.push(
          it.getForms()[0].words[0].literal +
            ' ' +
            it.getForms()[0].words[1].literal
        );
        this.phvbs.push(ol);
      });
    dictOfPhrasalVerbTwos
      .map(it => infl.inflectVppToProceeding(it[0], it[1], it[2]))
      .map(it => {
        const ol = new OrthoPhraseme();
        ol.base =
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
    if (arr.length > 0) return arr[0].base;
    return '';
  }
}

class SmallClause extends VerbPhrase {
  constructor(
    verb1: VerbElement,
    pronoun: PersonalPronounElement,
    verb2: VerbElement
  ) {
    super();
    verb1.tag = Tagset.vb;
    this.elements.push(verb1);
    pronoun.tag = Tagset.npr;
    this.elements.push(pronoun);
    verb2.tag = Tagset.vb;
    this.elements.push(verb2);
  }
}

export class SetOfSmallClauses {
  constructions: Array<ConstructionOfPhrase> = [];

  constructor() {
    // obj. xcomp.
    const sc = new SmallClause(
      new VerbElement('oannw'),
      new PersonalPronounElement('goa'),
      new VerbElement('churw')
    );
    this.constructions.push(sc);
  }
}

export class Rules {
  private phrases: Array<ConstructionOfPhrase[]> = new Array();
  private keyWords: KeyWords = new KeyWords();

  constructor() {
    this.populatePatterns();
  }

  private lookupDictionary(str: string) {
    let phr;
    if (dictOfVerbs.includes(str)) {
      let vs: VerbElement = new VerbElement(str);
      if (vs.pos === POSTags.verb) vs.tag = Tagset.vb;
      phr = [new ConstructionOfPhrase([])];
      phr[0].elements.push(vs);
      phr[0].pos = POSTags.verb;
      return phr;
    }

    return undefined;
  }

  private lookupRules(sequence: string[]) {
    const pvbs = new PhrasalVerbs();
    if (
      (sequence.length == 2 && pvbs.match(sequence) != '') ||
      pvbs.match([sequence[0], sequence[1]])
    ) {
      return [
        new PhrasalVerb([
          new VerbElement(sequence[0]),
          new ParticleElement(sequence[1])
        ])
      ];
    }

    if (sequence.length == 3 && pvbs.match(sequence) != '') {
      return [
        new PhrasalVerb([
          new VerbElement(sequence[0]),
          new ParticleElement(sequence[1]),
          new ParticleElement(sequence[2])
        ])
      ];
    }

    if (
      sequence.length > 3 &&
      pvbs.match([sequence[0], sequence[1], sequence[2]]) != ''
    ) {
      return [
        new PhrasalVerb([
          new VerbElement(sequence[0]),
          new ParticleElement(sequence[1]),
          new ParticleElement(sequence[2])
        ])
      ];
    }
    return [];
  }

  matchKeyWords(str: string) {
    const ce1 = this.keyWords.matchWords(str);
    if (ce1.orth.length > 0) {
      return ce1;
    }

    const ce2 = this.keyWords.matchLexemes(str);
    if (ce2.orth.length > 0) {
      return ce2;
    }
  }

  seperateMatches(str: string) {
    const ptcls = dictOfSeperateVVCompounds[str];
    if (ptcls) {
      return ptcls[0];
    }
  }

  matches(sequence: string[]) {
    const phrD = this.lookupDictionary(sequence[0]);
    const phrR = this.lookupRules(sequence);
    if (phrR && phrR.length > 0) return phrR;
    else if (phrD) return phrD;
    return undefined;
  }

  private populatePatterns() {
    this.phrases.push([new SetOfSmallClauses().constructions[0]]);
  }
}
