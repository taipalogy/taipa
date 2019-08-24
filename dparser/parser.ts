import { ConstructionElement } from './keywords';
import { ConstructionOfPhrase } from './rules';
import { Relation } from './relation';
import { Configuration, Transition, Shift } from './configuration'
import { GuideForConstructionElement, GuideForConstructionOfPhrase } from './guide'
import { DummyLexeme } from './lexeme';

export class DependencyParser {
    getInitialConfiguration<T>() {
        return new Configuration<T>();
    }

    apply<T>(t: Transition<T>, c: Configuration<T>) {
        return t.do(c);
    }

    parseCE(ces: ConstructionElement[]): Relation[] {
        
        let c: Configuration<ConstructionElement> = this.getInitialConfiguration<ConstructionElement>();
        for(let ce of ces) {
            //console.log(ce.lexeme.word.literal)
            c.queue.push(ce)
        }

        let guide = new GuideForConstructionElement()
        let root = new DummyLexeme()
        root.word.literal = 'ROOT'
        let ce = new ConstructionElement()
        ce.lexeme = root
        c.stack.push(ce)

        if(c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift<ConstructionElement>())
        }

        while(!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition(c);
            if(t == null || t == undefined) break
            c = this.apply<ConstructionElement>(t, c);
        }

        return []
    }

    parseCP(cops: ConstructionOfPhrase[]): Relation[] {
        for(let p in cops) {
            const cerels = this.parseCE(cops[p].elements)
            //console.log(cerels)
        }

        let c: Configuration<ConstructionOfPhrase> = this.getInitialConfiguration<ConstructionOfPhrase>();
        for(let p of cops) {
            c.queue.push(p)
        }

        let guide = new GuideForConstructionOfPhrase()
    
        while(!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition(c);
            if(t == null || t == undefined) break
            c = this.apply<ConstructionOfPhrase>(t, c);
        }

        return []
    }
}