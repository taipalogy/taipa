import {
    SetOfNasalFinals,
    NeutralFinalH,
    FirstTonalF,
    NeutralFinalHH,
    ThirdFifthTonalsWX,
    EuphonicFinalsBGJKLPS,
    EuphonicFinalsBBGGJJKKLLPPSS,
} from './version2';

export const sm_mnng_h_f = function(nasalFinal: string, neutralFinalH: string, firstTonalF: string) {
    const snfs = new SetOfNasalFinals();
    const nf_h = new NeutralFinalH();
    const ft_f = new FirstTonalF();

    if (snfs.beginWith(nasalFinal) && nf_h.beginWith(neutralFinalH) && ft_f.beginWith(firstTonalF)) return true;

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

export const sm_bgjklps = function(euphonicFinalBGJKLPS: string) {
    const efs = new EuphonicFinalsBGJKLPS();

    if (efs.beginWith(euphonicFinalBGJKLPS)) return true;

    return false;
};

export const sm_bbggjjkkllppss = function(euphonicFinalBBGGJJKKLLPPSS: string) {
    const efs = new EuphonicFinalsBBGGJJKKLLPPSS();

    if (efs.beginWith(euphonicFinalBBGGJJKKLLPPSS)) return true;

    return false;
};
