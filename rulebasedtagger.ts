
import { Word, ToneSandhiWord, ToneWord, ToneMarkLessWord, ToneSandhiInputingLexeme, ToneSandhiInflectionLexeme } from './lexeme'
import { SYMBOLS } from './symbols'
import { TurningIntoInflectionLexeme, TurningIntoSandhiForm } from './lexememaker'
import { Rule, AllomorphZS, AllomorphW, AllomorphY, ZeroAllomorph } from './morpheme';


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
    forms: Array<ToneSandhiInflectionLexeme> = null
    as(): ToneSandhiInflectionLexeme {
        return this.forms[0]
    }
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

    check(w: ToneSandhiWord) {
        for(let k in this.lexemes) {
            console.log(this.lexemes[k].toString(this.id) + ' === ' + w.literal)
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

        let turner1 = new TurningIntoSandhiForm(new Rule(new AllomorphZS(), new AllomorphW()))
        let l1 = turner1.turnIntoLexemes('uannzs')[0]
        l1.partOfSpeech = SYMBOLS.VERB
        l1.add('transitive')
        console.log('-' + l1.word.literal)
        let transitive = new ConstructionElement('transitive')
        transitive.addLexeme(l1)
        
        let turner2 = new TurningIntoSandhiForm(new Rule(new AllomorphY, new ZeroAllomorph()))
        let l2 = turner2.turnIntoLexemes('guay')[0]
        l2.partOfSpeech = SYMBOLS.PERSONALPRONOUN
        l2.add('proceeding')
        console.log('-' + l2.word.literal)
        let proceeding = new ConstructionElement('proceeding')
        proceeding.addLexeme(l2)

        let turner3 = new TurningIntoInflectionLexeme()
        let l3 = turner3.turnIntoLexemes('zurw')[0]
        l3.partOfSpeech = SYMBOLS.VERB
        l3.add('intransitive')
        console.log('-' + l3.word.literal)
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

    constructor(lexemes: Array<ToneSandhiInputingLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<ToneSandhiInputingLexeme>) {
        // take in inputing lexemes and then check them against parsing lexemes
        // store matched parsing lexemes in nodes
        let w: ToneWord = lexemes[0].word

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        if(w instanceof ToneSandhiWord) {
            for(let key in vp.constructions) {
                if(vp.constructions[key].elements[0].check(w)) {
                    cop = vp.constructions[key]
                    console.log('matched!')
                }
            }
        } else if(w instanceof ToneMarkLessWord) {}

        if(cop.elements[1].check(lexemes[1].word))
        { console.log('matched!')}
        if(cop.elements[2].check(lexemes[2].word))
        { console.log('matched!')}

        for(let k in lexemes) {
            this.lexemes.push(vp.constructions[0].elements[k].lexemes[0])
        }
    }
}