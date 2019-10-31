export class Token {
    text: string = '';
    pos: string = '';
    tag: string = '';
    lemma: string = '';
    dep: string = '';
    head: any

    constructor(text: string) {
        this.text = text;
    }
}