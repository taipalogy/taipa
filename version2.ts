
import { Sound } from './grapheme'
import { characters } from './character'
import { FreeToneMark, CheckedToneMark, StopFinal, SetOfSounds, Final } from './version1'

export class ZeroToneMark extends FreeToneMark {characters = null;}

export class ToneMarkFR extends FreeToneMark {characters = [characters.get('f'), characters.get('r')]}
export class ToneMarkW extends FreeToneMark {characters = [characters.get('w')]}
export class ToneMarkFF extends FreeToneMark {characters = [characters.get('f'), characters.get('f')]}
export class ToneMarkXX extends FreeToneMark {characters = [characters.get('x'), characters.get('x')]}
export class ToneMarkXXX extends FreeToneMark {characters = [characters.get('x'), characters.get('x'), characters.get('x')]}
export class ToneMarkZS extends FreeToneMark {characters = [characters.get('z'), characters.get('s')]}

export class FreeToneMarkX extends FreeToneMark {characters = [characters.get('x')]}
export class FreeToneMarkY extends FreeToneMark {characters = [characters.get('y')]}

export class CheckedToneMarkW extends CheckedToneMark {characters = [characters.get('w')]}
export class ToneMarkF extends CheckedToneMark {characters = [characters.get('f')]}

export class CheckedToneMarkX extends CheckedToneMark {characters = [characters.get('x')]}
export class CheckedToneMarkY extends CheckedToneMark {characters = [characters.get('y')]}

export class FinalP extends StopFinal {characters = [characters.get('p')]}
export class FinalT extends StopFinal {characters = [characters.get('t')]}
export class FinalK extends StopFinal {characters = [characters.get('k')]}
export class FinalH extends StopFinal {characters = [characters.get('h')]}
export class FinalB extends StopFinal {characters = [characters.get('b')]}
export class FinalD extends StopFinal {characters = [characters.get('d')]}
export class FinalG extends StopFinal {characters = [characters.get('g')]}
export class FinalL extends StopFinal {characters = [characters.get('l')]}
export class FinalPP extends StopFinal {characters = [characters.get('p'), characters.get('p')]}
export class FinalTT extends StopFinal {characters = [characters.get('t'), characters.get('t')]}
export class FinalKK extends StopFinal {characters = [characters.get('k'), characters.get('k')]}
export class FinalHH extends StopFinal {characters = [characters.get('h'), characters.get('h')]}
export class FinalBB extends StopFinal {characters = [characters.get('b'), characters.get('b')]}
export class FinalDD extends StopFinal {characters = [characters.get('d'), characters.get('d')]}
export class FinalGG extends StopFinal {characters = [characters.get('g'), characters.get('g')]}
export class FinalLL extends StopFinal {characters = [characters.get('l'), characters.get('l')]}


export class SetOfFreeToneMarks extends SetOfSounds {
    freeToneMarks: Array<FreeToneMark> = new Array()
    constructor() {
        super()
        this.freeToneMarks.push(new ToneMarkFR())
        this.freeToneMarks.push(new ToneMarkW())
        this.freeToneMarks.push(new ToneMarkXX())
        this.freeToneMarks.push(new ToneMarkXXX())
        this.freeToneMarks.push(new ToneMarkFF())
        this.freeToneMarks.push(new ToneMarkZS())

        this.freeToneMarks.push(new FreeToneMarkX())
        this.freeToneMarks.push(new FreeToneMarkY())
    }

    toString() {
        return super.toString(this.freeToneMarks)
    }
}

export class SetOfFinals extends SetOfSounds {
    finals: Array<Final> = new Array()
    constructor() {
        super()
        this.finals.push(new FinalP())
        this.finals.push(new FinalT())
        this.finals.push(new FinalK())
        this.finals.push(new FinalH())
        this.finals.push(new FinalB())
        this.finals.push(new FinalD())
        this.finals.push(new FinalG())
        this.finals.push(new FinalL())
        this.finals.push(new FinalPP())
        this.finals.push(new FinalTT())
        this.finals.push(new FinalKK())
        this.finals.push(new FinalHH())
        this.finals.push(new FinalBB())
        this.finals.push(new FinalDD())
        this.finals.push(new FinalGG())
        this.finals.push(new FinalLL())

        //this.finals.push(new FinalM())
        //this.finals.push(new FinalN())
        //this.finals.push(new FinalNG())
    }

    toString() {
        return super.toString(this.finals)
    }
}

export class SetOfStopFinals extends SetOfSounds {
    stopFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.stopFinals.push(new FinalP())
        this.stopFinals.push(new FinalT())
        this.stopFinals.push(new FinalK())
        this.stopFinals.push(new FinalH())
        this.stopFinals.push(new FinalB())
        this.stopFinals.push(new FinalD())
        this.stopFinals.push(new FinalG())
        this.stopFinals.push(new FinalL())
        this.stopFinals.push(new FinalPP())
        this.stopFinals.push(new FinalTT())
        this.stopFinals.push(new FinalKK())
        this.stopFinals.push(new FinalHH())
        this.stopFinals.push(new FinalBB())
        this.stopFinals.push(new FinalDD())
        this.stopFinals.push(new FinalGG())
        this.stopFinals.push(new FinalLL())
    }

    toString() {
        return super.toString(this.stopFinals)
    }
}