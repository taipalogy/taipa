
import { Word, ToneLexeme, ToneSandhiWord, ToneSandhiLexeme } from './lexeme'
import { SYMBOLS } from './symbols'
import { MORPH_RULES } from './morphrules';
import { IDictionary, Dictionary } from './collection'

//------------------------------------------------------------------------------
//  Patterns of Part-of-Speeches
//------------------------------------------------------------------------------

class PatternOfPhrase {
    poses: Array<string> = new Array()

    constructor(arr: Array<string>){
        for(let key in arr) {
            this.poses.push(arr[key])
        }
    }
}

interface IDictionaryOfWordForms extends IDictionary {
}

class DictionaryOfWordForms extends Dictionary {
    constructor(init: { key: string, value: string }[]) {
        super(init);
    }

    toLookup(): IDictionaryOfWordForms {
        return this;
    }
}

class FormsOfWord extends ToneSandhiLexeme {
}

class FormsOfVerb extends FormsOfWord {
    ruleOfInflectionalEnding
    readonly wordForms: IDictionaryOfWordForms = null

    get baseForm() { return this.word.literal }
    get sandhiForm() { return '' }
}

class FormsOfDitransitive extends FormsOfVerb {
    readonly wordForms = new DictionaryOfWordForms([
        { key: 'ditransitive', value: this.sandhiForm },
        { key: 'intransitive', value: this.baseForm },
    ]).toLookup()
}

class FormsOfCausative extends FormsOfVerb {
    readonly wordForms = new DictionaryOfWordForms([
        { key: 'causative', value: this.sandhiForm },
        { key: 'transitive', value: this.sandhiForm },
        { key: 'intransitive', value: this.baseForm },
        { key: 'realis', value: this.baseForm },
    ]).toLookup()
}

class FormsOfPronoun extends FormsOfWord {
    ruleOfInflectionalEnding
    readonly wordForms: IDictionaryOfWordForms = null

    get baseForm() { return this.word.literal }
    get sandhiForm() { return '' }
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
                new PatternOfPhrase(['conjunctive', 'conjunctive', 'intransitive'])]
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
        this.match(lexemes[0].word)
    }

    match(w: Word) {
        for(let s in MORPH_RULES) {
            let kvps = MORPH_RULES[s]
            let k = Object.keys(kvps).find(key => w.literal === key )
            if(k != undefined) {
                console.log('key is ' + k)
                console.log('type is ' + kvps[k].Type)
                return true;
            }
        }
        return false;
    }
}