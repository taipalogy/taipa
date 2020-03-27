import { Visitor, OrthoElement } from '../interface';

/** Concrete visitor. */
export class VisitorMatching implements Visitor {
  /**
   * Match the phrase to the forms of a phraseme.
   * @param phraseme A container of phrase forms.
   * @param phrase The phrase to be matched.
   */
  visitPhraseme(phraseme: OrthoPhraseme, phrase: string) {
    if (phrase === phraseme.form) return true;
    if (phraseme.inflected.filter(it => it === phrase).length > 0) return true;
    if (phraseme.assimilated.filter(it => it === phrase).length > 0)
      return true;
    return false;
  }

  /**
   * Match the word to the forms of a lexeme.
   * @param lexeme A container of word forms.
   * @param word The word to be matched.
   */
  visitLexeme(lexeme: OrthoLexeme, word: string) {
    // match a form of a lexeme
    if (word === lexeme.form) return true;
    if (lexeme.inflected.filter(it => it === word).length > 0) return true;
    if (lexeme.assimilated.filter(it => it === word).length > 0) return true;
    return false;
  }

  /**
   * Match the word to the form.
   * @param orth A container of a form.
   * @param word The word to be matched.
   */
  visitWord(orth: OrthoWord, word: string) {
    if (word === orth.form) return true;
    return false;
  }
}

/** Orthographic phraseme. */
export class OrthoPhraseme implements OrthoElement {
  /** Base form. */
  form: string = '';
  inflected: string[] = [];
  assimilated: string[] = [];

  accept(visitor: Visitor, words: string[]): boolean {
    return visitor.visitPhraseme(this, words.join(' '));
  }
}

/** Orthographic lexeme. */
export class OrthoLexeme implements OrthoElement {
  /** Base form. */
  form: string = '';
  inflected: string[] = [];
  assimilated: string[] = [];

  accept(visitor: Visitor, word: string): boolean {
    return visitor.visitLexeme(this, word);
  }
}

/** Orthographic word. */
export class OrthoWord implements OrthoElement {
  /** A word form. */
  form: string = '';

  accept(visitor: Visitor, word: string): boolean {
    return visitor.visitWord(this, word);
  }
}
