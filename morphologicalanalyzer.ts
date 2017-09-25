//-----------------------------------------------------------------------------
//  Regular Expressions
//-----------------------------------------------------------------------------

class Regex {
    public static readonly stemRegex = /su|tia|ji/g;
    public static readonly boundMorphemeRegex = 
        /ss|y|w|pp|tt|kk|hh|x|fx|bx|dx|qx|zzs|zs|bb|dd|qq|ff|xx/g;
}

//-----------------------------------------------------------------------------
//  MorphologicalAnalyzer
//-----------------------------------------------------------------------------

export class MorphologicalAnalyzer {
    stem: string = "";
    boundMorpheme: string = ""; // tone markers
    counter: number;

    constructor(s: string) {
        let stems = s.match(Regex.stemRegex);
        if (stems) {
            console.log(stems);
            console.log("length of outputs of stem morpheme:%d", stems.length);
            this.counter = stems.length;
        }

        let boundMorphemes = s.match(Regex.boundMorphemeRegex);
        if (boundMorphemes) {
            console.log("length of outputs of bound morpheme:%d", boundMorphemes.length);
        }

        if(stems && boundMorphemes) {
            for(var i = 0; i < this.counter; i++) {
                // this is either prefix or infix
                this.stem = this.stem + stems.shift();
                if(i + i == this.counter) {
                    // pop out the last element from the array. this is the suffix
                    this.boundMorpheme = boundMorphemes.pop();
                    break;
                }
                else {
                    // this is the infix
                    this.stem = this.stem + boundMorphemes.shift();
                }
            }

            console.log("%cStem:%s", "color: lightcoral; font-size: large", this.stem);
            console.log("%cBound Morpheme:%s", "color: lightcoral; font-size: large", this.boundMorpheme);
            console.log(this.counter);
        }
    }

    getStemRegex() {
        console.log("stemMorpheme:%s", this.stem);
        return new RegExp(this.stem);
    }

    getBoundMorphemeRegex() {
        console.log("boundMorpheme:%s", this.boundMorpheme);
        return new RegExp(this.boundMorpheme);
    }
}
