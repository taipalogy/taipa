import { TonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../tonal/phraseme';
import { TonalZeroInflection } from '../lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalZeroCombining, TonalCombiningMetaplasm } from '../morpheme';
import { TonalDesinenceInflection } from './lexeme';

export class TonalCreator {
    private readonly tia = new TonalInflectionAnalyzer();
    private readonly tiph = new TonalInflectionPhrasemeMaker();

    createWord(str: string) {
        return this.tia.lexAnalyze(str, new TonalZeroInflection()).word;
    }

    createPhrase(str: string) {
        const strs = str.match(/\w+/g);
        const lxs = strs ? strs.map(it => this.tia.lexAnalyze(it, new TonalZeroInflection())) : [];

        return new TonalPhrase(lxs.map(it => it.word));
    }

    createLexeme(str: string, metaplasm?: TonalCombiningMetaplasm) {
        const ms = metaplasm
            ? this.tia.morphAnalyze(str, metaplasm)
            : this.tia.morphAnalyze(str, new TonalZeroCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        // if metaplasm is undefined, there will be no inflected forms
        return lx;
    }

    createCompoundPhraseme(preceding: string, following: string) {
        const lexemePreceding = this.tia.lexAnalyze(preceding, new TonalDesinenceInflection());
        const lexemeFollowing = this.createLexeme(following);
        return this.tiph.makeCompoundPhraseme(lexemePreceding, lexemeFollowing);
    }
}
