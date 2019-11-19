import { DependencyLabels } from './symbols';
import { Token } from '../token';

export class Relation {
    dependency: DependencyLabels;
    head: Token;
    dependent: Token;

    constructor(dep: DependencyLabels, head: Token, dependent: Token) {
        this.dependency = dep;
        this.head = head;
        this.dependent = dependent;
    }
}
