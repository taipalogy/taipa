
export enum POS {
    verb = 'verb',
    pronoun = 'pronoun',
    postposition = 'postposition',
    particle = 'particle',
    adjective = 'adjective',
    noun = 'noun',
    auxiliary_verb = 'auxiliary_verb',
}

export enum Dependency {
    aux_caus = 'aux:caus',
    csubj = 'csubj',
    ccomp = 'ccomp',
    cop = 'cop',
    dobj = 'dobj',
    iobj = 'iobj',
    iobj_agent = 'iobj:agent',
    nobj = 'nobj',
    nsubj = 'nsubj',
    nsubj_caus = 'nsubj:caus',
    root = 'root',
    xcomp = 'xcomp',
}

export enum PTBTags {
    CC = 'CC', // coordinating conjunction
    CD = 'CD', // cardinal number
    DT = 'DT', // determiner
    FW = 'FW', // foreign word
    IN = 'IN', // preposition. subordinate conjunction
    JJ = 'JJ', // adjective
    JJR = 'JJR',
    JJS = 'JJS',
    MD = 'MD', // modal
    NN = 'NN',
    NNP = 'NNP',
    PDT = 'PDT',
    PRP = 'PRP', // personal pronoun
    PRPS = 'PRP$', // possessive pronoun
    RB = 'RB', // adverb
    RBR = 'RBR',
    RBS = 'RBS',
    RP = 'RP', // particle
    SYM = 'SYM', // symbol
    UH = 'UH', // interjection
    VB = 'VB', // verb base form
    VBG = 'VBG', // verb gerund

    comma = ',',
}

export let PERSONAL_PRONOUN2TO137_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        directObject: 'directObject',
    },
    sandhiForm: {
        zero: {
            firstEnclitic: 'firstEnclitic',
            subjective: 'subjective',
            indirectObject: 'indirectObject',
        },
        w: {
            adverbial: 'adverbial',
            thirdEnclitic: 'thirdEnclitic',
        },
        z: {
            seventhEnclitic: 'seventhEnclitic',
        },
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
        w: {
            adverbial: 'adverbial',
            thirdEnclitic: 'thirdEnclitic',
        },
        z: {
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
        name: 'sandhiFor',
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
