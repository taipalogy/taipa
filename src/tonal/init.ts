import { TonalLemmatizationAnalyzer } from './analyzer';
import { AnalyzerWrapper } from '../analyzer';
import { letterClasses } from './version2';

export class TonalInflective extends AnalyzerWrapper {
    constructor() {
        super(new TonalLemmatizationAnalyzer());
        this.findDuplicates(letterClasses);
    }
}
