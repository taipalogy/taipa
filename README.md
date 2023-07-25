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

## NPX

Once you have npm installed, you can run the command line to use the app on the fly on your terminal:

`npx taipa`

You can enter Roman alphabet `chit` and get the information of each letter in return. For example,

`ch - initialConsonant`

,

`i - vowel`

, and

`t - stopFinalConsonant`

will be printed in sequence on the screen.

You can also supply the npx command with a dictionary:

`npx taipa ./path/to/dictionary`

After you enter Roman alphabet `jinx`, you will get the entry from the dictionary in return. Assuming the path to your dictionary is `../dictionaries/example.json`:

`> node bin/app.js ../dictionaries/example.json`

and you will get the following results in return:

`人,仁`

Make your own dictionaries and get the entries by entering a word, or even a partial word.

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

### app

See NPX section for details.

The app can also be executed by running the following command line, after you have run the command line `npm run build`:

`node bin/app.js`

### develop branch

The latest changes are available on develop branch.

## Repos

Go to `https://github.com/taipalogy/apps` to see examples of application.

Go to `https://github.com/taipalogy/dictionaries` to see examples of dictionary.
