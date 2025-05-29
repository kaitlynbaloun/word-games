import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import LetterKey, { KeyStatus } from './letterKey';

const KEYBOARD_KEYS = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
]

export interface IKeyBoardProps {
	guessedLetters: { 
		[key: string]: KeyStatus 
	}
}

export default function KeyBoard( {  }: IKeyBoardProps ) {
  	const keyBoardRows = [];

	for (let rowIndex = 0; rowIndex < KEYBOARD_KEYS.length; rowIndex++) {
		const letterRow = KEYBOARD_KEYS[rowIndex];
		const letters = [];
		for (let letterIndex = 0; letterIndex < letterRow.length; letterIndex++) {
			letters.push(
				<LetterKey
					letter={letterRow[letterIndex]}
					keyStatus={KeyStatus.Correct}
				/>
			)
		}
		keyBoardRows.push(
			<View style={styles.keyBoardRow}>
				{letters}
			</View>
		)
	}
	
	return (
		<View style={styles.keyBoard}>
			{keyBoardRows}
		</View>
  	);
}

const styles = StyleSheet.create({
	keyBoard: {
    	justifyContent: 'center',
    	alignItems: 'center',
	},
	keyBoardRow: {
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'center',
		marginVertical: 4
	}
});
