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
  coordinatingConjunction = 'CCONJ',
  determiner = 'DET',
  interjection = 'INTJ',
  noun = 'NOUN',
  number = 'NUM',
  particle = 'PART',
  pronoun = 'PRON',
  properNoun = 'PROPN',
  punctuation = 'PUNCT',
  subordinatingConjunction = 'SCONJ',
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
  auxCaus = 'aux:caus',
  case = 'case',
  ccomp = 'ccomp', // multiword expression
  compound = 'compound',
  compoundPrt = 'compound:prt', // particle verbs
  // comooundSvc = 'compound:svc', // serial verbs
  cop = 'cop',
  csubj = 'csubj',
  det = 'det',
  dislocated = 'dislocated',
  fix = 'fix', // multiword expression
  flat = 'flat', // multiword expression
  obj = 'obj',
  iobj = 'iobj', // indirect object
  iobjAgent = 'iobj:agent',
  mark = 'mark',
  nmod = 'nmod',
  nobj = 'nobj',
  nsubj = 'nsubj',
  nsubjCaus = 'nsubj:caus',
  obl = 'obl', // oblique nominal
  prt = 'prt',
  root = 'root',
  xcomp = 'xcomp',
}

export enum Tagset {
  aux = 'AUX', // auxiliary verb
  adj = 'ADJ', // adjective
  adnom = 'ADNOM', // adnominal adjective
  adv = 'ADV', // adverb
  appr = 'APPR', // preposition
  appo = 'APPO', // postposition
  cl = 'CL', // classifier
  conj = 'CONJ', // conjunction
  fil = 'FIL', // filler
  intj = 'INTJ', // interjection
  nn = 'NN', // noun
  nnp = 'NNP', // proper noun
  npr = 'NPR', // pronoun
  num = 'NUM', // numeral
  nv = 'NV', // verbal noun
  nadj = 'NADJ', // adjective noun
  nadv = 'NADV', // adverbial noun
  par = 'PAR', // parenthesis
  pcs = 'PCS', // case particle
  pco = 'PCO', // parallel particle
  pcj = 'PCJ', // conjunctive particle
  pend = 'PEND', // sentence-ending particle
  padv = 'PADV', // adverbial particle
  ppv = 'PPV', // particle of phrasal verb
  psub = 'PSUB', // subsidiary, enclitic
  pnc = 'PNC', // punctuation
  px = 'PX', // prefix
  sx = 'SX', // suffix
  sym = 'SYM', // symbol
  vb = 'VB', // verb
}

export enum PronType {
  /*
      pronominal types
      https://universaldependencies.org/u/feat/PronType.html
    */

  dem = 'Dem',
  prs = 'Prs',
  rel = 'Rel',
}
