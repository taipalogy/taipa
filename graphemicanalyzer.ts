import { Expression } from './expression';
import { State } from './state';

//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

export class Character {
    symbol: string;
    constructor(s: string) {
        this.symbol = s;
    }
}

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    // first grapheme of a letter, digraph, or trigraph
    // digraph: ss, zs, xx, ng, nn, ur, dr, or
    // trigraph: xxx, zzs

    characterA = new Character('a');
    characterB = new Character('b');
    characterC = new Character('c');
    characterD = new Character('d');
    characterE = new Character('e');
    characterF = new Character('f');
    characterG = new Character('g');
    characterH = new Character('h');
    characterI = new Character('i');
    characterJ = new Character('j');
    characterK = new Character('k');
    characterL = new Character('l');
    characterM = new Character('m');
    characterN = new Character('n');
    characterO = new Character('o');
    characterP = new Character('p');
    characterQ = new Character('q');
    characterR = new Character('r');
    characterS = new Character('s');
    characterT = new Character('t');
    characterU = new Character('u');
    characterV = new Character('v');
    characterW = new Character('w');
    characterX = new Character('x');
    characterY = new Character('y');
    characterZ = new Character('z');

    //singleCharacters: string;
    singleCharactersRegexp: RegExp;
    characterGRegexp: RegExp;
    characterNRegexp: RegExp;
    characterRRegexp: RegExp;
    characterSRegexp: RegExp;
    characterURegexp: RegExp;
    characterXRegexp: RegExp;
    characterZRegexp: RegExp;

    constructor() {
        let singleCharacters = '';
        singleCharacters = this.characterA.symbol
                                + '|' + this.characterB.symbol
                                + '|' + this.characterC.symbol
                                + '|' + this.characterD.symbol
                                + '|' + this.characterE.symbol
                                + '|' + this.characterF.symbol
                                + '|' + this.characterG.symbol
                                + '|' + this.characterH.symbol
                                + '|' + this.characterI.symbol
                                + '|' + this.characterJ.symbol
                                + '|' + this.characterK.symbol
                                + '|' + this.characterL.symbol
                                + '|' + this.characterM.symbol
                                + '|' + this.characterO.symbol
                                + '|' + this.characterP.symbol
                                + '|' + this.characterQ.symbol
                                + '|' + this.characterT.symbol
                                + '|' + this.characterV.symbol
                                + '|' + this.characterW.symbol
                                + '|' + this.characterY.symbol;
        this.singleCharactersRegexp = new RegExp(singleCharacters);
        this.characterGRegexp = new RegExp(this.characterG.symbol);
        this.characterNRegexp = new RegExp(this.characterN.symbol);
        this.characterURegexp = new RegExp(this.characterU.symbol);
        this.characterZRegexp = new RegExp(this.characterZ.symbol);
        this.characterXRegexp = new RegExp(this.characterX.symbol);
        this.characterSRegexp = new RegExp(this.characterS.symbol);
        this.characterRRegexp = new RegExp(this.characterR.symbol);
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
    characters: Array<Character>;

    constructor(characters?: Array<Character>) {
        super();
        this.characters = new Array();
        if(characters != null) {
            let len = characters.length;
            for(var i = 0; i < len; i++) {
                //this.characters.push(characters[i]);
                //this.literal += characters[i].symbol;
                this.pushCharacter(characters[i]);
            }
        }
    }

    pushCharacter(c: Character){
        this.characters.push(c);
        this.literal += c.symbol;
    }
}

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

class GraphemicState implements State {
    analyze(context: StateContext) { return null; }
    
    isAtIndexZero(characters: Array<Character>, regex: RegExp) {
        console.log(characters[0].symbol);
        console.log(regex);
        //return characters.filter((c: Character) => c.symbol.search(regex) == 0);
        return characters[0].symbol.search(regex) == 0;
    }

    pushToGrapheme(context: StateContext, regex: RegExp){
        //let s = context.chars.match(regex)[0];
        //context.graphemes[context.graphemes.length-1].pushCharacter(s);
        console.log("context.characters before slicing:%s.length: %d", context.characters, context.characters.length);
        //let tmp = context.chars.slice(s.length);
        //context.chars = '';
        //context.chars = tmp;
        context.graphemes[context.graphemes.length-1].pushCharacter(context.characters.shift());
        console.log("context.characters after slicing:%s.length: %d", context.characters, context.characters.length);
    }

    analyzeNextState(context: StateContext, state: GraphemicState){
        try{
            if(context.characters.length > 0) {
                context.setState(state);
                context.analyze();
            }
        } catch (message) {
            console.log("failed in analyzeNextState method");
            //context.characters.shift();
        }
    }

    popFromLastGrapheme(context: StateContext){
        return context.graphemes[context.graphemes.length-1].characters.pop();
    }

}

class CharacterRState extends GraphemicState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached characterrstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterRRegexp)) {
           this.pushToGrapheme(context, context.gar.characterRRegexp);
        } else {
            console.log("gracefull failing in r");
            //context.chars = context.chars.slice(1);
        }
    }
}

class CharacterGState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactergstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterGRegexp)) {
            // move the symbolTwo character of the first letter 
            // to the grapheme character of the second letter
            let c = this.popFromLastGrapheme(context);
            context.graphemes.push(new AlphabetGrapheme());
            context.graphemes[context.graphemes.length-1].pushCharacter(c);
            this.pushToGrapheme(context, context.gar.characterGRegexp);
        } else {
            console.log("gracefull failing in g");
            context.characters.shift();
        }
    }
}

class CharacterGOrNState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactergornstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterGRegexp)) {
           this.pushToGrapheme(context, context.gar.characterGRegexp);
        } else if(this.isAtIndexZero(context.characters, context.gar.characterNRegexp)) {
           this.pushToGrapheme(context, context.gar.characterNRegexp);
           this.analyzeNextState(context, new CharacterGState());
        } else {
            console.log("gracefull failing gorn");
            context.characters.shift();
        }
    }
}

class CharacterThreeSState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactersstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
           this.pushToGrapheme(context, context.gar.characterSRegexp);
        } else {
            console.log("gracefull failing in three");
            context.characters.shift();
        }
    }
}

class CharacterSOrZState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactersorzstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
           this.pushToGrapheme(context, context.gar.characterSRegexp);
        } else if(this.isAtIndexZero(context.characters, context.gar.characterZRegexp)) {
           this.pushToGrapheme(context, context.gar.characterZRegexp);
           this.analyzeNextState(context, new CharacterThreeSState());
        } else {
            console.log("gracefull failing in sorz");
            context.characters.shift();
        }
    }    
}


class CharacterXState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached characterxstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterXRegexp)) {
            this.pushToGrapheme(context, context.gar.characterXRegexp);
            this.analyzeNextState(context, new CharacterXState()); // recursive call
        } else {
            console.log("gracefull failing in x");
            context.characters.shift();
        }
    }
}

class CharacterSState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached charactersstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
            this.pushToGrapheme(context, context.gar.characterSRegexp);
        } else {
            console.log("gracefull failing in s");
            //context.characters.shift();
        }
    }
}

class CharacterOneState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached characteronestate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        context.graphemes.push(new AlphabetGrapheme());
        if(this.isAtIndexZero(context.characters, context.gar.singleCharactersRegexp)) {
            // terminal state
           this.pushToGrapheme(context, context.gar.singleCharactersRegexp);
        } else if(this.isAtIndexZero(context.characters, context.gar.characterURegexp)) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterURegexp);
            this.analyzeNextState(context, new CharacterRState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterNRegexp)) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterNRegexp);
            this.analyzeNextState(context, new CharacterGOrNState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterZRegexp)) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterZRegexp);
            this.analyzeNextState(context, new CharacterSOrZState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterXRegexp)) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterXRegexp);
            this.analyzeNextState(context, new CharacterXState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
            // non-terminal state
            this.pushToGrapheme(context, context.gar.characterSRegexp);
            this.analyzeNextState(context, new CharacterSState());
        } else {
            console.log("gracefull failing in characterone");
            context.characters.shift();
        }
    }
}

class GraphemeInitialState extends GraphemicState {
    analyze(context: StateContext) {
        console.log("%creached graphemeinitialstate. context.chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        this.analyzeNextState(context, new CharacterOneState());
    }
}

class StateContext {

    private myState: GraphemicState;

    graphemes: Array<AlphabetGrapheme>;

    gar: GraphemicAnalyzerRegex;

    //chars: string;
    characters: Array<Character>;

    loopCount: number;

    constructor() {
        this.myState = null;
        this.characters = new Array();
        this.graphemes = new Array();
        this.setState(new GraphemeInitialState());

        this.gar = new GraphemicAnalyzerRegex();
        //this.chars = chars;

        // this is to count how many times it falls back to the context from a terminal state
        this.loopCount = 0;
    }

    setState(newState: GraphemicState) {
        this.myState = newState;
    }

    analyze() {
        do {
            this.loopCount++;
            this.myState.analyze(this);
            console.log("%cremained length of characters after analyzing: %s", "color: blue; font-size: medium", this.characters.length);
            try {
                if(this.characters == null || this.characters == undefined || this.characters.length == 0) {
                    break;
                }
            } catch(message) {
                console.log("failed to get length of l");
            }
            this.setState(new GraphemeInitialState());
        } while(this.characters.length > 0);
        
    }
    
}

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class GraphemicAnalyzer {
    sc: StateContext;

    constructor(l: string) {
        this.sc = new StateContext();
        let str = l.replace(/\0/g, ""); // get rid of the eof character
        l = str;
        let len = l.length;
        for(var i = 0; i < len; i++) {
            this.sc.characters.push(new Character(l.charAt(i)));
        }
    }
    
    analyze() {
        this.sc.analyze();
        console.log("%cabout to return grapheme array. length %d. loop count:%d", "color: blue; font-size: medium", this.sc.graphemes.length, this.sc.loopCount);
        console.log(this.sc.graphemes);
        return this.sc.graphemes;
    }
}