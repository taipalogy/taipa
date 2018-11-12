
import { Word, ToneLexeme, Lexeme, ToneSandhiWord, ToneWord, ToneSandhiLexeme, ToneMarkLessWord } from './lexeme'
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

class PatternOfPhrase {
    pops: Array<string> = new Array()

    constructor(arr: Array<string>){
        for(let key in arr) {
            this.pops.push(arr[key])
        }
    }
}

class FormsOfToneWord extends Lexeme {}

class FormsOfToneSandhiWord extends FormsOfToneWord {
    rulesOfInflection
    word: ToneSandhiWord

    makeSandhiForm() {}
    get baseForm() { return '' }
    get sandhiForm() { return this.makeSandhiForm() }
    get adverbialForm () { return '' }
}
/*
class VerbWithTransitiveForm {
    
}
*/
class TransitiveVerb {
    id: string = 'transitive'
    forms: FormsOfToneSandhiWord
    words: Array<FormsOfToneSandhiWord> = new Array()

    addWord(w: ToneSandhiWord) {
        let fotsw = new FormsOfToneSandhiWord()
        fotsw.word = new ToneSandhiWord(w.syllables)
        this.words.push(fotsw)
    }

    isTransitive(w: ToneSandhiWord) {}
}

class PatternOfClause {
    isSeperable
}

class FormsOfPhrase {}

class TypeOfPhrase {
    patterns: Array<PatternOfPhrase> = null;
}

class PhrasalVerb extends TypeOfPhrase {
    patterns = [new PatternOfPhrase(['intransitive', 'intransitive']),
                new PatternOfPhrase(['transitive', 'accusative', 'intransitive']),
                new PatternOfPhrase(['serial-verb', 'serial-verb', 'intransitive']),
                new PatternOfPhrase(['causative', 'accusative', 'intransitive'])]
}

class DitransitiveVerb extends TypeOfPhrase {
    patterns = [new PatternOfPhrase(['ditransitive', 'dative', 'accusative'])]
}

export class Node {
    word: Word
    tag: SYMBOLS
}

export class RuleBasedTagger {
    nodes: Array<Node> = new Array();
    constructor(lexemes: Array<ToneLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<ToneLexeme>) {
        let w: ToneWord = lexemes[0].word
        let tv = new TransitiveVerb()
        
        if(w instanceof ToneSandhiWord) {
            tv.isTransitive(w)
        } else if(w instanceof ToneMarkLessWord) {}

        let pattern: PatternOfPhrase
        for(let s in MORPH_RULES) {
            let kvps = MORPH_RULES[s]
            let k = Object.keys(kvps).find(key => w.literal === key )
            if(k != undefined) {
                console.log('key is ' + k)
                console.log('type is ' + kvps[k].Type)
                let pv = new PhrasalVerb();
                for(let key in pv.patterns) {
                    if(kvps[k].Type === pv.patterns[key].pops[0]) {
                        pattern = pv.patterns[key]
                        console.log('matched!')
                    }
                }
            }
        }

        return false;
    }
}