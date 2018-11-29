
import { Word, ToneSandhiWord, ToneWord, ToneMarkLessWord, ToneSandhiInputingLexeme, ToneSandhiParsingLexeme, SandhiFormLexeme } from './lexeme'
import { SYMBOLS } from './symbols'
import { TurningIntoParsingLexeme, TurningIntoSandhiForm } from './lexememaker'


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
    forms: Array<ToneSandhiParsingLexeme> = null
    as(): ToneSandhiParsingLexeme {
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
    lexemes: Array<ToneSandhiParsingLexeme> = new Array()

    constructor(id: string) {
        this.id = id
    }

    addLexeme(l: ToneSandhiParsingLexeme) {
        this.lexemes.push(l)
    }

    check(w: ToneSandhiWord) {
        for(let k in this.lexemes) {
            console.log(this.id)
            console.log(this.lexemes[k].toString(this.id))
            console.log(w.literal)
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

    constructions = []

    constructor() {
        super()
        //let turner = new TurningIntoParsingLexeme()
        let turner = new TurningIntoSandhiForm()
        let l = turner.turnIntoLexemes('uannzs')[0]
        l.partOfSpeech = SYMBOLS.VERB
        l.add('transitive')
        console.log(l.word.literal)

        let transitive = new ConstructionElement('transitive')
        transitive.addLexeme(l)
        this.constructions.push(new ConstructionOfPhrase([transitive, 
                                                            new ConstructionElement('accusative'), 
                                                            new ConstructionElement('intransitive')]))
    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['ditransitive', 'dative', 'accusative'])
    constructions = []
}


//------------------------------------------------------------------------------
//  Rule-Based Tagger
//------------------------------------------------------------------------------

export class Node {
    word: Word
    tag: SYMBOLS
}

export class RuleBasedTagger {
    nodes: Array<Node> = new Array();

    constructor(lexemes: Array<ToneSandhiInputingLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<ToneSandhiInputingLexeme>) {
        // take in inputing lexemes and then check them against parsing lexemes
        let w: ToneWord = lexemes[0].word

        let cop: ConstructionOfPhrase        
        if(w instanceof ToneSandhiWord) {
            let pv = new VerbPhrase();
            for(let key in pv.constructions) {
                if(pv.constructions[key].elements[0].check(w)) {
                    cop = pv.constructions[key]
                    console.log('matched!')
                }
            }
        } else if(w instanceof ToneMarkLessWord) {}

        //console.log(cop.elements[1].id)
        //console.log(cop.elements[2].id)
        return false;
    }
}