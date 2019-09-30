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
    acl = 'acl',
    advcl = 'advcl',
    amod = 'amod',
    advmod = 'advmod',
    aux = 'aux',
    aux_caus = 'aux:caus',
    ccomp = 'ccomp', // multiword expression
    compound = 'compound',
    cop = 'cop',
    csubj = 'csubj',
    dislocated = 'dislocated',
    fix = 'fix', // multiword expression
    flat = 'flat', // multiword expression
    obj = 'obj',
    iobj = 'iobj', // indirect object
    iobj_agent = 'iobj:agent',
    mark = 'mark',
    nmod = 'nmod',
    nobj = 'nobj',
    nsubj = 'nsubj',
    nsubj_caus = 'nsubj:caus',
    obl = 'obl', // oblique nominal
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

    AUX = 'AUX', // auxiliary
    PPV = 'PPV', // particle of phrasal verb
    ENC = 'ENC', // enclitic
}
