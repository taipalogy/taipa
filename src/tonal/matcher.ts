import {
  TonalLetterTags,
  finalConsonantsBgjklpsTonal,
  freeToneLettersTonal,
  vowelsTonal,
} from './version2';
import {
  finalConsonantsLs,
  finalConsonantsBgkp,
  finalConsonantsJls,
  finalConsonantsMng,
  toneLettersWx,
  nasalFinalConsonants,
} from './collections';

// mhf, nhf, nghf
export const regexMnngHF = /(m|ng?)hf/g;

// mhf, nhf, nghf
export const smMnngHF = function (
  nasalFinal: string,
  neutralFinalH: string,
  firstTonalF: string
) {
  if (
    nasalFinalConsonants.includes(nasalFinal) &&
    TonalLetterTags.h === neutralFinalH &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// mhw, mhx, nhw, nhx, nghw, nghx
export const regexMnngHWx = /(m|ng?)h(w|x)/g;

// mhw
/*
export const smMHW = function (
  nasalFinal: string,
  neutralFinalHh: string,
  thirdTonalW: string
) {
  if (
    nasalFinal === TonalLetterTags.m &&
    neutralFinalHh === TonalLetterTags.h &&
    thirdTonalW === TonalLetterTags.w
  )
    return true;

  return false;
};
*/
// mhw, mhx, nhw, nhx, nghw, nghx
export const smMnngHWx = function (
  nasalFinal: string,
  neutralFinalH: string,
  tonalWX: string
) {
  if (
    nasalFinalConsonants.includes(nasalFinal) &&
    TonalLetterTags.h === neutralFinalH &&
    toneLettersWx.includes(tonalWX)
  )
    return true;

  return false;
};

// jf, lf, sf
export const regexJlsF = /(j|l|s)f/g;

// jf, lf, sf
export const smJlsF = function (finalJls: string, firstTonalF: string) {
  if (
    finalConsonantsJls.includes(finalJls) &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// bf, gf, kf, pf
export const smBgkpF = function (finalBgkp: string, firstTonalF: string) {
  if (
    finalConsonantsBgkp.includes(finalBgkp) &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// lw, lx, sw. there is no sx
export const regexLsWx = /(l|s)(w|x)/g;

// lw, lx, sw
export const smLsWx = function (finalLs: string, tonalWX: string) {
  if (finalConsonantsLs.includes(finalLs) && toneLettersWx.includes(tonalWX))
    return true;

  return false;
};

// bw, bx, gw, gx, kw, kx, pw, px
export const smBgkpWx = function (finalBgkp: string, tonalWX: string) {
  if (
    finalConsonantsBgkp.includes(finalBgkp) &&
    toneLettersWx.includes(tonalWX)
  )
    return true;

  return false;
};

// bf, gf, jf, kf, lf, pf, sf
export const smBgjklpsF = function (finalBgjklps: string, firstToneF: string) {
  if (
    finalConsonantsBgjklpsTonal.includes(finalBgjklps) &&
    TonalLetterTags.f === firstToneF
  )
    return true;

  return false;
};

// iengz, uamz
export const smMngFywxz = function (finalMng: string, toneLetter: string) {
  if (
    finalConsonantsMng.includes(finalMng) &&
    freeToneLettersTonal.includes(toneLetter)
  )
    return true;

  return false;
};

export const smVowelMng = function (medial: string, finalMng: string) {
  if (vowelsTonal.includes(medial) && finalConsonantsMng.includes(finalMng))
    return true;

  return false;
};

// -ik
export const smIK = function (medialI: string, medialK: string) {
  if (medialI === TonalLetterTags.i && medialK === TonalLetterTags.k)
    return true;

  return false;
};
