import { Configuration, Transition, Shift } from './configuration';
import { Guide } from './guide';
import { Token } from '../token';
import { Document } from '../document';

export class DependencyParser {
    getInitialConfiguration() {
        return new Configuration();
    }

    apply(t: Transition, c: Configuration) {
        return t.do(c);
    }

    parse(doc: Document): Document {
        let c: Configuration = this.getInitialConfiguration();
        for (let t of doc.tokens) {
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

        doc.relations = c.relations;
        return doc;
    }
}
