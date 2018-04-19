import { Lexicon, lexicon } from './lexicon';
import { Expression } from './expression';
import { Character, AlphabetGrapheme } from './graphemicanalyzer';
import { State } from './state';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {

    public static readonly nonNasalInitial = /b|c|d|g|h|j|k|l|p|q|s|t|v|z/g;
    public static readonly nasalInitial = /m|ng?/g;
    public static readonly medial = /a|e|i|o|ur?/g;
    public static readonly nasal = /m|n(g|n)?/g;

    public static readonly neutralFinal = /f|h/g;
    public static readonly nonNeutralFinal = /b|d|g|k|p|t/g;
    public static readonly freeToneMark = /ss|y|w|xx?x?|zz?s/g;
    public static readonly checkedToneMark = /b|d|g|k|p|t|x/g;
    public static readonly neutralToneMark = /f|x|h|y/g;

    // medial
    graphemeA = new AlphabetGrapheme([new Character('a')]);
    graphemeE = new AlphabetGrapheme([new Character('e')]);
    graphemeI = new AlphabetGrapheme([new Character('i')]);
    graphemeO = new AlphabetGrapheme([new Character('o')]);
    graphemeU = new AlphabetGrapheme([new Character('u')]);
    graphemeUR = new AlphabetGrapheme([new Character('u'), new Character('r')]);

    // initial
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
    graphemeY = new AlphabetGrapheme([new Character('y')]);// neutral tone mark
    graphemeX = new AlphabetGrapheme([new Character('x')]);
    graphemeXX = new AlphabetGrapheme([new Character('x'), new Character('x')]);
    graphemeXXX = new AlphabetGrapheme([new Character('x'), new Character('x'), new Character('x')]);
    graphemeZS = new AlphabetGrapheme([new Character('z'), new Character('s')]);
    graphemeZZS = new AlphabetGrapheme([new Character('z'), new Character('z'), new Character('s')]);

    // checked tone mark
    graphemeB = new AlphabetGrapheme([new Character('b')]);
    graphemeD = new AlphabetGrapheme([new Character('d')]);
    graphemeF = new AlphabetGrapheme([new Character('f')]); // neutral tone mark
    graphemeG = new AlphabetGrapheme([new Character('g')]);
    graphemeH = new AlphabetGrapheme([new Character('h')]); // neutral tone mark
    graphemeK = new AlphabetGrapheme([new Character('k')]);
    graphemeP = new AlphabetGrapheme([new Character('p')]);
    graphemeT = new AlphabetGrapheme([new Character('t')]);

    nonNasalInitialGraphemesRegexp: RegExp;
    nasalInitialGraphemesRegexp: RegExp;
    medialGraphemesRegexp: RegExp;
    nasalGraphemesRegexp: RegExp;
    neutralFinalGraphemesRegexp: RegExp;
    nonNeutralFinalGraphemesRegexp: RegExp;
    freeTonemarkGraphemesRegexp: RegExp;
    checkedTonemarkGraphemesRegexp: RegExp;
    neutralTonemarkGraphemesRegexp: RegExp;

    constructor(){
        let nonNasalInitials = this.graphemeB.toString()
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
        this.nonNeutralFinalGraphemesRegexp = new RegExp(nonNeutralFinals);

        let freeToneMarks = this.graphemeSS.literal
                            + '|' + this.graphemeY.literal
                            + '|' + this.graphemeW.literal
                            + '|' + this.graphemeX.literal
                            + '|' + this.graphemeXX.literal
                            + '|' + this.graphemeXXX.literal
                            + '|' + this.graphemeZS.literal
                            + '|' + this.graphemeZZS.literal;
        this.freeTonemarkGraphemesRegexp = new RegExp(freeToneMarks);
        
        let checkedToneMarks = this.graphemeB.literal
                                + '|' + this.graphemeD.literal
                                + '|' + this.graphemeG.literal
                                + '|' + this.graphemeP.literal
                                + '|' + this.graphemeT.literal
                                + '|' + this.graphemeK.literal
                                + '|' + this.graphemeX.literal;
        this.checkedTonemarkGraphemesRegexp = new RegExp(checkedToneMarks);

        let neutralToneMakrs = this.graphemeF.literal
                                + '|' + this.graphemeH.literal
                                + '|' + this.graphemeX.literal
                                + '|' + this.graphemeY.literal;
        this.neutralTonemarkGraphemesRegexp = new RegExp(neutralToneMakrs);
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
    analyze(context: StateContext, graphemes: Array<AlphabetGrapheme>) { return null; }
    
    analyzeNew(context: StateContext) { return null; }

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
                context.analyzeNew();
            }
        } catch (message) {
            console.log("failed in analyzeNextState method");
        }
    }
}
/*
class NonNeutralFinalState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<AlphabetGrapheme>) {
        console.log("reached nonneutralfinalstate. literal:%s", graphemes[0].literal);

        let s = graphemes[0].literal;
        // populate the morpheme
        context.morphemes[context.morphemes.length-1].final += s;
        graphemes.shift(); // discard the first element

        context.setState(new ToneSandhiSyllableState());
        context.analyze(graphemes);
    }
}

class FreeToneMarkState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<AlphabetGrapheme>) {
        console.log("reached freetonemarkerstate. literal:%s", graphemes[0].literal);

        let s = graphemes[0].literal;
        // populate the morpheme
        context.morphemes[context.morphemes.length-1].toneMark += s;
        graphemes.shift(); // discard the first element

        context.setState(new ToneSandhiSyllableState());
        return context.analyze(graphemes);
    }
}

class MedialState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<AlphabetGrapheme>) {
        console.log("reached medialstate. literal:%s", graphemes[0].literal);
        
        let s = graphemes[0].literal;
        // populate the morpheme
        context.morphemes[context.morphemes.length-1].medial += s;
        graphemes.shift(); // discard the first element
        if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.freeToneMark)) {
            context.setState(new FreeToneMarkState());
            return context.analyze(graphemes);
        } else if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nonNeutralFinal)) {
            context.setState(new NonNeutralFinalState());
            return context.analyze(graphemes);
        }

    }
}
*/
class CheckedToneMarkState extends MorphologicalState {
    analyzeNew(context: StateContext) {
        // terminal state
        console.log("%creached checkedtonemarkstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.checkedTonemarkGraphemesRegexp);
    }
}

class NeutralToneMarkState extends MorphologicalState {
    analyzeNew(context: StateContext) {
        // terminal state
        console.log("%creached neutraltonemarkstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.neutralTonemarkGraphemesRegexp);
    }
}

class FreeToneMarkStateNew extends MorphologicalState {
    analyzeNew(context: StateContext) {
        // terminal state
        console.log("%creached freetonemarkstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.freeTonemarkGraphemesRegexp);
    }
}

class NonNeutralFinalStateNew extends MorphologicalState {
    analyzeNew(context: StateContext) {
        console.log("%creached nonneutralfinalstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.nonNeutralFinalGraphemesRegexp);
        if(this.isAtIndexZero(context.graphemes, context.mar.checkedTonemarkGraphemesRegexp)) {
            this.analyzeNextState(context, new CheckedToneMarkState());
        } else {
            context.graphemes.shift();
        }
    }
}

class NeutralFinalState extends MorphologicalState {
    analyzeNew(context: StateContext) {
        console.log("%creached neutralfinalstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.neutralFinalGraphemesRegexp);
        if(this.isAtIndexZero(context.graphemes, context.mar.neutralTonemarkGraphemesRegexp)) {
            this.analyzeNextState(context, new NeutralToneMarkState());
        } else {
            context.graphemes.shift();
        }
    }
}

class NasalState extends MorphologicalState {
    analyzeNew(context: StateContext) {
        console.log("%creached nasalstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.nasalGraphemesRegexp);
        if(this.isAtIndexZero(context.graphemes, context.mar.freeTonemarkGraphemesRegexp)) {
            this.analyzeNextState(context, new FreeToneMarkStateNew());
        } else if(this.isAtIndexZero(context.graphemes, context.mar.neutralFinalGraphemesRegexp)) {
            this.analyzeNextState(context, new NeutralFinalState());
        } else {
            context.graphemes.shift();
        }
    }
}

class NasalNnState extends MorphologicalState{

}
/*
class InitialState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<AlphabetGrapheme>) {
        console.log("reached initialstate. literal:%s", graphemes[0].literal);
        
        let s = graphemes[0].literal;
        // populate the morpheme
        context.morphemes[context.morphemes.length-1].initial += s;
        graphemes.shift(); // discard the first element
        if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.medial)) {
            context.setState(new MedialState());
            return context.analyze(graphemes);
        } else if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nasalInitial)) {
            context.setState(new NasalState());
            return context.analyze(graphemes);
        } else if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nasal)) {
            context.setState(new NasalNnState());
            return context.analyze(graphemes);
        }
    }
}
*/
class NasalInitialState extends MorphologicalState {

}
/*
class ToneSandhiSyllableState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<AlphabetGrapheme>) {
        if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nonNasalInitial) ||
            this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.medial) ||
            this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nonNasalInitial)) {

                context.morphemes.push(new ToneSandhiMorpheme());
                if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nonNasalInitial)) {
                    // includes m, n, ng.
                    context.setState(new InitialState());
                    return context.analyze(graphemes);    
                } else if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.medial)) {
                    context.setState(new MedialState());
                    return context.analyze(graphemes);    
                } else if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nasalInitial)) {
                    context.setState(new NasalInitialState());
                    return context.analyze(graphemes);
                } else {
                    console.log("something wrong in syllable state");
                }
        }
    }
}
*/
class MedialStateNew extends MorphologicalState {
    analyzeNew(context: StateContext) {
        console.log("%creached medialstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        this.pushToMorpheme(context, context.mar.medialGraphemesRegexp);
        if(this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
            this.analyzeNextState(context, new MedialStateNew()); // recursive call
        } else if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
            this.analyzeNextState(context, new NasalState());
        } else if(this.isAtIndexZero(context.graphemes, context.mar.freeTonemarkGraphemesRegexp)) {
            this.analyzeNextState(context, new FreeToneMarkStateNew());
        } else if(this.isAtIndexZero(context.graphemes, context.mar.nonNeutralFinalGraphemesRegexp)) {
            this.analyzeNextState(context, new NonNeutralFinalStateNew());
        } else if(this.isAtIndexZero(context.graphemes, context.mar.neutralFinalGraphemesRegexp)) {
            this.analyzeNextState(context, new NeutralFinalState());
        } else {
            context.graphemes.shift();
        }
    }
}
/*
class GraphemeOneState extends MorphologicalState {
    analyze(context: StateContext) {
        console.log("%creached characteronestate. chars:%s", "color: blue; font-size: medium", context.graphemes[0]);
        // we can have only one new
        context.graphemes.push(new ToneSandhiMorpheme());
        if(this.isAtIndexZero(context.graphemes, context.mar.initialGraphemesRegexp)) {
            // match initial, set next state to medial
            // match c, q, s, v, z, m, n, h, d, t, h, k, set next state to medial
            this.pushToMorpheme(context, context.mar.initialGraphemesRegexp);
            if(this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
                this.analyzeNextState(context, new MedialStateNew());
            } else if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
                this.analyzeNextState(context, new NasalState());
            }
        } else if (this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
            // match medial, set next state to medial
            this.pushToMorpheme(context, context.mar.medialGraphemesRegexp);
        } else if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
            // match nasal, set next state to tone mark
        }
    }
}
*/
class InitialStateNew extends MorphologicalState {
    analyzeNew(context: StateContext) {
        console.log("%creached morphemeinitialstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        context.morphemes.push(new ToneSandhiMorpheme());
        this.pushToMorpheme(context, context.mar.nonNasalInitialGraphemesRegexp);
        if(this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
            this.analyzeNextState(context, new MedialStateNew());
        } else if(this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
            this.analyzeNextState(context, new NasalState());
        } else {
            context.graphemes.shift();
        }
    }
}

class MorphemeInitialState extends MorphologicalState {
    analyzeNew(context: StateContext) {
        console.log("%creached morphemeinitialstate. context.graphemes:%s", "color: blue; font-size: medium", context.graphemes[0].literal);
        if(this.isAtIndexZero(context.graphemes, context.mar.nonNasalInitialGraphemesRegexp) ||
            this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp) ||
            this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
            if(this.isAtIndexZero(context.graphemes, context.mar.nonNasalInitialGraphemesRegexp)) {
                this.analyzeNextState(context, new InitialStateNew());
            } else if (this.isAtIndexZero(context.graphemes, context.mar.medialGraphemesRegexp)) {
                this.analyzeNextState(context, new MedialStateNew());
            } else if (this.isAtIndexZero(context.graphemes, context.mar.nasalGraphemesRegexp)) {
                this.analyzeNextState(context, new NasalState());
            } else {
                context.graphemes.shift();
            }
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
        //this.setState(new ToneSandhiSyllableState());
        this.mar = new MorphologicalAnalyzerRegex();
        this.setState(new InitialStateNew());
        this.loopCount = 0;
    }

    setState(newState: MorphologicalState) {
        this.myState = newState;

    }

    analyze(graphemes: Array<AlphabetGrapheme>) {
        let gs: Array<AlphabetGrapheme> = new Array();
        gs = graphemes;
        do {
            try {
                gs = this.myState.analyze(this, gs);
            
                console.log("%cremained graphemes after analyzing: %s", "color: green; font-size: medium", gs);
                if(gs == null) {
                    break;
                }
            } catch(message) {
                console.log("%cfailed to get length of l", "color: green; font-size: medium");
            }
        } while(gs.length > 0);
    }

    analyzeNew() {
        do {
            this.loopCount++;
            this.myState.analyzeNew(this);
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
        this.sc.analyzeNew();
        console.log(this.sc.morphemes);
        return this.sc.morphemes;
    }
}
  