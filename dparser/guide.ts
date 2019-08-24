import { Configuration, Transition, Shift } from './configuration'
import { ConstructionElement } from './keywords';
import { ConstructionOfPhrase } from './rules';

export class GuideForConstructionElement {
    transitions: Array<Transition<ConstructionElement>>  = new Array()

    getNextTransition(c: Configuration<ConstructionElement>) {
        let b1: ConstructionElement
        if(c.queue.length > 0) b1 = c.queue[0]
        let s1: ConstructionElement = new ConstructionElement()
        if(c.stack.length > 1) s1 = c.stack[c.stack.length-1]
        let s2: ConstructionElement
        if(c.stack.length > 2) s2 = c.stack[c.stack.length-2]

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

