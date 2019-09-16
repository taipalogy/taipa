import { Configuration, Transition, Shift, LeftArc, RightArc } from './configuration';
import { ConstructionElement } from './keywords';
import { DependencyLabels, Tagset } from './symbols';
import { Relation } from './relation';

export class Guide {
    transitions: Array<Transition<ConstructionElement>> = new Array();
    private s1: ConstructionElement = new ConstructionElement();
    private s2: ConstructionElement = new ConstructionElement();
    private b1: ConstructionElement = new ConstructionElement();

    private shift(): void {
        this.transitions.push(new Shift());
    }

    private rightArc(lbl: DependencyLabels) {
        this.transitions.push(new RightArc());
        return new Relation(lbl, this.s2, this.s1);
    }

    private leftArc(lbl: DependencyLabels) {
        this.transitions.push(new LeftArc());
        return new Relation(lbl, this.s1, this.s2);
    }

    private isQueueEmpty(c: Configuration<ConstructionElement>) {
        if (c.queue.length === 0) return true;
        return false;
    }

    private isStackEmpty(c: Configuration<ConstructionElement>) {
        if (c.stack.length === 2) return true;
        return false;
    }

    getNextTransition(c: Configuration<ConstructionElement>) {
        this.s1 = new ConstructionElement();
        if (c.stack.length > 0) this.s1 = c.stack[c.stack.length - 1];
        this.s2 = new ConstructionElement();
        if (c.stack.length > 1) this.s2 = c.stack[c.stack.length - 2];
        this.b1 = new ConstructionElement();
        if (c.queue.length > 0) this.b1 = c.queue[0];

        if (this.s1.tag === Tagset.VB && this.b1.tag === Tagset.PPV) this.shift();
        else if (this.s1.tag === Tagset.PRP && this.b1.tag === Tagset.VB) this.shift();
        else if (this.s1.tag === Tagset.DT && this.b1.tag === Tagset.PRP) this.shift();
        else if (this.s1.tag === Tagset.PPV && this.b1.tag === Tagset.DT) {
            c.relations.push(this.rightArc(DependencyLabels.prt));
        }
        else if (this.s1.tag === Tagset.VB && this.b1.tag === Tagset.DT) this.shift();
        else if (this.s1.tag === Tagset.AUX && this.b1.tag === Tagset.VB) this.shift();
        else if (this.isQueueEmpty(c)) {
            if (this.s2.tag === Tagset.VB && this.s1.tag === Tagset.PPV) {
                c.relations.push(this.rightArc(DependencyLabels.prt));
            } else if (this.s2.tag === Tagset.PRP && this.s1.tag === Tagset.VB) {
                c.relations.push(this.leftArc(DependencyLabels.nsubj));
            } else if (this.s2.tag === Tagset.VB && this.s1.tag === Tagset.DT) {
                c.relations.push(this.rightArc(DependencyLabels.dobj));
            } else if (this.s2.tag === Tagset.DT && this.s1.tag === Tagset.VB) {
                c.relations.push(this.leftArc(DependencyLabels.dobj));
            } else if (this.s2.tag === Tagset.AUX && this.s1.tag === Tagset.VB) {
                c.relations.push(this.leftArc(DependencyLabels.aux));
            } else if (this.isStackEmpty(c)) {
                c.relations.push(this.rightArc(DependencyLabels.root));
            }
        }

        if (this.transitions.length == 0) return undefined;
        return this.transitions.shift();
    }
}
