import { Phrase } from './phraseme';
import { Word } from './lexeme';
import { OrthoPhraseme, OrthoLexeme, OrthoWord } from './dparser/visitor';

export interface OrthographyFactory {
  createPhrase?(): Phrase;
  createWord?(): Word;
}

/** Orthographic element visitor interface. */
export interface Visitor {
  visitPhraseme(phraseme: OrthoPhraseme, phrase: string): boolean;
  visitLexeme(lexeme: OrthoLexeme, word: string): boolean;
  visitWord(orth: OrthoWord, word: string): boolean;
}

/** Orthographic element interface. */
export interface OrthoElement {
  form: string;

  accept(visitor: Visitor, arg: any): boolean;
}

export abstract class Metaplasm {}
