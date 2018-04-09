import { Lexicon, lexicon } from './lexicon';
import { Expression } from './expression';
import { Grapheme } from './graphemicanalyzer';
import { State } from './state';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {

    public static readonly initial = /b|c|d|g|h|j|k|l|p|q|s|t|v|z/g;
    public static readonly nasalInitial = /m|ng?/g;
    public static readonly medial = /a(i|u)?|e|i(au?|e|o|ur?)?|o|u(ai?|e|r)?/g;
    public static readonly nasalNn = /nn/g;

    public static readonly neutralFinal = /f|h/g;
    public static readonly nonNeutralFinal = /b|d|g|k|p|t/g;
    public static readonly freeToneMark = /ss|y|w|xx?|zz?s/g;
    public static readonly checkedToneMark = /b|d|g|k|p|t|x|y/g;
    public static readonly neutralToneMark = /f|x|h|y/g;
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
    initial: string;
    medial: string;
    nasal: string;
    final: string;
    toneMark: string;

    constructor() {
        super();

        this.initial = '';
        this.medial = '';
        this.nasal = '';
        this.final = '';
        this.toneMark = '';
    }
    
    isBaseForm() {
        // look up in the lexicon to check if this morpheme is in base form
    }

    getStem() { return this.initial + this.medial + this.nasal + this.final; }
    getSuffix() { return this.toneMark; }
}

//------------------------------------------------------------------------------
//  State pattern
//------------------------------------------------------------------------------

class MorphologicalState implements State {
    analyze(context: StateContext, graphemes: Array<Grapheme>) { return null; }
    isAtIndexZero(graphemes: Array<Grapheme>, regex: RegExp) {
        console.log(graphemes);
        return graphemes.filter((g: Grapheme) => g.literal.search(regex) == 0);
    }
}

class NonNeutralFinalState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<Grapheme>) {
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
    analyze(context: StateContext, graphemes: Array<Grapheme>) {
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
    analyze(context: StateContext, graphemes: Array<Grapheme>) {
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

class NasalState extends MorphologicalState {

}

class NasalNnState extends MorphologicalState {

}

class InitialState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<Grapheme>) {
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
        } else if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nasalNn)) {
            context.setState(new NasalNnState());
            return context.analyze(graphemes);
        }
    }
}

class NasalInitialState extends MorphologicalState {

}

class ToneSandhiSyllableState extends MorphologicalState {
    analyze(context: StateContext, graphemes: Array<Grapheme>) {
        if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.initial) ||
            this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.medial) ||
            this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.nasalInitial)) {

                context.morphemes.push(new ToneSandhiMorpheme());
                if(this.isAtIndexZero(graphemes, MorphologicalAnalyzerRegex.initial)) {
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

class StateContext {

    private myState: MorphologicalState;

    morphemes: Array<ToneSandhiMorpheme>;

    constructor() {
        this.myState = new MorphologicalState();
        this.morphemes = new Array();
        this.setState(new ToneSandhiSyllableState());
    }

    setState(newState: MorphologicalState) {
        this.myState = newState;

    }

    analyze(graphemes: Array<Grapheme>) {
        let gs: Array<Grapheme> = new Array();
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
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphologicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphologicalAnalyzer {
    graphemes: Array<Grapheme>;
    sc: StateContext;

    constructor(graphemes: Array<Grapheme>) {
        //this.graphemes = new Array();
        this.graphemes = graphemes;
        this.sc = new StateContext();
    }

    analyze() {
        this.sc.analyze(this.graphemes);
        console.log(this.sc.morphemes);
        return this.sc.morphemes;
    }
}
  