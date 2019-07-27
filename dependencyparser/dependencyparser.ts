import { InflexionLexeme } from './lexeme';
import { ConstructionElement } from './rulebasedtagger';

export enum Dependency {
    aux_caus = 'aux:caus',
    csubj = 'csubj',
    ccomp = 'ccomp',
    dobj = 'dobj',
    iobj = 'iobj',
    iobj_agent = 'iobj:agent',
    nobj = 'nobj',
    nsubj = 'nsubj',
    nsubj_caus = 'nsubj:caus',
    root = 'root',
    xcomp = 'xcomp',
}

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
}

export class Guide {
    transitions: Array<Transition>  = new Array()

    getNextTransition() {
        if(this.transitions.length == 0) return null
        return this.transitions.shift();
    }
}
