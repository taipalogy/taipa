import { Configuration, Transition, Shift, RightArc, LeftArc } from './configuration';
import { Guide } from './guide';
import { Token } from '../token';
import { Document } from '../document';
import { DependencyLabels, Tagset } from './symbols';
import { Relation } from './relation';
//import { FeatureLabel, Feature } from './feature';

export class DependencyParser {
    private c: Configuration = this.getInitialConfiguration();
    private triggered: boolean = false;

    private s1: Token = new Token('');
    private s2: Token = new Token('');
    private b1: Token = new Token('');

    private s1B1RightRelations = new Map<string, DependencyLabels>()
        .set(Tagset.ppv + Tagset.auxn, DependencyLabels.compoundPrt)
        .set(Tagset.ppv + Tagset.npr, DependencyLabels.compoundPrt);

    private s1B1LeftRelations = new Map<string, DependencyLabels>();

    private s2S1RightRelations = new Map<string, DependencyLabels>()
        .set(Tagset.vb + Tagset.ppv, DependencyLabels.compoundPrt)
        .set(Tagset.vb + Tagset.auxn, DependencyLabels.aux)
        .set(Tagset.vb + Tagset.vb, DependencyLabels.compound)
        .set(Tagset.vb + Tagset.npr, DependencyLabels.obj);

    private s2S1LeftRelations = new Map<string, DependencyLabels>()
        .set(Tagset.aux + Tagset.vb, DependencyLabels.aux)
        .set(Tagset.padv + Tagset.vb, DependencyLabels.advmod)
        .set(Tagset.appr + Tagset.npr, DependencyLabels.case);

    private getInitialConfiguration() {
        return new Configuration();
    }

    private apply(t: Transition, c: Configuration) {
        return t.do(c);
    }

    private isQueueEmpty() {
        if (this.c.queue.length === 0) return true;
        return false;
    }

    private isStackEmpty() {
        if (this.c.stack.length === 2) return true;
        return false;
    }

    private rightRelation(label: DependencyLabels): Relation {
        this.s1.dep = label;
        this.s1.head = this.s2;
        return new Relation(label, this.s2, this.s1);
    }

    private leftRelation(label: DependencyLabels): Relation {
        this.s2.dep = label;
        this.s2.head = this.s1;
        return new Relation(label, this.s1, this.s2);
    }

    private setS1S2B1() {
        this.s1 = new Token('');
        if (this.c.stack.length > 0) this.s1 = this.c.stack[this.c.stack.length - 1];
        this.s2 = new Token('');
        if (this.c.stack.length > 1) this.s2 = this.c.stack[this.c.stack.length - 2];
        this.b1 = new Token('');
        if (this.c.queue.length > 0) this.b1 = this.c.queue[0];
    }

    private setS1B1Relation(t: Transition) {
        if (t instanceof RightArc) {
            if (this.s1B1RightRelations.has(this.s1.tag + this.b1.tag)) {
                const rel = this.s1B1RightRelations.get(this.s1.tag + this.b1.tag);
                if (rel) {
                    this.c.relations.push(this.rightRelation(rel));
                }
            }
        } else if (t instanceof LeftArc) {
            if (this.s1B1LeftRelations.has(this.s1.tag + this.b1.tag)) {
                const rel = this.s1B1LeftRelations.get(this.s1.tag + this.b1.tag);
                if (rel) {
                    this.c.relations.push(this.leftRelation(rel));
                }
            }
        }
    }

    private s2S1LeftArgsOfVerb = new Map<string, DependencyLabels[]>().set(Tagset.npr + Tagset.vb, [
        DependencyLabels.nsubj,
        DependencyLabels.dislocated
    ]);

    private setS2S1Relation(t: Transition) {
        if (t instanceof RightArc) {
            if (this.s2S1RightRelations.has(this.s2.tag + this.s1.tag)) {
                const rel = this.s2S1RightRelations.get(this.s2.tag + this.s1.tag);
                if (rel) {
                    this.c.relations.push(this.rightRelation(rel));
                }
            } else if (this.isStackEmpty()) {
                this.c.relations.push(this.rightRelation(DependencyLabels.root));
            }
        } else if (t instanceof LeftArc) {
            if (this.s2S1LeftRelations.has(this.s2.tag + this.s1.tag)) {
                const rel = this.s2S1LeftRelations.get(this.s2.tag + this.s1.tag);
                if (rel) {
                    this.c.relations.push(this.leftRelation(rel));
                }
            } else if (this.s2S1LeftArgsOfVerb.has(this.s2.tag + this.s1.tag)) {
                const labels = this.s2S1LeftArgsOfVerb.get(this.s2.tag + this.s1.tag);
                if (labels) {
                    if (this.triggered == false) {
                        this.c.relations.push(this.leftRelation(labels[0]));
                        this.triggered = true;
                    } else {
                        this.c.relations.push(this.leftRelation(labels[1]));
                    }
                }
            }
        }
    }

    parse = (doc: Document): Document => {
        for (let t of doc.tokens) {
            this.c.queue.push(t);
        }

        let guide = new Guide();
        let rt = new Token('ROOT');
        this.c.stack.push(rt);

        if (this.c.stack.length == 1 && this.c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift());
        }

        while (!this.c.isTerminalConfiguration()) {
            let t = guide.getNextTransition(this.c);
            if (t == null || t == undefined) break;

            this.setS1S2B1();
            if (this.s1.tag != '' && this.b1.tag != '') {
                this.setS1B1Relation(t);
            } else if (this.isQueueEmpty()) {
                this.setS2S1Relation(t);
            }

            this.c = this.apply(t, this.c);
        }

        doc.relations = this.c.relations;
        return doc;
    };
}
