
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
    CC = 'CC',
    CD = 'CD',
    DT = 'DT',
    IN = 'IN',
    JJ = 'JJ',
    MD = 'MD',
    NN = 'NN',
    NNP = 'NNP',
    PDT = 'PDT',
    PRP = 'PRP',
    PRP$ = 'PRP$',
    RB = 'RB',
    RP = 'RP',
    SYM = 'SYM',
    UH = 'UH',
    VB = 'VB',
    VBG = 'VBG',
}