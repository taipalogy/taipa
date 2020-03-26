import { Phrase } from './phraseme';
import { Word } from './lexeme';

interface OrthographyFactory {
  createPhrase(): Phrase;
  createWord(): Word;
}

class TonalFactory implements OrthographyFactory {
  createPhrase() {
    return new Phrase();
  }
  createWord() {
    return new Word();
  }
}
