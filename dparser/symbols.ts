
export enum POSTags {
    /*
      Universal POS tags
      https://universaldependencies.org/u/pos/
    */
    adjective = 'ADJ',
    adposition = 'ADP',
    adverb = 'ADV',
    auxiliary = 'AUX',
    conjunction = 'CONJ',
    coordinating_conjunction = 'CCONJ',
    determiner = 'DET',
    interjection = 'INTJ',
    noun = 'NOUN',
    number = 'NUM',
    particle = 'PART',
    pronoun = 'PRON',
    proper_noun = 'PROPN',
    punctuation = 'PUNCT',
    subordinating_conjunction = 'SCONJ',
    symbol = 'SYM',
    verb = 'VERB',
    other = 'X',
}

export enum DependencyLabels {
    /*
      Universal Dependencies
      https://universaldependencies.org/u/dep/all.html
    */
    aux_caus = 'aux:caus',
    csubj = 'csubj',
    ccomp = 'ccomp',
    cop = 'cop',
    dobj = 'dobj',
    iobj = 'iobj',
    iobj_agent = 'iobj:agent',
    mwe = 'mwe',
    nobj = 'nobj',
    nsubj = 'nsubj',
    nsubj_caus = 'nsubj:caus',
    prt = 'prt',
    root = 'root',
    xcomp = 'xcomp',
}

export enum Tagset {
    CC = 'CC', // coordinating conjunction
    CD = 'CD', // cardinal number
    DT = 'DT', // determiner
    FW = 'FW', // foreign word
    IN = 'IN', // preposition. subordinate conjunction
    JJ = 'JJ', // adjective
    JJR = 'JJR',
    JJS = 'JJS',
    MD = 'MD', // modal
    NN = 'NN', // noun
    NNP = 'NNP', // proper noun
    PDT = 'PDT', // predeterminer
    PRP = 'PRP', // personal pronoun
    PRPS = 'PRPS', // possessive pronoun
    RB = 'RB', // adverb
    RBR = 'RBR',
    RBS = 'RBS',
    RP = 'RP', // particle
    SYM = 'SYM', // symbol
    UH = 'UH', // interjection
    VB = 'VB', // verb base form
    VBG = 'VBG', // verb gerund

    comma = ',',
    sent_end_punc = '.',

    PVRP = 'PVRP', // particle of phrasal verb
}

export let PERSONAL_PRONOUN2TO137_DECLENSION = {
    baseForm: 'baseForm',
    sandhiForm: {
        first: 'first',
        third: 'third',
        seventh: 'seventh',
    }
}

export let PERSONAL_PRONOUN1TO37_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        firstEnclitic: 'firstEnclitic',
        subjective: 'subjective',
        directObject: 'directObject',
        indirectObject: 'indirectObject',
    },
    sandhiForm: {
        third: {
            adverbial: 'adverbial',
            thirdEnclitic: 'thirdEnclitic',
        },
        seventh: {
            subjective: 'subjective',
            seventhEnclitic: 'seventhEnclitic',
        }
    }
}

export let VERB_CONJUGATION = {
    baseForm: {
        name: 'baseForm',
        intransitive: 'intransitive',
        perfective: 'perfective',
    },
    sandhiForm: {
        name: 'sandhiForm',
        transitive: 'transitive',
        ditransitive: 'ditransitive',
        causative: 'causative',
        attributive: 'attributive',
        continuative: 'continuative',
    }
}

export let NUMERAL_QUANTIFIER = {
    baseForm: {
        name: 'baseForm',
        nominal: 'nominal',
    },
    sandhiForm: {
        name: 'sandhiForm',
        attributive: 'attributive',
        continuative: 'continuative',
    },
    adverbialForm: {
        name: 'adverbialForm',
        adverbial: 'adverbial',
    }
}

export let ADJECTIVE_INFLECTION = {
    baseForm: {
        name: 'baseForm',
        adjective: 'adjective',
    },
    sandhiForm: {
        name: 'sandhiForm',
        attributive: 'attributive',
        adverbial: 'adverbial',
    }
}

export let COPULA_CONJUGATION = {
    baseForm: {
        name: 'baseForm',
        intransitive: 'intransitive'
    },
    sandhiForm: {
        name: 'sandhiForm',
        copulative: 'copulative'
    },
}

export let NOUN_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        nominal: 'nominal' ,
    },
    sandhiForm: {
        name: 'sandhiForm', 
        adjective: 'adjective',
    }
}

export let ENCLITIC_E_INFLECTION = {
    baseForm: {
        name: 'baseForm',
        participle: 'participle',
        attributive: 'attributive',
    }
}

export let ENCLITIC_LE_INFLECTION = {
    baseForm: {
        name: 'baseForm',
        imperative: 'imperative',
        conjunctive: 'conjunctive',
    }
}
