import { MorphemeValidator } from './morphemevalidator';
import { Regex } from './morpheme';
import { ToneSandhiMorphemeAnalyzer } from './morpheme';

//------------------------------------------------------------------------------
//  Part of Speech
//------------------------------------------------------------------------------

export enum PartOfSpeech {
  Unknown = 0,
  Noun = 1,
  Verb,
}

//------------------------------------------------------------------------------
//  IWord
//------------------------------------------------------------------------------

export interface IWord {
  partOfSpeech: PartOfSpeech;
  literal: string;
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
      this.w = new ToneSandhiNoun(s);
      console.log("a word created by the factory%s:%s", s, this.w.literal);
      return this.w;
    }
  }
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word implements IWord {
  partOfSpeech: PartOfSpeech;

  //private stem: string;
  //private boundMorphemes: string;

  // left and right must be promoted to Word class
  // left and right are for tree traversal
  // it is in fact there are no left and right on ToneSandhiNoun
  left: Word;
  right: Word;

  literal: string;

  constructor() {
    this.partOfSpeech = PartOfSpeech.Unknown;
    this.literal = null;
  }

  isOriginal() {}
}

export class InflectionWord {
  lemma: string; // uninflected form
  forms: string; // inflected forms. stems
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

  objects: any;
  
  constructor(w: string) {
    super();
    this.literal = w;
    console.log("ToneSandhiWord:%s", this.literal);
    this.left = null;
    this.right = null;
  }

  getLiteral() {
    return this.literal;
  }

  evaluate(context) {
    console.log("ToneSandhiWord evaluation, literal:%s", this.literal);
    let aa = new ToneSandhiMorphemeAnalyzer(this.literal);
    let a = aa.analyze();
    console.log("I have %d affixes", a.length);
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

//-----------------------------------------------------------------------------
//  Wrapper for Abstract Syntax Tree
//-----------------------------------------------------------------------------

export class AstWrapper {
  ast: ToneSandhiWord;
  literal: string;
  counter: number;
  constructor(ast) {
    this.ast = ast;
    this.counter = 0;
    this.literal = "";
    this.printPreorder(this.ast);
  }

  printPreorder(e: Word) {

    if(e == null) {
      return;
    }

    this.counter++;
    this.literal = this.literal + "-" + e.literal;
    console.log("literal%d:%s", this.counter, e.literal);
    
    this.printPreorder(e.left);
    this.printPreorder(e.right);
  }

  evaluate(context) {
    console.log("AstWrapper evaluation");
    this.ast.evaluate(context);
  }
}

export class Series extends AstWrapper {
  constructor(ast) {
    super(ast);
  }
}

export class Group extends AstWrapper {
  constructor(ast) {
    super(ast);
  }
}
