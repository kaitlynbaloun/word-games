import { dictionaryArray } from './dictionary';

export const getRandomWord = async (): Promise<string | undefined> => {
    if (dictionaryArray.length === 0) {
        console.log('No 5-letter words found.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * dictionaryArray.length);
    return dictionaryArray[randomIndex];
}