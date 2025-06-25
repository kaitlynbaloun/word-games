import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

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
			return '#6aaa64';
		case KeyStatus.Misplaced: 
			return 'yellow';
		case KeyStatus.Incorrect: 
			return 'red';
		default: 
			return '#D3D3D3';
	}
}

export default function LetterKey( { letter, keyStatus, keyPressAction }: ILetterKeyProps ) {

	const backgroundColor = determineKeyColor(keyStatus);
  	return (
		<Link href="/" asChild>
        	<TouchableOpacity style={styles.box} onPress={() => {keyPressAction(letter)}}>
				<View style={[styles.box, { backgroundColor }]}>
      				<Text style={styles.boxText}>{letter}</Text>
    			</View>
        	</TouchableOpacity>
		</Link>
  	);
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
	borderRadius: 2,
    height: 50,
	marginHorizontal: 2
  },
  boxText: {
    fontSize: 20,
	paddingHorizontal: 14,
    fontWeight: 'bold',
  },
});
