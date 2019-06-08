# Parser

This parser consists of the following functions:

* lemmatizer
* stemmer
* morpheme-based morphological analyzer
* graphemic analyzer
* input method
* dependency parser

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

## Running the test

run the test to see examples of word-parsing

`node test.js`

## Input Method

See dictionary.ts for more sample inputs. Use `Client.processOneToken` to process a word

## Dependency Parser

Use `Client.process` method to parse a sentence

## Formosa 臺灣語

小川 尚義 (おがわ なおよし). Thomas Barclay.