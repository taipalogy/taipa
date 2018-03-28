import { Expression } from './expression';
import { Morpheme } from './morphologicalanalyzer';
import { State } from './state';

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
    analyze(morphemes: Array<Morpheme>){}
}

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiLexicalAnalyzer {
    morphemes: Array<Morpheme>;
    sc: StateContext;

    constructor(morphemes: Array<Morpheme>) {
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