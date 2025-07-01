import { StyleSheet, View, Text } from 'react-native';

export default function OtherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Word Games Coming Soon</Text>
      <View style={styles.separator} />
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
});