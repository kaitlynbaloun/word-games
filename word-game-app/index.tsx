import { Button, Modal, Platform, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WordBoard from './components/wordBoard';
import KeyBoard from './components/keyBoard';
import { KeyStatus } from './components/letterKey';
import { use, useEffect, useState } from 'react';
import { Meaning } from './types/dictionaryApiResponse';
import { getDefinitions, getRandomWord, verifyWordIsValid } from './helpers/dictionaryHelpers';
import GameOverModal from './components/gameOverModal';

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

export default function NeverWordGame() {
  const [enteredWords, setEnteredWords] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState<string>(getRandomWord() ?? '');
  const [definitions, setDefinitions] = useState<Meaning[]>([]);
  const [inProgressWord, setInProgressWord] = useState<string>('');
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [hintsLeftCount, setHintsLeftCount] = useState<number>(3);
  const [invalidLettersGivenAsHints, setInvalidLettersGivenAsHints] = useState<string[]>([]);


  useEffect(() => {
    const fetchDefinitions = async () => {
      setDefinitions(await getDefinitions(correctWord));
    };

    fetchDefinitions();
  }, [correctWord]);

  useEffect(() => {
    if (enteredWords.length === 6 || enteredWords[enteredWords.length - 1] === correctWord) {
      console.log(`Game over. Word: ${correctWord}`);
      setModalIsVisible(true);
    }
  }, [enteredWords]);
 
 
  const enterClickAction = (): void => {
    if (inProgressWord.length === 5) {
      if (verifyWordIsValid(inProgressWord)) {
        setEnteredWords([
          ... enteredWords,
          inProgressWord
        ]);
        setInProgressWord('');
      } else {
        console.log(`${inProgressWord} is not a valid word in the scrabble dictionary`)
        // notify somehow visually
      }
    }
  };

  const startNewGame = (): void => {
    setCorrectWord(getRandomWord() ?? '');
    setEnteredWords([]);
    setInProgressWord('');
  }

  const useHint = (): void => {
    const unusedInvalidLetters = ALPHABET.filter((letter) => enteredWords.some((word) => !word.includes(letter)) && !correctWord.includes(letter));
    if (unusedInvalidLetters.length > 0) {
      const unusedInvalidHintLetter = unusedInvalidLetters[Math.floor(Math.random() * unusedInvalidLetters.length)]
      console.log(`${unusedInvalidHintLetter} is not used in the word`);
      setInvalidLettersGivenAsHints([...invalidLettersGivenAsHints, unusedInvalidHintLetter]);
      //notify somehow visually
    } else {
      //give some other kind of hint
      console.log('Any unused letters are included in your');
    }
    setHintsLeftCount(hintsLeftCount - 1);
  }

  const determineKeyStatus = (
    enteredWord: string,
    index: number
  ) => {
    if (enteredWord.charAt(index) === correctWord.charAt(index)) {
      return KeyStatus.Correct;
    } else if (correctWord.includes(enteredWord.charAt(index))) {
      return KeyStatus.Misplaced;
    } else {
      return KeyStatus.Incorrect;
    }
  }

  const constructGuessedLettersMap = (): { [key: string]: KeyStatus } => {
    const guessedLetters: {[key: string]: KeyStatus } = {};
    for (const word of enteredWords) {
      for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
        guessedLetters[word[letterIndex].toUpperCase()] = determineKeyStatus(word, letterIndex);
      }
    }
    for (const letter of invalidLettersGivenAsHints) {
      guessedLetters[letter.toUpperCase()] = KeyStatus.Incorrect;
    }
    return guessedLetters;
  };


  return (
    <View style={styles.container}>
      <GameOverModal 
        enteredWords={enteredWords} 
        correctWord={correctWord} 
        isGameWon={enteredWords[enteredWords.length - 1] === correctWord} 
        isVisible={modalIsVisible} 
        definitions={definitions} 
        setVisibility={(visible: boolean) => setModalIsVisible(visible)}
        startNewGame={() => startNewGame()}
      ></GameOverModal>
      <View style={styles.space} />
      <WordBoard enteredWords={enteredWords} correctWord={correctWord} inProgressWord={inProgressWord}/>
      <View style={styles.space} />
      <KeyBoard guessedLetters={constructGuessedLettersMap()} setInProgressWord={setInProgressWord} inProgressWord={inProgressWord} enterClickAction={enterClickAction}/>

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
  }
});
