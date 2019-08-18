
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