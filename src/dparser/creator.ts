import { TonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../phraseme';
import { TonalZeroInflection } from '../lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalZeroCombining } from '../morpheme';

export class TonalCreator {
    private readonly tia = new TonalInflectionAnalyzer();
    private readonly phm = new TonalInflectionPhrasemeMaker();

    createWord(str: string) {
        return this.tia.lexAnalyze(str, new TonalZeroInflection()).word;
    }

    createPhrase(str: string) {
        const strs = str.match(/\w+/g);
        const lxs = strs ? strs.map(it => this.tia.lexAnalyze(it, new TonalZeroInflection())) : [];

        return new TonalPhrase(lxs.map(it => it.word));
    }

    createLexeme(str: string) {
        const ms = this.tia.morphAnalyze(str, new TonalZeroCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalZeroInflection()); // could be replaced with TonalDesinenceInflection
        return lx;
    }

    createCompoundPhraseme(preceding: string, following: string) {
        const lexemePreceding = this.createLexeme(preceding);
        const lexemeFollowing = this.createLexeme(following);
        return this.phm.makeCompoundPhraseme(lexemePreceding, lexemeFollowing);
    }
}
