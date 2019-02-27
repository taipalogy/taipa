import { Analyzer } from '../analyzer'
import { KanaTurner } from './lexeme';

export class Kana extends Analyzer {
    turner = new KanaTurner()
}