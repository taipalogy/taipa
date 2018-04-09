

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

export class Grapheme implements IRule {
    characters: Array<Character>;
    match(){}
}

export class GraphemeA extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterA());
    }
}

class GraphemeB extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterB());
    }
}

class GraphemeC extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterC());
    }
}


class GraphemeD extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterD());
    }
}

class GraphemeE extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterE());
    }
}

class GraphemeF extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterF());
    }
}

class GraphemeG extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterG());
    }
}

class GraphemeH extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterH());
    }
}

class GraphemeN extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterN());
    }
}

class GraphemeO extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterO());
    }
}

class GraphemeP extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterP());
    }
}

class GraphemeQ extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterQ());
    }
}

class GraphemeR extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterR());
    }
}

class GraphemeS extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterS());
    }
}

class GraphemeT extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterT());
    }
}

class GraphemeU extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterU());
    }
}

class GraphemeV extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterV());
    }
}

class GraphemeW extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterW());
    }
}

class GraphemeX extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterX());
    }
}

class GraphemeY extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterY());
    }
}

class GraphemeI extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterI());
    }
}

class GraphemeJ extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterJ());
    }
}

class GraphemeK extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterK());
    }
}

class GraphemeL extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterL());
    }
}

class GraphemeM extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterM());
    }
}

class GraphemeZ extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterZ());
    }
}

class GraphemeNG extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterN());
        this.characters.push(new LowerCharacterG());
    }
}

class GraphemeNN extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterN());
        this.characters.push(new LowerCharacterN());
    }
}

class GraphemeSS extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterS());
        this.characters.push(new LowerCharacterS());
    }
}

class GraphemeUR extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterU());
        this.characters.push(new LowerCharacterR());
    }
}

class GraphemeXX extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterX());
        this.characters.push(new LowerCharacterX());
    }
}

class GraphemeXXX extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterX());
        this.characters.push(new LowerCharacterX());
        this.characters.push(new LowerCharacterX());
    }
}

class GraphemeZS extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterZ());
        this.characters.push(new LowerCharacterS());
    }
}

class GraphemeZZS extends Grapheme {
    constructor() {
        super();
        this.characters.push(new LowerCharacterZ());
        this.characters.push(new LowerCharacterZ());
        this.characters.push(new LowerCharacterS());
    }
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

class Letter implements IRule {
    characters: Array<Character>;
    grapheme: Grapheme;
    match(){}
}

class LowerLetterA extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterA());
        this.grapheme = new GraphemeA();
    }
}

class LowerLetterB extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterB());
        this.grapheme = new GraphemeB();
    }
}

class LowerLetterC extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterC());
        this.grapheme = new GraphemeC();
    }
}

class LowerLetterD extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterD());
        this.grapheme = new GraphemeD();
    }
}

class LowerLetterE extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterE());
        this.grapheme = new GraphemeE();
    }
}

class LowerLetterF extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterF());
        this.grapheme = new GraphemeF();
    }
}

class LowerLetterG extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterG());
        this.grapheme = new GraphemeG();
    }
}

class LowerLetterH extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterH());
        this.grapheme = new GraphemeH();
    }
}

class LowerLetterI extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterI());
        this.grapheme = new GraphemeI();
    }
}

class LowerLetterJ extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterJ());
        this.grapheme = new GraphemeJ();
    }
}

class LowerLetterK extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterK());
        this.grapheme = new GraphemeK();
    }
}

class LowerLetterL extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterL());
        this.grapheme = new GraphemeL();
    }
}

class LowerLetterM extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterM());
        this.grapheme = new GraphemeM();
    }
}

class LowerLetterN extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterN());
        this.grapheme = new GraphemeN();
    }
}

class LowerLetterO extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterO());
        this.grapheme = new GraphemeO();
    }
}

class LowerLetterP extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterP());
        this.grapheme = new GraphemeP();
    }
}

class LowerLetterQ extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterQ());
        this.grapheme = new GraphemeQ();
    }
}

class LowerLetterS extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterS());
        this.grapheme = new GraphemeS();
    }
}

class LowerLetterT extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterT());
        this.grapheme = new GraphemeT();
    }
}

class LowerLetterU extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterU());
        this.grapheme = new GraphemeU();
    }
}

class LowerLetterV extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterV());
        this.grapheme = new GraphemeV();
    }
}

class LowerLetterX extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterX());
        this.grapheme = new GraphemeX();
    }
}

class LowerLetterY extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterY());
        this.grapheme = new GraphemeY();
    }
}

class LowerLetterZ extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterZ());
        this.grapheme = new GraphemeZ();
    }
}

class LowerLetterZZS extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterZ());
        this.characters.push(new LowerCharacterZ());
        this.characters.push(new LowerCharacterS());
        this.grapheme = new GraphemeZZS();
    }
}

class LowerLetterXX extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterX());
        this.characters.push(new LowerCharacterX());
        this.grapheme = new GraphemeXX();
    }
}

class LowerLetterXXX extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterX());
        this.characters.push(new LowerCharacterX());
        this.characters.push(new LowerCharacterX());
        this.grapheme = new GraphemeXXX();
    }
}

class LowerLetterSS extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterS());
        this.characters.push(new LowerCharacterS());
        this.grapheme = new GraphemeSS();
    }
}

class LowerLetterZS extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterZ());
        this.characters.push(new LowerCharacterS());
        this.grapheme = new GraphemeZS();
    }
}

class LowerLetterUR extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterU());
        this.characters.push(new LowerCharacterR());
        this.grapheme = new GraphemeUR();
    }
}

class LowerLetterW extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterW());
        this.grapheme = new GraphemeW();
    }
}

class LowerLetterNG extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterN());
        this.characters.push(new LowerCharacterG());
        this.grapheme = new GraphemeUR();
    }
}

class LowerLetterNN extends Letter {
    constructor() {
        super();
        this.characters = new Array();
        this.characters.push(new LowerCharacterN());
        this.characters.push(new LowerCharacterN());
        this.grapheme = new GraphemeNN();
    }
}

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

        this.rules.push(new LowerLetterA());
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
    baseTone: Letter;
    sandhiTone: Letter
    match(){}
}

class ToneSandhiNilToZs extends ToneSandhi {
    constructor() {
        super();
        this.baseTone = null;
        this.sandhiTone = new LowerLetterZS();
    }
}

class ToneSandhiZsToW extends ToneSandhi {
    constructor() {
        super();
        this.baseTone = new LowerLetterZS();
        this.sandhiTone = new LowerLetterW();
    }
}


//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

class Morpheme implements IRule {
    match(){}
}

class MorphemeA extends Morpheme {
    graphemes: Array<Grapheme>;
    constructor() {
        super();

    }
    match(){}
}

class MorphemeAY extends Morpheme {

}

class MorphemeAZS extends Morpheme {

}

class Syllable implements IRule {
    match(){}
}

class Accent implements IEvaluator {
    evaluate(){}
}
