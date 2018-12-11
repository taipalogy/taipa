
import { TurningIntoInputingLexeme } from './lexememaker'
import { ToneSandhiInputingLexeme, ToneSandhiParsingLexeme, DummyLexeme, SandhiFormLexeme } from './lexeme'
import { dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc, Shift, RightArc } from './dependencyparser'
import { RuleBasedTagger } from './rulebasedtagger'
import { SYMBOLS } from './symbols'

//const propertyOf = <TObj>(name: keyof TObj) => name;
//const propertyNamesOf = <TObj>(obj: TObj = null) => (name: keyof TObj) => name;

export class Document {
    inputingLexemes: Array<ToneSandhiInputingLexeme> = new Array();
    parsingLexemes: Array<ToneSandhiParsingLexeme> = new Array();
    graph: Array<Arc>
}

export class Client {
    lookup(k: string) {
        for(let key in dictionary) {
            if(key == k) {
            var value = dictionary[key];
            }
            if(value != null) {
            //console.log(value[0]);
            return value[0];
            }
        }
        return null;
    }

    processOneToken(str: string) {
        let doc: Document = new Document();
        let turner = new TurningIntoInputingLexeme()
        doc.inputingLexemes = turner.turnIntoLexemes(str.match(/\w+/g)[0])
        return doc;
    }

    process(str: string): Document {

        console.log(str)
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration();
        let tokens = str.match(/\w+/g);

        let lexemes: Array<ToneSandhiInputingLexeme> = new Array();
        let turner = new TurningIntoInputingLexeme()
        for(let key in tokens) {
            lexemes.push(turner.turnIntoLexemes(tokens[key])[0])
        }

        // can lexemes be replaced by a phraseme?
        let tagger = new RuleBasedTagger(lexemes);
        let nodes = tagger.lexemes;

        for(let key in nodes) {
            c.queue.push(nodes[key])
        }
        
        let guide = new Guide()
        let root = new DummyLexeme()
        root.word.literal = 'ROOT'
        c.stack.push(root)

        if(c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift())
        }

        while(!c.isTerminalConfiguration()) {
            
            let t: Transition = guide.getNextTransition();
            if(t == null) break
            c = c.makeTransition(t);
            if(c.stack[c.stack.length-1] != undefined) {
                if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.VERB) {
                    let l = c.stack[c.stack.length-1]
                    if(l instanceof SandhiFormLexeme) {
                        if(l.kvp.key === 'transitive') {
                            guide.transitions.push(new Shift())
                        }
                    } else if(l instanceof ToneSandhiParsingLexeme) {
                        if(l.kvp.key === 'intransitive') {
                            guide.transitions.push(new RightArc())
                            guide.transitions.push(new RightArc())
                        }
                    }
                } if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.PERSONALPRONOUN) {
                    let l = c.stack[c.stack.length-1]
                    if(l instanceof SandhiFormLexeme) {
                        if(l.kvp.key === 'proceeding') {
                            guide.transitions.push(new Shift())
                        }
                    }
                }
            }
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}