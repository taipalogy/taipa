import { NasalFinalSounds, TonalLetterTags, EuphonicFinalsBBGGJJKKLLPPSS, EuphonicFinalsBGJKLPS } from './version2';
import {
    euphonicFinalsBbggkkpp,
    euphonicFinalsJjllss,
    euphonicFinalsBgkp,
    euphonicFinalsJls,
    tonalsWx
} from './collections';

// mhf, nhf, nghf
export const regexMnngHF = /(m|ng?)hf/g;

//? mhf, nhf, nghf
export const smMnngHF = function(nasalFinal: string, neutralFinalH: string, firstTonalF: string) {
    const snfs = new NasalFinalSounds();

    if (snfs.includes(nasalFinal) && TonalLetterTags.h === neutralFinalH && TonalLetterTags.f === firstTonalF)
        return true;

    return false;
};

// mhhw, mhhx, nhhw, nhhx, nghhw, nghhx
export const regexMnngHhWX = /(m|ng?)hh(w|x)/g;

// mhhw
export const smMHhW = function(nasalFinal: string, neutralFinalHH: string, thirdTonalW: string) {
    if (nasalFinal === TonalLetterTags.m && neutralFinalHH === TonalLetterTags.hh && thirdTonalW === TonalLetterTags.w)
        return true;

    return false;
};

// mhhw, mhhx, nhhw, nhhx, nghhw, nghhx
export const smMnngHhWx = function(nasalFinal: string, neutralFinalHH: string, tonalWOrX: string) {
    const snfs = new NasalFinalSounds();

    if (snfs.includes(nasalFinal) && TonalLetterTags.hh === neutralFinalHH && tonalsWx.includes(tonalWOrX)) return true;

    return false;
};

// jf, lf, sf
export const regexJlsF = /(j|l|s)f/g;

// jf, lf, sf
export const smJlsF = function(euphonicFinalJLS: string, firstTonalF: string) {
    if (euphonicFinalsJls.includes(euphonicFinalJLS) && TonalLetterTags.f === firstTonalF) return true;

    return false;
};

// bf, gf, kf, pf
export const smBgkpF = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    if (euphonicFinalsBgkp.includes(euphonicFinalBGJKLPS) && TonalLetterTags.f === firstTonalF) return true;

    return false;
};

// jjw, jjx, llw, llx, ssw, ssx
export const regexJjllssWx = /(jj|ll|ss)(w|x)/g;

// jjw, jjx, llw, llx, ssw, ssx
export const smJjllssWx = function(euphonicFinalJJLLSS: string, tonalWOrX: string) {
    if (euphonicFinalsJjllss.includes(euphonicFinalJJLLSS) && tonalsWx.includes(tonalWOrX)) return true;

    return false;
};

// bbw, bbx, ggw, ggx, kkw, kkx, ppw, ppx
export const smBbggkkppWx = function(euphonicFinalBBGGJJKKLLPPSS: string, tonalWOrX: string) {
    if (euphonicFinalsBbggkkpp.includes(euphonicFinalBBGGJJKKLLPPSS) && tonalsWx.includes(tonalWOrX)) return true;

    return false;
};

// bf, gf, jf, kf, lf, pf, sf
export const smBgjklpsF = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    const efs = new EuphonicFinalsBGJKLPS();

    if (efs.includes(euphonicFinalBGJKLPS) && TonalLetterTags.f === firstTonalF) return true;

    return false;
};

// bbw, bbx, ggw, ggx, jjw, jjx, kkw, kkx, llw, llx, ppw, ppx, ssw, ssx
export const smBbggjjkkllppssWx = function(euphonicFinalBBGGJJKKLLPPSS: string, tonalWOrX: string) {
    const efs = new EuphonicFinalsBBGGJJKKLLPPSS();

    if (efs.includes(euphonicFinalBBGGJJKKLLPPSS) && tonalsWx.includes(tonalWOrX)) return true;

    return false;
};
