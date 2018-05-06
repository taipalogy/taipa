import { Lexicon, lexicon } from './lexicon';
import { Operand } from './expression';
import { Syllable, ToneSandhiSyllable, AlphabeticLetter, Letters, Characters } from './metadata';
import { State } from './state';
import { Context } from "./context";
import { Character } from './metadata';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {
    nonNasalInitialLettersRegexp: RegExp;
    nasalInitialLettersRegexp: RegExp;
    medialLettersRegexp: RegExp;
    nasalLettersRegexp: RegExp;
    neutralFinalLettersRegexp: RegExp;
    checkedFinalLettersRegexp: RegExp;
    freeToneMarkLettersRegexp: RegExp;
    checkedToneMarkLettersRegexp: RegExp;
    neutralToneMarkLettersRegexp: RegExp;

    constructor(letters: Letters){
        let nonNasalInitials = letters.lowerLetterB.literal
                                + '|' + letters.lowerLetterC.literal
                                + '|' + letters.lowerLetterD.literal
                                + '|' + letters.lowerLetterG.literal
                                + '|' + letters.lowerLetterH.literal
                                + '|' + letters.lowerLetterJ.literal
                                + '|' + letters.lowerLetterK.literal
                                + '|' + letters.lowerLetterL.literal
                                + '|' + letters.lowerLetterM.literal
                                + '|' + letters.lowerLetterN.literal
                                + '|' + letters.lowerLetterP.literal
                                + '|' + letters.lowerLetterQ.literal
                                + '|' + letters.lowerLetterS.literal
                                + '|' + letters.lowerLetterT.literal
                                + '|' + letters.lowerLetterV.literal
                                + '|' + letters.lowerLetterZ.literal;
        this.nonNasalInitialLettersRegexp = new RegExp(nonNasalInitials);
        
        let nasalInitials = letters.lowerLetterM.literal
                            + '|' + letters.lowerLetterN.literal
                            + '|' + letters.lowerLetterNG.literal;
        this.nasalInitialLettersRegexp = new RegExp(nasalInitials);

        let medials = letters.lowerLetterA.literal
                        + '|' + letters.lowerLetterE.literal
                        + '|' + letters.lowerLetterI.literal
                        + '|' + letters.lowerLetterO.literal
                        + '|' + letters.lowerLetterU.literal
                        + '|' + letters.lowerLetterUR.literal;
        this.medialLettersRegexp = new RegExp(medials);

        let nasals = letters.lowerLetterM.literal
                        + '|' + letters.lowerLetterN.literal
                        + '|' + letters.lowerLetterNG.literal
                        + '|' + letters.lowerLetterNN.literal;
        this.nasalLettersRegexp = new RegExp(nasals);

        let neutralFinals = letters.lowerLetterF.literal
                            + '|' + letters.lowerLetterH.literal;
        this.neutralFinalLettersRegexp = new RegExp(neutralFinals);

        let nonNeutralFinals = letters.lowerLetterB.literal
                                + '|' + letters.lowerLetterD.literal
                                + '|' + letters.lowerLetterG.literal
                                + '|' + letters.lowerLetterP.literal
                                + '|' + letters.lowerLetterT.literal
                                + '|' + letters.lowerLetterK.literal;
        this.checkedFinalLettersRegexp = new RegExp(nonNeutralFinals);

        let freeToneMarks = letters.lowerLetterSS.literal
                            + '|' + letters.lowerLetterY.literal
                            + '|' + letters.lowerLetterW.literal
                            + '|' + letters.lowerLetterX.literal
                            + '|' + letters.lowerLetterXX.literal
                            + '|' + letters.lowerLetterXXX.literal
                            + '|' + letters.lowerLetterZS.literal
                            + '|' + letters.lowerLetterZZS.literal;
        this.freeToneMarkLettersRegexp = new RegExp(freeToneMarks);
        
        let checkedToneMarks = letters.lowerLetterB.literal
                                + '|' + letters.lowerLetterD.literal
                                + '|' + letters.lowerLetterG.literal
                                + '|' + letters.lowerLetterP.literal
                                + '|' + letters.lowerLetterT.literal
                                + '|' + letters.lowerLetterK.literal
                                + '|' + letters.lowerLetterX.literal;
        this.checkedToneMarkLettersRegexp = new RegExp(checkedToneMarks);

        let neutralToneMakrs = letters.lowerLetterF.literal
                                + '|' + letters.lowerLetterH.literal
                                + '|' + letters.lowerLetterX.literal
                                + '|' + letters.lowerLetterY.literal;
        this.neutralToneMarkLettersRegexp = new RegExp(neutralToneMakrs);
    }
}

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

class SyllableState implements State {
    analyze(context: StateContext) { return null; }

    isAtIndexZero(letters: Array<AlphabeticLetter>, regex: RegExp) {
        console.log(letters[0].literal);
        console.log(regex);
        //return letters.filter((g: AlphabeticLetter) => g.literal.search(regex) == 0);
        return letters[0].literal.search(regex) == 0;
    }

    pushToSyllable(context: StateContext, regex: RegExp){
        console.log("context.letters before pushing:%s.length: %d", context.letters, context.letters.length);
        context.syllables[context.syllables.length-1].pushLetter(context.letters.shift());
        console.log("context.letters after pushcing:%s.length: %d", context.letters, context.letters.length);
    }

    analyzeNextState(context: StateContext, state: SyllableState){
        try{
            if(context.letters.length > 0) {
                context.setState(state);
                context.analyze();
            }
        } catch (message) {
            console.log("failed in analyzeNextState method");
            //context.letters.shift();
        }
    }
}

class CheckedToneMarkState extends SyllableState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached checkedtonemarkstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.checkedToneMarkLettersRegexp)) {
            this.pushToSyllable(context, context.mar.checkedToneMarkLettersRegexp);
        }
    }
}

class NeutralToneMarkState extends SyllableState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached neutraltonemarkstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.neutralToneMarkLettersRegexp)) {
            this.pushToSyllable(context, context.mar.neutralToneMarkLettersRegexp);
        }
    }
}

class FreeToneMarkStateNew extends SyllableState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached freetonemarkstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.freeToneMarkLettersRegexp)) {
            this.pushToSyllable(context, context.mar.freeToneMarkLettersRegexp);
        }
    }
}

class CheckedFinalStateNew extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached nonneutralfinalstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.checkedFinalLettersRegexp)) {
            this.pushToSyllable(context, context.mar.checkedFinalLettersRegexp);
            if(this.isAtIndexZero(context.letters, context.mar.checkedToneMarkLettersRegexp)) {
                this.analyzeNextState(context, new CheckedToneMarkState());
            } else {
                context.letters.shift();
            }
    
        }
    }
}

class NeutralFinalState extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached neutralfinalstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.neutralToneMarkLettersRegexp)) {
            this.pushToSyllable(context, context.mar.neutralFinalLettersRegexp);
            if(this.isAtIndexZero(context.letters, context.mar.neutralToneMarkLettersRegexp)) {
                this.analyzeNextState(context, new NeutralToneMarkState());
            } else {
                context.letters.shift();
            }
        }
    }
}

class NasalState extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached nasalstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.nasalLettersRegexp)) {
            this.pushToSyllable(context, context.mar.nasalLettersRegexp);
            if(this.isAtIndexZero(context.letters, context.mar.freeToneMarkLettersRegexp)) {
                this.analyzeNextState(context, new FreeToneMarkStateNew());
            } else if(this.isAtIndexZero(context.letters, context.mar.neutralFinalLettersRegexp)) {
                this.analyzeNextState(context, new NeutralFinalState());
            } else {
                context.letters.shift();
            }
    
        }
    }
}

class MedialStateNew extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached medialstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.medialLettersRegexp)) {
            this.pushToSyllable(context, context.mar.medialLettersRegexp);
            if(this.isAtIndexZero(context.letters, context.mar.nasalLettersRegexp)) {
                this.analyzeNextState(context, new MedialStateNew()); // recursive call
            } else if(this.isAtIndexZero(context.letters, context.mar.nasalLettersRegexp)) {
                this.analyzeNextState(context, new NasalState());
            } else if(this.isAtIndexZero(context.letters, context.mar.freeToneMarkLettersRegexp)) {
                this.analyzeNextState(context, new FreeToneMarkStateNew());
            } else if(this.isAtIndexZero(context.letters, context.mar.checkedFinalLettersRegexp)) {
                this.analyzeNextState(context, new CheckedFinalStateNew());
            } else if(this.isAtIndexZero(context.letters, context.mar.neutralFinalLettersRegexp)) {
                this.analyzeNextState(context, new NeutralFinalState());
            } else {
                context.letters.shift();
            }
        } 
    }
}

class InitialStateNew extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached morphemeinitialstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        context.syllables.push(new ToneSandhiSyllable());
        if(this.isAtIndexZero(context.letters, context.mar.nonNasalInitialLettersRegexp)) {
            this.pushToSyllable(context, context.mar.nonNasalInitialLettersRegexp);
            this.analyzeNextState(context, new MedialStateNew());
        } else if(this.isAtIndexZero(context.letters, context.mar.nasalInitialLettersRegexp)) {
            this.pushToSyllable(context, context.mar.nasalInitialLettersRegexp);
            if(this.isAtIndexZero(context.letters, context.mar.freeToneMarkLettersRegexp)) {
                this.analyzeNextState(context, new FreeToneMarkStateNew());
            } else if(this.isAtIndexZero(context.letters, context.mar.neutralFinalLettersRegexp)) {
                this.analyzeNextState(context, new NeutralFinalState());
            }
        } else {
            context.letters.shift();
        }
    }
}

class SyllableInitialState extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached morphemeinitialstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.nonNasalInitialLettersRegexp) ||
            this.isAtIndexZero(context.letters, context.mar.nasalInitialLettersRegexp)) {
            this.analyzeNextState(context, new InitialStateNew());
        } else if (this.isAtIndexZero(context.letters, context.mar.medialLettersRegexp)) {
            this.analyzeNextState(context, new MedialStateNew());
        } else {
            context.letters.shift();
        }
    }
}

class StateContext {

    private myState: SyllableState;

    syllables: Array<ToneSandhiSyllable>;

    mar: MorphologicalAnalyzerRegex;

    letters: Array<AlphabeticLetter>;

    loopCount: number;

    constructor() {
        this.myState = null;
        this.letters = new Array();
        this.syllables = new Array();
        this.mar = new MorphologicalAnalyzerRegex(new Letters(new Characters())); // dependency injection via constructor
        this.setState(new InitialStateNew());
        this.loopCount = 0;
    }

    setState(newState: SyllableState) {
        this.myState = newState;

    }

    analyze() {
        do {
            this.loopCount++;
            this.myState.analyze(this);
            console.log("%cremained characters after analyzing: %s", "color: blue; font-size: medium", this.letters);
            try {
                if(this.letters == null || this.letters == undefined || this.letters.length == 0) {
                    break;
                }
            } catch(message) {
                console.log("failed to get length of l");
            }
            this.setState(new SyllableInitialState());
        } while(this.letters.length > 0);
    }
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphologicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphologicalAnalyzer {
    letters: Array<AlphabeticLetter>;
    sc: StateContext;

    constructor(letters: Array<AlphabeticLetter>) {
        this.letters = new Array();
        this.letters = letters;
        this.sc = new StateContext();
        this.sc.letters = letters;
    }

    analyze() {
        this.sc.analyze();
        console.log(this.sc.syllables);
        return this.sc.syllables;
    }
}
  