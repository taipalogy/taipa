import { Expression } from './expression';
import { State } from './state';

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
    analyze(context: StateContext, chars: string);
}

class GraphemicState implements StateLike {
    analyze(context: StateContext, chars: string) { return null; }
}

class SymbolRState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        // terminal state
        console.log("%creached symboltwostate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolR) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolR)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;
        }
    }
}

class SymbolGState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        console.log("%creached graphemegstate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolG) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolG)[0];
            // move the symbolTwo character of the first letter 
            // to the grapheme character of the second letter
            context.graphemes.push(new AlphabetGrapheme());
            context.graphemes[context.graphemes.length-1].symbolOne = context.graphemes[context.graphemes.length-2].symbolTwo;
            context.graphemes[context.graphemes.length-2].symbolTwo = '';
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;            
        }
    }
}

class SymbolGOrNState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        console.log("%creached graphemegornstate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolG) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolG)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolN) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolN)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            context.setState(new SymbolGState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;
        }
    }
}

class SymbolThreeSState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        console.log("%creached graphemesstate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolS)[0];
            context.graphemes[context.graphemes.length-1].symbolThree = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;
        }
    }
}

class SymbolSOrZState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        console.log("%creached graphemesorzstate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolS)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolZ) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolZ)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            context.setState(new SymbolThreeSState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;
        }
    }    
}


class SymbolXState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        console.log("%creached graphemexstate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolX) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolX)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;
        }
    }
}

class SymbolSState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        console.log("%creached symbolsstate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            let s = chars.match(GraphemicAnalyzerRegex.symbolS)[0];
            context.graphemes[context.graphemes.length-1].symbolTwo = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // reset the state to SymbolOneState since this is a terminal state
            context.setState(new SymbolOneState());
            return chars.slice(s.length);
        } else {
            context.setState(new SymbolOneState());
            return chars;
        }

    }
}

class SymbolOneState extends GraphemicState {
    setSymbolOneState(context: StateContext, chars: string, state: GraphemicState, reg: RegExp) {
        // non-terminal state
        context.graphemes.push(new AlphabetGrapheme());
        let s = chars.match(reg)[0];
        context.graphemes[context.graphemes.length-1].symbolOne = s;
        context.graphemes[context.graphemes.length-1].literal += s;
        let l = chars.slice(s.length);
        context.setState(state);
        return context.analyze(l);
    }
    
    analyze(context: StateContext, chars: string) {
        console.log("%creached graphemeonestate. chars:%s", "color: blue; font-size: medium", chars);
        if(chars.search(GraphemicAnalyzerRegex.singleSymbol) == 0) {
            // terminal state
            context.graphemes.push(new AlphabetGrapheme());
            let s = chars.match(GraphemicAnalyzerRegex.singleSymbol)[0];
            context.graphemes[context.graphemes.length-1].symbolOne = s;
            context.graphemes[context.graphemes.length-1].literal += s;
            // no need to reset the state since this is the default state
            return chars.slice(s.length);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolU) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, chars, new SymbolRState(), GraphemicAnalyzerRegex.symbolU);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolN) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, chars, new SymbolGOrNState(), GraphemicAnalyzerRegex.symbolN);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolZ) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, chars, new SymbolSOrZState(), GraphemicAnalyzerRegex.symbolZ);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolX) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, chars, new SymbolXState(), GraphemicAnalyzerRegex.symbolX);
        } else if(chars.search(GraphemicAnalyzerRegex.symbolS) == 0) {
            // non-terminal state
            this.setSymbolOneState(context, chars, new SymbolSState(), GraphemicAnalyzerRegex.symbolS);
        }
    }
}

class LetterState extends GraphemicState {
    analyze(context: StateContext, chars: string) {
        context.setState(new SymbolOneState());
        return context.analyze(chars);
    }
}

class StateContext {

    private myState: GraphemicState;

    graphemes: Array<AlphabetGrapheme>;

    constructor() {
        this.myState = new GraphemicState();
        this.graphemes = new Array();
        this.setState(new LetterState());
    }

    setState(newState: StateLike) {
        this.myState = newState;

    }

    analyze(chars: string) {
        let c: string = chars;
        do {
            c = this.myState.analyze(this, c);
            console.log("%cremained characters after analyzing: %s", "color: blue; font-size: medium", c);
            try {
                if(c == null) {
                    break;
                }
            } catch(message) {
                console.log("failed to get length of l");
            }
        } while(c.length > 0);
        
    }
}

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class GraphemicAnalyzer {
    sc: StateContext;
    chars: string;

    constructor(l: string) {
        this.sc = new StateContext();
        this.chars = l;
    }
    
    analyze() {
        this.sc.analyze(this.chars);
        console.log("%cabout to return grapheme array. length %d", "color: blue; font-size: medium", this.sc.graphemes.length);
        return this.sc.graphemes;
    }
}