
import { Sound, Syllabary } from './system'
import { GraphemeMaker } from './graphememaker'

import { list_of_lexical_roots } from './lexicalroots2'
import { SetOfMaterLectionis,
    SetOfMedials,
    SetOfInitials,
    SetOfFreeTonals,
    SetOfFinals,
    SetOfNeutralFinals,
    SetOfNasalizations,
    SetOfStopFinals,
    combiningRules,
    letterClass,
    } from './version2'
import { TonalTurner } from './lexememaker';

//------------------------------------------------------------------------------
//  Lexical Root
//------------------------------------------------------------------------------

export class ListOfLexicalRoots extends Syllabary {
    list: Array<Sound[]> =  new Array()

    setFirstLetter(beginning: string) {
        let cog = new ClientOfGenerator()
        let entries: Array<Sound[]> = cog.generate(beginning)
        for(let i in entries) {
            this.list.push(entries[i])
        }
    }

    toString() {
        let str: string = ''
        for(let k in this.list) {
            for(let i in this.list[k]) {
                str += this.list[k][i].getLiteral()
                str += ', '
            }
        }
        return str
    }
}

class LexicalRootGenerator {
    generate(beginning: string) {
        let strs: string[] = new Array
        for(let i in list_of_lexical_roots) {
            if(list_of_lexical_roots[i].search(beginning) == 0) {
                strs.push(list_of_lexical_roots[i])
            }
        }
        //for(let i in strs) console.info(strs[i])
        return strs
    }
}

class ClientOfGenerator {
    private analyzeAfterNasalFinalsOrNasalSound(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone do not have a tonal
        if(this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length-1] + '.freeTonal')
        } else if(this.isNeutralFinal(ls[index])) {
            // when a nasal final m, n, or ng is followed by a neutral final h
            sounds.push(ls[ls.length-1] + '.final')
        }

        return sounds
    }

    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if(this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length-1] + '.freeTonal')
        } else if(this.isNasalization(ls[index])) {
            sounds.push(ls[index] + '.nasalization')
            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterNasalFinalsOrNasalSound(ls, sounds, sounds.length)
            }
        } else if(this.isFinalConsonant(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isFinalConsonant(ls[k])) {
                    sounds.push(ls[k] + '.final')
                }
                k++
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterNasalFinalsOrNasalSound(ls, sounds, sounds.length)
            }
            
        } 

        return sounds
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        if(this.isVowel(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.medial')
                }
                k++
            }
            
            if(ls.length == sounds.length) {
                // vowels with no tonals
                return sounds
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
            }
        }

        return sounds
    }

    private isMaterLectionis(str: string) {
        if(str.search(new RegExp(new SetOfMaterLectionis().toString())) == 0) return true

        return false
    }

    private isVowel(str: string) {
        if(str.search(new RegExp(new SetOfMedials().toString())) == 0) return true

        return false
    }

    private isInitialConsonant(str: string) {
        if(str.search(new RegExp(new SetOfInitials().toString())) == 0) return true

        return false
    }

    private isFreeTonal(str: string) {
        if(str.search(new RegExp(new SetOfFreeTonals().toString())) == 0) return true

        return false
    }
    
    private isFinalConsonant(str: string) {
        if(str.search(new RegExp(new SetOfFinals().toString())) == 0) return true

        return false
    }

    private isNasalization(str: string) {
        if(str.search(new RegExp(new SetOfNasalizations().toString())) == 0) return true
        
        return false
    }

    private isStopFinal(str: string) {
        if(str.search(new RegExp(new SetOfStopFinals().toString())) == 0) return true
        
        return false
    }

    private isNeutralFinal(str: string) {
        if(str.search(new RegExp(new SetOfNeutralFinals().toString())) == 0) return true
        
        return false
    }
    
    private makeCombiningForms(entry: string[]) {
        let lastElement = entry[entry.length-1]
        let n = lastElement.lastIndexOf('.')
        let key = lastElement.slice(0, n)
        let tos = combiningRules.get(key) // plural to
        let ret: Array<string[]> = new Array

        if(lastElement.lastIndexOf('freeTonal') > 0) {
            let e: string[] = []
            for(let k in tos) {
                
                e = []
                e = Object.assign([], entry)
                e.pop()
                if(tos[k].getLiteral() != 0) {
                    // zero-tone-mark for first tone will not be pushed
                    e.push(tos[k].getLiteral() + '.freeTonal')
                }

                // first tone is still pushed to return
                ret.push(e)
            }
        } else {
            let e: string[] = []
            e = Object.assign([], entry)
            let to = combiningRules.get('zero')
            //console.debug(Object.keys(to))
            e.push(combiningRules.get('zero')[Object.keys(to)[0]].getLiteral() + '.freeTonal')
            ret.push(e)
        }
    
        return ret
    }

    private findNew(buffer: Array<string[]>) {
        // find new tones based on the same stem
        let cfs
        for(let i in buffer) {
            cfs = this.makeCombiningForms(buffer[i])
        
            for(let m in cfs) {
                for(let n = 0 ; n < buffer.length; n++) {
                    let entry = buffer[n]
                    if(entry[entry.length-1] === cfs[m][cfs[m].length-1]) {
                        break
                    }
                    if(n == buffer.length-1) {
                        // pushed to fill the slot, block following duplicates
                        // duplicates come from combining rules
                        buffer.push(cfs[m])
                    }
                }
            }
        }
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PSA.medial
        let ret: Array<Sound> = new Array()
        for(let i in entry) {
            let n = entry[i].lastIndexOf('.')
            let clasName = entry[i].slice(0, n)
            let position = entry[i].slice(n+1)
            //console.debug(entry + ' ' + clasName + ' ' + position)
            ret.push(letterClass.get(clasName)[position]) // this will call the static member of the class
        }
        return ret
    }

    generate(beginning: string) {
        let lrg = new LexicalRootGenerator()
        let strs: Array<string> = lrg.generate(beginning) // retrieve all needed roots beginning with beggining
        let arrayOfSounds: Array<string[]> = new Array() // collecting all sounds to be processed
        let turner = new TonalTurner()
        let entries: Array<Sound[]> = new Array() // to be returned

        for(let i in strs) {
            // generates all needed sounds to be processed
            let output = turner.getDataOfGraphemicAnalysis(strs[i])
            let ls: string[] = []
            for(let j in output.graphemes) {
                ls.push(output.graphemes[j].letter.literal)
            }
            
            let sounds: string[] = []

            if((this.isMaterLectionis(ls[0]) && ls.length == 1) 
                || (ls.length == 2 && this.isMaterLectionis(ls[0]) && this.isFreeTonal(ls[1]))) {
                
                sounds.push(ls[0] + '.medial')
                if(ls.length > sounds.length) {
                    if(this.isFreeTonal(ls[1])) {
                        sounds = this.analyzeAfterNasalFinalsOrNasalSound(ls, sounds, sounds.length)
                    }
                }

                arrayOfSounds.push(sounds)
                continue
            }

            // analyze vowels, which have null initial consonants
            // pass 0 as index to indicate it has null initial consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            if(this.isInitialConsonant(ls[0])) {
                // analyze initial consonants
                sounds.push(ls[0] + '.initial')
                if(this.isVowel(ls[1])) {
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                } else if(this.isFinalConsonant(ls[1])) {
                    // consonants followed by consonants. CC
                    sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
                }
            }

            arrayOfSounds.push(sounds)
        }

        let buffer: Array<string[]> = new Array()
        let currentStem: string[] = []
        let nextStem: string[] = []
        for(let k = 0; k < arrayOfSounds.length; k++) {

            //console.debug(arrayOfSounds[k])
            entries.push(this.convert(arrayOfSounds[k]))

            let entry = arrayOfSounds[k]
            let lastElement = entry[entry.length-1]

            if(this.isStopFinal(lastElement)) {
                let lastElement = entry[entry.length-1]
                let n = lastElement.lastIndexOf('.')
                let key = lastElement.slice(0, n)
                let tos = combiningRules.get(key)
        
                let e: string[] = []
                for(let k in tos) {
                    e = []
                    e = Object.assign([], entry)
                    e.push(tos[k].getLiteral() + '.checkedTonal')

                    entries.push(this.convert(e))
                }
    
                if(k == arrayOfSounds.length-1) {
                    // terminal condition of iterator of arrayofSounds
                    this.findNew(buffer)
                    for(let i in buffer) {
                        entries.push(this.convert(buffer[i]))
                    }
                }
            } else {
                if(lastElement.lastIndexOf('freeTonal') > 0) {
                    nextStem = entry.slice(0, entry.length-1)
                } else {
                    nextStem = entry
                }

                if(nextStem.length != currentStem.length) {
                    // when the stems are not in the same length
                    currentStem = nextStem
                    this.findNew(buffer)
                    for(let i in buffer) {
                        entries.push(this.convert(buffer[i]))
                    }
                    buffer = []
                } else {
                    for(let e in currentStem) {
                        if(currentStem[e] !== nextStem[e]) {
                            // when the stems are not the same
                            currentStem = nextStem
                            this.findNew(buffer)
                            for(let i in buffer) {
                                entries.push(this.convert(buffer[i]))
                            }
                            buffer = []
                            break
                        }
                    }
                }

                buffer.push(entry)
            }
        }

        return entries
    }
}