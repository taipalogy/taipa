import { TonalLemmatizationAnalyzer } from './analyzer';
import { AnalyzerWrapper } from '../analyzer';
import { tonalPositionalSound, lowerLettersOfTonal } from './version2';

export class Lurzmafjiz extends AnalyzerWrapper {
    private static singleton: Lurzmafjiz;

    private constructor() {
        super(new TonalLemmatizationAnalyzer());
        this.checkSize();
    }

    public static getInstance(): Lurzmafjiz {
        if (!Lurzmafjiz.singleton) {
            Lurzmafjiz.singleton = new Lurzmafjiz();
        }

        return Lurzmafjiz.singleton;
    }

    private checkSize() {
        if (tonalPositionalSound.size !== lowerLettersOfTonal.size) {
            console.log('sizes unmatched');
        }
    }
}
