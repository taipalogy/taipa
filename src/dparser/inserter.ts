import { GraphemeMaker } from '../grapheme';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { TonalAssimilationLexeme } from './lexeme';
import { Epenthesis } from './metaplasm';

export class TonalInserter {
    private readonly tschmm = new TonalSoundChangingMorphemeMaker();
    private readonly gm = new GraphemeMaker(lowerLettersTonal);

    private morphAnalyze(str: string) {
        const gs = this.gm.makeGraphemes(str);
        const mrphs = this.tschmm.makeMorphemes(gs);
        return mrphs;
    }

    insert(str: string) {
        const mrphs = this.morphAnalyze(str);
        const lx = new TonalAssimilationLexeme(mrphs, new Epenthesis());

        return lx;
    }
}
