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
			return '#00000000';
	}
}

export default function LetterKey( { letter, keyStatus }: ILetterKeyProps ) {

	const backgroundColor = determineKeyColor(keyStatus);
  	return (
		<Link href="/" asChild>
        	<TouchableOpacity style={styles.box} onPress={() => {}}>
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
    borderColor: '#00000F',
    borderWidth: 2,
    width: 50,
    height: 50,
	marginHorizontal: 4
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
