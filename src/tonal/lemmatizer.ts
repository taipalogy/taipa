import { TonalLemmatizationAnalyzer } from './analyzer';

export class TonalLemmatizer {
    lemmatize(str: string) {
        const tia = new TonalLemmatizationAnalyzer();
        const mrphs = tia.morphAnalyze(str);
        const lx = tia.lexAnalyze(mrphs);
        return lx;
    }
}
