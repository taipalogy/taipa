import {
  TonalLetterTags,
  stopFinalSoundsBBggkkllppss,
  stopFinalSoundsBgjklps,
} from './version2';
import {
  finalsBBggkkpp,
  finalsLs,
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
export const regexMnngHWx = /(m|ng?)h(w|x)/g;

// mhhw
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

// mhhw, mhhx, nhhw, nhhx, nghhw, nghhx
export const smMnngHWx = function (
  nasalFinal: string,
  neutralFinalH: string,
  tonalWX: string
) {
  if (
    nasalFinals.includes(nasalFinal) &&
    TonalLetterTags.h === neutralFinalH &&
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

// llw, llx, ssw
export const regexJjllssWx = /(j|l|s)(w|x)/g; // TODO: remove j and rename variable

// llw, llx, ssw
export const smLsWx = function (finalLs: string, tonalWX: string) {
  if (finalsLs.includes(finalLs) && tonalsWx.includes(tonalWX)) return true;

  return false;
};

// bw, bx, gw, gx, kw, kx, pw, px
export const smBgkpWx = function (finalBgkp: string, tonalWX: string) {
  if (finalsBgkp.includes(finalBgkp) && tonalsWx.includes(tonalWX)) return true;

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
