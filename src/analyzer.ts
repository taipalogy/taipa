export abstract class Analyzer {}

export class AnalyzerWrapper {
    analyzer: Analyzer;

    constructor(analyzer: Analyzer) {
        this.analyzer = analyzer;
    }
}
