# Parser

* Input Method
* Dependency Parser
* Morphological Analyzer

## Building

`npm run build`

## Requirements

* node
* https://www.npmjs.com/package/@types/node

## Running the app

### steps

`cd bin`

denpendency parsing:

`node main.js`

morphological analyzer + input method:

`node main.js suzsjippwhoat`

## Input Method

See dictionary.ts for more sample inputs. Use `Client.processOneToken` to analyze a word

## Dependency Parser

Use `Client.process` method to parse a sentence
