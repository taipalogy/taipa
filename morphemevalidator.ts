import { MorphologicalAnalyzerRegex } from './morphologicalanalyzer';

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class MorphemeValidator {
    root: string = "";
    suffix: string = ""; // tone markers
    counter: number;
    literal: string;

    constructor(s: string) {
        this.literal = s;
        let roots = this.literal.match(MorphologicalAnalyzerRegex.rootRegex);
        if (roots) {
            console.log(roots);
            console.log("length of outputs of root morpheme:%d", roots.length);
            this.counter = roots.length;
        }

        let interfixes = this.literal.match(MorphologicalAnalyzerRegex.interfixRegex);
        if (interfixes) {
            console.log("length of outputs of bound morpheme:%d", interfixes.length);
        }

        if(roots && interfixes) {
            for(var i = 0; i < this.counter; i++) {
                // this is one of the roots
                this.root = this.root + roots.shift();
                if(i + 1 == this.counter) {
                    // pop out the last element from the array. this is the suffix
                    this.suffix = interfixes.pop();
                    break;
                }
                else {
                    // this is the interfix
                    this.root = this.root + interfixes.shift();
                }
            }

            console.log("%croot:%s", "color: lightcoral; font-size: large", this.root);
            console.log("%cSuffix:%s", "color: lightcoral; font-size: large", this.suffix);
            console.log(this.counter);
        }
    }

    validate() {
        if(this.literal.match(this.getRootRegex()) 
            && this.literal.match(this.getBoundMorphemeRegex())) {
            
            return true;
        }

        return false;
    }

    getRootRegex() {
        console.log("rootMorpheme:%s", this.root);
        return new RegExp(this.root);
    }

    getBoundMorphemeRegex() {
        console.log("boundMorpheme:%s", this.suffix);
        return new RegExp(this.suffix);
    }
}
