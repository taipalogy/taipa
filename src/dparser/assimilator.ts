import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalZeroAssimilation } from '../metaplasm';
import { TonalAssimilationLexeme } from './lexeme';
import { TonalAssimilationPhrasemeMaker } from './phraseme';
import {
  AgressiveInternal,
  RegressiveInternal,
  RegressiveExternal,
  AgressiveExternal
} from './metaplasm';

/** Assimilation inside a word. */
export class TonalAssimilator {
  private readonly tschmm = new TonalSoundChangingMorphemeMaker();
  private readonly gm = new GraphemeMaker(lowerLettersTonal);

  private morphAnalyze(str: string) {
    const gs = this.gm.makeGraphemes(str);
    const mrphs = this.tschmm.makeMorphemes(gs);
    return mrphs;
  }

  /** Create a `TonalAssimilationLexeme` with no assimilation. */
  getLexeme(word: string) {
    const mrphs = this.morphAnalyze(word);
    const lx = new TonalAssimilationLexeme(mrphs, new TonalZeroAssimilation());

    return lx;
  }

  /** Agressive assimilation inside a word. Create a `TonalAssimilationLexeme`. */
  assimilateAgressive(word: string) {
    const mrphs = this.morphAnalyze(word);
    const lx = new TonalAssimilationLexeme(mrphs, new AgressiveInternal());

    return lx;
  }

  /** Regressive assimilation inside a word. Create a `TonalAssimilationLexeme`. */
  assimilateRegressive(word: string) {
    const mrphs = this.morphAnalyze(word);
    const lx = new TonalAssimilationLexeme(mrphs, new RegressiveInternal());

    return lx;
  }
}

/** Assimilation between 2 words. */
export class TonalPhrasalAssimilator {
  private readonly assimi = new TonalAssimilator();
  private readonly phmk = new TonalAssimilationPhrasemeMaker();

  /** Agressive assimilation between 2 words. Create a `TonalAssimilationPhraseme`. */
  assimilateAgressive(preceding: string, following: string) {
    const lxPreceding = this.assimi.getLexeme(preceding);
    const lxFollowing = this.assimi.getLexeme(following);

    return this.phmk.makePhraseme(
      lxPreceding,
      lxFollowing,
      new AgressiveExternal()
    );
  }

  /** Regressive assimilation between 2 words. Create a `TonalAssimilationPhraseme`. */
  assimilateRegressive(preceding: string, following: string) {
    const lxPreceding = this.assimi.getLexeme(preceding);
    const lxFollowing = this.assimi.getLexeme(following);

    return this.phmk.makePhraseme(
      lxPreceding,
      lxFollowing,
      new RegressiveExternal()
    );
  }
}
