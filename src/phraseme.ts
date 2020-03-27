import { InflectionalEnding } from './tonal/lexeme';

export class ToneGroup {
  inflectionalEndings: Array<InflectionalEnding> = new Array();
}

class ToneSandhiGroup extends ToneGroup {}

export abstract class Phraseme {}

export class Phrase {
  literal: string = '';
}
