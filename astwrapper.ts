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
}

export class PhraseAstWrapper extends AstWrapperTwo {

}

export class WordAstWrapper extends AstWrapperTwo {
  
}

export class SyllableAstWrapper extends AstWrapperTwo {
    morpheme: Morpheme;
    constructor(morpheme: Morpheme) {
        super();
    }
}

export class LetterExpression extends AstWrapperTwo {
    grapheme: Grapheme;
    constructor(grapheme: Grapheme) {
        super();
        this.grapheme = grapheme;
    }
}