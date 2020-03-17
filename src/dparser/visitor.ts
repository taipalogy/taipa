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
