import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import WordBoard from './wordBoard';
import KeyBoard from './keyBoard';
import { KeyStatus } from './letterKey';
import { useEffect, useState } from 'react';
import { getRandomWord } from './dictionary/getRandomWord';
import { Meaning } from './types/dictionaryApiResponse';
import { getDefinitions } from './getDefinitions';

export default function NeverWordGame() {
  const [enteredWords, setEnteredWords] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState<string>(getRandomWord() ?? '');
  const [definitions, setDefinitions] = useState<Meaning[]>([]);
  const [inProgressWord, setInProgressWord] = useState<string>('');


  useEffect(() => {
    const fetchDefinitions = async () => {
      setDefinitions(await getDefinitions(correctWord));
    };

    fetchDefinitions();
  }, [correctWord]);


  useEffect(() => {
    if (inProgressWord.length === 5) {
      setEnteredWords([
        ... enteredWords,
        inProgressWord
      ]);
      setInProgressWord('');
    }
  }, [inProgressWord]);


  useEffect(() => {
    if (enteredWords.length === 6) {
      console.log('Game over');
    }
  }, [enteredWords]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NeverWord</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <WordBoard enteredWords={enteredWords} correctWord={correctWord} inProgressWord={inProgressWord}/>
      <View style={styles.space} />
      <KeyBoard guessedLetters={{'A': KeyStatus.Correct}} setInProgressWord={setInProgressWord}/>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  space: {
    marginVertical: 10,
    height: 1,
  },
});
