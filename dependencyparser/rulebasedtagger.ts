import { SYMBOLS } from './symbols'
import { combiningRules } from '../tonal/version2'
import { TonalWord, TonalLemmatizationLexeme, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding, TonalWordMetaplasm,
     } from '../tonal/lexeme'
import { TonalSyllable, syllabifyTonal, TonalCombiningMetaplasm } from '../tonal/morpheme'
import { MorphemeMaker, Morpheme } from '../morpheme'
import { Allomorph, listOfUncombinedCheckedAllomorphs, listOfUncombinedFreeAllomorphs, 
    FreeAllomorph, CheckedAllomorph, ZeroAllomorph, AllomorphY, lowerLettersOfTonal } from '../tonal/version2'
import { AlphabeticLetter, Tonal, AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { ListOfLexicalRoots } from '../tonal/lexicalroot'
import { InflexionLexeme, LexemeMaker } from '../lexeme'

export let FORMS = {
    'VERB': {
        'intransitive': 'baseForm',
        'transitive': 'sandhiForm',
        'ditransitive': 'sandhiForm',
        'causative': 'sandhiForm',
        'perfective': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm', // adverbial
    },
    'ADJECTIVE': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'adverbial': 'sandhiForm', // ay
    },
    'NOUN': {
        'basic': 'baseForm',
        'adverbial': 'sandhiForm',
    },
    'PRONOUN': {},
    'PARTICLE': {
        'basic': 'baseForm',
        'continuative': 'sandhiForm', // adverbial
    },
    'PREPOSITION': {},
    'EXCLAMATION': {},
    'DEMONSTRATIVEPRONOUN': {},
    'PERSONALPRONOUN': {
        'basic': 'baseForm',
        'proceeding': 'sandhiForm',
        'terminalFirst': 'sandhiForm',
        'terminalSeventh': 'sandhiForm', // complement
        'terminalThird': 'sandhiForm', // complement

        'adverbial': 'sandhiForm',

        'indirectObject': 'sandhiForm', // proceeding
        'directObject': 'baseForm',
    },
    'DETERMINER': {},
    'QUANTIFIER': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm',
        'adverbial': 'sandhiForm',
    },
}

//------------------------------------------------------------------------------
//  Tonal Syllable Metaplasm
//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
    assignAllomorph(syllable: TonalSyllable): Allomorph {
        if(listOfUncombinedCheckedAllomorphs.has(syllable.lastLetter.literal)) {
            return listOfUncombinedCheckedAllomorphs.get(syllable.lastLetter.literal)
        }

        if(listOfUncombinedFreeAllomorphs.has(syllable.lastLetter.literal)) {
            return listOfUncombinedFreeAllomorphs.get(syllable.lastLetter.literal)
        }

        return new ZeroAllomorph()
    }

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

class TonalCaseDeclension extends TonalWordMetaplasm {}
class TonalAdverbInflexion extends TonalWordMetaplasm {}
class TonalParticleInflexion extends TonalWordMetaplasm {}
class TonalZeroInflexion extends TonalWordMetaplasm {
    // examples: author and authoring. che qahf he
}
class TonalInflexion extends TonalWordMetaplasm {
    word: TonalWord
    morphemes: Array<TonalInflexionMorpheme>
    tonalEnding: TonalSymbolEnding = null

    apply(word: TonalWord, morphemes: Array<TonalInflexionMorpheme>) {
        this.word = word
        this.morphemes = morphemes
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                this.assignTonalEnding(morphemes[morphemes.length-1].allomorph);
            }
        }

        return this.getInflexionForms()
    }

    assignTonalEnding(allomorph: Allomorph) {
        if(allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding()
            fte.allomorph = allomorph
            this.tonalEnding = fte
        } else if(allomorph instanceof CheckedAllomorph) {
            // append the tonal of the tonal ending
            let cte = new CheckedTonalEnding()
            cte.allomorph = allomorph
            this.tonalEnding = cte
        }
    }

    private getInflexionForms() {
        if(this.tonalEnding != null) {
            let wd = new TonalWord(this.word.syllables);
            let last = this.morphemes[this.morphemes.length-1]
            let slbs = last.apply()
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
        this.allomorph = this.metaplasm.assignAllomorph(this.syllable)
    }
    
    apply(): any {
        return this.metaplasm.apply(this.syllable, this.allomorph)
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
    metaplasm

    constructor(word: TonalWord) {
        super()
        this.word = word;
    }

    apply(ms: Array<TonalInflexionMorpheme>, tm: TonalWordMetaplasm): any {
        return tm.apply(this.word, ms)
    }

    /*
    toString(id: string) {
        if(this.kvp.key === id) {
            return this[this.kvp.value].literal
        }
    }
    */
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
        let applied = tl.apply(this.morphemes, new TonalInflexion())

        let lexemes: Array<TonalInflexionLexeme> = new Array();
        lexemes.push(tl);

        return { lexemes: lexemes, inflectedForms: applied }
    }
}

//------------------------------------------------------------------------------
//  Tonal Lexeme Analyzer
//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer {
    makeLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let output = gm.makeGraphemes();
        let graphemes = output.graphemes

        // Morpheme Maker
        let tmm = new TonalInflexionMorphemeMaker(graphemes, new TonalCombiningForms());
        let obj = tmm.makeMorphemes();

        // Lexeme Maker
        let tslm = new TonalInflexionLexemeMaker(obj.morphemes);
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
    lexeme

    constructor(l: TonalInflexionLexeme) {
        this.lexeme = l
    }

    check(w: TonalWord) {
        //for(let k in this.lexemes) {
            //if(this.lexemes[k].toString(this.id) === w.literal) {
            //if(this.lexemes[k].toString() === w.literal) {
                //return true
            //}
        //}
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
        let results1 = analyzer.makeLexemes('oannzs')
        let results2 = analyzer.makeLexemes('goay')
        let results3 = analyzer.makeLexemes('churw')

        let l1 = results1.lexemes[0]
        l1.partOfSpeech = SYMBOLS.VERB
        let transitive = new Transitive(l1)
        
        let l2 = results2.lexemes[0]
        l2.partOfSpeech = SYMBOLS.PERSONALPRONOUN
        let proceeding = new Proceeding(l2)

        let l3 = results3.lexemes[0]
        l3.partOfSpeech = SYMBOLS.VERB
        let intransitive = new Intransitive(l3)

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
        //if(w instanceof TonalWord) {
            for(let key in vp.constructions) {
                if(vp.constructions[key].elements[0].check(w)) {
                    cop = vp.constructions[key]
                }
            }
        //} else if(w instanceof TonallessWord) {}

        //if(cop.elements[1].check(lexemes[1].word)) {}
        //if(cop.elements[2].check(lexemes[2].word)) {}

        for(let k in lexemes) {
            this.lexemes.push(vp.constructions[0].elements[k].lexeme)
        }
    }
}