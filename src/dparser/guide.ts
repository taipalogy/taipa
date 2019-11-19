import { Configuration, Transition, Shift, LeftArc, RightArc } from './configuration';
import { DependencyLabels, Tagset } from './symbols';
import { Relation } from './relation';
import { Token } from '../token';

export class Guide {
    transitions: Array<Transition> = new Array();
    private s1: Token = new Token('');
    private s2: Token = new Token('');
    private b1: Token = new Token('');

    private shift(): void {
        this.transitions.push(new Shift());
    }

    private rightArc(label: DependencyLabels) {
        this.transitions.push(new RightArc());
        this.s1.dep = label;
        this.s1.head = this.s2;
        return new Relation(label, this.s2, this.s1);
    }

    private leftArc(label: DependencyLabels) {
        this.transitions.push(new LeftArc());
        this.s2.dep = label;
        this.s2.head = this.s1;
        return new Relation(label, this.s1, this.s2);
    }

    private isQueueEmpty(c: Configuration) {
        if (c.queue.length === 0) return true;
        return false;
    }

    private isStackEmpty(c: Configuration) {
        if (c.stack.length === 2) return true;
        return false;
    }

    getNextTransition(c: Configuration) {
        this.s1 = new Token('');
        if (c.stack.length > 0) this.s1 = c.stack[c.stack.length - 1];
        this.s2 = new Token('');
        if (c.stack.length > 1) this.s2 = c.stack[c.stack.length - 2];
        this.b1 = new Token('');
        if (c.queue.length > 0) this.b1 = c.queue[0];

        if (this.s1.tag != '' && this.b1.tag != '') {
            if (this.s1.tag === Tagset.VB && this.b1.tag === Tagset.PPV) this.shift();
            else if (this.s1.tag === Tagset.NPR && this.b1.tag === Tagset.VB) this.shift();
            else if (this.s1.tag === Tagset.NPR && this.b1.tag === Tagset.NPR) this.shift();
            else if (this.s1.tag === Tagset.APPR && this.b1.tag === Tagset.NPR) this.shift();
            else if (this.s1.tag === Tagset.PPV && this.b1.tag === Tagset.AUXN)
                c.relations.push(this.rightArc(DependencyLabels.prt));
            else if (this.s1.tag === Tagset.VB && this.b1.tag === Tagset.NPR) this.shift();
            else if (this.s1.tag === Tagset.VB && this.b1.tag === Tagset.AUXN) this.shift();
            else if (this.s1.tag === Tagset.AUX && this.b1.tag === Tagset.VB) this.shift();
            else if (this.s1.tag === Tagset.PADV && this.b1.tag === Tagset.VB) this.shift();
            else if (this.s1.tag === Tagset.NPR && this.b1.tag === Tagset.PADV) this.shift();
            else if (this.s1.tag === Tagset.VB && this.b1.tag === Tagset.APPR) this.shift();
        } else if (this.isQueueEmpty(c)) {
            if (this.s2.tag === Tagset.VB && this.s1.tag === Tagset.PPV) {
                c.relations.push(this.rightArc(DependencyLabels.prt));
            } else if (this.s2.tag === Tagset.VB && this.s1.tag === Tagset.AUXN) {
                c.relations.push(this.rightArc(DependencyLabels.aux));
            } else if (this.s2.tag === Tagset.NPR && this.s1.tag === Tagset.VB) {
                let isHit: boolean = false;
                for (let i in c.relations) {
                    if (c.relations[i].dependency === DependencyLabels.nsubj) {
                        isHit = true;
                        break;
                    }
                }
                if (isHit) {
                    c.relations.push(this.leftArc(DependencyLabels.dislocated));
                } else {
                    c.relations.push(this.leftArc(DependencyLabels.nsubj));
                }
            } else if (this.s2.tag === Tagset.AUX && this.s1.tag === Tagset.VB) {
                c.relations.push(this.leftArc(DependencyLabels.aux));
            } else if (this.s2.tag === Tagset.PADV && this.s1.tag === Tagset.VB) {
                c.relations.push(this.leftArc(DependencyLabels.advmod));
            } else if (this.s2.tag === Tagset.APPR && this.s1.tag === Tagset.NPR) {
                c.relations.push(this.leftArc(DependencyLabels.case));
            } else if (this.s2.tag === Tagset.VB && this.s1.tag === Tagset.NPR) {
                c.relations.push(this.rightArc(DependencyLabels.obj));
            } else if (this.isStackEmpty(c)) {
                c.relations.push(this.rightArc(DependencyLabels.root));
            }
        }

        if (this.transitions.length == 0) return undefined;
        return this.transitions.shift();
    }
}
