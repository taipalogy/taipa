import { TonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../phraseme';
import { TonalZeroInflection } from '../lexeme';

export class TonalCreator {
    private readonly tia = new TonalInflectionAnalyzer();

    createWord(str: string) {
        return this.tia.lexAnalyze(str, new TonalZeroInflection()).word;
    }

    createPhrase(str: string) {
        const strs = str.match(/\w+/g);
        const lxs = strs ? strs.map(it => this.tia.lexAnalyze(it, new TonalZeroInflection())) : [];

        return new TonalPhrase(lxs.map(it => it.word));
    }
}
