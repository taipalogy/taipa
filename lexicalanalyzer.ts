import { Expression } from './expression';

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
