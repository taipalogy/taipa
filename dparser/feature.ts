import { ConstructionElement,  } from './keywords';
import { DummyLexeme } from './lexeme';
import { Document } from '../document'
import { Relation } from './relation'
import { Transition, Configuration, Shift } from './configuration'
import { GuideForConstructionElement } from './guide'

export class Feature {
    wordForm: string = ''
    tag: string = ''
}

class FeatureTemplateOneWord {
    constructor(private elem: Feature, private operation: string) {}
    get tag() { return this.elem.tag }
    get wordForm() { return this.elem.wordForm }
    get wordFormTag() { return this.wordForm + this.tag }
    get op() { return this.operation }
}

class FeatureTemplateTwoWord {
    position1: FeatureTemplateOneWord = new FeatureTemplateOneWord({wordForm: '', tag: ''}, '')
    position2: FeatureTemplateOneWord = new FeatureTemplateOneWord({wordForm: '', tag: ''}, '')
    constructor(p1: FeatureTemplateOneWord, p2: FeatureTemplateOneWord, private operation: string) {}
    get op() { return this.operation }
}

