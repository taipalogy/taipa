//-----------------------------------------------------------------------------
//  Case
//-----------------------------------------------------------------------------
  
export class Case {
  public static readonly SUBJECT: 3;
  public static readonly OBJECT: 4;
}

//-----------------------------------------------------------------------------
//  Part of Speech
//-----------------------------------------------------------------------------
  
export class PartOfSpeech {
  public static readonly NOUN: 1;
  public static readonly VERB: 2;
}


export interface IWord {
  partOfSpeech: PartOfSpeech;
}

export class Lexeme {
  lemma: string; // uninflected form
  forms: string; // inflected forms. stems
  // inflectional rules
}

export class Form {
  plainForm: string;
  forms: string;
}

export class ToneSandhi implements IWord {
  partOfSpeech: PartOfSpeech;
  baseTone: string;
  private sandhiTone: string;

  private currentTone: string;

  private stem: string;
  private boundMorphemes: string;

  constructor() {
    this.partOfSpeech = 0;
  }

  isOriginal() {
    return this.currentTone === this.baseTone;
  }

  getBaseTone() {
    return this.baseTone;
  }
}
