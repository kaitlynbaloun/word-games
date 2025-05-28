import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import WordleRow from './wordleRow';

export interface IWordleBoardProps {
  enteredWords: string[];
  correctWord: string;
}

export default function WordleBoard( { enteredWords, correctWord }: IWordleBoardProps ) {
  	const wordleRows = [];

	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
		wordleRows.push(
			<WordleRow 
				enteredWord={enteredWords[rowIndex] ?? ''}
				correctWord={correctWord}
				graded={enteredWords[rowIndex] ? true : false}
				key={rowIndex}
			/>
		)
	}
	
	return (
		<View style={styles.board}>
			{wordleRows}
		</View>
  	);
}

const styles = StyleSheet.create({
	board: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
