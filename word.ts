
//-----------------------------------------------------------------------------
//  Part of Speech
//-----------------------------------------------------------------------------

export enum PartOfSpeech {
  Noun = 1,
  Verb,
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
    //this.partOfSpeech = 0;
  }

  isOriginal() {
    return this.currentTone === this.baseTone;
  }

  getBaseTone() {
    return this.baseTone;
  }
}
