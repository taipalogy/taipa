import { DependencyLabels } from './symbols'
import { ConstructionElement } from './keywords';

export class Relation {
    dependency: DependencyLabels
    head: ConstructionElement
    dependent: ConstructionElement

    constructor(dep: DependencyLabels, head: ConstructionElement, dependent: ConstructionElement) {
        this.dependency = dep;
        this.head = head;
        this.dependent = dependent
    }
}
