import { StemValidator } from './stem';

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
    toneFirstSs: Tone;
    toneSecondY: Tone;
    toneThirdW: Tone;
    toneFifthX: Tone;
    toneSixthZzs: Tone;
    toneSeventhZs: Tone;
    toneNinthXx: Tone;

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
        this.levelToneRules = new Array();
        this.obliqueToneRules = new Array();

        this.toneFirstWithoutToneMark = new Tone("First Tone without Tone Mark", "");
        this.toneFirstSs = new Tone("First Tone", "ss");
        this.toneSecondY = new Tone("Second Tone", "y");
        this.toneThirdW = new Tone("Third Tone", "w");
        this.toneFifthX = new Tone("Fifth Tone", "x");
        this.toneSixthZzs = new Tone("Sixth Tone", "zzs");
        this.toneSeventhZs = new Tone("Seventh Tone", "zs");
        this.toneNinthXx = new Tone("Ninth Tone", "xx");

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
        this.toneFourthCheckedP = new Tone("Fourth Checked Tone P", "pp");
        this.toneFourthCheckedT = new Tone("Fourth Checked Tone T", "t");
        this.toneFourthCheckedK = new Tone("Fourth Checked Tone K", "k");
        this.toneFifthCheckedBx = new Tone("Fifth Checked Tone Bx", "bx");
        this.toneFifthCheckedDx = new Tone("Fifth Checked Tone Dx", "dx");
        this.toneFifthCheckedGx = new Tone("Fifth Checked Tone Gx", "gx");
        this.toneEighthCheckedB = new Tone("Eighth Checked Tone B", "b");
        this.toneEighthCheckedD = new Tone("Eighth Checked Tone D", "d");
        this.toneEighthCheckedG = new Tone("Eighth Checked Tone G", "g");

        this.levelToneRules.push(new ToneSandhiRule(this.toneFirstWithoutToneMark, this.toneSeventhZs));
        this.levelToneRules.push(new ToneSandhiRule(this.toneFirstSs, this.toneSeventhZs));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSecondY, this.toneFirstSs));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSecondY, this.toneFirstWithoutToneMark));
        this.levelToneRules.push(new ToneSandhiRule(this.toneThirdW, this.toneSecondY));
        this.levelToneRules.push(new ToneSandhiRule(this.toneThirdW, this.toneNinthXx));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSeventhZs, this.toneThirdW));
        this.levelToneRules.push(new ToneSandhiRule(this.toneFifthX, this.toneSeventhZs));
        this.levelToneRules.push(new ToneSandhiRule(this.toneSeventhZs, this.toneNinthXx));

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

    getBaseToneMark(t: string) {
        //console.log(this.rules.length);
        for(let i = 0; i < this.obliqueToneRules.length; i++) {
            // we firstly filter the tone with oblique tone rules
            let r = this.obliqueToneRules[i];
            if(t.match(new RegExp(r.baseTone.toneMark))) {
                return r.baseTone.toneMark;
            } else if(t.match(new RegExp(r.sandhiTone.toneMark))) {
                return r.sandhiTone.toneMark;
            }
        }

        for(let i = 0; i < this.levelToneRules.length; i++) {
            // we then filter the tone with level tone rules
            let r = this.levelToneRules[i];
            if(r.baseTone.toneMark == this.toneFirstWithoutToneMark.toneMark 
                || r.sandhiTone.toneMark == this.toneFirstWithoutToneMark.toneMark) {
                    // bypass the first tone without tone mark
                    continue;
            } else if(t.match(new RegExp(r.baseTone.toneMark))) {
                return r.baseTone.toneMark;
            } else if(t.match(new RegExp(r.sandhiTone.toneMark))) {
                return r.sandhiTone.toneMark;
            }
        }

        // return the first tone mark which is an empty string
        return "";
    }

    getMatchedBaseTone(st: string) {
        for(let i = 0; i < this.obliqueToneRules.length; i++) {
            let r = this.obliqueToneRules[i];
            // check sandhi tone for its base tone
            if(st.match(new RegExp(r.sandhiTone.toneMark))) {
                console.log("found matched sandhi tone of: %s", r.baseTone.name);
                let stems = st.split(r.sandhiTone.toneMark);
                return stems.shift() + r.baseTone.toneMark;
            }
        }
        for(let i = 0; i < this.levelToneRules.length; i++) {
            let r = this.levelToneRules[i];
            if(st.match(new RegExp(r.sandhiTone.toneMark))) {
                if(r.baseTone.toneMark == this.toneFirstWithoutToneMark.toneMark 
                    || r.sandhiTone.toneMark == this.toneFirstWithoutToneMark.toneMark) {
                        // bypass the first tone without tone mark
                        continue;
                } else if(st.match(new RegExp(r.baseTone.toneMark))) {
                    return r.baseTone.toneMark;
                } else if(st.match(new RegExp(r.sandhiTone.toneMark))) {
                    return r.sandhiTone.toneMark;
                }
            }
        }

    }

    getSandhiToneMark(l: string) : string {
        let stm = "";

        for(let i = 0; i < this.obliqueToneRules.length; i++) {
            let r = this.obliqueToneRules[i];
            if(l.match(new RegExp(r.baseTone.toneMark))) {
                return r.sandhiTone.toneMark;
            }
        }

        for(let i = 0; i < this.levelToneRules.length; i++) {
            let r = this.levelToneRules[i];
            if(r.baseTone.toneMark == this.toneFirstWithoutToneMark.toneMark 
                || r.sandhiTone.toneMark == this.toneFirstWithoutToneMark.toneMark) {
                    // bypass the first tone without tone mark
                    continue;
            }
            if(l.match(new RegExp(r.baseTone.toneMark))) {
                return r.sandhiTone.toneMark;
            }
        }

        // return the first tone mark which is an empty string
        return "";
    }

    isLevelTone(t: string) {

        let sv = new StemValidator();

        for(let i = 0; i < this.levelToneRules.length; i++) {
            let r = this.levelToneRules[i];
            if(r.baseTone.name == this.toneFirstWithoutToneMark.name 
                || r.sandhiTone.name == this.toneFirstWithoutToneMark.name ) {
                // the first tone is the lemma, it has no tone mark as a word
                console.log("first tone without tone mark");
                if(sv.validate(t) && !this.isObliqueTone(t)) {
                    console.log("validate the stem and verify it is not oblique");
                    return true;
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
            console.log(new RegExp(r.baseTone.toneMark));
            console.log(new RegExp(r.sandhiTone.toneMark));
            if(t.match(new RegExp(r.baseTone.toneMark))) {
                console.log("matched");
                return true;
            } else if(t.match(new RegExp(r.sandhiTone.toneMark))) {
                console.log("matched");
                return true;
            }
        }

        return false;

    }
}