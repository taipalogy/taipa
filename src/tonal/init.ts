import { tonalPositionalSound, lowerLettersOfTonal } from './version2';

export function checkLetterSizeTonal() {
    if (tonalPositionalSound.size !== lowerLettersOfTonal.size) {
        console.log('sizes unmatched');
    }
}
