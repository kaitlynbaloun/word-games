import { StyleSheet, TouchableOpacity, Text } from 'react-native';
export enum KeyStatus {
	Correct = 'Correct',    
	Misplaced = 'Misplaced',  
	Incorrect = 'Incorrect',
	Ungraded = 'Unguessed'
}

export interface ILetterKeyProps {
  letter: string;
  keyStatus: KeyStatus;
  keyPressAction: (letter: string) => void;
}

const determineKeyColor = (status: KeyStatus): string => {
	switch (status) {
		case KeyStatus.Correct:
			return '#014421';
		case KeyStatus.Misplaced: 
			return '#ffa500';
		case KeyStatus.Incorrect: 
			return '#990f4b';
		default: 
			return '#D3D3D3';
	}
}

export default function LetterKey( { letter, keyStatus, keyPressAction }: ILetterKeyProps ) {

	const backgroundColor = determineKeyColor(keyStatus);
  	return (
		<TouchableOpacity role='button' style={[styles.box, { backgroundColor }]} onPress={() => {keyPressAction(letter)}}>
			{/* <View style={[styles.box, { backgroundColor }]}> */}
			<Text style={styles.boxText}>{letter}</Text>
			{/* </View> */}
		</TouchableOpacity>
  	);
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
	borderRadius: 2,
    height: 50,
	marginHorizontal: 2,
	zIndex: 9999
  },
  boxText: {
    fontSize: 20,
	paddingHorizontal: 14,
    fontWeight: 'bold',
  },
});
