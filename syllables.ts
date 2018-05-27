import { Letters, Letter, AlphabeticLetter } from './metadata';
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
        if(letters != null) {
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
        //console.log("%s", l.literal);
        this.letters.push(l);
        this.literal += l.literal;
    }
}

//------------------------------------------------------------------------------
//  Allomorphemic Syllables
//------------------------------------------------------------------------------

export class Syllables {
    syllableA: ToneSandhiSyllable;
    syllableAy: ToneSandhiSyllable;
    syllableAzs: ToneSandhiSyllable;
    syllableAh: ToneSandhiSyllable;
    syllableAf: ToneSandhiSyllable;
    syllableAi: ToneSandhiSyllable;
    syllableAiy: ToneSandhiSyllable;
    syllableAiw: ToneSandhiSyllable;
    syllableAinnzs: ToneSandhiSyllable;

    //syllableDiurf: ToneSandhiSyllable;

    syllableSuy: ToneSandhiSyllable;
    syllableSik: ToneSandhiSyllable;

    list: Array<ToneSandhiSyllable>;


    get length() {
        return this.list.length;
    }

    constructor(letters: Letters){

        this.list = new Array();

        this.syllableA = new ToneSandhiSyllable([letters.lowerLetterA]);
        this.syllableAy = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterY]);
        this.syllableAzs = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterZS]);
        this.syllableAh = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterH]);
        this.syllableAf = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterF]);
        this.syllableAi = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterI]);
        this.syllableAiy = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterI, letters.lowerLetterY]);
        this.syllableAiw = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterI, letters.lowerLetterW]);
        this.syllableAinnzs = new ToneSandhiSyllable([letters.lowerLetterA, letters.lowerLetterI, letters.lowerLetterNN, letters.lowerLetterZS]);

        var syllableDiurf = new ToneSandhiSyllable([letters.lowerLetterD, letters.lowerLetterI, letters.lowerLetterUR, letters.lowerLetterF]);

        this.syllableSuy = new ToneSandhiSyllable([letters.lowerLetterS, letters.lowerLetterU, letters.lowerLetterY]);
        this.syllableSik = new ToneSandhiSyllable([letters.lowerLetterS, letters.lowerLetterI, letters.lowerLetterK]);

        this.list.push(this.syllableA);
        this.list.push(this.syllableAy);
        this.list.push(this.syllableAzs);
        this.list.push(this.syllableAh);
        this.list.push(this.syllableAf);
        this.list.push(this.syllableAi);
        this.list.push(this.syllableAiy);
        this.list.push(this.syllableAiw);
        this.list.push(this.syllableAinnzs);

        this.list.push(syllableDiurf);

        this.list.push(this.syllableSuy);
        this.list.push(this.syllableSik);
    }

    match(letters: Array<AlphabeticLetter>) {
        
        let syllables: Array<ToneSandhiSyllable> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        console.log(letters);
        for(let i = 0; i < letters.length; i++) {
            console.log("examining character: %s. length of characters: %d", letters[i].literal, letters.length);
            console.log("metadata letter array looping.");
            let ss: Array<ToneSandhiSyllable> = new Array();
            ss = this.list.filter(s => s.letters[0].literal === letters[i].literal);
            console.log(ss);
            if(ss.length == 0) {
                console.log("something wrong");
            } else if(ss.length == 1) {
                console.log(ss);
                syllables.push(ss.shift()); // push the matched letter
            } else if(ss.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    //console.log(ls);
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ = new Array();
                    atLeastJ = ss.filter(l => l.letters.length >= j+1);
                    console.log(atLeastJ);

                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ = new Array();
                    underJ = ss.filter(l => l.letters.length < j+1);
                    console.log(underJ);

                    if(atLeastJ.length > 0){
                        ss = atLeastJ.filter(l => l.letters[j].literal === letters[i+j].literal);
                        if(ss.length > 0){
                            ;
                        } else {
                            ss = underJ;
                        }
                    }
                    
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    j++;
                    //console.log(ls);
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ss.length > 1 && i+j < letters.length);
                i += ss[0].letters.length-1; // skip the length-1 of characters of the found letter
                syllables.push(ss.shift()); // push the matched letter
                console.log(syllables);
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        console.log(syllables);
        return syllables;
    }

}