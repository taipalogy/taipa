export class Token {
    text: string = '';
    lemma: string = '';
    tag: string = '';
    pos: string = '';
    dep: string = '';

    constructor(text: string) {
        this.text = text;
    }
}