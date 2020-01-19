import {
    SetOfNasalFinals,
    NeutralFinalH,
    FirstTonalF,
    NeutralFinalHH,
    ThirdFifthTonalsWX,
    TonalLetterTags,
    EuphonicFinalsJLS,
    EuphonicFinalsBGKP,
    EuphonicFinalsJJLLSS,
    EuphonicFinalsBBGGKKPP,
    EuphonicFinalsBBGGJJKKLLPPSS,
    EuphonicFinalsBGJKLPS,
} from './version2';

export const regex_mnng_h_f = /(m|ng?)hf/g;

export const sm_mnng_h_f = function(nasalFinal: string, neutralFinalH: string, firstTonalF: string) {
    const snfs = new SetOfNasalFinals();
    const nf_h = new NeutralFinalH();
    const ft_f = new FirstTonalF();

    if (snfs.beginWith(nasalFinal) && nf_h.beginWith(neutralFinalH) && ft_f.beginWith(firstTonalF)) return true;

    return false;
};

export const regex_mnng_hh_wx = /(m|ng?)hh(w|x)/g;

export const sm_m_hh_w = function(nasalFinal: string, neutralFinalHH: string, thirdTonalW: string) {
    if (nasalFinal === TonalLetterTags.m && neutralFinalHH === TonalLetterTags.hh && thirdTonalW === TonalLetterTags.w)
        return true;

    return false;
};

export const sm_mnng_hh_wx = function(nasalFinal: string, neutralFinalHH: string, thirdFifthTonalWX: string) {
    const snfs = new SetOfNasalFinals();
    const nf_hh = new NeutralFinalHH();
    const fts_wx = new ThirdFifthTonalsWX();

    if (snfs.beginWith(nasalFinal) && nf_hh.beginWith(neutralFinalHH) && fts_wx.beginWith(thirdFifthTonalWX))
        return true;

    return false;
};

export const regex_jls_f = /(j|l|s)f/g;

export const sm_jls_f = function(euphonicFinalJLS: string, firstTonalF: string) {
    const efs = new EuphonicFinalsJLS();
    const ft_f = new FirstTonalF();

    if (efs.beginWith(euphonicFinalJLS) && ft_f.beginWith(firstTonalF)) return true;

    return false;
};

export const sm_bgkp_f = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    const efs = new EuphonicFinalsBGKP();
    const ft_f = new FirstTonalF();

    if (efs.beginWith(euphonicFinalBGJKLPS) && ft_f.beginWith(firstTonalF)) return true;

    return false;
};

export const regex_jjllss_wx = /(jj|ll|ss)(w|x)/g;

export const sm_jjllss_wx = function(euphonicFinalJJLLSS: string, thirdFifthTonalWX: string) {
    const efs = new EuphonicFinalsJJLLSS();
    const fts_wx = new ThirdFifthTonalsWX();

    if (efs.beginWith(euphonicFinalJJLLSS) && fts_wx.beginWith(thirdFifthTonalWX)) return true;

    return false;
};

export const sm_bbggkkpp_wx = function(euphonicFinalBBGGJJKKLLPPSS: string, thirdFifthTonalWX: string) {
    const efs = new EuphonicFinalsBBGGKKPP();
    const fts_wx = new ThirdFifthTonalsWX();

    if (efs.beginWith(euphonicFinalBBGGJJKKLLPPSS) && fts_wx.beginWith(thirdFifthTonalWX)) return true;

    return false;
};

export const sm_bgjklps_f = function(euphonicFinalBGJKLPS: string, firstTonalF: string) {
    const efs = new EuphonicFinalsBGJKLPS();
    const ft_f = new FirstTonalF();

    if (efs.beginWith(euphonicFinalBGJKLPS) && ft_f.beginWith(firstTonalF)) return true;

    return false;
};

export const sm_bbggjjkkllppss_wx = function(euphonicFinalBBGGJJKKLLPPSS: string, thirdFifthTonalWX: string) {
    const efs = new EuphonicFinalsBBGGJJKKLLPPSS();
    const fts_wx = new ThirdFifthTonalsWX();

    if (efs.beginWith(euphonicFinalBBGGJJKKLLPPSS) && fts_wx.beginWith(thirdFifthTonalWX)) return true;

    return false;
};
