import {
  TonalLetterTags,
  stopFinalSoundsBBggjjkkllppss,
  stopFinalSoundsBgjklps,
} from './version2';
import {
  finalsBBggkkpp,
  finalsJJllss,
  finalsBgkp,
  finalsJls,
  tonalsWx,
  nasalFinals,
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
    nasalFinals.includes(nasalFinal) &&
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
export const smMnngHHWx = function (
  nasalFinal: string,
  neutralFinalHh: string,
  tonalWX: string
) {
  if (
    nasalFinals.includes(nasalFinal) &&
    TonalLetterTags.hh === neutralFinalHh &&
    tonalsWx.includes(tonalWX)
  )
    return true;

  return false;
};

// jf, lf, sf
export const regexJlsF = /(j|l|s)f/g;

// jf, lf, sf
export const smJlsF = function (finalJls: string, firstTonalF: string) {
  if (finalsJls.includes(finalJls) && TonalLetterTags.f === firstTonalF)
    return true;

  return false;
};

// bf, gf, kf, pf
export const smBgkpF = function (finalBgkp: string, firstTonalF: string) {
  if (finalsBgkp.includes(finalBgkp) && TonalLetterTags.f === firstTonalF)
    return true;

  return false;
};

// jjw, jjx, llw, llx, ssw, ssx
export const regexJjllssWx = /(jj|ll|ss)(w|x)/g;

// jjw, jjx, llw, llx, ssw, ssx
export const smJJllssWx = function (finalJJllss: string, tonalWX: string) {
  if (finalsJJllss.includes(finalJJllss) && tonalsWx.includes(tonalWX))
    return true;

  return false;
};

// bbw, bbx, ggw, ggx, kkw, kkx, ppw, ppx
export const smBbggkkppWx = function (
  finalBBggjjkkllppss: string,
  tonalWX: string
) {
  if (
    finalsBBggkkpp.includes(finalBBggjjkkllppss) &&
    tonalsWx.includes(tonalWX)
  )
    return true;

  return false;
};

// bf, gf, jf, kf, lf, pf, sf
export const smBgjklpsF = function (finalBgjklps: string, firstTonalF: string) {
  if (
    stopFinalSoundsBgjklps.includes(finalBgjklps) &&
    TonalLetterTags.f === firstTonalF
  )
    return true;

  return false;
};

// bbw, bbx, ggw, ggx, jjw, jjx, kkw, kkx, llw, llx, ppw, ppx, ssw, ssx
export const smBbggjjkkllppssWx = function (
  finalBBggjjkkllppss: string,
  tonalWX: string
) {
  const efs = stopFinalSoundsBBggjjkkllppss;

  if (efs.includes(finalBBggjjkkllppss) && tonalsWx.includes(tonalWX))
    return true;

  return false;
};
