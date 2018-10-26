
import { ToneLexeme } from './lexeme';
import { MORPH_RULES } from './morphrules'
import { Node } from './rulebasedtagger'

enum Dependency {
    csubj,
    dobj,
    nobj,
    nsubj,
    root,
}

export class Arc {
    dep: Dependency
    head: ToneLexeme = null
    dependent: ToneLexeme = null
    constructor(dep: Dependency, head: ToneLexeme, dependent: ToneLexeme) {
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

class EmptyStackAndQueue extends Transition {
    do(c: Configuration) {
        while(c.stack.pop())
        while(c.queue.shift())
        return c;
    }
}

export class Configuration {
    queue: Array<Node> = new Array()
    stack: Array<Node> = new Array()
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
        return this.transitions.shift();
    }
}
