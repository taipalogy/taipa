import { POSTags } from './symbols';

export class ConstructionElement {
    surface: string = '';
    pos: string = '';
    tag: string = '';
}

interface Visitor {
    visitPhraseme(phraseme: OrthoPhraseme, sequence: string[]): boolean;
    visitLexeme(lexeme: OrthoLexeme, word: string): boolean;
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
        return false;
    }
}

interface OrthoXeme {
    base: string;
    inflected: string[];
    assimilated: string[];

    accept(visitor: Visitor, arg: any): boolean;
}

export class OrthoPhraseme implements OrthoXeme {
    base: string = '';
    inflected: string[] = [];
    assimilated: string[] = [];

    accept(visitor: Visitor, sequence: string[]): boolean {
        return visitor.visitPhraseme(this, sequence);
    }
}

export class OrthoLexeme implements OrthoXeme {
    base: string = '';
    inflected: string[] = [];
    assimilated: string[] = [];

    accept(visitor: Visitor, word: string): boolean {
        return visitor.visitLexeme(this, word);
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
    private keyElems: Array<ConstructionElement> = new Array();

    constructor() {
        this.populateKeyElems();
    }

    getSurface(str: string) {
        for (let i in this.keyElems) if (this.keyElems[i].surface === str) return this.keyElems[i];
    }

    private populateKeyElems() {
        this.keyElems = [
            objectFactory(PronounSurface, 'che'),
            objectFactory(PersonalPronounSurface, 'goa'),
            objectFactory(AuxiliarySurface, 'qaz'),
            objectFactory(ParticleSurface, 'long'),
            objectFactory(ParticleSurface, 'bew')
        ];
    }
}
