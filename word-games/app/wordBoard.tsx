import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import WordRow from './wordRow';

export interface IWordBoardProps {
  enteredWords: string[];
  correctWord: string;
}

export default function WordBoard( { enteredWords, correctWord }: IWordBoardProps ) {
  	const wordRows = [];

	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
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
