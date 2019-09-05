export class Character {
    character: string;

    constructor(s: string) {
        this.character = s;
    }
}

class Characters {
    private carr: string[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    private o: Map<string, Character> = new Map();

    constructor() {
        for (let e of this.carr) {
            this.assign(e);
        }
    }

    private assign(e: string) {
        this.o.set(e, new Character(e));
    }

    get(key: string): Character {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return new Character('');
    }

    get size() {
        return this.o.size;
    }
}

export const characters = new Characters();
