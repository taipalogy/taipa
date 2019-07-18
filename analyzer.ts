import { Morpheme } from './morpheme'
import { AlphabeticGrapheme } from './grapheme';
import { TonalUncombiningMorpheme } from './tonal/morpheme';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { LemmatizationLexeme, TonalLemmatizationLexeme } from './tonal/lexeme';
import { InflexionLexeme, TonalCombiningMorpheme, TonalInflexionLexeme } from './dependencyparser/rulebasedtagger';

type Class = { new(...args: any[]): any; };

function createInstance<A extends AnalyzerWrapper>(c: new () => A): A {
    return new c();
}

//------------------------------------------------------------------------------
//  Analyzer
//------------------------------------------------------------------------------

export abstract class Analyzer {
    //abstract getMorphologicalAnalysisResults(x: string | Array<AlphabeticGrapheme>)
    //abstract getLexicalAnalysisResults(x: string | Array<TonalUncombiningMorpheme> | Array<TonalCombiningMorpheme>)
}

export class AnalyzerWrapper {
    analyzer: Analyzer
    getBlocks(ms: Morpheme[]): string[] { return [''] }
    constructor(analyzer: Analyzer) {
        this.analyzer = analyzer
    }
}

export class AnalyzerLoader {
    aws: Array<AnalyzerWrapper> = new Array()
    load(klas: Class) {
        this.aws.push(createInstance(klas))
    }
    unload(klas: Class) {
        const len = this.aws.length
        for(let i=0; i < this.aws.length; i++) {
            if(this.aws[i] instanceof klas) {
                this.aws.splice(i, 1) // remove it from array
                break
            }
        }
    }
}
