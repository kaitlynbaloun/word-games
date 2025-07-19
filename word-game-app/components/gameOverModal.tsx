import { Meaning, Definition } from '@/types/dictionaryApiResponse';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface IGameOverModalProps {
  enteredWords: string[];
  correctWord: string;
  isGameWon: boolean;
  isVisible: boolean;
  definitions: Meaning[];
  setVisibility: (visible: boolean) => void
  startNewGame: () => void
}

export default function GameOverModal( { isGameWon, correctWord, enteredWords, isVisible, setVisibility, startNewGame, definitions }: IGameOverModalProps ) {
	const screenHeight = Dimensions.get('window').height;
	
	function flattenMeanings(meanings: Meaning[]): Definition[] {
		return meanings.flatMap(meaning => meaning.definitions);
	}
	
	const parsedDefinitions = flattenMeanings(definitions);

	return (
		<Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
			<Text style={styles.modalText}>{isGameWon ? 'You Won!' : 'Game Over.'}</Text>
			<ScrollView style={{maxHeight: screenHeight * 0.75, ...styles.modalContainer}}>
				<Text style={styles.correctWordText}>{correctWord}</Text>
				{
					parsedDefinitions.length === 0 ?
					(
						<Text style={styles.definitions}>No definitions available</Text>
					) :
					(
						
							parsedDefinitions.map((def, index) => (
							<View key={index} style={{ marginBottom: 8 }}>
							  <Text style={styles.definitionText}>
								{index + 1}. {def.definition}
							  </Text>
					
							  {def.example ? (
								<Text style={styles.exampleText}>"{def.example}"</Text>
							  ) : null}
					
							  {def.synonyms.length > 0 && (
								<Text style={styles.extraText}>
								  Synonyms: {def.synonyms.join(', ')}
								</Text>
							  )}
					
							  {def.antonyms.length > 0 && (
								<Text style={styles.extraText}>
								  Antonyms: {def.antonyms.join(', ')}
								</Text>
							  )}
							</View>
						  ))
						
					)
				}
			</ScrollView>
            <TouchableOpacity
				style={styles.button}
				onPress={() => {
					setVisibility(false);
					startNewGame();
				}}
				>
					<Text style={styles.buttonText}>
						{isGameWon ? 'Play Again' : 'Try Again'}
					</Text>
				</TouchableOpacity>
          </View>
        </View>
    </Modal>
  	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	  },
	  modalBox: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		width: '95%',
		minWidth: '95%',
		alignItems: 'center',
	  },
	  modalText: {
		fontSize: 28,
		marginBottom: 16,
		textAlign: 'center',
	  },
	  button: {
		marginTop: 16,
		paddingVertical: 12,
		paddingHorizontal: 28,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		backgroundColor: '#ccc'
	  },
	  buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#660022'
	  },
	  modalContainer: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 8,
		padding: 10,
		minWidth: '95%',
	  },
	  correctWordText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#660022',
		marginBottom: 10,
	  },
	  definitions: {
		fontSize: 20,
		color: '#660022'
	  },
	  partOfSpeech: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#555',
		marginBottom: 4,
	  },
	  definitionText: {
		fontSize: 20,
		color: '#222',
	  },
	  exampleText: {
		fontSize: 16,
		fontStyle: 'italic',
		color: '#666',
		marginLeft: 10,
	  },
	  extraText: {
		fontSize: 16,
		color: '#444',
		marginLeft: 10,
	  },
});
