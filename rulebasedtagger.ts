
import { Word, Lexeme, ToneSandhiWord, ToneWord, ToneMarkLessWord, ToneInputingLexeme } from './lexeme'
import { SYMBOLS } from './symbols'
import { MORPH_RULES } from './morphrules';

export let FORMS = {
    'VERB': {
        'intransitive': 'baseForm',
        'transitive': 'sandhiForm',
        'ditransitive': 'sandhiForm',
        'causitive': 'sandhiForm',
        'perfective': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm',
    },
    'ADJECTIVE': {
        'terminal': 'baseForm',
        'attributive': 'sandhiForm',
        'adverbial': 'sandhiForm',
    },
    'NOUN': {
        'adverbial': 'sandhiForm',
        'attributive': 'sandhiForm',
        'terminal': 'adverbialForm'
    },
    'PRONOUN': {
        'nominative': '',
        'accusative': '',
        'dative': '',
        'adverbial': 'adverbialForm',
    },
    'PARTICLE': {
        'continuative': 'continuativeForm'
    }
}

//------------------------------------------------------------------------------
//  Pattern of Phrase
//------------------------------------------------------------------------------

class ConstructionOfPhrase {
    elements: Array<ConstructionElement> = new Array()

    constructor(arr: Array<ConstructionElement>){
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

class ParsingLexeme extends Lexeme {}

class ToneSandhiParsingLexeme extends ParsingLexeme {
    rulesOfInflection
    word: ToneSandhiWord
    preceded
    followed
    isProceeding
    partOfSpeech: string

    constructor(w: ToneSandhiWord) {
        super()
        this.word = w
    }

    add(id: string) {
        let kvps = FORMS.VERB
        let k = Object.keys(kvps).find(key => id === key )
        this[k] = kvps[k]
    }

    get baseForm() { return this.word.literal }

    toString() {}
}

class Verb extends ToneSandhiParsingLexeme {}

class Pronoun extends ToneSandhiParsingLexeme {}

class PersonalPronoun extends Pronoun {
    get adverbialForm () { return '' }
}

class DemonstrativePronoun extends Pronoun {}

class Noun extends ToneSandhiParsingLexeme {}

class Unit extends Noun {
    get sandhiForm() { return '' }
    get adverbialForm () { return '' }
}

class Adjective extends ToneSandhiParsingLexeme {}

class Particle extends ToneSandhiParsingLexeme {}

class Preposition extends ToneSandhiParsingLexeme {}

class Exclamation extends ToneSandhiParsingLexeme {}

class ConstructionElement{
    id: string = ''
    lexemes: Array<ToneSandhiParsingLexeme> = new Array()

    constructor(id: string) {
        this.id = id
    }

    addWord(w: ToneSandhiWord) {
        this.lexemes.push(new ToneSandhiParsingLexeme(new ToneSandhiWord(w.syllables)))
    }

    check(w: ToneSandhiWord) {
        return false
    }
}

class PatternOfClause {
    isSeperable
}

class FormsOfPhrase {}

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase> = null;
}

class VerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['intransitive', 'intransitive']),
    //new ConstructionOfPhrase(['serial', 'serial', 'intransitive']),
    //new ConstructionOfPhrase(['causative', 'accusative', 'intransitive'])

    constructions = [new ConstructionOfPhrase([new ConstructionElement('transitive') , 
                                                new ConstructionElement('accusative'), 
                                                new ConstructionElement('intransitive')])]
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['ditransitive', 'dative', 'accusative'])
    constructions = []
}

export class Node {
    word: Word
    tag: SYMBOLS
}

export class RuleBasedTagger {
    nodes: Array<Node> = new Array();

    constructor(lexemes: Array<ToneInputingLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<ToneInputingLexeme>) {
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

        console.log(cop.elements[1].id)
        console.log(cop.elements[2].id)
        return false;
    }
}