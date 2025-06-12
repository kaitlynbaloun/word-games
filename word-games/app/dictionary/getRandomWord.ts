import * as fs from 'fs';
import * as path from 'path';

export const getRandomWord = (): string | undefined => {
    const dictionaryPath = path.join(__dirname, 'dictionary.txt');

    fs.readFile(dictionaryPath, 'utf8', (error, fileData) => {
        if (error) {
            console.error('Error reading dictionary.txt:', error);
            return;
        }

        const words = fileData
            .split('\n')
            .map(word => word.trim());

        if (words.length === 0) {
            console.log('No 5-letter words found.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    });

    return;
}