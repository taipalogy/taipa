import { TonalLemmatizationAnalyzer } from './analyzer';

export class TonalLemmatizer {
    lemmatize(word: string) {
        const tia = new TonalLemmatizationAnalyzer();
        const mrphs = tia.morphAnalyze(word);
        const lx = tia.lexAnalyze(mrphs);
        return lx;
    }
}
