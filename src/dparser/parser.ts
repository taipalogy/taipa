import { ConstructionElement } from './keywords';
import { Relation } from './relation';
import { Configuration, Transition, Shift } from './configuration';
import { Guide } from './guide';
import { Token } from '../token';

export class DependencyParser {
    getInitialConfiguration() {
        return new Configuration();
    }

    apply(t: Transition, c: Configuration) {
        return t.do(c);
    }

    parse(tokens: Token[]): Relation[] {
        let c: Configuration = this.getInitialConfiguration();
        for (let t of tokens) {
            c.queue.push(t);
        }

        let guide = new Guide();
        let rt = new Token('ROOT');
        c.stack.push(rt);

        if (c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift());
        }

        while (!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition(c);
            if (t == null || t == undefined) break;
            c = this.apply(t, c);
        }

        return c.relations;
    }
}
