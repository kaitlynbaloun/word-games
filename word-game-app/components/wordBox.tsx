import { StyleSheet, Text, View } from 'react-native';

export enum Status {
	Correct = 'Correct',    
	Misplaced = 'Misplaced',  
	Incorrect = 'Incorrect',
	Ungraded = 'Ungraded'
}

export interface IWordBoxProps {
  letter: string;
  boxStatus: Status;
}

const determineBackgroundColor = (status: Status): string => {
	switch (status) {
		case Status.Correct:
			return '#014421';
		case Status.Misplaced: 
			return '#ffa500';
		case Status.Incorrect: 
			return '#990f4b';
		default: 
			return '#00000000';
	}
}

export default function WordBox( { letter, boxStatus }: IWordBoxProps ) {
	const backgroundColor = determineBackgroundColor(boxStatus);
  	return (
    	<View style={[styles.box, { backgroundColor }]}>
      		<Text style={styles.boxText}>{letter}</Text>
    	</View>
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
