export class Character {
    
    cargo: string;
    lineIndex: number;
    colIndex: number;
    sourceIndex: number;
    sourceText: string;

    constructor(c: string, lineIndex:number, colIndex: number, sourceIndex: number, sourceText: string) {
      this.cargo = c;
      this.lineIndex = lineIndex;
      this.colIndex = colIndex;
      this.sourceIndex = sourceIndex;
      this.sourceText = sourceText;
    }

    toString() {
        if(this.cargo == " ") this.cargo = " SPACE";
        if(this.cargo == "\n") this.cargo = " newline";
        if(this.cargo == "\t") this.cargo = " tab";
        
        return this.lineIndex.toString() + " " + this.colIndex.toString() + " " + this.cargo;
    }
}

export class Scanner {
    
    sourceText: string;
    sourceIndex: number;
    lastIndex: number;
    lineIndex: number;
    colIndex: number;
    char: Character;
    c: string;

    constructor(sourceText: string) {
        this.sourceText = sourceText;
        this.sourceIndex = -1;
        this.lastIndex = sourceText.length - 1;
        this.lineIndex = 0;
        this.colIndex = -1;
    }

    get() {
        this.sourceIndex += 1;

        if(this.sourceIndex > 0) {
            if(this.sourceText[this.sourceIndex - 1] == '\n') {
                this.lineIndex += 1;
                this.colIndex = -1;
            }
        }

        this.colIndex += 1;

        if(this.sourceIndex > this.lastIndex) {
            this.char = new Character("END", this.lineIndex, this.colIndex, this.sourceIndex, this.sourceText);
        } else {
            this.c = this.sourceText[this.sourceIndex];
            this.char = new Character(this.c, this.lineIndex, this.colIndex, this.sourceIndex, this.sourceText);
        }
        return this.char;
    }
}