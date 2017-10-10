import { Regex } from './morpheme';

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class MorphemeValidator {
    stem: string = "";
    suffix: string = ""; // tone markers
    counter: number;
    literal: string;

    constructor(s: string) {
        this.literal = s;
        let stems = this.literal.match(Regex.stemRegex);
        if (stems) {
            console.log(stems);
            console.log("length of outputs of stem morpheme:%d", stems.length);
            this.counter = stems.length;
        }

        let boundMorphemes = this.literal.match(Regex.boundMorphemeRegex);
        if (boundMorphemes) {
            console.log("length of outputs of bound morpheme:%d", boundMorphemes.length);
        }

        if(stems && boundMorphemes) {
            for(var i = 0; i < this.counter; i++) {
                // this is one of the stems
                this.stem = this.stem + stems.shift();
                if(i + 1 == this.counter) {
                    // pop out the last element from the array. this is the suffix
                    this.suffix = boundMorphemes.pop();
                    break;
                }
                else {
                    // this is the interfix
                    this.stem = this.stem + boundMorphemes.shift();
                }
            }

            console.log("%cStem:%s", "color: lightcoral; font-size: large", this.stem);
            console.log("%cSuffix:%s", "color: lightcoral; font-size: large", this.suffix);
            console.log(this.counter);
        }
    }

    validate() {
        if(this.literal.match(this.getStemRegex()) 
            && this.literal.match(this.getBoundMorphemeRegex())) {
            
            return true;
        }
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
