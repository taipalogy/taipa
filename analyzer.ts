import { ToneSandhiWord } from "./word"
import { extend } from "webdriver-js-extender";

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {

}

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

class Morpheme {

}

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

class Lexeme {
}

//------------------------------------------------------------------------------
//  Phraseme
//------------------------------------------------------------------------------

class Phraseme {

}

//------------------------------------------------------------------------------
//  Lexemes
//------------------------------------------------------------------------------

abstract class ToneSandhiLexeme extends Lexeme {
    baseForm: ToneSandhiWord
}

class PronounLexeme extends ToneSandhiLexeme {
    sandhiRule: string
    hanji: string
}

class ParticleLexeme extends ToneSandhiLexeme {
    sandhiRule: string
}

class CopulaLexeme extends ToneSandhiLexeme {
}

class VerbLexeme extends ToneSandhiLexeme {
    sandhiRule: string
}

class AdverbLexeme extends ToneSandhiLexeme {
}
