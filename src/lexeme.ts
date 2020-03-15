import { Morpheme } from './morpheme';

//------------------------------------------------------------------------------

export abstract class Lexeme {}

//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
}

//------------------------------------------------------------------------------

export abstract class LexemeMaker {
    protected abstract make(ms: Array<Morpheme>): Lexeme;
}
