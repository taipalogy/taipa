import { Morpheme } from './morpheme';

//------------------------------------------------------------------------------
//  Analyzer
//------------------------------------------------------------------------------

export abstract class Analyzer {}

export class AnalyzerWrapper {
    analyzer: Analyzer;
    getBlocks(ms: Morpheme[]): string[] {
        return [''];
    }
    constructor(analyzer: Analyzer) {
        this.analyzer = analyzer;
    }
}
