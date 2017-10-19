import { MorphemeValidator } from './morphemevalidator';
import { Regex } from './morpheme';
import { ToneSandhiAffix, ToneSandhiMorphemeAnalyzer } from './morpheme';
import { Widget } from './widget';
import { lexicon } from './lexicon';

//------------------------------------------------------------------------------
//  Part of Speech
//------------------------------------------------------------------------------

export enum PartOfSpeech {
  Unknown = 0,
  Noun = 1,
  Verb = 2,
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
    let ma = new ToneSandhiMorphemeAnalyzer(this.literal);
    let a: Array<ToneSandhiAffix> = ma.analyze();
    console.log("I have %d affixes", a.length);
    console.log(a);
    let aRight: ToneSandhiAffix, aLeft: ToneSandhiAffix;
    for(let i = 0 ; i < a.length ; i++) {
      if(i == 0) {
        aRight = a.pop();
      } else if(i == 1) {
        aLeft = a.pop();
        let obj = this.addProperty(aLeft.getObject(), aRight.getObject().name);
        console.log(obj);
        if(Object.prototype.hasOwnProperty.call(obj, aRight.getObject().name)) {
          obj[aRight.getObject().name] = aRight.getObject().getFunktion();
          let tmp  = obj[aRight.getObject().name](aLeft.getObject().getContextualSemantics());
          console.log("a property added" + tmp);
          return tmp;
        }
      }

    }
  }

  addProperty(w: Widget, prop: string) {
    w[prop] = null;
    return w;    
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
    this.literal = ""; // todo: get the literals from the ast.
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
