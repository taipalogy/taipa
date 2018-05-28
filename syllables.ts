import { AlphabeticLetter, letters } from './metadata';
import { GrammaticalUnit } from './expression';
import { Context } from './context';

//------------------------------------------------------------------------------
//  Syllables
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

class Accent {
    evaluate(){}
}

export class Syllable extends GrammaticalUnit {
    literal: string = '';
    evaluate(context: Context){}
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(var i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    isBaseForm() {
        // look up in the lexicon to check if this syllable is in base form
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
        //console.log("%s", l.literal);
    }
}

//------------------------------------------------------------------------------
//  Allomorphemic Syllables
//------------------------------------------------------------------------------

export class Syllables {
    syllableA: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a']]);
    syllableAy: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['y']]);
    syllableAzs: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['zs']]);
    syllableAh: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['h']]);
    syllableAf: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['f']]);
    syllableAi: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['i']]);
    syllableAiy: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['i'], letters.list['y']]);
    syllableAiw: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['i'], letters.list['w']]);
    syllableAinnzs: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['a'], letters.list['i'], letters.list['nn'], letters.list['zs']]);

    syllableDiurf: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['d'], letters.list['i'], letters.list['ur'], letters.list['f']]);

    syllableSuy: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['s'], letters.list['u'], letters.list['y']]);
    syllableSik: ToneSandhiSyllable = new ToneSandhiSyllable([letters.list['s'], letters.list['i'], letters.list['k']]);

    list: Array<ToneSandhiSyllable>;


    get length() {
        return this.list.length;
    }

    constructor(){

        this.list = new Array();

        this.list.push(this.syllableA);
        this.list.push(this.syllableAy);
        this.list.push(this.syllableAzs);
        this.list.push(this.syllableAh);
        this.list.push(this.syllableAf);
        this.list.push(this.syllableAi);
        this.list.push(this.syllableAiy);
        this.list.push(this.syllableAiw);
        this.list.push(this.syllableAinnzs);

        this.list.push(this.syllableDiurf);

        this.list.push(this.syllableSuy);
        this.list.push(this.syllableSik);
    }

    match(letters: Array<AlphabeticLetter>) {
        
        let syllables: Array<ToneSandhiSyllable> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        //console.log(letters);
        let beginOfSyllable: number = 0;
        let ss: Array<ToneSandhiSyllable> = new Array();
        for(let i = 0; i < letters.length; i++) {
            //console.log("examining letter: %s. length of letters: %d", letters[i].literal, letters.length);
            //console.log("metadata letter array looping.");
            
            if(i-beginOfSyllable == 0) {
                //console.log("begin of syllable hit");
                ss = this.list.filter(s => s.letters[0].literal === letters[i].literal);
            } else {
                //console.log("i:%d. beginOfSyllable:%d", i, beginOfSyllable);
                ss = ss.filter(s => s.letters[i-beginOfSyllable].literal === letters[i].literal);
            }

            //console.log(ss);
            if(ss.length == 0) {
                console.log("something wrong");
            } else if(ss.length == 1) {
                //console.log("just one matched. i:%d. ss[0].letters.length:%d", i, ss[0].letters.length);
                if(i+1-beginOfSyllable == ss[0].letters.length) {
                    // when index i plus one equals the length of the matched syllable
                    let tmp = ss.shift();
                    beginOfSyllable +=  tmp.letters.length;
                    syllables.push(tmp);
                }
            } else if(ss.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    //console.log(ls);
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ = new Array();
                    atLeastJ = ss.filter(s => s.letters.length >= j+1);
                    //console.log(atLeastJ);

                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ = new Array();
                    underJ = ss.filter(s => s.letters.length < j+1);
                    //console.log(underJ);

                    if(atLeastJ.length > 0){
                        //console.log(ss);
                        ss = atLeastJ.filter(s => s.letters[j].literal === letters[i+j].literal);
                        if(ss.length > 0){
                            ;
                        } else {
                            ss = underJ;
                        }
                    }
                    
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    j++;
                    //console.log(ss);
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ss.length > 1 && i+j < letters.length);
                i += ss[0].letters.length-1; // skip the length-1 of characters of the found letter
                // we want it only when the whole syllable is matched
                let tmp = ss.shift();
                beginOfSyllable += tmp.letters.length;
                syllables.push(tmp); // push the matched letter
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        console.log(syllables);
        //console.log("length of syllables: %d", syllables.length);
        return syllables;
    }

}