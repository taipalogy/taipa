
import { ToneSandhiSyllable, LexicalAffix, LexicalStem, Affix } from './morpheme';
import { GrammaticalUnit } from './expression'

//------------------------------------------------------------------------------
//  Internal Sandhi Rule
//------------------------------------------------------------------------------

class DerivationalAffix {}
class InflectionalAffix {}

export class InternalSandhiRule {}

class ToneSandhiRule extends InternalSandhiRule {
    lexicalStem: LexicalStem
    affix: Affix

    isEqualTo(syllable: ToneSandhiSyllable) {}
}

class FreeToneLexicalStem extends LexicalStem {}
class CheckedToneLexicalStem extends LexicalStem {}

class NeutralToneLexicalStemH extends CheckedToneLexicalStem {}
class CheckedToneLexicalStemBDGF extends CheckedToneLexicalStem {}

export class FreeToneSuffix extends Affix {}
export class CheckedToneSuffix extends Affix {}

class ZeroSuffix extends FreeToneSuffix {}
class SuffixZS extends FreeToneSuffix {}
export class SuffixW extends FreeToneSuffix {}

export class SuffixY extends Affix {}
export class SuffixX extends Affix {}

class SuffixP extends CheckedToneSuffix {}
class SuffixT extends CheckedToneSuffix {}
class SuffixK extends CheckedToneSuffix {}
class SuffixH extends CheckedToneSuffix {}
class SuffixB extends CheckedToneSuffix {}
class SuffixD extends CheckedToneSuffix {}
class SuffixG extends CheckedToneSuffix {}
class SuffixF extends CheckedToneSuffix {}

class FreeToneInterfix extends Affix {}
class CheckedToneInterfix extends Affix {}

class InterfixZS extends FreeToneInterfix {}
class InterfixY extends FreeToneInterfix {}
class InterfixW extends FreeToneInterfix {}
class InterfixSS extends FreeToneInterfix {}
class InterfixXX extends FreeToneInterfix {}
class InterfixXXX extends FreeToneInterfix {}

class InterfixP extends CheckedToneInterfix {}
class InterfixT extends CheckedToneInterfix {}
class InterfixK extends CheckedToneInterfix {}
class InterfixH extends CheckedToneInterfix {}
class InterfixB extends CheckedToneInterfix {}
class InterfixD extends CheckedToneInterfix {}
class InterfixG extends CheckedToneInterfix {}
class InterfixF extends CheckedToneInterfix {}
class InterfixX extends CheckedToneInterfix {}

export class FreeToneSandhiRule extends ToneSandhiRule {
    baseAffix: Affix
}

export class CheckedToneSandhiRule extends ToneSandhiRule {
}

class FreeToneSandhiRuleX extends FreeToneSandhiRule {
    baseAffix = null;
}

class FreeToneSandhiRuleY extends FreeToneSandhiRule {
    lexicalStem = new FreeToneLexicalStem();
    affix = new SuffixY()
    baseAffix = new SuffixW();
}

class CheckedToneSandhiRuleX extends CheckedToneSandhiRule {
    lexicalStem = new CheckedToneLexicalStemBDGF();
    affix = new SuffixX();
}

class CheckedToneSandhiRuleY extends CheckedToneSandhiRule {
    lexicalStem = new NeutralToneLexicalStemH();
    affix = new SuffixY();
}


class NasalizationRule extends InternalSandhiRule {}

class InternalSandhiRules {
}


class Lexeme extends GrammaticalUnit {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    internalSandhiRule: InternalSandhiRule
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
    
    internalSandhiRules: InternalSandhiRule = null;
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