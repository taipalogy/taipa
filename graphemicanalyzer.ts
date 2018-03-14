import { Expression } from './expression';
import { extend } from 'webdriver-js-extender';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    // first grapheme of a letter, digraph, or trigraph
    public static readonly singleSymbol = /a|b|c|e|f|g|h|i|j|k|l|m|p|q|t|v|w|y/g;
    // digraph: ss, zs, xx, ng, nn, ur, dr, or
    // trigraph: zzs
    public static readonly symbolS = /s/g;
    public static readonly symbolX = /x/g;
    public static readonly symbolN = /n/g;
    public static readonly symbolG = /g/g;
    public static readonly symbolU = /u/g;
    public static readonly symbolR = /r/g;
    public static readonly symbolD = /d/g;
    public static readonly symbolO = /o/g;
    public static readonly symbolZ = /z/g;
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
    symbolOne: string;
    // for a digraph or trigraph
    symbolTwo: string;
    // for a trigraphe
    symbolThree: string;

    constructor() {
        super();
        this.symbolOne = '';
        this.symbolTwo = '';
        this.symbolThree = '';
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

class SymbolRState extends State {
    analyze(context: StateContext, literal: string) {
        // terminal state
        console.log("%creached symboltwostate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolR) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolR)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;
        }
    }
}

class SymbolGState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemegstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolG) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolG)[0];
            // move the symbolTwo character of the first letter 
            // to the grapheme character of the second letter
            context.graphemes.push(new AlphabetGrapheme());
            context.graphemes[context.graphemes.length-1].symbolOne = context.graphemes[context.graphemes.length-2].symbolTwo;
            context.graphemes[context.graphemes.length-2].symbolTwo = '';
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;            
        }
    }
}

class SymbolGOrNState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemegornstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolG) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolG)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolN) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolN)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            context.setState(new SymbolGState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;
        }
    }
}

class SymbolThreeSState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemesstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolS)[0];
            context.graphemes[context.graphemes.length-1].symbolThree = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;
        }
    }
}

class SymbolSOrZState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemesorzstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolS)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolZ) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolZ)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            context.setState(new SymbolThreeSState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;
        }
    }    
}


class SymbolXState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemexstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolX) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolX)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;
        }
    }
}

class SymbolSState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached symbolsstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.symbolS)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new SymbolOneState());
            return literal;
        }

    }
}

class SymbolOneState extends State {
    setSymbolOneState(context: StateContext, literal: string, state: State, reg: RegExp) {
        // non-terminal state
        context.graphemes.push(new AlphabetGrapheme());
        let g = literal.match(reg)[0];
        context.graphemes[context.graphemes.length-1].symbolOne = g;
        let l = literal.slice(g.length);
        context.setState(state);
        return context.analyze(l);
    }
    
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemeonestate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.singleSymbol) == 0) {
            // terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let g = literal.match(GraphemicAnalyzerRegex.singleSymbol)[0];
            context.graphemes[context.graphemes.length-1].symbolOne = g;
            // no need to reset the state since this is the default state
            return literal.slice(g.length);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolU) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, literal, new SymbolRState(), GraphemicAnalyzerRegex.symbolU);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolN) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, literal, new SymbolGOrNState(), GraphemicAnalyzerRegex.symbolN);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolZ) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, literal, new SymbolSOrZState(), GraphemicAnalyzerRegex.symbolZ);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolX) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, literal, new SymbolXState(), GraphemicAnalyzerRegex.symbolX);
        } else if(literal.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, literal, new SymbolSState(), GraphemicAnalyzerRegex.symbolS);
        }
    }
}

class LetterState extends State {
    analyze(context: StateContext, literal: string) {
        context.setState(new SymbolOneState());
        return context.analyze(literal);
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
        let l: string = literal;
        do {
            l = this.myState.analyze(this, l);
            console.log("%cremained literal after analyzing: %s", "color: blue; font-size: medium", l);
            try {
                if(l == null) {
                    break;
                }
            } catch(message) {
                console.log("failed to get length of l");
            }
        } while(l.length > 0);
        
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