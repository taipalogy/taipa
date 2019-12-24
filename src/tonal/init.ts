import { TonalLemmatizationAnalyzer } from './analyzer';
import { AnalyzerWrapper } from '../analyzer';
import { tonalPositionalSound, lowerLettersOfTonal } from './version2';

export class TonalInflective extends AnalyzerWrapper {
    private static singleton: TonalInflective;

    private constructor() {
        super(new TonalLemmatizationAnalyzer());
        this.checkSize();
    }

    public static getInstance(): TonalInflective {
        if (!TonalInflective.singleton) {
            TonalInflective.singleton = new TonalInflective();
        }

        return TonalInflective.singleton;
    }

    private checkSize() {
        if (tonalPositionalSound.size !== lowerLettersOfTonal.size) {
            console.log('sizes unmatched');
        }
    }
}
