
import { ToneSandhiWord, InflectionalEnding } from "./lexeme"

//------------------------------------------------------------------------------
//  Tone Group
//------------------------------------------------------------------------------

class ToneGroup {}

class ToneSandhiGroup extends ToneGroup{}

//------------------------------------------------------------------------------
//  Phraseme
//------------------------------------------------------------------------------

class Phraseme {
}

class ToneSandhiPhraseme extends Phraseme {
    phrase

    constructor(words: Array<ToneSandhiWord>) {
        super();
    }

    getBaseForm() {
        
    }
}

//------------------------------------------------------------------------------
//  Phrase
//------------------------------------------------------------------------------

class Phrase {

}

