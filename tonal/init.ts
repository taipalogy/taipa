import { TonalLemmatizationAnalyzer } from './analyzer';
import { AnalyzerWrapper } from '../analyzer'

export class TonalInflective extends AnalyzerWrapper {
    constructor() {
        super(new TonalLemmatizationAnalyzer())
        //super.analyzer = new TonalLemmatizationAnalyzer()
    }
}