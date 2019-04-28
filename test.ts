import { Client } from './client'
import { lowerLettersOfTonal } from './tonal/version2'
import { characters } from './character'
import { list_of_lexical_roots } from './tonal/lexicalroots2'

const NUMBER_OF_CHARACTERS: number = 26;
const NUMBER_OF_LETTERS: number = 37;
const NUMBER_OF_ROOTS = 2209;

console.log(`matched number of characters: ${characters.size === NUMBER_OF_CHARACTERS}`);
console.log(`matched number of letters: ${Object.keys(lowerLettersOfTonal).length === NUMBER_OF_LETTERS}`);
console.log(`matched number of roots: ${list_of_lexical_roots.length === NUMBER_OF_ROOTS}`);

let cli = new Client()
console.info(cli.output('suzsjippwhoat'))
console.info(cli.output('zaucszeng'))
console.info(cli.output('tengzssek'))
console.info(cli.output('dienwnauy'))
console.info(cli.output('sengx'))
console.info(cli.output('a'))
console.info(cli.output('sia'))
console.info(cli.output('siay'))
console.info(cli.output('siaw'))
console.info(cli.output('siazs'))
console.info(cli.output('siax'))