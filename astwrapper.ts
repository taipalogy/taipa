import { Expression } from './expression';
import { Morpheme } from './morphologicalanalyzer';
import { Grapheme } from './graphemicanalyzer';

//-----------------------------------------------------------------------------
//  Adapter Pattern
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//  Wrapper for Abstract Syntax Tree
//-----------------------------------------------------------------------------

export class AstWrapperTwo extends Expression {
    literal: string;

    isBase(){}
}

export class Operand extends AstWrapperTwo {

    isInitialCapitalized() {}
}

export class PhraseExpression extends Operand {

}

export class WordExpression extends Operand {

}

export class SyllableExpression extends Operand {
    morpheme: Morpheme;
    constructor(morpheme: Morpheme) {
        super();
        this.morpheme = morpheme;
    }
}

export class LetterExpression extends Operand {
    grapheme: Grapheme;
    constructor(grapheme: Grapheme) {
        super();
        this.grapheme = grapheme;
    }
}