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

class GraphemeRState extends State {
    analyze(context: StateContext, literal: string) {
        // terminal state
        console.log("%creached symboltwostate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeR) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeR)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to GraphemeOneState since this is a terminal state
            context.setState(new GraphemeOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new GraphemeOneState());
            return literal;
        }
    }
}

class GraphemeGState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemegstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeG) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeG)[0];
            // move the symbolTwo character of the first letter 
            // to the grapheme character of the second letter
            context.graphemes.push(new AlphabetGrapheme());
            context.graphemes[context.graphemes.length-1].symbolOne = context.graphemes[context.graphemes.length-2].symbolTwo;
            context.graphemes[context.graphemes.length-2].symbolTwo = '';
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to GraphemeOneState since this is a terminal state
            context.setState(new GraphemeOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new GraphemeOneState());
            return literal;            
        }
    }
}

class GraphemeGOrNState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemegornstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeG) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeG)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to GraphemeOneState since this is a terminal state
            context.setState(new GraphemeOneState());
            return literal.slice(g.length);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeN) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeN)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            context.setState(new GraphemeGState());
            return literal.slice(g.length);
        } else {
            context.setState(new GraphemeOneState());
            return literal;
        }
    }
}

class GraphemeSState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemesstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeS) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeS)[0];
            context.graphemes[context.graphemes.length-1].symbolThree = g;
            // reset the state to GraphemeOneState since this is a terminal state
            context.setState(new GraphemeOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new GraphemeOneState());
            return literal;
        }
    }
}

class GraphemeSOrZState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemesorzstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeS) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeS)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to GraphemeOneState since this is a terminal state
            context.setState(new GraphemeOneState());
            return literal.slice(g.length);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeZ) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeZ)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            context.setState(new GraphemeSState());
            return literal.slice(g.length);
        } else {
            context.setState(new GraphemeOneState());
            return literal;
        }
    }    
}


class GraphemeXState extends State {
    analyze(context: StateContext, literal: string) {
        console.log("%creached graphemexstate. literal:%s", "color: blue; font-size: medium", literal);
        if(literal.search(GraphemicAnalyzerRegex.graphemeX) == 0) {
            let g = literal.match(GraphemicAnalyzerRegex.graphemeX)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = g;
            // reset the state to GraphemeOneState since this is a terminal state
            context.setState(new GraphemeOneState());
            return literal.slice(g.length);
        } else {
            context.setState(new GraphemeOneState());
            return literal;
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
            context.graphemes[context.graphemes.length-1].symbolOne = g;
            // no need to reset the state since this is the default state
            return literal.slice(g.length);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeU) == 0) {
            // non-terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let g = literal.match(GraphemicAnalyzerRegex.graphemeU)[0];
            context.graphemes[context.graphemes.length-1].symbolOne = g;
            let l = literal.slice(g.length);
            context.setState(new GraphemeRState());
            return context.analyze(l);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeN) == 0) {
            // non-terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let g = literal.match(GraphemicAnalyzerRegex.graphemeN)[0];
            context.graphemes[context.graphemes.length-1].symbolOne = g;
            let l = literal.slice(g.length);
            context.setState(new GraphemeGOrNState());
            return context.analyze(l);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeZ) == 0) {
            // non-terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let g = literal.match(GraphemicAnalyzerRegex.graphemeZ)[0];
            context.graphemes[context.graphemes.length-1].symbolOne = g;
            let l = literal.slice(g.length);
            context.setState(new GraphemeSOrZState());
            return context.analyze(l);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeX) == 0) {
            // non-terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let g = literal.match(GraphemicAnalyzerRegex.graphemeX)[0];
            context.graphemes[context.graphemes.length-1].symbolOne = g;
            let l = literal.slice(g.length);
            context.setState(new GraphemeXState());
            return context.analyze(l);
        } else if(literal.search(GraphemicAnalyzerRegex.graphemeS) == 0) {
        }
    }
}

class LetterState extends State {
    analyze(context: StateContext, literal: string) {
        context.setState(new GraphemeOneState());
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