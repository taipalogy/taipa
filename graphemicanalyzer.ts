//import { Operand } from './expression';
import { State } from './state';
import { Context } from './context';
import { Character, Characters } from './metadata';
import { AlphabeticLetter, Letters } from './metadata';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class GraphemicAnalyzerRegex {
    // first grapheme of a letter, digraph, or trigraph
    // digraph: ss, zs, xx, ng, nn, ur, dr, or
    // trigraph: xxx, zzs

    //singleCharacters: string;
    singleCharactersRegexp: RegExp;
    characterGRegexp: RegExp;
    characterNRegexp: RegExp;
    characterRRegexp: RegExp;
    characterSRegexp: RegExp;
    characterURegexp: RegExp;
    characterXRegexp: RegExp;
    characterZRegexp: RegExp;

    constructor(characters: Characters) {
        let singleCharacters = '';
        singleCharacters = characters.lowerCharacterA.symbol
                                + '|' + characters.lowerCharacterB.symbol
                                + '|' + characters.lowerCharacterC.symbol
                                + '|' + characters.lowerCharacterD.symbol
                                + '|' + characters.lowerCharacterE.symbol
                                + '|' + characters.lowerCharacterF.symbol
                                + '|' + characters.lowerCharacterG.symbol
                                + '|' + characters.lowerCharacterH.symbol
                                + '|' + characters.lowerCharacterI.symbol
                                + '|' + characters.lowerCharacterJ.symbol
                                + '|' + characters.lowerCharacterK.symbol
                                + '|' + characters.lowerCharacterL.symbol
                                + '|' + characters.lowerCharacterM.symbol
                                + '|' + characters.lowerCharacterO.symbol
                                + '|' + characters.lowerCharacterP.symbol
                                + '|' + characters.lowerCharacterQ.symbol
                                + '|' + characters.lowerCharacterT.symbol
                                + '|' + characters.lowerCharacterV.symbol
                                + '|' + characters.lowerCharacterW.symbol
                                + '|' + characters.lowerCharacterY.symbol;
        this.singleCharactersRegexp = new RegExp(singleCharacters);
        this.characterGRegexp = new RegExp(characters.lowerCharacterG.symbol);
        this.characterNRegexp = new RegExp(characters.lowerCharacterN.symbol);
        this.characterURegexp = new RegExp(characters.lowerCharacterU.symbol);
        this.characterZRegexp = new RegExp(characters.lowerCharacterZ.symbol);
        this.characterXRegexp = new RegExp(characters.lowerCharacterX.symbol);
        this.characterSRegexp = new RegExp(characters.lowerCharacterS.symbol);
        this.characterRRegexp = new RegExp(characters.lowerCharacterR.symbol);
    }
}

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

class LetterState implements State {
    analyze(context: StateContext) { return null; }
    
    isAtIndexZero(characters: Array<Character>, regex: RegExp) {
        console.log(characters[0].symbol);
        console.log(regex);
        //return characters.filter((c: Character) => c.symbol.search(regex) == 0);
        return characters[0].symbol.search(regex) == 0;
    }

    pushToLetter(context: StateContext, regex: RegExp){
        console.log("context.characters before slicing:%s.length: %d", context.characters, context.characters.length);
        context.letters[context.letters.length-1].pushCharacter(context.characters.shift());
        console.log("context.characters after slicing:%s.length: %d", context.characters, context.characters.length);
    }

    analyzeNextState(context: StateContext, state: LetterState){
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

    popFromLastLetter(context: StateContext){
        return context.letters[context.letters.length-1].characters.pop();
    }

}

class CharacterRState extends LetterState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached characterrstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterRRegexp)) {
           this.pushToLetter(context, context.gar.characterRRegexp);
        } else {
            console.log("gracefull failing in r");
            //context.chars = context.chars.slice(1);
        }
    }
}

class CharacterGState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached charactergstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterGRegexp)) {
            // move the last(2nd) character of the first letter 
            // to the the second letter
            let c = this.popFromLastLetter(context);
            context.letters.push(new AlphabeticLetter());
            context.letters[context.letters.length-1].pushCharacter(c);
            this.pushToLetter(context, context.gar.characterGRegexp);
        } else {
            console.log("gracefull failing in g");
            context.characters.shift();
        }
    }
}

class CharacterGOrNState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached charactergornstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterGRegexp)) {
           this.pushToLetter(context, context.gar.characterGRegexp);
        } else if(this.isAtIndexZero(context.characters, context.gar.characterNRegexp)) {
           this.pushToLetter(context, context.gar.characterNRegexp);
           this.analyzeNextState(context, new CharacterGState());
        } else {
            console.log("gracefull failing gorn");
            context.characters.shift();
        }
    }
}

class CharacterThreeSState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached charactersstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
           this.pushToLetter(context, context.gar.characterSRegexp);
        } else {
            console.log("gracefull failing in three");
            context.characters.shift();
        }
    }
}

class CharacterSOrZState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached charactersorzstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
           this.pushToLetter(context, context.gar.characterSRegexp);
        } else if(this.isAtIndexZero(context.characters, context.gar.characterZRegexp)) {
           this.pushToLetter(context, context.gar.characterZRegexp);
           this.analyzeNextState(context, new CharacterThreeSState());
        } else {
            console.log("gracefull failing in sorz");
            context.characters.shift();
        }
    }    
}


class CharacterXState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached characterxstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterXRegexp)) {
            this.pushToLetter(context, context.gar.characterXRegexp);
            this.analyzeNextState(context, new CharacterXState()); // recursive call
        } else {
            console.log("gracefull failing in x");
            context.characters.shift();
        }
    }
}

class CharacterSState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached charactersstate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
            this.pushToLetter(context, context.gar.characterSRegexp);
        } else {
            console.log("gracefull failing in s");
            //context.characters.shift();
        }
    }
}

class CharacterOneState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached characteronestate. chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        context.letters.push(new AlphabeticLetter());
        if(this.isAtIndexZero(context.characters, context.gar.singleCharactersRegexp)) {
            // terminal state
           this.pushToLetter(context, context.gar.singleCharactersRegexp);
        } else if(this.isAtIndexZero(context.characters, context.gar.characterURegexp)) {
            // non-terminal state
            this.pushToLetter(context, context.gar.characterURegexp);
            this.analyzeNextState(context, new CharacterRState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterNRegexp)) {
            // non-terminal state
            this.pushToLetter(context, context.gar.characterNRegexp);
            this.analyzeNextState(context, new CharacterGOrNState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterZRegexp)) {
            // non-terminal state
            this.pushToLetter(context, context.gar.characterZRegexp);
            this.analyzeNextState(context, new CharacterSOrZState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterXRegexp)) {
            // non-terminal state
            this.pushToLetter(context, context.gar.characterXRegexp);
            this.analyzeNextState(context, new CharacterXState());
        } else if(this.isAtIndexZero(context.characters, context.gar.characterSRegexp)) {
            // non-terminal state
            this.pushToLetter(context, context.gar.characterSRegexp);
            this.analyzeNextState(context, new CharacterSState());
        } else {
            console.log("gracefull failing in characterone");
            context.characters.shift();
        }
    }
}

class LetterInitialState extends LetterState {
    analyze(context: StateContext) {
        console.log("%creached graphemeinitialstate. context.chars:%s", "color: blue; font-size: medium", context.characters[0].symbol);
        this.analyzeNextState(context, new CharacterOneState());
    }
}

class StateContext {

    private myState: LetterState;

    letters: Array<AlphabeticLetter>;

    gar: GraphemicAnalyzerRegex;

    //chars: string;
    characters: Array<Character>;

    loopCount: number;

    constructor() {
        this.myState = null;
        this.characters = new Array();
        this.letters = new Array();
        this.setState(new LetterInitialState());

        this.gar = new GraphemicAnalyzerRegex(new Characters()); // dependency injection via constructor
        //this.chars = chars;

        // this is to count how many times it falls back to the context from a terminal state
        this.loopCount = 0;
    }

    setState(newState: LetterState) {
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
            this.setState(new LetterInitialState());
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
        //this.sc.analyze();
        let ls = new Letters(new Characters());
        let letters = ls.match(this.sc.characters);
        console.log("%cabout to return letter array. length %d. loop count:%d", "color: blue; font-size: medium", this.sc.letters.length, this.sc.loopCount);
        console.log("%cabout to return letter array. length %d.", "color: blue; font-size: medium", letters.length);
        console.log(this.sc.letters);
        console.log(letters);
        //return this.sc.letters;
        return letters;
    }
}