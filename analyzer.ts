import { Turner } from "./system";

type Class = { new(...args: any[]): any; };

function createInstance<A extends Analyzer>(c: new () => A): A {
    return new c();
}

export class Analyzer {
    turner: Turner
}

export class Tonal extends Analyzer {}

export class AnalyzerLoader {
    analyzers: Array<Analyzer> = new Array()
    load(klas: Class) {
        this.analyzers.push(createInstance(klas))
    }
    unload(klas: Class) {
        const len = this.analyzers.length
        for(let i=0; i < this.analyzers.length; i++) {
            if(this.analyzers[i] instanceof klas) {
                this.analyzers.splice(i, 1) // remove it from array
                break
            }
        }
    }
}
