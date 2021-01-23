export const baseVerbs = ['hua', 'khuannw', 'longw', 'phah', 'sa', 'thehh'];

export const subsidiariesA = ['a', 'aw', 'az'];

export const subsidiariesLe = ['le', 'lew', 'lez'];

export const subsidiariesE = ['e', 'ew', 'ez'];

export const subsidiariesPersonalPronoun = [
  'gua',
  'guaw',
  'guaz',
  'liw',
  'liz',
  'i',
  'iw',
  'iz',
  'guanw',
  'guanz',
  'inw',
  'langw',
  'langz',
];

export enum ParticlesAdverbial {
  longy = 'longy',
  bez = 'bez',
}

export const baseAdverbialParticles = [
  ParticlesAdverbial.longy.toString(),
  ParticlesAdverbial.bez.toString(),
];

export enum PronounsPersonal {
  guay = 'guay',
  liy = 'liy',
  i = 'i',
  guny = 'guny',
  guany = 'guany',
  lany = 'lany',
  liny = 'liny',
  in = 'in',
}

export const basePersonalPronouns = [
  PronounsPersonal.guay.toString(),
  PronounsPersonal.liy.toString(),
  PronounsPersonal.i.toString(),
  PronounsPersonal.guny.toString(),
  PronounsPersonal.guany.toString(),
  PronounsPersonal.lany.toString(),
  PronounsPersonal.liny.toString(),
  PronounsPersonal.in.toString(),
];

export enum ParticlesPhrasalVerb {
  cut = 'cut',
  khih = 'khih',
  laih = 'laih',
  tiurh = 'tiurh',
}

export const basePhrasalVerbParticles = [
  ParticlesPhrasalVerb.cut.toString(),
  ParticlesPhrasalVerb.khih.toString(),
  ParticlesPhrasalVerb.laih.toString(),
  ParticlesPhrasalVerb.tiurh.toString(),
];

export const demonstrativePronouns = ['che'];

export const auxiliaries = ['kaz'];

// prettier-ignore
export const dictOfPhrasalVerbs = [
  ['khuannw', 'tiurh'],
  ['longw', 'tiurh'],
];

// prettier-ignore
export const dictOfPhrasalVerbsVpp = [
  ['thehh', 'cut', 'khih'],
];

/** Base forms of separate VV compounds. */
// prettier-ignore
export const dictOfSeperateVVCompounds = [
  ['siamy', 'kuew']
];
