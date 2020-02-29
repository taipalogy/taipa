import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { GraphemeMaker } from '../grapheme';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalZeroInflection } from '../lexeme';
import { AgressiveInternal, RegressiveInternal, TonalAssimilationLexeme } from './lexeme';
import { TonalAssimilationPhrasemeMaker, RegressiveExternal, AgressiveExternal } from './phraseme';

export class TonalAssimilator {
    private readonly tschmm = new TonalSoundChangingMorphemeMaker();
    private readonly gm = new GraphemeMaker(lowerLettersTonal);

    private morphAnalyze(str: string) {
        const gs = this.gm.makeGraphemes(str);
        const mrphs = this.tschmm.makeMorphemes(gs);
        return mrphs;
    }

    getLexeme(word: string) {
        const mrphs = this.morphAnalyze(word);
        const lx = new TonalAssimilationLexeme(mrphs, new TonalZeroInflection());

        return lx;
    }

    assimilateAgressive(word: string) {
        const mrphs = this.morphAnalyze(word);
        const lx = new TonalAssimilationLexeme(mrphs, new AgressiveInternal());

        return lx;
    }

    assimilateRegressive(word: string) {
        const mrphs = this.morphAnalyze(word);
        const lx = new TonalAssimilationLexeme(mrphs, new RegressiveInternal());

        return lx;
    }
}

export class TonalPhrasalAssimilator {
    private readonly assimi = new TonalAssimilator();
    private readonly phmk = new TonalAssimilationPhrasemeMaker();

    assimilateAgressive(preceding: string, following: string) {
        const lxPreceding = this.assimi.getLexeme(preceding);
        const lxFollowing = this.assimi.getLexeme(following);

        return this.phmk.makePhraseme(lxPreceding, lxFollowing, new AgressiveExternal());
    }

    assimilateRegressive(preceding: string, following: string) {
        const lxPreceding = this.assimi.getLexeme(preceding);
        const lxFollowing = this.assimi.getLexeme(following);

        return this.phmk.makePhraseme(lxPreceding, lxFollowing, new RegressiveExternal());
    }
}
