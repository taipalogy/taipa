import {
    NasalFinalSounds,
    NeutralFinalH,
    FirstTonalF,
    NeutralFinalHH,
    TonalLetterTags,
    euphonic_finals_jls,
    euphonic_finals_bgkp,
    euphonic_finals_jjllss,
    euphonic_finals_bbggkkpp,
    EuphonicFinalsBBGGJJKKLLPPSS,
    EuphonicFinalsBGJKLPS,
    third_fifth_tonals_wx
} from './version2';

export const regex_mnng_h_f = /(m|ng?)hf/g;

export const sm_mnng_h_f = function(nasalFinal: string, neutralFinalH: string, firstTonalF: string) {
    const snfs = new NasalFinalSounds();
    const nf_h = new NeutralFinalH();
    const ft_f = new FirstTonalF();

    if (snfs.includes(nasalFinal) && nf_h.includes(neutralFinalH) && ft_f.includes(firstTonalF)) return true;

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
    const nf_hh = new NeutralFinalHH();

    if (
        snfs.includes(nasalFinal) &&
        nf_hh.includes(neutralFinalHH) &&
        third_fifth_tonals_wx.includes(thirdFifthTonalWX)
    )
        return true;

    return false;
};

export const regex_jls_f = /(j|l|s)f/g;

export const sm_jls_f = function(euphonicFinalJLS: string, firstTonalF: string) {
    const ft_f = new FirstTonalF();

    if (euphonic_finals_jls.includes(euphonicFinalJLS) && ft_f.includes(firstTonalF)) return true;

    return false;
};

export const sm_bgkp_f = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    const ft_f = new FirstTonalF();

    if (euphonic_finals_bgkp.includes(euphonicFinalBGJKLPS) && ft_f.includes(firstTonalF)) return true;

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
    const ft_f = new FirstTonalF();

    if (efs.includes(euphonicFinalBGJKLPS) && ft_f.includes(firstTonalF)) return true;

    return false;
};

export const sm_bbggjjkkllppss_wx = function(euphonicFinalBBGGJJKKLLPPSS: string, thirdFifthTonalWX: string) {
    const efs = new EuphonicFinalsBBGGJJKKLLPPSS();

    if (efs.includes(euphonicFinalBBGGJJKKLLPPSS) && third_fifth_tonals_wx.includes(thirdFifthTonalWX)) return true;

    return false;
};
