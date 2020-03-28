import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { TonalInsertionLexeme } from './lexeme';
import { Epenthesis } from './metaplasm';

/** Insert an initial m, n, or ng to morpheme ay if the preceding morpheme has a final m, n, or ng. */
export class TonalInserter {
  private readonly tschmm = new TonalSoundChangingMorphemeMaker();
  private readonly gm = new GraphemeMaker(lowerLettersTonal);

  private morphAnalyze(str: string) {
    const gs = this.gm.makeGraphemes(str);
    const mrphs = this.tschmm.makeMorphemes(gs);
    return mrphs;
  }

  /**
   *  Create a `TonalInsertionLexeme`. The word has at least 2 syllables for the second one to be inserted an initial.
   * @param word a word whose second syllable is ay, a, or af.
   */
  insertTo(word: string) {
    const mrphs = this.morphAnalyze(word);
    // TODO: add initial g. b? l?
    const lx = new TonalInsertionLexeme(mrphs, new Epenthesis());

    return lx;
  }
}

// TODO: other insertion functions?
