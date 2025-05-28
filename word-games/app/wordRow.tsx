import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import WordBox, { Status } from './wordBox';

export interface IWordRowProps {
  enteredWord: string;
  correctWord: string;
  graded: boolean;
}

const determineStatus = (
	enteredWord: string,
	correctWord: string,
	index: number,
	graded: boolean
) => {
	if (!graded) {
		return Status.Ungraded;
	} else if (enteredWord.charAt(index) === correctWord.charAt(index)) {
		return Status.Correct;
	} else if (correctWord.includes(enteredWord.charAt(index))) {
		return Status.Misplaced;
	} else {
		return Status.Incorrect;
	}

}

export default function WordRow( { enteredWord, correctWord, graded }: IWordRowProps ) {
  	const wordRow = [];

	for (let boxIndex = 0; boxIndex < 5; boxIndex++) {
		wordRow.push(
			<WordBox 
				letter={enteredWord.charAt(boxIndex)} 
				boxStatus={determineStatus(enteredWord, correctWord, boxIndex, graded)} 
				key={boxIndex}
			/>
		)
	}
	
	return (
		<View style={styles.row}>
			{wordRow}
		</View>
  	);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
	marginVertical: 4
  }
});
