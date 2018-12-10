

import { MORPH_RULES } from './morphrules'
import { SYMBOLS } from './symbols';
import { Lexeme } from './lexeme';

enum Dependency {
    csubj,
    dobj,
    nobj,
    nsubj,
    root,
}

export class Arc {
    dep: Dependency
    head: Lexeme = null
    dependent: Lexeme = null
    constructor(dep: Dependency, head: Lexeme, dependent: Lexeme) {
        this.dep = dep;
        this.head = head;
        this.dependent = dependent
    }
}

export abstract class Transition {
    abstract do(c: Configuration)
}

export class Shift extends Transition {
    do(c: Configuration) {
        c.stack.push(c.queue.shift());
        return c;
    }
}

export class RightArc extends Transition {
    do(c: Configuration) {
        c.graph.add(new Arc(Dependency.dobj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
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
    queue: Array<Lexeme> = new Array()
    stack: Array<Lexeme> = new Array()
    graph: Set<Arc> = new Set();

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
