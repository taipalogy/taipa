//-----------------------------------------------------------------------------
//  Regular Expressions
//-----------------------------------------------------------------------------

class Regex {
    public static readonly stemRegex = /si|tia|ji/;
    public static readonly boundMorphemeRegex = 
      /ss|y|w|pp|tt|kk|hh|x|fx|bx|dx|qx|zzs|zs|bb|dd|qq|ff|xx/;
  }
  
  //-----------------------------------------------------------------------------
  //  MorphologicalAnalyzer
  //-----------------------------------------------------------------------------
  
  export class MorphologicalAnalyzer {
    stem: string;
    boundMorpheme: string; // tone markers
  
    constructor(s: string){
      let outputs = s.match(Regex.stemRegex);
      if(outputs) {
        this.stem = outputs.pop();
      }
  
      outputs = s.match(Regex.boundMorphemeRegex);
      if(outputs) {
        this.boundMorpheme = outputs.pop();
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
  