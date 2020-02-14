import { tonal_positional_sounds, lowerLettersOfTonal } from './version2';

export function checkLetterSizeTonal() {
    if (tonal_positional_sounds.size !== lowerLettersOfTonal.size) {
        console.log('sizes unmatched');
    }
}
