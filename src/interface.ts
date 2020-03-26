import { Phrase } from './phraseme';
import { Word } from './lexeme';
import { OrthoPhraseme, OrthoLexeme, OrthorWord } from './dparser/visitor';

export interface OrthographyFactory {
  createPhrase?(): Phrase;
  createWord?(): Word;
}

/** Orthographic element visitor interface. */
export interface Visitor {
  visitPhraseme(phraseme: OrthoPhraseme, phrase: string): boolean;
  visitLexeme(lexeme: OrthoLexeme, word: string): boolean;
  visitWord(keyword: OrthorWord, word: string): boolean;
}

/** Orthographic element interface. */
export interface OrthoElement {
  base: string;

  accept(visitor: Visitor, arg: any): boolean;
}

export abstract class Metaplasm {}
