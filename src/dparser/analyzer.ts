import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme, TonalCombiningForms } from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import { TonalInflexionLexemeMaker, TonalInflexionLexeme, TonalInflexion } from './lexeme';
import { TonalInflectingMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { VerbSurface, PhrasalVerbParticleDiurh, ParticleSurface } from './keywords';
import { TonalInflexionPhrasemeMaker } from './phraseme';

//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer extends Analyzer {
    graphAnalyze(str: string): AlphabeticGrapheme[] {
        // graphemic analysis
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    morphAnalyze(str: string, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    morphAnalyze(gs: Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    morphAnalyze(x: string | Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm) {
        // morphological analysis
        let graphemes: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.graphAnalyze(x);
        }

        let tmm = new TonalCombiningMorphemeMaker(graphemes, tcm);
        return tmm.makeMorphemes();
    }

    lexAnalyze(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm): TonalInflexionLexeme {
        // lexical analysis
        // TODO: redundant method?
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        let tllm = new TonalInflexionLexemeMaker(morphemes, tim);
        return tllm.makeLexemes();
    }

    analyze(str: string, tcm: TonalCombiningMetaplasm, tim: TonalInflectingMetaplasm) {
        const tilm = new TonalInflexionLexemeMaker(this.morphAnalyze(str, tcm), tim);
        return tilm.makeLexemes();
    }
}

export class PhrasalVerbAnalyzer {
    tia = new TonalInflextionAnalyzer();
    analyze(verb: string, particle: string) {
        const lexemeV = this.tia.analyze(verb, new TonalCombiningForms(), new TonalInflexion());
        const lexemeP = this.tia.analyze(particle, new PhrasalVerbParticleDiurh(), new TonalInflexion());
        const p = new TonalInflexionPhrasemeMaker(lexemeV, lexemeP);
        return p.makePhrasemes();
    }
}