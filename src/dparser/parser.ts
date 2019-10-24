import { ConstructionElement } from './keywords';
import { Relation } from './relation';
import { Configuration, Transition, Shift } from './configuration';
import { Guide } from './guide';

export class DependencyParser {
    getInitialConfiguration<T>() {
        return new Configuration<T>();
    }

    apply<T>(t: Transition<T>, c: Configuration<T>) {
        return t.do(c);
    }

    parseCE(ces: ConstructionElement[]): Relation[] {
        let c: Configuration<ConstructionElement> = this.getInitialConfiguration<ConstructionElement>();
        for (let ce of ces) {
            //console.log(ce.wordForm)
            c.queue.push(ce);
        }

        let guide = new Guide();
        let ce = new ConstructionElement();
        ce.surface = 'ROOT';
        c.stack.push(ce);

        if (c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift<ConstructionElement>());
        }

        while (!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition(c);
            if (t == null || t == undefined) break;
            c = this.apply<ConstructionElement>(t, c);
        }

        return c.relations;
    }
}
