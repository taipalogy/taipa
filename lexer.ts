import { Scanner, Character } from './../core/scanner';

export class Type {
    public static readonly IDENTIFIER = "Identifier";
    public static readonly WHITESPACE = "Whitespace";
    public static readonly EOF = "EndOfFile"
}


class Token {
    cargo: Type;
    sourceIndex: number;
    lineIndex: number;
    colIndex: number;
    type: Type;

    constructor(startChar) {
        this.cargo = startChar.cargo;
        this.sourceIndex = startChar.sourceIndex;
        this.lineIndex = startChar.lineIndex;
        this.colIndex = startChar.colIndex;
        this.type = null;
    }

    show() {
        let s: string = "";

        if(this.type == this.cargo) {
            s = s + "Symbol" + ": " + this.type;
        } else if(this.type == Type.WHITESPACE) {
            s = s + "Whitespace" + ": " + this.cargo.toString();
        } else {
            s = s + this.type + ": " + this.cargo;
        }

        return s;
    }
}

class Lexer {
    scanner: Scanner;
    c1: string;
    c2: string;
    character: Character;

    whiteSpaceChars: RegExp = /[\s|\t|\n]/;
    identifierChars: RegExp = /[a~zA~Z]/;

    constructor(sourceText: string) {
        this.scanner = new Scanner(sourceText);
        this.getChar();
    }

    get() {
        while(this.c1.match(this.whiteSpaceChars)) {
            let token = new Token(this.character);
            token.type = Type.WHITESPACE;
            this.getChar();

            while(this.c1.match(this.whiteSpaceChars)) {
                token.cargo += this.c1;
            }

            //return token;
        }
    }

    getChar() {

        this.character = this.scanner.get();
        this.c1 = this.character.cargo;
        this.c2 = this.c1 + this.scanner.lookahead(1);
    }
}