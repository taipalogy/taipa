export class Feature {
    wordForm: string = '';
    tag: string = '';
}

class FeatureTemplateOneWord {
    constructor(private elem: Feature, private operation: string) {}
    get tag() {
        return this.elem.tag;
    }
    get wordForm() {
        return this.elem.wordForm;
    }
    get wordFormTag() {
        return this.wordForm + this.tag;
    }
    get op() {
        return this.operation;
    }
}

class FeatureTemplateTwoWord {
    constructor(p1: FeatureTemplateOneWord, p2: FeatureTemplateOneWord, private op: string) {}
    get operation() {
        return this.op;
    }
}

class FeatureTemplateS1S2 extends FeatureTemplateTwoWord {
    s1: FeatureTemplateOneWord = new FeatureTemplateOneWord({ wordForm: '', tag: '' }, '');
    s2: FeatureTemplateOneWord = new FeatureTemplateOneWord({ wordForm: '', tag: '' }, '');
}
