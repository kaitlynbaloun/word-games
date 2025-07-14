import { StyleSheet, TouchableOpacity, Text, useWindowDimensions } from 'react-native';

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
      return '#ADEBB3';
    case KeyStatus.Misplaced:
      return '#ffa500';
    case KeyStatus.Incorrect:
      return '#A9A9A9';
    default:
      return '#D3D3D3';
  }
};

export default function LetterKey({ letter, keyStatus, keyPressAction }: ILetterKeyProps) {
  const { width } = useWindowDimensions();
  const scaleFactor = width / 390;

  const backgroundColor = determineKeyColor(keyStatus);

  const height = Math.min(40 * scaleFactor, 44);
  const paddingHorizontal = Math.min(8 * scaleFactor, 16);
  const borderRadius = Math.min(4 * scaleFactor, 4);
  const fontSize = Math.min(20 * scaleFactor, 18);

  return (
    <TouchableOpacity
      role="button"
      style={[
        styles.box,
        {
          backgroundColor,
          height,
          paddingHorizontal,
          borderRadius,
        },
      ]}
      onPress={() => keyPressAction(letter)}
    >
      <Text style={[styles.boxText, { fontSize }]}>{letter}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    zIndex: 9999,
  },
  boxText: {
    fontWeight: 'bold',
  },
});
