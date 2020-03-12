import { TonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../tonal/phraseme';
import { TonalZeroInflection } from '../lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalZeroCombining, TonalCombiningMetaplasm } from '../morpheme';
import { TonalDesinenceInflection } from './lexeme';

export function createWord(str: string) {
    const tia = new TonalInflectionAnalyzer();
    return tia.lexAnalyze(str, new TonalZeroInflection()).word;
}

export function createPhrase(str: string) {
    const tia = new TonalInflectionAnalyzer();

    const strs = str.match(/\w+/g);
    const lxs = strs ? strs.map(it => tia.lexAnalyze(it, new TonalZeroInflection())) : [];

    return new TonalPhrase(lxs.map(it => it.word));
}

export function createLexeme(str: string, metaplasm?: TonalCombiningMetaplasm) {
    const tia = new TonalInflectionAnalyzer();

    const ms = metaplasm ? tia.morphAnalyze(str, metaplasm) : tia.morphAnalyze(str, new TonalZeroCombining());
    const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());
    // if metaplasm is undefined, there will be no inflected forms
    return lx;
}

export function createCompoundPhraseme(preceding: string, following: string) {
    const tia = new TonalInflectionAnalyzer();
    const tiph = new TonalInflectionPhrasemeMaker();

    const lexemePreceding = tia.lexAnalyze(preceding, new TonalDesinenceInflection());
    const lexemeFollowing = createLexeme(following);
    return tiph.makeCompoundPhraseme(lexemePreceding, lexemeFollowing);
}
