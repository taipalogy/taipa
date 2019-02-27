
type Class = { new(...args: any[]): any; };

function createInstance<A extends Analyzer>(c: new () => A): A {
    return new c();
}

export class Analyzer {}

export class Tonal extends Analyzer {}

export class AnalyzerLoader {
    analyzers: Analyzer[] = new Array()
    load(klas: Class) {
        this.analyzers.push(createInstance(klas))
    }
    unload(klas: Class) {
        const len = this.analyzers.length
        const index = this.analyzers.indexOf(klas, 0);
        this.analyzers.splice(index, 1)
    }
}
