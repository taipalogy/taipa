import { POSTags } from './symbols';
import { createTonalInflectionLexeme } from './creator';
import { TonalCombiningForms } from './metaplasm';
import { OrthoLexeme, OrthorWord, VisitorMatching } from './visitor';

export class ConstructionElement {
  orth: string = '';
  pos: string = '';
  tag: string = '';
}

export class PersonalPronounElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.orth = str;
    this.pos = POSTags.pronoun;
  }
}

export class VerbElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.orth = str;
    this.pos = POSTags.verb;
  }
}

export class EncliticElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.pos = POSTags.particle;
    this.orth = str;
  }
}

export class PronounElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.pos = POSTags.pronoun;
    this.orth = str;
  }
}

class NounElement extends ConstructionElement {
  constructor() {
    super();
    this.pos = POSTags.noun;
  }
}

export class ParticleElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.pos = POSTags.particle;
    this.orth = str;
  }
}

export class PrepositionElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.pos = POSTags.adposition;
    this.orth = str;
  }
}

export class AuxiliaryElement extends ConstructionElement {
  constructor(str: string) {
    super();
    this.pos = POSTags.auxiliary;
    this.orth = str;
  }
}

export class KeyWords {
  words: Array<[OrthorWord, ConstructionElement]> = new Array();
  lexemes: Array<[OrthoLexeme, ConstructionElement]> = new Array();

  constructor() {
    this.populateWords();
    this.populateLexemes();
  }

  private createWord(orth: string, pos: POSTags) {
    const w1 = new OrthorWord();
    w1.base = orth;
    const ce1 = new ConstructionElement();
    ce1.orth = orth;
    ce1.pos = pos;
    this.words.push([w1, ce1]);
  }

  private populateWords() {
    this.createWord('qaz', POSTags.auxiliary);
    this.createWord('che', POSTags.pronoun);
  }

  private createLexeme(orth: string, pos: POSTags) {
    const lx1 = new OrthoLexeme();
    lx1.base = orth;
    const ilx1 = createTonalInflectionLexeme(
      lx1.base,
      new TonalCombiningForms()
    );
    lx1.inflected.push(ilx1.getForms()[0].literal);
    const ce1 = new ConstructionElement();
    ce1.orth = orth;
    ce1.pos = pos;
    this.lexemes.push([lx1, ce1]);
  }

  private populateLexemes() {
    this.createLexeme('goay', POSTags.pronoun);
    this.createLexeme('longy', POSTags.particle);
    this.createLexeme('bez', POSTags.particle);
  }

  matchLexemes(word: string) {
    const v = new VisitorMatching();
    const arr = this.lexemes.filter(it => it[0].accept(v, word));
    if (arr.length > 0) {
      const ce = new ConstructionElement();
      ce.orth = word;
      ce.pos = arr[0][1].pos;
      return ce;
    }
    return new ConstructionElement();
  }

  matchWords(word: string) {
    const v = new VisitorMatching();
    const arr = this.words.filter(it => it[0].accept(v, word));
    if (arr.length > 0) {
      return arr[0][1];
    }
    return new ConstructionElement();
  }
}
