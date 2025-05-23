import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function WordleBox(letter: string) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxText}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
