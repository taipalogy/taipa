# Taipa

A library for analyzing and processing Taiwanese language. This library consists of the following functions and features:

- lemmatizing
- stemming
- inflecting
- morpheme-based morphological analysis
- graphemic analysis
- get underlying forms as output by inputing surface forms 
- built-in hiragana, katakana, and Taiwanese kana

## Client

- Client.processTonal
- Client.processKana

## Development

On your terminal, run the following command:

`git clone -b develop https://github.com/taipalogy/taipa`

Git will create a folder named Taipa and clone all of the files in it.

Enter the folder Taipa, and run the following command to install required libraries as devDependencies:

`npm install`

npm will create a folder named node_modules and install all of the libraries in it.

Then run the following command to build:

`npm run build`

and to run test:

`npm run test`