import { Group, Series } from './expression';
import { PartOfSpeech } from './word';

class Shunter {
    nodes: any;
    constructor(nodes) {
        this.nodes = [];
        for (var key in nodes) {
          this.nodes.push(nodes[key]);
        }
        console.log("shunter constructor");
        console.log(this.nodes);
    }

    join(operators, operands) {
        // If you call pop() on an empty array, it returns undefined.
        let o = operators.pop();
        if(typeof o !== 'undefined') {
        var tmpo = operands.pop();

        if(typeof tmpo !== 'undefined') {
            o.left = tmpo;
        } else {
            o.left = null;
        }

        tmpo = operands.pop();
        if(typeof tmpo !== 'undefined') {
            o.right = tmpo;
        } else {
            o.right = null;
        }

        operands.push(o);
        }
    }

    shunt() {
        // use shunting yard algorithm

        var operators = [];
        var operands = [];
        var grouping = false;
        var previousOriginal = true;
        var count = 0;
        var sequenceNodes = [];
        var groupNodes = [];

        console.log("entering shunt function");

        for (var key in this.nodes) {

        let node = this.nodes[key];

        if (node.getOperax().getPartOfSpeech() === PartOfSpeech.VERB) {
            if (grouping){
            count = count + 1;
            }

            console.log("operator found");

            operators.push(node);
            console.log("operators length" + operators.length);
        } else {
            // non-original tone
            if (!node.getOperax().isOriginal()){
            ;
            }

            operands.push(node);
            console.log("operands length" + operands.length);

            if (!node.getOperax().isOriginal() && previousOriginal === true && grouping === false){
            previousOriginal = false;
            grouping = true;
            groupNodes = [];
            groupNodes.push(node);
            } else if (node.getOperax().isOriginal() && previousOriginal === false && grouping === true) {
            previousOriginal = true;
            grouping = false;

            while(count > 0){
                this.join(operators, operands);
                count = count - 1;
            }

            groupNodes.push(node);
            let grpNode = new Group(operands.pop(), groupNodes);
            sequenceNodes.push(grpNode);
            operands.push(grpNode);
            } else if (!node.getOperax().getOriginalTone() && previousOriginal === false && grouping === true){
            groupNodes.push(node);
            } else if (node.getOperax().getOriginalTone() && previousOriginal === true && grouping === false){
            sequenceNodes.push(node);
            }
        }
        }

        while(operators.length){
        this.join(operators, operands);
        }

        let sqn = null;
        if(operands.length ==  1) {
        
        let last = operands.pop();
        // when i delcared an variable s without using keyword var
        // this s was assigned to a sequence instance
        // hence i changed s to sqn and add keyword var before s
        sqn = new Series(last, sequenceNodes);
        //console.log(s);
        } else if (operands.length !== 1){
        console.log("parsing error!!");
        }

        return sqn;
    }
}

export class Parser {
    s: Shunter;
    constructor(nodes: any) {
        this.s = new Shunter(nodes);
        this.s.shunt();
    }
}