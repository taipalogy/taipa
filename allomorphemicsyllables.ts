
import { ISyllables, ToneSandhiSyllable, Syllables } from './syllable'
import { letters, AlphabeticLetter } from './metadata'


//------------------------------------------------------------------------------
//  Allomorphemic Syllables
//------------------------------------------------------------------------------

export class AllomorphemicSyllables extends Syllables {
    list: Array<ToneSandhiSyllable>;


    get length() {
        return this.list.length;
    }

    constructor() {
        super();
        this.list = new Array();
        for(let key in allomorphemic_syllables_with_tone_mark.list) {
            this.list.push(allomorphemic_syllables_with_tone_mark.list[key])
        }
    }

    match(letters: Array<AlphabeticLetter>) {
        return super.match(letters);
    }
}

export let allomorphemic_syllables_with_tone_mark: ISyllables = {
    list: {
        a: new ToneSandhiSyllable([letters.list['a']]),
        ay: new ToneSandhiSyllable([letters.list['a'], letters.list['y']]),
        azs: new ToneSandhiSyllable([letters.list['a'], letters.list['zs']]),
        ah: new ToneSandhiSyllable([letters.list['a'], letters.list['h']]),
        af: new ToneSandhiSyllable([letters.list['a'], letters.list['f']]),
        ai: new ToneSandhiSyllable([letters.list['a'], letters.list['i']]),
        aiy: new ToneSandhiSyllable([letters.list['a'], letters.list['i'], letters.list['y']]),
        aiw: new ToneSandhiSyllable([letters.list['a'], letters.list['i'], letters.list['w']]),
        ainnzs: new ToneSandhiSyllable([letters.list['a'], letters.list['i'], letters.list['nn'], letters.list['zs']]),

        diurf: new ToneSandhiSyllable([letters.list['d'], letters.list['i'], letters.list['ur'], letters.list['f']]),
    }
}