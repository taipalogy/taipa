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
    doGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    doMorphologicalAnalysis(str: string, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    doMorphologicalAnalysis(gs: Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    doMorphologicalAnalysis(x: string | Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm) {
        let graphemes: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.doGraphemicAnalysis(x);
        }

        // Morpheme Maker
        let tmm = new TonalCombiningMorphemeMaker(graphemes, tcm);
        return tmm.makeMorphemes();
    }

    doLexicalAnalysis(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm): TonalInflexionLexeme[] {
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        // Lexeme Maker
        let tllm = new TonalInflexionLexemeMaker(morphemes, tim);
        return tllm.makeLexemes();
    }

    analyze(str: string, tcm: TonalCombiningMetaplasm, tim: TonalInflectingMetaplasm) {
        const tilm = new TonalInflexionLexemeMaker(this.doMorphologicalAnalysis(str, tcm), tim);
        return tilm.makeLexemes();
    }
}

export const tonal_inflextion_analyzer = new TonalInflextionAnalyzer();

export class PhrasalVerbAnalyzer {
    analyze(verb: string, particle: string) {
        const lexemeV = tonal_inflextion_analyzer.analyze(verb, new TonalCombiningForms(), new TonalInflexion())[0];
        const lexemeP = tonal_inflextion_analyzer.analyze(particle, new PhrasalVerbParticleDiurh(), new TonalInflexion())[0];
        const p = new TonalInflexionPhrasemeMaker(lexemeV, lexemeP);
        return p.makePhrasemes();
    }
}