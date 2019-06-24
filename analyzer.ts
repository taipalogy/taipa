import { Morpheme } from './morpheme'
import { AlphabeticGrapheme } from './grapheme';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

type Class = { new(...args: any[]): any; };

function createInstance<A extends AnalyzerWrapper>(c: new () => A): A {
    return new c();
}

//------------------------------------------------------------------------------
//  Analyzer
//------------------------------------------------------------------------------

export abstract class Analyzer {
    abstract getMorphologicalAnalysisResults(x: string | Array<AlphabeticGrapheme>)
    abstract getLexicalAnalysisResults(x: string | Array<TonalUncombiningMorpheme>)
}

export class AnalyzerWrapper {
    analyzer: Analyzer
    getBlocks(ms: Morpheme[]): string { return '' }
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
