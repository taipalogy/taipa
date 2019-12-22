import { TonalLemmatizationAnalyzer } from './analyzer';
import { AnalyzerWrapper } from '../analyzer';
import { tonalPositionalSound } from './version2';

export class TonalInflective extends AnalyzerWrapper {
    private static singleton: TonalInflective;

    private constructor() {
        super(new TonalLemmatizationAnalyzer());
        this.findDuplicates(tonalPositionalSound);
    }

    public static getInstance(): TonalInflective {
        if (!TonalInflective.singleton) {
            TonalInflective.singleton = new TonalInflective();
        }

        return TonalInflective.singleton;
    }
}
