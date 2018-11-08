
import { ToneSandhiLexeme } from "./lexeme";
import { ToneSandhiPhraseme } from "./phraseme";


//------------------------------------------------------------------------------
//  Tone Sandhi Phraseme Maker
//------------------------------------------------------------------------------

export class ToneSandhiPhrasemeMaker {
    lexemes: Array<ToneSandhiLexeme>;

    constructor(lexemes: Array<ToneSandhiLexeme>) {
        this.lexemes = new Array();
        this.lexemes = lexemes;
    }

    makePhrasemes() {
        let phrasemes: Array<ToneSandhiPhraseme> = new Array();

        return phrasemes
    }
}