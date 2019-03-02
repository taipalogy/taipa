import { Analyzer } from '../analyzer'
import { KanaTurner } from './turner';

export class Kana extends Analyzer {
    turner = new KanaTurner()
}