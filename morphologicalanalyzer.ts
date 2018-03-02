import { Lexicon, lexicon } from './lexicon';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {
    public static readonly stemRegex = /ji|si|su|tia/g;
    public static readonly interfixRegex = 
        /ss|y|w|pp?|tt?|kk?|hh?|x|fx|bx|dx|gx|zzs|zs|bb?|dd?|gg?|ff?|xx/g;
    public static readonly initial = /b|c|d|g|h|j|k|l|m|n|p|q|s|t|v|z/g;
    public static readonly medial = /a(i|u)?|e|i(au?|e|o|ur?)?|o|u(ai?|e|r)?/g;
    public static readonly nasal = /m|n(g|n)?/g;
    //public static readonly final = /b|d|f|g|h|k|p|t/g;
    public static readonly neutralFinal = /f|h/g;
    public static readonly nonNeutralFinal = /b|d|g|k|p|t/g;
    public static readonly uncheckedToneMarker = /ss|y|w|xx?|zz?s/g;
    public static readonly checkedToneMarker = /b|d|g|k|p|t|x|y/g;
    public static readonly neutralToneMarker = /f|x|h|y/g;
}

//------------------------------------------------------------------------------
//  IMorpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

//------------------------------------------------------------------------------
//  Sub-Expressions
//------------------------------------------------------------------------------

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

export class ToneSandhiAffix extends Morpheme {
    private object: any;
    funktion: Function;

    initial: string;
    medialOne: string;
    medialTwo: string;
    finalOne: string;
    finalTwo: string;
    toneMarker: string;

    getObject() {return this.object;}
}

class ToneSandhiPrefix extends ToneSandhiAffix {
    stem: string;
    interfix: string;
}

class ToneSandhiInfix extends ToneSandhiAffix {
    stem: string;
    interfix: string;
}

class ToneSandhiSuffix extends ToneSandhiAffix {
    stem: string;
    suffix: string;
}


//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

interface StateLike {
    analyze(context: StateContext, literal: string);
}

class State implements StateLike {
    analyze(context: StateContext, literal: string) { return null; }
}

class StemState extends State {
    analyze(context: StateContext, literal: string) {

    }
}

class StateContext {

    private myState: State;

    constructor() {
        this.myState = new State();
    }

    setState(newState: StateLike) {
        this.myState = newState;

    }

    analyze(literal: string) {
        this.myState.analyze(this, literal);
    }
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphologicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphologicalAnalyzer {
    stems: Array<string>;
    interfixes: Array<string>;
    affixes: Array<ToneSandhiAffix>;

    constructor(l: string) {
        // inject the lexicon
        this.stems = l.match(MorphologicalAnalyzerRegex.stemRegex);
        console.log("literal:" + l + " stems:" + this.stems);
        this.interfixes = l.match(MorphologicalAnalyzerRegex.interfixRegex);
        // initialize the affix array
        this.affixes = new Array();

        let sc: StateContext = new StateContext();
        sc.analyze(l);
    }

    analyze() {
        if(this.stems && this.interfixes) {
            console.log("analyzing stems and interfixes");
            if(this.stems.length == this.interfixes.length) {
                let len = this.stems.length;
                console.log("analyzing affixes, length of stems: %d", this.stems.length);
                for(let i = 0; i < len; i++) {
                    if(i == 0) {
                        // prefix
                        console.log("analyzing prefix");
                        let p = new ToneSandhiPrefix();
                        p.stem = this.stems.shift();
                        p.interfix = this.interfixes.shift();
                        if(this.found(p.stem, p.interfix)) {
                            console.log("analyzing prefix. found");
                            this.affixes.push(p);
                        }
                    } else if(i + 1 < len) {
                        //infix
                        console.log("analyzing infix");
                        let i = new ToneSandhiInfix();
                        i.stem = this.stems.shift();
                        i.interfix = this.interfixes.shift();
                        if(this.found(i.stem, i.interfix)) {
                            console.log("analyzing interfix. found");
                            this.affixes.push(i);
                        }
                    } else {
                        // suffix
                        console.log("analyzing suffix");
                        let s = new ToneSandhiSuffix();
                        s.stem = this.stems.shift();
                        s.suffix = this.interfixes.shift();
                        if(this.found(s.stem, s.suffix)) {
                            console.log("analyzing suffix. found");
                            this.affixes.push(s);
                        }
                    }
                }
            }
        }

        return this.affixes;
    }

    found(s: string, bm: string) {
        if(lexicon.found(s + bm)) {
            console.log("morpheme found");
            return true;
        }
        console.log("morpheme not found");
        return false;
    }
}
  