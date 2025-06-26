const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'rawDictionary.txt');
const outputFile = path.join(__dirname, 'dictionary.ts');

fs.readFile(inputFile, 'utf8', (error: any, fileData: string) => {
    if (error) {
        console.error('Error reading scrabble.txt:', error);
        return;
    }

    const fiveLetterWords: string[] = fileData
        .split('\n')
        .map(word => word.trim())
        .filter(word => word.length === 5);

    const tsArray = `export const dictionaryArray = ${JSON.stringify(fiveLetterWords, null, 2)};\n`;

    fs.writeFile(outputFile, tsArray, 'utf8', (error: any) => {
        if (error) {
            console.error('Error writing dictionary.ts:', error);
        } else {
            console.log(`Successfully wrote ${fiveLetterWords.length} five-letter words to dictionary.ts`);
        }
    });
});