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

class Shift {
    do(c: Configuration) {
        c.stack.push(c.queue.shift());
        return c;
    }
}

class RightArc {
    do(c: Configuration) {
        c.graph.add(new Arc(Dependency.dobj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
        c.stack.pop();
        return c;
    }
}

class LeftArc {
    do(c: Configuration) {
        return c;
    }
}

export class Configuration {
    queue: Array<Lexeme> = new Array()
    stack: Array<Lexeme> = new Array()
    graph: Set<Arc> = new Set();

    constructor() {
        let root = new DummyLexemeMaker().makeLexeme('ROOT');
        this.stack.push(root);
    }

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
        if(this.stack.length == 1) {
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
        if(this.matchMorphRules(c.stack[c.stack.length-1])) {
            
        } else {
            
        }
        //return new Shift();
        return null;
    }
}
