import { Rules } from './rules';
import { POSTags, Tagset } from './symbols';
import { tonal_inflextion_analyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { ConstructionElement, Demonstrative, PersonalPronoun2To137 } from './keywords';
import { tonal_lemmatization_analyzer } from '../tonal/analyzer';

export class RuleBasedTagger {
    private ces: Array<ConstructionElement> = new Array();

    constructor(strs: string[]) {
        this.match(strs);
    }

    private match(strs: string[]) {
        const rs = new Rules();
        let buf: string[] = [];

        while (strs.length > 0) {
            let s = strs.shift();
            if (s) buf.push(s);

            //console.log(buf)
            let cps = rs.matchPatterns(buf);
            if (cps && cps.length > 0) {
                // for phrases
                for (let cp of cps) {
                    if (
                        cp.partOfSpeech === POSTags.verb &&
                        cp.elements[cp.elements.length - 1].pos === POSTags.particle
                    ) {
                        cp.elements[cp.elements.length - 1].setTag(Tagset.RPPV);
                        cp.elements[cp.elements.length - 1].setWordForm(buf[1]);

                        if (
                            cp.elements[cp.elements.length - 1].wordForm !=
                            cp.elements[cp.elements.length - 1].lexeme.word.literal
                        ) {
                            const ls = tonal_lemmatization_analyzer.doLexicalAnalysis(buf[0]);
                            cp.elements[0].lexeme = tonal_inflextion_analyzer.doAnalysis(
                                ls[0].lemmata[0].literal,
                                new TonalCombiningForms(),
                                new TonalInflexion(),
                            )[0];
                        } else {
                            cp.elements[0].lexeme = tonal_inflextion_analyzer.doAnalysis(
                                buf[0],
                                new TonalCombiningForms(),
                                new TonalInflexion(),
                            )[0];
                        }

                        cp.elements[0].setTag(Tagset.VB);
                        cp.elements[0].setWordForm(buf[0]);
                    }
                    for (let e of cp.elements) {
                        //console.log(e.wordForm + ':' + e.lexeme.word.literal + '.' + e.tag)
                        this.ces.push(e);
                    }
                }

                buf = [];
            } else {
                // for key words
                if (s) {
                    let kw = rs.matchKeyWords(s);
                    if (kw) {
                        if (kw.pos === POSTags.pronoun && kw instanceof PersonalPronoun2To137) kw.setTag(Tagset.PRP);
                        if (kw.pos === POSTags.pronoun && kw instanceof Demonstrative) kw.setTag(Tagset.DT);
                        kw.setWordForm(s)
                        this.ces.push(kw);
                        buf = [];
                    }
                }
            }
        }
    }

    getCes() {
        return this.ces;
    }
}
