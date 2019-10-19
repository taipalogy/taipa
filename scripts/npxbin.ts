import * as fs from 'fs';
import * as readline from 'readline';

let path = './taipa.js'

const readInterface = readline.createInterface(
    fs.createReadStream("../lib/taipa.js")
);

fs.appendFileSync(path, '', {
    flag: 'w'
});

let buffer: string[] = []

readInterface.on("line", (l: string) => {
    const idx1 = l.indexOf('require');
    if(idx1 > 0) {
        const idx2 = l.indexOf('./');
        let str1 = l.slice(0, idx2 + 1);
        let str2 = './lib';
        let str3 = l.slice(idx2 + 1, l.length - 1);
        let oneLine = str1 + str2 + str3;
        buffer.push(oneLine);
    } else if(idx1 == -1) {
        buffer.push(l);
    }
});    

readInterface.on("close", () => {
    for(let i in buffer) {
        fs.appendFileSync(path, buffer[i] + '\n', {
            flag: 'a+'
        });
    }
})

fs.chmod(path, 0o755, (err) => {
    if (err) throw err;
});