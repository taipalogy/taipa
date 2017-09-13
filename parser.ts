import { Expression, Group, Series } from './expression';
import { PartOfSpeech } from './word';

class Shunter {
    nodes: Expression[];
    constructor(nodes) {
        //for (var i in nodes) {
          //this.nodes.push(nodes[i]);
        //}
        this.nodes = nodes;
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

    shunt(): Series {
        // use shunting yard algorithm

        var operators = [];
        var operands = [];
        var grouping = false;
        var previousOriginal = true;
        var count = 0;
        var sequenceNodes = [];
        var groupNodes = [];

        console.log("entering shunt function");

        for (var i in this.nodes) {

            let node = this.nodes[i];

            if (node.partOfSpeech === PartOfSpeech.VERB) {
                if (grouping){
                    count = count + 1;
                }

                console.log("operator found");

                operators.push(node);
                console.log("operators length" + operators.length);
            } else {
                // non-original tone
                if (!node.isOriginal()){
                ;
                }

                operands.push(node);
                console.log("operands length:" + operands.length);

                if (!node.isOriginal() && previousOriginal === true && grouping === false){
                    previousOriginal = false;
                    grouping = true;
                    groupNodes = [];
                    groupNodes.push(node);
                } else if (node.isOriginal() && previousOriginal === false && grouping === true) {
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
                } else if (!node.getBaseTone() && previousOriginal === false && grouping === true){
                    groupNodes.push(node);
                } else if (node.getBaseTone() && previousOriginal === true && grouping === false){
                    sequenceNodes.push(node);
                }
            }
        }

        console.log("length of operands(before joining):" + operands.length);
        
        while(operators.length){
            this.join(operators, operands);
        }

        let s: Series = null;
        if(operands.length ==  1) {
        
            let last = operands.pop();
            // when i delcared an variable s without using keyword var
            // this s was assigned to a sequence instance
            // hence i changed s to sqn and add keyword var before s
            s = new Series(last, sequenceNodes);
            //console.log(s);
        } else if (operands.length !== 1) {
            console.log("length of operands:" + operands.length);
            console.log("parsing error!!");
        }

        console.log(s);
        return s;
    }
}

export class Parser {
    private s: Shunter;
    constructor(nodes: Expression[]) {
        this.s = new Shunter(nodes);
    }

    parse(): Series {
        return this.s.shunt();
    }
}