import { ConstructionElement } from './keywords';
import { Dependency, POS } from './symbols'
import { DummyLexeme } from './lexeme';
import { Document } from '../document'

export class Arc {
    dependency: Dependency
    head: ConstructionElement
    dependent: ConstructionElement

    constructor(dep: Dependency, head: ConstructionElement, dependent: ConstructionElement) {
        this.dependency = dep;
        this.head = head;
        this.dependent = dependent
    }
}

export abstract class Transition {
    abstract do(c: Configuration): Configuration
}

export class Shift extends Transition {
    do(c: Configuration) {
        let s = c.queue.shift()
        if(s != undefined) {
            c.stack.push(s);
        }
        return c;
    }
}

export class RightArc extends Transition {
    do(c: Configuration) {
        c.stack.pop();
        return c;
    }
}

export class LeftArc extends Transition {
    do(c: Configuration) {
        return c;
    }
}

export class Configuration {
    queue: Array<ConstructionElement> = new Array()
    stack: Array<ConstructionElement> = new Array()
    graph: Array<Arc> = new Array();

    constructor() {}

    makeTransition(t: Transition) {
        return t.do(this);
    }

    getGraph() {
        return this.graph;
    }
    
    isTerminalConfiguration() {
        if(this.queue.length > 0) {
            return false;
        }
        if(this.stack.length == 1 && this.queue.length == 0) {
            return true;
        }
        return false;
    }
}

export class DependencyParser {
    getInitialConfiguration() {
        return new Configuration();
    }

    parse(elems: ConstructionElement[]) {
        let c: Configuration = this.getInitialConfiguration();
        for(let key of elems) {
            c.queue.push(key)
        }

        let guide = new Guide()
        let root = new DummyLexeme()
        root.word.literal = 'ROOT'
        let ce = new ConstructionElement()
        ce.lexeme = root
        c.stack.push(ce)

        if(c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift())
        }

        while(!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition();
            if(t == null || t == undefined) break
            c = c.makeTransition(t);
            if(c.stack[c.stack.length-1] != undefined) {
                if(c.stack[c.stack.length-1].partOfSpeech === POS.verb) {
                    if(c.stack[c.stack.length-1].form === 'copulative') {
                        if(c.queue.length > 0 && c.queue[0].partOfSpeech === POS.noun) {
                            guide.transitions.push(new Shift())
                            c.graph.push(new Arc(Dependency.cop, c.stack[c.stack.length-2], c.stack[c.stack.length-3]))
                            c.graph.push(new Arc(Dependency.nsubj, c.stack[c.stack.length-1], c.stack[c.stack.length-3]))
                        }
                    }
                    if(c.queue.length > 0 && c.queue[0].partOfSpeech === POS.pronoun) {
                        guide.transitions.push(new Shift())
                    } else {
                        guide.transitions.push(new RightArc())
                        c.graph.push(new Arc(Dependency.ccomp, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                        guide.transitions.push(new RightArc())
                    }
                } if(c.stack[c.stack.length-1].partOfSpeech === POS.pronoun) {
                    guide.transitions.push(new Shift())
                    c.graph.push(new Arc(Dependency.csubj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                } if(c.stack[c.stack.length-1].partOfSpeech === POS.noun) {
                    guide.transitions.push(new Shift())
                }
            }
        }

        let doc: Document = new Document();
        doc.graph = c.getGraph();
        return doc;

    }
}

export class Guide {
    transitions: Array<Transition>  = new Array()

    getNextTransition() {
        if(this.transitions.length == 0) return null
        return this.transitions.shift();
    }
}
