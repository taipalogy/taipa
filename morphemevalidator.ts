import { MorphologicalAnalyzerRegex } from './morphologicalanalyzer';

//------------------------------------------------------------------------------
//  Morpheme Validator
//------------------------------------------------------------------------------

export class MorphemeValidator {
    stem: string = "";
    suffix: string = ""; // tone markers
    counter: number;
    literal: string;

    constructor(s: string) {
        this.literal = s;
        let stems = this.literal.match(MorphologicalAnalyzerRegex.stemRegex);
        if (stems) {
            console.log(stems);
            console.log("length of outputs of stem morpheme:%d", stems.length);
            this.counter = stems.length;
        }

        let interfixes = this.literal.match(MorphologicalAnalyzerRegex.interfixRegex);
        if (interfixes) {
            console.log("length of outputs of bound morpheme:%d", interfixes.length);
        }

        if(stems && interfixes) {
            for(var i = 0; i < this.counter; i++) {
                // this is one of the stems
                this.stem = this.stem + stems.shift();
                if(i + 1 == this.counter) {
                    // pop out the last element from the array. this is the suffix
                    this.suffix = interfixes.pop();
                    break;
                }
                else {
                    // this is the interfix
                    this.stem = this.stem + interfixes.shift();
                }
            }

            console.log("%cstem:%s", "color: lightcoral; font-size: large", this.stem);
            console.log("%cSuffix:%s", "color: lightcoral; font-size: large", this.suffix);
            console.log(this.counter);
        }
    }

    validate() {
        if(this.literal.match(this.getStemRegex()) 
            && this.literal.match(this.getBoundMorphemeRegex())) {
            
            return true;
        }

        return false;
    }

    getStemRegex() {
        console.log("stemMorpheme:%s", this.stem);
        return new RegExp(this.stem);
    }

    getBoundMorphemeRegex() {
        console.log("boundMorpheme:%s", this.suffix);
        return new RegExp(this.suffix);
    }
}
