import { tonal_positional_sounds, lowerLettersTonal } from './version2';

export function checkLetterSizeTonal() {
    if (tonal_positional_sounds.size !== lowerLettersTonal.size) {
        console.log('sizes unmatched');
    }
}
