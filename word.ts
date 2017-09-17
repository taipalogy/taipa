
//-----------------------------------------------------------------------------
//  Part of Speech
//-----------------------------------------------------------------------------

export enum PartOfSpeech {
  Unknown = 0,
  Noun = 1,
  Verb,
}

export interface IWord {
  partOfSpeech: PartOfSpeech;
}

export class Lexeme implements IWord {
  partOfSpeech: PartOfSpeech;

  constructor() {
    this.partOfSpeech = PartOfSpeech.Unknown;
  }
}

export class ToneSandhiLexeme extends Lexeme {
  private stem: string;
  private boundMorphemes: string;
}