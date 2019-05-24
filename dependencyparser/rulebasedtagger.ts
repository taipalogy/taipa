import { SYMBOLS } from './symbols'
import { combiningRules } from '../tonal/version2'
import { TonalWord, TonalLexeme, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding, TonalMetaplasm,
    TonalLemmatizationLexemeMaker } from '../tonal/lexeme'
import { TonalSyllable, TonalMorpheme, syllabifyTonal, TonalSyllableMetaplasm } from '../tonal/morpheme'
import { MorphemeMaker } from '../morpheme'
import { Allomorph, listOfUncombinedCheckedAllomorphs, listOfUncombinedFreeAllomorphs, 
    FreeAllomorph, CheckedAllomorph, ZeroAllomorph, AllomorphY, lowerLettersOfTonal } from '../tonal/version2'
import { AlphabeticLetter, Tonal, AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { ListOfLexicalRoots } from '../tonal/lexicalroot'
import { Lexeme, InflectiveLexemeMaker, LexemeMaker } from '../lexeme'
import { NoSuccess, Success } from '../result'
import { Analyzer } from '../analyzer'

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

export class TonalCombiningForms extends TonalSyllableMetaplasm {
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

class TonalCaseDeclension extends TonalMetaplasm {}
class TonalAdverbInflexion extends TonalMetaplasm {}
class TonalParticleInflexion extends TonalMetaplasm {}

class TonalInflexion extends TonalMetaplasm {
    word: TonalWord
    morphemes: Array<TonalMorpheme>
    tonalEnding: TonalSymbolEnding = null

    apply(word: TonalWord, morphemes: Array<TonalMorpheme>) {
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
//  Tone Sandhi Root Morpheme
//------------------------------------------------------------------------------

export class ToneSandhiRootMorpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph = null;

    constructor(syllable: TonalSyllable) {
        this.syllable = syllable;
    }

    assignAllomorph() {}
}

export class CombiningFormMorpheme extends ToneSandhiRootMorpheme {
    assignAllomorph() {
        if(listOfUncombinedCheckedAllomorphs.has(this.syllable.lastLetter.literal)) {
            this.allomorph = listOfUncombinedCheckedAllomorphs.get(this.syllable.lastLetter.literal)
            return
        }

        if(listOfUncombinedFreeAllomorphs.has(this.syllable.lastLetter.literal)) {
            this.allomorph = listOfUncombinedFreeAllomorphs.get(this.syllable.lastLetter.literal)
            return
        }

        this.allomorph = new ZeroAllomorph()
        return
    }

    getCombiningForm(t: Tonal): TonalSyllable  {
        if(this.allomorph != null) {
            let s: TonalSyllable = new TonalSyllable(this.syllable.letters);
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph instanceof ZeroAllomorph) {
                    s.pushLetter(new AlphabeticLetter(t.characters))
                } else if(this.allomorph instanceof AllomorphY) {
                    s.popLetter()
                    return s
                } else {
                    s.popLetter()
                    s.pushLetter(new AlphabeticLetter(t.characters))
                    return s
                }
            } else if(this.allomorph instanceof CheckedAllomorph) {
                s.pushLetter(new AlphabeticLetter(this.allomorph.tonal.characters))
                return s
            }
        }
        return null
    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Root Morpheme Maker
//------------------------------------------------------------------------------

export class ToneSandhiRootMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(graphemes: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    create(syllable: TonalSyllable) { return new TonalMorpheme(syllable, new TonalCombiningForms()) }

    createArray() { return new Array<TonalMorpheme>() }

    makeRootMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}

export class CombiningFormMorphemeMaker extends ToneSandhiRootMorphemeMaker {
    
    constructor(graphemes: Array<AlphabeticGrapheme>) {
        super(graphemes)
    }

    createCombiningFormMorpheme(syllable: TonalSyllable) { 
        let s = new CombiningFormMorpheme(syllable)
        s.assignAllomorph()
        return s 
    }

    makeCombiningMorphemes() {
        // make morphemes and the last of them is a sandhi form
        return this.postprecess(super.makeRootMorphemes().morphemes);
    }

    postprecess(tspms: Array<ToneSandhiRootMorpheme>) {
        // replace the last morpheme with its sandhi form
        if(tspms.length > 0) {
            let last = tspms.pop()
            tspms.push(this.createCombiningFormMorpheme(last.syllable))
        }
        return tspms
    }
}

export class TonalInflexionMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalSyllableMetaplasm
    
    constructor(graphemes: Array<AlphabeticGrapheme>, tsm: TonalSyllableMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = graphemes;
        this.metaplasm = tsm
    }

    create(syllable: TonalSyllable) { return new TonalMorpheme(syllable, this.metaplasm) }

    createArray() { return new Array<TonalMorpheme>() }

    makeMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}

//------------------------------------------------------------------------------
//  Inflection Lexeme
//------------------------------------------------------------------------------

export class ToneSandhiInflectionLexeme extends Lexeme {
    // properties can be added or deleted
    tonalEnding: TonalSymbolEnding = null
    word: TonalWord
    kvp: { key: string , value: string }

    constructor(w: TonalWord) {
        super()
        this.word = w
    }

    add(id: string) {
        // use this.partOfSpeech to pick up k-v pairs from forms
        let pos = Object.keys(FORMS).find(key => this.partOfSpeech === key)
        // pick up the specific form from the part of speech
        let k = Object.keys(FORMS[pos]).find(key => id === key )
        // assign property and property value
        this.kvp = { key: id, value: FORMS[pos][k] }
    }

    get baseForm() { 
        // some determiners have only base form
        return this.word
    }

    toString(id: string) {
        if(this.kvp.key === id) {
            return this[this.kvp.value].literal
        }
    }
}

export class SandhiFormLexeme extends ToneSandhiInflectionLexeme {
    private wordForSandhiForm: TonalWord

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

    private getSandhiForm(morphemes: Array<ToneSandhiRootMorpheme>, tm: Tonal) {
        if(this.tonalEnding != null) {
            let word = new TonalWord(this.word.syllables);
            if(this.tonalEnding instanceof FreeTonalEnding) {
                let last = morphemes[morphemes.length-1]
                if(last instanceof CombiningFormMorpheme) {
                    word.popSyllable()
                    word.pushSyllable(last.getCombiningForm(tm));
                }
                return word
            } else if(this.tonalEnding instanceof CheckedTonalEnding) {
                let last = morphemes[morphemes.length-1]
                if(last instanceof CombiningFormMorpheme) {
                    word.pushSyllable(last.getCombiningForm(tm));
                }
                return word
            }
        }
        return null
    }

    get sandhiForm() {
        return this.wordForSandhiForm
    }

    populateSandhiForm(morphemes: Array<ToneSandhiRootMorpheme>, tm: Tonal) {
        this.wordForSandhiForm = this.getSandhiForm(morphemes, tm)
    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------

export class TonalInflectionLexemeMaker extends InflectiveLexemeMaker {
    morphemes: Array<ToneSandhiRootMorpheme>;

    constructor(morphemes: Array<ToneSandhiRootMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeInflectionLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new ToneSandhiInflectionLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: ToneSandhiInflectionLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
            }
        }

        let lexemes: Array<ToneSandhiInflectionLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
}

class TonalInflectedLexemeMaker extends TonalInflectionLexemeMaker {
    tonal: Tonal

    constructor(morphemes: Array<ToneSandhiRootMorpheme>, tm?: Tonal) {
        super(morphemes)
        //this.morphemes = new Array();
        //this.morphemes = morphemes;
        if(tm != undefined) {
            this.tonal = tm
        }
    }

    makeSandhiLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new SandhiFormLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: SandhiFormLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                tspl.assignTonalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        tspl.populateSandhiForm(this.morphemes, this.tonal)

        let lexemes: Array<SandhiFormLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
    
}

export class TonalInflexionLexemeMaker extends InflectiveLexemeMaker {
    morphemes: Array<TonalMorpheme>;

    constructor(morphemes: Array<TonalMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalLexeme(new TonalWord(syllables));
    }

    postprocess(tl: TonalLexeme) {
        let applied = tl.apply(this.morphemes, new TonalInflexion())

        let lexemes: Array<TonalLexeme> = new Array();
        lexemes.push(tl);

        return { lexemes: lexemes, inflectedForms: applied }
    }
}

//------------------------------------------------------------------------------
//  Lexeme Turner
//------------------------------------------------------------------------------

export class TurningIntoInflectionLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let output = gm.makeGraphemes();
        let graphemes = output.graphemes

        // Morpheme Maker
        let tsmm = new ToneSandhiRootMorphemeMaker(graphemes);
        let obj = tsmm.makeRootMorphemes();

        // Lexeme Maker
        let tslm = new TonalInflectionLexemeMaker(obj.morphemes);
        let lexemes = tslm.makeInflectionLexemes();

        return lexemes;
    }
}

export class TurningIntoSandhiForm extends TurningIntoInflectionLexeme {
    tonal: Tonal

    constructor (tm: Tonal) {
        super()
        this.tonal = tm
    }

    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let output = gm.makeGraphemes();
        let graphemes = output.graphemes

        // Morpheme Maker
        let tsmm = new CombiningFormMorphemeMaker(graphemes);
        let morphemes = tsmm.makeCombiningMorphemes(); // only the last morpheme is used

        // Lexeme Maker
        let tslm = new TonalInflectedLexemeMaker(morphemes, this.tonal);
        let lexemes = tslm.makeSandhiLexemes();

        return lexemes;
    }
}

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

class ConstructionOfClause {
    isSeperable
}

class Conversion {
    // different from parsing lexmem. convert between part of speeches.
    /*
    forms: Array<ToneSandhiInflectionLexeme> = null
    as(): ToneSandhiInflectionLexeme {
        return this.forms[0]
    }
    */
}

class Quantifier extends Conversion {
    constructor() {
        super()
    }
}

//------------------------------------------------------------------------------
//  Construction Element
//------------------------------------------------------------------------------

class ConstructionElement{
    id: string = ''
    lexemes: Array<ToneSandhiInflectionLexeme> = new Array()

    constructor(id: string) {
        this.id = id
    }

    addLexeme(l: ToneSandhiInflectionLexeme) {
        this.lexemes.push(l)
    }

    check(w: TonalWord) {
        for(let k in this.lexemes) {
            if(this.lexemes[k].toString(this.id) === w.literal) {
                return true
            }
        }
        return false
    }

}

//------------------------------------------------------------------------------
//  Type of Construction
//------------------------------------------------------------------------------

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase> = null;
}

class VerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['intransitive', 'intransitive']),
    //new ConstructionOfPhrase(['serial', 'serial', 'intransitive']),
    //new ConstructionOfPhrase(['causative', 'accusative', 'intransitive'])

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {
        super()

        let analyzer = new TonalInflextionAnalyzer()
        let results = analyzer.makeLexemes('oannzs')
        console.log(results.lexemes)
        console.log(results.inflectedForms)

        let turner1 = new TurningIntoSandhiForm(combiningRules.get('zs')['w'])
        let l1 = turner1.turnIntoLexemes('oannzs')[0]
        l1.partOfSpeech = SYMBOLS.VERB
        l1.add('transitive')
        let transitive = new ConstructionElement('transitive')
        transitive.addLexeme(l1)
        
        let turner2 = new TurningIntoSandhiForm(combiningRules.get('y')['zero'])
        let l2 = turner2.turnIntoLexemes('goay')[0]
        l2.partOfSpeech = SYMBOLS.PERSONALPRONOUN
        l2.add('proceeding')
        let proceeding = new ConstructionElement('proceeding')
        proceeding.addLexeme(l2)

        let turner3 = new TurningIntoInflectionLexeme()
        let l3 = turner3.turnIntoLexemes('churw')[0]
        l3.partOfSpeech = SYMBOLS.VERB
        l3.add('intransitive')
        let intransitive = new ConstructionElement('intransitive')
        intransitive.addLexeme(l3)

        this.constructions.push(new ConstructionOfPhrase([transitive, proceeding, intransitive]))

    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['ditransitive', 'dative', 'accusative'])
    constructions = []
}


//------------------------------------------------------------------------------
//  Rule-Based Tagger
//------------------------------------------------------------------------------

export class RuleBasedTagger {

    lexemes: Array<ToneSandhiInflectionLexeme> = new Array();

    constructor(lexemes: Array<TonalLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<TonalLexeme>) {
        // take in lemma lexemes and then check them against parsing lexemes
        // store matched parsing lexemes in nodes
        let w: TonalWord = lexemes[0].word

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        //if(w instanceof ToneSandhiWord) {
            for(let key in vp.constructions) {
                if(vp.constructions[key].elements[0].check(w)) {
                    cop = vp.constructions[key]
                }
            }
        //} else if(w instanceof TonallessWord) {}

        if(cop.elements[1].check(lexemes[1].word))
        { }
        if(cop.elements[2].check(lexemes[2].word))
        { }

        for(let k in lexemes) {
            this.lexemes.push(vp.constructions[0].elements[k].lexemes[0])
        }
    }
}