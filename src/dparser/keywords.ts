import { POSTags } from './symbols';
import { createTonalInflectionLexeme } from './creator';
import { TonalCombiningForms } from './morpheme';

export class ConstructionElement {
    surface: string = '';
    pos: string = '';
    tag: string = '';
}

interface Visitor {
    visitPhraseme(phraseme: OrthoPhraseme, sequence: string[]): boolean;
    visitLexeme(lexeme: OrthoLexeme, word: string): boolean;
    visitWord(keyword: OrthorWord, word: string): boolean;
}

export class VisitorMatching implements Visitor {
    visitPhraseme(phraseme: OrthoPhraseme, sequence: string[]) {
        // match a form of a phraseme
        const form = sequence.join(' ');
        if (form === phraseme.base) return true;
        if (phraseme.inflected.filter(it => it === form).length > 0) return true;
        if (phraseme.assimilated.filter(it => it === form).length > 0) return true;
        return false;
    }

    visitLexeme(lexeme: OrthoLexeme, word: string) {
        // match a form of a lexeme
        if (word === lexeme.base) return true;
        if (lexeme.inflected.filter(it => it === word).length > 0) return true;
        if (lexeme.assimilated.filter(it => it === word).length > 0) return true;
        return false;
    }

    visitWord(keyword: OrthorWord, word: string) {
        if (word === keyword.base) return true;
        return false;
    }
}

interface OrthoX {
    base: string;

    accept(visitor: Visitor, arg: any): boolean;
}

export class OrthoPhraseme implements OrthoX {
    base: string = '';
    inflected: string[] = [];
    assimilated: string[] = [];

    accept(visitor: Visitor, sequence: string[]): boolean {
        return visitor.visitPhraseme(this, sequence);
    }
}

export class OrthoLexeme implements OrthoX {
    base: string = '';
    inflected: string[] = [];
    assimilated: string[] = [];

    accept(visitor: Visitor, word: string): boolean {
        return visitor.visitLexeme(this, word);
    }
}

export class OrthorWord implements OrthoX {
    base: string = '';

    accept(visitor: Visitor, word: string): boolean {
        return visitor.visitWord(this, word);
    }
}

export class PersonalPronounSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.surface = str;
        this.pos = POSTags.pronoun;
    }
}

export class VerbSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.surface = str;
        this.pos = POSTags.verb;
    }
}

export class EncliticSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.auxiliary;
        this.surface = str;
    }
}

export class PronounSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.pronoun;
        this.surface = str;
    }
}

class NounSurface extends ConstructionElement {
    constructor() {
        super();
        this.pos = POSTags.noun;
    }
}

export class ParticleSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.particle;
        this.surface = str;
    }
}

export class PrepositionSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.adposition;
        this.surface = str;
    }
}

class CaseMarker {}

export class AuxiliarySurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.auxiliary;
        this.surface = str;
    }
}

type Class = { new (...args: any[]): any };

const objectFactory = function(name: Class, str: string) {
    const set = new Set<Class>()
        .add(PronounSurface)
        .add(ParticleSurface)
        .add(AuxiliarySurface)
        .add(PersonalPronounSurface);

    const createInstance = function<T extends ConstructionElement>(c: new (str: string) => T, str: string): T {
        return new c(str);
    };

    if (set.has(name)) {
        return createInstance(name, str);
    }
};

export class KeyWords {
    words: Array<[OrthorWord, ConstructionElement]> = new Array();
    lexemes: Array<[OrthoLexeme, ConstructionElement]> = new Array();

    constructor() {
        this.populateWords();
        this.populateLexemes();
    }

    private populateWords() {
        const w1 = new OrthorWord();
        w1.base = 'qaz';
        const ce1 = new ConstructionElement();
        ce1.surface = 'qaz';
        ce1.pos = POSTags.auxiliary;
        this.words.push([w1, ce1]);

        const w2 = new OrthorWord();
        w2.base = 'che';
        const ce2 = new ConstructionElement();
        ce2.surface = 'che';
        ce2.pos = POSTags.pronoun;
        this.words.push([w2, ce2]);
    }

    private populateLexemes() {
        const lx1 = new OrthoLexeme();
        lx1.base = 'goay';
        const ilx1 = createTonalInflectionLexeme(lx1.base, new TonalCombiningForms());
        lx1.inflected.push(ilx1.getForms()[0].literal);
        const ce1 = new ConstructionElement();
        ce1.surface = 'goay';
        ce1.pos = POSTags.pronoun;
        this.lexemes.push([lx1, ce1]);

        const lx2 = new OrthoLexeme();
        lx2.base = 'longy';
        const ilx2 = createTonalInflectionLexeme(lx2.base, new TonalCombiningForms());
        lx2.inflected.push(ilx2.getForms()[0].literal);
        const ce2 = new ConstructionElement();
        ce2.surface = 'longy';
        ce2.pos = POSTags.particle;
        this.lexemes.push([lx2, ce2]);

        const lx3 = new OrthoLexeme();
        lx3.base = 'bez';
        const ilx3 = createTonalInflectionLexeme(lx3.base, new TonalCombiningForms());
        lx3.inflected.push(ilx3.getForms()[0].literal);
        const ce3 = new ConstructionElement();
        ce3.surface = 'bez';
        ce3.pos = POSTags.particle;
        this.lexemes.push([lx3, ce3]);
    }

    matchLexemes(word: string) {
        const v = new VisitorMatching();
        const arr = this.lexemes.filter(it => it[0].accept(v, word));
        if (arr.length > 0) {
            const ce = new ConstructionElement();
            ce.surface = word;
            ce.pos = arr[0][1].pos;
            return ce;
        }
        return new ConstructionElement();
    }

    matchWords(word: string) {
        const v = new VisitorMatching();
        const arr = this.words.filter(it => it[0].accept(v, word));
        if (arr.length > 0) {
            return arr[0][1];
        }
        return new ConstructionElement();
    }
}
