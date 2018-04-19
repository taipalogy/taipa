

class Component {

}

class MyString {
    characters: Array<Character>;
    components: Array<Component>;
    //isIsometric() {}
}

export class Metadata {
}

export interface IRule {
    match();
    //isMatch();
}

export interface IEvaluator {
    evaluate();
}

class RulesEvaluator implements IEvaluator {
    rules: Array<IRule>;
    evaluate(){};
}

//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

class Character implements IRule {
    symbol: string;

    match(){}
}

export class LowerCharacterA extends Character {
    constructor() {
        super();
        this.symbol = 'a';
    }
}

export class LowerCharacterB extends Character {
    constructor() {
        super();
        this.symbol = 'b';
    }
}

export class LowerCharacterC extends Character {
    constructor() {
        super();
        this.symbol = 'c';
    }
}

export class LowerCharacterD extends Character {
    constructor() {
        super();
        this.symbol = 'd';
    }
}

export class LowerCharacterE extends Character {
    constructor() {
        super();
        this.symbol = 'e';
    }
}

export class LowerCharacterF extends Character {
    constructor() {
        super();
        this.symbol = 'f';
    }
}

export class LowerCharacterG extends Character {
    constructor() {
        super();
        this.symbol = 'g';
    }
}

export class LowerCharacterH extends Character {
    constructor() {
        super();
        this.symbol = 'h';
    }
}

export class LowerCharacterI extends Character {
    constructor() {
        super();
        this.symbol = 'i';
    }
}

export class LowerCharacterJ extends Character {
    constructor() {
        super();
        this.symbol = 'j';
    }
}

export class LowerCharacterK extends Character {
    constructor() {
        super();
        this.symbol = 'k';
    }
}

export class LowerCharacterL extends Character {
    constructor() {
        super();
        this.symbol = 'l';
    }
}

export class LowerCharacterM extends Character {
    constructor() {
        super();
        this.symbol = 'm';
    }
}

export class LowerCharacterN extends Character {
    constructor() {
        super();
        this.symbol = 'n';
    }
}

export class LowerCharacterO extends Character {
    constructor() {
        super();
        this.symbol = 'o';
    }
}

export class LowerCharacterP extends Character {
    constructor() {
        super();
        this.symbol = 'p';
    }
}

export class LowerCharacterQ extends Character {
    constructor() {
        super();
        this.symbol = 'q';
    }
}

export class LowerCharacterR extends Character {
    constructor() {
        super();
        this.symbol = 'r';
    }
}

export class LowerCharacterS extends Character {
    constructor() {
        super();
        this.symbol = 's';
    }
}

export class LowerCharacterT extends Character {
    constructor() {
        super();
        this.symbol = 't';
    }
}

export class LowerCharacterU extends Character {
    constructor() {
        super();
        this.symbol = 'u';
    }
}

export class LowerCharacterV extends Character {
    constructor() {
        super();
        this.symbol = 'v';
    }
}

export class LowerCharacterW extends Character {
    constructor() {
        super();
        this.symbol = 'w';
    }
}

export class LowerCharacterX extends Character {
    constructor() {
        super();
        this.symbol = 'x';
    }
}

export class LowerCharacterY extends Character {
    constructor() {
        super();
        this.symbol = 'y';
    }
}

export class LowerCharacterZ extends Character {
    constructor() {
        super();
        this.symbol = 'z';
    }
}

class CharacterOne implements IEvaluator {
    characters: Array<Character>;
    evaluate(){}
}

class CharacterTwo implements IEvaluator {
    characters: Array<Character>;
    evaluate(){}
}

class CharacterThree implements IEvaluator {
    characters: Array<Character>;
    constructor(){
        this.characters.push(new LowerCharacterS()); // zzS
        this.characters.push(new LowerCharacterX()); // xxX
    }
    evaluate(){}
}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class LowerCharacterEvaluator extends RulesEvaluator {

    constructor() {
        super();
        this.rules = new Array();

        this.rules.push(new LowerCharacterA());
    }

    evaluate(){}
}

class UpperCharacterEvaluator extends RulesEvaluator {

    constructor() {
        super();
        this.rules = new Array();
    }
}

export class LowerAlphabetEvaluator extends RulesEvaluator {

    constructor() {
        super();
        this.rules = new Array();

        //this.rules.push(new LowerLetterA());
/*
        this.letterB = new Letter([cp.characterB]);
        this.letterBx = new Letter([cp.characterB, cp.characterX]);
        this.letterC = new Letter([cp.characterC]);
        this.letterD = new Letter([cp.characterD]);
        this.letterDx = new Letter([cp.characterD, cp.characterX]);
        this.letterE = new Letter([cp.characterD]);
        this.letterF = new Letter([cp.characterF]);
        this.letterFx = new Letter([cp.characterF, cp.characterX]);
        this.letterG = new Letter([cp.characterG]);
        this.letterGx = new Letter([cp.characterG, cp.characterX]);
        this.letterH = new Letter([cp.characterH]);
        this.letterI = new Letter([cp.characterI]);
        this.letterJ = new Letter([cp.characterJ]);
        this.letterK = new Letter([cp.characterK]);
        this.letterL = new Letter([cp.characterL]);
        this.letterM = new Letter([cp.characterM]);
        this.letterN = new Letter([cp.characterN]);
        this.letterNg = new Letter([cp.characterN, cp.characterG]);
        this.letterNn = new Letter([cp.characterN, cp.characterN]);
        this.letterO = new Letter([cp.characterO]);
        this.letterP = new Letter([cp.characterP]);
        this.letterQ = new Letter([cp.characterQ]);
        this.letterS = new Letter([cp.characterS]);
        this.letterSs = new Letter([cp.characterS, cp.characterS]);
        this.letterT = new Letter([cp.characterT]);
        this.letterU = new Letter([cp.characterU]);
        this.letterUr = new Letter([cp.characterU, cp.characterR]);
        this.letterV = new Letter([cp.characterV]);
        this.letterW = new Letter([cp.characterW]);
        this.letterX = new Letter([cp.characterX]);
        this.letterXx = new Letter([cp.characterX, cp.characterX]);
        this.letterXxx = new Letter([cp.characterX, cp.characterX, cp.characterX]);
        this.letterY = new Letter([cp.characterY]);
        this.letterZ = new Letter([cp.characterZ]);
        this.letterZs = new Letter([cp.characterZ, cp.characterS]);
        this.letterZzs = new Letter([cp.characterZ, cp.characterZ, cp.characterS]);
        this.letterCapitalizedA = new Letter([cp.characterCapitalizedA]);
        this.letterCapitalizedB = new Letter([cp.characterCapitalizedB]);
        this.letterCapitalizedC = new Letter([cp.characterCapitalizedC]);
        this.letterCapitalizedD = new Letter([cp.characterCapitalizedD]);
        this.letterCapitalizedE = new Letter([cp.characterCapitalizedD]);
        this.letterCapitalizedF = new Letter([cp.characterCapitalizedF]);
        this.letterCapitalizedG = new Letter([cp.characterCapitalizedG]);
        this.letterCapitalizedH = new Letter([cp.characterCapitalizedH]);
        this.letterCapitalizedI = new Letter([cp.characterCapitalizedI]);
        this.letterCapitalizedJ = new Letter([cp.characterCapitalizedJ]);
        this.letterCapitalizedK = new Letter([cp.characterCapitalizedK]);
        this.letterCapitalizedL = new Letter([cp.characterCapitalizedL]);
        this.letterCapitalizedM = new Letter([cp.characterCapitalizedM]);
        this.letterCapitalizedN = new Letter([cp.characterCapitalizedN]);
        this.letterCapitalizedNg = new Letter([cp.characterCapitalizedN, cp.characterCapitalizedG]);
        this.letterCapitalizedNn = new Letter([cp.characterCapitalizedN, cp.characterCapitalizedN]);
        this.letterCapitalizedO = new Letter([cp.characterCapitalizedO]);
        this.letterCapitalizedP = new Letter([cp.characterCapitalizedP]);
        this.letterCapitalizedQ = new Letter([cp.characterCapitalizedQ]);
        this.letterCapitalizedS = new Letter([cp.characterCapitalizedS]);
        this.letterCapitalizedSs = new Letter([cp.characterCapitalizedS, cp.characterCapitalizedS]);
        this.letterCapitalizedT = new Letter([cp.characterCapitalizedT]);
        this.letterCapitalizedU = new Letter([cp.characterCapitalizedU]);
        this.letterCapitalizedUr = new Letter([cp.characterCapitalizedU, cp.characterCapitalizedR]);
        this.letterCapitalizedV = new Letter([cp.characterCapitalizedV]);
        this.letterCapitalizedW = new Letter([cp.characterCapitalizedW]);
        this.letterCapitalizedX = new Letter([cp.characterCapitalizedX]);
        this.letterCapitalizedXx = new Letter([cp.characterCapitalizedX, cp.characterCapitalizedX]);
        this.letterCapitalizedXxx = new Letter([cp.characterCapitalizedX, cp.characterCapitalizedX, cp.characterCapitalizedX]);
        this.letterCapitalizedY = new Letter([cp.characterCapitalizedY]);
        this.letterCapitalizedZ = new Letter([cp.characterCapitalizedZ]);
        this.letterCapitalizedZs = new Letter([cp.characterZ, cp.characterCapitalizedS]);
        this.letterCapitalizedZzs = new Letter([cp.characterCapitalizedZ, cp.characterCapitalizedZ, cp.characterCapitalizedS]);
*/
    }

    evaluate(){}
}

class ToneSandhi implements IRule {
    //baseTone: Letter;
    //sandhiTone: Letter
    match(){}
}


//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

class Accent implements IEvaluator {
    evaluate(){}
}
