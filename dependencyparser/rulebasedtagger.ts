import { SYMBOLS } from './symbols'
import { combiningRules } from '../tonal/version2'
import { TonalWord, TonalLemmatizationLexeme, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding,
     } from '../tonal/lexeme'
import { TonalSyllable, syllabifyTonal } from '../tonal/morpheme'
import { MorphemeMaker, Morpheme, TonalCombiningMetaplasm } from '../morpheme'
import { Allomorph, listOfUncombinedCheckedAllomorphs, listOfUncombinedFreeAllomorphs, 
    FreeAllomorph, CheckedAllomorph, ZeroAllomorph, AllomorphY, lowerLettersOfTonal } from '../tonal/version2'
import { AlphabeticLetter, AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { ListOfLexicalRoots } from '../tonal/lexicalroot'
import { InflexionLexeme, LexemeMaker, TonalInflectingMetaplasm } from '../lexeme'

//------------------------------------------------------------------------------
//  Tonal Syllable Metaplasm
//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable>  {
        if(allomorph != null) {
            let s: TonalSyllable = new TonalSyllable(syllable.letters);
            if(allomorph instanceof FreeAllomorph) {
                if(allomorph instanceof ZeroAllomorph) {
                    let cfs = combiningRules.get(allomorph.tonal.getLiteral())
                    for(let k in cfs) {
                        // it should loop only once
                        s.pushLetter(new AlphabeticLetter(cfs[k].characters))
                    }
                    return [s]
                } else if(allomorph instanceof AllomorphY) {
                    s.popLetter()
                    return [s]
                } else {
                    s.popLetter()
                    let cfs = combiningRules.get(allomorph.tonal.getLiteral())
                    let rets = []
                    for(let k in cfs) {
                        s.pushLetter(new AlphabeticLetter(cfs[k].characters))
                        rets.push(new TonalSyllable(s.letters))
                        s.popLetter()
                    }
                    return rets
                }
            } else if(allomorph instanceof CheckedAllomorph) {
                // nothing to pop here
                let cfs = combiningRules.get(allomorph.tonal.getLiteral())
                let rets = []
                for(let k in cfs) {
                    s.pushLetter(new AlphabeticLetter(cfs[k].characters))
                    rets.push(new TonalSyllable(s.letters))
                    s.popLetter()
                }
                return rets
            }
        }
        return []
    }

}

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

class TonalCaseDeclension extends TonalInflectingMetaplasm {}
class TonalAdverbInflexion extends TonalInflectingMetaplasm {}
class TonalParticleInflexion extends TonalInflectingMetaplasm {}
class TonalZeroInflexion extends TonalInflectingMetaplasm {
    // examples: author and authoring. che qahf he. type and typing
}
class TonalInflexion extends TonalInflectingMetaplasm {
    apply(word: TonalWord, morphemes: Array<TonalInflexionMorpheme>) {
        let tonalEnding: TonalSymbolEnding
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                tonalEnding = this.assignTonalEnding(morphemes[morphemes.length-1].allomorph);
            }
        }

        return this.getInflexionForms(word, morphemes, tonalEnding)
    }

    private assignTonalEnding(allomorph: Allomorph) {
        if(allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding()
            fte.allomorph = allomorph
            return fte
        } else if(allomorph instanceof CheckedAllomorph) {
            // append the tonal of the tonal ending
            let cte = new CheckedTonalEnding()
            cte.allomorph = allomorph
            return cte
        }
    }

    private getInflexionForms(word: TonalWord, morphemes: Array<TonalInflexionMorpheme>, tonalEnding: TonalSymbolEnding) {
        if(tonalEnding != null) {
            let wd = new TonalWord(word.syllables);
            let last = morphemes[morphemes.length-1]
            let slbs = last.getForms()
            let rets = []
            for(let i in slbs) {
                wd.popSyllable()
                wd.pushSyllable(slbs[i]);
                rets.push(wd)
            }
            return rets
        }
        return null
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflexion Morpheme
//------------------------------------------------------------------------------

export class TonalInflexionMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph = null; // required to populate stems
    metaplasm: TonalCombiningMetaplasm

    constructor(syllable: TonalSyllable, tsm: TonalCombiningMetaplasm) {
        super()
        this.syllable = syllable;
        this.metaplasm = tsm

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable)
    }
    
    getForms(): any {
        return this.metaplasm.apply(this.syllable, this.allomorph)
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        if(listOfUncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
            return listOfUncombinedCheckedAllomorphs.get(syllable.lastLetter.literal)
        }

        if(listOfUncombinedFreeAllomorphs.has(syllable.lastLetter.literal)) {
            return listOfUncombinedFreeAllomorphs.get(syllable.lastLetter.literal)
        }

        return new ZeroAllomorph()
    }

}

//------------------------------------------------------------------------------
//  Tonal Inflexion Morpheme Maker
//------------------------------------------------------------------------------

export class TonalInflexionMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalCombiningMetaplasm
    
    constructor(graphemes: Array<AlphabeticGrapheme>, tsm: TonalCombiningMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = graphemes;
        this.metaplasm = tsm
    }

    create(syllable: TonalSyllable) { return new TonalInflexionMorpheme(syllable, this.metaplasm) }

    createArray() { return new Array<TonalInflexionMorpheme>() }

    makeMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflection Lexeme
//------------------------------------------------------------------------------

export class TonalInflexionLexeme extends InflexionLexeme {
    word: TonalWord
    wordForms: Array<TonalWord>
    metaplasm: TonalInflectingMetaplasm

    constructor(word: TonalWord) {
        super()
        this.word = word;
    }

    assignWordForms(ms: Array<TonalInflexionMorpheme>, tm: TonalInflexion): any {
        this.wordForms = tm.apply(this.word, ms)
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflexion Lexeme Maker
//------------------------------------------------------------------------------

export class TonalInflexionLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalInflexionMorpheme>;

    constructor(morphemes: Array<TonalInflexionMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalInflexionLexeme(new TonalWord(syllables));
    }

    postprocess(tl: TonalInflexionLexeme) {
        tl.assignWordForms(this.morphemes, new TonalInflexion())

        let lexemes: Array<TonalInflexionLexeme> = new Array();
        lexemes.push(tl);

        //return { lexemes: lexemes, inflectedForms: applied }
        return lexemes
    }
}

//------------------------------------------------------------------------------
//  Tonal Lexeme Analyzer
//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer {
    makeLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let graphemes = gm.makeGraphemes()

        // Morpheme Maker
        let tmm = new TonalInflexionMorphemeMaker(graphemes, new TonalCombiningForms());
        let morphemes = tmm.makeMorphemes();

        // Lexeme Maker
        let tslm = new TonalInflexionLexemeMaker(morphemes);
        let lexemes = tslm.makeLexemes();

        return lexemes;
    }
}

//------------------------------------------------------------------------------
//  Construction of Phrase
//------------------------------------------------------------------------------

class ConstructionOfPhrase {
    elements: Array<ConstructionElement> = new Array()

    constructor(arr: Array<ConstructionElement>){
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

//------------------------------------------------------------------------------
//  Construction Element
//------------------------------------------------------------------------------

class ConstructionElement {
    lexeme: TonalInflexionLexeme

    constructor(l: TonalInflexionLexeme) {
        this.lexeme = l
    }

    check(w: TonalWord) {
        if(this.lexeme.word.literal === w.literal) {
            return true
        }
        return false
    }

}

class Transitive extends ConstructionElement {}

class Proceeding extends ConstructionElement {}

class Intransitive extends ConstructionElement {}

//------------------------------------------------------------------------------
//  Type of Construction
//------------------------------------------------------------------------------

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase> = null;
}

class VerbPhrase extends TypeOfConstruction {

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {
        super()

        let analyzer = new TonalInflextionAnalyzer()

        let l1 = analyzer.makeLexemes('oannzs')
        l1[0].partOfSpeech = SYMBOLS.VERB
        let transitive = new Transitive(l1[0])
        
        let l2 = analyzer.makeLexemes('goay')
        l2[0].partOfSpeech = SYMBOLS.PERSONALPRONOUN
        let proceeding = new Proceeding(l2[0])

        let l3 = analyzer.makeLexemes('churw')
        l3[0].partOfSpeech = SYMBOLS.VERB
        let intransitive = new Intransitive(l3[0])

        this.constructions.push(new ConstructionOfPhrase([transitive, proceeding, intransitive]))

    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    constructions = []
}

//------------------------------------------------------------------------------
//  Rule-Based Tagger
//------------------------------------------------------------------------------

export class RuleBasedTagger {

    lexemes: Array<TonalInflexionLexeme> = new Array();

    constructor(lexemes: Array<TonalLemmatizationLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<TonalLemmatizationLexeme>) {
        // take in lemma lexemes and then check them against parsing lexemes
        // store matched parsing lexemes in nodes
        let w: TonalWord = lexemes[0].word

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        // if w is an instance of TonalWord or tonefree word
        for(let key in vp.constructions) {
            if(vp.constructions[key].elements[0].check(w)) {
                cop = vp.constructions[key]
            }
        }

        for(let k in lexemes) {
            this.lexemes.push(vp.constructions[0].elements[k].lexeme)
        }
    }
}