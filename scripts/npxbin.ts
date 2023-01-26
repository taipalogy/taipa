import * as fs from 'fs';
import * as readline from 'readline';

/**
 * scripts> ../node_modules/typescript/bin/tsc npxbin.ts
 * scripts> node npxbin.js
 * scripts> mv app.js ../bin
 */

const path = './app.js';

const readInterface = readline.createInterface(
  fs.createReadStream('../lib/app.js')
);

fs.appendFileSync(path, '', {
  flag: 'w',
});

let buffer: string[] = [];

readInterface.on('line', (l: string) => {
  const idx1 = l.indexOf('require');
  if (idx1 > 0) {
    const idx2 = l.indexOf('./');
    const str1 = l.slice(0, idx2 + 1);
    const str2 = './lib';
    const str3 = l.slice(idx2 + 1, l.length - 1);
    let oneLine = '';
    if (idx2 >= 0) oneLine = str1 + str2 + str3; // insert ./lib
    else oneLine = str1 + str3; // don't insert ./lib
    buffer.push(oneLine);
  } else if (idx1 == -1) {
    buffer.push(l);
  }
});

readInterface.on('close', () => {
  for (let i in buffer) {
    fs.appendFileSync(path, buffer[i] + '\n', {
      flag: 'a+',
    });
  }
});

fs.chmod(path, 0o755, (err) => {
  if (err) throw err;
});
