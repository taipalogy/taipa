import { Lexicon, lexicon } from './lexicon';
import { Expression } from './expression';

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
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

export class Morpheme implements Expression {
    literal: string;
    left: Morpheme;
    right: Morpheme;
}

export class AndMorphemeExpression extends Morpheme {
    constructor() {
        super();
        this.literal = '&';
    }
}

export class ToneSandhiAffix extends Morpheme {

    // ToneSandhiAffix is an standalone affix without ToneSandhiPrefix 
    // and ToneSandhiSuffix
    private object: any;
    funktion: Function;

    stem: string = "";
    suffix: string = "";
    
    initial: string = "";
    medial: string = "";
    nasal: string = "";
    final: string = "";
    toneMarker: string = "";

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

class NonNeutralFinalState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached nonneutralfinalstate. literal:%s", literal);
            context.setState(new ToneSandhiAffixState());
            context.analyze(literal);
    }
}

class UncheckedToneMarkerState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached uncheckedtonemarkerstate. literal:%s", literal);
            context.setState(new ToneSandhiAffixState());
            context.analyze(literal);
    }
}

class MedialState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached medialstate. literal:%s", literal);
        if(literal.search(MorphologicalAnalyzerRegex.uncheckedToneMarker) == 0) {
            let u = literal.match(MorphologicalAnalyzerRegex.uncheckedToneMarker)[0];
            context.affixes[context.affixes.length-1].toneMarker = u;
            context.affixes[context.affixes.length-1].suffix += u;
            let l = literal.slice(u.length);
            context.setState(new UncheckedToneMarkerState());
            context.analyze(l);
        } else if(literal.search(MorphologicalAnalyzerRegex.nonNeutralFinal) == 0) {
            let n = literal.match(MorphologicalAnalyzerRegex.nonNeutralFinal)[0];
            context.affixes[context.affixes.length-1].final = n;
            context.affixes[context.affixes.length-1].stem += n;
            let l = literal.slice(n.length);
            context.setState(new NonNeutralFinalState());
            context.analyze(l);
        }
    }
}

class InitialState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached initialstate. literal:%s", literal);
        if(literal.search(MorphologicalAnalyzerRegex.medial) == 0) {
            let m = literal.match(MorphologicalAnalyzerRegex.medial)[0];
            context.affixes[context.affixes.length-1].medial = m;
            context.affixes[context.affixes.length-1].stem += m;
            let l = literal.slice(m.length);
            context.setState(new MedialState());
            context.analyze(l);
        }
    }
}

class StemState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached stemstate. literal:%s", literal);
        if(literal.search(MorphologicalAnalyzerRegex.initial) == 0) {
            let i = literal.match(MorphologicalAnalyzerRegex.initial)[0];
            context.affixes[context.affixes.length-1].initial = i;
            context.affixes[context.affixes.length-1].stem += i;
            let l = literal.slice(i.length);
            context.setState(new InitialState());
            context.analyze(l);
        }
    }
}

class ToneSandhiAffixState extends State {
    analyze(context: StateContext, literal: string) {
        context.affixes.push(new ToneSandhiAffix());
        context.setState(new StemState);
        context.analyze(literal);
    }
}

class WordState extends State {
    analyze(context: StateContext, literal: string) {
        context.setState(new ToneSandhiAffixState());
        context.analyze(literal)
    }
}

class StateContext {

    private myState: State;

    affixes: Array<ToneSandhiAffix>;

    constructor() {
        this.myState = new State();
        this.affixes = new Array();
        this.setState(new WordState());
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
    sc: StateContext;
    literal: string;

    constructor(l: string) {
        // inject the lexicon
        this.stems = l.match(MorphologicalAnalyzerRegex.stemRegex);
        console.log("literal:" + l + " stems:" + this.stems);
        this.interfixes = l.match(MorphologicalAnalyzerRegex.interfixRegex);

        // initialize the affix array
        this.affixes = new Array();
        this.literal = l;
        this.sc = new StateContext();
    }

    analyzeTwo() {
        this.sc.analyze(this.literal);
        console.log(this.sc.affixes);
        return this.sc.affixes;
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
  