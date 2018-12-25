

import { MORPH_RULES } from './morphrules'
import { SYMBOLS } from './symbols';
import { Lexeme } from './lexeme';

export enum Dependency {
    csubj = 'csubj',
    ccomp = 'ccomp',
    dobj = 'dobj',
    nobj = 'nobj',
    nsubj = 'nsubj',
    root = 'root',
}

export class Arc {
    dependency: Dependency
    head: Lexeme = null
    dependent: Lexeme = null
    constructor(dep: Dependency, head: Lexeme, dependent: Lexeme) {
        this.dependency = dep;
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
