export const baseVerbs = ['hua', 'khuannw', 'longw', 'phah', 'sa', 'thehh'];

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

export const subsidiaries = ['a', 'aw', 'az'];

export enum AdverbialParticlesInflected {
  // the values could be assigned by an inflector function
  longy = 'long',
  bez = 'bew',
}

export enum PersonalPronounInflected {
  guay = 'gua',
  liy = 'li',
  i = 'iz',
  guny = 'gun',
  guany = 'guan',
  lany = 'lan',
  liny = 'lin',
  in = 'inz',
}

export enum ParticlesVpp {
  cut = 'cut',
  khih = 'khih',
  laih = 'laih',
  tiurh = 'tiurh',
}

export const basePhrsalVerbParticles = [
  ParticlesVpp.cut.toString(),
  ParticlesVpp.khih.toString(),
  ParticlesVpp.laih.toString(),
  ParticlesVpp.tiurh.toString(),
];

export const demonstrativePronouns = ['che'];

export const auxiliaries = ['kaz'];
