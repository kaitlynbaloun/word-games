const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'rawDictionary.txt');
const outputFile = path.join(__dirname, 'dictionary.txt');

fs.readFile(inputFile, 'utf8', (error: any, fileData: string) => {
    if (error) {
        console.error('Error reading scrabble.txt:', error);
        return;
    }

    const fiveLetterWords = fileData
        .split('\n')
        .map(word => word.trim())
        .filter(word => word.length === 5);

    fs.writeFile(outputFile, fiveLetterWords.join('\n'), 'utf8', (error: any) => {
        if (error) {
            console.error('Error writing dictionary.txt:', error);
        } else {
            console.log(`Successfully wrote ${fiveLetterWords.length} five-letter words to dictionary.txt`);
        }
    });
});