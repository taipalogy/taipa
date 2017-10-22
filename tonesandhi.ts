import { StemChecker } from './stem';

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

//------------------------------------------------------------------------------
//  Tone Sandhi Rules
//------------------------------------------------------------------------------

class ToneSandhiRule {
    baseTone: Tone;
    sandhiTone: Tone;

    constructor(b: Tone, s: Tone) {
        this.baseTone = b;
        this.sandhiTone = s;
    }
}

//------------------------------------------------------------------------------
//  BaseToneChecker
//------------------------------------------------------------------------------

export class ToneMarkChecker {
    rules: Array<ToneSandhiRule>;
    levelToneRules: Array<ToneSandhiRule>;
    obliqueToneRules: Array<ToneSandhiRule>;

    // level tones
    toneFirstWithoutToneMark: Tone;
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
        this.rules = new Array();
        this.levelToneRules = new Array();
        this.obliqueToneRules = new Array();

        this.toneFirstWithoutToneMark = new Tone("First Tone without Tone Mark", "");
        this.toneFirst = new Tone("First Tone", "ss");
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

        this.rules.push(new ToneSandhiRule(this.toneFirstWithoutToneMark, this.toneSeventh));
        this.rules.push(new ToneSandhiRule(this.toneFirst, this.toneSeventh));        
        this.rules.push(new ToneSandhiRule(this.toneSecond, this.toneFirst));
        this.rules.push(new ToneSandhiRule(this.toneThird, this.toneSecond));
        this.rules.push(new ToneSandhiRule(this.toneThird, this.toneNinth));
        this.rules.push(new ToneSandhiRule(this.toneThirdCheckedBb, this.toneFifthCheckedBx));
        this.rules.push(new ToneSandhiRule(this.toneThirdCheckedDd, this.toneFifthCheckedDx));
        this.rules.push(new ToneSandhiRule(this.toneThirdCheckedGg, this.toneFifthCheckedGx));
        this.rules.push(new ToneSandhiRule(this.toneThirdNeutralFf, this.toneFifthNeutralFx));
        this.rules.push(new ToneSandhiRule(this.toneFourthCheckedP, this.toneFirstCheckedPp));
        this.rules.push(new ToneSandhiRule(this.toneFourthCheckedT, this.toneFirstCheckedTt));
        this.rules.push(new ToneSandhiRule(this.toneFourthCheckedK, this.toneFirstCheckedKk));
        this.rules.push(new ToneSandhiRule(this.toneFourthNeutralH, this.toneSecondNeutralHy));
        this.rules.push(new ToneSandhiRule(this.toneFifth, this.toneSeventh));
        this.rules.push(new ToneSandhiRule(this.toneSeventh, this.toneThird));
        this.rules.push(new ToneSandhiRule(this.toneSeventh, this.toneNinth));
        this.rules.push(new ToneSandhiRule(this.toneEighthCheckedB, this.toneThirdCheckedBb));
        this.rules.push(new ToneSandhiRule(this.toneEighthCheckedD, this.toneThirdCheckedDd));
        this.rules.push(new ToneSandhiRule(this.toneEighthCheckedG, this.toneThirdCheckedGg));
        this.rules.push(new ToneSandhiRule(this.toneEighthNeutralF, this.toneThirdNeutralFf));

        this.levelToneRules.push(new ToneSandhiRule(this.toneFirstWithoutToneMark, this.toneSeventh));
        this.levelToneRules.push(new ToneSandhiRule(this.toneFirst, this.toneSeventh));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSecond, this.toneFirst));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSecond, this.toneFirstWithoutToneMark));
        this.levelToneRules.push(new ToneSandhiRule(this.toneThird, this.toneSecond));
        this.levelToneRules.push(new ToneSandhiRule(this.toneThird, this.toneNinth));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSeventh, this.toneThird));
        this.levelToneRules.push(new ToneSandhiRule(this.toneFifth, this.toneSeventh));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSeventh, this.toneNinth));

        this.obliqueToneRules.push(new ToneSandhiRule(this.toneThirdCheckedBb, this.toneFifthCheckedBx));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneThirdCheckedDd, this.toneFifthCheckedDx));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneThirdCheckedGg, this.toneFifthCheckedGx));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneThirdNeutralFf, this.toneFifthNeutralFx));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneFourthCheckedP, this.toneFirstCheckedPp));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneFourthCheckedT, this.toneFirstCheckedTt));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneFourthCheckedK, this.toneFirstCheckedKk));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneFourthNeutralH, this.toneSecondNeutralHy));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneEighthCheckedB, this.toneThirdCheckedBb));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneEighthCheckedD, this.toneThirdCheckedDd));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneEighthCheckedG, this.toneThirdCheckedGg));
        this.obliqueToneRules.push(new ToneSandhiRule(this.toneEighthNeutralF, this.toneThirdNeutralFf));

    }

    checkBaseTone(t: string) {
        console.log(this.rules.length);
        for(let i = 0; i < this.rules.length; i++) {
            let r = this.rules[i];
            if(t.match(new RegExp(r.baseTone.toneMark))) {
                console.log("found matched base tone: %s", r.baseTone.name);
                return r.baseTone.toneMark;
            }
        }
        return null;
    }

    checkSandhiTone(st: string) {
        for(let i = 0; i < this.rules.length; i++) {
            let r = this.rules[i];
            // check sandhi tone for its base tone
            if(st.match(new RegExp(r.sandhiTone.toneMark))) {
                console.log("found matched sandhi tone of: %s", r.baseTone.name);
                let stems = st.split(r.sandhiTone.toneMark);
                return stems.shift() + r.baseTone.toneMark;
            }
        }

    }

    getSandhiToneMark(l: string) : string {
        let stm = "";

        for(let i = 0; i < this.rules.length; i++) {
            let r = this.rules[i];
            if(l.match(new RegExp(r.baseTone.toneMark))) {
                return r.sandhiTone.toneMark;
            }
        }

        return null;
    }

    isLevelTone(t: string) {

        let sc = new StemChecker();

        for(let i = 0; i < this.levelToneRules.length; i++) {
            let r = this.levelToneRules[i];
            if(r.baseTone.name == this.toneFirstWithoutToneMark.name) {
                // the first tone is the lemma, it has no tone mark as a word
                console.log("first tone without tone mark");
                if(sc.validate(t)) {
                    //return true;
                }
                return false;
            }
            if(t.match(new RegExp(r.baseTone.toneMark))) {
                console.log("matching base tone mark");
                return true;
            }
        }

        return false;
    }

    isObliqueTone(t: string) {
        console.log("isObliqueTone: %s", t);
        for(let i = 0; i < this.obliqueToneRules.length; i++) {
            let r = this.obliqueToneRules[i];
            if(t.match(new RegExp(r.baseTone.toneMark))) {
                return true;
            } else if(t.match(new RegExp(r.sandhiTone.toneMark))) {
                return true;
            }
        }

        return false;

    }
}