//------------------------------------------------------------------------------
//  Tone
//------------------------------------------------------------------------------

class Tone {
    name: string;
    toneMark: string;

    constructor(n: string, tm: string) {
        this.name = n;
        this.toneMark = tm;
    }
}

class Tones {
    // level tones
    toneFirst: Tone;
    toneSecond: Tone;
    toneThird: Tone;
    toneFifth: Tone;
    toneSixth: Tone;
    toneSeventh: Tone;
    toneNinth: Tone;

    // oblique tones
    // neutral tones
    toneFirstNeutralHh: Tone;
    toneSecondNeutralHy: Tone;
    toneThirdNeutralFf: Tone;
    toneFourthNeutralH: Tone;
    toneFifthNeutralFx: Tone;
    toneEighthNeutralF: Tone;

    // oblique tones
    // checked tones
    toneFirstCheckedPp: Tone;
    toneFirstCheckedTt: Tone;
    toneFirstCheckedKk: Tone;
    toneThirdCheckedBb: Tone;
    toneThirdCheckedDd: Tone;
    toneThirdCheckedGg: Tone;
    toneFourthCheckedP: Tone;
    toneFourthCheckedT: Tone;
    toneFourthCheckedK: Tone;
    toneFifthCheckedBx: Tone;
    toneFifthCheckedDx: Tone;
    toneFifthCheckedGx: Tone;
    toneEighthCheckedB: Tone;
    toneEighthCheckedD: Tone;
    toneEighthCheckedG: Tone;

    constructor() {
        this.toneFirst = new Tone("First Tone", "");
        this.toneSecond = new Tone("Second Tone", "y");
        this.toneThird = new Tone("Third Tone", "w");
        this.toneFifth = new Tone("Fifth Tone", "x");
        this.toneSixth = new Tone("Sixth Tone", "zzs");
        this.toneSeventh = new Tone("Seventh Tone", "zs");
        this.toneNinth = new Tone("Ninth Tone", "xx");

        this.toneFirstNeutralHh = new Tone("First Neutral Tone Hh", "hh");
        this.toneSecondNeutralHy = new Tone("Second Neutral Tone Hy", "hy");
        this.toneThirdNeutralFf = new Tone("Third Neutral Tone Ff", "ff");
        this.toneFourthNeutralH = new Tone("Fourth Neutral Tone H", "h");
        this.toneFifthNeutralFx = new Tone("Fifth Neutral Tone Fx", "fx");
        this.toneEighthNeutralF = new Tone("Eighth Neutral Tone F", "f");

        this.toneFirstCheckedPp = new Tone("First Checked Tone Pp", "pp");
        this.toneFirstCheckedTt = new Tone("First Checked Tone Tt", "tt");
        this.toneFirstCheckedKk = new Tone("First Checked Tone Kk", "kk");
        this.toneThirdCheckedBb = new Tone("Third Checked Tone Bb", "bb");
        this.toneThirdCheckedDd = new Tone("Third Checked Tone Dd", "dd");
        this.toneThirdCheckedGg = new Tone("Third Checked Tone Gg", "gg");
        this.toneFourthCheckedP = new Tone("Fourth Checked Tone P", "p");
        this.toneFourthCheckedT = new Tone("Fourth Checked Tone T", "t");
        this.toneFourthCheckedK = new Tone("Fourth Checked Tone K", "k");
        this.toneFifthCheckedBx = new Tone("Fifth Checked Tone Bx", "bx");
        this.toneFifthCheckedDx = new Tone("Fifth Checked Tone Dx", "dx");
        this.toneFifthCheckedGx = new Tone("Fifth Checked Tone Gx", "gx");
        this.toneEighthCheckedB = new Tone("Eighth Checked Tone B", "b");
        this.toneEighthCheckedD = new Tone("Eighth Checked Tone D", "d");
        this.toneEighthCheckedG = new Tone("Eighth Checked Tone G", "g");

    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Rules
//------------------------------------------------------------------------------

class ToneSandhiRules {
}