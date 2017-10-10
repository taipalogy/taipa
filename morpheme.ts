//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class Regex {
    public static readonly stemRegex = /ji|si|su|tia/g;
    public static readonly boundMorphemeRegex = 
        /ss|y|w|pp?|tt?|kk?|hh?|x|fx|bx|dx|qx|zzs|zs|bb?|dd?|qq?|ff?|xx/g;
}

//------------------------------------------------------------------------------
//  IMorpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

class Morpheme implements IMorpheme {
    next: Morpheme;
    literal: string;
}

class ToneSandhiAffix extends Morpheme {

}

class ToneSandhiPrefix extends ToneSandhiAffix {
    stem: string;
    interfix: string;
}

class ToneSandhiInterfix extends ToneSandhiAffix {
    stem: string;
    interfix: string;
}

class ToneSandhiSuffix extends ToneSandhiAffix {
    stem: string;
    suffix: string;
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphemeAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphemeAnalyzer {
    stems: Array<string>;

    constructor(l: string) {
        this.stems = l.match(Regex.stemRegex);
        console.log("affixes:" + this.stems);
    }

    analyze() {
        return this.stems;
    }
}
  