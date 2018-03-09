import { Expression } from './expression';
import { extend } from 'webdriver-js-extender';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    // alphabet
    public static readonly singleGrapheme = /a|b|c|e|f|g|h|i|j|k|l|m|p|q|t|v|w|y/g;
    // digraph: ss, zs, xx, ng, nn, ur, dr, or
    public static readonly graphemeS = /s/g;
    public static readonly graphemeX = /x/g;
    public static readonly graphemeN = /n/g;
    public static readonly graphemeG = /g/g;
    public static readonly graphemeU = /u/g;
    public static readonly graphemeR = /r/g;
    public static readonly graphemeD = /d/g;
    public static readonly graphemeO = /o/g;
    // the sixth tone. trigraph: zzs
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
    graphemeOne: string;
    // for digraph and trigraph
    graphemeTwo: string;
    // for trigraph
    graphemeThree: string;

    constructor() {
        super();
        this.graphemeOne = '';
        this.graphemeTwo = '';
        this.graphemeThree = '';
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

    graphemes: Array<Grapheme>;

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

    constructor() {
        this.sc = new StateContext();
    }
}