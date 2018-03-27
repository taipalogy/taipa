import { MorphemeValidator } from './morphemevalidator';
import { MorphologicalAnalyzerRegex, ToneSandhiMorpheme, ToneSandhiMorphologicalAnalyzer } from './morphologicalanalyzer';
import { lexicon } from './lexicon';

//-----------------------------------------------------------------------------
//  Constituent
//-----------------------------------------------------------------------------

export class Constituent {

}

//------------------------------------------------------------------------------
//  Part of Speech
//------------------------------------------------------------------------------

export enum PartOfSpeech {
  Unknown = 0,
  Noun = 1,
  Verb = 2,
}

//------------------------------------------------------------------------------
//  Factory Method Design Pattern
//------------------------------------------------------------------------------

interface WordAbstractFactory {
}

export class WordFactory implements WordAbstractFactory {

  w: Word;

  getWord(s: string) {
    let mv = new MorphemeValidator(s);
    if(mv.validate()) {
      let l = lexicon.getLexeme(s);
      console.log(l);
      if(l.partOfSpeech == PartOfSpeech.Noun) {
        this.w = new ToneSandhiNoun(s);
      } else if(l.partOfSpeech == PartOfSpeech.Verb) {
        this.w = new ToneSandhiVerb(s);
      }
      console.log("a word created by the factory%s:%s", s, this.w.literal);
      return this.w;
    }
  }
}

//------------------------------------------------------------------------------
//  Interpreter Pattern
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Constituents
//------------------------------------------------------------------------------

export class Word extends Constituent {
  partOfSpeech: PartOfSpeech;

  // left and right must be promoted to Word class
  // left and right are for tree traversal
  // it is in fact there are no left and right on ToneSandhiNoun
  left: Word;
  right: Word;

  literal: string;

  constructor() {
    super();
    this.partOfSpeech = PartOfSpeech.Unknown;
    this.literal = null;
  }

  isOriginal() {}
}

export class InflectionWord {
  lemma: string; // uninflected form
  forms: string; // inflected forms.
  // inflectional rules
}

export class AgglutinationWord {
  plainForm: string;
  forms: string;
}

export class ToneSandhiWord extends Word {
  baseTone: string;
  sandhiTone: string;
  literal: string;

  private currentTone: string;

  context: {};
  payload: Array<string>;
  
  constructor(w: string) {
    super();
    this.literal = w;
    console.log("ToneSandhiWord:%s", this.literal);
    this.left = null;
    this.right = null;
    this.payload = new Array();
  }

  getLiteral() {
    return this.literal;
  }

  evaluate(context) {
    console.log("ToneSandhiWord evaluation, literal:%s", this.literal);
    console.log("end of evaluation");
    return true;
  }

  getBaseTone() {
    return this.baseTone;
  }

  isOriginal() {
    return this.currentTone === this.baseTone;
  }
}

export class ToneSandhiNoun extends ToneSandhiWord {
  literal: string;
  
  constructor(s) {
    super(s);
    this.literal = s;
    this.partOfSpeech = PartOfSpeech.Noun;
    this.left = null;
    this.right = null;
    console.log("%cliteral:%s", "color: purple; font-size: large", s);
  }

  getBaseTone() {
    return this.literal;
  }
}

export class ToneSandhiVerb extends ToneSandhiWord {

  constructor(s) {
    super(s);
    this.literal = s;
    this.partOfSpeech = PartOfSpeech.Verb;   
    console.log("%cliteral:%s", "color: purple; font-size: large", s);
  }
  process() {}
}