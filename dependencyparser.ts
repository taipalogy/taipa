import { Lexeme } from './lexeme';
import { DummyLexemeMaker } from './lexememaker';
import { MORPH_RULES } from './morphrules'

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

class Shift extends Transition {
    do(c: Configuration) {
        c.stack.push(c.queue.shift());
        return c;
    }
}

class RightArc extends Transition {
    do(c: Configuration) {
        c.graph.add(new Arc(Dependency.dobj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
        c.stack.pop();
        return c;
    }
}

class LeftArc extends Transition {
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
    checkTransitivity(l: Lexeme) {
        return new Shift();
    }

    matchMorphRules(l: Lexeme) {
        for(let key in MORPH_RULES.PRP) {
            /*
            if(l.word.literal === key) {
                console.log(l.word.literal)
                return true;
            }
            */
        }
        return false
    }

    getNextTransition(c: Configuration) {
        if(c.stack.length == 0 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            return new Shift();
        }

        if(this.matchMorphRules(c.stack[c.stack.length-1])) {
            return this.checkTransitivity(c.queue[0]);
        } else {
            
        }

        if(c.queue.length == 0) {
            // when there are no lexemes left in the queue
            if(c.stack.length == 2) {
                // when there are two lexemes left in the stack
                // from root to the second last lexeme left
                return new RightArc();
            }
        }

        return new EmptyStackAndQueue();
    }
}
