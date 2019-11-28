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
    case = 'case',
    ccomp = 'ccomp', // multiword expression
    compound = 'compound',
    compound_prt = 'compound:prt',
    cop = 'cop',
    csubj = 'csubj',
    det = 'det',
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
    AUX = 'AUX', // auxiliary verb
    AUXN = 'AUXN', // auxiliary verb as enclitic
    ADJ = 'ADJ', // adjective
    ADNOM = 'ADNOM', // adnominal adjective
    ADV = 'ADV', // adverb
    APPR = 'APPR', // preposition
    CL = 'CL', // classifier
    CONJ = 'CONJ', // conjunction
    FIL = 'FIL', // filler
    INTJ = 'INTJ', // interjection
    NN = 'NN', // noun
    NNP = 'NNP', // proper noun
    NPR = 'NPR', // pronoun
    NUM = 'NUM', // numeral
    NV = 'NV', // verbal noun
    NADJ = 'NADJ', // adjective noun
    NADV = 'NADV', // adverbial noun
    PAR = 'PAR', // parenthesis
    PCS = 'PCS', // case particle
    PCO = 'PCO', // parallel particle
    PCJ = 'PCJ', // conjunctive particle
    PEND = 'PEND', // sentence-ending particle
    PADV = 'PADV', // adverbial particle
    PPV = 'PPV', // particle of phrasal verb
    PNC = 'PNC', // punctuation
    PX = 'PX', // prefix
    SX = 'SX', // suffix
    SYM = 'SYM', // symbol
    VB = 'VB', // verb base form
}

export enum PronType {
    /*
      pronominal types
      https://universaldependencies.org/u/feat/PronType.html
    */

    DEM = 'Dem',
    PRS = 'Prs',
    REL = 'Rel',
}
