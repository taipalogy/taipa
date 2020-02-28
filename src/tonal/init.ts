import { tonalPositionalSounds, lowerLettersTonal } from './version2';

export function checkLetterSizeTonal() {
    if (tonalPositionalSounds.size !== lowerLettersTonal.size) {
        console.log('sizes unmatched');
    }
}
