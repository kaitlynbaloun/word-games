import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import WordBoard from './wordBoard';
import KeyBoard from './keyBoard';

export default function NeverWordGame() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NeverWord</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <WordBoard enteredWords={['hello', 'goody', 'mouse', 'house' ]} correctWord='goody'/>
      <View style={styles.space} />
      <KeyBoard />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  space: {
    marginVertical: 10,
    height: 1,
  },
});
