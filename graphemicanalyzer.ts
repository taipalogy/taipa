import { Expression } from './expression';
import { extend } from 'webdriver-js-extender';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    // first grapheme of a letter, digraph, or trigraph
    public static readonly singleGrapheme = /a|b|c|e|f|g|h|i|j|k|l|m|p|q|t|v|w|y/g;
    // digraph: ss, zs, xx, ng, nn, ur, dr, or
    // trigraph: zzs
    public static readonly graphemeS = /s/g;
    public static readonly graphemeX = /x/g;
    public static readonly graphemeN = /n/g;
    public static readonly graphemeG = /g/g;
    public static readonly graphemeU = /u/g;
    public static readonly graphemeR = /r/g;
    public static readonly graphemeD = /d/g;
    public static readonly graphemeO = /o/g;
    public static readonly graphemeZ = /z/g;
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

export class Grapheme extends Expression {
    literal: string;
}

export class AlphabetGrapheme extends Expression {
    // if this grapheme is the beginning of a digraph or trigraph
    isExpectingNext: boolean;
    // for a single grapheme
    grapheme: string;

    constructor() {
        super();
        this.grapheme = '';
    }
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

class GraphemeOneState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("reached graphemeonestate. literal:%s", literal);
        if(literal.search(GraphemicAnalyzerRegex.singleGrapheme) == 0) {
            // terminal state
            let g = literal.match(GraphemicAnalyzerRegex.singleGrapheme)[0];
            context.graphemes[context.graphemes.length-1].grapheme = g;
            context.graphemes[context.graphemes.length-1].isExpectingNext = false;
            let l = literal.slice(g.length);
        } else {
            if(literal.search(GraphemicAnalyzerRegex.graphemeU) == 0) {
                let g = literal.match(GraphemicAnalyzerRegex.graphemeU)[0];
                context.graphemes[context.graphemes.length-1].grapheme = g;
                context.graphemes[context.graphemes.length-1].isExpectingNext = true;
                let l = literal.slice(g.length);    
            }
        }
    }
}

class LetterState extends State {
    analyze(context: StateContext, literal: string) {
        context.graphemes.push(new AlphabetGrapheme());
        context.setState(new GraphemeOneState());
        context.analyze(literal);
    }
}

class StateContext {

    private myState: State;

    graphemes: Array<AlphabetGrapheme>;

    constructor() {
        this.myState = new State();
        this.graphemes = new Array();
        this.setState(new LetterState());
    }

    setState(newState: StateLike) {
        this.myState = newState;

    }

    analyze(literal: string) {
        this.myState.analyze(this, literal);
    }
}

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class GraphemicAnalyzer implements Expression {
    sc: StateContext;
    literal: string;

    constructor(l: string) {
        this.sc = new StateContext();
        this.literal = l;
    }
    
    analyze() {
        this.sc.analyze(this.literal);
        console.log("about to return grapheme array. length %d", this.sc.graphemes.length);
        return this.sc.graphemes;
    }
}