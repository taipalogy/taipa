
import { ToneSandhiSyllable, LexicalAffix, InternalSandhiRule, FreeToneSandhiRule, CheckedToneSandhiRule } from './morpheme';
import { GrammaticalUnit } from './expression'

class InflectionalAffix {}

class InflectionalSuffix extends InflectionalAffix {}

class InflectionalFreeTone extends InflectionalSuffix {
}

class InflectionalCheckedTone extends InflectionalSuffix {
}

class InflectionalFreeToneX extends InflectionalFreeTone {}
class InflectionalFreeToneY extends InflectionalFreeTone {}
class InflectionalCheckedToneX extends InflectionalCheckedTone {}
class InflectionalCheckedToneY extends InflectionalCheckedTone {}

class ExternalSandhiRule {
    internalSandhiRule: InternalSandhiRule

    isEqualTo(word: ToneSandhiWord) {
        if(this.internalSandhiRule.isEqualTo(word.syllables[word.syllables.length-1])) {
            return true;
        }
        return false;
    }
}


class ExternalSandhiRules {



}


class Lexeme extends GrammaticalUnit {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    externalSandhiRule: ExternalSandhiRule
    baseForm
    assimilation
    consonantMutation

    constructor(word: ToneSandhiWord) {
        super();
        this.word = word;
        this.assignExternalSandhiRule();
    }

    assignExternalSandhiRule() {
        //let results = new ExternalSandhiRule().isEqualTo(this.word);
    }

    getBaseForm() {
    }
}

export class PartOfSpeech extends ToneSandhiLexeme {
    //lexicalAffixes: Array<LexicalAffix> = null;
    
    externalSandhiRules: ExternalSandhiRules = null;
    isAssimilated() {}
    isConsonantMutated() {}
}

class Verb extends PartOfSpeech {}
class Noun extends PartOfSpeech {}
class Adjective extends PartOfSpeech {}
class Particle extends PartOfSpeech {}
class Preposition extends PartOfSpeech {}
class Pronoun extends PartOfSpeech {}
class Adverb extends PartOfSpeech {}



//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Lexemes
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';

    evaluate() {}
}

export class InflectionWord extends Word {
}

export class AgglutinationWord extends Word {
}

export class ToneSandhiWord extends Word {
    syllables: Array<ToneSandhiSyllable>;

    constructor(syllables?: Array<ToneSandhiSyllable>) {
        super();
        this.syllables = new Array();
        if(syllables != undefined) {
            let len = syllables.length;
            for(var i = 0; i < len; i++) {
                this.pushSyllable(syllables[i]);
            }
        }
    }

    isBaseForm() {
        // look up in the lexicon to check if this lexeme is in base form
    }

    pushSyllable(tss: ToneSandhiSyllable) {
        this.syllables.push(tss);
        this.literal += tss.literal;
        console.log("%s", tss.literal);
    }
}

//------------------------------------------------------------------------------
//  IWords
//------------------------------------------------------------------------------
/*
export interface IWords {
    readonly [index: string]: ToneSandhiWord
}
*/
//------------------------------------------------------------------------------
//  Words
//------------------------------------------------------------------------------

export class Words {
}

export class ToneSandhiWords extends Words {
    create(syllables: Array<ToneSandhiSyllable>) {
        return new ToneSandhiWord(syllables);
    }
    //match(syllables: Array<ToneSandhiSyllable>){
    match(lexicalAffixes: Array<LexicalAffix>){
        let words: Array<ToneSandhiWord> = new Array();
        let partOfSpeeches: Array<PartOfSpeech> = new Array();
        // unpack lexical affixes and get syllables from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in lexicalAffixes) {
            syllables.push(lexicalAffixes[key].syllable);
        }
        //words.push(this.create(syllables));
        let pos = new PartOfSpeech(this.create(syllables));
        partOfSpeeches.push(pos);
        //return words;
        return partOfSpeeches
    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Words
//------------------------------------------------------------------------------
/*
export let tonesandhiwords: IWords = {
}
*/