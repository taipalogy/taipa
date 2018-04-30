import { Lexicon, lexicon } from './lexicon';
import { Operand } from './expression';
import { Character, AlphabeticLetter } from './graphemicanalyzer';
import { State } from './state';
import { Context } from "./context";

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {
    // medial
    letterA = new AlphabeticLetter([new Character('a')]);
    letterE = new AlphabeticLetter([new Character('e')]);
    letterI = new AlphabeticLetter([new Character('i')]);
    letterO = new AlphabeticLetter([new Character('o')]);
    letterU = new AlphabeticLetter([new Character('u')]);
    letterUR = new AlphabeticLetter([new Character('u'), new Character('r')]);

    // initial excludes checked final and neutral final
    letterC = new AlphabeticLetter([new Character('c')]);
    letterJ = new AlphabeticLetter([new Character('j')]);
    letterL = new AlphabeticLetter([new Character('l')]);
    letterQ = new AlphabeticLetter([new Character('q')]);
    letterS = new AlphabeticLetter([new Character('s')]);
    letterV = new AlphabeticLetter([new Character('v')]);
    letterZ = new AlphabeticLetter([new Character('z')]);

    // nasal
    letterM = new AlphabeticLetter([new Character('m')]);
    letterN = new AlphabeticLetter([new Character('n')]);
    letterNG = new AlphabeticLetter([new Character('n'), new Character('g')]);
    letterNN = new AlphabeticLetter([new Character('n'), new Character('n')]);

    // free tone mark
    letterSS = new AlphabeticLetter([new Character('s'), new Character('s')]);
    letterW = new AlphabeticLetter([new Character('w')]);
    letterY = new AlphabeticLetter([new Character('y')]); // neutral tone mark
    letterX = new AlphabeticLetter([new Character('x')]);
    letterXX = new AlphabeticLetter([new Character('x'), new Character('x')]);
    letterXXX = new AlphabeticLetter([new Character('x'), new Character('x'), new Character('x')]);
    letterZS = new AlphabeticLetter([new Character('z'), new Character('s')]);
    letterZZS = new AlphabeticLetter([new Character('z'), new Character('z'), new Character('s')]);

    // checked tone mark and final
    letterB = new AlphabeticLetter([new Character('b')]); // initial
    letterD = new AlphabeticLetter([new Character('d')]); // initial
    letterG = new AlphabeticLetter([new Character('g')]); // initial
    letterK = new AlphabeticLetter([new Character('k')]); // initial
    letterP = new AlphabeticLetter([new Character('p')]); // initial
    letterT = new AlphabeticLetter([new Character('t')]); // initial

    // neutral final
    letterF = new AlphabeticLetter([new Character('f')]); // neutral tone mark
    letterH = new AlphabeticLetter([new Character('h')]); // neutral tone mark, initial

    nonNasalInitialLettersRegexp: RegExp;
    nasalInitialLettersRegexp: RegExp;
    medialLettersRegexp: RegExp;
    nasalLettersRegexp: RegExp;
    neutralFinalLettersRegexp: RegExp;
    checkedFinalLettersRegexp: RegExp;
    freeToneMarkLettersRegexp: RegExp;
    checkedToneMarkLettersRegexp: RegExp;
    neutralToneMarkLettersRegexp: RegExp;

    constructor(){
        let nonNasalInitials = this.letterB.literal
                                + '|' + this.letterC.literal
                                + '|' + this.letterD.literal
                                + '|' + this.letterG.literal
                                + '|' + this.letterH.literal
                                + '|' + this.letterJ.literal
                                + '|' + this.letterK.literal
                                + '|' + this.letterL.literal
                                + '|' + this.letterM.literal
                                + '|' + this.letterN.literal
                                + '|' + this.letterP.literal
                                + '|' + this.letterQ.literal
                                + '|' + this.letterS.literal
                                + '|' + this.letterT.literal
                                + '|' + this.letterV.literal
                                + '|' + this.letterZ.literal;
        this.nonNasalInitialLettersRegexp = new RegExp(nonNasalInitials);
        
        let nasalInitials = this.letterM.literal
                            + '|' + this.letterN.literal
                            + '|' + this.letterNG.literal;
        this.nasalInitialLettersRegexp = new RegExp(nasalInitials);

        let medials = this.letterA.literal
                        + '|' + this.letterE.literal
                        + '|' + this.letterI.literal
                        + '|' + this.letterO.literal
                        + '|' + this.letterU.literal
                        + '|' + this.letterUR.literal;
        this.medialLettersRegexp = new RegExp(medials);

        let nasals = this.letterM.literal
                        + '|' + this.letterN.literal
                        + '|' + this.letterNG.literal
                        + '|' + this.letterNN.literal;
        this.nasalLettersRegexp = new RegExp(nasals);

        let neutralFinals = this.letterF.literal
                            + '|' + this.letterH.literal;
        this.neutralFinalLettersRegexp = new RegExp(neutralFinals);

        let nonNeutralFinals = this.letterB.literal
                                + '|' + this.letterD.literal
                                + '|' + this.letterG.literal
                                + '|' + this.letterP.literal
                                + '|' + this.letterT.literal
                                + '|' + this.letterK.literal;
        this.checkedFinalLettersRegexp = new RegExp(nonNeutralFinals);

        let freeToneMarks = this.letterSS.literal
                            + '|' + this.letterY.literal
                            + '|' + this.letterW.literal
                            + '|' + this.letterX.literal
                            + '|' + this.letterXX.literal
                            + '|' + this.letterXXX.literal
                            + '|' + this.letterZS.literal
                            + '|' + this.letterZZS.literal;
        this.freeToneMarkLettersRegexp = new RegExp(freeToneMarks);
        
        let checkedToneMarks = this.letterB.literal
                                + '|' + this.letterD.literal
                                + '|' + this.letterG.literal
                                + '|' + this.letterP.literal
                                + '|' + this.letterT.literal
                                + '|' + this.letterK.literal
                                + '|' + this.letterX.literal;
        this.checkedToneMarkLettersRegexp = new RegExp(checkedToneMarks);

        let neutralToneMakrs = this.letterF.literal
                                + '|' + this.letterH.literal
                                + '|' + this.letterX.literal
                                + '|' + this.letterY.literal;
        this.neutralToneMarkLettersRegexp = new RegExp(neutralToneMakrs);
    }
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

export class Syllable extends Operand {
    literal: string = '';
    evaluate(context: Context){}
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
    }

    isBaseForm() {
        // look up in the lexicon to check if this syllable is in base form
    }

    get Stem() { return ''; }
    get Suffix() { return ''; }

    pushLetter(g: AlphabeticLetter) {
        this.letters.push(g);
        this.literal += g.literal;
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

    pushToMorpheme(context: StateContext, regex: RegExp){
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
            this.pushToMorpheme(context, context.mar.checkedToneMarkLettersRegexp);
        }
    }
}

class NeutralToneMarkState extends SyllableState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached neutraltonemarkstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.neutralToneMarkLettersRegexp)) {
            this.pushToMorpheme(context, context.mar.neutralToneMarkLettersRegexp);
        }
    }
}

class FreeToneMarkStateNew extends SyllableState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached freetonemarkstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.freeToneMarkLettersRegexp)) {
            this.pushToMorpheme(context, context.mar.freeToneMarkLettersRegexp);
        }
    }
}

class CheckedFinalStateNew extends SyllableState {
    analyze(context: StateContext) {
        console.log("%creached nonneutralfinalstate. context.letters:%s", "color: blue; font-size: medium", context.letters[0].literal);
        if(this.isAtIndexZero(context.letters, context.mar.checkedFinalLettersRegexp)) {
            this.pushToMorpheme(context, context.mar.checkedFinalLettersRegexp);
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
            this.pushToMorpheme(context, context.mar.neutralFinalLettersRegexp);
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
            this.pushToMorpheme(context, context.mar.nasalLettersRegexp);
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
            this.pushToMorpheme(context, context.mar.medialLettersRegexp);
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
            this.pushToMorpheme(context, context.mar.nonNasalInitialLettersRegexp);
            this.analyzeNextState(context, new MedialStateNew());
        } else if(this.isAtIndexZero(context.letters, context.mar.nasalInitialLettersRegexp)) {
            this.pushToMorpheme(context, context.mar.nasalInitialLettersRegexp);
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
        this.mar = new MorphologicalAnalyzerRegex();
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
  