
import { ToneSandhiSyllable, Affix, LexicalStem, RootMorpheme, Allomorph, FreeAllomorph, CheckedAllomorph } from './morpheme';
import { GrammaticalUnit } from './expression'


//------------------------------------------------------------------------------
//  Internal Sandhi Rule
//------------------------------------------------------------------------------


export class InternalSandhiRule {
    lexicalStem: LexicalStem
    Affix: Affix
}

class Assimilation extends InternalSandhiRule {}
class ConsonantMutation extends InternalSandhiRule {}
class Epenthesis extends InternalSandhiRule {}

class InflectionalEnding {
    affix: Affix = new Affix();
    // check if the syllable is in baseform, if not just replace it, a.k.a. pop and push
    // if member allomorph is not null

    //makeAffix(){}
}

class FreeInflectionalEnding extends InflectionalEnding {
    baseAffixes: Array<Affix> = new Array();
/*
    havingZeroAffix() {
        return this.affix.havingZeroToneMark();
    }
*/
    //makeAffix(){}
}

class CheckedInflectionalEnding extends InflectionalEnding {
}

class NasalizationRule extends InternalSandhiRule {}

class InternalSandhiRules {

}


class Lexeme extends GrammaticalUnit {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    inflectionalAffix: InflectionalEnding

    constructor(word: ToneSandhiWord) {
        super();
        this.word = word;
        this.inflectionalAffix = new InflectionalEnding();
    }

    assignInflectionalAffix(allomorph: Allomorph) {
        if(allomorph instanceof FreeAllomorph) {
            let fia = new FreeInflectionalEnding();
            fia.affix.toneMark = allomorph.toneMark;
            for(let key in allomorph.baseToneMarks) {
                let a = new Affix();
                a.toneMark = allomorph.baseToneMarks[key];
                fia.baseAffixes.push(a);
            }
            this.inflectionalAffix = fia;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cia = new CheckedInflectionalEnding();
            cia.affix.toneMark = allomorph.toneMark;
            this.inflectionalAffix = cia;
        }
    }

    assignInternalSandhiRule() {
    }

    replaceLastSyllable(rootMorphemes: Array<RootMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(rootMorphemes[rootMorphemes.length-1].getBaseForms()[0]);
        console.log(word.literal)
        return word;
    }

    getBaseForms(rootMorphemes: Array<RootMorpheme>): Array<ToneSandhiWord> {
        if(this.inflectionalAffix != null) {
            if(this.inflectionalAffix instanceof FreeInflectionalEnding) {
                if(this.inflectionalAffix.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(rootMorphemes)];
                } else if(this.inflectionalAffix.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = rootMorphemes[rootMorphemes.length-1].getBaseForms();
                    console.log(arr)
                    for(let key in arr) {
                        let word = new ToneSandhiWord(this.word.syllables);
                        word.popSyllable();
                        word.pushSyllable(arr[key]);
                        ret.push(word);
                    }
                    return ret;
                }
            } else if(this.inflectionalAffix instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(rootMorphemes)];
            }
        }

        return [];
    }
}

export class PartOfSpeech extends ToneSandhiLexeme {
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

    popSyllable() {
        let tmp = this.literal.substr(0, this.literal.length-this.syllables[this.syllables.length-1].literal.length);
        this.literal = tmp;
        this.syllables = this.syllables.slice(0, this.syllables.length-1);
    }

    pushSyllable(tss: ToneSandhiSyllable) {
        this.syllables.push(tss);
        this.literal += tss.literal;
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
    match(rootMorphemes: Array<RootMorpheme>){
        let partOfSpeeches: Array<PartOfSpeech> = new Array();

        // unpack lexical affixes and get syllables from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in rootMorphemes) {
            syllables.push(rootMorphemes[key].syllable);
        }

        let pos = new PartOfSpeech(new ToneSandhiWord(syllables));
        if(rootMorphemes.length > 0) {
            if(rootMorphemes[rootMorphemes.length-1].allomorphOfToneMorpheme != null) {
                pos.assignInflectionalAffix(rootMorphemes[rootMorphemes.length-1].allomorphOfToneMorpheme);
                console.log("pos got assigned inflectional affix")
            }
        }

        let tmp = pos.getBaseForms(rootMorphemes);
        console.log(tmp.length)
        for(let key in tmp) {
            console.log(tmp[key])
        }
        partOfSpeeches.push(pos);

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