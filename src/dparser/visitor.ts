import { Visitor, OrthoElement } from '../interface';

/** Concrete visitor. */
export class VisitorMatching implements Visitor {
  /**
   * Matches the phrase to the forms of a phraseme.
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
   * Matches the word to the forms of a lexeme.
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
   * Matches the word to the form.
   * @param orth A container of a form.
   * @param word The word to be matched.
   */
  visitWord(orth: OrthoWord, word: string) {
    if (word === orth.form) return true;
    return false;
  }

  /**
   * Match a head to the head of the compound.
   * @param compound A compound.
   * @param head A head to be matched with the head of the compound.
   */
  visitCompoundHead(compound: OrthoCompoundHead, head: string) {
    if (head === compound.form.split(' ')[0]) return true;
    return false;
  }
}

/** Orthographic phraseme. */
export class OrthoPhraseme implements OrthoElement {
  /** A base form that inflected forms or assimilated forms are based on. */
  form: string = '';
  inflected: string[] = [];
  assimilated: string[] = [];

  accept(visitor: Visitor, words: string[]): boolean {
    return visitor.visitPhraseme(this, words.join(' '));
  }
}

/** Orthographic lexeme. */
export class OrthoLexeme implements OrthoElement {
  /** A base form that inflected forms or assimilated forms are based on. */
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

/** Orthographic compound whose head will be used to match another head. */
export class OrthoCompoundHead implements OrthoElement {
  /** Compound as a phrase of length 2. */
  form: string = '';

  /**
   * Accepts a visitor and the head of a compound.
   * @param visitor A visitor.
   * @param head Head of a compound.
   */
  accept(visitor: Visitor, head: string): boolean {
    return visitor.visitCompoundHead(this, head);
  }
}
