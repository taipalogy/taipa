import { ToneStemValidator } from './tonestem';

//------------------------------------------------------------------------------
//  Tone
//------------------------------------------------------------------------------

class ToneMark {
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
    baseTone: ToneMark;
    sandhiTone: ToneMark;

    constructor(b: ToneMark, s: ToneMark) {
        this.baseTone = b;
        this.sandhiTone = s;
    }
}

//------------------------------------------------------------------------------
//  Tone Mark Checker
//------------------------------------------------------------------------------

export class ToneMarkChecker {
    rules: Array<ToneSandhiRule>;
    levelToneRules: Array<ToneSandhiRule>;
    obliqueToneRules: Array<ToneSandhiRule>;

    // level tones
    toneFirstWithoutToneMark: ToneMark;
    toneFirstSs: ToneMark;
    toneSecondY: ToneMark;
    toneThirdW: ToneMark;
    toneFifthX: ToneMark;
    toneSixthZzs: ToneMark;
    toneSeventhZs: ToneMark;
    toneNinthXx: ToneMark;

    // oblique tones
    // neutral tones
    toneFirstNeutralHh: ToneMark;
    toneSecondNeutralHy: ToneMark;
    toneThirdNeutralFf: ToneMark;
    toneFourthNeutralH: ToneMark;
    toneFifthNeutralFx: ToneMark;
    toneEighthNeutralF: ToneMark;

    // oblique tones
    // checked tones
    toneFirstCheckedPp: ToneMark;
    toneFirstCheckedTt: ToneMark;
    toneFirstCheckedKk: ToneMark;
    toneThirdCheckedBb: ToneMark;
    toneThirdCheckedDd: ToneMark;
    toneThirdCheckedGg: ToneMark;
    toneFourthCheckedP: ToneMark;
    toneFourthCheckedT: ToneMark;
    toneFourthCheckedK: ToneMark;
    toneFifthCheckedBx: ToneMark;
    toneFifthCheckedDx: ToneMark;
    toneFifthCheckedGx: ToneMark;
    toneEighthCheckedB: ToneMark;
    toneEighthCheckedD: ToneMark;
    toneEighthCheckedG: ToneMark;

    constructor() {
        this.levelToneRules = new Array();
        this.obliqueToneRules = new Array();

        this.toneFirstWithoutToneMark = new ToneMark("First Tone without Tone Mark", "");
        this.toneFirstSs = new ToneMark("First Tone", "ss");
        this.toneSecondY = new ToneMark("Second Tone", "y");
        this.toneThirdW = new ToneMark("Third Tone", "w");
        this.toneFifthX = new ToneMark("Fifth Tone", "x");
        this.toneSixthZzs = new ToneMark("Sixth Tone", "zzs");
        this.toneSeventhZs = new ToneMark("Seventh Tone", "zs");
        this.toneNinthXx = new ToneMark("Ninth Tone", "xx");

        this.toneFirstNeutralHh = new ToneMark("First Neutral Tone Hh", "hh");
        this.toneSecondNeutralHy = new ToneMark("Second Neutral Tone Hy", "hy");
        this.toneThirdNeutralFf = new ToneMark("Third Neutral Tone Ff", "ff");
        this.toneFourthNeutralH = new ToneMark("Fourth Neutral Tone H", "h");
        this.toneFifthNeutralFx = new ToneMark("Fifth Neutral Tone Fx", "fx");
        this.toneEighthNeutralF = new ToneMark("Eighth Neutral Tone F", "f");

        this.toneFirstCheckedPp = new ToneMark("First Checked Tone Pp", "pp");
        this.toneFirstCheckedTt = new ToneMark("First Checked Tone Tt", "tt");
        this.toneFirstCheckedKk = new ToneMark("First Checked Tone Kk", "kk");
        this.toneThirdCheckedBb = new ToneMark("Third Checked Tone Bb", "bb");
        this.toneThirdCheckedDd = new ToneMark("Third Checked Tone Dd", "dd");
        this.toneThirdCheckedGg = new ToneMark("Third Checked Tone Gg", "gg");
        this.toneFourthCheckedP = new ToneMark("Fourth Checked Tone P", "pp");
        this.toneFourthCheckedT = new ToneMark("Fourth Checked Tone T", "t");
        this.toneFourthCheckedK = new ToneMark("Fourth Checked Tone K", "k");
        this.toneFifthCheckedBx = new ToneMark("Fifth Checked Tone Bx", "bx");
        this.toneFifthCheckedDx = new ToneMark("Fifth Checked Tone Dx", "dx");
        this.toneFifthCheckedGx = new ToneMark("Fifth Checked Tone Gx", "gx");
        this.toneEighthCheckedB = new ToneMark("Eighth Checked Tone B", "b");
        this.toneEighthCheckedD = new ToneMark("Eighth Checked Tone D", "d");
        this.toneEighthCheckedG = new ToneMark("Eighth Checked Tone G", "g");

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
            if(t.search(new RegExp(r.baseTone.toneMark)) > 0) {
                return r.baseTone.toneMark;
            } else if(t.search(new RegExp(r.sandhiTone.toneMark)) > 0) {
                return r.baseTone.toneMark;
            }
        }

        for(let i = 0; i < this.levelToneRules.length; i++) {
            // we then filter the tone with level tone rules
            let r = this.levelToneRules[i];
            if(r.baseTone.toneMark == this.toneFirstWithoutToneMark.toneMark 
                || r.sandhiTone.toneMark == this.toneFirstWithoutToneMark.toneMark) {
                    // bypass the first tone without tone mark
                    continue;
            } else if(t.search(new RegExp(r.baseTone.toneMark)) > 0) {
                return r.baseTone.toneMark;
            } else if(t.search(new RegExp(r.sandhiTone.toneMark)) > 0) {
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
        let tsv = new ToneStemValidator();
        let matches = tsv.validate(l);
        
        if(matches) {
            console.log("getSandhiToneMark, validated: %s.", l);
            console.log(matches);
        }

        for(let i = 0; i < this.obliqueToneRules.length; i++) {
            let r = this.obliqueToneRules[i];

            if(l.search(new RegExp(r.baseTone.toneMark)) > 0) {
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
            if(l.search(new RegExp(r.baseTone.toneMark)) > 0) {
                return r.sandhiTone.toneMark;
            }
        }

        // return the first tone mark which is an empty string
        return "";
    }

    isLevelTone(t: string) {

        let sv = new ToneStemValidator();

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