import axios from 'axios';
import { DictionaryResponse, Meaning } from './types/dictionaryApiResponse';

const DICTIONARY_API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const getDefinitions = async (word: string): Promise<Meaning[]> => {
    try {
        const dictionaryResponse = await axios.get<DictionaryResponse[]>(`${DICTIONARY_API_BASE_URL}${word}`)
        if (dictionaryResponse.data.length < 1 || dictionaryResponse.data[0].word !==  word || dictionaryResponse.data[0].meanings.length < 1) {
            throw new Error('Unable to fetch definition');
        }
        return dictionaryResponse.data[0].meanings;
    } catch (error) {
        console.log(error);
    }

    return [];
};