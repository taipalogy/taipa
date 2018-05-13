import { Expression } from './expression';
import { Syllable } from './syllables';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class LexicalAnalyzerRegex {
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme implements Expression {
    literal: string;

    evaluate() {}
}

export class InflectionLexeme extends Lexeme {

    stem: string = "";
    suffix: string = "";    
}

export class AgglutinationLexeme extends Lexeme {

    stem: string = "";
    suffix: string = "";    
}

export class ToneSandhiLexeme extends Lexeme {

    stem: string = "";
    suffix: string = "";

    isBaseForm() {
        // look up in the lexicon to check if this lexeme is in base form
    }
}


//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------


export interface State {
}

class LexicalState implements State {}

class ToneSandhiWordState extends LexicalState {

}

class StateContext {

    private myState: LexicalState;

    lexemes: Array<ToneSandhiLexeme>;

    constructor() {
        this.myState = new LexicalState();
        this.lexemes = new Array();
        this.setState(new ToneSandhiWordState());
    }

    setState(newState: LexicalState){}
    analyze(morphemes: Array<Syllable>){}
}

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiLexicalAnalyzer {
    morphemes: Array<Syllable>;
    sc: StateContext;

    constructor(morphemes: Array<Syllable>) {
        //this.morhemes = new Array();
        this.morphemes = morphemes;
        console.log(this.morphemes);
        this.sc = new StateContext();
    }

    analyze() {
        this.sc.analyze(this.morphemes);
        console.log(this.sc.lexemes);
        return this.sc.lexemes;
    }
}