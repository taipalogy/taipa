import { Lexeme } from "./lexeme";
import { DummyLexemeMaker } from "./lexememaker";

export class Arc {
    head: Lexeme = null
    dependent: Lexeme = null
}

class RightArc {}

class LeftArc {}

export class Transition {}

export class Configuration {
    queue: Array<Lexeme> = new Array()
    stack: Array<Lexeme> = new Array()
    graph: Set<Arc> = new Set();

    constructor() {
        let root = new DummyLexemeMaker().makeLexeme('ROOT');
        this.stack.push(root);
    }

    makeTransition(t: Transition) {
        return null;
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

export class Guide {
    getNextTransition(c: Configuration) {
        let l = c.queue.shift();
        c.stack.push(l);
        return null;
    }
}

export class DependencyParser {
    getInitialConfiguration() {
        return new Configuration();
    }
}
