import { Expression } from './expression';
import { State } from './state';
import { LowerCharacterA, LowerCharacterB, LowerCharacterC, LowerCharacterD, LowerCharacterE, 
            LowerCharacterF, LowerCharacterG, LowerCharacterH, LowerCharacterI, LowerCharacterJ,
            LowerCharacterK, LowerCharacterL, LowerCharacterM, LowerCharacterN, LowerCharacterO,
            LowerCharacterP, LowerCharacterQ, LowerCharacterR, LowerCharacterS, LowerCharacterT,
            LowerCharacterU, LowerCharacterV, LowerCharacterW, LowerCharacterX, LowerCharacterY,
            LowerCharacterZ } from './metadata';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    // first grapheme of a letter, digraph, or trigraph

    // digraph: ss, zs, xx, ng, nn, ur, dr, or
    // trigraph: xxx, zzs

    lowerCharacterA = new LowerCharacterA();
    lowerCharacterB = new LowerCharacterB();
    lowerCharacterC = new LowerCharacterC();
    lowerCharacterD = new LowerCharacterD();
    lowerCharacterE = new LowerCharacterE();
    lowerCharacterF = new LowerCharacterF();
    lowerCharacterG = new LowerCharacterG();
    lowerCharacterH = new LowerCharacterH();
    lowerCharacterI = new LowerCharacterI();
    lowerCharacterJ = new LowerCharacterJ();
    lowerCharacterK = new LowerCharacterK();
    lowerCharacterL = new LowerCharacterL();
    lowerCharacterM = new LowerCharacterM();
    lowerCharacterN = new LowerCharacterN();
    lowerCharacterO = new LowerCharacterO();
    lowerCharacterP = new LowerCharacterP();
    lowerCharacterQ = new LowerCharacterQ();
    lowerCharacterR = new LowerCharacterR();
    lowerCharacterS = new LowerCharacterS();
    lowerCharacterT = new LowerCharacterT();
    lowerCharacterU = new LowerCharacterU();
    lowerCharacterV = new LowerCharacterV();
    lowerCharacterW = new LowerCharacterW();
    lowerCharacterX = new LowerCharacterX();
    lowerCharacterY = new LowerCharacterY();
    lowerCharacterZ = new LowerCharacterZ();

    singleCharacters: string;
    singleCharactersRegexp: RegExp;
    characterGRegexp: RegExp;
    characterNRegexp: RegExp;
    characterRRegexp: RegExp;
    characterSRegexp: RegExp;
    characterURegexp: RegExp;
    characterXRegexp: RegExp;
    characterZRegexp: RegExp;

    constructor() {
        this.singleCharacters = '';
        this.singleCharacters = this.lowerCharacterA.symbol
                                + '|' + this.lowerCharacterB.symbol
                                + '|' + this.lowerCharacterC.symbol
                                + '|' + this.lowerCharacterD.symbol
                                + '|' + this.lowerCharacterE.symbol
                                + '|' + this.lowerCharacterF.symbol
                                + '|' + this.lowerCharacterG.symbol
                                + '|' + this.lowerCharacterH.symbol
                                + '|' + this.lowerCharacterI.symbol
                                + '|' + this.lowerCharacterJ.symbol
                                + '|' + this.lowerCharacterK.symbol
                                + '|' + this.lowerCharacterL.symbol
                                + '|' + this.lowerCharacterM.symbol
                                + '|' + this.lowerCharacterO.symbol
                                + '|' + this.lowerCharacterP.symbol
                                + '|' + this.lowerCharacterQ.symbol
                                + '|' + this.lowerCharacterT.symbol
                                + '|' + this.lowerCharacterV.symbol
                                + '|' + this.lowerCharacterW.symbol
                                + '|' + this.lowerCharacterY.symbol;
        this.singleCharactersRegexp = new RegExp(this.singleCharacters);
        this.characterGRegexp = new RegExp(this.lowerCharacterG.symbol);
        this.characterNRegexp = new RegExp(this.lowerCharacterN.symbol);
        this.characterURegexp = new RegExp(this.lowerCharacterU.symbol);
        this.characterZRegexp = new RegExp(this.lowerCharacterZ.symbol);
        this.characterXRegexp = new RegExp(this.lowerCharacterX.symbol);
        this.characterSRegexp = new RegExp(this.lowerCharacterS.symbol);
        this.characterRRegexp = new RegExp(this.lowerCharacterR.symbol);
    }
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

export class Grapheme extends Expression {
}

export class AlphabetGrapheme extends Grapheme {
    // for a single grapheme
    //symbolOne: string;
    // for a digraph or trigraph
    //symbolTwo: string;
    // for a trigraphe
    //symbolThree: string;

    characters: Array<string>;

    constructor() {
        super();
        //this.symbolOne = '';
        //this.symbolTwo = '';
        //this.symbolThree = '';
        this.characters = new Array();
    }

    pushCharacter(c: string){
        this.characters.push(c);
        this.literal += c;
    }
}

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

class GraphemicState implements State {
    analyze(context: StateContext) { return null; }
    
    pushToGrapheme(context: StateContext, regex: RegExp){
        let s = context.chars.match(regex)[0];
        context.graphemes[context.graphemes.length-1].pushCharacter(s);
        console.log("context.chars before slicing:%s.length: %d", context.chars, context.chars.length);
        let tmp = context.chars.slice(s.length);
        context.chars = '';
        context.chars = tmp;
        console.log("context.chars after slicing:%s.length: %d", context.chars, context.chars.length);
    }

    analyzeNextState(context: StateContext, state: GraphemicState){
        context.setState(state);
        context.analyze();
    }

    popFromLastGrapheme(context: StateContext){
        return '';
    }

    trimLastCharacterFromLastGrapheme() {

    }
}

class CharacterRState extends GraphemicState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached characterrstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterRRegexp) == 0) {
           this.pushToGrapheme(context, context.gar.characterRRegexp);
        } else {
            console.log("gracefull failing in r");
            //context.chars = context.chars.slice(1);
        }
    }
}

class CharacterGState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactergstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterGRegexp) == 0) {
            let s = context.chars.match(context.gar.characterGRegexp)[0];
            // move the symbolTwo character of the first letter 
            // to the grapheme character of the second letter
            let c = this.popFromLastGrapheme(context);
            this.trimLastCharacterFromLastGrapheme();
            context.graphemes.push(new AlphabetGrapheme());
            context.graphemes[context.graphemes.length-1].pushCharacter(c);
           this.pushToGrapheme(context, context.gar.characterGRegexp);
        } else {
            console.log("gracefull failing in g");
            context.chars = context.chars.slice(1);
        }
    }
}

class CharacterGOrNState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactergornstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterGRegexp) == 0) {
           this.pushToGrapheme(context, context.gar.characterGRegexp);
        } else if(context.chars.search(context.gar.characterNRegexp) == 0) {
           this.pushToGrapheme(context, context.gar.characterNRegexp);
           this.analyzeNextState(context, new CharacterGState());
        } else {
            console.log("gracefull failing gorn");
            context.chars = context.chars.slice(1);
        }
    }
}

class CharacterThreeSState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactersstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterSRegexp) == 0) {
           this.pushToGrapheme(context, context.gar.characterSRegexp);
        } else {
            console.log("gracefull failing in three");
            context.chars = context.chars.slice(1);
        }
    }
}

class CharacterSOrZState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactersorzstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterSRegexp) == 0) {
           this.pushToGrapheme(context, context.gar.characterSRegexp);
        } else if(context.chars.search(context.gar.characterZRegexp) == 0) {
           this.pushToGrapheme(context, context.gar.characterZRegexp);
           this.analyzeNextState(context, new CharacterThreeSState());
        } else {
            console.log("gracefull failing in sorz");
            context.chars = context.chars.slice(1);
        }
    }    
}


class CharacterXState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached characterxstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterXRegexp) == 0) {
            this.pushToGrapheme(context, context.gar.characterXRegexp);
        } else {
            console.log("gracefull failing in x");
            context.chars = context.chars.slice(1);
        }
    }
}

class CharacterSState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactersstate. chars:%s", "color: blue; font-size: medium", context.chars);
        if(context.chars.search(context.gar.characterSRegexp) == 0) {
            this.pushToGrapheme(context, context.gar.characterSRegexp);
        } else {
            console.log("gracefull failing in s");
            //context.chars = context.chars.slice(1);
        }
    }
}

class CharacterOneState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached characteronestate. chars:%s", "color: blue; font-size: medium", context.chars);
        context.graphemes.push(new AlphabetGrapheme());
        if(context.chars.search(context.gar.singleCharactersRegexp) == 0) {
            // terminal state
           this.pushToGrapheme(context, context.gar.singleCharactersRegexp);
        } else if(context.chars.search(context.gar.characterURegexp) == 0) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterURegexp);
            this.analyzeNextState(context, new CharacterRState());
        } else if(context.chars.search(context.gar.characterNRegexp) == 0) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterNRegexp);
            this.analyzeNextState(context, new CharacterGOrNState());
        } else if(context.chars.search(context.gar.characterZRegexp) == 0) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterZRegexp);
            this.analyzeNextState(context, new CharacterSOrZState());
        } else if(context.chars.search(context.gar.characterXRegexp) == 0) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterXRegexp);
            this.analyzeNextState(context, new CharacterXState());
        } else if(context.chars.search(context.gar.characterSRegexp) == 0) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterSRegexp);
            this.analyzeNextState(context, new CharacterSState());
        } else {
            console.log("gracefull failing in characterone");
            context.chars = context.chars.slice(1);
        }
    }
}

class InitialState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached initialstate. context.chars:%s", "color: blue; font-size: medium", context.chars);
        this.analyzeNextState(context, new CharacterOneState());
    }
}

class StateContext {

    private myState: GraphemicState;

    graphemes: Array<AlphabetGrapheme>;

    gar: GraphemicAnalyzerRegex;

    chars: string;

    loopCount: number;

    constructor(chars: string) {
        this.myState = null;
        this.graphemes = new Array();
        this.setState(new InitialState());

        this.gar = new GraphemicAnalyzerRegex();
        this.chars = chars;

        // this is to count the times of falling-back to the context from a terminal state
        this.loopCount = 0;
    }

    setState(newState: GraphemicState) {
        this.myState = newState;
    }

    analyze() {
        do {
            this.loopCount++;
            this.myState.analyze(this);
            console.log("%cremained characters after analyzing: %s", "color: blue; font-size: medium", this.chars);
            try {
                if(this.chars == null || this.chars == undefined || this.chars.length == 0) {
                    break;
                }
            } catch(message) {
                console.log("failed to get length of l");
            }
            this.setState(new InitialState());
        } while(this.chars.length > 0);
        
    }
    
}

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class GraphemicAnalyzer {
    sc: StateContext;

    constructor(l: string) {
        this.sc = new StateContext(l);
        let tmp = l.replace(/\0/g, ""); // get rid of the eof character
        this.sc.chars = tmp;
    }
    
    analyze() {
        this.sc.analyze();
        console.log("%cabout to return grapheme array. length %d. loop count:%d", "color: blue; font-size: medium", this.sc.graphemes.length, this.sc.loopCount);
        console.log(this.sc.graphemes);
        return this.sc.graphemes;
    }
}