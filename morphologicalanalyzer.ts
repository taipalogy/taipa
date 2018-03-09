import { Lexicon, lexicon } from './lexicon';
import { Expression } from './expression';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {

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

export class Morpheme extends Expression {
    literal: string;
}

export class ToneSandhiMorpheme extends Morpheme {
    stem: string = "";
    suffix: string = "";
    
    initial: string = "";
    medial: string = "";
    nasal: string = "";
    final: string = "";
    toneMarker: string = "";
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
            context.setState(new ToneSandhiSyllableState());
            context.analyze(literal);
    }
}

class UncheckedToneMarkerState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached uncheckedtonemarkerstate. literal:%s", literal);
            context.setState(new ToneSandhiSyllableState());
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

class ToneSandhiSyllableState extends State {
    analyze(context: StateContext, literal: string) {
        context.affixes.push(new ToneSandhiMorpheme());
        context.setState(new StemState);
        context.analyze(literal);
    }
}

class StateContext {

    private myState: State;

    affixes: Array<ToneSandhiMorpheme>;

    constructor() {
        this.myState = new State();
        this.affixes = new Array();
        this.setState(new ToneSandhiSyllableState());
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
    affixes: Array<ToneSandhiMorpheme>;
    sc: StateContext;
    literal: string;

    constructor(l: string) {
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
}
  