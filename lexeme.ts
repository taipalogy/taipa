
import { ToneSandhiSyllable, Affix, ToneSandhiMorpheme, FreeAllomorph, CheckedAllomorph, Allomorph, FreeAllomorphCyclingRules } from './morpheme';
import { GraphemeMaker } from './graphememaker';
import { ToneSandhiMorphemeMaker } from './morphememaker';
import { ToneSandhiLexemeMaker } from './lexememaker';


//------------------------------------------------------------------------------
//  Internal Sandhi Rule
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Inflectional Ending and Inflectional Tone Mark
//------------------------------------------------------------------------------

class InflectionalToneMark {
    affix: Affix = null;
}

export class InflectionalEnding {
    affix: Affix = null;
}

export class FreeInflectionalEnding extends InflectionalEnding {
    affix: Affix = new Affix();
    baseAffixes: Array<Affix> = new Array();
}

class CheckedInflectionalEnding extends InflectionalEnding {
    affix: Affix = new Affix();
}

//------------------------------------------------------------------------------
//  Free Inflectional Ending Cycling Rules
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------

class InputingLexeme extends Lexeme {}

export class ToneInputingLexeme extends InputingLexeme {
    // this is used in rule-based tagger for both tone-sandhi and 
    // tone-mark-less lexemes
    word: ToneWord
}

class ToneMarkLessLexeme extends ToneInputingLexeme {}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------

export class ToneSandhiInputingLexeme extends ToneInputingLexeme {
    word: ToneSandhiWord
    inflectionalEnding: InflectionalEnding = null
    lemmata: Array<ToneSandhiWord>

    constructor(word: ToneSandhiWord) {
        super();
        this.word = word;
    }

    assignInflectionalEnding(allomorph: Allomorph) {
        let facrs = new FreeAllomorphCyclingRules();
        if(allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            fie.affix.toneMark = allomorph.toneMark;
            for(let key in facrs.rules[allomorph.getLiteral()]) {
                //console.log(`k is ${key}`)
                let a = new Affix();
                a.toneMark = facrs.rules[allomorph.getLiteral()][key];
                //console.log(`a.toneMark is ${a.toneMark}`)
                fie.baseAffixes.push(a);
            }
            this.inflectionalEnding = fie;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.toneMark = allomorph.toneMark;
            this.inflectionalEnding = cie;
        }
    }

    replaceLastSyllable(morphemes: Array<ToneSandhiMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(morphemes[morphemes.length-1].getBaseForms()[0]);
        //console.log(word.literal)
        return word;
    }

    getBaseForms(morphemes: Array<ToneSandhiMorpheme>): Array<ToneSandhiWord> {
        if(this.inflectionalEnding != null) {
            if(this.inflectionalEnding instanceof FreeInflectionalEnding) {
                if(this.inflectionalEnding.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(morphemes)];
                } else if(this.inflectionalEnding.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].getBaseForms();
                    //console.log(arr)
                    for(let key in arr) {
                        let word = new ToneSandhiWord(this.word.syllables);
                        word.popSyllable();
                        word.pushSyllable(arr[key]);
                        ret.push(word);
                    }
                    return ret;
                }
            } else if(this.inflectionalEnding instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(morphemes)];
            }
        }

        return [];
    }

    populateLemmata(morphemes: Array<ToneSandhiMorpheme>) {
        this.lemmata = new Array();

        // turn morphemes into lemmas
        let lms = this.getBaseForms(morphemes);
        //console.log(tmp.length)
        if(lms.length > 0) {
            for(let key in lms) {
                //console.log(bfs[key].literal)
                this.lemmata.push(lms[key]);
            }
        }

    }
}

//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
}

export class ToneWord extends Word {}
export class ToneMarkLessWord extends ToneWord {}

//------------------------------------------------------------------------------
//  Tone Sandhi Word
//------------------------------------------------------------------------------

export class ToneSandhiWord extends ToneWord {
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
        // trim the literal
        let tmp = this.literal.substr(0, this.literal.length-this.syllables[this.syllables.length-1].literal.length);
        this.literal = tmp;
        // get rid off the last syllable from array
        this.syllables = this.syllables.slice(0, this.syllables.length-1);
    }

    pushSyllable(tss: ToneSandhiSyllable) {
        this.syllables.push(tss);
        // concatenate the new syllable
        this.literal += tss.literal;
    }
}

//------------------------------------------------------------------------------
//  Inflectional Lexeme
//------------------------------------------------------------------------------

class InflectionalLexeme extends Lexeme {
    word: InflectiveWord
}

//------------------------------------------------------------------------------
//  Dummy Lexeme
//------------------------------------------------------------------------------

export class DummyLexeme extends Lexeme {
    word: Word
}

//------------------------------------------------------------------------------
//  Inflectional Word
//------------------------------------------------------------------------------

export class InflectiveWord extends Word {
}

export class AgglutinativeWord extends Word {
}

export class TurnLexemeFromString {
    turnLexeme(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiMorphemeMaker(graphemes);
        let morphemes = tsmm.makeMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiLexemeMaker(morphemes);
        let lexemes = tslm.makeLexemes();

        return lexemes;
    }
}