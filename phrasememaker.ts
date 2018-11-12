
import { ToneSandhiLexeme, ToneSandhiWord } from "./lexeme";
import { ToneSandhiPhraseme, ToneSandhiPhrase, ToneGroup } from "./phraseme";


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

        // unpack lexemes and take words out from them
        let words: Array<ToneSandhiWord> = new Array();
        for(let key in this.lexemes) {
            words.push(this.lexemes[key].word);
        }
        
        let tsp = new ToneSandhiPhraseme(new ToneSandhiPhrase(words));
        if(this.lexemes.length > 0) {
            let tg = new ToneGroup();
            for(let k in this.lexemes) {
            }
        }

        phrasemes.push(tsp);

        return phrasemes
    }
}