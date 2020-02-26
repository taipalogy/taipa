import { NasalFinalSounds, TonalLetterTags, EuphonicFinalsBBGGJJKKLLPPSS, EuphonicFinalsBGJKLPS } from './version2';
import {
    euphonic_finals_bbggkkpp,
    euphonic_finals_jjllss,
    euphonic_finals_bgkp,
    euphonic_finals_jls,
    third_fifth_tonals_wx
} from './collections';

export const regex_mnng_h_f = /(m|ng?)hf/g;

export const sm_mnng_h_f = function(nasalFinal: string, neutralFinalH: string, firstTonalF: string) {
    const snfs = new NasalFinalSounds();

    if (snfs.includes(nasalFinal) && TonalLetterTags.h === neutralFinalH && TonalLetterTags.f === firstTonalF)
        return true;

    return false;
};

export const regex_mnng_hh_wx = /(m|ng?)hh(w|x)/g;

export const sm_m_hh_w = function(nasalFinal: string, neutralFinalHH: string, thirdTonalW: string) {
    if (nasalFinal === TonalLetterTags.m && neutralFinalHH === TonalLetterTags.hh && thirdTonalW === TonalLetterTags.w)
        return true;

    return false;
};

export const sm_mnng_hh_wx = function(nasalFinal: string, neutralFinalHH: string, thirdFifthTonalWX: string) {
    const snfs = new NasalFinalSounds();

    if (
        snfs.includes(nasalFinal) &&
        TonalLetterTags.hh === neutralFinalHH &&
        third_fifth_tonals_wx.includes(thirdFifthTonalWX)
    )
        return true;

    return false;
};

export const regex_jls_f = /(j|l|s)f/g;

export const sm_jls_f = function(euphonicFinalJLS: string, firstTonalF: string) {
    if (euphonic_finals_jls.includes(euphonicFinalJLS) && TonalLetterTags.f === firstTonalF) return true;

    return false;
};

export const sm_bgkp_f = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    if (euphonic_finals_bgkp.includes(euphonicFinalBGJKLPS) && TonalLetterTags.f === firstTonalF) return true;

    return false;
};

export const regex_jjllss_wx = /(jj|ll|ss)(w|x)/g;

export const sm_jjllss_wx = function(euphonicFinalJJLLSS: string, thirdFifthTonalWX: string) {
    if (euphonic_finals_jjllss.includes(euphonicFinalJJLLSS) && third_fifth_tonals_wx.includes(thirdFifthTonalWX))
        return true;

    return false;
};

export const sm_bbggkkpp_wx = function(euphonicFinalBBGGJJKKLLPPSS: string, thirdFifthTonalWX: string) {
    if (
        euphonic_finals_bbggkkpp.includes(euphonicFinalBBGGJJKKLLPPSS) &&
        third_fifth_tonals_wx.includes(thirdFifthTonalWX)
    )
        return true;

    return false;
};

export const sm_bgjklps_f = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    const efs = new EuphonicFinalsBGJKLPS();

    if (efs.includes(euphonicFinalBGJKLPS) && TonalLetterTags.f === firstTonalF) return true;

    return false;
};

export const sm_bbggjjkkllppss_wx = function(euphonicFinalBBGGJJKKLLPPSS: string, thirdFifthTonalWX: string) {
    const efs = new EuphonicFinalsBBGGJJKKLLPPSS();

    if (efs.includes(euphonicFinalBBGGJJKKLLPPSS) && third_fifth_tonals_wx.includes(thirdFifthTonalWX)) return true;

    return false;
};
