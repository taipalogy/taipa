// prettier-ignore
export const baseVerbs = [
  'hua', 'khuannw', 'longw', 'phah', 'sa', 'thehh', 'tiurhh',
];

export const subsidiariesA = ['a', 'aw', 'az'];

export const subsidiariesLe = ['le', 'lew', 'lez'];

export const subsidiariesE = ['e', 'ew', 'ez'];

// prettier-ignore
export const subsidiariesPersonalPronoun = [
  'gua', 'guaw', 'guaz', 'liw', 'liz', 'i', 'iw', 'iz', 'guanw', 'guanz', 'inw',
  'langw', 'langz',
];

export enum ParticlesAdverbial {
  longy = 'longy',
  bez = 'bez',
}

export const baseAdverbialParticles = [
  ParticlesAdverbial.bez.toString(),
  ParticlesAdverbial.longy.toString(),
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

/** Separate VV compounds. */
// prettier-ignore
export const seperateVVCompounds = [
  ['siam', 'kuew'],
  ['khuanny', 'tiurhh']
];

// prettier-ignore
export const phrasalVerbs = [
  ['khuannw', 'tiurh'],
  ['longw', 'tiurh'],
];

// prettier-ignore
export const phrasalVerbsVpp = [
  ['thehh', 'cut', 'khih'],
];
