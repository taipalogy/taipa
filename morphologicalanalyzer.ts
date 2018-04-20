import { Lexicon, lexicon } from './lexicon';
import { Expression } from './expression';
import { Character, AlphabetGrapheme } from './graphemicanalyzer';
import { State } from './state';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {
    // medial
    graphemeA = new AlphabetGrapheme([new Character('a')]);
    graphemeE = new AlphabetGrapheme([new Character('e')]);
    graphemeI = new AlphabetGrapheme([new Character('i')]);
    graphemeO = new AlphabetGrapheme([new Character('o')]);
    graphemeU = new AlphabetGrapheme([new Character('u')]);
    graphemeUR = new AlphabetGrapheme([new Character('u'), new Character('r')]);

    // initial excludes checked final and neutral final
    graphemeC = new AlphabetGrapheme([new Character('c')]);
    graphemeJ = new AlphabetGrapheme([new Character('j')]);
    graphemeL = new AlphabetGrapheme([new Character('l')]);
    graphemeQ = new AlphabetGrapheme([new Character('q')]);
    graphemeS = new AlphabetGrapheme([new Character('s')]);
    graphemeV = new AlphabetGrapheme([new Character('v')]);
    graphemeZ = new AlphabetGrapheme([new Character('z')]);

    // nasal
    graphemeM = new AlphabetGrapheme([new Character('m')]);
    graphemeN = new AlphabetGrapheme([new Character('n')]);
    graphemeNG = new AlphabetGrapheme([new Character('n'), new Character('g')]);
    graphemeNN = new AlphabetGrapheme([new Character('n'), new Character('n')]);

    // free tone mark
    graphemeSS = new AlphabetGrapheme([new Character('s'), new Character('s')]);
    graphemeW = new AlphabetGrapheme([new Character('w')]);
    graphemeY = new AlphabetGrapheme([new Character('y')]); // neutral tone mark
    graphemeX = new AlphabetGrapheme([new Character('x')]);
    graphemeXX = new AlphabetGrapheme([new Character('x'), new Character('x')]);
    graphemeXXX = new AlphabetGrapheme([new Character('x'), new Character('x'), new Character('x')]);
    graphemeZS = new AlphabetGrapheme([new Character('z'), new Character('s')]);
    graphemeZZS = new AlphabetGrapheme([new Character('z'), new Character('z'), new Character('s')]);

    // checked tone mark and final
    graphemeB = new AlphabetGrapheme([new Character('b')]); // initial
    graphemeD = new AlphabetGrapheme([new Character('d')]); // initial
    graphemeG = new AlphabetGrapheme([new Character('g')]); // initial
    graphemeK = new AlphabetGrapheme([new Character('k')]); // initial
    graphemeP = new AlphabetGrapheme([new Character('p')]); // initial
    graphemeT = new AlphabetGrapheme([new Character('t')]); // initial

    // neutral final
    graphemeF = new AlphabetGrapheme([new Character('f')]); // neutral tone mark
    graphemeH = new AlphabetGrapheme([new Character('h')]); // neutral tone mark, initial

    nonNasalInitialGraphemesRegexp: RegExp;
    nasalInitialGraphemesRegexp: RegExp;
    medialGraphemesRegexp: RegExp;
    nasalGraphemesRegexp: RegExp;
    neutralFinalGraphemesRegexp: RegExp;
    checkedFinalGraphemesRegexp: RegExp;
    freeToneMarkGraphemesRegexp: RegExp;
    checkedToneMarkGraphemesRegexp: RegExp;
    neutralToneMarkGraphemesRegexp: RegExp;

    constructor(){
        let nonNasalInitials = this.graphemeB.literal
                                + '|' + this.graphemeC.literal
                                + '|' + this.graphemeD.literal
                                + '|' + this.graphemeG.literal
                                + '|' + this.graphemeH.literal
                                + '|' + this.graphemeJ.literal
                                + '|' + this.graphemeK.literal
                                + '|' + this.graphemeL.literal
                                + '|' + this.graphemeM.literal
                                + '|' + this.graphemeN.literal
                                + '|' + this.graphemeP.literal
                                + '|' + this.graphemeQ.literal
                                + '|' + this.graphemeS.literal
                                + '|' + this.graphemeT.literal
                                + '|' + this.graphemeV.literal
                                + '|' + this.graphemeZ.literal;
        this.nonNasalInitialGraphemesRegexp = new RegExp(nonNasalInitials);
        
        let nasalInitials = this.graphemeM.literal
                            + '|' + this.graphemeN.literal
                            + '|' + this.graphemeNG.literal;
        this.nasalInitialGraphemesRegexp = new RegExp(nasalInitials);

        let medials = this.graphemeA.literal
                        + '|' + this.graphemeE.literal
                        + '|' + this.graphemeI.literal
                        + '|' + this.graphemeO.literal
                        + '|' + this.graphemeU.literal
                        + '|' + this.graphemeUR.literal;
        this.medialGraphemesRegexp = new RegExp(medials);

        let nasals = this.graphemeM.literal
                        + '|' + this.graphemeN.literal
                        + '|' + this.graphemeNG.literal
                        + '|' + this.graphemeNN.literal;
        this.nasalGraphemesRegexp = new RegExp(nasals);

        let neutralFinals = this.graphemeF.literal
                            + '|' + this.graphemeH.literal;
        this.neutralFinalGraphemesRegexp = new RegExp(neutralFinals);

        let nonNeutralFinals = this.graphemeB.literal
                                + '|' + this.graphemeD.literal
                                + '|' + this.graphemeG.literal
                                + '|' + this.graphemeP.literal
                                + '|' + this.graphemeT.literal
                                + '|' + this.graphemeK.literal;
        this.checkedFinalGraphemesRegexp = new RegExp(nonNeutralFinals);

        let freeToneMarks = this.graphemeSS.literal
                            + '|' + this.graphemeY.literal
                            + '|' + this.graphemeW.literal
                            + '|' + this.graphemeX.literal
                            + '|' + this.graphemeXX.literal
                            + '|' + this.graphemeXXX.literal
                            + '|' + this.graphemeZS.literal
                            + '|' + this.graphemeZZS.literal;
        this.freeToneMarkGraphemesRegexp = new RegExp(freeToneMarks);
        
        let checkedToneMarks = this.graphemeB.literal
                                + '|' + this.graphemeD.literal
                                + '|' + this.graphemeG.literal
                                + '|' + this.graphemeP.literal
                                + '|' + this.graphemeT.literal
                                + '|' + this.graphemeK.literal
                                + '|' + this.graphemeX.literal;
        this.checkedToneMarkGraphemesRegexp = new RegExp(checkedToneMarks);

        let neutralToneMakrs = this.graphemeF.literal
                                + '|' + this.graphemeH.literal
                                + '|' + this.graphemeX.literal
                                + '|' + this.graphemeY.literal;
        this.neutralToneMarkGraphemesRegexp = new RegExp(neutralToneMakrs);
    }
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

export class Morpheme extends Expression {
}

export class ToneSandhiMorpheme extends Morpheme {
    graphemes: Array<AlphabetGrapheme>;

    constructor(graphemes?: Array<AlphabetGrapheme>) {
        super();
        this.graphemes = new Array();
    }

    isBaseForm() {
        // look up in the lexicon to check if this morpheme is in base form
    }

    get Stem() { return ''; }
    get Suffix() { return ''; }

    pushGrapheme(g: AlphabetGrapheme) {
        this.graphemes.push(g);
        this.literal += g.literal;
    }
}

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

class MorphologicalState implements State {
    analyze(context: StateContext) { return null; }

    isAtIndexZero(graphemes: Array<AlphabetGrapheme>, regex: RegExp) {
        console.log(graphemes[0].literal);
        console.log(regex);
        //return graphemes.filter((g: AlphabetGrapheme) => g.literal.search(regex) == 0);
        return graphemes[0].literal.search(regex) == 0;
    }

    pushToMorpheme(context: StateContext, regex: RegExp){
        console.log("context.graphemes before pushing:%s.length: %d", context.graphemes, context.graphemes.length);
        context.morphemes[context.morphemes.length-1].pushGrapheme(context.graphemes.shift());
        console.log("context.graphemes after pushcing:%s.length: %d", context.graphemes, context.graphemes.length);
    }

    analyzeNextState(context: StateContext, state: MorphologicalState){
        try{
            if(context.graphemes.length > 0) {
                context.setState(state);
                context.analyze();
            }
        } catch (message) {
            console.log("failed in analyzeNextState method");
            //context.graphemes.shift();
        }
    }
}

class CheckedToneMarkState extends MorphologicalState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached checkedtonemarkstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.checkedToneMarkGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.checkedToneMarkGraphemesRegexp);
        }
    }
}

class NeutralToneMarkState extends MorphologicalState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached neutraltonemarkstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.neutralToneMarkGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.neutralToneMarkGraphemesRegexp);
        }
    }
}

class FreeToneMarkStateNew extends MorphologicalState {
    analyze(context: StateContext) {
        // terminal state
        console.log("%creached freetonemarkstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.freeToneMarkGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.freeToneMarkGraphemesRegexp);
        }
    }
}

class CheckedFinalStateNew extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached nonneutralfinalstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.checkedFinalGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.checkedFinalGraphemesRegexp);
            if(this.isAtIndexZero(context.graphemes, context.mar.checkedToneMarkGraphemesRegexp)) {
                this.analyzeNextState(context, new CheckedToneMarkState());
            } else {
                context.graphemes.shift();
            }
    
        }
    }
}

class NeutralFinalState extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached neutralfinalstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.neutralToneMarkGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.neutralFinalGraphemesRegexp);
            if(this.isAtIndexZero(context.graphemes, context.mar.neutralToneMarkGraphemesRegexp)) {
                this.analyzeNextState(context, new NeutralToneMarkState());
            } else {
                context.graphemes.shift();
            }
        }
    }
}

class NasalState extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached nasalstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.nasalGraphemesRegexp);
            if(this.isAtIndexZero(context.graphemes, context.mar.freeToneMarkGraphemesRegexp)) {
                this.analyzeNextState(context, new FreeToneMarkStateNew());
            } else if(this.isAtIndexZero(context.graphemes, context.mar.neutralFinalGraphemesRegexp)) {
                this.analyzeNextState(context, new NeutralFinalState());
            } else {
                context.graphemes.shift();
            }
    
        }
    }
}

class MedialStateNew extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached medialstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.medialGraphemesRegexp);
            if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
                this.analyzeNextState(context, new MedialStateNew()); // recursive call
            } else if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
                this.analyzeNextState(context, new NasalState());
            } else if(this.isAtIndexZero(context.graphemes, context.mar.freeToneMarkGraphemesRegexp)) {
                this.analyzeNextState(context, new FreeToneMarkStateNew());
            } else if(this.isAtIndexZero(context.graphemes, context.mar.checkedFinalGraphemesRegexp)) {
                this.analyzeNextState(context, new CheckedFinalStateNew());
            } else if(this.isAtIndexZero(context.graphemes, context.mar.neutralFinalGraphemesRegexp)) {
                this.analyzeNextState(context, new NeutralFinalState());
            } else {
                context.graphemes.shift();
            }
        } 
    }
}

class InitialStateNew extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached morphemeinitialstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        context.morphemes.push(new ToneSandhiMorpheme());
        if(this.isAtIndexZero(context.graphemes, context.mar.nonNasalInitialGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.nonNasalInitialGraphemesRegexp);
            this.analyzeNextState(context, new MedialStateNew());
        } else if(this.isAtIndexZero(context.graphemes, context.mar.nasalInitialGraphemesRegexp)) {
            this.pushToMorpheme(context, context.mar.nasalInitialGraphemesRegexp);
            if(this.isAtIndexZero(context.graphemes, context.mar.freeToneMarkGraphemesRegexp)) {
                this.analyzeNextState(context, new FreeToneMarkStateNew());
            } else if(this.isAtIndexZero(context.graphemes, context.mar.neutralFinalGraphemesRegexp)) {
                this.analyzeNextState(context, new NeutralFinalState());
            }
        } else {
            context.graphemes.shift();
        }
    }
}

class MorphemeInitialState extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached morphemeinitialstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.nonNasalInitialGraphemesRegexp) ||
            this.isAtIndexZero(context.graphemes, context.mar.nasalInitialGraphemesRegexp)) {
            this.analyzeNextState(context, new InitialStateNew());
        } else if (this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
            this.analyzeNextState(context, new MedialStateNew());
        } else {
            context.graphemes.shift();
        }
    }
}

class StateContext {

    private myState: MorphologicalState;

    morphemes: Array<ToneSandhiMorpheme>;

    mar: MorphologicalAnalyzerRegex;

    graphemes: Array<AlphabetGrapheme>;

    loopCount: number;

    constructor() {
        this.myState = null;
        this.graphemes = new Array();
        this.morphemes = new Array();
        this.mar = new MorphologicalAnalyzerRegex();
        this.setState(new InitialStateNew());
        this.loopCount = 0;
    }

    setState(newState: MorphologicalState) {
        this.myState = newState;

    }

    analyze() {
        do {
            this.loopCount++;
            this.myState.analyze(this);
            console.log("%cremained characters after analyzing: %s", "color: blue; font-size: medium", this.graphemes);
            try {
                if(this.graphemes == null || this.graphemes == undefined || this.graphemes.length == 0) {
                    break;
                }
            } catch(message) {
                console.log("failed to get length of l");
            }
            this.setState(new MorphemeInitialState());
        } while(this.graphemes.length > 0);
    }
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphologicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphologicalAnalyzer {
    graphemes: Array<AlphabetGrapheme>;
    sc: StateContext;

    constructor(graphemes: Array<AlphabetGrapheme>) {
        this.graphemes = new Array();
        this.graphemes = graphemes;
        this.sc = new StateContext();
        this.sc.graphemes = graphemes;
    }

    analyze() {
        this.sc.analyze();
        console.log(this.sc.morphemes);
        return this.sc.morphemes;
    }
}
  