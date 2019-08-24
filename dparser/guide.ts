import { Configuration, Transition, Shift, LeftArc, RightArc } from './configuration'
import { ConstructionElement } from './keywords';
import { ConstructionOfPhrase } from './rules';
import { DependencyLabels } from './symbols';
import { Relation } from './relation';

export class GuideForConstructionElement {
    transitions: Array<Transition<ConstructionElement>>  = new Array()
    private s1: ConstructionElement = new ConstructionElement()
    private s2: ConstructionElement = new ConstructionElement()
    private b1: ConstructionElement = new ConstructionElement()

    private shift(): void {
        this.transitions.push(new Shift())
    }

    private rightArc(lbl: DependencyLabels) {
        this.transitions.push(new RightArc())
        return new Relation(lbl, this.s2, this.s1)
    }

    private leftArc(lbl: DependencyLabels) {
        this.transitions.push(new LeftArc())
        return new Relation(lbl, this.s1, this.s2)
    }

    getNextTransition(c: Configuration<ConstructionElement>) {
        this.s1 = new ConstructionElement()
        if(c.stack.length > 1) this.s1 = c.stack[c.stack.length-1]
        this.s2 = new ConstructionElement()
        if(c.stack.length > 2) this.s2 = c.stack[c.stack.length-2]
        this.b1 = new ConstructionElement()
        if(c.queue.length > 0) this.b1 = c.queue[0]

        if(this.transitions.length == 0) return undefined
        return this.transitions.shift();
    }
}

export class GuideForConstructionOfPhrase {
    transitions: Array<Transition<ConstructionOfPhrase>>  = new Array()

    getNextTransition(c: Configuration<ConstructionOfPhrase>) {

        if(this.transitions.length == 0) return undefined
        return this.transitions.shift();
    }
}

