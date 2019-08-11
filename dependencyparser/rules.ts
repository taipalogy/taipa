import { ConstructionElement, FirstSingular } from './keywords'

class Rule {
    r: ConstructionElement[]
    constructor(arr: ConstructionElement[]) {
        this.r = arr
    }
}

class Rules {
    arr: Array<Rule>

    constructor() {
        this.populateArray()
    }

    private populateArray() {
        this.arr = [
            new Rule([new FirstSingular()])
        ]
    }
}