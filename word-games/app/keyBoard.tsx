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
	};
	setInProgressWord: (word: string) => void;
	inProgressWord: string;
}

export default function KeyBoard( { guessedLetters, setInProgressWord, inProgressWord }: IKeyBoardProps ) {
  	const keyBoardRows = [];

	const addLetter = (letter: string): void => {
		if (inProgressWord.length < 5) {
			setInProgressWord(inProgressWord + letter);
		}
	};

	const removeLetter = (letter: string): void => {
		if (inProgressWord.length < 5) {
			setInProgressWord(inProgressWord.slice(0, -1));
		}
	};

	for (let rowIndex = 0; rowIndex < KEYBOARD_KEYS.length; rowIndex++) {
		const letterRow = KEYBOARD_KEYS[rowIndex];
		const letters = [];
		for (let letterIndex = 0; letterIndex < letterRow.length; letterIndex++) {
			const letter = letterRow[letterIndex];
			letters.push(
				<LetterKey
					letter={letter}
					keyStatus={guessedLetters[letter] ?? KeyStatus.Ungraded}
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
