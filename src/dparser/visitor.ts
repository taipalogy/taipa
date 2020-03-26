/** Orthographic element visitor interface. */
interface Visitor {
  visitPhraseme(phraseme: OrthoPhraseme, phrase: string): boolean;
  visitLexeme(lexeme: OrthoLexeme, word: string): boolean;
  visitWord(keyword: OrthorWord, word: string): boolean;
}

/** Concrete visitor. */
export class VisitorMatching implements Visitor {
  /**
   * Match a form of a phraseme.
   * @param phraseme Forms of a phrase.
   * @param words Phrase to be matched.
   */
  visitPhraseme(phraseme: OrthoPhraseme, phrase: string) {
    if (phrase === phraseme.base) return true;
    if (phraseme.inflected.filter(it => it === phrase).length > 0) return true;
    if (phraseme.assimilated.filter(it => it === phrase).length > 0)
      return true;
    return false;
  }

  visitLexeme(lexeme: OrthoLexeme, word: string) {
    // match a form of a lexeme
    if (word === lexeme.base) return true;
    if (lexeme.inflected.filter(it => it === word).length > 0) return true;
    if (lexeme.assimilated.filter(it => it === word).length > 0) return true;
    return false;
  }

  visitWord(keyword: OrthorWord, word: string) {
    if (word === keyword.base) return true;
    return false;
  }
}

/** Orthographic element interface. */
interface OrthoElement {
  base: string;

  accept(visitor: Visitor, arg: any): boolean;
}

/** Orthographic phraseme. */
export class OrthoPhraseme implements OrthoElement {
  base: string = '';
  inflected: string[] = [];
  assimilated: string[] = [];

  accept(visitor: Visitor, words: string[]): boolean {
    return visitor.visitPhraseme(this, words.join(' '));
  }
}

/** Orthographic lexeme. */
export class OrthoLexeme implements OrthoElement {
  base: string = '';
  inflected: string[] = [];
  assimilated: string[] = [];

  accept(visitor: Visitor, word: string): boolean {
    return visitor.visitLexeme(this, word);
  }
}

/** Orthographic word. */
export class OrthorWord implements OrthoElement {
  base: string = '';

  accept(visitor: Visitor, word: string): boolean {
    return visitor.visitWord(this, word);
  }
}
