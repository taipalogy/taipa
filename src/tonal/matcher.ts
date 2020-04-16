import {
  NasalFinalSounds,
  TonalLetterTags,
  EuphonicFinalsBBGGJJKKLLPPSS,
  EuphonicFinalsBGJKLPS,
} from './version2';
import {
  euphonicFinalsBbggkkpp,
  euphonicFinalsJjllss,
  euphonicFinalsBgkp,
  euphonicFinalsJls,
  tonalsWx,
} from './collections';

// mhf, nhf, nghf
export const regexMnngHF = /(m|ng?)hf/g;

// mhf, nhf, nghf
export const smMnngHF = function (
  nasalFinal: string,
  neutralFinalH: string,
  firstTonalF: string
) {
  const snfs = new NasalFinalSounds();

  if (
    snfs.includes(nasalFinal) &&
    TonalLetterTags.h === neutralFinalH &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// mhhw, mhhx, nhhw, nhhx, nghhw, nghhx
export const regexMnngHhWx = /(m|ng?)hh(w|x)/g;

// mhhw
export const smMHhW = function (
  nasalFinal: string,
  neutralFinalHh: string,
  thirdTonalW: string
) {
  if (
    nasalFinal === TonalLetterTags.m &&
    neutralFinalHh === TonalLetterTags.hh &&
    thirdTonalW === TonalLetterTags.w
  )
    return true;

  return false;
};

// mhhw, mhhx, nhhw, nhhx, nghhw, nghhx
export const smMnngHhWx = function (
  nasalFinal: string,
  neutralFinalHh: string,
  tonalWX: string
) {
  const snfs = new NasalFinalSounds();

  if (
    snfs.includes(nasalFinal) &&
    TonalLetterTags.hh === neutralFinalHh &&
    tonalsWx.includes(tonalWX)
  )
    return true;

  return false;
};

// jf, lf, sf
export const regexJlsF = /(j|l|s)f/g;

// jf, lf, sf
export const smJlsF = function (euphonicFinalJls: string, firstTonalF: string) {
  if (
    euphonicFinalsJls.includes(euphonicFinalJls) &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// bf, gf, kf, pf
export const smBgkpF = function (
  euphonicFinalBgjklps: string,
  firstTonalF: string
) {
  if (
    euphonicFinalsBgkp.includes(euphonicFinalBgjklps) &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// jjw, jjx, llw, llx, ssw, ssx
export const regexJjllssWx = /(jj|ll|ss)(w|x)/g;

// jjw, jjx, llw, llx, ssw, ssx
export const smJjllssWx = function (
  euphonicFinalJjllss: string,
  tonalWX: string
) {
  if (
    euphonicFinalsJjllss.includes(euphonicFinalJjllss) &&
    tonalsWx.includes(tonalWX)
  )
    return true;

  return false;
};

// bbw, bbx, ggw, ggx, kkw, kkx, ppw, ppx
export const smBbggkkppWx = function (
  euphonicFinalBbggjjkkllppss: string,
  tonalWX: string
) {
  if (
    euphonicFinalsBbggkkpp.includes(euphonicFinalBbggjjkkllppss) &&
    tonalsWx.includes(tonalWX)
  )
    return true;

  return false;
};

// bf, gf, jf, kf, lf, pf, sf
export const smBgjklpsF = function (
  euphonicFinalBgjklps: string,
  firstTonalF: string
) {
  const efs = new EuphonicFinalsBGJKLPS();

  if (efs.includes(euphonicFinalBgjklps) && TonalLetterTags.f === firstTonalF)
    return true;

  return false;
};

// bbw, bbx, ggw, ggx, jjw, jjx, kkw, kkx, llw, llx, ppw, ppx, ssw, ssx
export const smBbggjjkkllppssWx = function (
  euphonicFinalBbggjjkkllppss: string,
  tonalWX: string
) {
  const efs = new EuphonicFinalsBBGGJJKKLLPPSS();

  if (efs.includes(euphonicFinalBbggjjkkllppss) && tonalsWx.includes(tonalWX))
    return true;

  return false;
};
