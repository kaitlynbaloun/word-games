import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import WordRow from './wordRow';

export interface IWordBoardProps {
  enteredWords: string[];
  correctWord: string;
  inProgressWord: string;
}

export default function WordBoard( { enteredWords, correctWord, inProgressWord }: IWordBoardProps ) {
  	const wordRows = [];

	for (let rowIndex = 0; rowIndex < enteredWords.length; rowIndex++) {
		wordRows.push(
			<WordRow 
				enteredWord={enteredWords[rowIndex] ?? ''}
				correctWord={correctWord}
				graded={enteredWords[rowIndex] ? true : false}
				key={rowIndex}
			/>
		)
	}
	if (enteredWords.length < 6) {
		wordRows.push(
			<WordRow 
				enteredWord={inProgressWord}
				correctWord={correctWord}
				graded={false}
				key={6}
			/>
		)
	}

	for (let rowIndex = enteredWords.length + 1; rowIndex < 6; rowIndex++) {
		wordRows.push(
			<WordRow 
				enteredWord={enteredWords[rowIndex] ?? ''}
				correctWord={correctWord}
				graded={enteredWords[rowIndex] ? true : false}
				key={rowIndex}
			/>
		)
	}
	
	return (
		<View style={styles.board}>
			{wordRows}
		</View>
  	);
}

const styles = StyleSheet.create({
	board: {
    	justifyContent: 'center',
    	alignItems: 'center',
	}
});
