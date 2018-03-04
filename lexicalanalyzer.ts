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
    left: Lexeme;
    right: Lexeme;
}

export class AndLexemeExpression extends Lexeme {
    constructor() {
        super();
        this.literal = '&';
    }
}

export class OrLexemeExpression extends Lexeme {
    constructor() {
        super();
        this.literal = '|';
    }
}

export class InflectionPartOfSpeech extends Lexeme {

    stem: string = "";
    suffix: string = "";    
}

export class AgglutinationPartOfSpeech extends Lexeme {

    stem: string = "";
    suffix: string = "";    
}

export class ToneSandhiPartOfSpeech extends Lexeme {

    stem: string = "";
    suffix: string = "";

    isBaseForm() {
        // look up in the lexicon to check if this lexeme is in base form
        return true;
    }
}
