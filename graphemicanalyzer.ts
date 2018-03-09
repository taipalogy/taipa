import { Expression } from './expression';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    public static readonly letter = /c|j|l|m|q|v/g;
    public static readonly digraph = /ss|zs|xx|nn|ur|dr|or/g;
    public static readonly trigraph = /zzs/g;
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

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

interface StateLike {
    analyze(context: StateContext, literal: string);
}

class State implements StateLike {
    analyze(context: StateContext, literal: string) { return null; }
}

class LetterState extends State {
    analyze(context: StateContext, literal: string) {
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
    literal: string;
}