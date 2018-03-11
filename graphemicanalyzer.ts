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
    // for a single grapheme
    grapheme: string;
    graphemeTwo: string;

    constructor() {
        super();
        this.grapheme = '';
        this.graphemeTwo = '';
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

class GraphemeRState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemetwostate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeR) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeR)[0];
            context.graphemes[context.graphemes.length-1].graphemeTwo = g;
        }
    }
}

class GraphemeOneState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemeonestate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.singleGrapheme) == 0) {
            // terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let g = literal.match(GraphemicAnalyzerRegex.singleGrapheme)[0];
            context.graphemes[context.graphemes.length-1].grapheme = g;
            let l = literal.slice(g.length);
        } else {
            if(literal.search(GraphemicAnalyzerRegex.graphemeU) == 0) {
                context.graphemes.push(new AlphabetGrapheme());
                let g = literal.match(GraphemicAnalyzerRegex.graphemeU)[0];
                context.graphemes[context.graphemes.length-1].grapheme = g;
                let l = literal.slice(g.length);
                context.setState(new GraphemeRState());
                context.analyze(l);
            }
        }
    }
}

class LetterState extends State {
    analyze(context: StateContext, literal: string) {
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
        console.log("%cabout to return grapheme array. length %d", "color: blue; font-size: medium", this.sc.graphemes.length);
        return this.sc.graphemes;
    }
}