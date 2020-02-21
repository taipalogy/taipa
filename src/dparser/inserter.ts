import { GraphemeMaker } from '../grapheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { Epenthesis, TonalAssimilationLexeme } from './lexeme';

export class TonalInserter {
    private readonly tschmm = new TonalSoundChangingMorphemeMaker();
    private readonly gm = new GraphemeMaker(lowerLettersOfTonal);

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
