import { ToneSandhiLexeme } from "./lexeme";
import { parse } from "querystring";

class Arc {
    head: ToneSandhiLexeme = null
    dependent: ToneSandhiLexeme = null
}

class RightArc {}

class LeftArc {}

export class Dependencies {
    s: Set<Arc> = new Set();
}

export class Transition {}

export class Configuration {
    queue: Array<ToneSandhiLexeme> = new Array()
    stack: Array<ToneSandhiLexeme> = new Array()
    graph: Dependencies

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
        if(this.stack.length == 1) {}
        return false;
    }
}

export class Guide {
    getNextTransition(c: Configuration) {
        return null;
    }
}

export class DependencyParser {
    getInitialConfiguration(str: string) {
        return new Configuration();
    }
}
