
import { GrammaticalUnit } from './expression'
import { ToneSandhiSyllable } from './syllable';
import { dictionary } from './dictionary';


//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

class Lexeme {
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

//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word extends GrammaticalUnit {
    literal: string;

    evaluate() {}
}

export class InflectionWord extends Word {
}

export class AgglutinationWord extends Word {
}

export class ToneSandhiWord extends Word {
    isBaseForm() {
        // look up in the lexicon to check if this lexeme is in base form
    }
}

//------------------------------------------------------------------------------
//  IWords
//------------------------------------------------------------------------------
/*
export interface IWords {
    list: {
        readonly [index: string]: ToneSandhiWord
    }
}
*/
//------------------------------------------------------------------------------
//  Words
//------------------------------------------------------------------------------

export class Words {
}

export class ToneSandhiWords extends Words {
    match(syllables: Array<ToneSandhiSyllable>){
        let words: Array<ToneSandhiWord> = new Array();
        for(let i in syllables) {
            ;
        }
        return words;
    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Words
//------------------------------------------------------------------------------
/*
export let tonesandhiwords: IWords = {
    list: {
        
    }
}
*/